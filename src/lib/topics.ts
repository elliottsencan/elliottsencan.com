/**
 * Canonical topic vocabulary derived from wiki article aliases.
 *
 * The site's topic vocabulary is auto-grown — canonicals appear as reading
 * entries get tagged at /link ingest time, and aliases get formalized at
 * /synthesize time when a wiki article is compiled for a concept and the
 * model identifies near-synonym slugs from the active corpus. The wiki
 * collection is the topic registry; aliases live on the wiki article they
 * alias, next to the synthesis they qualify.
 *
 * `ReadingFrontmatterSchema.topics` stays loose (kebab-case only) so
 * pre-threshold concepts and newly-coined slugs validate. Source markdown
 * can drift; canonicalization happens at every agent-surface emission via
 * `canonicalizeTopics`. Consumers (reading.json, llms-full.txt, wiki/index,
 * per-entry detail pages) all share this util.
 */

export type CanonicalVocabulary = {
  /** alias → canonical (wiki article slug). Built from wiki frontmatter. */
  aliases: Map<string, string>;
};

/** Minimal wiki-input shape for vocabulary derivation; decoupled from CollectionEntry. */
export type WikiVocabularyInput = {
  id: string;
  data: { aliases?: readonly string[] };
};

/**
 * Build the canonical vocabulary from the wiki collection. Warns at build
 * time if two articles claim the same alias (last-write-wins; surfaces the
 * conflict so it can be fixed in source).
 */
export function buildVocabularyFromWiki(wiki: readonly WikiVocabularyInput[]): CanonicalVocabulary {
  const aliases = new Map<string, string>();
  for (const article of wiki) {
    for (const alias of article.data.aliases ?? []) {
      const existing = aliases.get(alias);
      if (existing && existing !== article.id) {
        console.warn(
          `[topics:duplicate-alias] "${alias}" claimed by both ${existing} and ${article.id} — using ${article.id}`,
        );
      }
      aliases.set(alias, article.id);
    }
  }
  return { aliases };
}

/**
 * Rewrite each topic through the alias map. Dedupes the result so that an
 * entry whose source markdown contains both an alias and its canonical
 * (e.g. `[agentic-coding, ai-assisted-coding]`) collapses to one canonical.
 */
export function canonicalizeTopics(
  topics: readonly string[],
  vocab: CanonicalVocabulary,
): string[] {
  const rewritten = topics.map((t) => vocab.aliases.get(t) ?? t);
  return [...new Set(rewritten)];
}

/** Empty vocabulary for tests and call sites that want an explicit no-op. */
export const EMPTY_VOCABULARY: CanonicalVocabulary = { aliases: new Map() };
