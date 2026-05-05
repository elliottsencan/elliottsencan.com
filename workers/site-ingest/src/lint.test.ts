/**
 * Tests for the pure report computation in lint.ts.
 *
 * The handler itself (enumerate via GitHub) is skipped — needs HTTP
 * mocks that don't exist in this codebase. The structural checks are
 * what we actually care about.
 */

import { describe, expect, it } from "vitest";
import { computeLintReport, type ReadingMeta, type WikiMeta } from "./lint.ts";

function reading(slug: string, topics: string[] = ["t"]): ReadingMeta {
  return { slug, topics, compiled_with: "claude-sonnet-4-6" };
}

function wiki(slug: string, sources: string[], related: string[] = []): WikiMeta {
  return {
    slug,
    sources,
    related_concepts: related,
    compiled_with: "claude-sonnet-4-6",
  };
}

describe("computeLintReport", () => {
  it("returns a clean report for matching reading + wiki", () => {
    const r = [reading("2026-04/a"), reading("2026-04/b")];
    const w = [wiki("topic-x", ["2026-04/a", "2026-04/b"])];
    const report = computeLintReport(r, w);
    expect(report.counts.total_issues).toBe(0);
    expect(report.orphan_citations).toEqual([]);
    expect(report.sub_threshold_concepts).toEqual([]);
    expect(report.hallucinated_related).toEqual([]);
    expect(report.untagged_readings).toEqual([]);
  });

  it("flags orphan citations when wiki cites a missing reading slug", () => {
    const r = [reading("2026-04/a")];
    const w = [wiki("topic-x", ["2026-04/a", "2026-04/missing"])];
    const report = computeLintReport(r, w);
    expect(report.orphan_citations).toEqual([
      { wiki_slug: "topic-x", missing_source: "2026-04/missing" },
    ]);
  });

  it("flags sub-threshold concepts when valid sources drop below MIN_WIKI_SOURCES", () => {
    // Two listed sources but only one resolves -> 1 valid source, threshold is 2.
    const r = [reading("2026-04/a")];
    const w = [wiki("topic-x", ["2026-04/a", "2026-04/missing"])];
    const report = computeLintReport(r, w);
    expect(report.sub_threshold_concepts).toEqual([
      { wiki_slug: "topic-x", valid_sources: 1, required: 2 },
    ]);
  });

  it("flags hallucinated related_concepts (slugs not in the wiki collection)", () => {
    const r = [reading("2026-04/a"), reading("2026-04/b")];
    const w = [
      wiki("topic-x", ["2026-04/a", "2026-04/b"], ["topic-y", "ghost-topic"]),
      wiki("topic-y", ["2026-04/a", "2026-04/b"]),
    ];
    const report = computeLintReport(r, w);
    expect(report.hallucinated_related).toEqual([
      { wiki_slug: "topic-x", missing_related: "ghost-topic" },
    ]);
  });

  it("flags reading entries with empty topics", () => {
    const r = [reading("2026-04/a", []), reading("2026-04/b", ["t"])];
    const report = computeLintReport(r, []);
    expect(report.untagged_readings).toEqual(["2026-04/a"]);
  });

  it("aggregates total_issues across all checks", () => {
    const r = [reading("2026-04/a", []), reading("2026-04/b", ["t"])];
    const w = [wiki("topic-x", ["2026-04/a", "2026-04/missing"], ["ghost"])];
    const report = computeLintReport(r, w);
    // 1 orphan + 1 sub-threshold + 1 hallucinated + 1 untagged + 1 under_clustered = 5
    // (topic "t" on 2026-04/b is a singleton with no wiki article)
    expect(report.counts.total_issues).toBe(5);
    expect(report.counts.reading_entries).toBe(2);
    expect(report.counts.wiki_articles).toBe(1);
  });

  it("returns clean counts for empty collections (first-run boot)", () => {
    const report = computeLintReport([], []);
    expect(report.counts).toEqual({
      reading_entries: 0,
      wiki_articles: 0,
      total_issues: 0,
    });
  });
});

describe("computeLintReport > under_clustered_topics", () => {
  it("flags topics that appear on exactly one reading entry and no wiki article", () => {
    const r = [
      reading("2026-04/a", ["solo-topic"]),
      reading("2026-04/b", ["shared", "shared"]),
      reading("2026-04/c", ["shared"]),
    ];
    const w: WikiMeta[] = [];
    const report = computeLintReport(r, w);
    expect(report.under_clustered_topics).toEqual([
      { topic: "solo-topic", reading_slug: "2026-04/a" },
    ]);
  });

  it("does not flag a singleton topic when a wiki article exists for it", () => {
    const r = [reading("2026-04/a", ["covered"])];
    const w = [wiki("covered", ["2026-04/a"])];
    const report = computeLintReport(r, w);
    expect(report.under_clustered_topics).toEqual([]);
  });

  it("does not flag topics that appear on multiple reading entries", () => {
    const r = [reading("2026-04/a", ["paired"]), reading("2026-04/b", ["paired"])];
    const report = computeLintReport(r, []);
    expect(report.under_clustered_topics).toEqual([]);
  });

  it("returns the reading_slug of the single contributing entry", () => {
    const r = [reading("2026-04/zeta", ["t1"]), reading("2026-04/alpha", ["t2"])];
    const report = computeLintReport(r, []);
    expect(report.under_clustered_topics).toEqual([
      { topic: "t1", reading_slug: "2026-04/zeta" },
      { topic: "t2", reading_slug: "2026-04/alpha" },
    ]);
  });

  it("counts under_clustered_topics in total_issues", () => {
    const r = [reading("2026-04/a", ["solo"])];
    const report = computeLintReport(r, []);
    expect(report.under_clustered_topics).toHaveLength(1);
    // 1 under_clustered = 1 total_issue (no other checks fire here)
    expect(report.counts.total_issues).toBe(1);
  });
});
