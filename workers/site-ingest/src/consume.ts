/**
 * POST /consume — clear the KV inputs snapshotted for a merged /now PR.
 *
 * Triggered by the now-consume.yml GitHub Actions workflow whenever a
 * `now-update/*` branch merges to main. Deletes the referenced input
 * keys + the snapshot itself. Idempotent at the KV layer.
 *
 * Auth: already checked upstream in index.ts (Bearer + rate limit).
 */

import { z } from "zod";
import { consumeSnapshot } from "./kv.ts";
import type { Env, Result } from "./types.ts";
import { jsonResponse, log } from "./util.ts";

const MAX_BODY_BYTES = 1_000;

// Blast-radius gate. The /now worker always emits branches of the shape
// `now-update/YYYY-MM-DD`, so the regex matches that shape exactly —
// a stolen bearer token can't delete an arbitrary KV key, only today's
// (or some other YYYY-MM-DD) snapshot. If the branch format ever changes,
// this regex must change with it.
const BRANCH_REGEX = /^now-update\/\d{4}-\d{2}-\d{2}$/;

const ConsumeSchema = z.object({
  branch: z.string().regex(BRANCH_REGEX, {
    message: "branch must match now-update/YYYY-MM-DD",
  }),
});

export type ValidatedConsume = z.infer<typeof ConsumeSchema>;

export function validate(input: unknown): Result<ValidatedConsume> {
  const r = ConsumeSchema.safeParse(input);
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
    log.warn("consume", "validate", "rejected request", { reason: validation.error });
    return jsonResponse({ ok: false, error: validation.error }, 400);
  }

  const result = await consumeSnapshot(env.NOW_INPUTS, validation.data.branch);
  // Corrupt / partial-failure deserve red Actions runs, not silent 200s.
  // The snapshot is kept in both cases so operators can retry or inspect.
  if (result.status === "corrupt") {
    return jsonResponse({ ok: false, status: "corrupt" }, 500);
  }
  if (result.status === "partial-failure") {
    return jsonResponse(
      { ok: false, status: "partial-failure", cleared: result.cleared, failed: result.failed },
      500,
    );
  }
  // cleared / no-snapshot are both legitimate 200 paths but reported
  // with a distinct `status` so the workflow log reads clean.
  if (result.status === "cleared") {
    return jsonResponse({ ok: true, status: "cleared", cleared: result.cleared }, 200);
  }
  return jsonResponse({ ok: true, status: "no-snapshot" }, 200);
}
