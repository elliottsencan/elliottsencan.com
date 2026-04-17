/**
 * Worker-side validation of drafted markdown before it's committed.
 *
 * The Anthropic /now draft step is prompted (see prompts.ts) to emit a
 * specific frontmatter shape. The Astro content collection enforces that
 * shape at build-time — a hallucination that drops `standfirst` or exceeds
 * its 180-char cap fails `astro build` in CI, not the worker run.
 *
 * Validating here closes that gap: a bad draft bounces before it reaches
 * the repo, so `current.md` on `main` is always buildable.
 */

import { NowFrontmatterSchema } from "@shared/schemas/content.ts";
import matter from "gray-matter";
import type { Result } from "./types.ts";

/**
 * Parse the frontmatter block at the top of a markdown document into a
 * flat `Record<string, string>`. Returns null when no frontmatter block is
 * present or the YAML fails to parse. Non-string values (dates, numbers)
 * are stringified so downstream zod schemas with `.coerce.*` can consume
 * the same shape the old regex parser produced.
 */
export function parseSimpleFrontmatter(markdown: string): Record<string, string> | null {
  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(markdown);
  } catch {
    return null;
  }
  // YAML permits scalar / array / null at the document root; gray-matter
  // passes those through in `data` unchanged. Only a plain object maps to
  // the key:value shape the rest of the worker expects.
  //
  // Note: we can't check `parsed.matter` because gray-matter defines that
  // as non-enumerable, and its internal cache returns `Object.assign({}, …)`
  // which drops non-enumerable props on repeat calls with the same input.
  // An empty `data` object covers the "no frontmatter" case the same way.
  if (!isPlainObject(parsed.data) || Object.keys(parsed.data).length === 0) {
    return null;
  }
  return stringifyFields(parsed.data);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringifyFields(data: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(data)) {
    if (v instanceof Date) {
      // Preserve full ISO when the source had a time component; strip to
      // yyyy-mm-dd when it didn't. js-yaml parses `2026-04-16` (midnight
      // UTC) and `2026-04-16T09:30:00Z` identically as Date, so distinguish
      // by the time-of-day. This matches the round-trip behaviour the old
      // regex parser gave us.
      out[k] =
        v.getUTCHours() === 0 && v.getUTCMinutes() === 0 && v.getUTCSeconds() === 0
          ? v.toISOString().slice(0, 10)
          : v.toISOString();
    } else if (v == null) {
    } else {
      out[k] = String(v);
    }
  }
  return out;
}

/**
 * Validates a drafted /now markdown document against the shared
 * `NowFrontmatterSchema`. Returns ok on success. On failure, the error
 * string is safe to include in logs (no raw user content).
 */
export function validateNowDraft(drafted: string): Result<void> {
  const frontmatter = parseSimpleFrontmatter(drafted);
  if (!frontmatter) {
    return { ok: false, error: "missing or malformed frontmatter block" };
  }
  if (!/\n---\n[\s\S]+\S/.test(drafted)) {
    return { ok: false, error: "frontmatter has no body" };
  }
  const parsed = NowFrontmatterSchema.safeParse(frontmatter);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const path = issue?.path?.join(".") ?? "(root)";
    const message = issue?.message ?? "unknown";
    return { ok: false, error: `${path}: ${message}` };
  }
  return { ok: true, data: undefined };
}
