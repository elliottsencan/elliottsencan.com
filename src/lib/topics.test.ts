import {
  buildVocabularyFromWiki,
  canonicalizeTopics,
  EMPTY_VOCABULARY,
  type WikiVocabularyInput,
} from "@lib/topics";
import { afterEach, describe, expect, it, vi } from "vitest";

function wiki(id: string, aliases?: string[]): WikiVocabularyInput {
  return { id, data: { aliases } };
}

describe("buildVocabularyFromWiki", () => {
  it("returns an empty map for an empty collection", () => {
    const vocab = buildVocabularyFromWiki([]);
    expect(vocab.aliases.size).toBe(0);
  });

  it("returns an empty map when no article declares aliases", () => {
    const vocab = buildVocabularyFromWiki([wiki("mcp"), wiki("ai-agents")]);
    expect(vocab.aliases.size).toBe(0);
  });

  it("maps each alias to the wiki article slug that declares it", () => {
    const vocab = buildVocabularyFromWiki([
      wiki("ai-assisted-coding", ["agentic-coding", "ai-coding-assistants"]),
      wiki("mcp", ["model-context-protocol"]),
    ]);
    expect(vocab.aliases.get("agentic-coding")).toBe("ai-assisted-coding");
    expect(vocab.aliases.get("ai-coding-assistants")).toBe("ai-assisted-coding");
    expect(vocab.aliases.get("model-context-protocol")).toBe("mcp");
    expect(vocab.aliases.size).toBe(3);
  });

  describe("when two articles claim the same alias", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("warns and last-write-wins", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      const vocab = buildVocabularyFromWiki([
        wiki("first", ["shared-alias"]),
        wiki("second", ["shared-alias"]),
      ]);
      expect(vocab.aliases.get("shared-alias")).toBe("second");
      expect(warn).toHaveBeenCalledOnce();
      expect(warn.mock.calls[0]?.[0]).toMatch(/topics:duplicate-alias/);
    });

    it("does not warn when an article re-declares its own alias (same id)", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      // Defensive: a single article shouldn't list duplicates, but if it
      // does (or if the same input appears twice in the collection during
      // dev hot-reloads), we don't want noise.
      const vocab = buildVocabularyFromWiki([wiki("only", ["alias-a"]), wiki("only", ["alias-a"])]);
      expect(vocab.aliases.get("alias-a")).toBe("only");
      expect(warn).not.toHaveBeenCalled();
    });
  });
});

describe("canonicalizeTopics", () => {
  it("is identity when vocabulary is empty", () => {
    expect(canonicalizeTopics(["a", "b"], EMPTY_VOCABULARY)).toEqual(["a", "b"]);
  });

  it("rewrites a known alias to its canonical", () => {
    const vocab = buildVocabularyFromWiki([wiki("ai-assisted-coding", ["agentic-coding"])]);
    expect(canonicalizeTopics(["agentic-coding"], vocab)).toEqual(["ai-assisted-coding"]);
  });

  it("dedupes when an alias rewrite collides with another canonical in the same array", () => {
    const vocab = buildVocabularyFromWiki([wiki("ai-assisted-coding", ["agentic-coding"])]);
    expect(canonicalizeTopics(["agentic-coding", "ai-assisted-coding", "mcp"], vocab)).toEqual([
      "ai-assisted-coding",
      "mcp",
    ]);
  });

  it("dedupes when two different aliases map to the same canonical", () => {
    const vocab = buildVocabularyFromWiki([
      wiki("ai-assisted-coding", ["agentic-coding", "ai-coding-assistants"]),
    ]);
    expect(canonicalizeTopics(["agentic-coding", "ai-coding-assistants"], vocab)).toEqual([
      "ai-assisted-coding",
    ]);
  });

  it("preserves order of first appearance after rewriting", () => {
    const vocab = buildVocabularyFromWiki([wiki("mcp", ["model-context-protocol"])]);
    expect(canonicalizeTopics(["evals", "model-context-protocol", "agents"], vocab)).toEqual([
      "evals",
      "mcp",
      "agents",
    ]);
  });

  it("returns an empty array for an empty input", () => {
    const vocab = buildVocabularyFromWiki([wiki("any", ["alias"])]);
    expect(canonicalizeTopics([], vocab)).toEqual([]);
  });

  it("leaves unknown slugs unchanged", () => {
    const vocab = buildVocabularyFromWiki([wiki("mcp", ["model-context-protocol"])]);
    expect(canonicalizeTopics(["coined-by-the-model"], vocab)).toEqual(["coined-by-the-model"]);
  });
});
