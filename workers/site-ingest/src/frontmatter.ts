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
import type { Result } from "./types.ts";

/**
 * Extracts the `---\n…\n---` block at the top of a markdown document and
 * parses it as simple `key: value` YAML. Supports the subset the /now
 * prompt is told to emit: double-quoted strings and bare scalars (dates,
 * the literal token `Now`). Multi-line values and nested structures are
 * not supported — they'd also be invalid per the prompt.
 */
export function parseSimpleFrontmatter(markdown: string): Record<string, string> | null {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(markdown);
  if (!match || !match[1]) return null;
  const block = match[1];
  const result: Record<string, string> = {};
  for (const line of block.split("\n")) {
    const kv = /^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
    if (!kv || !kv[1]) continue;
    const key = kv[1];
    let value = (kv[2] ?? "").trim();
    if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }
    result[key] = value;
  }
  return result;
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
