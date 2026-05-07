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
} from "@shared/schemas/content.ts";
import matter from "gray-matter";
import { z } from "zod";
import { type JudgeCitationResult, type JudgeModel, judgeCitation } from "./anthropic.ts";
import type { CostRecord } from "./cost.ts";
import { RUBRIC_VERSION } from "./eval-prompts.ts";
import { createGitHubClient, type GitHubClient, getFile, listDir } from "./github.ts";
import { type PlanOutput, type PlanResult, runPipeline, type Strategy } from "./pipeline.ts";
import { makePipelineDeps } from "./synthesize.ts";
import type { Env, Result } from "./types.ts";
import { jsonResponse, log, readingSlugFromPath } from "./util.ts";

const WIKI_DIR = "src/content/wiki";
const SIDECAR_PATH = "src/content/labs/data/citation-faithfulness.json";
const DEFAULT_MAX_EVAL_CALLS_PER_RUN = 500;
const DEFAULT_MAX_ARTICLES = 20;
const DEFAULT_MAX_CLAIMS_PER_ARTICLE = 10;

const JUDGE_MODEL_SCHEMA = z.enum(["claude-haiku-4-5", "claude-sonnet-4-6"]);

export const EvalRequestSchema = z.object({
  wiki_slugs: z.array(z.string()).optional(),
  judge_models: z.array(JUDGE_MODEL_SCHEMA).optional(),
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

// ---------- pure helpers (exported for tests) ----------

/**
 * Compute sha256-hex over the article BODY only. Frontmatter changes
 * (compile_cost, compiled_at, related_concepts churn) must not invalidate
 * prior eval results. Body churn must.
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
  // Split on sentence-ending punctuation followed by whitespace, keeping the
  // punctuation glued to the preceding sentence. Simple regex; if false-
  // splitting becomes a problem, replace with a parser-aware tokenizer.
  const parts: string[] = [];
  let buf = "";
  for (let i = 0; i < paragraph.length; i++) {
    const ch = paragraph[i];
    buf += ch;
    if ((ch === "." || ch === "!" || ch === "?") && /\s/.test(paragraph[i + 1] ?? "")) {
      parts.push(buf);
      buf = "";
      // Skip the whitespace.
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
  claims: Array<{ verdict: "supported" | "partial" | "unsupported"; cost_usd: number }>,
): {
  supported: number;
  partial: number;
  unsupported: number;
  accuracy_pct: number;
  total_cost_usd: number;
} {
  let supported = 0;
  let partial = 0;
  let unsupported = 0;
  let cost = 0;
  for (const c of claims) {
    if (c.verdict === "supported") {
      supported++;
    } else if (c.verdict === "partial") {
      partial++;
    } else {
      unsupported++;
    }
    cost += c.cost_usd;
  }
  const total = supported + partial + unsupported;
  const accuracy_pct = total === 0 ? 0 : ((supported + 0.5 * partial) / total) * 100;
  return {
    supported,
    partial,
    unsupported,
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

function resolveMaxEvalCalls(env: Env): number {
  const raw = env.MAX_EVAL_CALLS_PER_RUN;
  if (!raw) {
    return DEFAULT_MAX_EVAL_CALLS_PER_RUN;
  }
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_MAX_EVAL_CALLS_PER_RUN;
}

// ---------- sidecar load + skip logic ----------

export async function loadExistingSidecar(
  gh: GitHubClient,
): Promise<CitationFaithfulnessSidecar | null> {
  const file = await getFile(SIDECAR_PATH, "main", gh);
  if (!file.ok) {
    return null;
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(file.data.content);
  } catch (err) {
    log.warn("eval", "load-sidecar", "JSON parse failed", {
      msg: err instanceof Error ? err.message : "unknown",
    });
    return null;
  }
  const validation = CitationFaithfulnessSidecarSchema.safeParse(parsed);
  if (!validation.success) {
    log.warn("eval", "load-sidecar", "schema invalid", {
      first: validation.error.issues[0]?.path.join(".") ?? "(root)",
    });
    return null;
  }
  return validation.data;
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
  return article.judges.find((j) => j.judge_model === judgeModel) ?? null;
}

// ---------- corpus enumeration ----------

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

// ---------- planning ----------

function selectArticles(articles: WikiArticleDoc[], req: EvalRequest): ArticleScope[] {
  const scoped = articles.slice(0, req.max_articles);
  return scoped.map((article) => ({
    article,
    claims: extractClaims(article.body).slice(0, req.max_claims_per_article),
  }));
}

// ---------- merge new + existing ----------

type FreshJudgeRun = {
  judge_model: JudgeModel;
  claims: Array<{
    claim_text: string;
    cited_source_slug: string;
    verdict: "supported" | "partial" | "unsupported";
    justification: string;
    cost_usd: number;
  }>;
  cost_records: CostRecord[];
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

function buildSidecar(
  outcomes: ArticleEvalOutcome[],
  preservedArticles: SidecarArticle[],
  costByJudge: Record<string, number>,
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
  const totalClaims = evaluatedArticles.reduce(
    (sum, a) => sum + (a.judges[0]?.claims.length ?? 0),
    0,
  );
  return {
    rubric_version: RUBRIC_VERSION,
    generated_at: now,
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

// ---------- strategy ----------

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
  const judgeModels: JudgeModel[] = req.judge_models ?? ["claude-haiku-4-5", "claude-sonnet-4-6"];
  const filterSlugs = req.wiki_slugs && req.wiki_slugs.length > 0 ? new Set(req.wiki_slugs) : null;

  const wikiResult = await enumerateWiki(gh, filterSlugs);
  if (!wikiResult.ok) {
    return { ok: false, error: wikiResult.error, status: 500 };
  }

  const scopes = selectArticles(wikiResult.data, req);
  const totalClaims = scopes.reduce((sum, s) => sum + s.claims.length, 0);

  const callCeiling = scopes.reduce((sum, s) => sum + s.claims.length * judgeModels.length, 0);
  const callCap = resolveMaxEvalCalls(env);
  if (callCeiling > callCap) {
    return {
      ok: false,
      error: `eval call ceiling (${callCeiling}) exceeds cap (${callCap}); narrow wiki_slugs or lower max_articles/max_claims_per_article, or set MAX_EVAL_CALLS_PER_RUN`,
      status: 400,
    };
  }

  const existing = await loadExistingSidecar(gh);

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

  // --- live run ---

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
        // Track the article's prior evaluated_at so we don't bump the
        // timestamp on a no-op run.
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
      if (!fresh.ok) {
        failed.push({
          wiki_slug: scope.article.slug,
          judge_model: judgeModel,
          error: fresh.error,
        });
        continue;
      }
      const judgeSummary = summarizeJudge(fresh.data.claims);
      judgesForArticle.push({
        judge_model: judgeModel,
        claims: fresh.data.claims,
        summary: judgeSummary,
      });
      totalCostByJudge[judgeModel] =
        (totalCostByJudge[judgeModel] ?? 0) + judgeSummary.total_cost_usd;
      freshlyEvaluated = true;
    }
    if (judgesForArticle.length === 0) {
      continue;
    }
    if (!freshlyEvaluated && allReused) {
      // Whole article reused — keep prior timestamp so the sidecar diff is empty
      // when nothing actually changed.
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

  // Articles outside this run's scope are preserved verbatim from the
  // existing sidecar (when its rubric matches). When the rubric changes,
  // we drop everything and rebuild from scratch on subsequent runs.
  const preservedArticles: SidecarArticle[] =
    existing && existing.rubric_version === RUBRIC_VERSION
      ? existing.articles.filter((a) => !outcomes.some((o) => o.article.slug === a.wiki_slug))
      : [];

  const sidecar = buildSidecar(outcomes, preservedArticles, totalCostByJudge);
  const validation = CitationFaithfulnessSidecarSchema.safeParse(sidecar);
  if (!validation.success) {
    return {
      ok: false,
      error: `built sidecar failed schema validation: ${validation.error.issues[0]?.path.join(".") ?? "(root)"}`,
      status: 500,
    };
  }
  const content = `${JSON.stringify(sidecar, null, 2)}\n`;

  // Decide added vs changed by checking whether the file already exists on
  // main. We already loaded it via loadExistingSidecar, but the call returns
  // null on not-found AND on parse-failure; distinguish via a fresh getFile.
  const existingFile = await getFile(SIDECAR_PATH, "main", gh);
  const mutation = existingFile.ok
    ? {
        added: [],
        changed: [{ path: SIDECAR_PATH, before: existingFile.data.content, after: content }],
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

async function runJudgeForArticle(
  env: Env,
  gh: GitHubClient,
  readingDir: string,
  readingCache: Map<string, ReadingDoc>,
  scope: ArticleScope,
  judgeModel: JudgeModel,
): Promise<Result<FreshJudgeRun>> {
  const claims: FreshJudgeRun["claims"] = [];
  const costRecords: CostRecord[] = [];
  for (const claim of scope.claims) {
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
        // Treat a missing source as "unsupported" — the citation is broken
        // and the eval should reflect that without crashing the article.
        claims.push({
          claim_text: claim.claim_text,
          cited_source_slug: claim.cited_source_slug,
          verdict: "unsupported",
          justification: `cited source not found in repo (${loaded.error})`,
          cost_usd: 0,
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
      return { ok: false, error: judged.error };
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
  return { ok: true, data: { judge_model: judgeModel, claims, cost_records: costRecords } };
}

// ---------- PR body ----------

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
  if (summary && summary.failed.length > 0) {
    lines.push("", "### Failed");
    for (const f of summary.failed) {
      lines.push(`- \`${f.wiki_slug}\` (${f.judge_model}) — ${f.error}`);
    }
  }
  if (summary && summary.skipped.length > 0) {
    lines.push("", `### Skipped (${summary.skipped.length})`);
    lines.push("Reused from existing sidecar — content_hash + rubric_version unchanged.");
  }
  return lines.join("\n");
}

// ---------- HTTP handler ----------

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
