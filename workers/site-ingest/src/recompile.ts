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

import { format as formatDate } from "date-fns";
import matter from "gray-matter";
import { convert as htmlToText } from "html-to-text";
import { z } from "zod";
import { summarizeLink } from "./anthropic.ts";
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
import type { Env, LinkSummary, Result } from "./types.ts";
import { jsonResponse, log } from "./util.ts";

const MAX_ENTRIES_PER_RUN = 25;
const IA_FETCH_TIMEOUT_MS = 10_000;
const IA_MAX_BYTES = 500_000;
const IA_EXCERPT_LENGTH = 16_000;

// ---------- request validation ----------

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

type RecompileResultRow = { path: string; status: "updated" | "skipped"; reason?: string };

type RecompileSummary = {
  matched: number;
  results: RecompileResultRow[];
  scope: RecompileRequest["scope"];
};

// ---------- strategy ----------

export function makeRecompileStrategy(req: RecompileRequest): Strategy<RecompileSummary> {
  return {
    name: "recompile",
    branchPrefix: "recompile",
    plan: async ({ env }): Promise<PlanResult<RecompileSummary>> => {
      const gh = createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO);
      const entries = await enumerateEntries(env, gh);
      if (!entries.ok) {
        return { ok: false, error: entries.error, status: 500 };
      }
      const filtered = applyScope(entries.data, req.scope).slice(0, MAX_ENTRIES_PER_RUN);

      log.info("recompile", "plan", "entries selected", {
        total: entries.data.length,
        matched: filtered.length,
        cap: MAX_ENTRIES_PER_RUN,
      });

      const results: RecompileResultRow[] = [];
      const changed: Array<{ path: string; before: string; after: string }> = [];
      for (const entry of filtered) {
        const outcome = await recompileOne(entry, env);
        if (outcome.ok) {
          changed.push({ path: entry.path, before: entry.body, after: outcome.data.content });
          results.push({ path: entry.path, status: "updated" });
        } else {
          results.push({ path: entry.path, status: "skipped", reason: outcome.error });
        }
      }

      const summary: RecompileSummary = {
        matched: filtered.length,
        results,
        scope: req.scope,
      };
      return {
        ok: true,
        data: { mutation: { added: [], changed }, summary },
      };
    },
    prTitle: ({ mutation }) =>
      `Recompile reading entries (${mutation.changed.length})`,
    prBody: (plan, crosslink) => buildPrBody(plan, crosslink),
  };
}

function buildPrBody(
  plan: PlanOutput<RecompileSummary>,
  crosslink?: CrosslinkResult,
): string {
  if (!plan.summary) { return "Automated recompile run."; }
  const summary = plan.summary;
  const updated = summary.results.filter((r) => r.status === "updated");
  const skipped = summary.results.filter((r) => r.status === "skipped");
  const lines: string[] = [
    `Automated recompile run. Scope: \`${JSON.stringify(summary.scope)}\`.`,
    "",
    `- Updated: ${updated.length}`,
    `- Skipped: ${skipped.length}`,
    "",
    "### Updated",
    ...updated.map((r) => `- \`${r.path}\``),
  ];
  if (skipped.length > 0) {
    lines.push("", "### Skipped");
    for (const r of skipped) {
      lines.push(`- \`${r.path}\` — ${r.reason ?? "unknown"}`);
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
      skipped: summary.matched - updated.length,
      results: summary.results,
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
  const updated = summary?.results.filter((r) => r.status === "updated") ?? [];
  const skipped = summary?.results.filter((r) => r.status === "skipped") ?? [];
  return jsonResponse({
    ok: true,
    dry_run: false,
    matched: summary?.matched ?? 0,
    committed: updated.length,
    skipped: skipped.length,
    branch: result.branch,
    pr: result.pr_number ? { number: result.pr_number, url: result.pr_url } : null,
    results: summary?.results ?? [],
    crosslink: result.crosslink
      ? {
          forward: result.crosslink.forward,
          backward: result.crosslink.backward,
          applied: result.crosslink.applied.length,
        }
      : null,
  });
}

// ---------- enumeration ----------

interface ParsedEntry {
  path: string;
  sha: string;
  frontmatter: Record<string, unknown>;
  body: string;
}

async function enumerateEntries(env: Env, gh: GitHubClient): Promise<Result<ParsedEntry[]>> {
  const months = await listDir(env.READING_DIR, "main", gh);
  if (!months.ok) {
    return { ok: false, error: `list months: ${months.error}` };
  }

  const all: ParsedEntry[] = [];
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
        continue;
      }
      all.push({ path: file.path, sha: loaded.data.sha, ...parsed });
    }
  }
  return { ok: true, data: all };
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
      return entries.filter((e) => {
        const added = e.frontmatter.added;
        return typeof added === "string" && new Date(added) >= threshold;
      });
    }
    case "slugs": {
      const set = new Set(scope.slugs);
      return entries.filter((e) => set.has(slugFromPath(e.path)));
    }
    case "compiled_before_model": {
      return entries.filter((e) => {
        const model = e.frontmatter.compiled_with;
        // Missing compiled_with => eligible for recompile.
        if (typeof model !== "string") {
          return true;
        }
        return model !== scope.model;
      });
    }
  }
}

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.md$/, "");
}

// ---------- frontmatter parsing ----------

function parseFrontmatter(
  markdown: string,
): { frontmatter: Record<string, unknown>; body: string } | null {
  try {
    const parsed = matter(markdown);
    if (!parsed.data || Object.keys(parsed.data).length === 0) {
      return null;
    }
    return { frontmatter: parsed.data, body: parsed.content };
  } catch (err) {
    log.warn("recompile", "frontmatter", "parse failed", {
      msg: err instanceof Error ? err.message : "unknown",
    });
    return null;
  }
}

// ---------- per-entry recompile ----------

async function recompileOne(
  entry: ParsedEntry,
  env: Env,
): Promise<Result<{ path: string; content: string }>> {
  const url = typeof entry.frontmatter.url === "string" ? entry.frontmatter.url : null;
  const added = typeof entry.frontmatter.added === "string" ? entry.frontmatter.added : null;
  const existingTitle =
    typeof entry.frontmatter.title === "string" ? entry.frontmatter.title : undefined;
  if (!url || !added) {
    return { ok: false, error: "missing url or added" };
  }

  const archive = await fetchInternetArchive(url, added);
  if (!archive.ok) {
    return { ok: false, error: `ia: ${archive.error}` };
  }

  const summary = await summarizeLink({
    apiKey: env.ANTHROPIC_API_KEY,
    model: env.ANTHROPIC_MODEL,
    systemPrompt: LINK_SUMMARY_SYSTEM,
    userMessage: buildRecompileUserMessage({
      title: existingTitle,
      url,
      excerpt: archive.data.excerpt,
    }),
  });
  if (!summary.ok) {
    return { ok: false, error: `anthropic: ${summary.error}` };
  }

  const rebuilt = buildRecompiledMarkdown({
    title: summary.data.title || existingTitle || url,
    url,
    summary: summary.data,
    added: new Date(added),
    compiledAt: new Date(),
  });

  return { ok: true, data: { path: entry.path, content: rebuilt } };
}

function buildRecompileUserMessage(args: {
  title?: string | undefined;
  url: string;
  excerpt?: string | undefined;
}): string {
  const parts = [
    "Article data for re-summarization (from Internet Archive snapshot):",
    `Title: ${args.title ?? "(unknown)"}`,
    `URL: ${args.url}`,
  ];
  if (args.excerpt) {
    parts.push("", "Excerpt:", args.excerpt);
  }
  return parts.join("\n");
}

// Exported for unit tests; in-file callers use it directly.
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
  // Reading entries are source citations, not articles — body stays empty.
  return matter.stringify("", data);
}

// ---------- internet archive ----------

async function fetchInternetArchive(
  url: string,
  addedIso: string,
): Promise<Result<{ excerpt: string; snapshotUrl: string }>> {
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
      return { ok: false, error: `availability ${availRes.status}` };
    }
    const avail = (await availRes.json()) as {
      archived_snapshots?: { closest?: { url?: string; available?: boolean } };
    };
    const snapshot = avail.archived_snapshots?.closest;
    if (!snapshot?.available || !snapshot.url) {
      return { ok: false, error: "no snapshot" };
    }

    const snapRes = await fetch(snapshot.url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "site-ingest-recompile/0.1" },
    });
    if (!snapRes.ok || !snapRes.body) {
      return { ok: false, error: `snapshot ${snapRes.status}` };
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
    reader.cancel().catch(() => {});

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
    return { ok: false, error: msg };
  } finally {
    clearTimeout(timeout);
  }
}
