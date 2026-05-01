import { describe, expect, it, vi } from "vitest";
import type { EnumerateDeps } from "./enumerate.ts";
import { enumerateBlogWithBodies, enumerateWikiWithBodies } from "./enumerate.ts";

const fakeDeps = (files: Record<string, string>): EnumerateDeps => ({
  listDir: vi.fn().mockImplementation(async (path: string) => {
    const matches = Object.keys(files)
      .filter((k) => {
        const tail = k.slice(path.length + 1);
        return k.startsWith(`${path}/`) && !tail.includes("/");
      })
      .map((k) => ({
        type: "file" as const,
        name: k.slice(path.length + 1),
        path: k,
        sha: "x",
      }));
    if (matches.length === 0 && !Object.keys(files).some((k) => k.startsWith(`${path}/`))) {
      return { ok: false, error: "404 not found" };
    }
    return { ok: true, data: matches };
  }),
  getFile: vi.fn().mockImplementation(async (path: string) => {
    const content = files[path];
    if (content == null) {
      return { ok: false, error: "not-found" };
    }
    return { ok: true, data: { content, sha: "x" } };
  }),
});

describe("enumerateWikiWithBodies", () => {
  it("returns slug, frontmatter, and trimmed body", async () => {
    const deps = fakeDeps({
      "src/content/wiki/llm-inference.md": [
        "---",
        "title: LLM inference",
        "summary: How models run.",
        "sources: [a, b]",
        "compiled_at: 2026-01-01",
        "compiled_with: m",
        "---",
        "",
        "Body text here.",
        "",
      ].join("\n"),
    });
    const out = await enumerateWikiWithBodies(deps);
    expect(out.length).toBe(1);
    expect(out[0]?.slug).toBe("llm-inference");
    expect(out[0]?.body).toBe("Body text here.");
    expect(out[0]?.frontmatter.title).toBe("LLM inference");
  });

  it("skips .mdx files (insertion-incompatible in v1)", async () => {
    const deps = fakeDeps({
      "src/content/wiki/x.md": [
        "---",
        "title: x",
        "summary: y",
        "sources: [a, b]",
        "compiled_at: 2026-01-01",
        "compiled_with: m",
        "---",
        "",
      ].join("\n"),
      "src/content/wiki/y.mdx": "---\ntitle: y\n---\n",
    });
    const out = await enumerateWikiWithBodies(deps);
    expect(out.map((e) => e.slug)).toEqual(["x"]);
  });

  it("returns empty when the directory does not exist", async () => {
    const deps = fakeDeps({});
    const out = await enumerateWikiWithBodies(deps);
    expect(out).toEqual([]);
  });
});

describe("enumerateBlogWithBodies", () => {
  it("returns slug, frontmatter (with optional series), and body", async () => {
    const deps = fakeDeps({
      "src/content/blog/post-one.md": [
        "---",
        "title: Post one",
        "description: First post",
        "date: 2026-04-01",
        "tags: [systems, agents]",
        "series: agentic-systems",
        "---",
        "",
        "Body of the post.",
      ].join("\n"),
    });
    const out = await enumerateBlogWithBodies(deps);
    expect(out.length).toBe(1);
    expect(out[0]?.slug).toBe("post-one");
    expect(out[0]?.frontmatter.series).toBe("agentic-systems");
    expect(out[0]?.frontmatter.tags).toEqual(["systems", "agents"]);
    expect(out[0]?.body).toBe("Body of the post.");
  });

  it("skips .mdx files in the blog corpus", async () => {
    const deps = fakeDeps({
      "src/content/blog/a.md": [
        "---",
        "title: A",
        "description: a",
        "date: 2026-04-01",
        "---",
      ].join("\n"),
      "src/content/blog/b.mdx": "---\ntitle: B\n---\n",
    });
    const out = await enumerateBlogWithBodies(deps);
    expect(out.map((e) => e.slug)).toEqual(["a"]);
  });
});
