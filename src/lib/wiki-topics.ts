/**
 * Topic clustering for wiki concepts.
 *
 * Wiki articles don't carry a `topics[]` field — they're concept-indexed,
 * not topic-tagged. To group them into a clustered grid we read the
 * `topics[]` of each article's contributing reading entries and union them.
 * The most-frequent topic across the cluster becomes the article's primary
 * cluster key. This keeps the wiki schema tight and means clustering
 * self-corrects as new sources land.
 *
 * Topics are canonicalized through the wiki-derived alias map before
 * counting, so synonym fragments collapse and clusters key on canonical
 * slugs even when contributing reading entries still carry alias slugs in
 * source markdown.
 */

import { type CanonicalVocabulary, canonicalizeTopics, EMPTY_VOCABULARY } from "@lib/topics";

export type WikiTopicInput = {
  id: string;
  data: { sources: readonly string[] };
};

export type ReadingTopicInput = {
  id: string;
  data: { topics?: readonly string[] };
};

/**
 * Returns each topic that appears across the article's sources, ordered by
 * frequency (most-cited topic first). Empty array if no source has topics.
 */
export function deriveWikiTopics(
  concept: WikiTopicInput,
  readingById: ReadonlyMap<string, ReadingTopicInput>,
  vocab: CanonicalVocabulary = EMPTY_VOCABULARY,
): string[] {
  const counts = new Map<string, number>();
  for (const sourceId of concept.data.sources) {
    const entry = readingById.get(sourceId);
    if (!entry) {
      continue;
    }
    for (const topic of canonicalizeTopics(entry.data.topics ?? [], vocab)) {
      counts.set(topic, (counts.get(topic) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort(([a, ac], [b, bc]) => bc - ac || a.localeCompare(b))
    .map(([t]) => t);
}

export function indexReadingById<T extends ReadingTopicInput>(
  reading: readonly T[],
): Map<string, T> {
  return new Map(reading.map((entry) => [entry.id, entry]));
}
