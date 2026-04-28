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
