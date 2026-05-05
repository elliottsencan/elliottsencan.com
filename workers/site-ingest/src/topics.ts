/**
 * Canonical topic vocabulary for the worker.
 *
 * Source of truth: the wiki collection's frontmatter, exposed at
 * `https://elliottsencan.com/wiki.json` (each concept's `aliases[]` is the
 * authoritative alias list for that canonical). The corpus slug list — used
 * by /synthesize's alias-detection step — is derived from the public
 * `/reading.json` index.
 *
 * Both fetchers fail open (return loaded:false with empty data) on any
 * error. Cloudflare Workers cache the public JSON at the edge, so the
 * latency cost per request is negligible.
 */

import { z } from "zod";
import { log } from "./util.ts";

const WIKI_JSON_URL = "https://elliottsencan.com/wiki.json";
const READING_JSON_URL = "https://elliottsencan.com/reading.json";
const FETCH_TIMEOUT_MS = 3000;
const MAX_CANONICALS_IN_PROMPT = 80;
const MAX_ALIASES_IN_PROMPT = 40;
const MAX_CORPUS_SLUGS = 120;

const WikiJsonSchema = z.object({
  concepts: z.array(
    z.object({
      slug: z.string(),
      aliases: z.array(z.string()).optional(),
    }),
  ),
});

const ReadingJsonSchema = z.object({
  entries: z.array(z.object({ topics: z.array(z.string()).optional() })),
});

export type CanonicalVocabulary = {
  /** Wiki article slugs, sorted. The "canonicals" surface for the link prompt. */
  canonicals: string[];
  /** alias → canonical (wiki article slug). Built from each article's frontmatter. */
  aliases: Map<string, string>;
  /** Whether the public JSON loaded successfully. False on any fetch/shape failure. */
  loaded: boolean;
};

export const EMPTY_VOCABULARY: CanonicalVocabulary = {
  canonicals: [],
  aliases: new Map(),
  loaded: false,
};

/**
 * Fetch the canonical vocabulary from the public /wiki.json. Same fail-open
 * contract as `loadExistingTopics()` had before — any network/shape error
 * returns an empty vocabulary so the caller can proceed without aliases.
 */
export async function loadCanonicalVocabulary(): Promise<CanonicalVocabulary> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(WIKI_JSON_URL, { signal: controller.signal });
    if (!res.ok) {
      log.warn("topics", "vocab", "wiki.json fetch failed", { status: res.status });
      return EMPTY_VOCABULARY;
    }
    const raw = await res.json();
    const parsed = WikiJsonSchema.safeParse(raw);
    if (!parsed.success) {
      log.error("topics", "vocab", "wiki.json shape changed", {
        issues: parsed.error.issues.length,
        first: parsed.error.issues[0]?.path.join(".") ?? "(root)",
      });
      return EMPTY_VOCABULARY;
    }
    const aliases = new Map<string, string>();
    const canonicals: string[] = [];
    for (const concept of parsed.data.concepts) {
      canonicals.push(concept.slug);
      for (const alias of concept.aliases ?? []) {
        const existing = aliases.get(alias);
        if (existing && existing !== concept.slug) {
          log.warn("topics", "vocab", "duplicate alias across concepts", {
            alias,
            existing,
            new: concept.slug,
          });
        }
        aliases.set(alias, concept.slug);
      }
    }
    canonicals.sort();
    return { canonicals, aliases, loaded: true };
  } catch (err) {
    log.warn("topics", "vocab", "wiki.json fetch threw", {
      msg: err instanceof Error ? err.message : "unknown",
    });
    return EMPTY_VOCABULARY;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Result of post-processing model-emitted topics through the canonical
 * vocabulary. `committed` is what gets written to the entry frontmatter;
 * `rewritten` and `coined` carry signal for the maintenance loop.
 */
export type AppliedVocabulary = {
  committed: string[];
  rewritten: Array<{ from: string; to: string }>;
  /** Slugs the model emitted that are neither canonicals nor known aliases. */
  coined: string[];
};

/**
 * Rewrite known aliases to their canonical slug. Schema is intentionally
 * loose, so unknown slugs (model coinages) pass through as-is — they'll
 * become new canonicals as soon as a wiki article gets compiled for them
 * at /synthesize time. The `coined` field surfaces them for review.
 */
export function applyVocabulary(
  modelTopics: readonly string[],
  vocab: CanonicalVocabulary,
): AppliedVocabulary {
  const rewritten: Array<{ from: string; to: string }> = [];
  const coined: string[] = [];
  const seen = new Set<string>();
  const committed: string[] = [];
  for (const slug of modelTopics) {
    const canonical = vocab.aliases.get(slug);
    if (canonical) {
      rewritten.push({ from: slug, to: canonical });
      if (!seen.has(canonical)) {
        seen.add(canonical);
        committed.push(canonical);
      }
      continue;
    }
    if (!vocab.canonicals.includes(slug) && vocab.loaded) {
      coined.push(slug);
    }
    if (!seen.has(slug)) {
      seen.add(slug);
      committed.push(slug);
    }
  }
  return { committed, rewritten, coined };
}

/**
 * Render the vocabulary block for the link-summary user message. Caps at
 * `MAX_CANONICALS_IN_PROMPT` / `MAX_ALIASES_IN_PROMPT` so the prompt stays
 * within sensible token budget.
 */
export function buildVocabularyPromptBlock(vocab: CanonicalVocabulary): string {
  if (!vocab.loaded || vocab.canonicals.length === 0) {
    return "";
  }
  const canonicals = vocab.canonicals.slice(0, MAX_CANONICALS_IN_PROMPT);
  const aliasEntries = [...vocab.aliases.entries()].slice(0, MAX_ALIASES_IN_PROMPT);
  const lines: string[] = [];
  lines.push(`CANONICAL TOPIC LIST (prefer these): ${canonicals.join(", ")}`);
  if (aliasEntries.length > 0) {
    const pairs = aliasEntries.map(([alias, canonical]) => `${alias}→${canonical}`).join(", ");
    lines.push(`KNOWN ALIASES (never emit these — listed → canonical): ${pairs}`);
  }
  return lines.join("\n");
}

/**
 * Fetch the union of every reading entry's `topics[]`. Used by /synthesize's
 * alias-detection step so the model sees the full active vocabulary when
 * proposing aliases for a newly-compiled wiki article. Fail-open like
 * `loadCanonicalVocabulary`.
 */
export async function loadCorpusSlugList(): Promise<string[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(READING_JSON_URL, { signal: controller.signal });
    if (!res.ok) {
      log.warn("topics", "corpus", "reading.json fetch failed", { status: res.status });
      return [];
    }
    const raw = await res.json();
    const parsed = ReadingJsonSchema.safeParse(raw);
    if (!parsed.success) {
      log.error("topics", "corpus", "reading.json shape changed", {
        issues: parsed.error.issues.length,
        first: parsed.error.issues[0]?.path.join(".") ?? "(root)",
      });
      return [];
    }
    const seen = new Set<string>();
    for (const entry of parsed.data.entries) {
      for (const t of entry.topics ?? []) {
        if (t.length > 0) {
          seen.add(t);
        }
      }
    }
    return [...seen].sort().slice(0, MAX_CORPUS_SLUGS);
  } catch (err) {
    log.warn("topics", "corpus", "reading.json fetch threw", {
      msg: err instanceof Error ? err.message : "unknown",
    });
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Filter a model-proposed alias list to those safe to write into a wiki
 * article's frontmatter. Drops:
 *  - the article's own canonical (self-aliases)
 *  - slugs that are themselves wiki article slugs (would alias one real
 *    concept to another — never automatic, requires manual review)
 *  - duplicates
 *
 * Returns the surviving aliases plus the dropped proposals + reasons so
 * the synthesize PR body can surface them.
 */
export type AliasFilterResult = {
  accepted: string[];
  dropped: Array<{ alias: string; reason: "self-alias" | "wiki-collision" | "duplicate" }>;
};

export function filterProposedAliases(
  proposed: readonly string[],
  canonical: string,
  wikiSlugs: ReadonlySet<string>,
): AliasFilterResult {
  const accepted: string[] = [];
  const dropped: AliasFilterResult["dropped"] = [];
  const seen = new Set<string>();
  for (const slug of proposed) {
    if (slug === canonical) {
      dropped.push({ alias: slug, reason: "self-alias" });
      continue;
    }
    if (wikiSlugs.has(slug)) {
      dropped.push({ alias: slug, reason: "wiki-collision" });
      continue;
    }
    if (seen.has(slug)) {
      dropped.push({ alias: slug, reason: "duplicate" });
      continue;
    }
    seen.add(slug);
    accepted.push(slug);
  }
  return { accepted: accepted.sort(), dropped };
}
