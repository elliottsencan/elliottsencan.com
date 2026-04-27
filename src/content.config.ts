import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import {
  BlogFrontmatterSchema,
  NowArchiveFrontmatterSchema,
  NowFrontmatterSchema,
  ReadingFrontmatterSchema,
  WikiFrontmatterSchema,
} from "./lib/schemas/content.ts";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: BlogFrontmatterSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
    isCaseStudy: z.boolean().default(false),
    status: z.enum(["active", "archived", "killed"]).default("active"),
    role: z.string().optional(),
    stack: z.array(z.string()).optional(),
    impact: z
      .array(
        z.object({
          metric: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
    thumbnail: z.string().optional(),
    order: z.number().optional(),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: "current.md", base: "./src/content/now" }),
  schema: NowFrontmatterSchema,
});

const nowArchive = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/now-archive" }),
  schema: NowArchiveFrontmatterSchema,
});

const reading = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/reading" }),
  schema: ReadingFrontmatterSchema,
});

const wiki = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/wiki" }),
  schema: WikiFrontmatterSchema,
});

export const collections = { blog, projects, now, nowArchive, reading, wiki };
