/**
 * Shared content-collection schemas.
 *
 * Consumed by both the Astro site (src/content.config.ts) and the
 * site-ingest worker (for pre-commit validation of drafted content).
 * Uses the `zod` package directly rather than `astro/zod` so the worker —
 * which cannot resolve Astro-specific imports — can share the same source.
 */

import { z } from "zod";

// Both site and worker pin zod ^4. `z.url()` is the v4 form; if the worker is
// ever pinned back to v3, switch to `z.string().url()`.

export const readingCategories = ["tech", "design", "music", "essay", "news", "other"] as const;

export const ReadingCategorySchema = z.enum(readingCategories);

export const NowFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  updated: z.coerce.date(),
  standfirst: z.string().max(180),
});

export const NowArchiveFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  archivedDate: z.coerce.date(),
});

/**
 * Per-call Anthropic cost snapshot persisted in reading + wiki frontmatter.
 * Mirrors `CostRecord` in workers/site-ingest/src/cost.ts so the worker can
 * write its computed cost directly without translation. Pricing is captured
 * inline so historical numbers stay reproducible across price-table updates.
 */
export const CompileCostSchema = z.object({
  usage: z.object({
    input_tokens: z.number().int().nonnegative(),
    output_tokens: z.number().int().nonnegative(),
    cache_creation_input_tokens: z.number().int().nonnegative(),
    cache_read_input_tokens: z.number().int().nonnegative(),
  }),
  model: z.string(),
  pricing: z
    .object({
      model: z.string(),
      input_per_million: z.number(),
      output_per_million: z.number(),
      cache_read_per_million: z.number(),
      cache_write_5m_per_million: z.number(),
      priced_at: z.string(),
    })
    .nullable(),
  cost_usd: z.number().nullable(),
});

export const ReadingFrontmatterSchema = z.object({
  title: z.string(),
  url: z.url(),
  summary: z.string(),
  category: ReadingCategorySchema,
  added: z.coerce.date(),
  author: z.string().optional(),
  source: z.string().optional(),
  // 3–5 lowercase kebab-case topic slugs assigned at ingest. Optional so
  // entries written before the field existed still validate. Mirrors the
  // worker-side LinkSummarySchema in workers/site-ingest/src/anthropic.ts.
  topics: z
    .array(z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "kebab-case slug required"))
    .min(1)
    .max(5)
    .optional(),
  // Provenance so `/recompile` can target entries compiled with older
  // models or earlier prompts. Both optional for the same reason.
  compiled_at: z.coerce.date().optional(),
  compiled_with: z.string().optional(),
  // Which branch produced the title — useful for drift detection when the
  // model's title differs from the page's <title>. Optional so older entries
  // pre-dating the field still validate.
  title_source: z.enum(["model", "fetched", "hostname"]).optional(),
  // Per-call Anthropic cost snapshot. Optional so existing entries (compiled
  // before this field landed) validate; populated organically as entries are
  // ingested or recompiled.
  compile_cost: CompileCostSchema.optional(),
  // Copyright-posture takedown affordance: setting `noindex: true` on an
  // entry's frontmatter excludes it from the public agent surfaces
  // (/reading.json, /llms.txt, /llms-full.txt) without removing the file
  // from the repo. The /reading/<slug> per-entry page may still render —
  // the index pages and agent JSON are the public-facing concern.
  noindex: z.boolean().optional(),
  // Tracks which opt-out signal triggered ingest-with-stub (when /link
  // detects a publisher-level X-Robots-Tag / meta-robots opt-out). Allowed
  // values today: 'noai' | 'noindex' | 'noimageai' | 'meta-robots' | the
  // family-name reason strings used by `optout.ts` (e.g. 'x-robots-tag',
  // 'meta-robots'). Kept as a free-form string so future signals can land
  // without a schema migration. Only set when `noindex: true`.
  opted_out: z.string().optional(),
});

/**
 * Minimum source count for a wiki concept article. The synthesize pipeline
 * only compiles topics that meet this threshold; the schema rejects
 * articles below it. Single source of truth for both sides of that gate.
 */
export const MIN_WIKI_SOURCES = 2;

export const WikiFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string().min(1).max(280),
  sources: z
    .array(z.string().regex(/^[a-z0-9-]+(\/[a-z0-9-]+)*$/, "kebab-case slug required"))
    .min(MIN_WIKI_SOURCES)
    .refine((arr) => new Set(arr).size === arr.length, "duplicate sources"),
  // Synonym slugs that should canonicalize to this concept's wiki slug.
  // Detected by the synthesize prompt's alias-detection step over the
  // corpus's active topic list. Read by the agent-surface emitters in
  // src/lib/topics.ts to rewrite reading-entry topics at build time.
  // Optional (rather than `.default([])`) so existing wiki articles —
  // and worker test fixtures — that don't carry the field validate
  // without modification. Consumers handle `aliases ?? []`.
  aliases: z
    .array(z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "kebab-case slug required"))
    .optional(),
  /**
   * @deprecated Synthesize no longer emits this. The render layer unions
   *   graph-derived edges (from inline `[…](/wiki/<slug>)` links inserted by
   *   the validated crosslink phase) with any legacy entries here that still
   *   resolve against the live wiki collection. Hallucinated entries are
   *   logged at build time. Remove this field once every
   *   `src/content/wiki/*.md` entry has been recompiled with the
   *   link-graph-aware synthesize prompt.
   */
  related_concepts: z.array(z.string()).optional(),
  compiled_at: z.coerce.date(),
  compiled_with: z.string(),
  // Per-call Anthropic cost snapshot. Optional so the 8 existing wiki articles
  // (compiled before this field landed) validate; populated organically as
  // articles are recompiled by /synthesize.
  compile_cost: CompileCostSchema.optional(),
});

export const LabStatuses = ["draft", "running", "live", "archived"] as const;
export const LabStatusSchema = z.enum(LabStatuses);

export const LabKinds = ["chart", "table", "barchart", "stat", "calendar", "scatter"] as const;
export const LabKindSchema = z.enum(LabKinds);

/**
 * Labs frontmatter — Observable-style cells holding the data behind posts
 * (cost breakdowns, eval runs, telemetry). Combines the rigor of an
 * "experiment write-up" (hypothesis, status, headline metric) with a
 * presentation shape lifted from the wiki-design bundle (`kind` selects a
 * viz primitive; `pre` is the code-cell text; `post` is the commentary
 * paragraph below the result).
 *
 * Fields prefixed with `experiment-`-scaffold are required so every cell
 * leads with the question, not the result. The `kind`/`pre`/`post` trio is
 * optional so an early-stage cell can ship with only a JSON measurement
 * file (rendered as a `<pre>` block) and graduate to a full visualization
 * later without a schema migration.
 */
export const LabFrontmatterSchema = z.object({
  title: z.string(),
  hypothesis: z.string().min(1),
  status: LabStatusSchema,
  lastRunDate: z.coerce.date(),
  publishedDate: z.coerce.date(),
  tldr: z.string().min(1),
  headlineMetric: z.object({
    label: z.string().min(1),
    value: z.string().min(1),
  }),
  repoUrl: z.url().optional(),
  // Path under src/content/labs/data/ to a JSON file holding the raw
  // measurements. The detail page reads this at build time.
  dataPath: z.string().optional(),
  blogPostSlug: z.string().optional(),
  tags: z.array(z.string()).default([]),
  // Visual shape — picks the viz primitive on the result cell. Optional
  // because early-stage cells fall back to a `<pre>` JSON dump.
  kind: LabKindSchema.optional(),
  // Code-cell text (mono, inset surface) shown above the result.
  pre: z.string().optional(),
  // Commentary paragraph under the result cell.
  post: z.string().optional(),
});

export const BlogFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  canonical: z.url().optional(),
  updated: z.coerce.date().optional(),
  aiAssistance: z.enum(["none", "light", "heavy", "full"]).optional(),
  aiNote: z.string().optional(),
  series: z.string().optional(),
});

export type CompileCost = z.infer<typeof CompileCostSchema>;
export type ReadingCategory = z.infer<typeof ReadingCategorySchema>;
export type NowFrontmatter = z.infer<typeof NowFrontmatterSchema>;
export type NowArchiveFrontmatter = z.infer<typeof NowArchiveFrontmatterSchema>;
export type ReadingFrontmatter = z.infer<typeof ReadingFrontmatterSchema>;
export type WikiFrontmatter = z.infer<typeof WikiFrontmatterSchema>;
export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;
