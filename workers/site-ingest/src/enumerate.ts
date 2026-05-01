/**
 * Shared corpus enumerators for the cross-link phase.
 *
 * Reads wiki and blog files from main via injected GitHub helpers and
 * returns parsed frontmatter plus body. Existence-aware: a 404 / "not found"
 * on the directory listing returns an empty array (the wiki dir starts
 * empty and only gets populated by /synthesize).
 *
 * `.mdx` is deliberately skipped — the v1 cross-link phase does substring-
 * based anchor insertion, which can corrupt JSX expressions.
 *
 * Distinct from `enumerateWiki` in synthesize.ts (which tracks `sha` and
 * `compiled_with` for the wiki-write path); these helpers exist for the
 * cross-link phase, which needs body text to scan for anchor candidates.
 */

import type { BlogFrontmatter, WikiFrontmatter } from "@shared/schemas/content.ts";
import { BlogFrontmatterSchema, WikiFrontmatterSchema } from "@shared/schemas/content.ts";
import matter from "gray-matter";
import type { z } from "zod";
import { CORPORA } from "./crosslink-config.ts";
import type { Result } from "./types.ts";
import { log } from "./util.ts";

type DirEntry = { type: "file" | "dir"; name: string; path: string; sha: string };

export type EnumerateDeps = {
  listDir: (path: string, ref?: string) => Promise<Result<DirEntry[]>>;
  getFile: (path: string, ref?: string) => Promise<Result<{ content: string; sha: string }>>;
};

export type WikiEntry = {
  slug: string;
  path: string;
  frontmatter: WikiFrontmatter;
  body: string;
};

export type BlogEntry = {
  slug: string;
  path: string;
  frontmatter: BlogFrontmatter;
  body: string;
};

async function enumerateCorpusWithBodies<T, S extends z.ZodTypeAny>(
  contentDir: string,
  allowedExtensions: ReadonlyArray<string>,
  schema: S,
  corpusName: string,
  deps: EnumerateDeps,
  buildEntry: (slug: string, path: string, fm: z.infer<S>, body: string) => T,
): Promise<T[]> {
  const dir = await deps.listDir(contentDir);
  if (!dir.ok) {
    if (dir.error.includes("404") || dir.error.toLowerCase().includes("not found")) {
      return [];
    }
    log.warn("enumerate", corpusName, "listDir-failed", { dir: contentDir, error: dir.error });
    return [];
  }
  const out: T[] = [];
  for (const entry of dir.data) {
    if (entry.type !== "file") {
      continue;
    }
    const dotIdx = entry.name.lastIndexOf(".");
    const ext = dotIdx >= 0 ? entry.name.slice(dotIdx) : "";
    if (!allowedExtensions.includes(ext)) {
      continue;
    }
    const file = await deps.getFile(entry.path);
    if (!file.ok) {
      log.warn("enumerate", corpusName, "getFile-failed", {
        path: entry.path,
        error: file.error,
      });
      continue;
    }
    const parsed = matter(file.data.content);
    const fmParse = schema.safeParse(parsed.data);
    if (!fmParse.success) {
      log.warn("enumerate", corpusName, "frontmatter-invalid", {
        path: entry.path,
        issues: fmParse.error.issues.length,
        first: fmParse.error.issues[0]?.path.join(".") ?? "(root)",
      });
      continue;
    }
    const slug = entry.name.slice(0, entry.name.length - ext.length);
    out.push(buildEntry(slug, entry.path, fmParse.data, parsed.content.trim()));
  }
  return out;
}

export async function enumerateWikiWithBodies(deps: EnumerateDeps): Promise<WikiEntry[]> {
  const wiki = CORPORA.wiki;
  return enumerateCorpusWithBodies(
    wiki.contentDir,
    wiki.fileExtensions,
    WikiFrontmatterSchema,
    "wiki",
    deps,
    (slug, path, fm, body) => ({ slug, path, frontmatter: fm, body }),
  );
}

export async function enumerateBlogWithBodies(deps: EnumerateDeps): Promise<BlogEntry[]> {
  const blog = CORPORA.blog;
  return enumerateCorpusWithBodies(
    blog.contentDir,
    blog.fileExtensions,
    BlogFrontmatterSchema,
    "blog",
    deps,
    (slug, path, fm, body) => ({ slug, path, frontmatter: fm, body }),
  );
}
