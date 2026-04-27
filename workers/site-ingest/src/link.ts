/**
 * POST /link — synchronous reading-catalog pipeline.
 *
 * Flow per request:
 *   1. Validate body (url required; title/excerpt optional).
 *   2. If title missing, fetch the URL and extract <title> via regex.
 *      Fallback: hostname. We never fail the request over this step.
 *   3. Call Anthropic to produce a strict-JSON summary + category.
 *   4. Compose a markdown entry and commit it directly to main via the
 *      runPipeline substrate. The cross-link follow-up PR (proposing links
 *      from existing wiki/blog content into the new reading entry) fires
 *      after the synchronous response returns, via ctx.waitUntil.
 *
 * Auth + rate limiting already enforced upstream in index.ts.
 */

import matter from "gray-matter";
import { decode as decodeHtmlEntities } from "html-entities";
import { z } from "zod";
import { summarizeLink } from "./anthropic.ts";
import { type PlanResult, runPipeline, type Strategy } from "./pipeline.ts";
import { LINK_SUMMARY_SYSTEM } from "./prompts.ts";
import { makePipelineDeps } from "./synthesize.ts";
import type { Env, LinkRequest, LinkSummary, Result } from "./types.ts";
import { fileTimestamp, jsonResponse, log, monthKey, slugify } from "./util.ts";

// iOS Safari share sheet can pass whole article text as `excerpt` when the
// user hasn't selected anything. 100 KB caps adversarial payloads and
// excerpt is truncated to MAX_EXCERPT_LENGTH post-parse, so the stored
// value stays bounded regardless.
const MAX_BODY_BYTES = 100_000;
const MAX_EXCERPT_LENGTH = 16_000;
const MAX_PAGE_FETCH_BYTES = 200_000;
const PAGE_FETCH_TIMEOUT_MS = 5000;

type LinkSummaryRow = {
  path: string;
  category: string;
  degraded: boolean;
};

// ---------- strategy ----------

export function makeLinkStrategy(req: LinkRequest): Strategy {
  return {
    name: "link",
    branchPrefix: "link",
    plan: async ({ env }): Promise<PlanResult> => {
      const resolvedTitle = req.title ?? (await fetchPageTitle(req.url));
      const existingTopics = await loadExistingTopics();

      // Falls back to a stub summary if Anthropic is unavailable so a
      // transient outage doesn't lose the link entirely. The stub commits
      // but the response signals `degraded: true` so the client knows the
      // entry needs a manual pass.
      const summaryResult = await summarizeLink({
        apiKey: env.ANTHROPIC_API_KEY,
        model: env.ANTHROPIC_MODEL,
        systemPrompt: LINK_SUMMARY_SYSTEM,
        userMessage: buildLinkUserMessage({
          title: resolvedTitle,
          url: req.url,
          excerpt: req.excerpt,
          existingTopics,
        }),
      });

      const degraded = !summaryResult.ok;
      const summary: LinkSummary = summaryResult.ok
        ? summaryResult.data
        : {
            title: "",
            summary: "Saved link.",
            category: "other",
            topics: ["unsorted"],
            model: "unknown",
          };
      if (!summaryResult.ok) {
        log.warn("link", "summarize", "using stub summary after failure", {
          error: summaryResult.error,
        });
      }

      const added = new Date();
      const cleanedTitle = summary.title?.trim();
      const finalTitle = cleanedTitle || resolvedTitle || new URL(req.url).hostname;
      const markdown = buildEntryMarkdown({
        title: finalTitle,
        url: req.url,
        summary,
        added,
      });
      const path = buildEntryPath({ env, added, title: finalTitle });
      const summaryRow: LinkSummaryRow = {
        path,
        category: summary.category,
        degraded,
      };
      return {
        ok: true,
        data: {
          mutation: { added: [{ path, content: markdown }], changed: [] },
          summary: summaryRow as unknown as Record<string, unknown>,
        },
      };
    },
    // /link is committed directly to main, so the substrate never opens
    // a PR for the strategy itself. These are still required by the
    // Strategy contract; they only run if the followup wiring opens a PR
    // (which it does separately, with its own title/body).
    prTitle: () => "",
    prBody: () => "",
  };
}

// ---------- handler ----------

export async function handle(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
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
  const strategy = makeLinkStrategy(validation.data);

  const deps = makePipelineDeps(env);
  const result = await runPipeline(
    strategy,
    { commitTarget: "main", crosslink: "followup" },
    env,
    ctx,
    deps,
  );
  if (!result.ok) {
    return jsonResponse({ ok: false, error: result.error }, result.status);
  }
  const summary = result.summary as unknown as LinkSummaryRow | undefined;
  log.info("link", "commit", "reading entry committed", {
    path: summary?.path,
    category: summary?.category,
  });
  return jsonResponse(
    {
      ok: true,
      path: summary?.path,
      category: summary?.category,
      commit: result.commit_sha,
      ...(summary?.degraded ? { degraded: true } : {}),
    },
    200,
  );
}

// ---------- validation ----------

const MAX_TITLE_LENGTH = 200;

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

// ---------- existing topics ----------

const READING_JSON_URL = "https://elliottsencan.com/reading.json";
const TOPICS_FETCH_TIMEOUT_MS = 3000;
const MAX_TOPICS_IN_PROMPT = 60;

/**
 * Load the union of topic slugs already in use across the reading log.
 * Source is the public `reading.json` because it's a single Cloudflare-
 * edge-cached HTTP fetch — much cheaper than enumerating GitHub contents
 * per ingest. Best-effort: any failure returns an empty list.
 */
async function loadExistingTopics(): Promise<string[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TOPICS_FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(READING_JSON_URL, { signal: controller.signal });
    if (!res.ok) {
      log.warn("link", "topics", "reading.json fetch failed", { status: res.status });
      return [];
    }
    const data = (await res.json()) as { entries?: Array<{ topics?: string[] }> };
    const seen = new Set<string>();
    for (const entry of data.entries ?? []) {
      for (const t of entry.topics ?? []) {
        if (typeof t === "string" && t.length > 0) {
          seen.add(t);
        }
      }
    }
    return [...seen].sort().slice(0, MAX_TOPICS_IN_PROMPT);
  } catch (err) {
    log.warn("link", "topics", "reading.json fetch threw", {
      msg: err instanceof Error ? err.message : "unknown",
    });
    return [];
  } finally {
    clearTimeout(timeout);
  }
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

// ---------- markdown composition ----------

function buildLinkUserMessage(args: {
  title?: string | undefined;
  url: string;
  excerpt?: string | undefined;
  existingTopics: string[];
}): string {
  const parts = [
    "Article data for summarization:",
    `Title: ${args.title ?? "(unknown)"}`,
    `URL: ${args.url}`,
  ];
  if (args.existingTopics.length > 0) {
    parts.push("", `Existing topics in use: ${args.existingTopics.join(", ")}`);
  }
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
  // Body intentionally empty: reading entries are source citations, not
  // wiki articles. Cross-source synthesis lives in src/content/wiki/,
  // produced by the /synthesize pipeline.
  return matter.stringify("", data);
}

function buildEntryPath(args: { env: Env; added: Date; title: string }): string {
  const month = monthKey(args.added);
  const timestamp = fileTimestamp(args.added);
  const slug = slugify(args.title);
  return `${args.env.READING_DIR}/${month}/${timestamp}-${slug}.md`;
}

