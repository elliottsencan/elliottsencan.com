/**
 * Anthropic Messages API wrapper. Two call shapes used:
 *   - `draftNow` — full /now page draft. Returns raw markdown (frontmatter +
 *     body). Retries once on transient failure.
 *   - `summarizeLink` — strict-JSON link summary. Retries once on parse/HTTP
 *     failure, then falls back to a stub.
 *
 * Raw fetch, no SDK, per the plan.
 */

import type { LinkSummary, Result } from "./types.ts";
import { log, retryOnce } from "./util.ts";

const ENDPOINT = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";
const API_VERSION = "2023-06-01";

interface MessagesResponse {
  content: Array<{ type: string; text?: string }>;
  stop_reason: string | null;
}

interface MessagesRequest {
  model: string;
  max_tokens: number;
  system: string;
  messages: Array<{ role: "user"; content: string }>;
}

async function call(apiKey: string, body: MessagesRequest, op: string): Promise<Result<string>> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": API_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      log.warn("anthropic", op, "non-ok response", { status: res.status });
      const shouldRetry = res.status === 429 || res.status >= 500;
      return {
        ok: false,
        error: shouldRetry ? `retry:${res.status}` : `HTTP ${res.status}`,
      };
    }
    const payload = (await res.json()) as MessagesResponse;
    const firstBlock = payload.content.find((c) => c.type === "text" && c.text);
    if (!firstBlock?.text) {
      return { ok: false, error: "no text content in response" };
    }
    return { ok: true, data: firstBlock.text };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log.error("anthropic", op, "fetch threw", { msg });
    return { ok: false, error: `retry:network` };
  }
}

function shouldRetry(err: unknown): boolean {
  if (err instanceof Error && err.message.startsWith("retry:")) return true;
  return false;
}

// ---------- /now draft ----------

/**
 * Draft the /now page. Returns the raw markdown the worker will commit as
 * `src/content/now/current.md` (frontmatter + body).
 *
 * The system prompt already includes the voice-reference block inline — the
 * caller composed it before this call.
 */
export async function draftNow(args: {
  apiKey: string;
  systemPrompt: string;
  userMessage: string;
}): Promise<Result<string>> {
  const { apiKey, systemPrompt, userMessage } = args;
  try {
    return await retryOnce(async () => {
      const res = await call(
        apiKey,
        {
          model: MODEL,
          max_tokens: 2000,
          system: systemPrompt,
          messages: [{ role: "user", content: userMessage }],
        },
        "draft-now",
      );
      if (!res.ok && res.error.startsWith("retry:")) {
        throw new Error(res.error);
      }
      return res;
    }, shouldRetry);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, error: msg };
  }
}

// ---------- link summary ----------

/**
 * Summarize and categorize a single link. Strips markdown code-fence
 * wrappers if Claude adds them despite instructions. Returns a stub summary
 * on parse failure after retry.
 */
export async function summarizeLink(args: {
  apiKey: string;
  systemPrompt: string;
  userMessage: string;
}): Promise<Result<LinkSummary>> {
  const { apiKey, systemPrompt, userMessage } = args;
  const runOnce = async (): Promise<Result<LinkSummary>> => {
    const res = await call(
      apiKey,
      {
        model: MODEL,
        max_tokens: 400,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      },
      "summarize-link",
    );
    if (!res.ok) return res;
    const cleaned = stripCodeFence(res.data);
    try {
      const parsed = JSON.parse(cleaned) as LinkSummary;
      if (!isValidLinkSummary(parsed)) {
        return { ok: false, error: "malformed summary" };
      }
      return { ok: true, data: parsed };
    } catch {
      return { ok: false, error: "not valid JSON" };
    }
  };

  const first = await runOnce();
  if (first.ok) return first;
  log.warn("anthropic", "summarize-link", "retrying after failure", {
    error: first.error,
  });
  await new Promise((r) => setTimeout(r, 500));
  const second = await runOnce();
  if (second.ok) return second;
  return second;
}

function stripCodeFence(text: string): string {
  const trimmed = text.trim();
  const fenceMatch = /^```(?:json)?\s*([\s\S]*?)\s*```$/i.exec(trimmed);
  return fenceMatch && fenceMatch[1] ? fenceMatch[1].trim() : trimmed;
}

function isValidLinkSummary(x: unknown): x is LinkSummary {
  if (!x || typeof x !== "object") return false;
  const obj = x as Record<string, unknown>;
  if (typeof obj.summary !== "string" || obj.summary.length === 0) return false;
  const allowed = ["tech", "design", "music", "essay", "news", "other"];
  if (typeof obj.category !== "string" || !allowed.includes(obj.category)) return false;
  if (obj.author !== undefined && typeof obj.author !== "string") return false;
  if (obj.source !== undefined && typeof obj.source !== "string") return false;
  return true;
}
