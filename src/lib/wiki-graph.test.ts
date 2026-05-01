import {
  buildWikiLinkGraph,
  relatedConceptsFor,
  resolveRelatedConcepts,
  type WikiInput,
} from "@lib/wiki-graph";
import { describe, expect, it } from "vitest";

function entry(id: string, body: string): WikiInput {
  return { id, body };
}

describe("buildWikiLinkGraph", () => {
  it("records forward and backward edges from a single inline link", () => {
    const graph = buildWikiLinkGraph([
      entry("a", "See [b](/wiki/b) for details."),
      entry("b", "Standalone."),
    ]);
    expect([...(graph.forward.get("a") ?? [])]).toEqual(["b"]);
    expect([...(graph.backward.get("b") ?? [])]).toEqual(["a"]);
  });

  it("ignores links to slugs that aren't in the collection", () => {
    const graph = buildWikiLinkGraph([entry("a", "See [ghost](/wiki/ghost).")]);
    expect(graph.forward.get("a")?.size ?? 0).toBe(0);
    expect(graph.backward.get("ghost")).toBeUndefined();
  });

  it("ignores self-links", () => {
    const graph = buildWikiLinkGraph([entry("a", "See [a](/wiki/a).")]);
    expect(graph.forward.get("a")?.size ?? 0).toBe(0);
  });

  it("dedupes repeated links between the same pair", () => {
    const graph = buildWikiLinkGraph([
      entry("a", "See [b](/wiki/b) and again [b](/wiki/b)."),
      entry("b", ""),
    ]);
    expect([...(graph.forward.get("a") ?? [])]).toEqual(["b"]);
    expect([...(graph.backward.get("b") ?? [])]).toEqual(["a"]);
  });

  it("handles trailing slash and query/fragment suffixes", () => {
    const graph = buildWikiLinkGraph([
      entry("a", "[b](/wiki/b/) [b](/wiki/b?ref=x) [b](/wiki/b#h)"),
      entry("b", ""),
    ]);
    expect([...(graph.forward.get("a") ?? [])]).toEqual(["b"]);
  });

  it("returns an empty graph when entries is empty", () => {
    const graph = buildWikiLinkGraph([]);
    expect(graph.forward.size).toBe(0);
    expect(graph.backward.size).toBe(0);
  });

  it("tolerates an empty body string", () => {
    const graph = buildWikiLinkGraph([entry("a", "")]);
    expect(graph.forward.get("a")?.size ?? 0).toBe(0);
    expect(graph.backward.get("a")).toBeUndefined();
  });

  it("records mutual a↔b edges in both directions", () => {
    const graph = buildWikiLinkGraph([
      entry("a", "Back to [b](/wiki/b)."),
      entry("b", "Back to [a](/wiki/a)."),
    ]);
    expect([...(graph.forward.get("a") ?? [])]).toEqual(["b"]);
    expect([...(graph.forward.get("b") ?? [])]).toEqual(["a"]);
    expect([...(graph.backward.get("a") ?? [])]).toEqual(["b"]);
    expect([...(graph.backward.get("b") ?? [])]).toEqual(["a"]);
  });

  it("does not match wiki URLs inside fenced code blocks", () => {
    const graph = buildWikiLinkGraph([
      entry("a", "Real [b](/wiki/b).\n\n```md\nDocs use [b](/wiki/b)\n```"),
      entry("b", ""),
    ]);
    // The real link outside the fence still produces an edge — but only one,
    // not two. (Without code-stripping, this would falsely double-count.)
    expect([...(graph.forward.get("a") ?? [])]).toEqual(["b"]);
    expect(graph.forward.get("a")?.size).toBe(1);
  });

  it("does not match wiki URLs inside inline code", () => {
    const graph = buildWikiLinkGraph([
      entry("a", "Sample: `[b](/wiki/b)` is the syntax."),
      entry("b", ""),
    ]);
    expect(graph.forward.get("a")?.size ?? 0).toBe(0);
  });

  it("does not match image-shaped references", () => {
    const graph = buildWikiLinkGraph([entry("a", "![b](/wiki/b) inline image."), entry("b", "")]);
    // An image's `!` precedes `[`, but the regex captures `[...](url)` either
    // way. Pin the current behavior: today the regex DOES match the bracketed
    // portion of an image, producing an edge. This test documents that quirk
    // so any future regex tightening makes a deliberate decision.
    expect([...(graph.forward.get("a") ?? [])]).toEqual(["b"]);
  });
});

describe("relatedConceptsFor", () => {
  it("returns the dedup'd union of forward and backward edges, sorted", () => {
    const graph = buildWikiLinkGraph([
      entry("a", "See [b](/wiki/b) and [c](/wiki/c)."),
      entry("b", "Back to [a](/wiki/a)."),
      entry("c", "Standalone."),
      entry("d", "Mentions [a](/wiki/a) too."),
    ]);
    expect(relatedConceptsFor(graph, "a")).toEqual(["b", "c", "d"]);
  });

  it("returns an empty list when the slug has no edges either way", () => {
    const graph = buildWikiLinkGraph([entry("a", ""), entry("b", "")]);
    expect(relatedConceptsFor(graph, "a")).toEqual([]);
  });

  it("dedupes the same neighbor appearing as both forward and backward edge", () => {
    const graph = buildWikiLinkGraph([
      entry("a", "Back to [b](/wiki/b)."),
      entry("b", "Back to [a](/wiki/a)."),
    ]);
    expect(relatedConceptsFor(graph, "a")).toEqual(["b"]);
  });
});

describe("resolveRelatedConcepts", () => {
  const known = new Set(["a", "b", "c", "d"]);

  it("returns derived edges when no legacy frontmatter is provided", () => {
    const graph = buildWikiLinkGraph([entry("a", "See [b](/wiki/b)."), entry("b", "")]);
    const out = resolveRelatedConcepts(graph, "a", undefined, known);
    expect(out.related).toEqual(["b"]);
    expect(out.hallucinated).toEqual([]);
  });

  it("unions derived edges with valid legacy frontmatter, sorted", () => {
    const graph = buildWikiLinkGraph([
      entry("a", "See [b](/wiki/b)."),
      entry("b", ""),
      entry("c", ""),
      entry("d", ""),
    ]);
    const out = resolveRelatedConcepts(graph, "a", ["d", "c"], known);
    expect(out.related).toEqual(["b", "c", "d"]);
    expect(out.hallucinated).toEqual([]);
  });

  it("filters legacy frontmatter against knownSlugs and reports hallucinated entries", () => {
    const graph = buildWikiLinkGraph([entry("a", ""), entry("b", "")]);
    const out = resolveRelatedConcepts(graph, "a", ["b", "ghost", "phantom"], known);
    expect(out.related).toEqual(["b"]);
    expect(out.hallucinated).toEqual(["ghost", "phantom"]);
  });

  it("excludes self-references from legacy frontmatter", () => {
    const graph = buildWikiLinkGraph([entry("a", ""), entry("b", "")]);
    const out = resolveRelatedConcepts(graph, "a", ["a", "b"], known);
    expect(out.related).toEqual(["b"]);
    expect(out.hallucinated).toEqual([]);
  });

  it("dedupes when legacy frontmatter overlaps derived edges", () => {
    const graph = buildWikiLinkGraph([entry("a", "See [b](/wiki/b)."), entry("b", "")]);
    const out = resolveRelatedConcepts(graph, "a", ["b"], known);
    expect(out.related).toEqual(["b"]);
  });

  it("returns empty when there are no derived edges and no valid legacy entries", () => {
    const graph = buildWikiLinkGraph([entry("a", "")]);
    const out = resolveRelatedConcepts(graph, "a", [], known);
    expect(out.related).toEqual([]);
    expect(out.hallucinated).toEqual([]);
  });
});
