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
import { z } from "zod";
import type { LinkSummary, Result } from "./types.ts";
import { log } from "./util.ts";

const MODEL = "claude-sonnet-4-6";

const LinkSummarySchema = z.object({
  summary: z.string(),
  category: z.enum(["tech", "design", "music", "essay", "news", "other"]),
  author: z.string().optional(),
  source: z.string().optional(),
});

function client(apiKey: string): Anthropic {
  return new Anthropic({ apiKey });
}

export async function draftNow(args: {
  apiKey: string;
  systemPrompt: string;
  userMessage: string;
}): Promise<Result<string>> {
  try {
    const response = await client(args.apiKey).messages.create({
      model: MODEL,
      max_tokens: 2000,
      thinking: { type: "adaptive" },
      system: args.systemPrompt,
      messages: [{ role: "user", content: args.userMessage }],
    });
    for (const block of response.content) {
      if (block.type === "text") return { ok: true, data: block.text };
    }
    return { ok: false, error: "no text content in response" };
  } catch (err) {
    return mapError(err, "draft-now");
  }
}

export async function summarizeLink(args: {
  apiKey: string;
  systemPrompt: string;
  userMessage: string;
}): Promise<Result<LinkSummary>> {
  try {
    const response = await client(args.apiKey).messages.parse({
      model: MODEL,
      max_tokens: 400,
      system: args.systemPrompt,
      messages: [{ role: "user", content: args.userMessage }],
      output_config: { format: zodOutputFormat(LinkSummarySchema) },
    });
    if (!response.parsed_output) {
      return { ok: false, error: "parsed_output missing" };
    }
    return { ok: true, data: response.parsed_output };
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
