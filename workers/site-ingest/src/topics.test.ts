import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  applyVocabulary,
  buildVocabularyPromptBlock,
  type CanonicalVocabulary,
  EMPTY_VOCABULARY,
  filterProposedAliases,
  loadCanonicalVocabulary,
  loadCorpusSlugList,
} from "./topics.ts";

function vocab(canonicals: string[], aliases: Array<[string, string]>): CanonicalVocabulary {
  return { canonicals, aliases: new Map(aliases), loaded: true };
}

function mockFetch(impl: (url: string) => Response | Promise<Response>): void {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      return impl(url);
    }),
  );
}

describe("applyVocabulary", () => {
  it("returns committed unchanged when no aliases match (loaded=false bypasses coined detection)", () => {
    const out = applyVocabulary(["mcp", "evals"], EMPTY_VOCABULARY);
    expect(out.committed).toEqual(["mcp", "evals"]);
    expect(out.rewritten).toEqual([]);
    expect(out.coined).toEqual([]);
  });

  it("rewrites a known alias to its canonical", () => {
    const v = vocab(["ai-assisted-coding"], [["agentic-coding", "ai-assisted-coding"]]);
    const out = applyVocabulary(["agentic-coding", "evals"], v);
    expect(out.committed).toEqual(["ai-assisted-coding", "evals"]);
    expect(out.rewritten).toEqual([{ from: "agentic-coding", to: "ai-assisted-coding" }]);
    expect(out.coined).toEqual(["evals"]);
  });

  it("dedupes when an alias rewrite collides with a canonical the model also returned", () => {
    const v = vocab(["ai-assisted-coding"], [["agentic-coding", "ai-assisted-coding"]]);
    const out = applyVocabulary(
      ["agentic-coding", "ai-assisted-coding", "mcp"],
      vocab(["ai-assisted-coding", "mcp"], [["agentic-coding", "ai-assisted-coding"]]),
    );
    expect(out.committed).toEqual(["ai-assisted-coding", "mcp"]);
    expect(out.rewritten).toEqual([{ from: "agentic-coding", to: "ai-assisted-coding" }]);
    expect(out.coined).toEqual([]);
    // sanity: the helper variable above isn't read; reference it here so the
    // unused-var lint stays quiet without changing intent.
    expect(v.canonicals).toEqual(["ai-assisted-coding"]);
  });

  it("flags coined slugs (loaded vocabulary, slug not in canonicals or aliases)", () => {
    const v = vocab(["mcp"], []);
    const out = applyVocabulary(["mcp", "novel-concept"], v);
    expect(out.committed).toEqual(["mcp", "novel-concept"]);
    expect(out.coined).toEqual(["novel-concept"]);
  });

  it("does not flag any slugs as coined when vocabulary failed to load", () => {
    const out = applyVocabulary(["any-slug"], EMPTY_VOCABULARY);
    expect(out.coined).toEqual([]);
  });

  it("returns empty committed for empty input", () => {
    expect(applyVocabulary([], vocab(["mcp"], []))).toEqual({
      committed: [],
      rewritten: [],
      coined: [],
    });
  });
});

describe("filterProposedAliases", () => {
  const wikiSlugs = new Set(["mcp", "ai-assisted-coding", "developer-tools"]);

  it("accepts simple aliases", () => {
    const out = filterProposedAliases(["model-context-protocol"], "mcp", wikiSlugs);
    expect(out.accepted).toEqual(["model-context-protocol"]);
    expect(out.dropped).toEqual([]);
  });

  it("drops self-aliases", () => {
    const out = filterProposedAliases(["mcp"], "mcp", wikiSlugs);
    expect(out.accepted).toEqual([]);
    expect(out.dropped).toEqual([{ alias: "mcp", reason: "self-alias" }]);
  });

  it("drops aliases that collide with another wiki article slug", () => {
    const out = filterProposedAliases(["developer-tools"], "mcp", wikiSlugs);
    expect(out.accepted).toEqual([]);
    expect(out.dropped).toEqual([{ alias: "developer-tools", reason: "wiki-collision" }]);
  });

  it("drops duplicate proposals", () => {
    const out = filterProposedAliases(
      ["model-context-protocol", "model-context-protocol"],
      "mcp",
      wikiSlugs,
    );
    expect(out.accepted).toEqual(["model-context-protocol"]);
    expect(out.dropped).toEqual([{ alias: "model-context-protocol", reason: "duplicate" }]);
  });

  it("returns sorted accepted aliases", () => {
    const out = filterProposedAliases(["zeta-alias", "alpha-alias", "mu-alias"], "mcp", wikiSlugs);
    expect(out.accepted).toEqual(["alpha-alias", "mu-alias", "zeta-alias"]);
  });

  it("handles empty input", () => {
    expect(filterProposedAliases([], "mcp", wikiSlugs)).toEqual({ accepted: [], dropped: [] });
  });
});

describe("buildVocabularyPromptBlock", () => {
  it("returns empty string when vocabulary did not load", () => {
    expect(buildVocabularyPromptBlock(EMPTY_VOCABULARY)).toBe("");
  });

  it("includes canonicals when present", () => {
    const v = vocab(["ai-agents", "mcp"], []);
    const block = buildVocabularyPromptBlock(v);
    expect(block).toContain("CANONICAL TOPIC LIST (prefer these): ai-agents, mcp");
    expect(block).not.toContain("KNOWN ALIASES");
  });

  it("includes aliases as alias→canonical pairs when present", () => {
    const v = vocab(["mcp"], [["model-context-protocol", "mcp"]]);
    const block = buildVocabularyPromptBlock(v);
    expect(block).toContain("CANONICAL TOPIC LIST");
    expect(block).toContain("KNOWN ALIASES");
    expect(block).toContain("model-context-protocol→mcp");
  });

  it("returns empty string when vocabulary loaded but has zero canonicals", () => {
    const v: CanonicalVocabulary = { canonicals: [], aliases: new Map(), loaded: true };
    expect(buildVocabularyPromptBlock(v)).toBe("");
  });
});

describe("loadCanonicalVocabulary", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("parses canonicals + aliases from /wiki.json on success", async () => {
    mockFetch(
      () =>
        new Response(
          JSON.stringify({
            concepts: [
              { slug: "mcp", aliases: ["model-context-protocol"] },
              { slug: "ai-agents", aliases: ["llm-agents"] },
              { slug: "developer-tools" },
            ],
          }),
          { status: 200 },
        ),
    );
    const out = await loadCanonicalVocabulary();
    expect(out.loaded).toBe(true);
    expect(out.canonicals).toEqual(["ai-agents", "developer-tools", "mcp"]);
    expect(out.aliases.get("model-context-protocol")).toBe("mcp");
    expect(out.aliases.get("llm-agents")).toBe("ai-agents");
  });

  it("returns EMPTY_VOCABULARY on non-200 response", async () => {
    mockFetch(() => new Response("oops", { status: 500 }));
    const out = await loadCanonicalVocabulary();
    expect(out.loaded).toBe(false);
    expect(out.canonicals).toEqual([]);
    expect(out.aliases.size).toBe(0);
  });

  it("returns EMPTY_VOCABULARY on shape mismatch", async () => {
    mockFetch(() => new Response(JSON.stringify({ wrong: "shape" }), { status: 200 }));
    const out = await loadCanonicalVocabulary();
    expect(out.loaded).toBe(false);
  });

  it("returns EMPTY_VOCABULARY when fetch throws", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("network down"))),
    );
    const out = await loadCanonicalVocabulary();
    expect(out.loaded).toBe(false);
  });

  it("warns and last-write-wins when two concepts claim the same alias", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    mockFetch(
      () =>
        new Response(
          JSON.stringify({
            concepts: [
              { slug: "first", aliases: ["shared"] },
              { slug: "second", aliases: ["shared"] },
            ],
          }),
          { status: 200 },
        ),
    );
    const out = await loadCanonicalVocabulary();
    expect(out.aliases.get("shared")).toBe("second");
    expect(warn).toHaveBeenCalled();
  });
});

describe("loadCorpusSlugList", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns the union of every reading entry's topics, sorted, deduped", async () => {
    mockFetch(
      () =>
        new Response(
          JSON.stringify({
            entries: [
              { topics: ["mcp", "ai-agents"] },
              { topics: ["mcp", "evals"] },
              { topics: [] },
              {},
            ],
          }),
          { status: 200 },
        ),
    );
    const out = await loadCorpusSlugList();
    expect(out).toEqual(["ai-agents", "evals", "mcp"]);
  });

  it("returns [] on non-200", async () => {
    mockFetch(() => new Response("nope", { status: 503 }));
    expect(await loadCorpusSlugList()).toEqual([]);
  });

  it("returns [] on shape mismatch", async () => {
    mockFetch(() => new Response(JSON.stringify({ entries: "not-an-array" }), { status: 200 }));
    expect(await loadCorpusSlugList()).toEqual([]);
  });

  it("returns [] when fetch throws", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("network"))),
    );
    expect(await loadCorpusSlugList()).toEqual([]);
  });
});
