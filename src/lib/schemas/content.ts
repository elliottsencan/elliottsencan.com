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
});

/**
 * Minimum source count for a wiki concept article. The synthesize pipeline
 * only compiles topics that meet this threshold; the schema rejects
 * articles below it. Single source of truth for both sides of that gate.
 */
export const MIN_WIKI_SOURCES = 2;

export const WikiFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string().min(1).max(240),
  sources: z
    .array(z.string().regex(/^[a-z0-9-]+(\/[a-z0-9-]+)*$/, "kebab-case slug required"))
    .min(MIN_WIKI_SOURCES)
    .refine((arr) => new Set(arr).size === arr.length, "duplicate sources"),
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
});

export const ExperimentStatuses = ["draft", "running", "live", "archived"] as const;

export const ExperimentFrontmatterSchema = z.object({
  title: z.string(),
  // The hypothesis the experiment tests, stated up front. Required so every
  // experiment page leads with the question, not the result.
  hypothesis: z.string().min(1),
  status: z.enum(ExperimentStatuses),
  // Last time the experiment was run end-to-end. Surfaced on the index card
  // so a stale experiment is visible before clicking in.
  lastRunDate: z.coerce.date(),
  // First-publish date. `lastRunDate` updates as the experiment is re-run;
  // `publishedDate` is fixed for stable canonical URLs and dating.
  publishedDate: z.coerce.date(),
  // 1-2 sentences that include the headline number — what a recruiter or
  // skim-reader takes away in five seconds.
  tldr: z.string().min(1),
  // Single canonical metric for the index card and OG image. `value` is a
  // formatted string, not a number, so units / percentages / ratios all
  // render the same way.
  headlineMetric: z.object({
    label: z.string().min(1),
    value: z.string().min(1),
  }),
  // Public repo with the harness, dataset, and reproduction instructions.
  // Optional because some experiments are evaluation-only with no harness
  // worth open-sourcing.
  repoUrl: z.url().optional(),
  // Path under src/content/experiments/data/ to a JSON file holding the raw
  // measurements. Detail page reads this at build time and renders a numeric
  // table below the markdown body. Optional so prose-only experiments
  // (rare) still validate.
  dataPath: z.string().optional(),
  // Slug of the blog post that introduces or contextualizes this
  // experiment, if any. Used to backlink from the detail page.
  blogPostSlug: z.string().optional(),
  tags: z.array(z.string()).default([]),
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

export type ReadingCategory = z.infer<typeof ReadingCategorySchema>;
export type NowFrontmatter = z.infer<typeof NowFrontmatterSchema>;
export type NowArchiveFrontmatter = z.infer<typeof NowArchiveFrontmatterSchema>;
export type ReadingFrontmatter = z.infer<typeof ReadingFrontmatterSchema>;
export type WikiFrontmatter = z.infer<typeof WikiFrontmatterSchema>;
export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;
export type ExperimentStatus = (typeof ExperimentStatuses)[number];
export type ExperimentFrontmatter = z.infer<typeof ExperimentFrontmatterSchema>;
