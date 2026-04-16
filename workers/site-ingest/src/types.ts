/**
 * Shared types for the site-ingest worker.
 *
 * All external API response shapes are narrowed to the fields we consume;
 * raw GraphQL / REST payloads never leak across module boundaries.
 */

import type { ReadingCategory } from "@shared/schemas/content.ts";

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
}

/** Strict-JSON shape Anthropic returns for link summarization. */
export interface LinkSummary {
  summary: string;
  category: ReadingCategory;
  author?: string;
  source?: string;
}

// ---------- discriminated results ----------

/**
 * Used across external API wrappers so callers can check a single `ok`
 * discriminator instead of try/catching everything. Mirrors the pattern in
 * the Astro project's src/lib/github.ts.
 */
export type Result<T> = { ok: true; data: T } | { ok: false; error: string };
