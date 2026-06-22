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
import {
  BlogFrontmatterSchema,
  ReadingFrontmatterSchema,
  WikiFrontmatterSchema,
} from "@shared/schemas/content.ts";
import matter from "gray-matter";
import type { z } from "zod";
import { CORPORA } from "./crosslink-config.ts";
import type { Result } from "./types.ts";
import { log, normalizeUrl, readingSlugFromPath } from "./util.ts";

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

/**
 * Slug → topics[] for every reading entry. The wiki layer uses these to
 * inherit candidate-selection tags from its contributing sources, so that
 * wiki↔wiki proposals match by shared topic rather than just by slug.
 *
 * Filters out entries with `noindex: true`. The crosslink phase consumes
 * this map to score candidate insertions; surfacing a publisher-opt-out
 * entry through the crosslink layer would re-leak it into the wiki, so
 * the filter is applied here at the source.
 */
export async function enumerateReadingTopics(
  readingDir: string,
  deps: EnumerateDeps,
): Promise<Map<string, string[]>> {
  const out = new Map<string, string[]>();
  const months = await deps.listDir(readingDir);
  if (!months.ok) {
    if (months.error.includes("404") || months.error.toLowerCase().includes("not found")) {
      return out;
    }
    log.warn("enumerate", "reading-topics", "listDir-failed", {
      dir: readingDir,
      error: months.error,
    });
    return out;
  }
  let skippedNoindex = 0;
  for (const month of months.data) {
    if (month.type !== "dir") {
      continue;
    }
    const files = await deps.listDir(month.path);
    if (!files.ok) {
      log.warn("enumerate", "reading-topics", "month-listDir-failed", {
        month: month.path,
        error: files.error,
      });
      continue;
    }
    for (const file of files.data) {
      if (file.type !== "file" || !file.name.endsWith(".md")) {
        continue;
      }
      const loaded = await deps.getFile(file.path);
      if (!loaded.ok) {
        log.warn("enumerate", "reading-topics", "getFile-failed", {
          path: file.path,
          error: loaded.error,
        });
        continue;
      }
      const parsed = matter(loaded.data.content);
      const fm = ReadingFrontmatterSchema.safeParse(parsed.data);
      if (!fm.success) {
        continue;
      }
      if (fm.data.noindex === true) {
        skippedNoindex++;
        continue;
      }
      out.set(readingSlugFromPath(file.path), fm.data.topics ?? []);
    }
  }
  if (skippedNoindex > 0) {
    log.info("enumerate", "reading-topics", "noindex entries skipped", {
      count: skippedNoindex,
    });
  }
  return out;
}

/**
 * Slug of the first existing reading entry whose `url` matches `normalizedUrl`
 * (compared via `normalizeUrl`), or `null` if none. Backs /link's pre-commit
 * duplicate guard: the iOS shortcut has no memory of what's already been
 * saved, so accidental re-shares of the same article are common, and we want
 * to reject them before spending an Anthropic call.
 *
 * Walks month dirs and returns on the first hit, so a duplicate short-circuits
 * the scan while a genuinely new URL costs a full corpus walk. Malformed or
 * unparseable entries are skipped — a stored entry only blocks ingest when it
 * parses and its normalized URL matches. A 404 on the reading dir (empty
 * corpus) returns null, never an error.
 *
 * Note: `normalizedUrl` is expected to already be normalized by the caller;
 * stored URLs are normalized here at comparison time.
 */
export async function findReadingEntryByUrl(
  readingDir: string,
  normalizedUrl: string,
  deps: EnumerateDeps,
): Promise<string | null> {
  const months = await deps.listDir(readingDir);
  if (!months.ok) {
    if (months.error.includes("404") || months.error.toLowerCase().includes("not found")) {
      return null;
    }
    log.warn("enumerate", "reading-urls", "listDir-failed", {
      dir: readingDir,
      error: months.error,
    });
    return null;
  }
  for (const month of months.data) {
    if (month.type !== "dir") {
      continue;
    }
    const files = await deps.listDir(month.path);
    if (!files.ok) {
      log.warn("enumerate", "reading-urls", "month-listDir-failed", {
        month: month.path,
        error: files.error,
      });
      continue;
    }
    for (const file of files.data) {
      if (file.type !== "file" || !file.name.endsWith(".md")) {
        continue;
      }
      const loaded = await deps.getFile(file.path);
      if (!loaded.ok) {
        log.warn("enumerate", "reading-urls", "getFile-failed", {
          path: file.path,
          error: loaded.error,
        });
        continue;
      }
      const parsed = matter(loaded.data.content);
      const fm = ReadingFrontmatterSchema.safeParse(parsed.data);
      if (!fm.success) {
        continue;
      }
      if (normalizeUrl(fm.data.url) === normalizedUrl) {
        return readingSlugFromPath(file.path);
      }
    }
  }
  return null;
}
