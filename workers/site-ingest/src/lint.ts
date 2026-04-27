/**
 * POST /lint — read-only health check on the reading + wiki collections.
 *
 * Returns a JSON report covering orphan citations, sub-threshold concepts,
 * hallucinated related_concepts, and untagged reading entries. No mutations,
 * no PRs. Cheap to run because every check is structural — no Anthropic
 * call, no IA fetch.
 */

import matter from "gray-matter";
import { MIN_WIKI_SOURCES } from "@shared/schemas/content.ts";
import {
  createGitHubClient,
  type GitHubClient,
  getFile,
  listDir,
} from "./github.ts";
import type { Env, Result } from "./types.ts";
import { jsonResponse, log, readingSlugFromPath } from "./util.ts";

const WIKI_DIR = "src/content/wiki";

export interface ReadingMeta {
  slug: string;
  topics: string[];
  compiled_with: string | null;
}

export interface WikiMeta {
  slug: string;
  sources: string[];
  related_concepts: string[];
  compiled_with: string | null;
}

export interface LintReport {
  counts: {
    reading_entries: number;
    wiki_articles: number;
    total_issues: number;
  };
  orphan_citations: Array<{ wiki_slug: string; missing_source: string }>;
  sub_threshold_concepts: Array<{
    wiki_slug: string;
    valid_sources: number;
    required: number;
  }>;
  hallucinated_related: Array<{ wiki_slug: string; missing_related: string }>;
  untagged_readings: string[];
}

// Exported for unit tests. Pure: takes already-parsed reading + wiki
// metadata and returns the structural report.
export function computeLintReport(reading: ReadingMeta[], wiki: WikiMeta[]): LintReport {
  const readingSlugs = new Set(reading.map((r) => r.slug));
  const wikiSlugs = new Set(wiki.map((w) => w.slug));

  const orphan_citations: LintReport["orphan_citations"] = [];
  const sub_threshold_concepts: LintReport["sub_threshold_concepts"] = [];
  const hallucinated_related: LintReport["hallucinated_related"] = [];
  for (const w of wiki) {
    let valid = 0;
    for (const source of w.sources) {
      if (readingSlugs.has(source)) {
        valid++;
      } else {
        orphan_citations.push({ wiki_slug: w.slug, missing_source: source });
      }
    }
    if (valid < MIN_WIKI_SOURCES) {
      sub_threshold_concepts.push({
        wiki_slug: w.slug,
        valid_sources: valid,
        required: MIN_WIKI_SOURCES,
      });
    }
    for (const r of w.related_concepts) {
      if (!wikiSlugs.has(r)) {
        hallucinated_related.push({ wiki_slug: w.slug, missing_related: r });
      }
    }
  }

  const untagged_readings = reading.filter((r) => r.topics.length === 0).map((r) => r.slug);

  const total_issues =
    orphan_citations.length +
    sub_threshold_concepts.length +
    hallucinated_related.length +
    untagged_readings.length;

  return {
    counts: {
      reading_entries: reading.length,
      wiki_articles: wiki.length,
      total_issues,
    },
    orphan_citations,
    sub_threshold_concepts,
    hallucinated_related,
    untagged_readings,
  };
}

export async function handle(_request: Request, env: Env): Promise<Response> {
  const gh = createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO);

  const [readingResult, wikiResult] = await Promise.all([
    enumerateReading(env, gh),
    enumerateWiki(gh),
  ]);
  if (!readingResult.ok) {
    return jsonResponse({ ok: false, error: readingResult.error }, 500);
  }
  if (!wikiResult.ok) {
    return jsonResponse({ ok: false, error: wikiResult.error }, 500);
  }
  const report = computeLintReport(readingResult.data, wikiResult.data);

  log.info("lint", "report", "complete", {
    readings: report.counts.reading_entries,
    wiki: report.counts.wiki_articles,
    issues: report.counts.total_issues,
  });

  return jsonResponse({
    ok: true,
    generated_at: new Date().toISOString(),
    counts: report.counts,
    checks: {
      orphan_citations: {
        description: "Wiki articles citing reading slugs that no longer exist.",
        count: report.orphan_citations.length,
        items: report.orphan_citations,
      },
      sub_threshold_concepts: {
        description: `Wiki articles with fewer than ${MIN_WIKI_SOURCES} valid sources after orphan filtering.`,
        count: report.sub_threshold_concepts.length,
        items: report.sub_threshold_concepts,
      },
      hallucinated_related: {
        description:
          "Wiki articles referencing related_concepts slugs that don't exist as wiki articles.",
        count: report.hallucinated_related.length,
        items: report.hallucinated_related,
      },
      untagged_readings: {
        description:
          "Reading entries with empty topics[]; cannot contribute to wiki clustering.",
        count: report.untagged_readings.length,
        items: report.untagged_readings,
      },
    },
  });
}

async function enumerateReading(env: Env, gh: GitHubClient): Promise<Result<ReadingMeta[]>> {
  const months = await listDir(env.READING_DIR, "main", gh);
  if (!months.ok) {
    return { ok: false, error: `list reading: ${months.error}` };
  }
  const all: ReadingMeta[] = [];
  for (const month of months.data) {
    if (month.type !== "dir") { continue; }
    const files = await listDir(month.path, "main", gh);
    if (!files.ok) {
      log.warn("lint", "enum-reading", "month list failed", {
        month: month.path,
        error: files.error,
      });
      continue;
    }
    for (const file of files.data) {
      if (file.type !== "file" || !file.name.endsWith(".md")) { continue; }
      const loaded = await getFile(file.path, "main", gh);
      if (!loaded.ok) {
        log.warn("lint", "enum-reading", "file load failed", {
          path: file.path,
          error: loaded.error,
        });
        continue;
      }
      try {
        const parsed = matter(loaded.data.content);
        const data = parsed.data as Record<string, unknown>;
        all.push({
          slug: readingSlugFromPath(file.path),
          topics: Array.isArray(data.topics)
            ? (data.topics as unknown[]).filter(isString)
            : [],
          compiled_with:
            typeof data.compiled_with === "string" ? data.compiled_with : null,
        });
      } catch (err) {
        log.warn("lint", "enum-reading", "frontmatter parse failed", {
          path: file.path,
          msg: err instanceof Error ? err.message : "unknown",
        });
      }
    }
  }
  return { ok: true, data: all };
}

async function enumerateWiki(gh: GitHubClient): Promise<Result<WikiMeta[]>> {
  const dir = await listDir(WIKI_DIR, "main", gh);
  if (!dir.ok) {
    if (dir.error.includes("404") || dir.error.toLowerCase().includes("not found")) {
      return { ok: true, data: [] };
    }
    return { ok: false, error: `list wiki: ${dir.error}` };
  }
  const all: WikiMeta[] = [];
  for (const file of dir.data) {
    if (file.type !== "file" || !file.name.endsWith(".md")) { continue; }
    const loaded = await getFile(file.path, "main", gh);
    if (!loaded.ok) {
      log.warn("lint", "enum-wiki", "file load failed", {
        path: file.path,
        error: loaded.error,
      });
      continue;
    }
    try {
      const parsed = matter(loaded.data.content);
      const data = parsed.data as Record<string, unknown>;
      all.push({
        slug: file.name.replace(/\.md$/, ""),
        sources: Array.isArray(data.sources)
          ? (data.sources as unknown[]).filter(isString)
          : [],
        related_concepts: Array.isArray(data.related_concepts)
          ? (data.related_concepts as unknown[]).filter(isString)
          : [],
        compiled_with:
          typeof data.compiled_with === "string" ? data.compiled_with : null,
      });
    } catch (err) {
      log.warn("lint", "enum-wiki", "frontmatter parse failed", {
        path: file.path,
        msg: err instanceof Error ? err.message : "unknown",
      });
    }
  }
  return { ok: true, data: all };
}

function isString(v: unknown): v is string {
  return typeof v === "string";
}
