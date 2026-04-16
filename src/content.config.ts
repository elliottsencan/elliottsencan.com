import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
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
  }),
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
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
    standfirst: z.string().max(180),
  }),
});

const nowArchive = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/now-archive" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    archivedDate: z.coerce.date(),
  }),
});

const reading = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/reading" }),
  schema: z.object({
    title: z.string(),
    url: z.url(),
    summary: z.string(),
    category: z.enum(["tech", "design", "music", "essay", "news", "other"]),
    added: z.coerce.date(),
    author: z.string().optional(),
    source: z.string().optional(),
  }),
});

export const collections = { blog, projects, now, nowArchive, reading };
