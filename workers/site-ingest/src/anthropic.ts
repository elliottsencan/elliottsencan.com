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
 * Retries: SDK retries 429 and 5xx automatically (default max_retries=2).
 */

import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { ReadingCategorySchema } from "@shared/schemas/content.ts";
import { z } from "zod";
import type { LinkSummary, Result, WikiArticle } from "./types.ts";
import { log } from "./util.ts";

const DEFAULT_MODEL = "claude-sonnet-4-6";

const LinkSummarySchema = z.object({
  title: z.string(),
  summary: z.string(),
  category: ReadingCategorySchema,
  author: z.string().optional(),
  source: z.string().optional(),
  // 3–5 lowercase kebab-case topics. Drives concept clustering for the
  // wiki layer — entries sharing a topic are candidates for a synthesis
  // article. Source-level depth lives at the URL itself (and the IA
  // snapshot for recompiles); cross-source synthesis lives in the wiki.
  topics: z.array(z.string()).min(1).max(5),
});

function client(apiKey: string): Anthropic {
  return new Anthropic({ apiKey });
}

function resolveModel(override: string | undefined): string {
  return override?.trim() || DEFAULT_MODEL;
}

export async function draftNow(args: {
  apiKey: string;
  model?: string;
  systemPrompt: string;
  userMessage: string;
}): Promise<Result<string>> {
  try {
    const response = await client(args.apiKey).messages.create({
      model: resolveModel(args.model),
      // No thinking: this task (voice-match + re-phrase structured data)
      // is not deep reasoning — enabling adaptive thinking made the model
      // burn through the whole max_tokens budget before emitting the text
      // block, returning `stop_reason: max_tokens` with zero output.
      // Deterministic budget, faster response, lower cost.
      max_tokens: 4000,
      system: args.systemPrompt,
      messages: [{ role: "user", content: args.userMessage }],
    });
    for (const block of response.content) {
      if (block.type === "text") {
        return { ok: true, data: block.text };
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
    const response = await client(args.apiKey).messages.parse({
      model: resolveModel(args.model),
      // 600: title + summary + 5 topics, no body.
      max_tokens: 600,
      system: args.systemPrompt,
      messages: [{ role: "user", content: args.userMessage }],
      output_config: { format: zodOutputFormat(LinkSummarySchema) },
    });
    if (!response.parsed_output) {
      log.warn("anthropic", "summarize-link", "parsed_output missing", {
        stopReason: response.stop_reason,
        blocks: response.content.map((b) => b.type).join(","),
      });
      return { ok: false, error: `parsed_output missing (stop_reason: ${response.stop_reason})` };
    }
    return {
      ok: true,
      // Thread the resolved model back to the caller so the committed entry
      // frontmatter records which model produced it (enables targeted
      // recompiles against older-model entries later).
      data: { ...response.parsed_output, model: resolveModel(args.model) },
    };
  } catch (err) {
    return mapError(err, "summarize-link");
  }
}

const WikiArticleSchema = z.object({
  title: z.string().min(1),
  // Mirrors WikiFrontmatterSchema in @shared/schemas/content.ts so model
  // overruns fail at the worker tier instead of at next astro build.
  summary: z.string().min(1).max(240),
  body: z.string().min(1),
  related_concepts: z.array(z.string()).optional(),
});

export async function compileWikiArticle(args: {
  apiKey: string;
  model?: string;
  systemPrompt: string;
  userMessage: string;
}): Promise<Result<WikiArticle>> {
  try {
    const response = await client(args.apiKey).messages.parse({
      model: resolveModel(args.model),
      // Wiki articles are 400–1500 chars markdown; 2500 leaves headroom.
      max_tokens: 2500,
      system: args.systemPrompt,
      messages: [{ role: "user", content: args.userMessage }],
      output_config: { format: zodOutputFormat(WikiArticleSchema) },
    });
    if (!response.parsed_output) {
      log.warn("anthropic", "compile-wiki", "parsed_output missing", {
        stopReason: response.stop_reason,
        blocks: response.content.map((b) => b.type).join(","),
      });
      return { ok: false, error: `parsed_output missing (stop_reason: ${response.stop_reason})` };
    }
    return {
      ok: true,
      data: { ...response.parsed_output, model: resolveModel(args.model) },
    };
  } catch (err) {
    return mapError(err, "compile-wiki");
  }
}

export const CrosslinkProposalSchema = z.object({
  source_slug: z.string(),
  source_passage: z.string(),
  anchor_phrase: z.string(),
  target_corpus: z.enum(["wiki", "blog", "reading"]),
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
}): Promise<Result<CrosslinkBatch & { model: string }>> {
  try {
    const response = await client(args.apiKey).messages.parse({
      model: resolveModel(args.model),
      // Up to ~25 proposals × ~150 tokens each, plus the batch wrapper.
      max_tokens: 3000,
      system: args.systemPrompt,
      messages: [{ role: "user", content: args.userMessage }],
      output_config: { format: zodOutputFormat(CrosslinkBatchSchema) },
    });
    if (!response.parsed_output) {
      log.warn("anthropic", "propose-crosslinks", "parsed_output missing", {
        stopReason: response.stop_reason,
        blocks: response.content.map((b) => b.type).join(","),
      });
      return { ok: false, error: `parsed_output missing (stop_reason: ${response.stop_reason})` };
    }
    return {
      ok: true,
      data: { ...response.parsed_output, model: resolveModel(args.model) },
    };
  } catch (err) {
    return mapError(err, "propose-crosslinks");
  }
}

function mapError(err: unknown, op: string): { ok: false; error: string } {
  if (err instanceof Anthropic.APIError) {
    // SDK already retried 429/5xx twice before reaching here, so by this
    // point the failure is real — log.error, not warn. Include request-id
    // when present so production incidents are debuggable from logs.
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
