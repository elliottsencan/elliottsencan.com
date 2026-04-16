/**
 * POST /input — append a phone-shortcut input to the NOW_INPUTS KV
 * namespace. Consumed by the weekly /now draft step.
 *
 * Auth: already checked upstream in index.ts (Bearer + rate limit).
 */

import { writeInput } from "./kv.ts";
import type { Env, NowInputType, Result } from "./types.ts";
import { log } from "./util.ts";

// Caps sized for the iOS Shortcut's typical payload: content is a single
// typed line (500 chars is a comfortable tweet-sized limit), URLs stay
// under browser path caps, and the 10 KB body cap absorbs both plus JSON
// overhead with headroom. Raise these only if the Shortcut flow changes.
const MAX_CONTENT_LENGTH = 500;
const MAX_URL_LENGTH = 2000;
const MAX_BODY_BYTES = 10_000;

const VALID_TYPES: readonly NowInputType[] = [
  "reading",
  "listening",
  "thinking",
  "building",
  "activity",
] as const;

export async function handle(request: Request, env: Env): Promise<Response> {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "body too large" }, 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "invalid JSON" }, 400);
  }

  const validation = validate(parsed);
  if (!validation.ok) {
    log.warn("inputs", "validate", "rejected request", { reason: validation.error });
    return json({ ok: false, error: validation.error }, 400);
  }

  await writeInput(env.NOW_INPUTS, validation.data);
  return json({ ok: true }, 200);
}

type ValidatedInput = { type: NowInputType; content: string; url?: string };

function validate(input: unknown): Result<ValidatedInput> {
  if (!input || typeof input !== "object") return { ok: false, error: "body must be an object" };
  const obj = input as Record<string, unknown>;

  if (typeof obj.type !== "string" || !VALID_TYPES.includes(obj.type as NowInputType)) {
    return { ok: false, error: "type must be one of reading|listening|thinking|building|activity" };
  }

  if (typeof obj.content !== "string") return { ok: false, error: "content required (string)" };
  const content = obj.content.trim();
  if (content.length === 0) return { ok: false, error: "content must be non-empty" };
  if (content.length > MAX_CONTENT_LENGTH) {
    return { ok: false, error: `content exceeds ${MAX_CONTENT_LENGTH} chars` };
  }

  let url: string | undefined;
  if (obj.url !== undefined && obj.url !== null && obj.url !== "") {
    if (typeof obj.url !== "string") return { ok: false, error: "url must be a string" };
    if (obj.url.length > MAX_URL_LENGTH) {
      return { ok: false, error: `url exceeds ${MAX_URL_LENGTH} chars` };
    }
    try {
      const parsedUrl = new URL(obj.url);
      if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        return { ok: false, error: "url must be http or https" };
      }
      url = obj.url;
    } catch {
      return { ok: false, error: "url is not a valid URL" };
    }
  }

  return {
    ok: true,
    data: {
      type: obj.type as NowInputType,
      content,
      ...(url ? { url } : {}),
    },
  };
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
