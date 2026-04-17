/**
 * site-ingest — the single inbound surface for the personal site's
 * automation.
 *
 * Endpoints (all POST, all require `Authorization: Bearer ${API_TOKEN}`):
 *   POST /input    — queue a phone-shortcut input in KV (consumed by weekly
 *                    /now draft).
 *   POST /link     — synchronous: fetch → Anthropic summarize → commit a
 *                    reading entry to the repo.
 *   POST /trigger  — ad-hoc run of the /now draft pipeline. Same logic as
 *                    the cron; used for seeding and manual refresh.
 *
 * Cron trigger: runs the /now draft weekly.
 *
 * Rate-limited per endpoint via Cloudflare's Workers Rate Limiting API.
 */

import * as inputs from "./inputs.ts";
import * as link from "./link.ts";
import * as now from "./now.ts";
import type { Env } from "./types.ts";
import { log, requireBearer, textResponse } from "./util.ts";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Auth: Bearer check comes first so unauthenticated requests don't even
    // consume rate-limit budget. Constant-time compare via util.requireBearer.
    if (!requireBearer(request, env.API_TOKEN)) {
      return textResponse("unauthorized", 401);
    }

    const ip = request.headers.get("CF-Connecting-IP") ?? "0.0.0.0";

    if (request.method === "POST" && url.pathname === "/input") {
      const limited = await env.INPUT_LIMITER.limit({ key: ip });
      if (!limited.success) {
        return textResponse("rate limited", 429);
      }
      return inputs.handle(request, env);
    }

    if (request.method === "POST" && url.pathname === "/link") {
      const limited = await env.LINK_LIMITER.limit({ key: ip });
      if (!limited.success) {
        return textResponse("rate limited", 429);
      }
      return link.handle(request, env, ctx);
    }

    if (request.method === "POST" && url.pathname === "/trigger") {
      const limited = await env.TRIGGER_LIMITER.limit({ key: ip });
      if (!limited.success) {
        return textResponse("rate limited", 429);
      }
      return now.handle(env, "trigger");
    }

    return textResponse("not found", 404);
  },

  async scheduled(event: ScheduledEvent, env: Env, _ctx: ExecutionContext): Promise<void> {
    log.info("cron", "fire", "scheduled run starting", {
      cron: event.cron,
      scheduledTime: new Date(event.scheduledTime).toISOString(),
    });
    // The scheduled handler has no visible response contract, so any failure
    // that doesn't log explicitly is effectively invisible. Two things to
    // cover: (1) exceptions thrown outside now.handle's Result pattern, and
    // (2) `{ ok: false, error }` responses the Result pattern returns as
    // non-200 — those need an explicit error log here.
    try {
      const response = await now.handle(env, "scheduled");
      await logScheduledOutcome(response);
    } catch (err) {
      log.error("cron", "fire", "scheduled run threw", {
        msg: err instanceof Error ? err.message : String(err),
      });
    }
  },
};

async function logScheduledOutcome(response: Response): Promise<void> {
  const body = await response.clone().text();
  let parsed: { ok?: unknown; error?: unknown } | null = null;
  try {
    parsed = JSON.parse(body);
  } catch {
    log.error("cron", "fire", "non-JSON response from now.handle", {
      status: response.status,
    });
    return;
  }
  if (parsed?.ok === true) {
    log.info("cron", "fire", "scheduled run complete", { status: response.status });
    return;
  }
  log.error("cron", "fire", "scheduled run failed", {
    status: response.status,
    error: typeof parsed?.error === "string" ? parsed.error : "<unknown>",
  });
}
