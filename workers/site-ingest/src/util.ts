/**
 * Small utilities: logging, crypto-safe string compare, slug/date helpers,
 * YAML sanitization.
 */

import { formatInTimeZone } from "date-fns-tz";
import slugifyLib from "slugify";

// ---------- logging ----------

type LogFields = Record<string, string | number | boolean | null | undefined>;

/**
 * Structured log with a stable `[area:op]` prefix. Field values are
 * stringified inline; callers must never pass raw request bodies, headers,
 * or secrets here — only short identifiers and status codes.
 */
function format(area: string, op: string, message: string, fields?: LogFields): string {
  const base = `[${area}:${op}] ${message}`;
  if (!fields) {
    return base;
  }
  const pairs = Object.entries(fields)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}=${v ?? "null"}`)
    .join(" ");
  return pairs ? `${base} ${pairs}` : base;
}

export const log = {
  info(area: string, op: string, message: string, fields?: LogFields): void {
    console.log(format(area, op, message, fields));
  },
  warn(area: string, op: string, message: string, fields?: LogFields): void {
    console.warn(format(area, op, message, fields));
  },
  error(area: string, op: string, message: string, fields?: LogFields): void {
    console.error(format(area, op, message, fields));
  },
};

// ---------- auth ----------

/**
 * Constant-time string compare. Never use `===` on a Bearer token — it short-
 * circuits on the first mismatched byte and leaks length via timing.
 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let out = 0;
  for (let i = 0; i < a.length; i++) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

/** Extracts and validates a `Authorization: Bearer <token>` header. */
export function requireBearer(request: Request, expected: string): boolean {
  const header = request.headers.get("Authorization");
  if (!header) {
    return false;
  }
  const match = /^Bearer (.+)$/.exec(header);
  if (!match?.[1]) {
    return false;
  }
  return timingSafeEqual(match[1], expected);
}

// ---------- slugs / dates ----------

/**
 * URL-safe slug from arbitrary text. Lowercase, ascii-only, hyphen-separated,
 * truncated to 60 chars. Preserves word boundaries as far as length allows.
 */
export function slugify(text: string, maxLength = 60): string {
  const base = slugifyLib(text, { lower: true, strict: true, locale: "en" });
  if (!base) {
    return "untitled";
  }
  if (base.length <= maxLength) {
    return base;
  }
  return base.slice(0, maxLength).replace(/-[^-]*$/, "") || base.slice(0, maxLength);
}

/**
 * Date formatters for content identifiers (branch names, PR titles,
 * archive filenames, reading-log paths). All use Elliott's local timezone
 * (San Diego / Pacific) so dates stamped on `/now` and `/reading` match
 * his mental model of "today." DST is handled automatically by the IANA
 * zone data; PST ↔ PDT switches without any manual calendar math.
 *
 * Machine-readable timestamps (`createdAt`, `added` ISO strings) stay in
 * UTC — those come from `new Date().toISOString()` directly, not these
 * helpers.
 */
export const SITE_TIMEZONE = "America/Los_Angeles";

/** YYYY-MM (Pacific) */
export function monthKey(date: Date): string {
  return formatInTimeZone(date, SITE_TIMEZONE, "yyyy-MM");
}

/** YYYY-MM-DD (Pacific) */
export function dateKey(date: Date): string {
  return formatInTimeZone(date, SITE_TIMEZONE, "yyyy-MM-dd");
}

/**
 * YYYY-MM-DDTHHMMSS filename suffix (Pacific). Included in reading-log
 * filenames so two shortcut pings with identical titles on the same day
 * don't collide on disk.
 */
export function fileTimestamp(date: Date): string {
  return formatInTimeZone(date, SITE_TIMEZONE, "yyyy-MM-dd'T'HHmmss");
}

/**
 * Reading slug in Astro's content-collection id format:
 * `<month>/<filename-without-ext>`, lowercased. Used to bridge the worker's
 * disk-path view with the public slug surfaces (`/reading.json`,
 * `/reading/<slug>/`, wiki frontmatter `sources[]`). Single source of
 * truth — synthesize and lint both read it.
 */
export function readingSlugFromPath(path: string): string {
  const idx = path.indexOf("/reading/");
  const tail = idx >= 0 ? path.slice(idx + "/reading/".length) : path;
  return tail.replace(/\.md$/, "").toLowerCase();
}

// ---------- response helpers ----------

/**
 * JSON response. Always `Cache-Control: no-store` — these endpoints are
 * mutating (/input, /link, /trigger) or serve per-request state, so they
 * must never be cached at Cloudflare's edge.
 */
export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

/** Plain-text response, same no-store contract as `jsonResponse`. */
export function textResponse(message: string, status = 200): Response {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
