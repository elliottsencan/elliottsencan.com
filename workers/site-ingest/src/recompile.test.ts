/**
 * Tests for the pure-function pieces of recompile.ts.
 *
 * Skips tests that would only re-test third-party libraries:
 *   - parseFrontmatter wraps gray-matter (already battle-tested upstream).
 *   - htmlToText is now html-to-text (ditto).
 *
 * Coverage focuses on the in-house surfaces: scope filtering and the
 * markdown writer that has to round-trip back through the reading
 * collection's Zod schema.
 */

import { describe, expect, it } from "vitest";
import { applyScope, buildRecompiledMarkdown } from "./recompile.ts";
import type { LinkSummary } from "./types.ts";

// ---------- applyScope ----------

type Entry = Parameters<typeof applyScope>[0][number];

function entry(overrides: Partial<Entry["frontmatter"]> & { path?: string } = {}): Entry {
  const { path, ...frontmatter } = overrides;
  return {
    path: path ?? "src/content/reading/2026-04/2026-04-01t000000-example.md",
    sha: "deadbeef",
    body: "",
    frontmatter: {
      url: "https://example.com/",
      added: "2026-04-01T00:00:00.000Z",
      ...frontmatter,
    },
  };
}

describe("applyScope", () => {
  it("returns every entry for scope.kind = all", () => {
    const entries = [entry(), entry({ path: "x.md" })];
    expect(applyScope(entries, { kind: "all" })).toHaveLength(2);
  });

  it("filters by since: keeps entries on or after the threshold", () => {
    const entries = [
      entry({ added: "2026-03-15T00:00:00.000Z", path: "old.md" }),
      entry({ added: "2026-04-15T00:00:00.000Z", path: "new.md" }),
      entry({ added: "2026-04-01T00:00:00.000Z", path: "boundary.md" }),
    ];
    const out = applyScope(entries, { kind: "since", since: "2026-04-01T00:00:00.000Z" });
    expect(out.map((e) => e.path)).toEqual(["new.md", "boundary.md"]);
  });

  it("filters by slugs, matching the basename without the .md extension", () => {
    const entries = [
      entry({ path: "src/content/reading/2026-04/keep.md" }),
      entry({ path: "src/content/reading/2026-04/drop.md" }),
    ];
    const out = applyScope(entries, { kind: "slugs", slugs: ["keep"] });
    expect(out).toHaveLength(1);
    expect(out[0]?.path).toBe("src/content/reading/2026-04/keep.md");
  });

  it("compiled_before_model includes entries with no recorded model", () => {
    const entries = [
      entry({ path: "no-model.md" }),
      entry({ path: "old-model.md", compiled_with: "claude-sonnet-4-5" }),
      entry({ path: "current.md", compiled_with: "claude-sonnet-4-6" }),
    ];
    const out = applyScope(entries, {
      kind: "compiled_before_model",
      model: "claude-sonnet-4-6",
    });
    expect(out.map((e) => e.path)).toEqual(["no-model.md", "old-model.md"]);
  });
});

// ---------- buildRecompiledMarkdown ----------

const baseSummary: LinkSummary = {
  title: "Hello World",
  summary: "A short summary.",
  category: "tech",
  topics: ["topic-a", "topic-b"],
  detail: "Longer markdown synthesis.",
  model: "claude-sonnet-4-6",
};

const baseArgs = {
  title: "Hello World",
  url: "https://example.com/post",
  summary: baseSummary,
  added: new Date("2026-04-01T00:00:00.000Z"),
  compiledAt: new Date("2026-04-24T00:00:00.000Z"),
};

describe("buildRecompiledMarkdown", () => {
  it("emits all required frontmatter fields plus the detail body", () => {
    const md = buildRecompiledMarkdown(baseArgs);
    expect(md).toContain('title: "Hello World"');
    expect(md).toContain("url: https://example.com/post");
    expect(md).toContain('summary: "A short summary."');
    expect(md).toContain("category: tech");
    expect(md).toContain("added: 2026-04-01T00:00:00.000Z");
    expect(md).toContain("compiled_at: 2026-04-24T00:00:00.000Z");
    expect(md).toContain("compiled_with: claude-sonnet-4-6");
    expect(md).toContain('topics: ["topic-a", "topic-b"]');
    expect(md).toMatch(/---\n\nLonger markdown synthesis\.\n$/);
  });

  it("omits author and source when absent", () => {
    const md = buildRecompiledMarkdown(baseArgs);
    expect(md).not.toContain("author:");
    expect(md).not.toContain("source:");
  });

  it("includes author and source when present", () => {
    const md = buildRecompiledMarkdown({
      ...baseArgs,
      summary: { ...baseSummary, author: "A. Writer", source: "Example Press" },
    });
    expect(md).toContain('author: "A. Writer"');
    expect(md).toContain('source: "Example Press"');
  });

  it("omits the topics line when the array is empty", () => {
    const md = buildRecompiledMarkdown({
      ...baseArgs,
      summary: { ...baseSummary, topics: [] },
    });
    expect(md).not.toContain("topics:");
  });

  it("emits no body when detail is empty", () => {
    const md = buildRecompiledMarkdown({
      ...baseArgs,
      summary: { ...baseSummary, detail: "" },
    });
    // The closing `---` is followed by a trailing blank line, but nothing
    // after that — no body content.
    expect(md.endsWith("---\n\n")).toBe(true);
  });

  it("trims surrounding whitespace from the detail body", () => {
    const md = buildRecompiledMarkdown({
      ...baseArgs,
      summary: { ...baseSummary, detail: "\n\n  Body content.  \n\n" },
    });
    expect(md).toContain("\n\nBody content.\n");
    expect(md).not.toContain("  Body content.  ");
  });
});
