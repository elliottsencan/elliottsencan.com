/**
 * Per-endpoint cooldown + daily Anthropic-call budget for the auto-trigger
 * workflows. Two checks, one KV namespace (NOW_INPUTS), prefixed keys so
 * they can't collide with phone-input or now-snapshot keys.
 *
 * Why this exists: the GitHub Actions in `.github/workflows/auto-*.yml` POST
 * to /synthesize and /eval after every reading/wiki commit. The endpoints'
 * built-in skip keys already make calls cheap on no-ops, but two safety nets
 * are still worth having:
 *   1. **Cooldown.** Prevents two distinct workflow events (e.g. a reading
 *      push and the weekly sweep) firing within seconds of each other.
 *   2. **Daily call budget.** Hard cap on Anthropic spend per day per
 *      endpoint, in case a skip-key bug or corpus reshuffle causes every
 *      topic to recompile.
 *
 * Both checks return 429 with a structured body so the workflow can treat it
 * as success-noop instead of a hard failure.
 */
import type { KVStore } from "./types.ts";
import { dateKey, log } from "./util.ts";

export type GuardEndpoint = "synthesize" | "eval";

export type GuardConfig = {
  /** Reject if last run was less than this many seconds ago. 0 disables. */
  cooldown_seconds: number;
  /** Reject if today's Anthropic-call counter is at or above this. 0 disables. */
  daily_call_cap: number;
};

export type GuardCheck =
  | { ok: true }
  | {
      ok: false;
      status: 429;
      reason: "cooldown" | "budget";
      details: string;
      retry_after_seconds?: number;
    };

const COOLDOWN_KEY_PREFIX = "runtime:cooldown:";
const BUDGET_KEY_PREFIX = "runtime:budget:";

function cooldownKey(endpoint: GuardEndpoint): string {
  return `${COOLDOWN_KEY_PREFIX}${endpoint}`;
}

function budgetKey(endpoint: GuardEndpoint, now: Date): string {
  return `${BUDGET_KEY_PREFIX}${dateKey(now)}:${endpoint}`;
}

/**
 * Read both counters in parallel and decide whether to admit the call.
 * Read-only — does not mutate KV. Call `markRun` after the work completes
 * to record the start timestamp and increment the day's call counter.
 */
export async function checkGuard(
  kv: KVStore,
  endpoint: GuardEndpoint,
  config: GuardConfig,
  now: Date = new Date(),
): Promise<GuardCheck> {
  const [rawLast, rawUsed] = await Promise.all([
    config.cooldown_seconds > 0 ? kv.get(cooldownKey(endpoint)) : Promise.resolve(null),
    config.daily_call_cap > 0 ? kv.get(budgetKey(endpoint, now)) : Promise.resolve(null),
  ]);

  if (config.cooldown_seconds > 0 && rawLast) {
    const lastMs = Number(rawLast);
    if (Number.isFinite(lastMs)) {
      const elapsedSec = (now.getTime() - lastMs) / 1000;
      if (elapsedSec >= 0 && elapsedSec < config.cooldown_seconds) {
        const retry = Math.ceil(config.cooldown_seconds - elapsedSec);
        return {
          ok: false,
          status: 429,
          reason: "cooldown",
          retry_after_seconds: retry,
          details: `last run ${Math.floor(elapsedSec)}s ago; cooldown ${config.cooldown_seconds}s`,
        };
      }
    }
  }

  if (config.daily_call_cap > 0 && rawUsed) {
    const usedN = Number(rawUsed);
    if (Number.isFinite(usedN) && usedN >= config.daily_call_cap) {
      return {
        ok: false,
        status: 429,
        reason: "budget",
        details: `daily call cap ${config.daily_call_cap} hit (used=${usedN})`,
      };
    }
  }

  return { ok: true };
}

/**
 * Record that `endpoint` ran at `now`, and add `anthropicCalls` to today's
 * counter. Safe to fire-and-forget via `ctx.waitUntil` — the cooldown
 * timestamp only needs to be readable by the next request, not by the
 * current one.
 */
export async function markRun(
  kv: KVStore,
  endpoint: GuardEndpoint,
  anthropicCalls: number,
  now: Date = new Date(),
): Promise<void> {
  try {
    await kv.put(cooldownKey(endpoint), String(now.getTime()));
    if (anthropicCalls > 0) {
      const key = budgetKey(endpoint, now);
      const raw = await kv.get(key);
      const prev = raw ? Number(raw) : 0;
      const next = (Number.isFinite(prev) ? prev : 0) + anthropicCalls;
      await kv.put(key, String(next));
    }
  } catch (err) {
    // Marking is best-effort; failure should not bubble up and turn a
    // successful run into an HTTP error. Log so it's visible in tail.
    log.warn("runtime-guard", "mark", "failed", {
      endpoint,
      msg: err instanceof Error ? err.message : String(err),
    });
  }
}

/**
 * Parse a positive integer from an env-var string. Empty/unset returns the
 * default. Invalid returns the default and logs once (so a typo in
 * wrangler.toml is surfaced rather than silently using the default).
 */
export function parseEnvNumber(
  raw: string | undefined,
  defaultValue: number,
  label: string,
): number {
  if (!raw || raw.trim() === "") {
    return defaultValue;
  }
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) {
    log.warn("runtime-guard", "config", "invalid env value, using default", {
      label,
      raw,
      defaultValue,
    });
    return defaultValue;
  }
  return n;
}

export const DEFAULTS = {
  synthesize: { cooldown_seconds: 300, daily_call_cap: 300 },
  eval: { cooldown_seconds: 300, daily_call_cap: 500 },
} as const satisfies Record<GuardEndpoint, GuardConfig>;
