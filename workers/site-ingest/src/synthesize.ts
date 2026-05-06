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
 * owns branch + commit + PR. The cross-link phase runs as a follow-up
 * (ctx.waitUntil → separate PR) so the synchronous response fits inside
 * Cloudflare's 30s wall time even when the wiki corpus is large; mirrors
 * the /link pattern.
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
import { type AliasFilterResult, filterProposedAliases, loadCorpusSlugList } from "./topics.ts";
import type { Env, Result, WikiArticle } from "./types.ts";
import { jsonResponse, log, readingSlugFromPath } from "./util.ts";

// Per-run safety bound on number of concepts compiled. Was hand-picked at
// 20 when the wiki had ~10 articles; with 39+ eligible topics it became a
// structural bottleneck (operator had to manually batch + identify the
// missed concepts after each call). 100 leaves multi-year headroom; cost
// per fully-saturated run is bounded by Anthropic call cost × 100, which
// at current pricing is ~$1-2 — acceptable for a personal-cadence trigger.
// Override via env.MAX_CONCEPTS_PER_RUN (string) without a code change.
const DEFAULT_MAX_CONCEPTS_PER_RUN = 100;
const WIKI_DIR = "src/content/wiki";

function resolveMaxConcepts(env: Env): number {
  const raw = env.MAX_CONCEPTS_PER_RUN;
  if (!raw) {
    return DEFAULT_MAX_CONCEPTS_PER_RUN;
  }
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_MAX_CONCEPTS_PER_RUN;
}

const SynthesizeRequestSchema = z.object({
  topics: z.array(z.string()).optional(),
  force: z.boolean().optional().default(false),
  /**
   * Defaults to true. When true, planSynthesis short-circuits before the
   * Anthropic compile loop and reports the would-compile shape only
   * (active_topics, the count of selected concepts, the deferred list).
   * No commits, no PR. When false, runs the full pipeline: per-concept
   * Anthropic call, repair, alias filter, mutation, then commit + PR via
   * the substrate.
   */
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

type AliasOutcome = {
  topic: string;
  accepted: string[];
  dropped: AliasFilterResult["dropped"];
};

type SynthesizeSummary = {
  active_topics: string[];
  compiled: number;
  failed: Array<{ path: string; topic: string; error: string }>;
  skipped: Array<{ topic: string; reason: string }>;
  auto_repaired: Array<{ topic: string; dropped: DroppedLink[] }>;
  /** Aliases detected and written into wiki frontmatter, plus dropped proposals + reasons. */
  alias_outcomes: AliasOutcome[];
  /**
   * Topics dropped by the per-run cap after staleness sort. Surfaces the
   * long tail so operators can paste a follow-up curl instead of waiting
   * for the next scheduled run to silently re-drop them.
   */
  deferred: string[];
  /**
   * Topics that would be compiled in this run after staleness sort and
   * cap. Same as the post-cap target list. Surfaced so dry-run operators
   * can chunk a large backlog into multiple `--topics=A,B,C` calls
   * without reverse-engineering which subset of `active_topics` is stale.
   */
  would_compile: string[];
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
    enumerateReading(env.READING_DIR, {
      listDir: (path) => listDir(path, "main", gh),
      getFile: (path) => getFile(path, "main", gh),
    }),
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
  const maxConcepts = resolveMaxConcepts(env);
  const prioritized = prioritizeByStaleness(targets);
  const capped = prioritized.slice(0, maxConcepts);
  const deferred = prioritized.slice(maxConcepts).map((t) => t.topic);

  log.info("synthesize", "plan", "concepts selected", {
    activeTopics: allActiveTopics.length,
    needsCompile: targets.length,
    cap: maxConcepts,
    deferred: deferred.length,
  });

  // Dry-run short-circuit: report the planned compile shape without
  // actually calling Anthropic. The serial per-concept loop below blows
  // the Cloudflare Worker 30s timeout once `capped.length` × per-call
  // latency exceeds it, and dry-run is supposed to be a cheap pre-flight
  // — running the full $-and-time-spending pipeline just to skip the
  // commit-and-PR step at the very end was a footgun.
  const wouldCompile = capped.map((t) => t.topic).sort();
  if (req.dry_run) {
    const summary: SynthesizeSummary = {
      active_topics: allActiveTopics,
      compiled: capped.length,
      failed: [],
      skipped: [],
      auto_repaired: [],
      alias_outcomes: [],
      deferred,
      would_compile: wouldCompile,
      run_cost: aggregateCost([]),
    };
    return {
      ok: true,
      data: {
        mutation: { added: [], changed: [] },
        summary,
      },
    };
  }

  const knownReadingSlugs = new Set(sourcesResult.data.map((s) => s.slug));
  // Wiki article slugs (existing AND queued-to-compile). Used by the alias-
  // safety filter so a proposal that names another concept's slug as an
  // alias is dropped — real concepts can't be aliased to each other
  // automatically.
  const wikiArticleSlugs = new Set<string>([
    ...existingResult.data.map((e) => e.topic),
    ...capped.map((t) => t.topic),
  ]);
  // Corpus slug list for the alias-detection prompt. Pulled once per run
  // from the public /reading.json (edge-cached). Empty array on fetch
  // failure — alias detection still runs but the model has nothing to
  // propose, which is the correct fail-open behavior.
  const corpusSlugs = await loadCorpusSlugList();
  const added: Mutation["added"] = [];
  const changed: Mutation["changed"] = [];
  const failed: SynthesizeSummary["failed"] = [];
  const skipped: SynthesizeSummary["skipped"] = [];
  const autoRepaired: SynthesizeSummary["auto_repaired"] = [];
  const aliasOutcomes: SynthesizeSummary["alias_outcomes"] = [];
  const costRecords: CostRecord[] = [];
  for (const target of capped) {
    // Don't show the model the slug it's synthesizing in the alias candidate
    // list — that would just bait a self-alias.
    const aliasCandidates = corpusSlugs.filter((s) => s !== target.topic);
    const article = await compileWikiArticle({
      apiKey: env.ANTHROPIC_API_KEY,
      model: env.ANTHROPIC_MODEL,
      systemPrompt: WIKI_SYNTHESIS_SYSTEM,
      userMessage: buildUserMessage({
        topic: target.topic,
        sources: target.sources,
        aliasCandidates,
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
    // Filter the model's alias proposals through the safety net: drop self-
    // aliases (model named its own canonical) and wiki-collisions (model
    // claimed another real concept as an alias). Surviving aliases land on
    // the article's frontmatter; dropped proposals surface in the PR body
    // for review.
    const aliasFilter = filterProposedAliases(
      article.data.aliases ?? [],
      target.topic,
      wikiArticleSlugs,
    );
    if (aliasFilter.accepted.length > 0 || aliasFilter.dropped.length > 0) {
      aliasOutcomes.push({
        topic: target.topic,
        accepted: aliasFilter.accepted,
        dropped: aliasFilter.dropped,
      });
    }
    const markdown = buildArticleMarkdown({
      article: { ...article.data, body: repaired.body },
      sources: target.sources.map((s) => s.slug),
      aliases: aliasFilter.accepted,
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
    alias_outcomes: aliasOutcomes,
    deferred,
    would_compile: wouldCompile,
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

// Exported for unit tests. Strategy `prBody` callback wires through.
export function buildPrBody(
  plan: PlanOutput<SynthesizeSummary>,
  crosslink?: CrosslinkResult,
): string {
  const summary = plan.summary ?? {
    active_topics: [],
    compiled: 0,
    failed: [],
    skipped: [],
    auto_repaired: [],
    alias_outcomes: [],
    deferred: [],
    would_compile: [],
    run_cost: aggregateCost([]),
  };
  const writes = [
    ...plan.mutation.added.map((f) => f.path),
    ...plan.mutation.changed.map((f) => f.path),
  ];
  const {
    skipped,
    failed,
    auto_repaired: autoRepaired,
    alias_outcomes: aliasOutcomes,
    deferred,
  } = summary;
  const lines: string[] = [
    "Automated wiki synthesis run.",
    "",
    `- Compiled: ${writes.length}`,
    `- Skipped: ${skipped.length}`,
  ];
  if (failed.length > 0) {
    lines.push(`- Failed: ${failed.length}`);
  }
  if (deferred.length > 0) {
    lines.push(`- Deferred (cap): ${deferred.length}`);
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
  if (deferred.length > 0) {
    lines.push("", "### Deferred");
    lines.push("Topics dropped by the per-run cap after staleness sort. Catch up with:");
    lines.push("", "```sh", buildDeferredCurlHint(deferred), "```", "");
    for (const t of deferred) {
      lines.push(`- \`${t}\``);
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
  if (aliasOutcomes.length > 0) {
    lines.push("", "### Aliases detected");
    for (const o of aliasOutcomes) {
      if (o.accepted.length > 0) {
        lines.push(`- \`${o.topic}\` ← ${o.accepted.map((a) => `\`${a}\``).join(", ")}`);
      }
    }
    const droppedRows = aliasOutcomes.flatMap((o) =>
      o.dropped.map((d) => `- \`${o.topic}\` — dropped \`${d.alias}\` (${d.reason})`),
    );
    if (droppedRows.length > 0) {
      lines.push("", "#### Dropped alias proposals");
      lines.push(...droppedRows);
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
      alias_outcomes: summary?.alias_outcomes ?? [],
      deferred: summary?.deferred ?? [],
      would_compile: summary?.would_compile ?? [],
      run_cost: summary?.run_cost ?? null,
    });
  }

  const deps = makePipelineDeps(env);
  // /synthesize uses crosslink: "followup" so the synchronous response returns
  // as soon as the synthesis commit lands, and the crosslink phase runs in
  // ctx.waitUntil after. With a 38+ article wiki, the inline crosslink phase
  // consistently blew the Cloudflare 30s wall time. Tradeoff: synthesis and
  // crosslinks land as separate PRs (one for compiled concepts, one for
  // anchor-phrase insertions) instead of a single PR with two commits. Mirrors
  // the proven /link pattern.
  const result = await runPipeline(
    strategy,
    { commitTarget: "pr", crosslink: "followup" },
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
    alias_outcomes: summary?.alias_outcomes ?? [],
    deferred: summary?.deferred ?? [],
    would_compile: summary?.would_compile ?? [],
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

/**
 * Dependency-injection surface for `enumerateReading`. Production wires
 * these to the GitHub-backed helpers; tests pass in-memory fakes (mirrors
 * `EnumerateDeps` in enumerate.ts).
 */
export type EnumerateReadingDeps = {
  listDir: (
    path: string,
  ) => Promise<Result<Array<{ type: "file" | "dir"; name: string; path: string }>>>;
  getFile: (path: string) => Promise<Result<{ content: string }>>;
};

/**
 * Walks the reading corpus and returns the sources that feed wiki
 * synthesis. Filters out entries with `noindex: true` so publisher opt-
 * outs don't bleed into compiled wiki articles. Exported (as opposed to
 * being module-private) so the synthesize test can exercise the filter
 * without standing up GitHub mocks.
 */
export async function enumerateReading(
  readingDir: string,
  deps: EnumerateReadingDeps,
): Promise<Result<ReadingSource[]>> {
  const months = await deps.listDir(readingDir);
  if (!months.ok) {
    return { ok: false, error: `list reading months: ${months.error}` };
  }
  const all: ReadingSource[] = [];
  // Tracked separately so the operator can see, per /synthesize run, how
  // many publisher-opt-out entries the wiki layer skipped over. Closes the
  // earlier leak where noindex'd entries could still feed /synthesize.
  let skippedNoindex = 0;
  for (const month of months.data) {
    if (month.type !== "dir") {
      continue;
    }
    const files = await deps.listDir(month.path);
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
      const loaded = await deps.getFile(file.path);
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
      // Publisher opt-out: a noindex entry must not feed the wiki layer.
      // Stub entries (X-Robots-Tag/meta-robots opt-outs) and operator
      // takedowns both land here.
      if (fm.noindex === true) {
        skippedNoindex++;
        continue;
      }
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
  if (skippedNoindex > 0) {
    log.info("synthesize", "enum-reading", "noindex entries skipped", {
      count: skippedNoindex,
    });
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

// Body-length budget scales with source count: more sources warrant more
// prose to actually cite and synthesize across them. Floor at 400 chars
// (matches the prior fixed lower bound), step 80 chars per source, hard
// ceiling at 4000 chars so long-tail topics don't drift into essay length.
// See PR feat/synthesis-budget-scaling for rationale.
const BODY_BUDGET_BASE_CHARS = 400;
const BODY_BUDGET_PER_SOURCE_CHARS = 80;
const BODY_BUDGET_MAX_CHARS = 4000;

// Exported for unit tests.
export function buildUserMessage(args: {
  topic: string;
  sources: ReadingSource[];
  aliasCandidates: readonly string[];
}): string {
  const bodyBudgetChars = Math.min(
    BODY_BUDGET_MAX_CHARS,
    BODY_BUDGET_BASE_CHARS + BODY_BUDGET_PER_SOURCE_CHARS * args.sources.length,
  );
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
  if (args.aliasCandidates.length > 0) {
    parts.push(
      "",
      "ACTIVE TOPIC SLUGS (consider these for alias detection — see system prompt):",
      args.aliasCandidates.join(", "),
    );
  }
  parts.push(
    "",
    `Aim for roughly ${bodyBudgetChars} characters of body. Go longer when more sources warrant deeper synthesis. Do not exceed ${BODY_BUDGET_MAX_CHARS} characters.`,
  );
  return parts.filter((line) => line !== "").join("\n");
}

// Exported for unit tests.
export function buildArticleMarkdown(args: {
  article: WikiArticle;
  sources: string[];
  aliases?: readonly string[];
  compiledAt: Date;
}): string {
  const data: Record<string, unknown> = {
    title: args.article.title,
    summary: args.article.summary,
    sources: [...args.sources].sort(),
  };
  if (args.aliases && args.aliases.length > 0) {
    data.aliases = [...args.aliases].sort();
  }
  data.compiled_at = args.compiledAt.toISOString();
  data.compiled_with = args.article.model;
  data.compile_cost = args.article.cost;
  return matter.stringify(args.article.body.trim(), data);
}

function isString(v: unknown): v is string {
  return typeof v === "string";
}

// Exported for unit tests.
//
// Staleness = size of the symmetric difference between an article's
// existing sources[] and its current cluster's slugs. First-compile targets
// (no existing article yet) sort highest so they're never starved by the
// per-run cap. Tie-break alphabetically by topic slug so dry-run output is
// stable across calls (B1 plan note).
type StalenessTarget = {
  topic: string;
  sources: ReadingSource[];
  existing?: ExistingWiki;
};

export function prioritizeByStaleness<T extends StalenessTarget>(targets: readonly T[]): T[] {
  const stalenessOf = (t: T): number => {
    if (!t.existing) {
      return Number.POSITIVE_INFINITY;
    }
    const current = new Set(t.sources.map((s) => s.slug));
    const existing = new Set(t.existing.sources);
    let diff = 0;
    for (const slug of current) {
      if (!existing.has(slug)) {
        diff++;
      }
    }
    for (const slug of existing) {
      if (!current.has(slug)) {
        diff++;
      }
    }
    return diff;
  };
  return [...targets].sort((a, b) => {
    const sa = stalenessOf(a);
    const sb = stalenessOf(b);
    if (sa !== sb) {
      return sb - sa;
    }
    return a.topic.localeCompare(b.topic);
  });
}

// Exported for unit tests. Used in PR body and JSON response so operators
// can paste a one-liner to catch up on the topics dropped by the per-run cap.
export function buildDeferredCurlHint(topics: readonly string[]): string {
  const payload = JSON.stringify({ topics, dry_run: false });
  return `curl -X POST https://site-ingest.<your-subdomain>.workers.dev/synthesize -H 'Authorization: Bearer $TOKEN' -d '${payload}'`;
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
