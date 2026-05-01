/**
 * Anthropic SDK wrapper. Two call shapes used:
 *   - `draftNow` — full /now page draft. Adaptive thinking on; returns raw
 *     markdown (frontmatter + body).
 *   - `summarizeLink` — structured-output link summary. Zod-validated JSON,
 *     no thinking, no hand-rolled parse.
 *
 * Prompt caching: deliberately skipped. /now runs weekly and /link fires on
 * share-sheet pings; neither fits inside the 5-minute ephemeral TTL (or the
 * 1-hour premium TTL at 2× write cost), so caching never pays off.
 *
 * Retries: SDK auto-retry is disabled (`maxRetries: 0`); withRetries() owns
 * backoff so each attempt's status is visible in production logs. Persistent
 * 429 storms surface as N warn lines + one error rather than a silent stall.
 */

import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { ReadingCategorySchema } from "@shared/schemas/content.ts";
import { z } from "zod";
import { type CostRecord, computeCost, type Usage } from "./cost.ts";
import type { CorpusName } from "./crosslink-config.ts";
import type { Result } from "./types.ts";
import { log } from "./util.ts";

// Shape on the Anthropic SDK response. Cache fields are absent when caching
// isn't requested (which is the worker's default — see header comment above).
type RawUsage = {
  input_tokens?: number;
  output_tokens?: number;
  cache_creation_input_tokens?: number | null;
  cache_read_input_tokens?: number | null;
};

function readUsage(response: { usage?: RawUsage | null }): Usage {
  const u = response.usage ?? {};
  return {
    input_tokens: u.input_tokens ?? 0,
    output_tokens: u.output_tokens ?? 0,
    cache_creation_input_tokens: u.cache_creation_input_tokens ?? 0,
    cache_read_input_tokens: u.cache_read_input_tokens ?? 0,
  };
}

const DEFAULT_MODEL = "claude-sonnet-4-6";
const MAX_ANTHROPIC_RETRIES = 5;
const RETRY_BASE_DELAY_MS = 500;
// Cap on `retry-after` so a long Anthropic-suggested wait can't blow past
// the Cloudflare Worker subrequest budget on a single attempt.
const RETRY_AFTER_MAX_MS = 15_000;

export const LinkSummarySchema = z.object({
  title: z.string(),
  summary: z.string(),
  category: ReadingCategorySchema,
  author: z.string().optional(),
  source: z.string().optional(),
  // 3–5 lowercase kebab-case topics. Drives concept clustering for the
  // wiki layer — entries sharing a topic are candidates for a synthesis
  // article. Source-level depth lives at the URL itself (and the IA
  // snapshot for recompiles); cross-source synthesis lives in the wiki.
  topics: z
    .array(z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/))
    .min(1)
    .max(5),
});

// `model` and `cost` are appended by the wrapper (resolveModel-derived /
// usage-derived) — schemas describe what Anthropic returns, not the
// post-processed shape.
export type LinkSummary = z.infer<typeof LinkSummarySchema> & {
  model: string;
  cost: CostRecord;
};

function client(apiKey: string): Anthropic {
  // maxRetries: 0 — withRetries() below owns retry/backoff so every attempt
  // is logged. Default SDK behavior is silent retry × 2.
  return new Anthropic({ apiKey, maxRetries: 0 });
}

function resolveModel(override: string | undefined): string {
  return override?.trim() || DEFAULT_MODEL;
}

function isRetryable(err: unknown): boolean {
  if (!(err instanceof Anthropic.APIError)) {
    return false;
  }
  return err.status === 429 || (err.status >= 500 && err.status < 600);
}

function retryDelayMs(err: unknown, attempt: number): number {
  // For 429s, prefer Anthropic's `retry-after` header — it tells us exactly
  // when the rate-limit window reopens. Caller's exponential backoff is the
  // fallback for 5xx and for 429s that don't surface a usable header.
  if (err instanceof Anthropic.APIError && err.status === 429) {
    const headers = (err as { headers?: Record<string, string | undefined> }).headers ?? {};
    const retryAfter = headers["retry-after"] ?? headers["x-ratelimit-reset"];
    if (retryAfter) {
      const seconds = Number(retryAfter);
      if (Number.isFinite(seconds) && seconds > 0) {
        return Math.min(seconds * 1000, RETRY_AFTER_MAX_MS);
      }
    }
  }
  // Exponential backoff with jitter: 500ms, 1000ms, 2000ms, 4000ms, ...
  return RETRY_BASE_DELAY_MS * 2 ** (attempt - 1) + Math.floor(Math.random() * 250);
}

async function withRetries<T>(op: string, fn: () => Promise<T>): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_ANTHROPIC_RETRIES; attempt++) {
    try {
      const result = await fn();
      log.info("anthropic", "request", "attempt", { op, attempt, status: "ok" });
      return result;
    } catch (err) {
      lastErr = err;
      const status = err instanceof Anthropic.APIError ? err.status : "throw";
      if (attempt < MAX_ANTHROPIC_RETRIES && isRetryable(err)) {
        const delay = retryDelayMs(err, attempt);
        log.warn("anthropic", "request", "retry", { op, attempt, status, delay_ms: delay });
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      log.error("anthropic", "request", "exhausted", { op, attempt, status });
      throw err;
    }
  }
  // Loop body always returns or throws; this is unreachable.
  throw lastErr;
}

export type DraftNowResult = { markdown: string; model: string; cost: CostRecord };

export async function draftNow(args: {
  apiKey: string;
  model?: string;
  systemPrompt: string;
  userMessage: string;
}): Promise<Result<DraftNowResult>> {
  try {
    const model = resolveModel(args.model);
    const response = await withRetries("draft-now", () =>
      client(args.apiKey).messages.create({
        model,
        // No thinking: this task (voice-match + re-phrase structured data)
        // is not deep reasoning — enabling adaptive thinking made the model
        // burn through the whole max_tokens budget before emitting the text
        // block, returning `stop_reason: max_tokens` with zero output.
        // Deterministic budget, faster response, lower cost.
        max_tokens: 4000,
        system: args.systemPrompt,
        messages: [{ role: "user", content: args.userMessage }],
      }),
    );
    const cost = computeCost(readUsage(response), model);
    for (const block of response.content) {
      if (block.type === "text") {
        return { ok: true, data: { markdown: block.text, model, cost } };
      }
    }
    log.warn("anthropic", "draft-now", "no text block in response", {
      stopReason: response.stop_reason,
      blocks: response.content.map((b) => b.type).join(","),
    });
    return {
      ok: false,
      error: `no text content (stop_reason: ${response.stop_reason})`,
    };
  } catch (err) {
    return mapError(err, "draft-now");
  }
}

export async function summarizeLink(args: {
  apiKey: string;
  model?: string;
  systemPrompt: string;
  userMessage: string;
}): Promise<Result<LinkSummary>> {
  try {
    const model = resolveModel(args.model);
    const response = await withRetries("summarize-link", () =>
      client(args.apiKey).messages.parse({
        model,
        // 600: title + summary + 5 topics, no body.
        max_tokens: 600,
        system: args.systemPrompt,
        messages: [{ role: "user", content: args.userMessage }],
        output_config: { format: zodOutputFormat(LinkSummarySchema) },
      }),
    );
    if (!response.parsed_output) {
      log.warn("anthropic", "summarize-link", "parsed_output missing", {
        stopReason: response.stop_reason,
        blocks: response.content.map((b) => b.type).join(","),
      });
      return { ok: false, error: `parsed_output missing (stop_reason: ${response.stop_reason})` };
    }
    const cost = computeCost(readUsage(response), model);
    return {
      ok: true,
      // Thread the resolved model back to the caller so the committed entry
      // frontmatter records which model produced it (enables targeted
      // recompiles against older-model entries later).
      data: { ...response.parsed_output, model, cost },
    };
  } catch (err) {
    return mapError(err, "summarize-link");
  }
}

export const WikiArticleSchema = z.object({
  title: z.string().min(1),
  // Mirrors WikiFrontmatterSchema in @shared/schemas/content.ts so model
  // overruns fail at the worker tier instead of at next astro build.
  summary: z.string().min(1).max(240),
  body: z.string().min(1),
});

export type WikiArticle = z.infer<typeof WikiArticleSchema> & {
  model: string;
  cost: CostRecord;
};

export async function compileWikiArticle(args: {
  apiKey: string;
  model?: string;
  systemPrompt: string;
  userMessage: string;
}): Promise<Result<WikiArticle>> {
  try {
    const model = resolveModel(args.model);
    const response = await withRetries("compile-wiki", () =>
      client(args.apiKey).messages.parse({
        model,
        // Wiki articles are 400–1500 chars markdown; 2500 leaves headroom.
        max_tokens: 2500,
        system: args.systemPrompt,
        messages: [{ role: "user", content: args.userMessage }],
        output_config: { format: zodOutputFormat(WikiArticleSchema) },
      }),
    );
    if (!response.parsed_output) {
      log.warn("anthropic", "compile-wiki", "parsed_output missing", {
        stopReason: response.stop_reason,
        blocks: response.content.map((b) => b.type).join(","),
      });
      return { ok: false, error: `parsed_output missing (stop_reason: ${response.stop_reason})` };
    }
    const cost = computeCost(readUsage(response), model);
    return {
      ok: true,
      data: { ...response.parsed_output, model, cost },
    };
  } catch (err) {
    return mapError(err, "compile-wiki");
  }
}

// `satisfies` so a future CorpusName change forces an update here.
const CORPUS_NAMES = ["wiki", "blog", "reading"] as const satisfies readonly CorpusName[];

export const CrosslinkProposalSchema = z.object({
  source_slug: z.string(),
  source_passage: z.string(),
  anchor_phrase: z.string(),
  target_corpus: z.enum(CORPUS_NAMES),
  target_slug: z.string(),
  target_url: z.string(),
  rationale: z.string(),
  confidence: z.enum(["high", "medium", "low"]),
});

const CrosslinkBatchSchema = z.object({
  proposals: z.array(CrosslinkProposalSchema),
});

export type CrosslinkBatch = z.infer<typeof CrosslinkBatchSchema>;

export async function proposeCrosslinks(args: {
  apiKey: string;
  model?: string;
  systemPrompt: string;
  userMessage: string;
}): Promise<Result<CrosslinkBatch & { model: string; cost: CostRecord }>> {
  try {
    const model = resolveModel(args.model);
    const response = await withRetries("propose-crosslinks", () =>
      client(args.apiKey).messages.parse({
        model,
        // Up to ~25 proposals × ~150 tokens each, plus the batch wrapper.
        max_tokens: 3000,
        system: args.systemPrompt,
        messages: [{ role: "user", content: args.userMessage }],
        output_config: { format: zodOutputFormat(CrosslinkBatchSchema) },
      }),
    );
    if (!response.parsed_output) {
      log.warn("anthropic", "propose-crosslinks", "parsed_output missing", {
        stopReason: response.stop_reason,
        blocks: response.content.map((b) => b.type).join(","),
      });
      return { ok: false, error: `parsed_output missing (stop_reason: ${response.stop_reason})` };
    }
    const cost = computeCost(readUsage(response), model);
    return {
      ok: true,
      data: { ...response.parsed_output, model, cost },
    };
  } catch (err) {
    return mapError(err, "propose-crosslinks");
  }
}

function mapError(err: unknown, op: string): { ok: false; error: string } {
  if (err instanceof Anthropic.APIError) {
    // withRetries already exhausted MAX_ANTHROPIC_RETRIES on 429/5xx before
    // reaching here, so by this point the failure is real — log.error, not
    // warn. Include request-id when present so production incidents are
    // debuggable from logs.
    const headers = (err as { headers?: Record<string, string | undefined> }).headers ?? {};
    const requestId = headers["request-id"] ?? headers["x-request-id"];
    log.error("anthropic", op, "api error", {
      status: err.status,
      message: err.message,
      ...(requestId ? { requestId } : {}),
    });
    return { ok: false, error: `anthropic ${err.status}: ${err.message}` };
  }
  const msg = err instanceof Error ? err.message : String(err);
  log.error("anthropic", op, "threw", { msg });
  return { ok: false, error: msg };
}
