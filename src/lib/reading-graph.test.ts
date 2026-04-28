import { buildReadingGraph, type ReadingInput, type WikiInput } from "@lib/reading-graph";
import { describe, expect, it } from "vitest";

// Minimal fixture builder — only the fields buildReadingGraph reads.
// The worker validates the emitted JSON shape via ReadingIndexSchema
// (see workers/site-ingest/src/link.ts:212-240) — keep tests focused on
// the transform logic rather than the full CollectionEntry type.
function reading(
  id: string,
  data: Partial<ReadingInput["data"]> & { added?: Date } = {},
): ReadingInput {
  return {
    id,
    data: {
      title: data.title ?? `Title for ${id}`,
      url: data.url ?? `https://example.com/${id}`,
      summary: data.summary ?? "summary",
      category: data.category ?? "tech",
      added: data.added ?? new Date("2026-04-15T12:00:00Z"),
      author: data.author,
      source: data.source,
      topics: data.topics,
      compiled_at: data.compiled_at,
      compiled_with: data.compiled_with,
    },
  };
}

function wiki(id: string, sources: string[]): WikiInput {
  return { id, data: { sources } };
}

function findEntry<T extends { slug: string }>(entries: T[], slug: string): T {
  const found = entries.find((e) => e.slug === slug);
  if (!found) {
    throw new Error(`expected entry with slug "${slug}"`);
  }
  return found;
}

describe("buildReadingGraph", () => {
  it("never lists an entry as related to itself", () => {
    const entries = [
      reading("2026-04/a", { topics: ["agents"], author: "Alice", source: "Acme" }),
      reading("2026-04/b", { topics: ["agents"], author: "Alice", source: "Acme" }),
    ];
    const { payload } = buildReadingGraph(entries, []);
    for (const e of payload.entries) {
      expect(e.related.find((r) => r.slug === e.slug)).toBeUndefined();
    }
  });

  it("dedupes when two entries share multiple topics", () => {
    const entries = [
      reading("2026-04/a", { topics: ["agents", "evals"] }),
      reading("2026-04/b", { topics: ["agents", "evals"] }),
    ];
    const { payload } = buildReadingGraph(entries, []);
    const a = findEntry(payload.entries, "2026-04/a");
    const matches = a.related.filter((r) => r.slug === "2026-04/b");
    expect(matches).toHaveLength(1);
    expect(matches[0]?.reason).toBe("topic");
  });

  it("records `topic` when entries share both topic and author", () => {
    const entries = [
      reading("2026-04/a", { topics: ["agents"], author: "Alice" }),
      reading("2026-04/b", { topics: ["agents"], author: "Alice" }),
    ];
    const { payload } = buildReadingGraph(entries, []);
    const a = findEntry(payload.entries, "2026-04/a");
    const edge = a.related.find((r) => r.slug === "2026-04/b");
    expect(edge?.reason).toBe("topic");
  });

  it("caps related[] at 8 entries even when more candidates exist", () => {
    const entries: ReadingInput[] = [];
    entries.push(reading("2026-04/anchor", { topics: ["agents"] }));
    for (let i = 0; i < 12; i++) {
      entries.push(reading(`2026-04/c${i}`, { topics: ["agents"] }));
    }
    const { payload } = buildReadingGraph(entries, []);
    const anchor = findEntry(payload.entries, "2026-04/anchor");
    expect(anchor.related).toHaveLength(8);
  });

  it("collects orphan citations and excludes broken concept from wiki_concepts[]", () => {
    const entries = [reading("2026-04/a"), reading("2026-04/b")];
    const wikis = [
      wiki("agents", ["2026-04/a", "2026-04/missing"]),
      wiki("evals", ["2026-04/a", "2026-04/b"]),
    ];
    const { payload, orphanCitations } = buildReadingGraph(entries, wikis);
    expect(orphanCitations).toEqual([{ concept: "agents", missing: "2026-04/missing" }]);
    const a = findEntry(payload.entries, "2026-04/a");
    expect(a.wiki_concepts).toEqual(["agents", "evals"]);
    const b = findEntry(payload.entries, "2026-04/b");
    expect(b.wiki_concepts).toEqual(["evals"]);
  });

  it("populates wiki_concepts[] for entries cited by multiple concepts", () => {
    const entries = [reading("2026-04/a")];
    const wikis = [
      wiki("agents", ["2026-04/a", "2026-04/x"]),
      wiki("evals", ["2026-04/a", "2026-04/y"]),
    ];
    // Add the other-cited entries so the concepts have ≥1 valid source besides /a.
    entries.push(reading("2026-04/x"), reading("2026-04/y"));
    const { payload } = buildReadingGraph(entries, wikis);
    const a = findEntry(payload.entries, "2026-04/a");
    expect(a.wiki_concepts.sort()).toEqual(["agents", "evals"]);
  });

  it("returns an empty payload for empty collections without throwing", () => {
    const { payload, orphanCitations } = buildReadingGraph([], []);
    expect(payload.count).toBe(0);
    expect(payload.entries).toEqual([]);
    expect(payload.categories).toEqual([]);
    expect(orphanCitations).toEqual([]);
  });

  it("groups entries in the same category and slug-derived month bucket", () => {
    const entries = [
      reading("2026-04/a", { category: "tech" }),
      reading("2026-04/b", { category: "tech" }),
    ];
    const { payload } = buildReadingGraph(entries, []);
    const a = findEntry(payload.entries, "2026-04/a");
    const b = findEntry(payload.entries, "2026-04/b");
    expect(a.related.find((r) => r.slug === "2026-04/b")?.reason).toBe("category-month");
    expect(b.related.find((r) => r.slug === "2026-04/a")?.reason).toBe("category-month");
  });
});
