import type { CompileCost } from "@lib/schemas/content";
import { type CanonicalVocabulary, canonicalizeTopics, EMPTY_VOCABULARY } from "@lib/topics";
import { monthKey } from "@lib/utils";

/**
 * Pure transform behind /reading.json — kept out of the Astro endpoint
 * so it can be unit-tested without astro:content.
 *
 * `related[]` is a cheap metadata-derived graph (shared author / source /
 * topic / category+month). `wiki_concepts[]` is the reverse index from
 * the wiki layer — every concept article that cites this entry.
 *
 * Topics are canonicalized (alias → canonical from wiki frontmatter) before
 * any indexing or emission, so the byTopic graph collapses synonym fragments
 * and the per-entry `topics[]` field on the surface is always canonical even
 * when the source markdown carries a deprecated alias.
 *
 * Orphan citations (wiki sources pointing at a missing reading slug) are
 * collected and returned for the caller to log; this function does not
 * `console.warn` so tests can stay quiet.
 */

export type Related = {
  slug: string;
  reason: "author" | "source" | "topic" | "category-month";
};

export type ReadingGraphEntry = {
  slug: string;
  title: string;
  url: string;
  summary: string;
  category: string;
  added: string;
  author: string | undefined;
  source: string | undefined;
  topics: string[];
  compiled_at: string | undefined;
  compiled_with: string | undefined;
  compile_cost: CompileCost | undefined;
  wiki_concepts: string[];
  related: Related[];
};

export type ReadingGraphPayload = {
  generated_at: string;
  count: number;
  categories: string[];
  entries: ReadingGraphEntry[];
};

export type OrphanCitation = { concept: string; missing: string };

// Minimal shape of what this transform reads — keeps the function
// decoupled from the full CollectionEntry types.
export type ReadingInput = {
  id: string;
  data: {
    title: string;
    url: string;
    summary: string;
    category: string;
    added: Date;
    author?: string;
    source?: string;
    topics?: string[];
    compiled_at?: Date;
    compiled_with?: string;
    compile_cost?: CompileCost;
    /** Takedown affordance: when true, exclude from the public dump. */
    noindex?: boolean;
  };
};

export type WikiInput = {
  id: string;
  data: {
    sources: string[];
  };
};

function pushTo<K, V>(map: Map<K, V[]>, key: K, value: V): void {
  const existing = map.get(key);
  if (existing) {
    existing.push(value);
  } else {
    map.set(key, [value]);
  }
}

export function buildReadingGraph(
  readingEntries: ReadingInput[],
  wikiEntries: WikiInput[],
  vocab: CanonicalVocabulary = EMPTY_VOCABULARY,
): { payload: ReadingGraphPayload; orphanCitations: OrphanCitation[] } {
  // Filter out entries flagged with `noindex: true` before any indexing.
  // This is a takedown affordance for the agent surface; the file stays in
  // the repo but never appears in the public JSON dump.
  const visibleEntries = readingEntries.filter((e) => e.data.noindex !== true);

  // Canonicalize topics up front so byTopic indexing and per-entry emission
  // both run on canonical strings. Source markdown that still carries an
  // alias (e.g. `agentic-coding`) appears on the surface as the canonical
  // (`ai-assisted-coding`), and the related[] graph collapses fragments.
  const canonicalTopicsBySlug = new Map<string, string[]>();
  for (const entry of visibleEntries) {
    canonicalTopicsBySlug.set(entry.id, canonicalizeTopics(entry.data.topics ?? [], vocab));
  }

  const entries = [...visibleEntries].sort(
    (a, b) => b.data.added.valueOf() - a.data.added.valueOf(),
  );

  const readingIds = new Set(entries.map((e) => e.id));
  const wikiByEntry = new Map<string, string[]>();
  const orphanCitations: OrphanCitation[] = [];
  for (const concept of wikiEntries) {
    for (const source of concept.data.sources) {
      if (!readingIds.has(source)) {
        orphanCitations.push({ concept: concept.id, missing: source });
        continue;
      }
      pushTo(wikiByEntry, source, concept.id);
    }
  }

  const byAuthor = new Map<string, string[]>();
  const bySource = new Map<string, string[]>();
  const byTopic = new Map<string, string[]>();
  const byCategoryMonth = new Map<string, string[]>();

  for (const entry of entries) {
    if (entry.data.author) {
      pushTo(byAuthor, entry.data.author.toLowerCase(), entry.id);
    }
    if (entry.data.source) {
      pushTo(bySource, entry.data.source.toLowerCase(), entry.id);
    }
    for (const topic of canonicalTopicsBySlug.get(entry.id) ?? []) {
      pushTo(byTopic, topic.toLowerCase(), entry.id);
    }
    pushTo(byCategoryMonth, `${entry.data.category}:${monthKey(entry.id)}`, entry.id);
  }

  const payload: ReadingGraphPayload = {
    generated_at: new Date().toISOString(),
    count: entries.length,
    categories: [...new Set(entries.map((e) => e.data.category))].sort(),
    entries: entries.map((entry) => {
      const canonicalTopics = canonicalTopicsBySlug.get(entry.id) ?? [];
      const related: Related[] = [];
      const seen = new Set<string>([entry.id]);

      const pushRelated = (slugs: string[], reason: Related["reason"]) => {
        for (const slug of slugs) {
          if (seen.has(slug)) {
            continue;
          }
          seen.add(slug);
          related.push({ slug, reason });
        }
      };

      // Topic overlap is the strongest semantic signal, surface it first.
      for (const topic of canonicalTopics) {
        pushRelated(byTopic.get(topic.toLowerCase()) ?? [], "topic");
      }
      if (entry.data.author) {
        pushRelated(byAuthor.get(entry.data.author.toLowerCase()) ?? [], "author");
      }
      if (entry.data.source) {
        pushRelated(bySource.get(entry.data.source.toLowerCase()) ?? [], "source");
      }
      pushRelated(
        byCategoryMonth.get(`${entry.data.category}:${monthKey(entry.id)}`) ?? [],
        "category-month",
      );

      return {
        slug: entry.id,
        title: entry.data.title,
        url: entry.data.url,
        summary: entry.data.summary,
        category: entry.data.category,
        added: entry.data.added.toISOString(),
        author: entry.data.author,
        source: entry.data.source,
        topics: canonicalTopics,
        compiled_at: entry.data.compiled_at?.toISOString(),
        compiled_with: entry.data.compiled_with,
        compile_cost: entry.data.compile_cost,
        wiki_concepts: wikiByEntry.get(entry.id) ?? [],
        related: related.slice(0, 8),
      };
    }),
  };

  return { payload, orphanCitations };
}
