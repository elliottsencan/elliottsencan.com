/**
 * POST /recompile — rebuild existing reading entries against the current
 * prompt + model.
 *
 * Flow:
 *   1. Validate body (scope required).
 *   2. List entries under READING_DIR via GitHub contents API.
 *   3. Parse frontmatter, apply scope filter.
 *   4. For each matched entry:
 *        a. Fetch the Internet Archive snapshot closest to `added` timestamp.
 *        b. Call Anthropic with the same prompt used by /link.
 *        c. Rebuild the entry markdown with updated fields + `compiled_at`
 *           and `compiled_with` set to the recompile run.
 *   5. Hand the per-entry mutations to runPipeline; substrate owns branch
 *      + commit + PR + the inline cross-link phase.
 *
 * Cost: one Anthropic call per entry; IA fetches are free. Capped per run
 * to keep Worker CPU budget under control — operators can split larger
 * runs across multiple invocations with the `slugs` scope.
 */

import type { ReadingFrontmatter } from "@shared/schemas/content.ts";
import { ReadingFrontmatterSchema } from "@shared/schemas/content.ts";
import { format as formatDate } from "date-fns";
import matter from "gray-matter";
import { convert as htmlToText } from "html-to-text";
import { z } from "zod";
import { summarizeLink } from "./anthropic.ts";
import { aggregateCost, type CostRecord, type RunCost } from "./cost.ts";
import { createGitHubClient, type GitHubClient, getFile, listDir } from "./github.ts";
import {
  type CrosslinkResult,
  type PlanOutput,
  type PlanResult,
  runPipeline,
  type Strategy,
} from "./pipeline.ts";
import { LINK_SUMMARY_SYSTEM } from "./prompts.ts";
import { makePipelineDeps } from "./synthesize.ts";
import {
  applyVocabulary,
  buildVocabularyPromptBlock,
  type CanonicalVocabulary,
  EMPTY_VOCABULARY,
  loadCanonicalVocabulary,
} from "./topics.ts";
import type { Env, LinkSummary, Result } from "./types.ts";
import { jsonResponse, log } from "./util.ts";

// Default per-run safety bound. Override via env.MAX_ENTRIES_PER_RUN
// (string) without a code change.
const DEFAULT_MAX_ENTRIES_PER_RUN = 100;
const IA_FETCH_TIMEOUT_MS = 10_000;

function resolveMaxEntries(env: Env): number {
  const raw = env.MAX_ENTRIES_PER_RUN;
  if (!raw) {
    return DEFAULT_MAX_ENTRIES_PER_RUN;
  }
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_MAX_ENTRIES_PER_RUN;
}
const IA_MAX_BYTES = 500_000;
const IA_EXCERPT_LENGTH = 16_000;
const LIVE_FETCH_TIMEOUT_MS = 8_000;
const LIVE_MAX_BYTES = 500_000;
const LIVE_EXCERPT_LENGTH = 16_000;

const ScopeSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("all") }),
  z.object({ kind: z.literal("since"), since: z.string() }),
  z.object({ kind: z.literal("slugs"), slugs: z.array(z.string()).min(1) }),
  z.object({
    kind: z.literal("compiled_before_model"),
    model: z.string().min(1),
  }),
]);

const RecompileRequestSchema = z.object({
  scope: ScopeSchema,
  /** Safety: client must opt in to writing to a PR. Defaults to dry run. */
  dry_run: z.boolean().optional().default(true),
});

export type RecompileRequest = z.infer<typeof RecompileRequestSchema>;

type SkipReason = "no-source" | "transient" | "frontmatter-invalid" | "other";

type RecompileResultRow = {
  path: string;
  status: "updated" | "skipped";
  reason?: string;
  skip_reason?: SkipReason;
};

type SkipPartition = {
  total: number;
  no_source: number;
  transient: number;
  frontmatter_invalid: number;
  other: number;
};

type RecompileSummary = {
  matched: number;
  results: RecompileResultRow[];
  scope: RecompileRequest["scope"];
  /**
   * Slugs dropped by the per-run cap after the compiled_at sort. Surfaces
   * the long tail so operators can paste a follow-up curl rather than
   * waiting for the next manual recompile run to silently re-drop them.
   */
  deferred: string[];
  /** Aggregated Anthropic cost across all per-entry recompile calls in this run. */
  run_cost: RunCost;
};

export function makeRecompileStrategy(req: RecompileRequest): Strategy<RecompileSummary> {
  return {
    name: "recompile",
    branchPrefix: "recompile",
    plan: async ({ env }): Promise<PlanResult<RecompileSummary>> => {
      const gh = createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO);
      const enumerated = await enumerateEntries(env, gh);
      if (!enumerated.ok) {
        return { ok: false, error: enumerated.error, status: 500 };
      }
      const { entries, invalidPaths } = enumerated.data;
      const scoped = applyScope(entries, req.scope);
      const prioritized = prioritizeByCompiledAt(scoped);
      const maxEntries = resolveMaxEntries(env);
      const filtered = prioritized.slice(0, maxEntries);
      const deferred = prioritized.slice(maxEntries).map((e) => slugFromPath(e.path));

      log.info("recompile", "plan", "entries selected", {
        total: entries.length,
        matched: filtered.length,
        invalid: invalidPaths.length,
        cap: maxEntries,
        deferred: deferred.length,
      });

      // Load the canonical vocabulary once per run rather than per entry.
      // Each /link or /recompile call would otherwise hit /wiki.json N times
      // for an N=100 batch, which the Cloudflare edge handles fine but is
      // gratuitous. Fail-open: an empty vocabulary disables alias rewriting
      // for this run, the recompiled entry validates either way.
      const vocab: CanonicalVocabulary = await loadCanonicalVocabulary();

      const results: RecompileResultRow[] = [];
      const changed: Array<{ path: string; before: string; after: string }> = [];
      const costRecords: CostRecord[] = [];
      for (const entry of filtered) {
        const outcome = await recompileOne(entry, env, vocab);
        if (outcome.ok) {
          changed.push({ path: entry.path, before: entry.body, after: outcome.data.content });
          results.push({ path: entry.path, status: "updated" });
          costRecords.push(outcome.data.cost);
        } else {
          results.push({
            path: entry.path,
            status: "skipped",
            reason: outcome.error,
            skip_reason: outcome.skipReason,
          });
        }
      }
      for (const path of invalidPaths) {
        results.push({
          path,
          status: "skipped",
          reason: "frontmatter parse failed",
          skip_reason: "frontmatter-invalid",
        });
      }

      const runCost = aggregateCost(costRecords);
      log.info("recompile", "run-cost", "aggregated", {
        calls: runCost.records.length,
        total_usd: runCost.total_usd,
        input_tokens: runCost.total_usage.input_tokens,
        output_tokens: runCost.total_usage.output_tokens,
      });

      const summary: RecompileSummary = {
        matched: filtered.length,
        results,
        scope: req.scope,
        deferred,
        run_cost: runCost,
      };
      return {
        ok: true,
        data: { mutation: { added: [], changed }, summary },
      };
    },
    prTitle: ({ mutation }) => `Recompile reading entries (${mutation.changed.length})`,
    prBody: (plan, crosslink) => buildRecompilePrBody(plan, crosslink),
  };
}

// Exported for unit tests.
//
// Sort entries by `compiled_at` ascending so the oldest get refreshed
// first when the per-run cap bites. Missing `compiled_at` (legacy entries
// or freshly-imported pre-recompile content) sort first — they're the
// stalest by definition. Tie-break alphabetically by basename slug for
// deterministic dry-run output.
export function prioritizeByCompiledAt<T extends ParsedEntry>(entries: readonly T[]): T[] {
  const tsOf = (e: T): number => {
    const ca = e.frontmatter.compiled_at;
    return ca ? ca.getTime() : 0;
  };
  return [...entries].sort((a, b) => {
    const ta = tsOf(a);
    const tb = tsOf(b);
    if (ta !== tb) {
      return ta - tb;
    }
    return slugFromPath(a.path).localeCompare(slugFromPath(b.path));
  });
}

// Exported for unit tests. Used in PR body and JSON response so operators
// can paste a one-liner to catch up on entries dropped by the per-run cap.
export function buildDeferredRecompileCurlHint(slugs: readonly string[]): string {
  const payload = JSON.stringify({
    scope: { kind: "slugs", slugs },
    dry_run: false,
  });
  return `curl -X POST https://site-ingest.<your-subdomain>.workers.dev/recompile -H 'Authorization: Bearer $TOKEN' -d '${payload}'`;
}

// Exported for unit tests; in-file callers use it directly.
export function partitionSkips(results: RecompileResultRow[]): SkipPartition {
  const partition: SkipPartition = {
    total: 0,
    no_source: 0,
    transient: 0,
    frontmatter_invalid: 0,
    other: 0,
  };
  for (const r of results) {
    if (r.status !== "skipped") {
      continue;
    }
    partition.total += 1;
    switch (r.skip_reason) {
      case "no-source":
        partition.no_source += 1;
        break;
      case "transient":
        partition.transient += 1;
        break;
      case "frontmatter-invalid":
        partition.frontmatter_invalid += 1;
        break;
      default:
        partition.other += 1;
    }
  }
  return partition;
}

// Exported for unit tests. Strategy `prBody` callback wires through.
export function buildRecompilePrBody(
  plan: PlanOutput<RecompileSummary>,
  crosslink?: CrosslinkResult,
): string {
  if (!plan.summary) {
    return "Automated recompile run.";
  }
  const summary = plan.summary;
  const updated = summary.results.filter((r) => r.status === "updated");
  const skipped = summary.results.filter((r) => r.status === "skipped");
  const skips = partitionSkips(summary.results);
  const runCost = summary.run_cost;
  const costLine =
    runCost.records.length > 0
      ? `- Cost: $${runCost.total_usd.toFixed(4)} (${runCost.records.length} call${runCost.records.length === 1 ? "" : "s"}, ${runCost.total_usage.input_tokens} input + ${runCost.total_usage.output_tokens} output tokens)`
      : null;
  const deferred = summary.deferred;
  const lines: string[] = [
    `Automated recompile run. Scope: \`${JSON.stringify(summary.scope)}\`.`,
    "",
    `- Updated: ${updated.length}`,
    `- Skipped: ${skips.total} (no_source=${skips.no_source}, transient=${skips.transient}, frontmatter_invalid=${skips.frontmatter_invalid}, other=${skips.other})`,
    ...(deferred.length > 0 ? [`- Deferred (cap): ${deferred.length}`] : []),
    ...(costLine ? [costLine] : []),
    "",
    "### Updated",
    ...updated.map((r) => `- \`${r.path}\``),
  ];
  if (skipped.length > 0) {
    lines.push("", "### Skipped");
    for (const r of skipped) {
      const tag = r.skip_reason ? `${r.skip_reason}: ` : "";
      lines.push(`- \`${r.path}\` — ${tag}${r.reason ?? "unknown"}`);
    }
  }
  if (deferred.length > 0) {
    lines.push("", "### Deferred");
    lines.push("Entries dropped by the per-run cap after compiled_at sort. Catch up with:");
    lines.push("", "```sh", buildDeferredRecompileCurlHint(deferred), "```", "");
    for (const slug of deferred) {
      lines.push(`- \`${slug}\``);
    }
  }
  if (crosslink && crosslink.applied.length > 0) {
    lines.push("", "### Cross-link suggestions");
    lines.push(
      `Applied ${crosslink.applied.length} insertion${crosslink.applied.length === 1 ? "" : "s"} ` +
        `(${crosslink.forward} forward + ${crosslink.backward} backward proposals).`,
    );
    for (const a of crosslink.applied) {
      lines.push(`- \`${a.path}\` — \`${a.anchor}\` → ${a.target}`);
    }
  }
  return lines.join("\n");
}

export async function handle(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "invalid JSON" }, 400);
  }

  const validation = RecompileRequestSchema.safeParse(parsed);
  if (!validation.success) {
    const issue = validation.error.issues[0];
    return jsonResponse(
      { ok: false, error: `${issue?.path?.join(".") ?? "body"}: ${issue?.message ?? "invalid"}` },
      400,
    );
  }
  const req = validation.data;
  const strategy = makeRecompileStrategy(req);

  if (req.dry_run) {
    const planned = await strategy.plan({ env }, env);
    if (!planned.ok) {
      return jsonResponse({ ok: false, error: planned.error }, planned.status ?? 500);
    }
    const summary = planned.data.summary;
    if (!summary) {
      return jsonResponse({ ok: false, error: "no summary returned" }, 500);
    }
    const updated = summary.results.filter((r) => r.status === "updated");
    return jsonResponse({
      ok: true,
      dry_run: true,
      matched: summary.matched,
      processed: updated.length,
      skipped: partitionSkips(summary.results),
      results: summary.results,
      deferred: summary.deferred,
      run_cost: summary.run_cost,
    });
  }

  const deps = makePipelineDeps(env);
  const result = await runPipeline(
    strategy,
    { commitTarget: "pr", crosslink: "inline" },
    env,
    ctx,
    deps,
  );
  if (!result.ok) {
    return jsonResponse({ ok: false, error: result.error }, result.status);
  }
  const summary = result.summary;
  const results = summary?.results ?? [];
  const updated = results.filter((r) => r.status === "updated");
  return jsonResponse({
    ok: true,
    dry_run: false,
    matched: summary?.matched ?? 0,
    committed: updated.length,
    skipped: partitionSkips(results),
    deferred: summary?.deferred ?? [],
    run_cost: summary?.run_cost ?? null,
    branch: result.branch,
    pr: result.pr_number ? { number: result.pr_number, url: result.pr_url } : null,
    results,
    crosslink: result.crosslink
      ? {
          forward: result.crosslink.forward,
          backward: result.crosslink.backward,
          applied: result.crosslink.applied.length,
          run_cost: result.crosslink.run_cost,
        }
      : null,
  });
}

interface ParsedEntry {
  path: string;
  sha: string;
  frontmatter: ReadingFrontmatter;
  body: string;
}

type Enumeration = { entries: ParsedEntry[]; invalidPaths: string[] };

async function enumerateEntries(env: Env, gh: GitHubClient): Promise<Result<Enumeration>> {
  const months = await listDir(env.READING_DIR, "main", gh);
  if (!months.ok) {
    return { ok: false, error: `list months: ${months.error}` };
  }

  const entries: ParsedEntry[] = [];
  const invalidPaths: string[] = [];
  for (const month of months.data) {
    if (month.type !== "dir") {
      continue;
    }
    const files = await listDir(month.path, "main", gh);
    if (!files.ok) {
      log.warn("recompile", "enum", "month list failed", {
        month: month.path,
        error: files.error,
      });
      continue;
    }
    for (const file of files.data) {
      if (file.type !== "file" || !file.name.endsWith(".md")) {
        continue;
      }
      const loaded = await getFile(file.path, "main", gh);
      if (!loaded.ok) {
        log.warn("recompile", "enum", "file load failed", {
          path: file.path,
          error: loaded.error,
        });
        continue;
      }
      const parsed = parseFrontmatter(loaded.data.content);
      if (!parsed) {
        invalidPaths.push(file.path);
        continue;
      }
      entries.push({ path: file.path, sha: loaded.data.sha, ...parsed });
    }
  }
  return { ok: true, data: { entries, invalidPaths } };
}

// Exported for unit tests; in-file callers use it directly.
export function applyScope(
  entries: ParsedEntry[],
  scope: RecompileRequest["scope"],
): ParsedEntry[] {
  switch (scope.kind) {
    case "all":
      return entries;
    case "since": {
      const threshold = new Date(scope.since);
      return entries.filter((e) => e.frontmatter.added >= threshold);
    }
    case "slugs": {
      const set = new Set(scope.slugs);
      return entries.filter((e) => set.has(slugFromPath(e.path)));
    }
    case "compiled_before_model": {
      return entries.filter((e) => {
        // Missing compiled_with => eligible for recompile.
        const model = e.frontmatter.compiled_with;
        return !model || model !== scope.model;
      });
    }
  }
}

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.md$/, "");
}

// Exported for unit tests; in-file callers use it directly.
// Returns null on YAML parse failure or when the frontmatter doesn't match
// ReadingFrontmatterSchema (e.g. missing required fields). z.coerce.date()
// handles both string and Date forms of `added` / `compiled_at`, since
// js-yaml parses unquoted ISO datetimes into Date objects.
export function parseFrontmatter(
  markdown: string,
): { frontmatter: ReadingFrontmatter; body: string } | null {
  try {
    const parsed = matter(markdown);
    if (!parsed.data || Object.keys(parsed.data).length === 0) {
      return null;
    }
    const fm = ReadingFrontmatterSchema.safeParse(parsed.data);
    if (!fm.success) {
      log.warn("recompile", "frontmatter", "schema-invalid", {
        issues: fm.error.issues.length,
        first: fm.error.issues[0]?.path.join(".") ?? "(root)",
      });
      return null;
    }
    return { frontmatter: fm.data, body: parsed.content };
  } catch (err) {
    log.warn("recompile", "frontmatter", "parse failed", {
      msg: err instanceof Error ? err.message : "unknown",
    });
    return null;
  }
}

type RecompileOutcome =
  | { ok: true; data: { path: string; content: string; cost: CostRecord } }
  | { ok: false; error: string; skipReason: SkipReason };

async function recompileOne(
  entry: ParsedEntry,
  env: Env,
  vocab: CanonicalVocabulary = EMPTY_VOCABULARY,
): Promise<RecompileOutcome> {
  const { url, title, added } = entry.frontmatter;

  // Try the live URL first (closest to the original source /link saw at
  // ingest). Fall back to Wayback only on link rot — that's what the
  // archive is for. Empty live + empty Wayback = no source we can use.
  const live = await fetchLivePage(url);
  let excerpt: string;
  if (live.ok) {
    excerpt = live.data.excerpt;
    log.info("recompile", "fetch", "using live page", { path: entry.path });
  } else {
    log.info("recompile", "fetch", "live failed, trying wayback", {
      path: entry.path,
      error: live.error,
    });
    const archive = await fetchInternetArchive(url, added.toISOString());
    if (!archive.ok) {
      const skipReason: SkipReason =
        archive.kind === "no-snapshot" && live.kind === "missing" ? "no-source" : "transient";
      return {
        ok: false,
        error: `live: ${live.error}; ia: ${archive.error}`,
        skipReason,
      };
    }
    excerpt = archive.data.excerpt;
    log.info("recompile", "fetch", "using wayback snapshot", {
      path: entry.path,
      snapshot: archive.data.snapshotUrl,
    });
  }

  const summary = await summarizeLink({
    apiKey: env.ANTHROPIC_API_KEY,
    model: env.ANTHROPIC_MODEL,
    systemPrompt: LINK_SUMMARY_SYSTEM,
    userMessage: buildRecompileUserMessage({
      title,
      url,
      excerpt,
      vocabularyBlock: buildVocabularyPromptBlock(vocab),
    }),
  });
  if (!summary.ok) {
    return { ok: false, error: `anthropic: ${summary.error}`, skipReason: "transient" };
  }

  // Same alias-rewrite contract as /link: known aliases collapse to canonical
  // before commit. Coined slugs (model invented something not in the
  // vocabulary) pass through and surface in logs for review.
  const applied = applyVocabulary(summary.data.topics, vocab);
  if (applied.rewritten.length > 0 || applied.coined.length > 0) {
    log.info("recompile", "topics", "post-process", {
      path: entry.path,
      committed: applied.committed.join(","),
      rewritten: applied.rewritten.length
        ? applied.rewritten.map((r) => `${r.from}->${r.to}`).join(",")
        : undefined,
      coined: applied.coined.length ? applied.coined.join(",") : undefined,
      topic_rationale: summary.data.topic_rationale,
    });
  }
  const summaryWithCanonicalTopics: LinkSummary = {
    ...summary.data,
    topics: applied.committed,
  };

  const rebuilt = buildRecompiledMarkdown({
    title: summary.data.title || title || url,
    url,
    summary: summaryWithCanonicalTopics,
    added,
    compiledAt: new Date(),
  });

  return { ok: true, data: { path: entry.path, content: rebuilt, cost: summary.data.cost } };
}

function buildRecompileUserMessage(args: {
  title?: string | undefined;
  url: string;
  excerpt?: string | undefined;
  vocabularyBlock: string;
}): string {
  const parts = [
    "Article data for re-summarization (from Internet Archive snapshot):",
    `Title: ${args.title ?? "(unknown)"}`,
    `URL: ${args.url}`,
  ];
  if (args.vocabularyBlock) {
    parts.push("", args.vocabularyBlock);
  }
  if (args.excerpt) {
    parts.push("", "Excerpt:", args.excerpt);
  }
  return parts.join("\n");
}

export function buildRecompiledMarkdown(args: {
  title: string;
  url: string;
  summary: LinkSummary;
  added: Date;
  compiledAt: Date;
}): string {
  const { title, url, summary, added, compiledAt } = args;
  const data: Record<string, unknown> = {
    title,
    url,
    summary: summary.summary,
    category: summary.category,
    added: added.toISOString(),
  };
  if (summary.author) {
    data.author = summary.author;
  }
  if (summary.source) {
    data.source = summary.source;
  }
  if (summary.topics.length > 0) {
    data.topics = summary.topics;
  }
  data.compiled_at = compiledAt.toISOString();
  data.compiled_with = summary.model;
  data.compile_cost = summary.cost;
  // Reading entries are source citations, not articles — body stays empty.
  return matter.stringify("", data);
}

type LiveResult =
  | { ok: true; data: { excerpt: string } }
  // `missing` = 4xx (URL is gone or paywalled). `transient` = network /
  // 5xx / timeout. The split lets recompileOne decide whether a Wayback
  // miss should classify as no-source (live missing + no snapshot) vs.
  // transient (live transient + no snapshot — worth retrying later).
  | { ok: false; error: string; kind: "missing" | "transient" };

async function fetchLivePage(url: string): Promise<LiveResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), LIVE_FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "site-ingest-recompile/0.1" },
    });
    if (!res.ok || !res.body) {
      const kind: "missing" | "transient" =
        res.status >= 400 && res.status < 500 ? "missing" : "transient";
      return { ok: false, error: `live ${res.status}`, kind };
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let html = "";
    while (html.length < LIVE_MAX_BYTES) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      html += decoder.decode(value, { stream: true });
    }
    reader.cancel().catch((err: unknown) => {
      log.info("recompile", "live-cancel", "reader cancel rejected", {
        msg: err instanceof Error ? err.message : "unknown",
      });
    });
    const excerpt = htmlToText(html, {
      wordwrap: false,
      selectors: [
        { selector: "a", options: { ignoreHref: true } },
        { selector: "img", format: "skip" },
        { selector: "nav", format: "skip" },
        { selector: "footer", format: "skip" },
      ],
    }).slice(0, LIVE_EXCERPT_LENGTH);
    if (excerpt.length === 0) {
      return { ok: false, error: "empty page", kind: "transient" };
    }
    return { ok: true, data: { excerpt } };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, error: msg, kind: "transient" };
  } finally {
    clearTimeout(timeout);
  }
}

type ArchiveResult =
  | { ok: true; data: { excerpt: string; snapshotUrl: string } }
  | { ok: false; error: string; kind: "no-snapshot" | "transient" };

async function fetchInternetArchive(url: string, addedIso: string): Promise<ArchiveResult> {
  // Wayback Availability API expects compact yyyyMMddHHmmss format.
  const ts = formatDate(new Date(addedIso), "yyyyMMddHHmmss");
  const availUrl = `https://archive.org/wayback/available?url=${encodeURIComponent(url)}&timestamp=${ts}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), IA_FETCH_TIMEOUT_MS);
  try {
    const availRes = await fetch(availUrl, {
      signal: controller.signal,
      headers: { "User-Agent": "site-ingest-recompile/0.1" },
    });
    if (!availRes.ok) {
      return { ok: false, error: `availability ${availRes.status}`, kind: "transient" };
    }
    const avail = (await availRes.json()) as {
      archived_snapshots?: { closest?: { url?: string; available?: boolean } };
    };
    const snapshot = avail.archived_snapshots?.closest;
    if (!snapshot?.available || !snapshot.url) {
      return { ok: false, error: "no snapshot", kind: "no-snapshot" };
    }

    const snapRes = await fetch(snapshot.url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "site-ingest-recompile/0.1" },
    });
    if (!snapRes.ok || !snapRes.body) {
      return { ok: false, error: `snapshot ${snapRes.status}`, kind: "transient" };
    }

    const reader = snapRes.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let html = "";
    while (html.length < IA_MAX_BYTES) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      html += decoder.decode(value, { stream: true });
    }
    reader.cancel().catch((err: unknown) => {
      log.info("recompile", "fetch-cancel", "reader cancel rejected", {
        msg: err instanceof Error ? err.message : "unknown",
      });
    });

    const excerpt = htmlToText(html, {
      wordwrap: false,
      selectors: [
        { selector: "a", options: { ignoreHref: true } },
        { selector: "img", format: "skip" },
        { selector: "nav", format: "skip" },
        { selector: "footer", format: "skip" },
      ],
    }).slice(0, IA_EXCERPT_LENGTH);
    return { ok: true, data: { excerpt, snapshotUrl: snapshot.url } };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, error: msg, kind: "transient" };
  } finally {
    clearTimeout(timeout);
  }
}
