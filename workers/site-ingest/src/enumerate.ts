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

import matter from "gray-matter";
import { CORPORA } from "./crosslink-config.ts";
import type { Result } from "./types.ts";

type DirEntry = { type: "file" | "dir"; name: string; path: string; sha: string };

export type EnumerateDeps = {
  listDir: (path: string, ref?: string) => Promise<Result<DirEntry[]>>;
  getFile: (path: string, ref?: string) => Promise<Result<{ content: string; sha: string }>>;
};

export type WikiEntry = {
  slug: string;
  path: string;
  frontmatter: {
    title: string;
    summary: string;
    sources: string[];
    related_concepts?: string[];
    [k: string]: unknown;
  };
  body: string;
};

export type BlogEntry = {
  slug: string;
  path: string;
  frontmatter: {
    title: string;
    description: string;
    tags?: string[];
    series?: string;
    draft?: boolean;
    [k: string]: unknown;
  };
  body: string;
};

async function enumerateCorpusWithBodies<T>(
  contentDir: string,
  allowedExtensions: ReadonlyArray<string>,
  deps: EnumerateDeps,
  buildEntry: (slug: string, path: string, fm: Record<string, unknown>, body: string) => T,
): Promise<T[]> {
  const dir = await deps.listDir(contentDir);
  if (!dir.ok) {
    if (dir.error.includes("404") || dir.error.toLowerCase().includes("not found")) {
      return [];
    }
    return [];
  }
  const out: T[] = [];
  for (const entry of dir.data) {
    if (entry.type !== "file") continue;
    const dotIdx = entry.name.lastIndexOf(".");
    const ext = dotIdx >= 0 ? entry.name.slice(dotIdx) : "";
    if (!allowedExtensions.includes(ext as ".md")) continue;
    const file = await deps.getFile(entry.path);
    if (!file.ok) continue;
    const parsed = matter(file.data.content);
    const slug = entry.name.slice(0, entry.name.length - ext.length);
    out.push(
      buildEntry(slug, entry.path, parsed.data as Record<string, unknown>, parsed.content.trim()),
    );
  }
  return out;
}

export async function enumerateWikiWithBodies(deps: EnumerateDeps): Promise<WikiEntry[]> {
  const wiki = CORPORA.find((c) => c.name === "wiki");
  if (!wiki) throw new Error("wiki corpus missing from CORPORA config");
  return enumerateCorpusWithBodies(
    wiki.contentDir,
    wiki.fileExtensions,
    deps,
    (slug, path, fm, body) => ({
      slug,
      path,
      frontmatter: fm as WikiEntry["frontmatter"],
      body,
    }),
  );
}

export async function enumerateBlogWithBodies(deps: EnumerateDeps): Promise<BlogEntry[]> {
  const blog = CORPORA.find((c) => c.name === "blog");
  if (!blog) throw new Error("blog corpus missing from CORPORA config");
  return enumerateCorpusWithBodies(
    blog.contentDir,
    blog.fileExtensions,
    deps,
    (slug, path, fm, body) => ({
      slug,
      path,
      frontmatter: fm as BlogEntry["frontmatter"],
      body,
    }),
  );
}
