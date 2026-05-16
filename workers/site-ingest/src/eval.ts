/**
 * POST /eval — Tier 1 citation-faithfulness eval.
 *
 * For each wiki article in scope, extract every sentence that cites a
 * `/reading/<slug>` source, then ask one or more judge models (Haiku and/or
 * Sonnet) whether the cited reading entry actually supports the claim.
 * Writes a sidecar JSON at `src/content/labs/data/citation-faithfulness.json`
 * via the `runPipeline` substrate, mirroring `/synthesize`.
 *
 * Skip key: (wiki_slug, content_hash, judge_model, rubric_version). The
 * sidecar's top-level rubric_version invalidates the whole file when the
 * judge prompt or schema changes; otherwise per-article verdicts are reused
 * as long as the body hash and the judge model match.
 *
 * Default `dry_run: true` — same posture as `/synthesize`. Budget governor
 * refuses to start a run whose ceiling exceeds 500 Anthropic calls unless
 * env.MAX_EVAL_CALLS_PER_RUN is set.
 */

import {
  type CitationFaithfulnessSidecar,
  CitationFaithfulnessSidecarSchema,
  JUDGE_MODELS,
  type JudgeModel,
  JudgeModelSchema,
  RUBRIC_VERSION,
} from "@shared/schemas/content.ts";
import matter from "gray-matter";
import { z } from "zod";
import { type JudgeCitationResult, judgeCitation } from "./anthropic.ts";
import type { CostRecord } from "./cost.ts";
import { createGitHubClient, type GitHubClient, getFile, listDir } from "./github.ts";
import { type PlanOutput, type PlanResult, runPipeline, type Strategy } from "./pipeline.ts";
import {
  checkGuard,
  DEFAULTS as GUARD_DEFAULTS,
  markRun,
  parseEnvNumber,
} from "./runtime-guard.ts";
import { makePipelineDeps } from "./synthesize.ts";
import type { Env, Result } from "./types.ts";
import { jsonResponse, log, readingSlugFromPath } from "./util.ts";

const WIKI_DIR = "src/content/wiki";
const SIDECAR_PATH = "src/content/labs/data/citation-faithfulness.json";
// 20 articles × 10 claims × 2 judges = 400 calls, leaving headroom under the
// 500 default ceiling.
const DEFAULT_MAX_EVAL_CALLS_PER_RUN = 500;
const DEFAULT_MAX_ARTICLES = 20;
const DEFAULT_MAX_CLAIMS_PER_ARTICLE = 10;

export const EvalRequestSchema = z.object({
  wiki_slugs: z.array(z.string()).optional(),
  judge_models: z.array(JudgeModelSchema).optional(),
  max_articles: z.number().int().positive().optional().default(DEFAULT_MAX_ARTICLES),
  max_claims_per_article: z
    .number()
    .int()
    .positive()
    .optional()
    .default(DEFAULT_MAX_CLAIMS_PER_ARTICLE),
  dry_run: z.boolean().optional().default(true),
  force: z.boolean().optional().default(false),
});

export type EvalRequest = z.infer<typeof EvalRequestSchema>;

type WikiArticleDoc = {
  slug: string;
  path: string;
  body: string;
  contentHash: string;
};

type ReadingDoc = {
  slug: string;
  title: string;
  summary: string;
  body: string;
};

type ExtractedClaim = {
  claim_text: string;
  cited_source_slug: string;
};

type ArticleScope = {
  article: WikiArticleDoc;
  claims: ExtractedClaim[];
};

type EvalSummary = {
  rubric_version: string;
  judges: JudgeModel[];
  articles_in_scope: number;
  articles_evaluated: number;
  total_claims: number;
  call_ceiling: number;
  call_count: number;
  total_cost_usd_by_judge: Record<string, number>;
  failed: Array<{ wiki_slug: string; judge_model: JudgeModel; error: string }>;
  skipped: Array<{ wiki_slug: string; judge_model: JudgeModel; reason: string }>;
  /** Per-(article, judge) pairs that this run intends to evaluate. */
  would_evaluate: Array<{ wiki_slug: string; judge_model: JudgeModel; claims: number }>;
};

/**
 * Compute sha256-hex over the article BODY only. Frontmatter changes
 * (compile_cost, compiled_at, related_concepts churn) must not invalidate
 * prior eval results. Body churn must. Treat this function's output as
 * on-disk schema: changing what it returns for unchanged bodies invalidates
 * every prior sidecar entry.
 */
export async function computeContentHash(body: string): Promise<string> {
  const data = new TextEncoder().encode(body);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(digest);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i] ?? 0;
    hex += byte.toString(16).padStart(2, "0");
  }
  return hex;
}

const READING_LINK_RE = /\(\/reading\/([^)\s]+)\)/g;

/**
 * Pull every sentence that contains at least one `/reading/<slug>` markdown
 * link. Deterministic: same body → same claim list (order, text, citation).
 *
 * Sentence boundaries are simple — split on whitespace following `.!?`.
 * Good enough for the wiki body voice (short declarative sentences, no
 * "Dr. Smith"-style abbreviations). If a single sentence cites two reading
 * slugs we emit one claim per (sentence, slug) pair so the judge call
 * targets exactly one source at a time.
 */
export function extractClaims(body: string): ExtractedClaim[] {
  const claims: ExtractedClaim[] = [];
  const paragraphs = body.split(/\n{2,}/);
  for (const paragraph of paragraphs) {
    const flat = paragraph.replace(/\n/g, " ").trim();
    if (!flat) {
      continue;
    }
    const sentences = splitSentences(flat);
    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      if (!trimmed) {
        continue;
      }
      const slugs = new Set<string>();
      let match: RegExpExecArray | null;
      READING_LINK_RE.lastIndex = 0;
      // biome-ignore lint/suspicious/noAssignInExpressions: standard exec loop.
      while ((match = READING_LINK_RE.exec(trimmed)) !== null) {
        const raw = match[1];
        if (raw) {
          slugs.add(raw);
        }
      }
      if (slugs.size === 0) {
        continue;
      }
      const sortedSlugs = [...slugs].sort();
      for (const slug of sortedSlugs) {
        claims.push({ claim_text: trimmed, cited_source_slug: slug });
      }
    }
  }
  return claims;
}

function splitSentences(paragraph: string): string[] {
  // Replace with a parser-aware tokenizer if abbreviation-style false splits
  // (Mr./Dr./e.g.) show up — current wiki voice avoids them.
  const parts: string[] = [];
  let buf = "";
  for (let i = 0; i < paragraph.length; i++) {
    const ch = paragraph[i];
    buf += ch;
    if ((ch === "." || ch === "!" || ch === "?") && /\s/.test(paragraph[i + 1] ?? "")) {
      parts.push(buf);
      buf = "";
      while (i + 1 < paragraph.length && /\s/.test(paragraph[i + 1] ?? "")) {
        i++;
      }
    }
  }
  if (buf.trim().length > 0) {
    parts.push(buf);
  }
  return parts;
}

export function summarizeJudge(
  claims: Array<{
    verdict: "supported" | "partial" | "unsupported";
    cost_usd: number;
    synthetic?: true;
  }>,
): {
  supported: number;
  partial: number;
  unsupported: number;
  synthetic_count: number;
  accuracy_pct: number;
  total_cost_usd: number;
} {
  let supported = 0;
  let partial = 0;
  let unsupported = 0;
  let synthetic_count = 0;
  let cost = 0;
  for (const c of claims) {
    if (c.verdict === "supported") {
      supported++;
    } else if (c.verdict === "partial") {
      partial++;
    } else {
      unsupported++;
    }
    if (c.synthetic) {
      synthetic_count++;
    }
    cost += c.cost_usd;
  }
  // Exclude synthetic verdicts (orphan citations) from the accuracy
  // denominator — a Tier 0 lint failure shouldn't double-count as a
  // Tier 1 faithfulness miss. They stay in the unsupported tally so the
  // raw count matches `claims.length`.
  const total = supported + partial + unsupported;
  const judged = total - synthetic_count;
  const accuracy_pct = judged === 0 ? 0 : ((supported + 0.5 * partial) / judged) * 100;
  return {
    supported,
    partial,
    unsupported,
    synthetic_count,
    accuracy_pct: round4(accuracy_pct),
    total_cost_usd: round4(cost),
  };
}

export function computeAgreement(
  judgeClaimsByModel: Map<JudgeModel, Array<{ verdict: string }>>,
): { total_claims: number; agree: number; disagree: number; agreement_pct: number } | null {
  if (judgeClaimsByModel.size < 2) {
    return null;
  }
  const models = [...judgeClaimsByModel.keys()];
  const a = judgeClaimsByModel.get(models[0] as JudgeModel) ?? [];
  const b = judgeClaimsByModel.get(models[1] as JudgeModel) ?? [];
  const n = Math.min(a.length, b.length);
  let agree = 0;
  for (let i = 0; i < n; i++) {
    if (a[i]?.verdict === b[i]?.verdict) {
      agree++;
    }
  }
  const disagree = n - agree;
  return {
    total_claims: n,
    agree,
    disagree,
    agreement_pct: n === 0 ? 0 : round4((agree / n) * 100),
  };
}

function round4(n: number): number {
  return Math.round(n * 10_000) / 10_000;
}

export function resolveMaxEvalCalls(env: { MAX_EVAL_CALLS_PER_RUN?: string }): number {
  const raw = env.MAX_EVAL_CALLS_PER_RUN;
  if (!raw) {
    return DEFAULT_MAX_EVAL_CALLS_PER_RUN;
  }
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_MAX_EVAL_CALLS_PER_RUN;
}

/**
 * Load the existing sidecar from `main`. Discriminates three states:
 *   - `{ state: "missing" }`                      — file does not exist (cold start).
 *   - `{ state: "loaded", sidecar, raw }`         — file exists and validates.
 *   - `{ state: "corrupt", raw, error }`          — file exists but is corrupt.
 *
 * `raw` is the original on-disk content, kept so callers can decide
 * `added` vs `changed` (and overwrite-on-force) without a second `getFile`
 * round-trip.
 *
 * The corrupt case is surfaced as a real state rather than silently treated
 * as missing — otherwise a single bad commit to the sidecar would trigger a
 * full Anthropic re-run on the next call. Callers respect `force: true` to
 * overwrite a corrupt file when the operator opts in.
 */
export type LoadedSidecar =
  | { state: "missing" }
  | { state: "loaded"; sidecar: CitationFaithfulnessSidecar; raw: string }
  | { state: "corrupt"; raw: string; error: string };

export async function loadExistingSidecar(gh: GitHubClient): Promise<LoadedSidecar> {
  const file = await getFile(SIDECAR_PATH, "main", gh);
  if (!file.ok) {
    return { state: "missing" };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(file.data.content);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    log.error("eval", "load-sidecar", "JSON parse failed", { msg });
    return {
      state: "corrupt",
      raw: file.data.content,
      error: `sidecar JSON parse failed: ${msg}`,
    };
  }
  const validation = CitationFaithfulnessSidecarSchema.safeParse(parsed);
  if (!validation.success) {
    const path = validation.error.issues[0]?.path.join(".") ?? "(root)";
    log.error("eval", "load-sidecar", "schema invalid", { first: path });
    return {
      state: "corrupt",
      raw: file.data.content,
      error: `sidecar schema invalid at ${path}`,
    };
  }
  return {
    state: "loaded",
    sidecar: validation.data,
    raw: file.data.content,
  };
}

export type SidecarArticle = CitationFaithfulnessSidecar["articles"][number];
export type SidecarJudge = SidecarArticle["judges"][number];

export function findExistingJudge(
  sidecar: CitationFaithfulnessSidecar | null,
  wikiSlug: string,
  contentHash: string,
  judgeModel: JudgeModel,
  rubricVersion: string,
): SidecarJudge | null {
  if (!sidecar || sidecar.rubric_version !== rubricVersion) {
    return null;
  }
  const article = sidecar.articles.find(
    (a) => a.wiki_slug === wikiSlug && a.content_hash === contentHash,
  );
  if (!article) {
    return null;
  }
  const match = article.judges.find((j) => j.judge_model === judgeModel);
  if (!match || match.partial) {
    // Partial entries (judge run abandoned mid-claim due to a sustained
    // failure) are treated as cache misses so the next run resumes.
    return null;
  }
  return match;
}

async function enumerateWiki(
  gh: GitHubClient,
  filterSlugs: Set<string> | null,
): Promise<Result<WikiArticleDoc[]>> {
  const dir = await listDir(WIKI_DIR, "main", gh);
  if (!dir.ok) {
    if (dir.error.includes("404") || dir.error.toLowerCase().includes("not found")) {
      return { ok: true, data: [] };
    }
    return { ok: false, error: `list wiki: ${dir.error}` };
  }
  const docs: WikiArticleDoc[] = [];
  for (const file of dir.data) {
    if (file.type !== "file" || !file.name.endsWith(".md")) {
      continue;
    }
    const slug = file.name.replace(/\.md$/, "");
    if (filterSlugs && !filterSlugs.has(slug)) {
      continue;
    }
    const loaded = await getFile(file.path, "main", gh);
    if (!loaded.ok) {
      log.warn("eval", "enum-wiki", "file load failed", {
        path: file.path,
        error: loaded.error,
      });
      continue;
    }
    const parsed = matter(loaded.data.content);
    const body = parsed.content;
    const contentHash = await computeContentHash(body);
    docs.push({ slug, path: file.path, body, contentHash });
  }
  docs.sort((a, b) => a.slug.localeCompare(b.slug));
  return { ok: true, data: docs };
}

async function loadReadingDoc(
  gh: GitHubClient,
  readingDir: string,
  slug: string,
): Promise<Result<ReadingDoc>> {
  // Slug shape is `<month>/<filename-without-ext>`; the on-disk file lives
  // at `${READING_DIR}/<slug>.md` with the original filename casing
  // preserved. Reading entries committed by /link use mixed-case timestamps
  // (`YYYY-MM-DDTHHmmss-...`); the slug itself is lowercased by
  // readingSlugFromPath. We try the lowercased path first and fall back to
  // listing the month dir to find the case-correct filename.
  const directPath = `${readingDir}/${slug}.md`;
  let loaded = await getFile(directPath, "main", gh);
  if (!loaded.ok) {
    const slash = slug.indexOf("/");
    if (slash === -1) {
      return { ok: false, error: `reading slug malformed: ${slug}` };
    }
    const month = slug.slice(0, slash);
    const expectedSlug = slug.toLowerCase();
    const monthDir = await listDir(`${readingDir}/${month}`, "main", gh);
    if (!monthDir.ok) {
      return { ok: false, error: `reading slug not found: ${slug}` };
    }
    const match = monthDir.data.find(
      (f) =>
        f.type === "file" && f.name.endsWith(".md") && readingSlugFromPath(f.path) === expectedSlug,
    );
    if (!match) {
      return { ok: false, error: `reading slug not found: ${slug}` };
    }
    loaded = await getFile(match.path, "main", gh);
    if (!loaded.ok) {
      return { ok: false, error: `reading file load failed: ${loaded.error}` };
    }
  }
  const parsed = matter(loaded.data.content);
  const fm = parsed.data as Record<string, unknown>;
  return {
    ok: true,
    data: {
      slug,
      title: typeof fm.title === "string" ? fm.title : "",
      summary: typeof fm.summary === "string" ? fm.summary : "",
      body: parsed.content,
    },
  };
}

function buildSourceText(doc: ReadingDoc): string {
  const parts: string[] = [];
  if (doc.title) {
    parts.push(`Title: ${doc.title}`);
  }
  if (doc.summary) {
    parts.push("", "Summary:", doc.summary);
  }
  const bodyTrimmed = doc.body.trim();
  if (bodyTrimmed) {
    parts.push("", "Body:", bodyTrimmed);
  }
  return parts.join("\n");
}

function selectArticles(articles: WikiArticleDoc[], req: EvalRequest): ArticleScope[] {
  const scoped = articles.slice(0, req.max_articles);
  return scoped.map((article) => ({
    article,
    claims: extractClaims(article.body).slice(0, req.max_claims_per_article),
  }));
}

type FreshJudgeRun = {
  judge_model: JudgeModel;
  claims: Array<{
    claim_text: string;
    cited_source_slug: string;
    verdict: "supported" | "partial" | "unsupported";
    justification: string;
    cost_usd: number;
    synthetic?: true;
  }>;
  cost_records: CostRecord[];
  /** True when the run aborted mid-claim; `claims` holds what completed. */
  partial: boolean;
  failed_claims: number;
  failure_error?: string;
};

type ArticleEvalOutcome = {
  article: WikiArticleDoc;
  claims: ExtractedClaim[];
  judges: SidecarJudge[];
  /** True if at least one judge in this article was freshly run (used to bump evaluated_at). */
  freshlyEvaluated: boolean;
  /** Existing evaluated_at if entirely reused; otherwise null. */
  preservedEvaluatedAt: string | null;
};

export function buildSidecar(
  outcomes: ArticleEvalOutcome[],
  preservedArticles: SidecarArticle[],
  costByJudge: Record<string, number>,
  priorGeneratedAt: string | null,
): CitationFaithfulnessSidecar {
  const now = new Date().toISOString();
  const evaluatedArticles: SidecarArticle[] = outcomes.map((o) => {
    const judgeClaimsByModel = new Map<JudgeModel, Array<{ verdict: string }>>();
    for (const judge of o.judges) {
      judgeClaimsByModel.set(judge.judge_model, judge.claims);
    }
    const agreement = computeAgreement(judgeClaimsByModel);
    return {
      wiki_slug: o.article.slug,
      content_hash: o.article.contentHash,
      evaluated_at: o.freshlyEvaluated ? now : (o.preservedEvaluatedAt ?? now),
      judges: o.judges,
      judge_agreement: agreement,
    };
  });
  const allArticles = [...preservedArticles, ...evaluatedArticles].sort((a, b) =>
    a.wiki_slug.localeCompare(b.wiki_slug),
  );
  // Corpus total — sum across all articles, not just this run's outcomes,
  // so a partial rerun's `total_claims` reflects the file-level number.
  const totalClaims = allArticles.reduce((sum, a) => sum + (a.judges[0]?.claims.length ?? 0), 0);
  // Reuse prior generated_at when nothing in this run produced fresh
  // verdicts — keeps the sidecar diff empty on a fully-cached rerun.
  const noFreshWork = outcomes.every((o) => !o.freshlyEvaluated);
  const generatedAt = noFreshWork && priorGeneratedAt ? priorGeneratedAt : now;
  return {
    rubric_version: RUBRIC_VERSION,
    generated_at: generatedAt,
    articles: allArticles,
    totals: {
      articles_evaluated: evaluatedArticles.length,
      total_claims: totalClaims,
      total_cost_usd_by_judge: Object.fromEntries(
        Object.entries(costByJudge).map(([k, v]) => [k, round4(v)]),
      ),
    },
  };
}

/**
 * Articles outside this run's scope are kept verbatim from the existing
 * sidecar — but only when its rubric matches. A rubric mismatch nukes the
 * whole file (the worker rebuilds from scratch on subsequent runs).
 */
export function selectPreservedArticles(
  existing: CitationFaithfulnessSidecar | null,
  outcomeSlugs: ReadonlySet<string>,
): SidecarArticle[] {
  if (!existing || existing.rubric_version !== RUBRIC_VERSION) {
    return [];
  }
  return existing.articles.filter((a) => !outcomeSlugs.has(a.wiki_slug));
}

export function makeEvalStrategy(req: EvalRequest): Strategy<EvalSummary> {
  return {
    name: "eval",
    branchPrefix: "eval/citation-faithfulness",
    plan: async ({ env }): Promise<PlanResult<EvalSummary>> => {
      const gh = createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO);
      return planEval(env, gh, req);
    },
    prTitle: ({ summary }) => {
      const articles = summary?.articles_evaluated ?? 0;
      const judges = summary?.judges.length ?? 0;
      return `Eval: citation faithfulness (${articles} article${articles === 1 ? "" : "s"}, ${judges} judge${judges === 1 ? "" : "s"})`;
    },
    prBody: (plan) => buildPrBody(plan),
  };
}

async function planEval(
  env: Env,
  gh: GitHubClient,
  req: EvalRequest,
): Promise<PlanResult<EvalSummary>> {
  const judgeModels: JudgeModel[] = req.judge_models ?? [...JUDGE_MODELS];
  const filterSlugs = req.wiki_slugs && req.wiki_slugs.length > 0 ? new Set(req.wiki_slugs) : null;

  const wikiResult = await enumerateWiki(gh, filterSlugs);
  if (!wikiResult.ok) {
    return { ok: false, error: wikiResult.error, status: 500 };
  }

  const scopes = selectArticles(wikiResult.data, req);
  const totalClaims = scopes.reduce((sum, s) => sum + s.claims.length, 0);

  // callCeiling is the worst-case spend (claims × judges) BEFORE skip-logic
  // kicks in; the actual `call_count` is post-skip. The ceiling is what the
  // budget governor rejects against — operators narrow `wiki_slugs` or lower
  // `max_articles` if they hit it.
  const callCeiling = scopes.reduce((sum, s) => sum + s.claims.length * judgeModels.length, 0);
  const callCap = resolveMaxEvalCalls(env);
  if (callCeiling > callCap) {
    return {
      ok: false,
      error: `eval call ceiling (${callCeiling}) exceeds cap (${callCap}); narrow wiki_slugs or lower max_articles/max_claims_per_article, or set MAX_EVAL_CALLS_PER_RUN`,
      status: 400,
    };
  }

  const sidecarLoad = await loadExistingSidecar(gh);
  if (sidecarLoad.state === "corrupt" && !req.force) {
    return {
      ok: false,
      error: `${sidecarLoad.error}. Pass force: true to overwrite the corrupt sidecar.`,
      status: 409,
    };
  }
  if (sidecarLoad.state === "corrupt") {
    log.warn("eval", "plan", "force overwrite of corrupt sidecar", { error: sidecarLoad.error });
  }
  const existing = sidecarLoad.state === "loaded" ? sidecarLoad.sidecar : null;
  const existingRaw =
    sidecarLoad.state === "loaded" || sidecarLoad.state === "corrupt" ? sidecarLoad.raw : null;

  const wouldEvaluate: EvalSummary["would_evaluate"] = [];
  for (const scope of scopes) {
    for (const judgeModel of judgeModels) {
      if (req.force) {
        wouldEvaluate.push({
          wiki_slug: scope.article.slug,
          judge_model: judgeModel,
          claims: scope.claims.length,
        });
        continue;
      }
      const reused = findExistingJudge(
        existing,
        scope.article.slug,
        scope.article.contentHash,
        judgeModel,
        RUBRIC_VERSION,
      );
      if (!reused) {
        wouldEvaluate.push({
          wiki_slug: scope.article.slug,
          judge_model: judgeModel,
          claims: scope.claims.length,
        });
      }
    }
  }
  const callCount = wouldEvaluate.reduce((sum, w) => sum + w.claims, 0);

  const failed: EvalSummary["failed"] = [];
  const skipped: EvalSummary["skipped"] = [];
  const totalCostByJudge: Record<string, number> = {};

  if (req.dry_run) {
    const summary: EvalSummary = {
      rubric_version: RUBRIC_VERSION,
      judges: judgeModels,
      articles_in_scope: scopes.length,
      articles_evaluated: 0,
      total_claims: totalClaims,
      call_ceiling: callCeiling,
      call_count: callCount,
      total_cost_usd_by_judge: totalCostByJudge,
      failed,
      skipped,
      would_evaluate: wouldEvaluate,
    };
    return { ok: true, data: { mutation: { added: [], changed: [] }, summary } };
  }

  const readingCache = new Map<string, ReadingDoc>();
  const outcomes: ArticleEvalOutcome[] = [];
  let articlesEvaluatedCount = 0;
  for (const scope of scopes) {
    const judgesForArticle: SidecarJudge[] = [];
    let freshlyEvaluated = false;
    let preservedEvaluatedAt: string | null = null;
    let allReused = true;
    for (const judgeModel of judgeModels) {
      const reused = req.force
        ? null
        : findExistingJudge(
            existing,
            scope.article.slug,
            scope.article.contentHash,
            judgeModel,
            RUBRIC_VERSION,
          );
      if (reused) {
        judgesForArticle.push(reused);
        skipped.push({
          wiki_slug: scope.article.slug,
          judge_model: judgeModel,
          reason: "already evaluated at current content_hash + rubric",
        });
        const prior = existing?.articles.find(
          (a) => a.wiki_slug === scope.article.slug && a.content_hash === scope.article.contentHash,
        );
        if (prior) {
          preservedEvaluatedAt = prior.evaluated_at;
        }
        continue;
      }
      allReused = false;
      const fresh = await runJudgeForArticle(
        env,
        gh,
        env.READING_DIR,
        readingCache,
        scope,
        judgeModel,
      );
      const judgeSummary = summarizeJudge(fresh.claims);
      const judgeEntry: SidecarJudge = {
        judge_model: judgeModel,
        claims: fresh.claims,
        summary: judgeSummary,
        ...(fresh.partial ? { partial: true as const, failed_claims: fresh.failed_claims } : {}),
      };
      judgesForArticle.push(judgeEntry);
      totalCostByJudge[judgeModel] =
        (totalCostByJudge[judgeModel] ?? 0) + judgeSummary.total_cost_usd;
      // Bump evaluated_at any time we wrote new claims for this article,
      // even if the run was partial — the sidecar genuinely changed.
      if (fresh.claims.length > 0) {
        freshlyEvaluated = true;
      }
      if (fresh.partial) {
        failed.push({
          wiki_slug: scope.article.slug,
          judge_model: judgeModel,
          error: `partial: ${fresh.failed_claims} claim${fresh.failed_claims === 1 ? "" : "s"} unjudged (${fresh.failure_error ?? "unknown"})`,
        });
      }
    }
    if (judgesForArticle.length === 0) {
      continue;
    }
    if (!freshlyEvaluated && allReused) {
      preservedEvaluatedAt =
        preservedEvaluatedAt ??
        existing?.articles.find(
          (a) => a.wiki_slug === scope.article.slug && a.content_hash === scope.article.contentHash,
        )?.evaluated_at ??
        null;
    }
    outcomes.push({
      article: scope.article,
      claims: scope.claims,
      judges: judgesForArticle,
      freshlyEvaluated,
      preservedEvaluatedAt,
    });
    articlesEvaluatedCount++;
  }

  const outcomeSlugs = new Set(outcomes.map((o) => o.article.slug));
  const preservedArticles = selectPreservedArticles(existing, outcomeSlugs);

  const sidecar = buildSidecar(
    outcomes,
    preservedArticles,
    totalCostByJudge,
    existing?.generated_at ?? null,
  );
  const validation = CitationFaithfulnessSidecarSchema.safeParse(sidecar);
  if (!validation.success) {
    return {
      ok: false,
      error: `built sidecar failed schema validation: ${validation.error.issues[0]?.path.join(".") ?? "(root)"}`,
      status: 500,
    };
  }
  const content = `${JSON.stringify(sidecar, null, 2)}\n`;

  const mutation =
    existingRaw !== null
      ? {
          added: [],
          changed: [{ path: SIDECAR_PATH, before: existingRaw, after: content }],
        }
      : { added: [{ path: SIDECAR_PATH, content }], changed: [] };

  const summary: EvalSummary = {
    rubric_version: RUBRIC_VERSION,
    judges: judgeModels,
    articles_in_scope: scopes.length,
    articles_evaluated: articlesEvaluatedCount,
    total_claims: totalClaims,
    call_ceiling: callCeiling,
    call_count: callCount,
    total_cost_usd_by_judge: Object.fromEntries(
      Object.entries(totalCostByJudge).map(([k, v]) => [k, round4(v)]),
    ),
    failed,
    skipped,
    would_evaluate: wouldEvaluate,
  };

  return { ok: true, data: { mutation, summary } };
}

/**
 * Run one judge over every claim in a wiki article. Always returns a
 * `FreshJudgeRun` (never a Result) — partial failures surface via the
 * `partial` + `failed_claims` fields so completed claims are persisted to
 * the sidecar instead of being thrown away on the first transient error.
 */
async function runJudgeForArticle(
  env: Env,
  gh: GitHubClient,
  readingDir: string,
  readingCache: Map<string, ReadingDoc>,
  scope: ArticleScope,
  judgeModel: JudgeModel,
): Promise<FreshJudgeRun> {
  const claims: FreshJudgeRun["claims"] = [];
  const costRecords: CostRecord[] = [];
  for (let i = 0; i < scope.claims.length; i++) {
    const claim = scope.claims[i];
    if (!claim) {
      continue;
    }
    let reading = readingCache.get(claim.cited_source_slug);
    if (!reading) {
      const loaded = await loadReadingDoc(gh, readingDir, claim.cited_source_slug);
      if (!loaded.ok) {
        log.warn("eval", "judge", "reading source unavailable", {
          wiki: scope.article.slug,
          source: claim.cited_source_slug,
          judge: judgeModel,
          error: loaded.error,
        });
        // Missing source = `unsupported`, not a crash, so a broken citation
        // surfaces in the verdicts. Tagged synthetic so accuracy excludes it.
        claims.push({
          claim_text: claim.claim_text,
          cited_source_slug: claim.cited_source_slug,
          verdict: "unsupported",
          justification: `cited source not found in repo (${loaded.error})`,
          cost_usd: 0,
          synthetic: true,
        });
        continue;
      }
      reading = loaded.data;
      readingCache.set(claim.cited_source_slug, reading);
    }
    const sourceText = buildSourceText(reading);
    const judged: Result<JudgeCitationResult> = await judgeCitation(env, {
      claim: claim.claim_text,
      sourceText,
      sourceSlug: claim.cited_source_slug,
      wikiSlug: scope.article.slug,
      judgeModel,
    });
    if (!judged.ok) {
      // Persist what we have. Treating one transient failure as
      // article-fatal would re-spend the prior claims' Anthropic budget on
      // the next run.
      return {
        judge_model: judgeModel,
        claims,
        cost_records: costRecords,
        partial: true,
        failed_claims: scope.claims.length - i,
        failure_error: judged.error,
      };
    }
    costRecords.push(judged.data.cost);
    claims.push({
      claim_text: claim.claim_text,
      cited_source_slug: claim.cited_source_slug,
      verdict: judged.data.verdict,
      justification: judged.data.justification,
      cost_usd: judged.data.cost.cost_usd ?? 0,
    });
  }
  return {
    judge_model: judgeModel,
    claims,
    cost_records: costRecords,
    partial: false,
    failed_claims: 0,
  };
}

export function buildPrBody(plan: PlanOutput<EvalSummary>): string {
  const summary = plan.summary;
  const lines: string[] = [
    "Tier 1 citation-faithfulness eval — automated run.",
    "",
    `- Rubric: \`${summary?.rubric_version ?? RUBRIC_VERSION}\``,
    `- Judges: ${summary?.judges.join(", ") ?? "(none)"}`,
    `- Articles evaluated: ${summary?.articles_evaluated ?? 0}`,
    `- Claims judged: ${summary?.total_claims ?? 0}`,
    `- Call ceiling: ${summary?.call_ceiling ?? 0} (actual fresh calls: ${summary?.call_count ?? 0})`,
  ];
  if (summary && Object.keys(summary.total_cost_usd_by_judge).length > 0) {
    lines.push("", "### Cost by judge");
    for (const [judge, cost] of Object.entries(summary.total_cost_usd_by_judge)) {
      lines.push(`- ${judge}: $${cost.toFixed(4)}`);
    }
  }
  const partials = summary?.failed.filter((f) => f.error.startsWith("partial:")) ?? [];
  const fullFailures = summary?.failed.filter((f) => !f.error.startsWith("partial:")) ?? [];
  if (partials.length > 0) {
    lines.push("", "### Partial");
    lines.push(
      "Some claims were judged before the run aborted; the partial entry is in the sidecar and the next run will resume.",
    );
    for (const f of partials) {
      lines.push(`- \`${f.wiki_slug}\` (${f.judge_model}) — ${f.error}`);
    }
  }
  if (fullFailures.length > 0) {
    lines.push("", "### Failed");
    for (const f of fullFailures) {
      lines.push(`- \`${f.wiki_slug}\` (${f.judge_model}) — ${f.error}`);
    }
  }
  if (summary && summary.skipped.length > 0) {
    lines.push("", `### Skipped (${summary.skipped.length})`);
    lines.push("Reused from existing sidecar — content_hash + rubric_version unchanged.");
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
  const validation = EvalRequestSchema.safeParse(parsed ?? {});
  if (!validation.success) {
    const issue = validation.error.issues[0];
    return jsonResponse(
      { ok: false, error: `${issue?.path?.join(".") ?? "body"}: ${issue?.message ?? "invalid"}` },
      400,
    );
  }
  const req = validation.data;
  const strategy = makeEvalStrategy(req);

  // Cooldown + daily-budget guard. Skipped on dry_run (no Anthropic spend)
  // and on force=true for cooldown (force is the manual-override escape
  // hatch); the daily budget is always enforced.
  if (!req.dry_run) {
    const cooldownSec = req.force
      ? 0
      : parseEnvNumber(
          env.EVAL_COOLDOWN_SECONDS,
          GUARD_DEFAULTS.eval.cooldown_seconds,
          "EVAL_COOLDOWN_SECONDS",
        );
    const dailyCap = parseEnvNumber(
      env.EVAL_DAILY_CALL_CAP,
      GUARD_DEFAULTS.eval.daily_call_cap,
      "EVAL_DAILY_CALL_CAP",
    );
    const guard = await checkGuard(env.NOW_INPUTS, "eval", {
      cooldown_seconds: cooldownSec,
      daily_call_cap: dailyCap,
    });
    if (!guard.ok) {
      log.info("eval", "guard", "throttled", {
        reason: guard.reason,
        details: guard.details,
      });
      return jsonResponse(
        {
          ok: false,
          throttled: guard.reason,
          details: guard.details,
          retry_after_seconds: guard.retry_after_seconds,
        },
        guard.status,
      );
    }
  }

  if (req.dry_run) {
    const planned = await strategy.plan({ env }, env);
    if (!planned.ok) {
      return jsonResponse({ ok: false, error: planned.error }, planned.status ?? 500);
    }
    const summary = planned.data.summary;
    return jsonResponse({
      ok: true,
      dry_run: true,
      rubric_version: summary?.rubric_version ?? RUBRIC_VERSION,
      judges: summary?.judges ?? [],
      articles_in_scope: summary?.articles_in_scope ?? 0,
      total_claims: summary?.total_claims ?? 0,
      call_ceiling: summary?.call_ceiling ?? 0,
      call_count: summary?.call_count ?? 0,
      would_evaluate: summary?.would_evaluate ?? [],
    });
  }

  const deps = makePipelineDeps(env);
  const result = await runPipeline(
    strategy,
    { commitTarget: "pr", crosslink: "skip" },
    env,
    ctx,
    deps,
  );
  if (!result.ok) {
    return jsonResponse({ ok: false, error: result.error }, result.status);
  }
  const summary = result.summary;
  ctx.waitUntil(markRun(env.NOW_INPUTS, "eval", summary?.call_count ?? 0));
  return jsonResponse({
    ok: true,
    dry_run: false,
    rubric_version: summary?.rubric_version ?? RUBRIC_VERSION,
    judges: summary?.judges ?? [],
    articles_evaluated: summary?.articles_evaluated ?? 0,
    total_claims: summary?.total_claims ?? 0,
    call_count: summary?.call_count ?? 0,
    total_cost_usd_by_judge: summary?.total_cost_usd_by_judge ?? {},
    failed: summary?.failed ?? [],
    skipped: summary?.skipped ?? [],
    branch: result.branch,
    pr: result.pr_number ? { number: result.pr_number, url: result.pr_url } : null,
  });
}
