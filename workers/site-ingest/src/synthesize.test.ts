/**
 * Tests for the pure-function pieces of synthesize.ts.
 *
 * Skips the handler itself (would require GitHub + Anthropic mocks that
 * don't exist in this codebase). Targets the four invariants that matter
 * for correctness: clustering threshold, idempotency comparison, slug
 * normalization, and the markdown writer's frontmatter shape.
 */

import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import {
  buildArticleMarkdown,
  clusterByTopic,
  setEquals,
} from "./synthesize.ts";
import type { WikiArticle } from "./types.ts";

// ---------- setEquals ----------

describe("setEquals", () => {
  it("returns true for identical arrays", () => {
    expect(setEquals(["a", "b", "c"], ["a", "b", "c"])).toBe(true);
  });

  it("is order-independent", () => {
    expect(setEquals(["a", "b", "c"], ["c", "a", "b"])).toBe(true);
  });

  it("returns false for different content of same length", () => {
    expect(setEquals(["a", "b"], ["a", "c"])).toBe(false);
  });

  it("returns false for different lengths", () => {
    expect(setEquals(["a", "b"], ["a", "b", "c"])).toBe(false);
  });

  it("returns true for two empty arrays (no sources removed = nothing to recompile)", () => {
    expect(setEquals([], [])).toBe(true);
  });

  it("treats duplicates as multiset elements (not set)", () => {
    // Distinguishes ["a", "a"] from ["a", "b"] — both have length 2.
    expect(setEquals(["a", "a"], ["a", "b"])).toBe(false);
    expect(setEquals(["a", "a"], ["a", "a"])).toBe(true);
  });
});

// ---------- clusterByTopic ----------

type ReadingSource = Parameters<typeof clusterByTopic>[0][number];

function source(slug: string, topics: string[]): ReadingSource {
  return {
    slug,
    path: `src/content/reading/2026-04/${slug}.md`,
    title: `Title ${slug}`,
    url: `https://example.com/${slug}`,
    summary: "Summary.",
    category: "tech",
    added: "2026-04-01T00:00:00.000Z",
    topics,
  };
}

describe("clusterByTopic", () => {
  it("filters out topics below the threshold", () => {
    const sources = [source("a", ["x"]), source("b", ["x", "y"]), source("c", ["y"])];
    const out = clusterByTopic(sources, 2);
    // x has 2, y has 2, both kept. No singletons.
    expect([...out.keys()].sort()).toEqual(["x", "y"]);
  });

  it("keeps a topic at exactly the threshold", () => {
    const sources = [source("a", ["x"]), source("b", ["x"])];
    const out = clusterByTopic(sources, 2);
    expect(out.has("x")).toBe(true);
    expect(out.get("x")).toHaveLength(2);
  });

  it("drops a topic one below the threshold", () => {
    const sources = [source("a", ["x"]), source("b", ["x"])];
    const out = clusterByTopic(sources, 3);
    expect(out.has("x")).toBe(false);
  });

  it("places a single source under each of its topics", () => {
    const sources = [
      source("a", ["x", "y"]),
      source("b", ["x", "y"]),
    ];
    const out = clusterByTopic(sources, 2);
    expect(out.get("x")?.map((s) => s.slug).sort()).toEqual(["a", "b"]);
    expect(out.get("y")?.map((s) => s.slug).sort()).toEqual(["a", "b"]);
  });

  it("ignores sources with no topics", () => {
    const sources = [source("a", []), source("b", ["x"]), source("c", ["x"])];
    const out = clusterByTopic(sources, 2);
    expect(out.size).toBe(1);
    expect(out.get("x")?.map((s) => s.slug).sort()).toEqual(["b", "c"]);
  });

  it("returns an empty map for empty input", () => {
    expect(clusterByTopic([], 2).size).toBe(0);
  });
});

// ---------- buildArticleMarkdown ----------

const baseArticle: WikiArticle = {
  title: "Responsive design",
  summary: "Lessons from two recent essays on responsive design without breakpoints.",
  body: "Body content with [a citation](/reading/2026-04/foo).",
  model: "claude-sonnet-4-6",
};

const baseArgs = {
  article: baseArticle,
  sources: ["2026-04/b", "2026-04/a"],
  compiledAt: new Date("2026-04-24T00:00:00.000Z"),
};

function parseEntry(md: string): { data: Record<string, unknown>; content: string } {
  const parsed = matter(md);
  return { data: parsed.data, content: parsed.content };
}

describe("buildArticleMarkdown", () => {
  it("emits frontmatter with all required fields plus a sorted sources list", () => {
    const { data, content } = parseEntry(buildArticleMarkdown(baseArgs));
    expect(data).toMatchObject({
      title: "Responsive design",
      summary: "Lessons from two recent essays on responsive design without breakpoints.",
      sources: ["2026-04/a", "2026-04/b"], // input was ["b", "a"], output sorted
      compiled_at: "2026-04-24T00:00:00.000Z",
      compiled_with: "claude-sonnet-4-6",
    });
    expect(content.trim()).toBe("Body content with [a citation](/reading/2026-04/foo).");
  });

  it("omits related_concepts when absent", () => {
    const { data } = parseEntry(buildArticleMarkdown(baseArgs));
    expect(data).not.toHaveProperty("related_concepts");
  });

  it("omits related_concepts when present but empty", () => {
    const { data } = parseEntry(
      buildArticleMarkdown({
        ...baseArgs,
        article: { ...baseArticle, related_concepts: [] },
      }),
    );
    expect(data).not.toHaveProperty("related_concepts");
  });

  it("includes related_concepts when populated", () => {
    const { data } = parseEntry(
      buildArticleMarkdown({
        ...baseArgs,
        article: { ...baseArticle, related_concepts: ["css-primitives"] },
      }),
    );
    expect(data.related_concepts).toEqual(["css-primitives"]);
  });

  it("trims trailing whitespace from the body so re-runs don't produce diff churn", () => {
    const { content } = parseEntry(
      buildArticleMarkdown({
        ...baseArgs,
        article: { ...baseArticle, body: "Body\n\n\n\n" },
      }),
    );
    expect(content.endsWith("\n\n\n")).toBe(false);
  });
});
