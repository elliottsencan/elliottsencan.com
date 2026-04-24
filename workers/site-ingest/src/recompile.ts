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
 *   5. Commit all updates to a branch and open a PR against main.
 *
 * Cost: one Anthropic call per entry; IA fetches are free. Capped per run
 * to keep Worker CPU budget under control — operators can split larger
 * runs across multiple invocations with the `slugs` scope.
 */

import { z } from "zod";
import { summarizeLink } from "./anthropic.ts";
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
import { LINK_SUMMARY_SYSTEM } from "./prompts.ts";
import type { Env, LinkSummary, Result } from "./types.ts";
import { jsonResponse, log, yamlEscape } from "./util.ts";

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

type RecompileRequest = z.infer<typeof RecompileRequestSchema>;

export async function handle(request: Request, env: Env): Promise<Response> {
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

  const gh = createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO);
  const mainSha = await getBranchSha("main", gh);
  if (!mainSha.ok) {
    return jsonResponse({ ok: false, error: `main: ${mainSha.error}` }, 500);
  }

  // Enumerate + filter.
  const entries = await enumerateEntries(env, gh);
  if (!entries.ok) {
    return jsonResponse({ ok: false, error: entries.error }, 500);
  }
  const filtered = applyScope(entries.data, req.scope).slice(0, MAX_ENTRIES_PER_RUN);

  log.info("recompile", "plan", "entries selected", {
    total: entries.data.length,
    matched: filtered.length,
    cap: MAX_ENTRIES_PER_RUN,
  });

  if (filtered.length === 0) {
    return jsonResponse({ ok: true, matched: 0, processed: 0, skipped: 0, pr: null });
  }

  // Per-entry recompile.
  const results: Array<{ path: string; status: "updated" | "skipped"; reason?: string }> = [];
  const updates: Array<{ path: string; content: string; previousSha: string }> = [];
  for (const entry of filtered) {
    const outcome = await recompileOne(entry, env);
    if (outcome.ok) {
      updates.push(outcome.data);
      results.push({ path: entry.path, status: "updated" });
    } else {
      results.push({ path: entry.path, status: "skipped", reason: outcome.error });
    }
  }

  if (req.dry_run) {
    return jsonResponse({
      ok: true,
      dry_run: true,
      matched: filtered.length,
      processed: updates.length,
      skipped: filtered.length - updates.length,
      results,
    });
  }

  // Commit + PR.
  const branch = `recompile/${new Date().toISOString().slice(0, 10)}-${Date.now().toString(36)}`;
  const branchResult = await createBranch(branch, mainSha.data, gh);
  if (!branchResult.ok) {
    return jsonResponse({ ok: false, error: `branch: ${branchResult.error}` }, 500);
  }

  for (const update of updates) {
    const put = await putFile({
      path: update.path,
      branch,
      content: update.content,
      message: `recompile: ${update.path.split("/").pop() ?? update.path}`,
      sha: update.previousSha,
      gh,
    });
    if (!put.ok) {
      log.warn("recompile", "commit", "put failed", {
        path: update.path,
        error: put.error,
      });
    }
  }

  const existingPr = await findOpenPrByBranch(branch, gh);
  let prNumber: number | null = null;
  let prUrl: string | null = null;
  if (existingPr.ok && existingPr.data) {
    prNumber = existingPr.data.number;
  } else {
    const pr = await openPullRequest({
      title: `Recompile reading entries (${updates.length})`,
      body: buildPrBody(results, req.scope),
      head: branch,
      base: "main",
      gh,
    });
    if (pr.ok) {
      prNumber = pr.data.number;
      prUrl = pr.data.html_url;
    } else {
      log.error("recompile", "pr", "open failed", { error: pr.error });
    }
  }

  return jsonResponse({
    ok: true,
    dry_run: false,
    matched: filtered.length,
    processed: updates.length,
    skipped: filtered.length - updates.length,
    branch,
    pr: prNumber ? { number: prNumber, url: prUrl } : null,
    results,
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

function applyScope(entries: ParsedEntry[], scope: RecompileRequest["scope"]): ParsedEntry[] {
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
        // No recorded model = pre-field era = eligible for recompile.
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

/**
 * Minimal YAML frontmatter parser for the shape `/link` emits.
 * Does NOT handle multiline values, nested objects, or complex YAML — we
 * control the writer, so the surface is bounded.
 */
function parseFrontmatter(
  markdown: string,
): { frontmatter: Record<string, unknown>; body: string } | null {
  if (!markdown.startsWith("---\n")) {
    return null;
  }
  const end = markdown.indexOf("\n---", 4);
  if (end === -1) {
    return null;
  }

  const block = markdown.slice(4, end);
  const body = markdown.slice(end + 4).replace(/^\n+/, "");

  const frontmatter: Record<string, unknown> = {};
  for (const rawLine of block.split("\n")) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }
    const colon = line.indexOf(":");
    if (colon === -1) {
      continue;
    }
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    frontmatter[key] = parseScalar(value);
  }
  return { frontmatter, body };
}

function parseScalar(value: string): unknown {
  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    if (!inner) {
      return [];
    }
    return inner.split(",").map((v) => parseScalar(v.trim()));
  }
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
  }
  return value;
}

// ---------- per-entry recompile ----------

async function recompileOne(
  entry: ParsedEntry,
  env: Env,
): Promise<Result<{ path: string; content: string; previousSha: string }>> {
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

  return {
    ok: true,
    data: { path: entry.path, content: rebuilt, previousSha: entry.sha },
  };
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

function buildRecompiledMarkdown(args: {
  title: string;
  url: string;
  summary: LinkSummary;
  added: Date;
  compiledAt: Date;
}): string {
  const { title, url, summary, added, compiledAt } = args;
  const lines = [
    "---",
    `title: "${yamlEscape(title, 200)}"`,
    `url: ${url}`,
    `summary: "${yamlEscape(summary.summary, 240)}"`,
    `category: ${summary.category}`,
    `added: ${added.toISOString()}`,
  ];
  if (summary.author) {
    lines.push(`author: "${yamlEscape(summary.author, 80)}"`);
  }
  if (summary.source) {
    lines.push(`source: "${yamlEscape(summary.source, 80)}"`);
  }
  if (summary.topics.length > 0) {
    lines.push(`topics: [${summary.topics.map((t) => `"${yamlEscape(t, 60)}"`).join(", ")}]`);
  }
  lines.push(`compiled_at: ${compiledAt.toISOString()}`);
  lines.push(`compiled_with: ${summary.model}`);
  lines.push("---", "");
  const body = summary.detail.trim();
  return body ? `${lines.join("\n")}\n${body}\n` : `${lines.join("\n")}\n`;
}

// ---------- internet archive ----------

/**
 * Fetch the archived snapshot closest to `addedIso`. Uses the Wayback
 * Availability API to resolve the snapshot URL, then fetches plain text.
 * Returns an excerpt capped at IA_EXCERPT_LENGTH so the Anthropic prompt
 * stays within budget.
 */
async function fetchInternetArchive(
  url: string,
  addedIso: string,
): Promise<Result<{ excerpt: string; snapshotUrl: string }>> {
  const ts = addedIso.replace(/[-:.TZ]/g, "").slice(0, 14);
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

    const excerpt = htmlToText(html).slice(0, IA_EXCERPT_LENGTH);
    return { ok: true, data: { excerpt, snapshotUrl: snapshot.url } };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, error: msg };
  } finally {
    clearTimeout(timeout);
  }
}

function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------- pr body ----------

function buildPrBody(
  results: Array<{ path: string; status: "updated" | "skipped"; reason?: string }>,
  scope: RecompileRequest["scope"],
): string {
  const updated = results.filter((r) => r.status === "updated");
  const skipped = results.filter((r) => r.status === "skipped");
  const lines = [
    `Automated recompile run. Scope: \`${JSON.stringify(scope)}\`.`,
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
  return lines.join("\n");
}
