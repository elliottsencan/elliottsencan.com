/**
 * Archive step of the /now pipeline.
 *
 * When a new /now draft goes out, the previous `current.md` is written to
 * `src/content/now-archive/<today>.md` so the archive index keeps a record
 * of every weekly snapshot. The rewrite converts the draft's `now`
 * frontmatter (title/description/updated/standfirst) into the archive
 * collection's shape (title/description/archivedDate).
 */

import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import matter from "gray-matter";
import { type GitHubClient, getFile, putFile } from "./github.ts";
import type { Env } from "./types.ts";
import { log, SITE_TIMEZONE } from "./util.ts";

export async function maybeWriteArchive(args: {
  env: Env;
  branch: string;
  today: string;
  currentContent: string;
  gh: GitHubClient;
}): Promise<void> {
  const archivePath = `${args.env.NOW_ARCHIVE_DIR}/${args.today}.md`;
  // Skip if the archive file already exists on this branch (prior partial run).
  const existing = await getFile(archivePath, args.branch, args.gh);
  if (existing.ok) {
    log.info("now", "archive", "archive entry already exists — skipping", {
      path: archivePath,
    });
    return;
  }
  const archiveContent = convertToArchiveFrontmatter(args.currentContent, args.today);
  if (!archiveContent) {
    log.warn("now", "archive", "could not rewrite frontmatter — skipping archive");
    return;
  }
  const put = await putFile({
    path: archivePath,
    branch: args.branch,
    content: archiveContent,
    message: `now: archive snapshot ${args.today}`,
    gh: args.gh,
  });
  if (!put.ok) {
    log.warn("now", "archive", "failed to write archive (non-fatal)", {
      error: put.error,
    });
  }
}

/**
 * Rewrite `src/content/now/current.md` frontmatter into the shape the
 * `nowArchive` collection expects: `title`, `description`, `archivedDate`.
 * Preserves the body verbatim. Returns null if the frontmatter block isn't
 * recognizable (malformed current.md).
 *
 * The archive title is always constructed from scratch — the draft's
 * `title` field is prompt-locked to the literal `"Now"` (see prompts.ts),
 * so reusing it would produce archive entries indistinguishable on the
 * archive index. Dates live in the title, not the frontmatter `updated`.
 */
export function convertToArchiveFrontmatter(source: string, today: string): string | null {
  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(source);
  } catch {
    return null;
  }
  // gray-matter defines `.matter` as non-enumerable, and its cache returns
  // `Object.assign({}, cached)` which drops non-enumerable properties on
  // repeat calls. Use `data` emptiness as the "no frontmatter" signal.
  if (!parsed.data || typeof parsed.data !== "object" || Object.keys(parsed.data).length === 0) {
    return null;
  }
  const description =
    typeof parsed.data.description === "string"
      ? parsed.data.description
      : "What I was working on.";
  return matter.stringify(parsed.content, {
    title: `Now — ${formatDateLong(today)}`,
    description,
    archivedDate: today,
  });
}

function formatDateLong(iso: string): string {
  // `iso` is a YYYY-MM-DD stamp produced by dateKey (already Pacific), and
  // we want to display those exact Y/M/D values. Anchor at Pacific noon
  // (noon sidesteps any DST-midnight ambiguity) and format in-zone.
  const utcInstant = fromZonedTime(`${iso}T12:00:00`, SITE_TIMEZONE);
  return formatInTimeZone(utcInstant, SITE_TIMEZONE, "MMMM d, yyyy");
}
