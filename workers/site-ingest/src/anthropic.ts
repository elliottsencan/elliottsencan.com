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
import type { LinkSummary, Result } from "./types.ts";
import { log } from "./util.ts";

const DEFAULT_MODEL = "claude-sonnet-4-6";

const LinkSummarySchema = z.object({
  title: z.string(),
  summary: z.string(),
  category: ReadingCategorySchema,
  author: z.string().optional(),
  source: z.string().optional(),
  // 3–5 lowercase kebab-case topics for the metadata graph.
  topics: z.array(z.string()).min(1).max(5),
  // Longer markdown synthesis written into the entry body. Functions as
  // the "wiki article" layer in the Karpathy sense — the 240-char summary
  // is the human dateline, `detail` is the agent-facing article.
  detail: z.string(),
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
      // Larger budget than the original 400: structured output now includes
      // a `detail` body (longer markdown synthesis) plus 3–5 topic slugs.
      // 1500 gives Sonnet room for a two-paragraph detail without clipping.
      max_tokens: 1500,
      system: args.systemPrompt,
      messages: [{ role: "user", content: args.userMessage }],
      output_config: { format: zodOutputFormat(LinkSummarySchema) },
    });
    if (!response.parsed_output) {
      return { ok: false, error: "parsed_output missing" };
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

function mapError(err: unknown, op: string): { ok: false; error: string } {
  if (err instanceof Anthropic.APIError) {
    log.warn("anthropic", op, "api error", { status: err.status });
    return { ok: false, error: `anthropic ${err.status}: ${err.message}` };
  }
  const msg = err instanceof Error ? err.message : String(err);
  log.error("anthropic", op, "threw", { msg });
  return { ok: false, error: msg };
}
