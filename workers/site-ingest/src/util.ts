/**
 * Small utilities: logging, crypto-safe string compare, slug/date helpers,
 * YAML sanitization. Deliberately dependency-free.
 */

// ---------- logging ----------

type LogFields = Record<string, string | number | boolean | null | undefined>;

/**
 * Structured log with a stable `[area:op]` prefix. Field values are
 * stringified inline; callers must never pass raw request bodies, headers,
 * or secrets here — only short identifiers and status codes.
 */
function format(area: string, op: string, message: string, fields?: LogFields): string {
  const base = `[${area}:${op}] ${message}`;
  if (!fields) return base;
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
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

/** Extracts and validates a `Authorization: Bearer <token>` header. */
export function requireBearer(request: Request, expected: string): boolean {
  const header = request.headers.get("Authorization");
  if (!header) return false;
  const match = /^Bearer (.+)$/.exec(header);
  if (!match || !match[1]) return false;
  return timingSafeEqual(match[1], expected);
}

// ---------- slugs / dates ----------

/**
 * URL-safe slug from arbitrary text. Lowercase, ascii-only, hyphen-separated,
 * truncated to 60 chars. Preserves word boundaries as far as length allows.
 */
export function slugify(text: string, maxLength = 60): string {
  const base = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  if (base.length <= maxLength) return base || "untitled";
  return base.slice(0, maxLength).replace(/-[^-]*$/, "") || base.slice(0, maxLength);
}

/** YYYY-MM */
export function monthKey(date: Date): string {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

/** YYYY-MM-DD */
export function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * YYYY-MM-DDTHHMMSS style filename suffix (UTC). Included in reading-log
 * filenames so two shortcut pings with identical titles on the same day
 * don't collide on disk.
 */
export function fileTimestamp(date: Date): string {
  const pad = (n: number): string => String(n).padStart(2, "0");
  return (
    `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}`
  );
}

// ---------- YAML frontmatter ----------

/**
 * Escape a string for use as a YAML double-quoted scalar. Strips control
 * chars, escapes `\` and `"`, replaces newlines with spaces. Caller must
 * wrap the result in double quotes when emitting frontmatter.
 *
 * Prevents injection of unintended keys via titles like
 * `"test\narchived: true"` that would otherwise break the YAML parse.
 */
export function yamlEscape(value: string, maxLength = 500): string {
  const cleaned = value
    // biome-ignore lint/suspicious/noControlCharactersInRegex: intentional — strip control chars before YAML emit
    .replace(/[\x00-\x08\x0B-\x1F\x7F]/g, "")
    .replace(/[\r\n]+/g, " ")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .trim();
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) : cleaned;
}

// ---------- fetch helpers ----------

/**
 * Retry a fetch-returning operation once with a short backoff. The second
 * attempt runs after 500ms; a third retry is not attempted.
 *
 * Used for Anthropic calls (brief outages and 429s are common enough that
 * one retry materially improves reliability without introducing latency
 * cliffs).
 */
export async function retryOnce<T>(
  fn: () => Promise<T>,
  shouldRetry: (err: unknown) => boolean,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (!shouldRetry(err)) throw err;
    await new Promise((r) => setTimeout(r, 500));
    return fn();
  }
}
