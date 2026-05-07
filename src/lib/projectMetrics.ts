/**
 * Build-time loader for the wiki-synthesis-pipeline project page.
 *
 * Reads sidecar JSON files under src/content/labs/data/ and returns a typed
 * metrics object. Mirrors the contract used by `src/lib/git.ts` and
 * `src/lib/github.ts`: every read is wrapped, every failure degrades to
 * `null` for that section, and the build never fails because of this module.
 *
 * Corpus counts are derived by walking src/content/reading/** and
 * src/content/wiki/** the same way scripts/labs-aggregate.mjs does.
 *
 * Consumers must handle `null` sections by rendering a placeholder rather
 * than throwing.
 */
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const READING_DIR = path.join(ROOT, "src/content/reading");
const WIKI_DIR = path.join(ROOT, "src/content/wiki");
const LABS_DATA_DIR = path.join(ROOT, "src/content/labs/data");

export type ProjectMetrics = {
  corpus: {
    reading_count: number;
    wiki_count: number;
    total_tokens: number | null;
    total_cost_usd: number | null;
  };
  citation_faithfulness: {
    judge_agreement_pct: number | null;
    accuracy_pct_by_judge: Record<string, number> | null;
    last_run: string | null;
  } | null;
  recompile_stability: {
    flagged_count: number | null;
    last_30_days_recompiles: number | null;
  } | null;
  synthesis_quality: {
    mean_scores: Record<string, number> | null;
  } | null;
  model_comparison: {
    available: boolean;
    pareto_summary: string | null;
  };
};

async function walkMd(dir: string): Promise<string[]> {
  const out: string[] = [];
  let names: string[];
  try {
    names = await fs.readdir(dir);
  } catch {
    return out;
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

async function countMd(dir: string): Promise<number> {
  try {
    const files = await walkMd(dir);
    return files.length;
  } catch (err) {
    console.warn(
      `[projectMetrics:countMd] failed for ${dir}: ${err instanceof Error ? err.message : "unknown"}`,
    );
    return 0;
  }
}

async function readJson<T = unknown>(filename: string): Promise<T | null> {
  const full = path.join(LABS_DATA_DIR, filename);
  try {
    const raw = await fs.readFile(full, "utf-8");
    return JSON.parse(raw) as T;
  } catch (err) {
    if (err instanceof Error && "code" in err && (err as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    console.warn(
      `[projectMetrics:readJson] ${filename}: ${err instanceof Error ? err.message : "unknown"}`,
    );
    return null;
  }
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function pickNumber(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

function pickString(v: unknown): string | null {
  return typeof v === "string" && v.length > 0 ? v : null;
}

function pickNumberRecord(v: unknown): Record<string, number> | null {
  if (!isObject(v)) {
    return null;
  }
  const out: Record<string, number> = {};
  for (const [k, raw] of Object.entries(v)) {
    if (typeof raw === "number" && Number.isFinite(raw)) {
      out[k] = raw;
    }
  }
  return Object.keys(out).length > 0 ? out : null;
}

type IngestPipelineCost = {
  summary?: {
    total_cost_usd?: number;
    total_tokens?: number;
  };
};

type CitationFaithfulness = {
  judge_agreement_pct?: number;
  accuracy_pct_by_judge?: Record<string, number>;
  last_run?: string;
};

type RecompileStability = {
  flagged_count?: number;
  last_30_days_recompiles?: number;
};

type SynthesisQuality = {
  mean_scores?: Record<string, number>;
};

type ModelComparison = {
  pareto_summary?: string;
};

export async function loadProjectMetrics(): Promise<ProjectMetrics> {
  const [readingCount, wikiCount, ingestCost, citation, recompile, synthesis, modelCompare] =
    await Promise.all([
      countMd(READING_DIR),
      countMd(WIKI_DIR),
      readJson<IngestPipelineCost>("ingest-pipeline-cost.json"),
      readJson<CitationFaithfulness>("citation-faithfulness.json"),
      readJson<RecompileStability>("recompile-stability.json"),
      readJson<SynthesisQuality>("synthesis-quality.json"),
      readJson<ModelComparison>("model-comparison.json"),
    ]);

  const corpus: ProjectMetrics["corpus"] = {
    reading_count: readingCount,
    wiki_count: wikiCount,
    total_tokens: pickNumber(ingestCost?.summary?.total_tokens),
    total_cost_usd: pickNumber(ingestCost?.summary?.total_cost_usd),
  };

  const citation_faithfulness: ProjectMetrics["citation_faithfulness"] = citation
    ? {
        judge_agreement_pct: pickNumber(citation.judge_agreement_pct),
        accuracy_pct_by_judge: pickNumberRecord(citation.accuracy_pct_by_judge),
        last_run: pickString(citation.last_run),
      }
    : null;

  const recompile_stability: ProjectMetrics["recompile_stability"] = recompile
    ? {
        flagged_count: pickNumber(recompile.flagged_count),
        last_30_days_recompiles: pickNumber(recompile.last_30_days_recompiles),
      }
    : null;

  const synthesis_quality: ProjectMetrics["synthesis_quality"] = synthesis
    ? {
        mean_scores: pickNumberRecord(synthesis.mean_scores),
      }
    : null;

  const model_comparison: ProjectMetrics["model_comparison"] = {
    available: modelCompare !== null,
    pareto_summary: pickString(modelCompare?.pareto_summary),
  };

  return {
    corpus,
    citation_faithfulness,
    recompile_stability,
    synthesis_quality,
    model_comparison,
  };
}

export function formatUsd(value: number | null): string {
  if (value === null) {
    return "—";
  }
  if (value >= 10) {
    return `$${value.toFixed(2)}`;
  }
  if (value >= 1) {
    return `$${value.toFixed(2)}`;
  }
  if (value >= 0.01) {
    return `$${value.toFixed(3)}`;
  }
  return `$${value.toFixed(4)}`;
}

export function formatPct(value: number | null): string {
  if (value === null) {
    return "—";
  }
  return `${value.toFixed(0)}%`;
}

export function formatCount(value: number | null): string {
  if (value === null) {
    return "—";
  }
  return value.toLocaleString("en-US");
}

export function formatTokens(value: number | null): string {
  if (value === null) {
    return "—";
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}k`;
  }
  return String(value);
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
