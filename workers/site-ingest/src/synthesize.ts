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

import matter from "gray-matter";
import { z } from "zod";
import { MIN_WIKI_SOURCES } from "@shared/schemas/content.ts";
import { compileWikiArticle } from "./anthropic.ts";
import { makeCrosslinkRunner } from "./crosslink-phase.ts";
import {
  createBranch,
  createGitHubClient,
  findOpenPrByBranch,
  type GitHubClient,
  getBranchSha,
  getFile,
  listDir,
  openPullRequest,
  putFile,
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

// ---------- request validation ----------

const SynthesizeRequestSchema = z.object({
  /** Restrict to specific topic slugs. Default: every topic at threshold. */
  topics: z.array(z.string()).optional(),
  /** Force recompile even when sources are unchanged. Default false. */
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
};

// ---------- strategy ----------

/**
 * Strategy factory: closes over the validated request so `plan()` can
 * read `topics`, `force`, and `dry_run` without re-parsing the body.
 */
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

  const added: Mutation["added"] = [];
  const changed: Mutation["changed"] = [];
  const failed: SynthesizeSummary["failed"] = [];
  const skipped: SynthesizeSummary["skipped"] = [];
  for (const target of capped) {
    const article = await compileWikiArticle({
      apiKey: env.ANTHROPIC_API_KEY,
      model: env.ANTHROPIC_MODEL,
      systemPrompt: WIKI_SYNTHESIS_SYSTEM,
      userMessage: buildUserMessage({
        topic: target.topic,
        sources: target.sources,
        otherActiveTopics: allActiveTopics.filter((t) => t !== target.topic),
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
    const markdown = buildArticleMarkdown({
      article: article.data,
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
  // Topics with up-to-date sources never enter `capped` (filtered above);
  // none currently land in skipped[]. Keeping the field for forward-compat
  // when other reasons (e.g. token-cap) get split out.

  const summary: SynthesizeSummary = {
    active_topics: allActiveTopics,
    compiled: added.length + changed.length,
    failed,
    skipped,
  };

  return {
    ok: true,
    data: {
      mutation: { added, changed },
      summary,
    },
  };
}

function buildPrBody(
  plan: PlanOutput<SynthesizeSummary>,
  crosslink?: CrosslinkResult,
): string {
  const summary = plan.summary ?? { active_topics: [], compiled: 0, failed: [], skipped: [] };
  const writes = [
    ...plan.mutation.added.map((f) => f.path),
    ...plan.mutation.changed.map((f) => f.path),
  ];
  const { skipped, failed } = summary;
  const lines: string[] = [
    "Automated wiki synthesis run.",
    "",
    `- Compiled: ${writes.length}`,
    `- Skipped: ${skipped.length}`,
  ];
  if (failed.length > 0) {
    lines.push(`- Failed: ${failed.length}`);
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

// ---------- handler ----------

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
    branch: result.branch,
    pr: result.pr_number ? { number: result.pr_number, url: result.pr_url } : null,
    crosslink: result.crosslink
      ? {
          forward: result.crosslink.forward,
          backward: result.crosslink.backward,
          applied: result.crosslink.applied.length,
        }
      : null,
  });
}

// Adapts worker Env into substrate deps; curries `gh` into github.ts helpers
// and wires the crosslink runner.
export function makePipelineDeps(env: Env): {
  github: GithubDeps;
  runCrosslink: ReturnType<typeof makeCrosslinkRunner>;
} {
  const gh = createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO);
  const github: GithubDeps = {
    getBranchSha: (branch) => getBranchSha(branch, gh),
    createBranch: (branch, fromSha) => createBranch(branch, fromSha, gh),
    getFile: (path, ref) => getFile(path, ref, gh),
    putFile: (args) => putFile({ ...args, gh }),
    findOpenPrByBranch: (branch) => findOpenPrByBranch(branch, gh),
    openPullRequest: (args) => openPullRequest({ ...args, gh }),
  };
  const runCrosslink = makeCrosslinkRunner(env, {
    listDir: (path, ref) => listDir(path, ref ?? "main", gh),
    getFile: (path, ref) => getFile(path, ref ?? "main", gh),
  });
  return { github, runCrosslink };
}

// ---------- enumeration ----------

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
        continue;
      }
      const parsed = matter(loaded.data.content);
      const data = parsed.data as Record<string, unknown>;
      if (typeof data.url !== "string" || typeof data.added !== "string") {
        continue;
      }
      all.push({
        slug: readingSlugFromPath(file.path),
        path: file.path,
        title: typeof data.title === "string" ? data.title : "",
        url: data.url,
        summary: typeof data.summary === "string" ? data.summary : "",
        category: typeof data.category === "string" ? data.category : "other",
        added: data.added,
        ...(typeof data.author === "string" ? { author: data.author } : {}),
        ...(typeof data.source === "string" ? { source: data.source } : {}),
        topics: Array.isArray(data.topics) ? (data.topics as unknown[]).filter(isString) : [],
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

// ---------- clustering ----------

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

// ---------- prompt building ----------

function buildUserMessage(args: {
  topic: string;
  sources: ReadingSource[];
  otherActiveTopics: string[];
}): string {
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
  if (args.otherActiveTopics.length > 0) {
    parts.push(
      "",
      `Other active concepts (use only these for related_concepts if relevant): ${args.otherActiveTopics.join(", ")}`,
    );
  }
  return parts.filter((line) => line !== "").join("\n");
}

// ---------- markdown writer ----------

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
  };
  if (args.article.related_concepts && args.article.related_concepts.length > 0) {
    data.related_concepts = args.article.related_concepts;
  }
  data.compiled_at = args.compiledAt.toISOString();
  data.compiled_with = args.article.model;
  return matter.stringify(args.article.body.trim(), data);
}

// ---------- helpers ----------

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

