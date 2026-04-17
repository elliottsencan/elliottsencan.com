/**
 * Reading-log context builder for the /now draft.
 *
 * Scans the most recent two Pacific months of reading entries in the repo,
 * parses their frontmatter, and returns the newest-first slice the prompt
 * is willing to consume. Two months of scope balances recency against the
 * cost of month-boundary misses when the cron fires near the 1st.
 */

import { subMonths } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { parseSimpleFrontmatter } from "./frontmatter.ts";
import { type GitHubClient, getFile, listDir } from "./github.ts";
import type { Env, ReadingContext } from "./types.ts";
import { SITE_TIMEZONE } from "./util.ts";

export async function fetchRecentReading(
  env: Env,
  now: Date,
  gh: GitHubClient,
): Promise<ReadingContext[]> {
  const limit = Number.parseInt(env.READING_CONTEXT_LIMIT, 10) || 25;
  const months = currentAndPreviousMonth(now);
  const entries: ReadingContext[] = [];
  for (const month of months) {
    const dir = `${env.READING_DIR}/${month}`;
    const list = await listDir(dir, "main", gh);
    if (!list.ok) {
      continue;
    }
    for (const item of list.data) {
      if (item.type !== "file" || !item.name.endsWith(".md")) {
        continue;
      }
      const file = await getFile(item.path, "main", gh);
      if (!file.ok) {
        continue;
      }
      const parsed = parseReadingFrontmatter(file.data.content);
      if (parsed) {
        entries.push(parsed);
      }
    }
  }
  entries.sort((a, b) => b.added.localeCompare(a.added));
  return entries.slice(0, limit);
}

export function currentAndPreviousMonth(date: Date): string[] {
  // subMonths operates on a UTC-instant, but the month we care about is the
  // Pacific month. Convert to the Pacific wall-clock first, do the
  // arithmetic, then re-format.
  const pacificNow = toZonedTime(date, SITE_TIMEZONE);
  const prev = subMonths(pacificNow, 1);
  return [
    formatInTimeZone(date, SITE_TIMEZONE, "yyyy-MM"),
    formatInTimeZone(prev, SITE_TIMEZONE, "yyyy-MM"),
  ];
}

export function parseReadingFrontmatter(markdown: string): ReadingContext | null {
  const fields = parseSimpleFrontmatter(markdown);
  if (!fields) {
    return null;
  }
  const { title, url, summary, category, added } = fields;
  if (!title || !url || !summary || !category || !added) {
    return null;
  }
  return { title, url, summary, category, added };
}
