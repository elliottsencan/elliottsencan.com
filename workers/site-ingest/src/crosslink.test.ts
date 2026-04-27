import { describe, expect, it } from "vitest";
import { resolveScope, validate } from "./crosslink.ts";
import type { BlogEntry, WikiEntry } from "./enumerate.ts";

const wikiEntry = (slug: string, body = ""): WikiEntry => ({
  slug,
  path: `src/content/wiki/${slug}.md`,
  frontmatter: {
    title: slug,
    summary: "s",
    sources: ["a", "b"],
    compiled_at: new Date("2026-04-01"),
    compiled_with: "m",
  },
  body,
});

const blogEntry = (slug: string, date: string, body = ""): BlogEntry => ({
  slug,
  path: `src/content/blog/${slug}.md`,
  frontmatter: { title: slug, description: "d", date: new Date(date) },
  body,
});

describe("validate", () => {
  it("accepts a slug scope", () => {
    const r = validate({ scope: { kind: "slug", corpus: "wiki", slug: "x" } });
    expect(r.ok).toBe(true);
  });
  it("accepts a since scope with ISO date", () => {
    const r = validate({ scope: { kind: "since", since: "2026-04-01" } });
    expect(r.ok).toBe(true);
  });
  it("accepts an all scope", () => {
    const r = validate({ scope: { kind: "all" } });
    expect(r.ok).toBe(true);
  });
  it("rejects unknown corpus", () => {
    const r = validate({ scope: { kind: "slug", corpus: "now", slug: "x" } });
    expect(r.ok).toBe(false);
  });
  it("rejects empty slug", () => {
    const r = validate({ scope: { kind: "slug", corpus: "wiki", slug: "" } });
    expect(r.ok).toBe(false);
  });
  it("defaults dry_run to false", () => {
    const r = validate({ scope: { kind: "all" } });
    if (r.ok) { expect(r.data.dry_run).toBe(false); }
  });
});

describe("resolveScope", () => {
  const snapshot = {
    wiki: [wikiEntry("a"), wikiEntry("b")],
    blog: [blogEntry("p1", "2026-04-15"), blogEntry("p2", "2026-03-01")],
  };

  it("resolves slug scope to a single piece", () => {
    const r = resolveScope({ kind: "slug", corpus: "wiki", slug: "a" }, snapshot);
    expect(r.pieces).toEqual([{ corpus: "wiki", slug: "a", url: "/wiki/a" }]);
  });

  it("returns empty for unknown slug", () => {
    const r = resolveScope({ kind: "slug", corpus: "wiki", slug: "ghost" }, snapshot);
    expect(r.pieces).toEqual([]);
  });

  it("blog slug resolves to /writing/ url", () => {
    const r = resolveScope({ kind: "slug", corpus: "blog", slug: "p1" }, snapshot);
    expect(r.pieces[0]?.url).toBe("/writing/p1");
  });

  it("since scope filters blog by date", () => {
    const r = resolveScope({ kind: "since", since: new Date("2026-04-01") }, snapshot);
    expect(r.pieces.find((p) => p.slug === "p1")).toBeDefined();
    expect(r.pieces.find((p) => p.slug === "p2")).toBeUndefined();
  });

  it("all scope returns every piece", () => {
    const r = resolveScope({ kind: "all" }, snapshot);
    expect(r.pieces.length).toBe(4);
  });

  it("caps at MAX_SCOPE_PIECES", () => {
    const big = {
      wiki: Array.from({ length: 30 }, (_, i) => wikiEntry(`w${i}`)),
      blog: [],
    };
    const r = resolveScope({ kind: "all" }, big);
    expect(r.pieces.length).toBe(25);
    expect(r.capped).toBe(true);
  });
});
