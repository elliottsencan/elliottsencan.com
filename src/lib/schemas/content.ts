/**
 * Shared content-collection schemas.
 *
 * Consumed by both the Astro site (src/content.config.ts) and the
 * site-ingest worker (for pre-commit validation of drafted content).
 * Uses the `zod` package directly rather than `astro/zod` so the worker —
 * which cannot resolve Astro-specific imports — can share the same source.
 */

import { z } from "zod";

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
  // `z.string().url()` rather than `z.url()` for compatibility: the worker
  // resolves plain `zod` (v3), which has no top-level `url`. Astro's
  // `astro/zod` (v4-flavoured) accepts both forms.
  url: z.string().url(),
  summary: z.string(),
  category: ReadingCategorySchema,
  added: z.coerce.date(),
  author: z.string().optional(),
  source: z.string().optional(),
  // 3–5 lowercase kebab-case topic slugs assigned at ingest. Optional so
  // entries written before the field existed still validate.
  topics: z.array(z.string()).optional(),
  // Provenance so `/recompile` can target entries compiled with older
  // models or earlier prompts. Both optional for the same reason.
  compiled_at: z.coerce.date().optional(),
  compiled_with: z.string().optional(),
});

/**
 * Wiki concept articles. Compiled by the /synthesize worker pipeline,
 * which clusters reading entries by their topics[] field and writes
 * one article per topic that has 2+ contributing entries.
 *
 * Distinct from reading entries: a reading entry is a per-source
 * citation; a wiki article is per-concept synthesis across multiple
 * sources.
 */
export const WikiFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string().max(240),
  // Reading entry slugs that contributed to this synthesis. Drives the
  // graph-of-sources view and powers the reverse `wiki_concepts[]`
  // computed on each reading entry in /reading.json.
  sources: z.array(z.string()).min(1),
  // Other wiki concept slugs related to this one. Populated by the
  // synthesis prompt when there's natural cross-concept linkage.
  related_concepts: z.array(z.string()).optional(),
  compiled_at: z.coerce.date(),
  compiled_with: z.string(),
});

export type ReadingCategory = z.infer<typeof ReadingCategorySchema>;
export type NowFrontmatter = z.infer<typeof NowFrontmatterSchema>;
export type NowArchiveFrontmatter = z.infer<typeof NowArchiveFrontmatterSchema>;
export type ReadingFrontmatter = z.infer<typeof ReadingFrontmatterSchema>;
export type WikiFrontmatter = z.infer<typeof WikiFrontmatterSchema>;
