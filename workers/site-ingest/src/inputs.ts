/**
 * POST /input — append a phone-shortcut input to the NOW_INPUTS KV
 * namespace. Consumed by the weekly /now draft step.
 *
 * Auth: already checked upstream in index.ts (Bearer + rate limit).
 */

import { z } from "zod";
import { writeInput } from "./kv.ts";
import type { Env, Result } from "./types.ts";
import { jsonResponse, log } from "./util.ts";

// Caps sized for the iOS Shortcut's typical payload: content is a single
// typed line (500 chars is a comfortable tweet-sized limit), URLs stay
// under browser path caps, and the 10 KB body cap absorbs both plus JSON
// overhead with headroom. Raise these only if the Shortcut flow changes.
const MAX_CONTENT_LENGTH = 500;
const MAX_URL_LENGTH = 2000;
const MAX_BODY_BYTES = 10_000;

const NowInputSchema = z.object({
  type: z.enum(["reading", "listening", "thinking", "building", "activity"]),
  content: z.string().trim().min(1).max(MAX_CONTENT_LENGTH),
  // Empty string / null → undefined so the field is truly optional from
  // the Shortcut's perspective (it always sends the `url` key, sometimes empty).
  url: z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z
      .string()
      .max(MAX_URL_LENGTH)
      .refine(
        (u) => {
          try {
            const p = new URL(u).protocol;
            return p === "http:" || p === "https:";
          } catch {
            return false;
          }
        },
        { message: "url must be a valid http or https URL" },
      )
      .optional(),
  ),
});

export type ValidatedInput = z.infer<typeof NowInputSchema>;

export function validate(input: unknown): Result<ValidatedInput> {
  const r = NowInputSchema.safeParse(input);
  if (r.success) {
    return { ok: true, data: r.data };
  }
  const issue = r.error.issues[0];
  const path = issue?.path?.join(".") ?? "body";
  const message = issue?.message ?? "invalid";
  return { ok: false, error: `${path}: ${message}` };
}

export async function handle(request: Request, env: Env): Promise<Response> {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, error: "body too large" }, 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return jsonResponse({ ok: false, error: "invalid JSON" }, 400);
  }

  const validation = validate(parsed);
  if (!validation.ok) {
    log.warn("inputs", "validate", "rejected request", { reason: validation.error });
    return jsonResponse({ ok: false, error: validation.error }, 400);
  }

  await writeInput(env.NOW_INPUTS, validation.data);
  return jsonResponse({ ok: true }, 200);
}
