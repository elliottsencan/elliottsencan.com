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
