/**
 * Tests for the pure-function pieces of recompile.ts.
 *
 * Skips tests that would only re-test third-party libraries:
 *   - parseFrontmatter wraps gray-matter's matter() (already battle-tested).
 *   - htmlToText is now html-to-text (ditto).
 *
 * Coverage focuses on the in-house surfaces: scope filtering and the
 * markdown writer. The writer's output is asserted by round-tripping
 * back through gray-matter, so we test what we actually care about
 * (the data shape) rather than the exact YAML serialization style.
 */

import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import {
  applyScope,
  buildRecompiledMarkdown,
  parseFrontmatter,
  partitionSkips,
} from "./recompile.ts";
import type { LinkSummary } from "./types.ts";

// ---------- applyScope ----------

type Entry = Parameters<typeof applyScope>[0][number];

function entry(
  overrides: Partial<Omit<Entry["frontmatter"], "added">> & {
    path?: string;
    added?: string | Date;
  } = {},
): Entry {
  const { path, added, ...rest } = overrides;
  return {
    path: path ?? "src/content/reading/2026-04/2026-04-01t000000-example.md",
    sha: "deadbeef",
    body: "",
    frontmatter: {
      title: "Example",
      url: "https://example.com/",
      summary: "An example entry.",
      category: "tech",
      added: added ? new Date(added) : new Date("2026-04-01T00:00:00.000Z"),
      ...rest,
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
  model: "claude-sonnet-4-6",
};

const baseArgs = {
  title: "Hello World",
  url: "https://example.com/post",
  summary: baseSummary,
  added: new Date("2026-04-01T00:00:00.000Z"),
  compiledAt: new Date("2026-04-24T00:00:00.000Z"),
};

function parseEntry(md: string): { data: Record<string, unknown>; content: string } {
  const parsed = matter(md);
  return { data: parsed.data, content: parsed.content };
}

describe("buildRecompiledMarkdown", () => {
  it("emits frontmatter that round-trips with all required fields and an empty body", () => {
    const { data, content } = parseEntry(buildRecompiledMarkdown(baseArgs));
    expect(data).toMatchObject({
      title: "Hello World",
      url: "https://example.com/post",
      summary: "A short summary.",
      category: "tech",
      added: "2026-04-01T00:00:00.000Z",
      compiled_at: "2026-04-24T00:00:00.000Z",
      compiled_with: "claude-sonnet-4-6",
      topics: ["topic-a", "topic-b"],
    });
    // Reading entries are source citations, not wiki articles. Body is
    // intentionally empty; cross-source synthesis lives in the wiki layer.
    expect(content.trim()).toBe("");
  });

  it("omits author and source when absent", () => {
    const { data } = parseEntry(buildRecompiledMarkdown(baseArgs));
    expect(data).not.toHaveProperty("author");
    expect(data).not.toHaveProperty("source");
  });

  it("includes author and source when present", () => {
    const { data } = parseEntry(
      buildRecompiledMarkdown({
        ...baseArgs,
        summary: { ...baseSummary, author: "A. Writer", source: "Example Press" },
      }),
    );
    expect(data.author).toBe("A. Writer");
    expect(data.source).toBe("Example Press");
  });

  it("omits topics when the array is empty", () => {
    const { data } = parseEntry(
      buildRecompiledMarkdown({
        ...baseArgs,
        summary: { ...baseSummary, topics: [] },
      }),
    );
    expect(data).not.toHaveProperty("topics");
  });
});

describe("parseFrontmatter", () => {
  it("returns null when YAML is malformed", () => {
    // Unclosed bracket → gray-matter throws; parseFrontmatter swallows + returns null.
    const malformed = "---\ntitle: [unclosed\n---\nbody\n";
    expect(parseFrontmatter(malformed)).toBeNull();
  });

  it("returns null when frontmatter block is empty", () => {
    expect(parseFrontmatter("just body, no frontmatter")).toBeNull();
  });

  it("parses unquoted ISO dates that js-yaml turns into Date objects", () => {
    // Regression: typeof === 'string' check failed for every entry written
    // by /link because js-yaml parses bare ISO datetimes as !!timestamp.
    const md = [
      "---",
      'title: "Example"',
      "url: https://example.com/post",
      'summary: "An example."',
      "category: tech",
      "added: 2026-04-23T22:04:24.354Z",
      "compiled_at: 2026-04-23T22:04:24.354Z",
      "compiled_with: claude-sonnet-4-6",
      "---",
      "",
    ].join("\n");
    const out = parseFrontmatter(md);
    expect(out).not.toBeNull();
    expect(out!.frontmatter.added).toBeInstanceOf(Date);
    expect(out!.frontmatter.added.toISOString()).toBe("2026-04-23T22:04:24.354Z");
  });

  it("returns null when frontmatter is missing required fields", () => {
    // Schema rejects entries without `summary`, `category`, etc. — better to
    // skip with a logged reason than commit garbage downstream.
    const md = ["---", 'title: "Just a title"', "---", ""].join("\n");
    expect(parseFrontmatter(md)).toBeNull();
  });
});

describe("partitionSkips", () => {
  it("counts each skip reason and ignores updated rows", () => {
    const partition = partitionSkips([
      { path: "a.md", status: "updated" },
      { path: "b.md", status: "skipped", skip_reason: "no-source" },
      { path: "c.md", status: "skipped", skip_reason: "transient" },
      { path: "d.md", status: "skipped", skip_reason: "frontmatter-invalid" },
      { path: "e.md", status: "skipped", skip_reason: "other" },
      // Missing skip_reason buckets to `other` so legacy rows still count.
      { path: "f.md", status: "skipped" },
    ]);
    expect(partition).toEqual({
      total: 5,
      no_source: 1,
      transient: 1,
      frontmatter_invalid: 1,
      other: 2,
    });
  });

  it("surfaces a frontmatter-invalid row in the partition", () => {
    // S3.3: malformed frontmatter must produce a skipped row, not a silent drop.
    const partition = partitionSkips([
      {
        path: "src/content/reading/2026-04/corrupt.md",
        status: "skipped",
        reason: "frontmatter parse failed",
        skip_reason: "frontmatter-invalid",
      },
    ]);
    expect(partition.frontmatter_invalid).toBe(1);
    expect(partition.total).toBe(1);
  });
});
