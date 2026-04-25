/**
 * Tests for the pure report computation in lint.ts.
 *
 * The handler itself (enumerate via GitHub) is skipped — needs HTTP
 * mocks that don't exist in this codebase. The structural checks are
 * what we actually care about.
 */

import { describe, expect, it } from "vitest";
import {
  computeLintReport,
  type ReadingMeta,
  type WikiMeta,
} from "./lint.ts";

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
    // 1 orphan + 1 sub-threshold + 1 hallucinated + 1 untagged = 4
    expect(report.counts.total_issues).toBe(4);
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
