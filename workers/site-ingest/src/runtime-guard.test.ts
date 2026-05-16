import { describe, expect, it } from "vitest";
import { checkGuard, DEFAULTS, markRun, parseEnvNumber } from "./runtime-guard.ts";
import type { KVStore } from "./types.ts";

function makeKV(): KVStore {
  const store = new Map<string, string>();
  return {
    async put(key, value) {
      store.set(key, value);
    },
    async get(key) {
      return store.get(key) ?? null;
    },
    async delete(key) {
      store.delete(key);
    },
    async list(opts) {
      const prefix = opts?.prefix ?? "";
      return {
        keys: [...store.keys()].filter((k) => k.startsWith(prefix)).map((name) => ({ name })),
        list_complete: true,
      };
    },
  };
}

const T0 = new Date("2026-05-16T12:00:00.000Z");

describe("checkGuard", () => {
  it("admits when no prior run and no daily counter", async () => {
    const kv = makeKV();
    const result = await checkGuard(
      kv,
      "synthesize",
      { cooldown_seconds: 300, daily_call_cap: 300 },
      T0,
    );
    expect(result.ok).toBe(true);
  });

  it("blocks when within cooldown window", async () => {
    const kv = makeKV();
    await markRun(kv, "synthesize", 0, new Date(T0.getTime() - 60_000)); // 60s ago
    const result = await checkGuard(
      kv,
      "synthesize",
      { cooldown_seconds: 300, daily_call_cap: 300 },
      T0,
    );
    expect(result.ok).toBe(false);
    if (result.ok === false) {
      expect(result.reason).toBe("cooldown");
      expect(result.retry_after_seconds).toBe(240); // 300 - 60
    }
  });

  it("admits after cooldown window elapses", async () => {
    const kv = makeKV();
    await markRun(kv, "synthesize", 0, new Date(T0.getTime() - 301_000)); // 301s ago
    const result = await checkGuard(
      kv,
      "synthesize",
      { cooldown_seconds: 300, daily_call_cap: 300 },
      T0,
    );
    expect(result.ok).toBe(true);
  });

  it("blocks when daily call cap reached", async () => {
    const kv = makeKV();
    // Burn the budget: mark a run with 300 calls a long time ago (clear of
    // cooldown), then assert the next check blocks on budget.
    await markRun(kv, "synthesize", 300, new Date(T0.getTime() - 10 * 60_000));
    const result = await checkGuard(
      kv,
      "synthesize",
      { cooldown_seconds: 300, daily_call_cap: 300 },
      T0,
    );
    expect(result.ok).toBe(false);
    if (result.ok === false) {
      expect(result.reason).toBe("budget");
    }
  });

  it("disables cooldown when cooldown_seconds is 0", async () => {
    const kv = makeKV();
    await markRun(kv, "synthesize", 0, new Date(T0.getTime() - 1_000));
    const result = await checkGuard(
      kv,
      "synthesize",
      { cooldown_seconds: 0, daily_call_cap: 300 },
      T0,
    );
    expect(result.ok).toBe(true);
  });

  it("disables budget when daily_call_cap is 0", async () => {
    const kv = makeKV();
    await markRun(kv, "synthesize", 9999, new Date(T0.getTime() - 10 * 60_000));
    const result = await checkGuard(
      kv,
      "synthesize",
      { cooldown_seconds: 300, daily_call_cap: 0 },
      T0,
    );
    expect(result.ok).toBe(true);
  });

  it("isolates counters per endpoint", async () => {
    const kv = makeKV();
    await markRun(kv, "synthesize", 500, new Date(T0.getTime() - 10 * 60_000));
    const synth = await checkGuard(
      kv,
      "synthesize",
      { cooldown_seconds: 300, daily_call_cap: 300 },
      T0,
    );
    const evalEp = await checkGuard(kv, "eval", { cooldown_seconds: 300, daily_call_cap: 500 }, T0);
    expect(synth.ok).toBe(false);
    expect(evalEp.ok).toBe(true);
  });

  it("rolls budget over by date (next day starts fresh)", async () => {
    const kv = makeKV();
    const yesterday = new Date("2026-05-15T12:00:00.000Z");
    await markRun(kv, "synthesize", 500, yesterday); // burns 2026-05-15's cap
    // Cooldown is 10 minutes old (cleared), today is fresh.
    const result = await checkGuard(
      kv,
      "synthesize",
      { cooldown_seconds: 300, daily_call_cap: 300 },
      new Date("2026-05-16T12:00:00.000Z"),
    );
    // markRun also writes cooldown — confirm we're past the 5min window.
    expect(result.ok).toBe(true);
  });
});

describe("markRun", () => {
  it("writes cooldown timestamp and increments daily counter", async () => {
    const kv = makeKV();
    await markRun(kv, "eval", 5, T0);
    const cooldown = await kv.get("runtime:cooldown:eval");
    const budget = await kv.get("runtime:budget:2026-05-16:eval");
    expect(cooldown).toBe(String(T0.getTime()));
    expect(budget).toBe("5");
  });

  it("accumulates across calls in the same day", async () => {
    const kv = makeKV();
    await markRun(kv, "eval", 3, T0);
    await markRun(kv, "eval", 4, new Date(T0.getTime() + 60_000));
    const budget = await kv.get("runtime:budget:2026-05-16:eval");
    expect(budget).toBe("7");
  });

  it("does not write a budget key when anthropicCalls is 0", async () => {
    const kv = makeKV();
    await markRun(kv, "synthesize", 0, T0);
    const budget = await kv.get("runtime:budget:2026-05-16:synthesize");
    expect(budget).toBeNull();
  });
});

describe("parseEnvNumber", () => {
  it("uses default when unset", () => {
    expect(parseEnvNumber(undefined, 42, "X")).toBe(42);
    expect(parseEnvNumber("", 42, "X")).toBe(42);
  });

  it("parses valid numbers", () => {
    expect(parseEnvNumber("300", 0, "X")).toBe(300);
    expect(parseEnvNumber("0", 100, "X")).toBe(0);
  });

  it("falls back to default for invalid input", () => {
    expect(parseEnvNumber("abc", 42, "X")).toBe(42);
    expect(parseEnvNumber("-5", 42, "X")).toBe(42);
  });
});

describe("DEFAULTS", () => {
  it("has sane values", () => {
    expect(DEFAULTS.synthesize.cooldown_seconds).toBeGreaterThan(0);
    expect(DEFAULTS.synthesize.daily_call_cap).toBeGreaterThan(0);
    expect(DEFAULTS.eval.cooldown_seconds).toBeGreaterThan(0);
    expect(DEFAULTS.eval.daily_call_cap).toBeGreaterThan(0);
  });
});
