/**
 * Build-time loader for the wiki-synthesis-pipeline project page.
 *
 * Reads sidecar JSON files under src/content/labs/data/ and returns a typed
 * metrics object. Mirrors the contract used by `src/lib/git.ts` and
 * `src/lib/github.ts`: every read is wrapped, every failure degrades to a
 * `status: "pending"` block for that section, and the build never fails
 * because of this module.
 *
 * Corpus counts are derived by walking src/content/reading/** and
 * src/content/wiki/** the same way scripts/labs-aggregate.mjs does.
 *
 * Each metric block is a discriminated union: consumers narrow on
 * `status === "ready"` (or `available === true` for model_comparison) and
 * the type system guarantees the populated fields are present inside the
 * narrow.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const ROOT = process.cwd();
const READING_DIR = path.join(ROOT, "src/content/reading");
const WIKI_DIR = path.join(ROOT, "src/content/wiki");
const LABS_DATA_DIR = path.join(ROOT, "src/content/labs/data");

export type ProjectMetrics = {
  corpus: {
    reading_count: number | null;
    wiki_count: number | null;
    total_tokens: number | null;
    total_cost_usd: number | null;
  };
  citation_faithfulness:
    | { status: "pending" }
    | {
        status: "ready";
        judge_agreement_pct: number | null;
        accuracy_pct_by_judge: Record<string, number>;
        last_run: string | null;
      };
  recompile_stability:
    | { status: "pending" }
    | {
        status: "ready";
        flagged_count: number | null;
        last_30_days_recompiles: number | null;
      };
  synthesis_quality:
    | { status: "pending" }
    | {
        status: "ready";
        mean_scores: Record<string, number>;
      };
  model_comparison: { available: false } | { available: true; pareto_summary: string | null };
};

async function walkMd(dir: string): Promise<string[]> {
  const out: string[] = [];
  let names: string[];
  try {
    names = await fs.readdir(dir);
  } catch (err) {
    if (err instanceof Error && "code" in err && (err as NodeJS.ErrnoException).code === "ENOENT") {
      return out;
    }
    throw err;
  }
  for (const name of names) {
    if (name.startsWith(".")) {
      continue;
    }
    const full = path.join(dir, name);
    let stat: Awaited<ReturnType<typeof fs.stat>>;
    try {
      stat = await fs.stat(full);
    } catch {
      continue;
    }
    if (stat.isDirectory()) {
      out.push(...(await walkMd(full)));
    } else if (stat.isFile() && name.endsWith(".md")) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Returns the markdown count for a content directory, or `null` if the walk
 * fails for any reason other than the directory not existing. A missing
 * directory legitimately means "no entries yet" (count is 0); any other
 * failure is a real signal that "we don't know" and must not render as 0
 * on the public page.
 */
async function countMd(dir: string): Promise<number | null> {
  try {
    const files = await walkMd(dir);
    return files.length;
  } catch (err) {
    console.warn(
      `[projectMetrics:countMd] failed for ${dir}: ${err instanceof Error ? err.message : "unknown"}`,
    );
    return null;
  }
}

/**
 * Reads a sidecar JSON file and returns the parsed value. Distinguishes:
 *   - ENOENT (sidecar not yet written) → null, silent
 *   - SyntaxError (we wrote bad JSON) → null, console.error (programmer bug)
 *   - other I/O errors → null, console.warn
 */
async function readJson(filename: string): Promise<unknown | null> {
  const full = path.join(LABS_DATA_DIR, filename);
  let raw: string;
  try {
    raw = await fs.readFile(full, "utf-8");
  } catch (err) {
    if (err instanceof Error && "code" in err && (err as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    console.warn(
      `[projectMetrics:readJson] ${filename}: ${err instanceof Error ? err.message : "unknown"}`,
    );
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error(
      `[projectMetrics:readJson] ${filename}: malformed JSON (programmer error in eval pipeline): ${err instanceof Error ? err.message : "unknown"}`,
    );
    return null;
  }
}

/**
 * Filters a record-like value to keep only finite-numeric entries. Logs
 * dropped keys so eval-pipeline schema drift is visible in build logs
 * rather than silently shrinking the rendered set.
 */
function filterNumberRecord(
  v: Record<string, unknown> | undefined,
  source: string,
): Record<string, number> {
  if (!v) {
    return {};
  }
  const out: Record<string, number> = {};
  const dropped: string[] = [];
  for (const [k, raw] of Object.entries(v)) {
    if (typeof raw === "number" && Number.isFinite(raw)) {
      out[k] = raw;
    } else {
      dropped.push(k);
    }
  }
  if (dropped.length > 0) {
    console.warn(
      `[projectMetrics:filterNumberRecord] ${source}: dropped non-numeric keys: ${dropped.join(", ")}`,
    );
  }
  return out;
}

const NonEmptyString = z.string().min(1);
const UnknownRecord = z.record(z.string(), z.unknown());

const IngestPipelineCostSchema = z
  .object({
    summary: z
      .object({
        total_cost_usd: z.number().optional(),
        total_tokens: z.number().optional(),
      })
      .optional(),
  })
  .loose();

const CitationFaithfulnessSchema = z
  .object({
    judge_agreement_pct: z.number().optional(),
    accuracy_pct_by_judge: UnknownRecord.optional(),
    last_run: NonEmptyString.optional(),
  })
  .loose();

const RecompileStabilitySchema = z
  .object({
    flagged_count: z.number().optional(),
    last_30_days_recompiles: z.number().optional(),
  })
  .loose();

const SynthesisQualitySchema = z
  .object({
    mean_scores: UnknownRecord.optional(),
  })
  .loose();

const ModelComparisonSchema = z
  .object({
    pareto_summary: NonEmptyString.optional(),
  })
  .loose();

/**
 * Validates a parsed sidecar payload against a schema. Returns the typed
 * value or null. A schema mismatch is an eval-pipeline regression, not an
 * end-user condition, so it logs a warn-level diff for the build log.
 */
function validateSidecar<T extends z.ZodTypeAny>(
  filename: string,
  schema: T,
  payload: unknown,
): z.infer<T> | null {
  if (payload === null) {
    return null;
  }
  const result = schema.safeParse(payload);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("; ");
    console.warn(`[projectMetrics:validateSidecar] ${filename}: ${issues}`);
    return null;
  }
  return result.data;
}

export async function loadProjectMetrics(): Promise<ProjectMetrics> {
  const [readingCount, wikiCount, ingestRaw, citationRaw, recompileRaw, synthesisRaw, modelRaw] =
    await Promise.all([
      countMd(READING_DIR),
      countMd(WIKI_DIR),
      readJson("ingest-pipeline-cost.json"),
      readJson("citation-faithfulness.json"),
      readJson("recompile-stability.json"),
      readJson("synthesis-quality.json"),
      readJson("model-comparison.json"),
    ]);

  const ingest = validateSidecar("ingest-pipeline-cost.json", IngestPipelineCostSchema, ingestRaw);
  const citation = validateSidecar(
    "citation-faithfulness.json",
    CitationFaithfulnessSchema,
    citationRaw,
  );
  const recompile = validateSidecar(
    "recompile-stability.json",
    RecompileStabilitySchema,
    recompileRaw,
  );
  const synthesis = validateSidecar("synthesis-quality.json", SynthesisQualitySchema, synthesisRaw);
  const modelCompare = validateSidecar("model-comparison.json", ModelComparisonSchema, modelRaw);

  const corpus: ProjectMetrics["corpus"] = {
    reading_count: readingCount,
    wiki_count: wikiCount,
    total_tokens: ingest?.summary?.total_tokens ?? null,
    total_cost_usd: ingest?.summary?.total_cost_usd ?? null,
  };

  const citation_faithfulness: ProjectMetrics["citation_faithfulness"] = citation
    ? {
        status: "ready",
        judge_agreement_pct: citation.judge_agreement_pct ?? null,
        accuracy_pct_by_judge: filterNumberRecord(
          citation.accuracy_pct_by_judge,
          "citation-faithfulness.json#accuracy_pct_by_judge",
        ),
        last_run: citation.last_run ?? null,
      }
    : { status: "pending" };

  const recompile_stability: ProjectMetrics["recompile_stability"] = recompile
    ? {
        status: "ready",
        flagged_count: recompile.flagged_count ?? null,
        last_30_days_recompiles: recompile.last_30_days_recompiles ?? null,
      }
    : { status: "pending" };

  const synthesis_quality: ProjectMetrics["synthesis_quality"] = synthesis
    ? {
        status: "ready",
        mean_scores: filterNumberRecord(
          synthesis.mean_scores,
          "synthesis-quality.json#mean_scores",
        ),
      }
    : { status: "pending" };

  const model_comparison: ProjectMetrics["model_comparison"] = modelCompare
    ? { available: true, pareto_summary: modelCompare.pareto_summary ?? null }
    : { available: false };

  return {
    corpus,
    citation_faithfulness,
    recompile_stability,
    synthesis_quality,
    model_comparison,
  };
}

let cached: Promise<ProjectMetrics> | null = null;

/**
 * Module-level memoized variant. Multiple components on the same project
 * page can call this without each one re-walking the corpus or re-reading
 * the same five sidecars.
 */
export function loadProjectMetricsCached(): Promise<ProjectMetrics> {
  if (!cached) {
    cached = loadProjectMetrics();
  }
  return cached;
}
