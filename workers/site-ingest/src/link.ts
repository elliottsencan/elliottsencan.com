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
import type { CostRecord } from "./cost.ts";
import { createGitHubClient, getFile } from "./github.ts";
import { checkOptOutSignals, isHostExcluded } from "./optout.ts";
import { type Mutation, type PlanResult, runPipeline, type Strategy } from "./pipeline.ts";
import { LINK_SUMMARY_SYSTEM } from "./prompts.ts";
import { makePipelineDeps } from "./synthesize.ts";
import {
  applyVocabulary,
  buildVocabularyPromptBlock,
  EMPTY_VOCABULARY,
  loadCanonicalVocabulary,
} from "./topics.ts";
import type { Env, LinkRequest, LinkSummary, Result } from "./types.ts";
import {
  fileTimestamp,
  isNotFoundError,
  jsonResponse,
  log,
  monthKey,
  readingSlugFromPath,
  slugify,
} from "./util.ts";

// iOS Safari share sheet can pass whole article text as `excerpt` when the
// user hasn't selected anything. 100 KB caps adversarial payloads and
// excerpt is truncated to MAX_EXCERPT_LENGTH post-parse, so the stored
// value stays bounded regardless.
const MAX_BODY_BYTES = 100_000;
const MAX_EXCERPT_LENGTH = 16_000;
const MAX_PAGE_FETCH_BYTES = 200_000;
const PAGE_FETCH_TIMEOUT_MS = 5000;

/**
 * Cap on the number of wiki articles a single /link call will patch in its
 * mutation. A reading entry could theoretically carry up to 5 topics
 * (LinkSummarySchema) and each could match an existing wiki article; any
 * extras over this cap are skipped with a log so a runaway entry can't
 * fan out into many GitHub reads.
 */
const MAX_WIKI_PATCHES_PER_LINK = 5;
const WIKI_DIR = "src/content/wiki";

type TitleSource = "model" | "fetched" | "hostname";

type LinkSummaryRow = {
  path: string;
  category: string;
  topics_context_loaded: boolean;
  title_source: TitleSource;
  topics_committed: string[];
  topics_rewritten: Array<{ from: string; to: string }>;
  topics_coined: string[];
  topic_rationale: string | undefined;
  cost: CostRecord;
  /**
   * Set when the entry was written via the opt-out stub path
   * (kind=stub from checkOptOutSignals). Surfaces back in the HTTP
   * response so the caller can tell stub commits from normal ones.
   */
  opted_out?: string;
};

// ---------- strategy ----------

export function makeLinkStrategy(req: LinkRequest): Strategy<LinkSummaryRow> {
  return {
    name: "link",
    branchPrefix: "link",
    plan: async ({ env }): Promise<PlanResult<LinkSummaryRow>> => {
      // Copyright posture: cheap host-blocklist check first (no network IO).
      // EXCLUDED_HOSTS is a comma-separated list of hostnames; matching the
      // URL's host exactly OR any parent domain (e.g. "nyt.com" matches
      // "www.nyt.com" and "cooking.nyt.com") rejects the request.
      const requestHost = new URL(req.url).hostname;
      if (isHostExcluded(requestHost, env.EXCLUDED_HOSTS)) {
        log.info("link", "host-excluded", "rejected by EXCLUDED_HOSTS", {
          host: requestHost,
        });
        return { ok: false, status: 403, error: `host_excluded: ${requestHost}` };
      }

      // Copyright posture: per-publisher opt-out signals. Inspects
      // X-Robots-Tag, <meta name="robots">/<meta name="googlebot"> in the
      // response body, and robots.txt. Each step has a 5s timeout; results
      // for robots.txt are cached per-isolate. Tiered policy:
      //  - kind=block (robots.txt Disallow): hard reject, 451.
      //  - kind=stub (X-Robots-Tag / meta-robots opt-out tokens): write a
      //    placeholder reading entry with noindex+opted_out, no Anthropic.
      //  - kind=allow: proceed normally.
      const optOut = await checkOptOutSignals({ url: req.url });
      if (optOut.kind === "block") {
        log.info("link", "opt-out", "site opted out of ingest (hard block)", {
          host: requestHost,
          reason: optOut.reason,
        });
        return { ok: false, status: 451, error: optOut.reason };
      }
      if (optOut.kind === "stub") {
        log.info("link", "opt-out", "site opted out — writing noindex stub", {
          host: requestHost,
          reason: optOut.reason,
        });
        return planOptOutStub({
          env,
          url: req.url,
          requestTitle: req.title,
          fetchedTitle: optOut.title,
          reason: optOut.reason,
        });
      }

      // kind === "allow": reuse the title we already extracted in
      // checkOptOutSignals so we don't re-fetch the article.
      const resolvedTitle = req.title ?? optOut.title ?? (await fetchPageTitle(req.url));
      // topic_priors=false short-circuits the canonical-vocabulary fetch so the
      // model summarizes without seeing in-use slugs. Used by the rigor-
      // pass A/B run measuring topic-stability drift.
      const vocab = req.topic_priors ? await loadCanonicalVocabulary() : EMPTY_VOCABULARY;

      const summaryResult = await summarizeLink({
        apiKey: env.ANTHROPIC_API_KEY,
        model: env.ANTHROPIC_MODEL,
        systemPrompt: LINK_SUMMARY_SYSTEM,
        userMessage: buildLinkUserMessage({
          title: resolvedTitle,
          url: req.url,
          excerpt: req.excerpt,
          vocabularyBlock: buildVocabularyPromptBlock(vocab),
        }),
      });
      if (!summaryResult.ok) {
        return { ok: false, status: 502, error: `summarize: ${summaryResult.error}` };
      }
      const summary = summaryResult.data;

      // Post-process model topics: rewrite known aliases to their canonical,
      // pass through coined slugs (schema is loose). The committed array is
      // what lands in frontmatter; rewritten + coined are signal for the
      // maintenance loop and the response payload.
      const applied = applyVocabulary(summary.topics, vocab);
      const summaryWithCanonicalTopics: LinkSummary = { ...summary, topics: applied.committed };

      const added = new Date();
      const cleanedTitle = summary.title?.trim();
      let finalTitle: string;
      let titleSource: TitleSource;
      if (cleanedTitle) {
        finalTitle = cleanedTitle;
        titleSource = "model";
      } else if (resolvedTitle) {
        finalTitle = resolvedTitle;
        titleSource = "fetched";
      } else {
        finalTitle = new URL(req.url).hostname;
        titleSource = "hostname";
      }
      const markdown = buildEntryMarkdown({
        title: finalTitle,
        titleSource,
        url: req.url,
        summary: summaryWithCanonicalTopics,
        added,
      });
      const path = buildEntryPath({ env, added, title: finalTitle });
      // A1 + A3: incremental wiki sources[] patch. For every canonical topic
      // on the new entry that already has a wiki article, append the new
      // reading slug to that article's `sources[]` and bump
      // `last_source_added`. Body stays untouched. Best-effort: a missing
      // file is a no-op, a malformed one is logged + skipped, and the
      // reading entry MUST still commit either way.
      const newReadingSlug = readingSlugFromPath(path);
      const wikiPatches = await patchExistingWikiSources({
        topics: applied.committed,
        readingSlug: newReadingSlug,
        added,
        getFile: (p) => getFile(p, "main", createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO)),
        max: MAX_WIKI_PATCHES_PER_LINK,
      });
      const summaryRow: LinkSummaryRow = {
        path,
        category: summary.category,
        topics_context_loaded: vocab.loaded,
        title_source: titleSource,
        topics_committed: applied.committed,
        topics_rewritten: applied.rewritten,
        topics_coined: applied.coined,
        topic_rationale: summary.topic_rationale,
        cost: summary.cost,
      };
      return {
        ok: true,
        data: {
          mutation: { added: [{ path, content: markdown }], changed: wikiPatches },
          summary: summaryRow,
        },
      };
    },
    // /link is committed directly to main, so the substrate never opens
    // a PR for the strategy itself. These are still required by the
    // Strategy contract; they only run if the followup wiring opens a PR
    // (which it does separately, with its own title/body).
    prTitle: () => "",
    prBody: () => "",
    commitMessage: ({ added, changed }) => {
      const f = added[0] ?? changed[0];
      if (!f) {
        return "reading: empty";
      }
      const content = "content" in f ? f.content : f.after;
      const fm = matter(content).data as { title?: string };
      const title = (fm.title ?? "").slice(0, 60) || "entry";
      return `reading: ${title}`;
    },
  };
}

// ---------- handler ----------

export async function handle(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
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
  const summary = result.summary;
  log.info("link", "commit", "reading entry committed", {
    path: summary?.path,
    category: summary?.category,
    topics_context_loaded: summary?.topics_context_loaded,
    title_source: summary?.title_source,
    // Arrays serialized inline so the structured log stays one line per ingest.
    topics_committed: summary?.topics_committed.join(","),
    topics_rewritten: summary?.topics_rewritten.length
      ? summary.topics_rewritten.map((r) => `${r.from}->${r.to}`).join(",")
      : undefined,
    topics_coined: summary?.topics_coined.length ? summary.topics_coined.join(",") : undefined,
    topic_rationale: summary?.topic_rationale,
    cost_usd: summary?.cost.cost_usd,
    input_tokens: summary?.cost.usage.input_tokens,
    output_tokens: summary?.cost.usage.output_tokens,
    model: summary?.cost.model,
  });
  return jsonResponse(
    {
      ok: true,
      path: summary?.path,
      category: summary?.category,
      topics_context_loaded: summary?.topics_context_loaded ?? false,
      title_source: summary?.title_source,
      topics_committed: summary?.topics_committed ?? [],
      topics_rewritten: summary?.topics_rewritten ?? [],
      topics_coined: summary?.topics_coined ?? [],
      topic_rationale: summary?.topic_rationale,
      commit: result.commit_sha,
      cost: summary?.cost ?? null,
      ...(summary?.opted_out ? { opted_out: summary.opted_out } : {}),
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
  // Default true (production behavior — show in-use slugs to the model
  // for stability). Flip to false to measure A/B topic drift.
  topic_priors: z.boolean().default(true),
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
    reader.cancel().catch((err: unknown) => {
      log.info("link", "fetch-cancel", "reader cancel rejected", {
        msg: err instanceof Error ? err.message : "unknown",
      });
    });

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
  vocabularyBlock: string;
}): string {
  const parts = [
    "Article data for summarization:",
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

// Exported for unit tests.
export function buildEntryMarkdown(args: {
  title: string;
  titleSource: TitleSource;
  url: string;
  summary: LinkSummary;
  added: Date;
}): string {
  const { title, titleSource, url, summary, added } = args;
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
  data.title_source = titleSource;
  data.compile_cost = summary.cost;
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

// ---------- A1 + A3: incremental wiki sources[] patch ----------

/**
 * Dependency-injection surface for `patchExistingWikiSources`. Production
 * wires this to the GitHub-backed `getFile`; tests pass an in-memory map
 * so the strategy's planning step can be exercised without standing up a
 * real GitHub mock.
 */
export type WikiPatchDeps = {
  getFile: (path: string) => Promise<Result<{ content: string; sha: string }>>;
};

/**
 * For each canonical topic on a new reading entry, fetch any existing
 * wiki article whose filename slug matches and append the new reading
 * slug to its `sources[]` frontmatter (sorted, deduped). Also bumps
 * `last_source_added` so freshness drift between full re-syntheses is
 * auditable.
 *
 * Body intentionally untouched — this is the cheap incremental path. The
 * full re-synthesis (PR 5's threshold trigger and the manual /synthesize
 * call) owns body regeneration.
 *
 * Robustness contract:
 *  - 404 (no wiki article for that topic) is a no-op, not an error.
 *  - Any other failure (parse error, transient 5xx) is logged via
 *    `link:wiki-patch` and that one wiki article is skipped — the new
 *    reading entry must still commit even if a single wiki file is
 *    malformed.
 *  - At most `args.max` wiki articles are touched per call; extras are
 *    logged and skipped so a many-topic entry can't fan out indefinitely.
 *  - If the new reading slug is already in the article's `sources[]`,
 *    the article is left unchanged (idempotent).
 *
 * Exported for unit tests.
 */
export async function patchExistingWikiSources(args: {
  topics: readonly string[];
  readingSlug: string;
  added: Date;
  getFile: WikiPatchDeps["getFile"];
  max: number;
}): Promise<Mutation["changed"]> {
  const changed: Mutation["changed"] = [];
  let inspected = 0;
  for (const topic of args.topics) {
    if (inspected >= args.max) {
      log.info("link", "wiki-patch", "reached per-call cap; skipping extras", {
        cap: args.max,
        skipped_topic: topic,
      });
      continue;
    }
    inspected++;
    const path = `${WIKI_DIR}/${topic}.md`;
    const fetched = await args.getFile(path);
    if (!fetched.ok) {
      if (isNotFoundError(fetched.error)) {
        // No wiki article exists for this topic yet — the threshold
        // trigger (PR 5) handles brand-new articles, not this code path.
        continue;
      }
      log.warn("link", "wiki-patch", "wiki getFile failed; skipping", {
        path,
        error: fetched.error,
      });
      continue;
    }
    let parsed: ReturnType<typeof matter>;
    try {
      parsed = matter(fetched.data.content);
    } catch (err) {
      log.warn("link", "wiki-patch", "wiki parse failed; skipping", {
        path,
        msg: err instanceof Error ? err.message : "unknown",
      });
      continue;
    }
    const data = parsed.data as Record<string, unknown>;
    const existingSources = Array.isArray(data.sources)
      ? data.sources.filter((s): s is string => typeof s === "string")
      : [];
    if (existingSources.includes(args.readingSlug)) {
      // Idempotent — repeat /link with the same slug is a no-op for this article.
      continue;
    }
    const nextSources = [...new Set([...existingSources, args.readingSlug])].sort();
    const nextData: Record<string, unknown> = {
      ...data,
      sources: nextSources,
      last_source_added: args.added.toISOString(),
    };
    let after: string;
    try {
      after = matter.stringify(parsed.content, nextData);
    } catch (err) {
      log.warn("link", "wiki-patch", "wiki stringify failed; skipping", {
        path,
        msg: err instanceof Error ? err.message : "unknown",
      });
      continue;
    }
    log.info("link", "wiki-patch", "appended source to wiki article", {
      path,
      reading_slug: args.readingSlug,
      sources_before: existingSources.length,
      sources_after: nextSources.length,
    });
    changed.push({ path, before: fetched.data.content, after });
  }
  return changed;
}

// ---------- opt-out stub ----------

/**
 * Fixed summary text used in stub entries. Single source of truth: the
 * test asserts on this exact string.
 */
export const OPT_OUT_STUB_SUMMARY = "Publisher opted out of AI summarization.";

/**
 * Builds the planning result for an ingest-with-stub path. Used when
 * `checkOptOutSignals` returns `kind: "stub"`. No Anthropic call is made;
 * the entry's frontmatter records the signal that triggered the stub.
 *
 * Title precedence: caller-supplied `title` > title we fetched while
 * inspecting opt-out signals > URL hostname. Categorized as `other`
 * because we have no body to classify.
 */
function planOptOutStub(args: {
  env: Env;
  url: string;
  requestTitle: string | undefined;
  fetchedTitle: string | undefined;
  reason: string;
}): PlanResult<LinkSummaryRow> {
  const added = new Date();
  let finalTitle: string;
  let titleSource: TitleSource;
  if (args.requestTitle) {
    finalTitle = args.requestTitle;
    titleSource = "model";
  } else if (args.fetchedTitle) {
    finalTitle = args.fetchedTitle;
    titleSource = "fetched";
  } else {
    finalTitle = new URL(args.url).hostname;
    titleSource = "hostname";
  }
  const markdown = buildOptOutStubMarkdown({
    title: finalTitle,
    titleSource,
    url: args.url,
    reason: args.reason,
    added,
  });
  const path = buildEntryPath({ env: args.env, added, title: finalTitle });
  // Empty cost record — no Anthropic call. We surface this in the response
  // so the caller can distinguish stub vs. normal commits.
  const emptyCost: CostRecord = {
    usage: {
      input_tokens: 0,
      output_tokens: 0,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
    },
    model: "manual:opt-out-stub",
    pricing: null,
    cost_usd: 0,
  };
  const summaryRow: LinkSummaryRow = {
    path,
    category: "other",
    topics_context_loaded: false,
    title_source: titleSource,
    topics_committed: [],
    topics_rewritten: [],
    topics_coined: [],
    topic_rationale: undefined,
    cost: emptyCost,
    opted_out: args.reason,
  };
  return {
    ok: true,
    data: {
      mutation: { added: [{ path, content: markdown }], changed: [] },
      summary: summaryRow,
    },
  };
}

/**
 * Frontmatter writer for opt-out stub entries. Mirrors the shape of
 * `buildEntryMarkdown` but omits the model topics (none) and stamps
 * `noindex: true` plus `opted_out: <reason>`. Body is empty by reading-
 * entry convention.
 */
export function buildOptOutStubMarkdown(args: {
  title: string;
  titleSource: TitleSource;
  url: string;
  reason: string;
  added: Date;
}): string {
  const data: Record<string, unknown> = {
    title: args.title,
    url: args.url,
    summary: OPT_OUT_STUB_SUMMARY,
    category: "other",
    added: args.added.toISOString(),
    noindex: true,
    opted_out: args.reason,
    compiled_at: args.added.toISOString(),
    compiled_with: "manual:opt-out-stub",
    title_source: args.titleSource,
  };
  return matter.stringify("", data);
}
