/**
 * Cross-link phase configuration. Single source of truth for the corpus
 * topology, per-corpus role/caps, scoring constants, and run-level limits.
 *
 * Adding a new corpus (e.g. `talks`) is one entry here plus matching
 * `enumerate.ts` helpers — no other code paths need to change.
 *
 * `.mdx` is deliberately excluded from `fileExtensions` in v1: substring-
 * based anchor insertion can corrupt JSX expressions and component tags,
 * so MDX files are skipped on both source and target sides until a
 * markdown-AST-aware insertion pass is added.
 */

/**
 * Every corpus the worker references. `reading` participates in cross-link
 * proposals as a citation target/source but is enumerated via its own
 * file-system layout, so it has no `Corpus` config entry; the file-system-
 * managed corpora (wiki + blog) live in `CORPORA` below.
 */
export type CorpusName = "wiki" | "blog" | "reading";

export type Corpus = {
  name: Exclude<CorpusName, "reading">;
  contentDir: string;
  urlPrefix: string;
  role: "reference" | "argument";
  outboundMaxPerPass: number;
  inboundMaxPerPass: number;
  seriesAware: boolean;
  fileExtensions: ReadonlyArray<".md">;
};

// Keyed so missing entries surface as compile errors, not silent runtime
// `undefined`s in the consumers that look up `wiki`/`blog` by name.
export const CORPORA: Record<Exclude<CorpusName, "reading">, Corpus> = {
  wiki: {
    name: "wiki",
    contentDir: "src/content/wiki",
    urlPrefix: "/wiki/",
    role: "reference",
    outboundMaxPerPass: 3,
    inboundMaxPerPass: 5,
    seriesAware: false,
    fileExtensions: [".md"],
  },
  blog: {
    name: "blog",
    contentDir: "src/content/blog",
    urlPrefix: "/writing/",
    role: "argument",
    outboundMaxPerPass: 5,
    inboundMaxPerPass: 3,
    seriesAware: true,
    fileExtensions: [".md"],
  },
};

/** Max candidate targets considered per source piece during scoring. */
export const MAX_CANDIDATES_PER_PIECE = 50;

/**
 * Hard cap on Anthropic calls per pipeline run. Worst case (25-entry
 * /recompile, forward + backward passes per piece) is ~50 calls; cap
 * at 30 with logging for the remainder.
 */
export const MAX_CROSSLINK_CALLS_PER_RUN = 30;

/**
 * Score multiplier applied when source and candidate share a `series`
 * value. No-op until two writing posts opt into the same series.
 */
export const SERIES_BOOST = 1.5;
