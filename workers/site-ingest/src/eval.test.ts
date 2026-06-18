/** Tests for the pure (non-Anthropic) pieces of eval.ts. */

import { type CitationFaithfulnessSidecar, RUBRIC_VERSION } from "@shared/schemas/content.ts";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import {
  buildSidecar,
  computeAgreement,
  computeContentHash,
  EvalRequestSchema,
  extractClaims,
  findExistingJudge,
  resolveMaxEvalCalls,
  selectPreservedArticles,
  summarizeJudge,
} from "./eval.ts";

describe("extractClaims", () => {
  it("returns empty when no /reading/ links are present", () => {
    expect(extractClaims("This is a body. No links anywhere.")).toEqual([]);
  });

  it("extracts the sentence containing a /reading/ link", () => {
    const body =
      "First sentence with no link. Second sentence cites [a source](/reading/2026-04/foo) directly.";
    const claims = extractClaims(body);
    expect(claims).toHaveLength(1);
    expect(claims[0]?.cited_source_slug).toBe("2026-04/foo");
    expect(claims[0]?.claim_text).toContain("[a source](/reading/2026-04/foo)");
  });

  it("emits one claim per (sentence, cited slug) when a sentence cites two sources", () => {
    const body =
      "A claim citing [one](/reading/2026-04/a) and also [another](/reading/2026-04/b) in the same sentence.";
    const claims = extractClaims(body);
    expect(claims).toHaveLength(2);
    const slugs = claims.map((c) => c.cited_source_slug).sort();
    expect(slugs).toEqual(["2026-04/a", "2026-04/b"]);
    // Both claims share the same sentence text.
    expect(claims[0]?.claim_text).toBe(claims[1]?.claim_text);
  });

  it("walks multiple paragraphs and keeps order stable", () => {
    const body = [
      "First para with [x](/reading/2026-04/x).",
      "",
      "Second para with no link.",
      "",
      "Third para with [y](/reading/2026-04/y) and a follow-up sentence with [z](/reading/2026-04/z).",
    ].join("\n");
    const claims = extractClaims(body);
    expect(claims.map((c) => c.cited_source_slug)).toEqual(["2026-04/x", "2026-04/y", "2026-04/z"]);
  });

  it("is deterministic: same body produces an identical claims array on repeated calls", () => {
    const body = "[a](/reading/2026-04/a). Another sentence. [b](/reading/2026-04/b) here.";
    const first = extractClaims(body);
    const second = extractClaims(body);
    expect(first).toEqual(second);
  });

  it("ignores /wiki/, http links, and bare slug strings", () => {
    const body =
      "A sentence with [wiki link](/wiki/some-concept) and a [https link](https://example.com/2026-04/foo). No /reading/ slug here.";
    expect(extractClaims(body)).toEqual([]);
  });
});

describe("computeContentHash", () => {
  it("returns the same hex string for identical bodies", async () => {
    const body = "Some body text with [a citation](/reading/2026-04/a).";
    const h1 = await computeContentHash(body);
    const h2 = await computeContentHash(body);
    expect(h1).toBe(h2);
    expect(h1).toMatch(/^[a-f0-9]{64}$/);
  });

  it("returns different hashes for different bodies", async () => {
    const a = await computeContentHash("body one");
    const b = await computeContentHash("body two");
    expect(a).not.toBe(b);
  });

  it("is body-only: changing frontmatter does not change the body's hash", async () => {
    // Build two markdown files with the same body and different frontmatter,
    // parse them, and hash only the bodies. This mirrors what eval.ts does.
    const body = "Shared body content with [src](/reading/2026-04/src).";
    const fileA = matter.stringify(body, { compiled_at: "2026-04-24T00:00:00.000Z" });
    const fileB = matter.stringify(body, {
      compiled_at: "2026-05-01T00:00:00.000Z",
      compile_cost: { cost_usd: 0.42 },
    });
    const hashA = await computeContentHash(matter(fileA).content);
    const hashB = await computeContentHash(matter(fileB).content);
    expect(hashA).toBe(hashB);
  });
});

const exampleSummary = (
  overrides: Partial<{ supported: number; partial: number; unsupported: number }> = {},
) => ({
  supported: overrides.supported ?? 1,
  partial: overrides.partial ?? 0,
  unsupported: overrides.unsupported ?? 0,
  synthetic_count: 0,
  accuracy_pct: 100,
  total_cost_usd: 0.001,
});

function fakeSidecar(args: {
  rubric?: string;
  wikiSlug: string;
  contentHash: string;
  judgeModel: "claude-haiku-4-5" | "claude-sonnet-4-6";
  partial?: boolean;
}): CitationFaithfulnessSidecar {
  return {
    rubric_version: args.rubric ?? RUBRIC_VERSION,
    generated_at: "2026-05-01T00:00:00.000Z",
    articles: [
      {
        wiki_slug: args.wikiSlug,
        content_hash: args.contentHash,
        evaluated_at: "2026-05-01T00:00:00.000Z",
        judges: [
          {
            judge_model: args.judgeModel,
            claims: [
              {
                claim_text: "An example claim.",
                cited_source_slug: "2026-04/x",
                verdict: "supported",
                justification: "the source explicitly says so",
                cost_usd: 0.001,
              },
            ],
            summary: exampleSummary(),
            ...(args.partial ? { partial: true as const, failed_claims: 3 } : {}),
          },
        ],
        judge_agreement: null,
      },
    ],
    totals: {
      articles_evaluated: 1,
      total_claims: 1,
      total_cost_usd_by_judge: { "claude-haiku-4-5": 0.001 },
    },
  };
}

describe("findExistingJudge (skip logic)", () => {
  it("returns the existing judges entry when slug + hash + model + rubric all match", () => {
    const sidecar = fakeSidecar({
      wikiSlug: "alpha",
      contentHash: "abc",
      judgeModel: "claude-haiku-4-5",
    });
    const result = findExistingJudge(sidecar, "alpha", "abc", "claude-haiku-4-5", RUBRIC_VERSION);
    expect(result).not.toBeNull();
    expect(result?.judge_model).toBe("claude-haiku-4-5");
  });

  it("returns null when sidecar is null", () => {
    expect(findExistingJudge(null, "alpha", "abc", "claude-haiku-4-5", RUBRIC_VERSION)).toBeNull();
  });

  it("returns null when the rubric version does not match", () => {
    const sidecar = fakeSidecar({
      rubric: "v0.9",
      wikiSlug: "alpha",
      contentHash: "abc",
      judgeModel: "claude-haiku-4-5",
    });
    expect(
      findExistingJudge(sidecar, "alpha", "abc", "claude-haiku-4-5", RUBRIC_VERSION),
    ).toBeNull();
  });

  it("returns null when the content hash does not match (body changed)", () => {
    const sidecar = fakeSidecar({
      wikiSlug: "alpha",
      contentHash: "abc",
      judgeModel: "claude-haiku-4-5",
    });
    expect(
      findExistingJudge(sidecar, "alpha", "different-hash", "claude-haiku-4-5", RUBRIC_VERSION),
    ).toBeNull();
  });

  it("returns null when the judge model does not match", () => {
    const sidecar = fakeSidecar({
      wikiSlug: "alpha",
      contentHash: "abc",
      judgeModel: "claude-haiku-4-5",
    });
    expect(
      findExistingJudge(sidecar, "alpha", "abc", "claude-sonnet-4-6", RUBRIC_VERSION),
    ).toBeNull();
  });

  it("returns null when the wiki slug does not match", () => {
    const sidecar = fakeSidecar({
      wikiSlug: "alpha",
      contentHash: "abc",
      judgeModel: "claude-haiku-4-5",
    });
    expect(
      findExistingJudge(sidecar, "beta", "abc", "claude-haiku-4-5", RUBRIC_VERSION),
    ).toBeNull();
  });

  it("returns null when the matching entry is partial — partial entries are not reused", () => {
    const sidecar = fakeSidecar({
      wikiSlug: "alpha",
      contentHash: "abc",
      judgeModel: "claude-haiku-4-5",
      partial: true,
    });
    expect(
      findExistingJudge(sidecar, "alpha", "abc", "claude-haiku-4-5", RUBRIC_VERSION),
    ).toBeNull();
  });
});

describe("summarizeJudge", () => {
  it("counts supported / partial / unsupported and computes accuracy with the (sup + 0.5*partial) / total formula", () => {
    const summary = summarizeJudge([
      { verdict: "supported", cost_usd: 0.001 },
      { verdict: "supported", cost_usd: 0.001 },
      { verdict: "partial", cost_usd: 0.001 },
      { verdict: "unsupported", cost_usd: 0.001 },
    ]);
    expect(summary.supported).toBe(2);
    expect(summary.partial).toBe(1);
    expect(summary.unsupported).toBe(1);
    expect(summary.synthetic_count).toBe(0);
    // (2 + 0.5*1) / 4 * 100 = 62.5
    expect(summary.accuracy_pct).toBe(62.5);
  });

  it("surfaces total cost as the sum of per-claim cost_usd", () => {
    const summary = summarizeJudge([
      { verdict: "supported", cost_usd: 0.0012 },
      { verdict: "partial", cost_usd: 0.0008 },
    ]);
    expect(summary.total_cost_usd).toBeCloseTo(0.002, 6);
  });

  it("returns 0 accuracy on empty input", () => {
    const summary = summarizeJudge([]);
    expect(summary.accuracy_pct).toBe(0);
    expect(summary.total_cost_usd).toBe(0);
    expect(summary.synthetic_count).toBe(0);
  });

  it("excludes synthetic verdicts from the accuracy denominator but counts them in unsupported", () => {
    // 2 supported + 1 unsupported judged + 2 synthetic (orphan citations).
    // Without synthetic: 2/3 = 66.6667. With raw count: would be 2/5 = 40 — wrong.
    const summary = summarizeJudge([
      { verdict: "supported", cost_usd: 0.001 },
      { verdict: "supported", cost_usd: 0.001 },
      { verdict: "unsupported", cost_usd: 0.001 },
      { verdict: "unsupported", cost_usd: 0, synthetic: true },
      { verdict: "unsupported", cost_usd: 0, synthetic: true },
    ]);
    expect(summary.supported).toBe(2);
    expect(summary.unsupported).toBe(3);
    expect(summary.synthetic_count).toBe(2);
    // (2 + 0) / (5 - 2) * 100 = 66.6667
    expect(summary.accuracy_pct).toBeCloseTo(66.6667, 3);
  });

  it("returns 0 accuracy when every claim is synthetic (denominator collapses)", () => {
    const summary = summarizeJudge([
      { verdict: "unsupported", cost_usd: 0, synthetic: true },
      { verdict: "unsupported", cost_usd: 0, synthetic: true },
    ]);
    expect(summary.synthetic_count).toBe(2);
    expect(summary.accuracy_pct).toBe(0);
  });
});

describe("resolveMaxEvalCalls", () => {
  it("falls back to the 500 default when MAX_EVAL_CALLS_PER_RUN is unset", () => {
    expect(resolveMaxEvalCalls({})).toBe(500);
  });

  it("falls back to the default when MAX_EVAL_CALLS_PER_RUN is empty", () => {
    expect(resolveMaxEvalCalls({ MAX_EVAL_CALLS_PER_RUN: "" })).toBe(500);
  });

  it("uses a positive integer override", () => {
    expect(resolveMaxEvalCalls({ MAX_EVAL_CALLS_PER_RUN: "1200" })).toBe(1200);
  });

  it("falls back when the override is non-numeric", () => {
    expect(resolveMaxEvalCalls({ MAX_EVAL_CALLS_PER_RUN: "abc" })).toBe(500);
  });

  it("falls back when the override is zero or negative", () => {
    expect(resolveMaxEvalCalls({ MAX_EVAL_CALLS_PER_RUN: "0" })).toBe(500);
    expect(resolveMaxEvalCalls({ MAX_EVAL_CALLS_PER_RUN: "-5" })).toBe(500);
  });
});

describe("selectPreservedArticles", () => {
  it("returns [] when there is no existing sidecar", () => {
    expect(selectPreservedArticles(null, new Set())).toEqual([]);
  });

  it("drops every preserved article when the rubric does not match — full invalidation", () => {
    const sidecar = fakeSidecar({
      rubric: "v0.9",
      wikiSlug: "alpha",
      contentHash: "abc",
      judgeModel: "claude-haiku-4-5",
    });
    expect(selectPreservedArticles(sidecar, new Set())).toEqual([]);
  });

  it("preserves articles outside the run's outcome scope when the rubric matches", () => {
    const sidecar = fakeSidecar({
      wikiSlug: "alpha",
      contentHash: "abc",
      judgeModel: "claude-haiku-4-5",
    });
    // No outcomes for "alpha" → it should be preserved.
    const preserved = selectPreservedArticles(sidecar, new Set());
    expect(preserved).toHaveLength(1);
    expect(preserved[0]?.wiki_slug).toBe("alpha");
  });

  it("excludes articles that are in the outcomes set (this run reran them)", () => {
    const sidecar = fakeSidecar({
      wikiSlug: "alpha",
      contentHash: "abc",
      judgeModel: "claude-haiku-4-5",
    });
    expect(selectPreservedArticles(sidecar, new Set(["alpha"]))).toEqual([]);
  });
});

describe("buildSidecar", () => {
  function makeOutcome(overrides: {
    slug: string;
    contentHash: string;
    freshlyEvaluated: boolean;
    preservedEvaluatedAt?: string | null;
  }) {
    return {
      article: {
        slug: overrides.slug,
        path: `src/content/wiki/${overrides.slug}.md`,
        body: "body",
        contentHash: overrides.contentHash,
      },
      claims: [],
      judges: [
        {
          judge_model: "claude-haiku-4-5" as const,
          claims: [
            {
              claim_text: "An example claim.",
              cited_source_slug: "2026-04/x",
              verdict: "supported" as const,
              justification: "the source explicitly says so",
              cost_usd: 0.001,
            },
          ],
          summary: exampleSummary(),
        },
      ],
      freshlyEvaluated: overrides.freshlyEvaluated,
      preservedEvaluatedAt: overrides.preservedEvaluatedAt ?? null,
    };
  }

  it("merges fresh outcomes with preserved articles, sorted alphabetically by wiki_slug", () => {
    const preserved = fakeSidecar({
      wikiSlug: "zebra",
      contentHash: "z-hash",
      judgeModel: "claude-haiku-4-5",
    }).articles;
    const sidecar = buildSidecar(
      [makeOutcome({ slug: "alpha", contentHash: "a-hash", freshlyEvaluated: true })],
      preserved,
      null,
    );
    expect(sidecar.articles.map((a) => a.wiki_slug)).toEqual(["alpha", "zebra"]);
  });

  it("derives total_cost_usd_by_judge from persisted per-judge summaries (not the run's fresh spend)", () => {
    // Both articles are entirely reused (freshlyEvaluated: false), so this run
    // spent nothing — yet the corpus cost must still reflect the two persisted
    // summaries (0.001 each). This is the regression guard: a fully-cached
    // rerun reproduces the cost field rather than zeroing it.
    const preserved = fakeSidecar({
      wikiSlug: "zebra",
      contentHash: "z-hash",
      judgeModel: "claude-haiku-4-5",
    }).articles;
    const sidecar = buildSidecar(
      [
        makeOutcome({
          slug: "alpha",
          contentHash: "a-hash",
          freshlyEvaluated: false,
          preservedEvaluatedAt: "2026-05-01T00:00:00.000Z",
        }),
      ],
      preserved,
      "2026-05-01T00:00:00.000Z",
    );
    expect(sidecar.totals.total_cost_usd_by_judge).toEqual({ "claude-haiku-4-5": 0.002 });
  });

  it("computes corpus total_claims across preserved + freshly evaluated articles", () => {
    const preserved = fakeSidecar({
      wikiSlug: "zebra",
      contentHash: "z-hash",
      judgeModel: "claude-haiku-4-5",
    }).articles;
    const sidecar = buildSidecar(
      [makeOutcome({ slug: "alpha", contentHash: "a-hash", freshlyEvaluated: true })],
      preserved,
      null,
    );
    // Each article carries 1 claim → corpus total = 2.
    expect(sidecar.totals.total_claims).toBe(2);
    // articles_evaluated reflects this run only.
    expect(sidecar.totals.articles_evaluated).toBe(1);
  });

  it("reuses prior generated_at when no outcome was freshly evaluated (byte-identical re-run)", () => {
    const prior = "2026-05-01T00:00:00.000Z";
    const sidecar = buildSidecar(
      [
        makeOutcome({
          slug: "alpha",
          contentHash: "a-hash",
          freshlyEvaluated: false,
          preservedEvaluatedAt: prior,
        }),
      ],
      [],
      prior,
    );
    expect(sidecar.generated_at).toBe(prior);
  });

  it("stamps a fresh generated_at when at least one outcome was freshly evaluated", () => {
    const prior = "2026-05-01T00:00:00.000Z";
    const sidecar = buildSidecar(
      [makeOutcome({ slug: "alpha", contentHash: "a-hash", freshlyEvaluated: true })],
      [],
      prior,
    );
    expect(sidecar.generated_at).not.toBe(prior);
  });

  it("preserves the article's prior evaluated_at when entirely reused", () => {
    const prior = "2026-04-01T00:00:00.000Z";
    const sidecar = buildSidecar(
      [
        makeOutcome({
          slug: "alpha",
          contentHash: "a-hash",
          freshlyEvaluated: false,
          preservedEvaluatedAt: prior,
        }),
      ],
      [],
      null,
    );
    expect(sidecar.articles[0]?.evaluated_at).toBe(prior);
  });
});

describe("computeAgreement", () => {
  it("returns null when only one judge ran", () => {
    const map = new Map<"claude-haiku-4-5" | "claude-sonnet-4-6", Array<{ verdict: string }>>();
    map.set("claude-haiku-4-5", [{ verdict: "supported" }]);
    expect(computeAgreement(map)).toBeNull();
  });

  it("counts agreements claim-by-claim across two judges", () => {
    const map = new Map<"claude-haiku-4-5" | "claude-sonnet-4-6", Array<{ verdict: string }>>();
    map.set("claude-haiku-4-5", [
      { verdict: "supported" },
      { verdict: "partial" },
      { verdict: "supported" },
    ]);
    map.set("claude-sonnet-4-6", [
      { verdict: "supported" },
      { verdict: "unsupported" },
      { verdict: "supported" },
    ]);
    const out = computeAgreement(map);
    expect(out).not.toBeNull();
    expect(out?.total_claims).toBe(3);
    expect(out?.agree).toBe(2);
    expect(out?.disagree).toBe(1);
    // 2/3 * 100 ≈ 66.6667
    expect(out?.agreement_pct).toBeCloseTo(66.6667, 3);
  });

  it("returns 100% when all claims agree", () => {
    const map = new Map<"claude-haiku-4-5" | "claude-sonnet-4-6", Array<{ verdict: string }>>();
    map.set("claude-haiku-4-5", [{ verdict: "supported" }, { verdict: "partial" }]);
    map.set("claude-sonnet-4-6", [{ verdict: "supported" }, { verdict: "partial" }]);
    expect(computeAgreement(map)?.agreement_pct).toBe(100);
  });
});

describe("EvalRequestSchema", () => {
  it("defaults to dry_run: true so a bare /eval call never spends Anthropic budget", () => {
    const result = EvalRequestSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.dry_run).toBe(true);
      expect(result.data.force).toBe(false);
    }
  });

  it("rejects judge_models containing claude-opus-4-7 before any Anthropic call", () => {
    const result = EvalRequestSchema.safeParse({
      judge_models: ["claude-opus-4-7"],
    });
    expect(result.success).toBe(false);
  });

  it("accepts the supported judge models", () => {
    const result = EvalRequestSchema.safeParse({
      judge_models: ["claude-haiku-4-5", "claude-sonnet-4-6"],
    });
    expect(result.success).toBe(true);
  });

  it("accepts force: true so the caller can bypass skip logic explicitly", () => {
    const result = EvalRequestSchema.safeParse({ force: true });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.force).toBe(true);
    }
  });

  it("rejects negative max_articles", () => {
    const result = EvalRequestSchema.safeParse({ max_articles: -1 });
    expect(result.success).toBe(false);
  });
});
