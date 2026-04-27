/**
 * site-ingest — the single inbound surface for the personal site's
 * automation.
 *
 * Endpoints (all POST, all require `Authorization: Bearer ${API_TOKEN}`):
 *   POST /input      — queue a phone-shortcut input in KV (consumed by
 *                      weekly /now draft).
 *   POST /link       — synchronous: fetch → Anthropic summarize → commit
 *                      a reading entry to the repo.
 *   POST /trigger    — ad-hoc run of the /now draft pipeline. Same logic
 *                      as the cron; used for seeding and manual refresh.
 *   POST /consume    — clear the KV inputs snapshotted for a merged /now
 *                      PR. Called by the now-consume.yml workflow on merge.
 *   POST /synthesize — compile wiki concept articles from reading clusters.
 *   POST /recompile  — rebuild reading entries via Wayback Machine.
 *   POST /lint       — read-only health check on reading + wiki collections.
 *   POST /contribute — file a manually-authored wiki article via PR.
 *   POST /crosslink  — propose anchor-phrase link insertions across wiki
 *                      and writing corpora as a reviewable PR.
 *
 * Cron trigger: runs the /now draft weekly.
 *
 * Rate-limited per endpoint via Cloudflare's Workers Rate Limiting API.
 */

import * as consume from "./consume.ts";
import * as contribute from "./contribute.ts";
import * as crosslink from "./crosslink.ts";
import * as inputs from "./inputs.ts";
import * as link from "./link.ts";
import * as lint from "./lint.ts";
import * as now from "./now.ts";
import * as recompile from "./recompile.ts";
import * as synthesize from "./synthesize.ts";
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

    if (request.method === "POST" && url.pathname === "/synthesize") {
      // Wiki concept compilation. Long-running like /recompile (multiple
      // Anthropic calls per invocation), so it shares the trigger limiter.
      const limited = await env.TRIGGER_LIMITER.limit({ key: ip });
      if (!limited.success) {
        return textResponse("rate limited", 429);
      }
      return synthesize.handle(request, env, ctx);
    }

    if (request.method === "POST" && url.pathname === "/recompile") {
      // Runs longer than other endpoints (enumerates + rewrites many entries);
      // share the trigger limiter to cap accidental repeat invocations.
      const limited = await env.TRIGGER_LIMITER.limit({ key: ip });
      if (!limited.success) {
        return textResponse("rate limited", 429);
      }
      return recompile.handle(request, env);
    }

    if (request.method === "POST" && url.pathname === "/consume") {
      // Low volume (one call per /now merge), so reuse the trigger limiter
      // rather than carving out a new binding.
      const limited = await env.TRIGGER_LIMITER.limit({ key: ip });
      if (!limited.success) {
        return textResponse("rate limited", 429);
      }
      return consume.handle(request, env);
    }

    if (request.method === "POST" && url.pathname === "/lint") {
      // Read-only structural check. Reuse the trigger limiter to gate
      // accidental repeat invocations from automation loops.
      const limited = await env.TRIGGER_LIMITER.limit({ key: ip });
      if (!limited.success) {
        return textResponse("rate limited", 429);
      }
      return lint.handle(request, env);
    }

    if (request.method === "POST" && url.pathname === "/contribute") {
      // File a manually-authored wiki article. Same write surface as
      // /synthesize so it shares the trigger limiter.
      const limited = await env.TRIGGER_LIMITER.limit({ key: ip });
      if (!limited.success) {
        return textResponse("rate limited", 429);
      }
      return contribute.handle(request, env);
    }

    if (request.method === "POST" && url.pathname === "/crosslink") {
      // Cross-link suggestion run against existing content. Long-running
      // (one Anthropic call per piece, capped at MAX_CROSSLINK_CALLS_PER_RUN);
      // shares the trigger limiter with /synthesize and /recompile.
      const limited = await env.TRIGGER_LIMITER.limit({ key: ip });
      if (!limited.success) {
        return textResponse("rate limited", 429);
      }
      return crosslink.handle(request, env, ctx);
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
