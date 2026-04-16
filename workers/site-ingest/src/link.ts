/**
 * POST /link — synchronous reading-catalog pipeline.
 *
 * Flow per request:
 *   1. Validate body (url required; title/excerpt optional).
 *   2. If title missing, fetch the URL and extract <title> via regex.
 *      Fallback: hostname. We never fail the request over this step.
 *   3. Call Anthropic to produce a strict-JSON summary + category.
 *   4. Compose a markdown entry and commit it directly to main.
 *
 * Auth + rate limiting already enforced upstream in index.ts.
 */

import { summarizeLink } from "./anthropic.ts";
import { createGitHubClient, getBranchSha, getFile, putFile } from "./github.ts";
import { LINK_SUMMARY_SYSTEM } from "./prompts.ts";
import type { Env, LinkRequest, LinkSummary, Result } from "./types.ts";
import { fileTimestamp, log, monthKey, slugify, yamlEscape } from "./util.ts";

const MAX_BODY_BYTES = 10_000;
const MAX_EXCERPT_LENGTH = 2000;
const MAX_PAGE_FETCH_BYTES = 200_000;
const PAGE_FETCH_TIMEOUT_MS = 5000;

export async function handle(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
): Promise<Response> {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "body too large" }, 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "invalid JSON" }, 400);
  }

  const validation = validate(parsed);
  if (!validation.ok) {
    return json({ ok: false, error: validation.error }, 400);
  }
  const body = validation.data;

  // Resolve title if missing. Best-effort; page fetch failures don't block.
  const resolvedTitle = body.title ?? (await fetchPageTitle(body.url));

  // Call Anthropic for summary + category. Falls back to a stub on failure.
  const summaryResult = await summarizeLink({
    apiKey: env.ANTHROPIC_API_KEY,
    systemPrompt: LINK_SUMMARY_SYSTEM,
    userMessage: buildLinkUserMessage({
      title: resolvedTitle,
      url: body.url,
      excerpt: body.excerpt,
    }),
  });

  const summary: LinkSummary = summaryResult.ok
    ? summaryResult.data
    : { summary: "Saved link.", category: "other" };
  if (!summaryResult.ok) {
    log.warn("link", "summarize", "using stub summary after failure", {
      error: summaryResult.error,
    });
  }

  // Compose markdown + commit.
  const added = new Date();
  const finalTitle = resolvedTitle || new URL(body.url).hostname;
  const markdown = buildEntryMarkdown({
    title: finalTitle,
    url: body.url,
    summary,
    added,
  });
  const path = buildEntryPath({ env, added, title: finalTitle });
  const commitResult = await commitEntry({
    env,
    path,
    markdown,
    title: finalTitle,
  });
  if (!commitResult.ok) {
    return json({ ok: false, error: commitResult.error }, 500);
  }

  log.info("link", "commit", "reading entry committed", {
    path,
    category: summary.category,
  });
  return json(
    {
      ok: true,
      path,
      category: summary.category,
      commit: commitResult.commitSha,
    },
    200,
  );
}

// ---------- validation ----------

function validate(input: unknown): Result<LinkRequest> {
  if (!input || typeof input !== "object") return { ok: false, error: "body must be an object" };
  const obj = input as Record<string, unknown>;

  if (typeof obj.url !== "string") return { ok: false, error: "url required (string)" };
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(obj.url);
  } catch {
    return { ok: false, error: "url is not a valid URL" };
  }
  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return { ok: false, error: "url must be http or https" };
  }

  let title: string | undefined;
  if (obj.title !== undefined && obj.title !== null && obj.title !== "") {
    if (typeof obj.title !== "string") return { ok: false, error: "title must be a string" };
    title = obj.title.trim().slice(0, 200);
  }

  let excerpt: string | undefined;
  if (obj.excerpt !== undefined && obj.excerpt !== null && obj.excerpt !== "") {
    if (typeof obj.excerpt !== "string") return { ok: false, error: "excerpt must be a string" };
    excerpt = obj.excerpt.trim().slice(0, MAX_EXCERPT_LENGTH);
  }

  return {
    ok: true,
    data: {
      url: obj.url,
      ...(title ? { title } : {}),
      ...(excerpt ? { excerpt } : {}),
    },
  };
}

// ---------- page title fetch ----------

async function fetchPageTitle(url: string): Promise<string | undefined> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PAGE_FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "site-ingest-link-bot/0.1" },
    });
    if (!res.ok || !res.body) return undefined;

    // HTML <title> is near the top, so a partial read is sufficient.
    // Stream-decode until we have enough characters, then cancel.
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let html = "";
    while (html.length < MAX_PAGE_FETCH_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      html += decoder.decode(value, { stream: true });
    }
    reader.cancel().catch(() => {});

    const match = /<title[^>]*>([^<]+)<\/title>/i.exec(html);
    if (!match || !match[1]) return undefined;
    return decodeHtmlEntities(match[1].trim()).slice(0, 200);
  } catch (err) {
    log.warn("link", "fetch-title", "page fetch failed", {
      msg: err instanceof Error ? err.message : "unknown",
    });
    return undefined;
  } finally {
    clearTimeout(timeout);
  }
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

// ---------- markdown composition ----------

function buildLinkUserMessage(args: {
  title?: string | undefined;
  url: string;
  excerpt?: string | undefined;
}): string {
  const parts = [
    "Article data for summarization:",
    `Title: ${args.title ?? "(unknown)"}`,
    `URL: ${args.url}`,
  ];
  if (args.excerpt) {
    parts.push("", "Excerpt:", args.excerpt);
  }
  return parts.join("\n");
}

function buildEntryMarkdown(args: {
  title: string;
  url: string;
  summary: LinkSummary;
  added: Date;
}): string {
  const { title, url, summary, added } = args;
  const lines = [
    "---",
    `title: "${yamlEscape(title, 200)}"`,
    `url: ${url}`,
    `summary: "${yamlEscape(summary.summary, 240)}"`,
    `category: ${summary.category}`,
    `added: ${added.toISOString()}`,
  ];
  if (summary.author) lines.push(`author: "${yamlEscape(summary.author, 80)}"`);
  if (summary.source) lines.push(`source: "${yamlEscape(summary.source, 80)}"`);
  lines.push("---", "");
  return `${lines.join("\n")}\n`;
}

function buildEntryPath(args: { env: Env; added: Date; title: string }): string {
  const month = monthKey(args.added);
  const timestamp = fileTimestamp(args.added);
  const slug = slugify(args.title);
  return `${args.env.READING_DIR}/${month}/${timestamp}-${slug}.md`;
}

// ---------- commit ----------

async function commitEntry(args: {
  env: Env;
  path: string;
  markdown: string;
  title: string;
}): Promise<{ ok: true; commitSha: string } | { ok: false; error: string }> {
  const gh = createGitHubClient(args.env.GITHUB_TOKEN, args.env.GITHUB_REPO);
  // Confirm main exists (sanity check; also catches invalid repo config early).
  const mainSha = await getBranchSha("main", gh);
  if (!mainSha.ok) return { ok: false, error: `failed to resolve main: ${mainSha.error}` };

  // Check whether the path already exists (extremely rare collision). If so,
  // pass the blob SHA so the PUT succeeds as an update. Usually this returns
  // not-found and we create the file fresh.
  const existing = await getFile(args.path, "main", gh);
  const existingSha = existing.ok ? existing.data.sha : undefined;

  const put = await putFile({
    path: args.path,
    branch: "main",
    content: args.markdown,
    message: `reading: ${args.title.slice(0, 60)}`,
    ...(existingSha ? { sha: existingSha } : {}),
    gh,
  });
  if (!put.ok) return { ok: false, error: put.error };
  return { ok: true, commitSha: put.data.commitSha };
}

// ---------- response helper ----------

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
