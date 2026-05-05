/**
 * Shared types for the site-ingest worker.
 *
 * All external API response shapes are narrowed to the fields we consume;
 * raw GraphQL / REST payloads never leak across module boundaries.
 */

// `LinkSummary` and `WikiArticle` are re-exported from ./anthropic.ts (where
// the Zod schemas live) so consumers keep importing them from a single place.
// Type-only re-export = no runtime cycle even though anthropic.ts imports
// `Result` from this file.
export type { LinkSummary, WikiArticle } from "./anthropic.ts";

// ---------- runtime environment ----------

export interface Env {
  // secrets (wrangler secret put)
  LINEAR_API_KEY: string;
  ANTHROPIC_API_KEY: string;
  GITHUB_TOKEN: string;
  API_TOKEN: string;

  // vars (wrangler.toml [vars])
  GITHUB_REPO: string;
  GITHUB_BRANCH_PREFIX: string;
  NOW_CONTENT_PATH: string;
  NOW_ARCHIVE_DIR: string;
  READING_DIR: string;
  VOICE_REFERENCE_PATH: string;
  NOW_NOTES_PATH: string;
  READING_CONTEXT_LIMIT: string;
  /** Optional override for the Anthropic model ID. Empty/unset = default. */
  ANTHROPIC_MODEL?: string;
  /** Optional override for /synthesize per-run topic cap. Defaults to 100. */
  MAX_CONCEPTS_PER_RUN?: string;
  /** Optional override for /recompile per-run entry cap. Defaults to 100. */
  MAX_ENTRIES_PER_RUN?: string;

  // KV
  NOW_INPUTS: KVNamespace;

  // rate limiters (Workers Rate Limiting API — first-class bindings under
  // wrangler 4's [[ratelimits]] config block)
  TRIGGER_LIMITER: RateLimit;
  INPUT_LIMITER: RateLimit;
  LINK_LIMITER: RateLimit;
}

// ---------- /now drafting ----------

/**
 * Compact summary of one active Linear project, built from the GraphQL
 * ActiveProjects query. Fed into the Anthropic prompt verbatim (as JSON).
 */
export interface ProjectSummary {
  id: string;
  name: string;
  description: string | null;
  stateName: string;
  milestone: {
    name: string;
    targetDate: string | null;
  } | null;
  progress: {
    completed: number;
    total: number;
  };
  /** Max issue updatedAt across the project, as an ISO string. `null` if zero issues. */
  lastActivityDate: string | null;
  /**
   * Invariant: derived from `lastActivityDate` by `linear.deriveStale` —
   * true when `lastActivityDate` is null or older than STALE_AFTER_DAYS.
   * The field is kept on the wire so the Anthropic prompt can distinguish
   * stale projects from active ones without recomputing.
   */
  stale: boolean;
}

/** An entry saved to KV by POST /input. */
export type NowInputType = "reading" | "listening" | "thinking" | "building" | "activity";

export interface NowInput {
  type: NowInputType;
  content: string;
  url?: string;
  createdAt: string;
}

/**
 * A NowInput paired with its KV key, so callers can record exactly which
 * keys fed a /now run and clear just those on PR merge.
 */
export interface KeyedNowInput {
  key: string;
  input: NowInput;
}

/**
 * Minimal KV surface the worker actually uses. Cloudflare's full
 * `KVNamespace` interface satisfies this structurally (it has all four
 * methods with compatible signatures), so production code binds the
 * real type here without conversion. Narrowing to this interface keeps
 * test fakes honest — no `as unknown as KVNamespace` casts needed just
 * to paper over methods we never call.
 */
export interface KVStore {
  put(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;
  list(opts?: { prefix?: string; limit?: number }): Promise<{
    keys: Array<{ name: string }>;
    list_complete: boolean;
  }>;
}

/**
 * Outcome of a consume call. Distinct states so callers (notably the
 * /consume HTTP handler and the Actions workflow) can surface corrupt
 * or partially-failed consumes as real errors instead of silent 200s.
 *
 * - `cleared`: snapshot existed, all referenced keys deleted, snapshot
 *    deleted. Normal path.
 * - `no-snapshot`: nothing to do (idempotent second call, or PR merged
 *    without a snapshot ever being written).
 * - `corrupt`: snapshot existed but parsed/validated wrong. Snapshot is
 *    kept in place so a human can inspect it.
 * - `partial-failure`: some referenced-key deletes failed. Snapshot is
 *    kept so a retry (dispatching the workflow manually) can finish.
 */
export type ConsumeResult =
  | { status: "cleared"; cleared: number }
  | { status: "no-snapshot" }
  | { status: "corrupt" }
  | { status: "partial-failure"; cleared: number; failed: number };

/** Reading-log context passed to the /now drafting prompt. */
export interface ReadingContext {
  title: string;
  url: string;
  summary: string;
  category: string;
  added: string;
}

// ---------- link pipeline ----------

/** Validated body for POST /link. */
export interface LinkRequest {
  url: string;
  title?: string;
  excerpt?: string;
  /** Default true (production). Set false to skip the existing-topics fetch — used by the rigor-pass A/B run measuring topic-stability drift. */
  topic_priors: boolean;
}

// LinkSummary and WikiArticle are re-exported at the top of this file; the
// concrete shapes are derived via z.infer in ./anthropic.ts so the schemas
// and the TS types can never drift.

// ---------- discriminated results ----------

/**
 * Used across external API wrappers so callers can check a single `ok`
 * discriminator instead of try/catching everything. Mirrors the pattern in
 * the Astro project's src/lib/github.ts.
 */
export type Result<T> = { ok: true; data: T } | { ok: false; error: string };
