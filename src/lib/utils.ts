import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

/**
 * Bucket key for grouping reading entries by month. Reads the worker-stamped
 * Pacific date from the slug prefix (e.g. `"2026-04/foo"` → `"2026-04"`) so
 * site grouping matches the on-disk folder layout regardless of the build
 * container's time zone — `entry.data.added` is a UTC `Date` that would
 * shift across the month boundary on Cloudflare Pages.
 */
export function monthKey(entryId: string): string {
  const slash = entryId.indexOf("/");
  return slash === -1 ? entryId : entryId.slice(0, slash);
}

// Duplicated from workers/site-ingest/src/util.ts: the worker is excluded
// from the site tsconfig, so the two toolchains can't share code directly.
const SITE_TIMEZONE = "America/Los_Angeles";

export function siteDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/**
 * ISO 8601 with the site's UTC offset (e.g. `2026-04-30T23:12:06.300-07:00`).
 * Same instant as `date.toISOString()` but the date portion matches the
 * worker-stamped Pacific filename slug — no UTC drift in agent surfaces.
 */
export function isoWithSiteOffset(date: Date): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: SITE_TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      hour12: false,
      timeZoneName: "longOffset",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  // `longOffset` returns "GMT-07:00" / "GMT+00:00" — strip the "GMT" prefix
  // for ISO 8601 form. Fail loud if the engine returns an unexpected shape
  // rather than emit a malformed timestamp into agent surfaces.
  const tz: string = parts.timeZoneName ?? "";
  const match = /^GMT([+-]\d{2}:\d{2})$/.exec(tz);
  if (!match) {
    throw new Error(`isoWithSiteOffset: unexpected timeZoneName ${JSON.stringify(tz)}`);
  }
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}.${parts.fractionalSecond}${match[1]}`;
}
