/**
 * Wiki-to-wiki link graph derived from article bodies. Each compiled wiki
 * article may contain inline `[label](/wiki/<slug>)` links inserted by the
 * crosslink phase; this module folds those edges into a forward + backward
 * index so the render layer can show "Related concepts" without trusting
 * LLM-emitted frontmatter.
 *
 * Site-side regex is fine here because input is canonicalized upstream: the
 * worker compiles bodies through an mdast pipeline and the synthesize prompt
 * forbids `/wiki/<slug>` links, so the only `/wiki/` URLs that reach this
 * code are the ones the validated crosslink phase inserted in canonical form.
 * Code spans are stripped before regex anyway, so an inline-code or fenced
 * sample like `` `[x](/wiki/x)` `` does not produce a false-positive edge.
 */

export type WikiLinkGraph = {
  readonly forward: ReadonlyMap<string, ReadonlySet<string>>;
  readonly backward: ReadonlyMap<string, ReadonlySet<string>>;
};

export type WikiInput = {
  id: string;
  body: string;
};

const WIKI_LINK_RE = /\[[^\]]*\]\(\/wiki\/([a-z0-9-]+)\/?(?:[#?][^)]*)?\)/g;
const FENCED_CODE_RE = /```[\s\S]*?```/g;
const INLINE_CODE_RE = /`[^`\n]*`/g;

export function buildWikiLinkGraph(entries: readonly WikiInput[]): WikiLinkGraph {
  const slugs = new Set(entries.map((e) => e.id));
  const forward = new Map<string, Set<string>>();
  const backward = new Map<string, Set<string>>();
  for (const entry of entries) {
    const fwd = new Set<string>();
    const sanitized = entry.body.replace(FENCED_CODE_RE, "").replace(INLINE_CODE_RE, "");
    for (const match of sanitized.matchAll(WIKI_LINK_RE)) {
      const target = match[1];
      if (!target || target === entry.id || !slugs.has(target)) {
        continue;
      }
      fwd.add(target);
      const back = backward.get(target);
      if (back) {
        back.add(entry.id);
      } else {
        backward.set(target, new Set([entry.id]));
      }
    }
    forward.set(entry.id, fwd);
  }
  return { forward, backward };
}

export function relatedConceptsFor(graph: WikiLinkGraph, slug: string): string[] {
  const fwd = graph.forward.get(slug);
  const back = graph.backward.get(slug);
  const union = new Set<string>();
  if (fwd) {
    for (const s of fwd) {
      union.add(s);
    }
  }
  if (back) {
    for (const s of back) {
      union.add(s);
    }
  }
  return [...union].sort();
}

/**
 * Resolve a wiki article's "Related concepts" list using the union of
 * (a) graph-derived edges from article bodies and (b) legacy frontmatter
 * `related_concepts` entries that still resolve against the live wiki
 * collection. Legacy entries that don't resolve are returned separately
 * as `hallucinated[]` so the caller can warn about render-time drift —
 * `/lint` carries the canonical structural report; this is the cheap
 * always-on signal.
 *
 * The legacy-frontmatter side is a transitional courtesy. Once every
 * `src/content/wiki/*.md` entry has been recompiled with the
 * link-graph-aware synthesize prompt, the schema field can be dropped
 * and this function can collapse to `relatedConceptsFor`.
 */
export function resolveRelatedConcepts(
  graph: WikiLinkGraph,
  slug: string,
  legacyFrontmatter: readonly string[] | undefined,
  knownSlugs: ReadonlySet<string>,
): { related: string[]; hallucinated: string[] } {
  const derived = relatedConceptsFor(graph, slug);
  const valid: string[] = [];
  const hallucinated: string[] = [];
  for (const s of legacyFrontmatter ?? []) {
    if (s === slug) {
      continue;
    }
    if (knownSlugs.has(s)) {
      valid.push(s);
    } else {
      hallucinated.push(s);
    }
  }
  if (valid.length === 0) {
    return { related: derived, hallucinated };
  }
  const union = new Set<string>(derived);
  for (const s of valid) {
    union.add(s);
  }
  return { related: [...union].sort(), hallucinated };
}
