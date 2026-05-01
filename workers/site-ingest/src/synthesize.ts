/**
 * POST /synthesize — compile the wiki concept layer.
 *
 * Reads every reading entry, groups them by their `topics[]` field,
 * and for each topic with 2+ contributing entries calls Anthropic
 * to compile a synthesis article. Articles land at
 * src/content/wiki/<topic-slug>.md, committed via PR.
 *
 * Distinct from /link (per-source citation) and /now (weekly temporal
 * snapshot). Wiki = per-concept synthesis across multiple sources.
 *
 * Cost: one Anthropic call per concept that needs (re)compiling. With
 * 2-entry threshold and a small corpus this is rare. Idempotent: a
 * topic's article is skipped if its source set hasn't changed since
 * `compiled_at`.
 *
 * Plumbed through `runPipeline` (pipeline.ts): the strategy below owns
 * planning (enumerate + cluster + per-topic compile), and the substrate
 * owns branch + commit + PR + the inline cross-link phase.
 */

import { MIN_WIKI_SOURCES, ReadingFrontmatterSchema } from "@shared/schemas/content.ts";
import matter from "gray-matter";
import { z } from "zod";
import { compileWikiArticle } from "./anthropic.ts";
import { aggregateCost, type CostRecord, type RunCost } from "./cost.ts";
import {
  type DroppedLink,
  type DroppedLinkReason,
  repairWikiBodyLinks,
} from "./crosslink-mdast.ts";
import { makeCrosslinkRunner } from "./crosslink-phase.ts";
import {
  commitFiles,
  createBranch,
  createGitHubClient,
  findOpenPrByBranch,
  type GitHubClient,
  getBranchSha,
  getFile,
  listDir,
  openPullRequest,
} from "./github.ts";
import {
  type CrosslinkResult,
  type GithubDeps,
  type Mutation,
  type PlanOutput,
  type PlanResult,
  runPipeline,
  type Strategy,
} from "./pipeline.ts";
import { WIKI_SYNTHESIS_SYSTEM } from "./prompts.ts";
import type { Env, Result, WikiArticle } from "./types.ts";
import { jsonResponse, log, readingSlugFromPath } from "./util.ts";

const MAX_CONCEPTS_PER_RUN = 20;
const WIKI_DIR = "src/content/wiki";

const SynthesizeRequestSchema = z.object({
  topics: z.array(z.string()).optional(),
  force: z.boolean().optional().default(false),
  /** Defaults to true; flip to false to actually open a PR. */
  dry_run: z.boolean().optional().default(true),
});

export type SynthesizeRequest = z.infer<typeof SynthesizeRequestSchema>;

interface ReadingSource {
  slug: string;
  path: string;
  title: string;
  url: string;
  summary: string;
  category: string;
  added: string;
  author?: string;
  source?: string;
  topics: string[];
}

interface ExistingWiki {
  topic: string;
  path: string;
  sha: string;
  sources: string[];
  compiled_with: string;
}

type SynthesizeSummary = {
  active_topics: string[];
  compiled: number;
  failed: Array<{ path: string; topic: string; error: string }>;
  skipped: Array<{ topic: string; reason: string }>;
  auto_repaired: Array<{ topic: string; dropped: DroppedLink[] }>;
  /** Aggregated Anthropic cost across all per-topic compile calls in this run. */
  run_cost: RunCost;
};

export function makeSynthesizeStrategy(req: SynthesizeRequest): Strategy<SynthesizeSummary> {
  return {
    name: "synthesize",
    branchPrefix: "synthesis",
    plan: async ({ env }): Promise<PlanResult<SynthesizeSummary>> => {
      const gh = createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO);
      const planned = await planSynthesis(env, gh, req);
      return planned;
    },
    prTitle: ({ mutation }) => {
      const n = mutation.added.length + mutation.changed.length;
      return `Wiki synthesis (${n} concept${n === 1 ? "" : "s"})`;
    },
    prBody: (plan, crosslink) => buildPrBody(plan, crosslink),
  };
}

async function planSynthesis(
  env: Env,
  gh: GitHubClient,
  req: SynthesizeRequest,
): Promise<PlanResult<SynthesizeSummary>> {
  const [sourcesResult, existingResult] = await Promise.all([
    enumerateReading(env, gh),
    enumerateWiki(gh),
  ]);
  if (!sourcesResult.ok) {
    return { ok: false, error: sourcesResult.error, status: 500 };
  }
  if (!existingResult.ok) {
    return { ok: false, error: existingResult.error, status: 500 };
  }

  const byTopic = clusterByTopic(sourcesResult.data, MIN_WIKI_SOURCES);
  const allActiveTopics = [...byTopic.keys()].sort();

  const existingByTopic = new Map(existingResult.data.map((e) => [e.topic, e]));
  const requestedTopics = req.topics ? new Set(req.topics) : null;
  const targets: Array<{ topic: string; sources: ReadingSource[]; existing?: ExistingWiki }> = [];
  for (const [topic, sources] of byTopic.entries()) {
    if (requestedTopics && !requestedTopics.has(topic)) {
      continue;
    }
    const existing = existingByTopic.get(topic);
    const sourceSlugs = sources.map((s) => s.slug).sort();
    if (!req.force && existing && setEquals(existing.sources, sourceSlugs)) {
      continue;
    }
    targets.push({ topic, sources, ...(existing ? { existing } : {}) });
  }
  const capped = targets.slice(0, MAX_CONCEPTS_PER_RUN);

  log.info("synthesize", "plan", "concepts selected", {
    activeTopics: allActiveTopics.length,
    needsCompile: targets.length,
    cap: MAX_CONCEPTS_PER_RUN,
  });

  const knownReadingSlugs = new Set(sourcesResult.data.map((s) => s.slug));
  const added: Mutation["added"] = [];
  const changed: Mutation["changed"] = [];
  const failed: SynthesizeSummary["failed"] = [];
  const skipped: SynthesizeSummary["skipped"] = [];
  const autoRepaired: SynthesizeSummary["auto_repaired"] = [];
  const costRecords: CostRecord[] = [];
  for (const target of capped) {
    const article = await compileWikiArticle({
      apiKey: env.ANTHROPIC_API_KEY,
      model: env.ANTHROPIC_MODEL,
      systemPrompt: WIKI_SYNTHESIS_SYSTEM,
      userMessage: buildUserMessage({
        topic: target.topic,
        sources: target.sources,
      }),
    });
    if (!article.ok) {
      failed.push({
        path: `${WIKI_DIR}/${target.topic}.md`,
        topic: target.topic,
        error: article.error,
      });
      continue;
    }
    costRecords.push(article.data.cost);
    const repaired = repairWikiBodyLinks(article.data.body, knownReadingSlugs);
    if (repaired.dropped.length > 0) {
      log.warn("synthesize", "repair", "dropped invalid links", {
        topic: target.topic,
        count: repaired.dropped.length,
        urls: repaired.dropped.map((d) => `${d.reason}:${d.url}`).join(","),
      });
      autoRepaired.push({ topic: target.topic, dropped: repaired.dropped });
    }
    // Wiki-link drops are expected (the prompt forbids them); only the
    // unknown-reading-slug failures signal a malfunctioning prompt or stale
    // source list and are worth refusing to ship over.
    const unknownReadingDrops = repaired.dropped.filter(
      (d) => d.reason === "unknown-reading-slug",
    ).length;
    const dropThreshold = Math.max(2, Math.ceil(target.sources.length / 4));
    if (unknownReadingDrops > dropThreshold) {
      failed.push({
        path: `${WIKI_DIR}/${target.topic}.md`,
        topic: target.topic,
        error: `${unknownReadingDrops} invalid /reading citations after repair (threshold ${dropThreshold})`,
      });
      continue;
    }
    const markdown = buildArticleMarkdown({
      article: { ...article.data, body: repaired.body },
      sources: target.sources.map((s) => s.slug),
      compiledAt: new Date(),
    });
    const path = `${WIKI_DIR}/${target.topic}.md`;
    if (target.existing) {
      changed.push({ path, before: "", after: markdown });
    } else {
      added.push({ path, content: markdown });
    }
  }
  // Topics with up-to-date sources are filtered above and never enter `capped`.

  const runCost = aggregateCost(costRecords);
  log.info("synthesize", "run-cost", "aggregated", {
    calls: runCost.records.length,
    total_usd: runCost.total_usd,
    input_tokens: runCost.total_usage.input_tokens,
    output_tokens: runCost.total_usage.output_tokens,
  });

  const summary: SynthesizeSummary = {
    active_topics: allActiveTopics,
    compiled: added.length + changed.length,
    failed,
    skipped,
    auto_repaired: autoRepaired,
    run_cost: runCost,
  };

  return {
    ok: true,
    data: {
      mutation: { added, changed },
      summary,
    },
  };
}

function droppedReasonLabel(reason: DroppedLinkReason): string {
  switch (reason) {
    case "unknown-reading-slug":
      return "unknown reading slug";
    case "wiki-link":
      return "stripped /wiki link";
    default: {
      const _exhaustive: never = reason;
      return _exhaustive;
    }
  }
}

function buildPrBody(plan: PlanOutput<SynthesizeSummary>, crosslink?: CrosslinkResult): string {
  const summary = plan.summary ?? {
    active_topics: [],
    compiled: 0,
    failed: [],
    skipped: [],
    auto_repaired: [],
    run_cost: aggregateCost([]),
  };
  const writes = [
    ...plan.mutation.added.map((f) => f.path),
    ...plan.mutation.changed.map((f) => f.path),
  ];
  const { skipped, failed, auto_repaired: autoRepaired } = summary;
  const lines: string[] = [
    "Automated wiki synthesis run.",
    "",
    `- Compiled: ${writes.length}`,
    `- Skipped: ${skipped.length}`,
  ];
  if (failed.length > 0) {
    lines.push(`- Failed: ${failed.length}`);
  }
  const { run_cost: runCost } = summary;
  if (runCost.records.length > 0) {
    lines.push(
      `- Cost: $${runCost.total_usd.toFixed(4)} (${runCost.records.length} call${runCost.records.length === 1 ? "" : "s"}, ` +
        `${runCost.total_usage.input_tokens} input + ${runCost.total_usage.output_tokens} output tokens)`,
    );
  }
  if (writes.length > 0) {
    lines.push("", "### Compiled");
    for (const p of writes) {
      lines.push(`- \`${p}\``);
    }
  }
  if (failed.length > 0) {
    lines.push("", "### Failed");
    for (const f of failed) {
      lines.push(`- \`${f.topic}\` — ${f.error}`);
    }
  }
  if (skipped.length > 0) {
    lines.push("", "### Skipped");
    for (const s of skipped) {
      lines.push(`- \`${s.topic}\` (${s.reason})`);
    }
  }
  if (autoRepaired.length > 0) {
    lines.push("", "### Auto-repaired body links");
    for (const r of autoRepaired) {
      for (const d of r.dropped) {
        lines.push(`- \`${r.topic}\` — ${droppedReasonLabel(d.reason)}: \`${d.url}\``);
      }
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
  const validation = SynthesizeRequestSchema.safeParse(parsed ?? {});
  if (!validation.success) {
    const issue = validation.error.issues[0];
    return jsonResponse(
      { ok: false, error: `${issue?.path?.join(".") ?? "body"}: ${issue?.message ?? "invalid"}` },
      400,
    );
  }
  const req = validation.data;
  const strategy = makeSynthesizeStrategy(req);

  if (req.dry_run) {
    const planned = await strategy.plan({ env }, env);
    if (!planned.ok) {
      return jsonResponse({ ok: false, error: planned.error }, planned.status ?? 500);
    }
    const summary = planned.data.summary;
    return jsonResponse({
      ok: true,
      dry_run: true,
      active_topics: summary?.active_topics ?? [],
      compiled: summary?.compiled ?? 0,
      failed: summary?.failed.length ?? 0,
      skipped: summary?.skipped.length ?? 0,
      writes: [
        ...planned.data.mutation.added.map((f) => ({ path: f.path })),
        ...planned.data.mutation.changed.map((f) => ({ path: f.path })),
      ],
      failures: summary?.failed ?? [],
      skip_reasons: summary?.skipped ?? [],
      run_cost: summary?.run_cost ?? null,
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
  return jsonResponse({
    ok: true,
    dry_run: false,
    active_topics: summary?.active_topics ?? [],
    compiled: summary?.compiled ?? 0,
    failed: summary?.failed.length ?? 0,
    skipped: summary?.skipped.length ?? 0,
    failures: summary?.failed ?? [],
    skip_reasons: summary?.skipped ?? [],
    run_cost: summary?.run_cost ?? null,
    branch: result.branch,
    pr: result.pr_number ? { number: result.pr_number, url: result.pr_url } : null,
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

export function makePipelineDeps(env: Env): {
  github: GithubDeps;
  runCrosslink: ReturnType<typeof makeCrosslinkRunner>;
} {
  const gh = createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO);
  const github: GithubDeps = {
    getBranchSha: (branch) => getBranchSha(branch, gh),
    createBranch: (branch, fromSha) => createBranch(branch, fromSha, gh),
    commitFiles: (args) => commitFiles({ ...args, gh }),
    findOpenPrByBranch: (branch) => findOpenPrByBranch(branch, gh),
    openPullRequest: (args) => openPullRequest({ ...args, gh }),
  };
  const runCrosslink = makeCrosslinkRunner(env, {
    listDir: (path, ref) => listDir(path, ref ?? "main", gh),
    getFile: (path, ref) => getFile(path, ref ?? "main", gh),
  });
  return { github, runCrosslink };
}

async function enumerateReading(env: Env, gh: GitHubClient): Promise<Result<ReadingSource[]>> {
  const months = await listDir(env.READING_DIR, "main", gh);
  if (!months.ok) {
    return { ok: false, error: `list reading months: ${months.error}` };
  }
  const all: ReadingSource[] = [];
  for (const month of months.data) {
    if (month.type !== "dir") {
      continue;
    }
    const files = await listDir(month.path, "main", gh);
    if (!files.ok) {
      log.warn("synthesize", "enum-reading", "month list failed", {
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
        log.warn("synthesize", "enum-reading", "file load failed", {
          path: file.path,
          error: loaded.error,
        });
        continue;
      }
      const parsed = matter(loaded.data.content);
      const validation = ReadingFrontmatterSchema.safeParse(parsed.data);
      if (!validation.success) {
        log.warn("synthesize", "enum-reading", "frontmatter invalid", {
          path: file.path,
          first: validation.error.issues[0]?.path.join(".") ?? "(root)",
        });
        continue;
      }
      const fm = validation.data;
      all.push({
        slug: readingSlugFromPath(file.path),
        path: file.path,
        title: fm.title,
        url: fm.url,
        summary: fm.summary,
        category: fm.category,
        added: fm.added.toISOString(),
        ...(fm.author ? { author: fm.author } : {}),
        ...(fm.source ? { source: fm.source } : {}),
        topics: fm.topics ?? [],
      });
    }
  }
  return { ok: true, data: all };
}

async function enumerateWiki(gh: GitHubClient): Promise<Result<ExistingWiki[]>> {
  const dir = await listDir(WIKI_DIR, "main", gh);
  // Directory may not exist yet on first run — treat that as empty rather
  // than an error.
  if (!dir.ok) {
    if (dir.error.includes("404") || dir.error.toLowerCase().includes("not found")) {
      return { ok: true, data: [] };
    }
    return { ok: false, error: `list wiki: ${dir.error}` };
  }
  const all: ExistingWiki[] = [];
  for (const file of dir.data) {
    if (file.type !== "file" || !file.name.endsWith(".md")) {
      continue;
    }
    const loaded = await getFile(file.path, "main", gh);
    if (!loaded.ok) {
      log.warn("synthesize", "enum-wiki", "file load failed", {
        path: file.path,
        error: loaded.error,
      });
      continue;
    }
    const parsed = matter(loaded.data.content);
    const data = parsed.data as Record<string, unknown>;
    const sources = Array.isArray(data.sources) ? (data.sources as unknown[]).filter(isString) : [];
    all.push({
      topic: file.name.replace(/\.md$/, ""),
      path: file.path,
      sha: loaded.data.sha,
      sources,
      compiled_with: typeof data.compiled_with === "string" ? data.compiled_with : "",
    });
  }
  return { ok: true, data: all };
}

// Exported for unit tests.
export function clusterByTopic(
  sources: ReadingSource[],
  minSources: number,
): Map<string, ReadingSource[]> {
  const byTopic = new Map<string, ReadingSource[]>();
  for (const source of sources) {
    for (const topic of source.topics) {
      const list = byTopic.get(topic);
      if (list) {
        list.push(source);
      } else {
        byTopic.set(topic, [source]);
      }
    }
  }
  for (const [topic, list] of byTopic.entries()) {
    if (list.length < minSources) {
      byTopic.delete(topic);
    }
  }
  return byTopic;
}

function buildUserMessage(args: { topic: string; sources: ReadingSource[] }): string {
  const parts = [
    `Concept: ${args.topic}`,
    "",
    "Contributing sources (cite inline using the slug shown):",
  ];
  for (const source of args.sources) {
    const meta = [source.author, source.source].filter(Boolean).join(", ");
    parts.push(
      "",
      `- slug: ${source.slug}`,
      `  title: ${source.title}`,
      `  url: ${source.url}`,
      `  date: ${source.added}`,
      meta ? `  by: ${meta}` : "",
      `  category: ${source.category}`,
      `  summary: ${source.summary}`,
    );
  }
  return parts.filter((line) => line !== "").join("\n");
}

// Exported for unit tests.
export function buildArticleMarkdown(args: {
  article: WikiArticle;
  sources: string[];
  compiledAt: Date;
}): string {
  const data: Record<string, unknown> = {
    title: args.article.title,
    summary: args.article.summary,
    sources: [...args.sources].sort(),
    compiled_at: args.compiledAt.toISOString(),
    compiled_with: args.article.model,
  };
  return matter.stringify(args.article.body.trim(), data);
}

function isString(v: unknown): v is string {
  return typeof v === "string";
}

// Exported for unit tests.
export function setEquals(a: string[], b: string[]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i] !== sortedB[i]) {
      return false;
    }
  }
  return true;
}
