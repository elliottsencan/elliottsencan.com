/**
 * Tests for the pure pieces of contribute.ts.
 *
 * Handler itself needs GitHub mocks that don't exist in this codebase;
 * the meaningful invariants live in the markdown writer and the slug
 * humanizer.
 */

import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { buildArticleMarkdown, humanize } from "./contribute.ts";

function parseEntry(md: string): { data: Record<string, unknown>; content: string } {
  const parsed = matter(md);
  return { data: parsed.data, content: parsed.content };
}

const baseArgs = {
  title: "Responsive design",
  summary: "Notes on responsive design without breakpoints.",
  body: "Body with [a citation](/reading/2026-04/foo).",
  sources: ["2026-04/a", "2026-04/b"],
  compiled_with: "manual:contribute",
  compiled_at: new Date("2026-04-24T00:00:00.000Z"),
};

describe("buildArticleMarkdown", () => {
  it("emits frontmatter that round-trips with required fields", () => {
    const { data, content } = parseEntry(buildArticleMarkdown(baseArgs));
    expect(data).toMatchObject({
      title: "Responsive design",
      summary: "Notes on responsive design without breakpoints.",
      sources: ["2026-04/a", "2026-04/b"],
      compiled_at: "2026-04-24T00:00:00.000Z",
      compiled_with: "manual:contribute",
    });
    expect(content.trim()).toBe("Body with [a citation](/reading/2026-04/foo).");
  });

  it("omits related_concepts when absent", () => {
    const { data } = parseEntry(buildArticleMarkdown(baseArgs));
    expect(data).not.toHaveProperty("related_concepts");
  });

  it("omits related_concepts when present but empty", () => {
    const { data } = parseEntry(buildArticleMarkdown({ ...baseArgs, related_concepts: [] }));
    expect(data).not.toHaveProperty("related_concepts");
  });

  it("includes related_concepts when populated", () => {
    const { data } = parseEntry(
      buildArticleMarkdown({ ...baseArgs, related_concepts: ["css-primitives"] }),
    );
    expect(data.related_concepts).toEqual(["css-primitives"]);
  });

  it("trims body whitespace so re-runs don't churn diffs", () => {
    const { content } = parseEntry(buildArticleMarkdown({ ...baseArgs, body: "Body\n\n\n\n" }));
    expect(content.endsWith("\n\n\n")).toBe(false);
  });
});

describe("humanize", () => {
  it("title-cases a single-word slug", () => {
    expect(humanize("typography")).toBe("Typography");
  });

  it("replaces hyphens with spaces and capitalizes the first word only", () => {
    expect(humanize("responsive-design")).toBe("Responsive design");
    expect(humanize("css-primitives")).toBe("Css primitives");
  });

  it("returns the empty string unchanged", () => {
    expect(humanize("")).toBe("");
  });
});
