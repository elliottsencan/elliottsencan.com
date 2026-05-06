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

import { MIN_WIKI_SOURCES } from "@shared/schemas/content.ts";
import matter from "gray-matter";
import { decode as decodeHtmlEntities } from "html-entities";
import { z } from "zod";
import { summarizeLink } from "./anthropic.ts";
import type { CostRecord } from "./cost.ts";
import { enumerateReadingTopics } from "./enumerate.ts";
import { createGitHubClient, type GitHubClient, getFile, listDir } from "./github.ts";
import { checkOptOutSignals, isHostExcluded } from "./optout.ts";
import type { Mutation, PlanResult, Strategy } from "./pipeline.ts";
import * as pipelineModule from "./pipeline.ts";
import { LINK_SUMMARY_SYSTEM } from "./prompts.ts";
import { makePipelineDeps, makeSynthesizeStrategy } from "./synthesize.ts";
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
/**
 * Cap on the number of single-topic /synthesize spawns a single /link call
 * will fire via ctx.waitUntil. With ≤5 topics per entry the spawn count is
 * already bounded, but a runaway threshold-cross would still produce one
 * Anthropic call per topic; capping at 3 keeps cost bounded per ingest and
 * leaves the long tail to be picked up by the next manual /synthesize.
 */
const MAX_THRESHOLD_TRIGGERS_PER_LINK = 3;
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
  /**
   * Topics whose count just crossed `MIN_WIKI_SOURCES` with this ingest
   * AND have no existing wiki article. The handler fires a single
   * /synthesize spawn over this list via ctx.waitUntil — no spawn when
   * empty. Surfaces back in the HTTP response so the operator can see at
   * a glance whether a follow-up wiki-article PR is pending.
   */
  triggered_synthesis: string[];
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
      // Hoisted: a single GitHub client shared by patchExistingWikiSources
      // (PR 4) and the threshold-trigger reading enumeration below (PR 5).
      // Reusing the client keeps connection pooling/coalescing tidy and
      // makes it cheap for tests to spy on `getFile` once.
      const gh = createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO);
      // A1 + A3: incremental wiki sources[] patch. For every canonical topic
      // on the new entry that already has a wiki article, append the new
      // reading slug to that article's `sources[]` and bump
      // `last_source_added`. Body stays untouched. Best-effort: a missing
      // file is a no-op, a malformed one is logged + skipped, and the
      // reading entry MUST still commit either way.
      const newReadingSlug = readingSlugFromPath(path);
      const { changed: wikiPatches, outcomes: wikiOutcomes } = await patchExistingWikiSources({
        topics: applied.committed,
        readingSlug: newReadingSlug,
        added,
        getFile: (p) => getFile(p, "main", gh),
        max: MAX_WIKI_PATCHES_PER_LINK,
      });
      // A2: threshold trigger candidate selection. For each canonical topic
      // on the new entry that has no existing wiki article (outcome=missing),
      // count how many reading entries are already tagged with that topic;
      // if (existing + this entry) ≥ MIN_WIKI_SOURCES the topic crosses the
      // threshold and gets queued for a single-topic /synthesize spawn.
      // Topics whose wiki article already exists are handled by the patch
      // step above; topics where we couldn't tell (outcome=error) are
      // conservatively skipped here so a transient GitHub flake can't cause
      // a duplicate spawn.
      const triggeredSynthesis = await selectThresholdTriggers({
        env,
        gh,
        canonicalTopics: applied.committed,
        wikiOutcomes,
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
        triggered_synthesis: triggeredSynthesis,
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
  const result = await pipelineModule.runPipeline(
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
    triggered_synthesis: summary?.triggered_synthesis.length
      ? summary.triggered_synthesis.join(",")
      : undefined,
  });
  // A2: fire the threshold-trigger spawn after the synchronous response
  // is committed. waitUntil keeps the Worker alive until the synthesis
  // round-trip completes so the spawn-PR actually opens; failures inside
  // the spawn are logged via op=link:threshold-trigger.
  const triggered = summary?.triggered_synthesis ?? [];
  if (triggered.length > 0) {
    ctx.waitUntil(spawnThresholdSynthesis({ topics: triggered, env, ctx }));
  }
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
      ...(triggered.length > 0 ? { triggered_synthesis: triggered } : {}),
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
 * Per-topic outcome of `patchExistingWikiSources`. PR 5's threshold
 * trigger needs to know which inspected topics had no wiki article
 * (404 → "missing") versus which had one already (whether or not we
 * actually patched it — `present`). Topics over the per-call cap aren't
 * inspected at all and are absent from the map entirely.
 *
 *  - `patched`: article existed, sources[] was extended, `last_source_added` bumped.
 *  - `unchanged`: article existed but reading slug was already in sources[] (idempotent).
 *  - `missing`: article does not exist (getFile 404). Threshold trigger candidate.
 *  - `error`: getFile/parse/stringify failed for a non-404 reason. Treated as
 *      neither present nor missing — the threshold trigger skips it because
 *      we can't safely conclude the article is absent.
 */
export type WikiPatchOutcome = "patched" | "unchanged" | "missing" | "error";

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
 * Returns `changed` (the mutation files) plus per-topic `outcomes`. PR 5's
 * threshold trigger reads `outcomes` to determine which topics are
 * candidates for a brand-new wiki article (outcome === "missing").
 *
 * Exported for unit tests.
 */
export async function patchExistingWikiSources(args: {
  topics: readonly string[];
  readingSlug: string;
  added: Date;
  getFile: WikiPatchDeps["getFile"];
  max: number;
}): Promise<{ changed: Mutation["changed"]; outcomes: Map<string, WikiPatchOutcome> }> {
  const changed: Mutation["changed"] = [];
  const outcomes = new Map<string, WikiPatchOutcome>();
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
        // trigger uses this signal to decide whether to spawn a
        // single-topic /synthesize.
        outcomes.set(topic, "missing");
        continue;
      }
      log.warn("link", "wiki-patch", "wiki getFile failed; skipping", {
        path,
        error: fetched.error,
      });
      outcomes.set(topic, "error");
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
      outcomes.set(topic, "error");
      continue;
    }
    const data = parsed.data as Record<string, unknown>;
    const existingSources = Array.isArray(data.sources)
      ? data.sources.filter((s): s is string => typeof s === "string")
      : [];
    if (existingSources.includes(args.readingSlug)) {
      // Idempotent — repeat /link with the same slug is a no-op for this article.
      outcomes.set(topic, "unchanged");
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
      outcomes.set(topic, "error");
      continue;
    }
    log.info("link", "wiki-patch", "appended source to wiki article", {
      path,
      reading_slug: args.readingSlug,
      sources_before: existingSources.length,
      sources_after: nextSources.length,
    });
    changed.push({ path, before: fetched.data.content, after });
    outcomes.set(topic, "patched");
  }
  return { changed, outcomes };
}

// ---------- A2: threshold trigger ----------

/**
 * Counts how many existing reading entries are tagged with each canonical
 * topic on the new entry. Reuses `enumerateReadingTopics` (which also
 * filters out `noindex` entries) so the count matches what /synthesize
 * would actually cluster on. Map values are the count BEFORE the new entry
 * is added — caller adds 1 for the new entry when comparing to the
 * threshold.
 *
 * Exported for unit tests.
 */
export async function countExistingTopicEntries(args: {
  env: Env;
  gh: GitHubClient;
  topics: readonly string[];
}): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  if (args.topics.length === 0) {
    return counts;
  }
  // Same shape as the crosslink-phase usage in crosslink-phase.ts:429.
  const ghDeps = {
    listDir: (path: string, ref?: string) => listDir(path, ref ?? "main", args.gh),
    getFile: (path: string, ref?: string) => getFile(path, ref ?? "main", args.gh),
  };
  const slugToTopics = await enumerateReadingTopics(args.env.READING_DIR, ghDeps);
  const wanted = new Set(args.topics);
  for (const topics of slugToTopics.values()) {
    for (const t of topics) {
      if (wanted.has(t)) {
        counts.set(t, (counts.get(t) ?? 0) + 1);
      }
    }
  }
  return counts;
}

/**
 * Determines which canonical topics on the new entry should fire a
 * single-topic /synthesize spawn. A topic crosses the threshold when:
 *
 *  - the wiki article does NOT already exist (`outcome === "missing"`),
 *    AND
 *  - the count of reading entries tagged with that topic, INCLUDING the
 *    new entry being written this run, is ≥ MIN_WIKI_SOURCES.
 *
 * Topics whose wiki article already exists are handled by
 * patchExistingWikiSources (sources[] gets the new slug appended). Topics
 * whose existence couldn't be determined (outcome = "error") are
 * conservatively skipped — re-firing on a transient flake would just
 * duplicate work.
 *
 * Capped at `MAX_THRESHOLD_TRIGGERS_PER_LINK` to bound cost. Excess
 * topics are logged so the operator can run a manual /synthesize to
 * catch up.
 *
 * Exported for unit tests.
 */
export async function selectThresholdTriggers(args: {
  env: Env;
  gh: GitHubClient;
  canonicalTopics: readonly string[];
  wikiOutcomes: Map<string, WikiPatchOutcome>;
}): Promise<string[]> {
  // Only topics whose wiki article is confirmed missing are candidates.
  // Iterate in canonicalTopics order so the cap selects deterministically
  // (preserves frontmatter order and keeps the spawn list reproducible).
  const candidates = args.canonicalTopics.filter((t) => args.wikiOutcomes.get(t) === "missing");
  if (candidates.length === 0) {
    return [];
  }
  const existingCounts = await countExistingTopicEntries({
    env: args.env,
    gh: args.gh,
    topics: candidates,
  });
  const crossed: string[] = [];
  for (const topic of candidates) {
    // +1 for the entry being written this run. The reading entry isn't on
    // disk yet, so existingCounts wouldn't include it.
    const total = (existingCounts.get(topic) ?? 0) + 1;
    if (total >= MIN_WIKI_SOURCES) {
      crossed.push(topic);
    }
  }
  if (crossed.length === 0) {
    return [];
  }
  if (crossed.length <= MAX_THRESHOLD_TRIGGERS_PER_LINK) {
    return crossed;
  }
  const selected = crossed.slice(0, MAX_THRESHOLD_TRIGGERS_PER_LINK);
  const skipped = crossed.slice(MAX_THRESHOLD_TRIGGERS_PER_LINK);
  log.info("link", "threshold-trigger", "cap reached; deferring extras", {
    cap: MAX_THRESHOLD_TRIGGERS_PER_LINK,
    selected: selected.join(","),
    skipped: skipped.join(","),
  });
  return selected;
}

/**
 * Fires a single-topic (or batched multi-topic) /synthesize spawn for the
 * topics that just crossed `MIN_WIKI_SOURCES`. Runs via `ctx.waitUntil`
 * after the synchronous /link response returns, so an Anthropic outage
 * or GitHub rate-limit can't block the operator's share-sheet flow.
 *
 * Critical: any error here is the only reason a threshold-cross might
 * silently fail to land a wiki article PR. The catch wraps every step and
 * emits `log.error` op=`link:threshold-trigger` so failures surface in
 * `wrangler tail`.
 *
 * Exported (separate from `handle`) so tests can spy on the spawn path
 * without standing up `runPipeline`.
 */
export async function spawnThresholdSynthesis(args: {
  topics: string[];
  env: Env;
  ctx: ExecutionContext;
}): Promise<void> {
  try {
    const strategy = makeSynthesizeStrategy({
      topics: args.topics,
      force: false,
      dry_run: false,
    });
    const deps = makePipelineDeps(args.env);
    const result = await pipelineModule.runPipeline(
      strategy,
      { commitTarget: "pr", crosslink: "inline" },
      args.env,
      args.ctx,
      deps,
    );
    if (!result.ok) {
      log.error("link", "threshold-trigger", "synthesis spawn returned error", {
        topics: args.topics.join(","),
        error_message: result.error,
      });
      return;
    }
    log.info("link", "threshold-trigger", "synthesis spawn opened pr", {
      topics: args.topics.join(","),
      pr: result.pr_number,
      url: result.pr_url,
    });
  } catch (err) {
    log.error("link", "threshold-trigger", "synthesis spawn threw", {
      topics: args.topics.join(","),
      error_message: err instanceof Error ? err.message : String(err),
    });
  }
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
    // Opt-out stubs land with no model topics, so there's nothing to
    // threshold-trigger. Emitting an explicit empty list keeps the
    // summary shape consistent with the normal path.
    triggered_synthesis: [],
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
