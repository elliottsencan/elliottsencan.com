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
 */

import matter from "gray-matter";
import { z } from "zod";
import { MIN_WIKI_SOURCES } from "@shared/schemas/content.ts";
import { compileWikiArticle } from "./anthropic.ts";
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

// ---------- handler ----------

export async function handle(request: Request, env: Env): Promise<Response> {
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

  const gh = createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO);
  const mainSha = await getBranchSha("main", gh);
  if (!mainSha.ok) {
    return jsonResponse({ ok: false, error: `main: ${mainSha.error}` }, 500);
  }

  // Enumerate reading entries and existing wiki articles in parallel.
  const [sourcesResult, existingResult] = await Promise.all([
    enumerateReading(env, gh),
    enumerateWiki(gh),
  ]);
  if (!sourcesResult.ok) {
    return jsonResponse({ ok: false, error: sourcesResult.error }, 500);
  }
  if (!existingResult.ok) {
    return jsonResponse({ ok: false, error: existingResult.error }, 500);
  }

  const byTopic = clusterByTopic(sourcesResult.data, MIN_WIKI_SOURCES);
  const allActiveTopics = [...byTopic.keys()].sort();

  // Filter to topics requested + at-threshold + actually changed (unless forced).
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

  if (capped.length === 0) {
    return jsonResponse({
      ok: true,
      active_topics: allActiveTopics,
      compiled: 0,
      skipped: 0,
      pr: null,
    });
  }

  // Per-concept compile.
  const writes: Array<{ path: string; content: string; previousSha?: string; topic: string }> = [];
  const skipped: Array<{ topic: string; reason: string }> = [];
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
      skipped.push({ topic: target.topic, reason: `anthropic: ${article.error}` });
      continue;
    }
    const markdown = buildArticleMarkdown({
      article: article.data,
      sources: target.sources.map((s) => s.slug),
      compiledAt: new Date(),
    });
    const path = `${WIKI_DIR}/${target.topic}.md`;
    writes.push({
      path,
      content: markdown,
      ...(target.existing ? { previousSha: target.existing.sha } : {}),
      topic: target.topic,
    });
  }

  if (req.dry_run) {
    return jsonResponse({
      ok: true,
      dry_run: true,
      active_topics: allActiveTopics,
      compiled: writes.length,
      skipped: skipped.length,
      writes: writes.map((w) => ({ path: w.path, topic: w.topic })),
      skip_reasons: skipped,
    });
  }

  // Branch + commit + PR.
  const branch = `synthesis/${new Date().toISOString().slice(0, 10)}-${Date.now().toString(36)}`;
  const branchResult = await createBranch(branch, mainSha.data, gh);
  if (!branchResult.ok) {
    return jsonResponse({ ok: false, error: `branch: ${branchResult.error}` }, 500);
  }
  const committed: Array<{ path: string; topic: string }> = [];
  const failedWrites: Array<{ path: string; topic: string; error: string }> = [];
  for (const write of writes) {
    const put = await putFile({
      path: write.path,
      branch,
      content: write.content,
      message: `wiki: ${write.topic}`,
      ...(write.previousSha ? { sha: write.previousSha } : {}),
      gh,
    });
    if (put.ok) {
      committed.push({ path: write.path, topic: write.topic });
    } else {
      failedWrites.push({ path: write.path, topic: write.topic, error: put.error });
      log.error("synthesize", "commit", "put failed", { path: write.path, error: put.error });
    }
  }

  if (committed.length === 0) {
    return jsonResponse(
      {
        ok: false,
        error: "no writes committed",
        branch,
        active_topics: allActiveTopics,
        committed: 0,
        failed: failedWrites.length,
        skipped: skipped.length,
        failed_writes: failedWrites,
      },
      500,
    );
  }

  const existingPr = await findOpenPrByBranch(branch, gh);
  if (!existingPr.ok) {
    return jsonResponse(
      {
        ok: false,
        error: `pr lookup: ${existingPr.error}`,
        branch,
        committed: committed.length,
        failed: failedWrites.length,
        committed_paths: committed,
        failed_writes: failedWrites,
      },
      500,
    );
  }

  let prNumber: number | null = null;
  let prUrl: string | null = null;
  if (existingPr.data) {
    prNumber = existingPr.data.number;
  } else {
    const pr = await openPullRequest({
      title: `Wiki synthesis (${committed.length} concept${committed.length === 1 ? "" : "s"})`,
      body: buildPrBody(committed, failedWrites, skipped),
      head: branch,
      base: "main",
      gh,
    });
    if (pr.ok) {
      prNumber = pr.data.number;
      prUrl = pr.data.html_url;
    } else {
      log.error("synthesize", "pr", "open failed", { error: pr.error, branch });
      return jsonResponse(
        {
          ok: false,
          error: `pr open: ${pr.error}`,
          branch,
          committed: committed.length,
          failed: failedWrites.length,
          committed_paths: committed,
          failed_writes: failedWrites,
        },
        500,
      );
    }
  }

  return jsonResponse({
    ok: true,
    dry_run: false,
    active_topics: allActiveTopics,
    compiled: committed.length,
    failed: failedWrites.length,
    skipped: skipped.length,
    failed_writes: failedWrites,
    branch,
    pr: prNumber ? { number: prNumber, url: prUrl } : null,
  });
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

// ---------- pr body ----------

function buildPrBody(
  committed: Array<{ path: string; topic: string }>,
  failed: Array<{ path: string; topic: string; error: string }>,
  skipped: Array<{ topic: string; reason: string }>,
): string {
  const lines = [
    `Automated wiki synthesis run.`,
    "",
    `- Committed: ${committed.length}`,
    `- Failed: ${failed.length}`,
    `- Skipped: ${skipped.length}`,
  ];
  if (committed.length > 0) {
    lines.push("", "### Committed");
    for (const w of committed) {
      lines.push(`- \`${w.topic}\` -> \`${w.path}\``);
    }
  }
  if (failed.length > 0) {
    lines.push("", "### Failed");
    for (const f of failed) {
      lines.push(`- \`${f.topic}\` -> \`${f.path}\` (${f.error})`);
    }
  }
  if (skipped.length > 0) {
    lines.push("", "### Skipped");
    for (const s of skipped) {
      lines.push(`- \`${s.topic}\` (${s.reason})`);
    }
  }
  return lines.join("\n");
}

// ---------- helpers ----------

function isString(v: unknown): v is string {
  return typeof v === "string";
}

// Exported for unit tests. Compares two arrays as unordered multisets:
// returns true iff they have the same length and the same element counts.
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
