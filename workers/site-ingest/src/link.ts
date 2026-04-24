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

import matter from "gray-matter";
import { z } from "zod";
import { summarizeLink } from "./anthropic.ts";
import { createGitHubClient, getBranchSha, getFile, putFile } from "./github.ts";
import { LINK_SUMMARY_SYSTEM } from "./prompts.ts";
import type { Env, LinkRequest, LinkSummary, Result } from "./types.ts";
import { fileTimestamp, jsonResponse, log, monthKey, slugify } from "./util.ts";

// iOS Safari share sheet can pass whole article text as `excerpt` when the
// user hasn't selected anything. 10 KB bounces legit shares; 100 KB still
// caps adversarial payloads and excerpt is truncated to MAX_EXCERPT_LENGTH
// post-parse, so the stored value stays bounded regardless. 16 KB excerpt
// gives Anthropic enough context for longform tech articles (~$0.015/call
// at Sonnet 4.6 prices) while keeping prompt budget reasonable.
const MAX_BODY_BYTES = 100_000;
const MAX_EXCERPT_LENGTH = 16_000;
const MAX_PAGE_FETCH_BYTES = 200_000;
const PAGE_FETCH_TIMEOUT_MS = 5000;

export async function handle(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
): Promise<Response> {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, error: "body too large" }, 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return jsonResponse({ ok: false, error: "invalid JSON" }, 400);
  }

  const validation = validate(parsed);
  if (!validation.ok) {
    return jsonResponse({ ok: false, error: validation.error }, 400);
  }
  const body = validation.data;

  // Resolve title if missing. Best-effort; page fetch failures don't block.
  const resolvedTitle = body.title ?? (await fetchPageTitle(body.url));

  // Falls back to a stub summary if Anthropic is unavailable so a transient
  // outage doesn't lose the link entirely. The stub is committed to the
  // repo but the response signals `degraded: true` so the client knows the
  // entry needs a manual pass.
  const summaryResult = await summarizeLink({
    apiKey: env.ANTHROPIC_API_KEY,
    model: env.ANTHROPIC_MODEL,
    systemPrompt: LINK_SUMMARY_SYSTEM,
    userMessage: buildLinkUserMessage({
      title: resolvedTitle,
      url: body.url,
      excerpt: body.excerpt,
    }),
  });

  const degraded = !summaryResult.ok;
  // On degraded path, title is empty so the fallback chain in the caller
  // picks the page-fetched title (or hostname) instead. Topics and detail
  // fall back to empty values the schema still accepts post-parse.
  const summary: LinkSummary = summaryResult.ok
    ? summaryResult.data
    : {
        title: "",
        summary: "Saved link.",
        category: "other",
        topics: ["unsorted"],
        detail: "",
        model: "unknown",
      };
  if (!summaryResult.ok) {
    log.warn("link", "summarize", "using stub summary after failure", {
      error: summaryResult.error,
    });
  }

  const added = new Date();
  // Title priority: AI-cleaned > page-fetched > hostname. The AI-cleaned
  // title strips GitHub's "GitHub - org/repo: description" boilerplate,
  // publisher suffixes like " - NYT", and hostname-only fallbacks into a
  // short archive-friendly form. Non-empty check guards against a
  // degenerate empty string that would otherwise produce a blank title.
  const cleanedTitle = summary.title?.trim();
  const finalTitle = cleanedTitle || resolvedTitle || new URL(body.url).hostname;
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
    return jsonResponse({ ok: false, error: commitResult.error }, 500);
  }

  log.info("link", "commit", "reading entry committed", {
    path,
    category: summary.category,
  });
  return jsonResponse(
    {
      ok: true,
      path,
      category: summary.category,
      commit: commitResult.commitSha,
      ...(degraded ? { degraded: true } : {}),
    },
    200,
  );
}

// ---------- validation ----------

const MAX_TITLE_LENGTH = 200;

// Trim + truncate a string field to `max` chars; empty-string / null inputs
// fold to undefined so callers can drop the field entirely.
const optionalTrimmedString = (max: number) =>
  z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z
      .string()
      .transform((s) => s.trim().slice(0, max))
      .optional(),
  );

const httpUrlSchema = z.string().refine(
  (u) => {
    try {
      const p = new URL(u).protocol;
      return p === "http:" || p === "https:";
    } catch {
      return false;
    }
  },
  { message: "url must be a valid http or https URL" },
);

const LinkRequestSchema = z.object({
  url: httpUrlSchema,
  title: optionalTrimmedString(MAX_TITLE_LENGTH),
  excerpt: optionalTrimmedString(MAX_EXCERPT_LENGTH),
});

// Exported for unit tests; in-file callers use it directly.
export function validate(input: unknown): Result<LinkRequest> {
  const r = LinkRequestSchema.safeParse(input);
  if (r.success) {
    return { ok: true, data: r.data };
  }
  const issue = r.error.issues[0];
  const path = issue?.path?.join(".") ?? "body";
  const message = issue?.message ?? "invalid";
  return { ok: false, error: `${path}: ${message}` };
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
    if (!res.ok || !res.body) {
      return undefined;
    }

    // HTML <title> is near the top, so a partial read is sufficient.
    // Stream-decode until we have enough characters, then cancel.
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let html = "";
    while (html.length < MAX_PAGE_FETCH_BYTES) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      html += decoder.decode(value, { stream: true });
    }
    reader.cancel().catch(() => {});

    const match = /<title[^>]*>([^<]+)<\/title>/i.exec(html);
    if (!match?.[1]) {
      return undefined;
    }
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
  return (
    s
      // Named entities — common set sufficient for page titles.
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&nbsp;/g, " ")
      // Hex numeric entities — &#x27; (apostrophe), &#x2014; (em dash), etc.
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
      // Decimal numeric entities — &#39; (apostrophe), &#8212; (em dash), etc.
      .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number.parseInt(num, 10)))
  );
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
  data.compiled_at = added.toISOString();
  data.compiled_with = summary.model;
  return matter.stringify(summary.detail.trim(), data);
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
  if (!mainSha.ok) {
    return { ok: false, error: `failed to resolve main: ${mainSha.error}` };
  }

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
  if (!put.ok) {
    return { ok: false, error: put.error };
  }
  return { ok: true, commitSha: put.data.commitSha };
}
