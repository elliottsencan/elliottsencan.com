import { describe, expect, it } from "vitest";
import { handle, validate } from "./consume.ts";
import { consumedKey, inputKey, writeConsumedSnapshot, writeInput } from "./kv.ts";
import type { Env, KVStore } from "./types.ts";

// Minimal in-memory KVStore fake — same shape as kv.test.ts. Duplicated
// rather than shared to keep test files independent.
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

// Env's NOW_INPUTS field is still typed as KVNamespace for production,
// but the only path we exercise here is the /consume handler which only
// touches the narrow KVStore surface. One cast, one reason.
function makeEnv(kv: KVStore): Env {
  return { NOW_INPUTS: kv } as unknown as Env;
}

function postRequest(body: string): Request {
  return new Request("https://example.com/consume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

describe("consume.validate", () => {
  it("accepts a well-formed now-update branch", () => {
    const r = validate({ branch: "now-update/2026-04-17" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.branch).toBe("now-update/2026-04-17");
    }
  });

  it("rejects missing branch", () => {
    expect(validate({})).toMatchObject({ ok: false });
  });

  it("rejects non-string branch", () => {
    expect(validate({ branch: 123 })).toMatchObject({ ok: false });
    expect(validate({ branch: null })).toMatchObject({ ok: false });
  });

  it("rejects non-object bodies", () => {
    expect(validate(null)).toMatchObject({ ok: false });
    expect(validate("a string")).toMatchObject({ ok: false });
    expect(validate(42)).toMatchObject({ ok: false });
  });

  it("rejects branches that don't start with now-update/", () => {
    expect(validate({ branch: "main" })).toMatchObject({ ok: false });
    expect(validate({ branch: "feature/foo" })).toMatchObject({ ok: false });
    expect(validate({ branch: "NOW-UPDATE/2026-04-17" })).toMatchObject({ ok: false });
  });

  it("rejects bare prefix with nothing after it", () => {
    expect(validate({ branch: "now-update/" })).toMatchObject({ ok: false });
  });

  it("rejects branches that don't match the YYYY-MM-DD suffix", () => {
    // The strict regex intentionally narrows valid inputs to the exact
    // format the worker emits. Non-date suffixes, nested slashes, trailing
    // whitespace, control chars, and path traversal are all rejected by
    // the same rule without needing separate guards.
    expect(validate({ branch: "now-update/feature_x.1" })).toMatchObject({ ok: false });
    expect(validate({ branch: "now-update/sub/section/123" })).toMatchObject({ ok: false });
    expect(validate({ branch: "now-update/../main" })).toMatchObject({ ok: false });
    expect(validate({ branch: "now-update/2026-04-17\n" })).toMatchObject({ ok: false });
    expect(validate({ branch: "now-update/foo bar" })).toMatchObject({ ok: false });
    expect(validate({ branch: "now-update/2026-4-17" })).toMatchObject({ ok: false });
    expect(validate({ branch: `now-update/${"a".repeat(200)}` })).toMatchObject({ ok: false });
  });
});

describe("consume.handle", () => {
  it("rejects oversized bodies with 413", async () => {
    const env = makeEnv(makeKV());
    const huge = "x".repeat(2_000);
    const res = await handle(postRequest(huge), env);
    expect(res.status).toBe(413);
    await expect(res.json()).resolves.toMatchObject({ ok: false, error: "body too large" });
  });

  it("rejects invalid JSON with 400", async () => {
    const env = makeEnv(makeKV());
    const res = await handle(postRequest("{not valid"), env);
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toMatchObject({ ok: false, error: "invalid JSON" });
  });

  it("rejects validation failure with 400", async () => {
    const env = makeEnv(makeKV());
    // Long enough to pass min-length, but missing the prefix.
    const res = await handle(postRequest(JSON.stringify({ branch: "feature/some-branch" })), env);
    expect(res.status).toBe(400);
    const body = (await res.json()) as { ok: boolean; error: string };
    expect(body.ok).toBe(false);
    expect(body.error).toContain("now-update/");
  });

  it("returns 200 with status=cleared on the happy path", async () => {
    const kv = makeKV();
    await writeInput(kv, { type: "building", content: "a" });
    await writeInput(kv, { type: "thinking", content: "b" });
    const list = await kv.list({ prefix: "input:" });
    const keys = list.keys.map((k) => k.name);
    await writeConsumedSnapshot(kv, "now-update/2026-04-17", keys);

    const env = makeEnv(kv);
    const res = await handle(postRequest(JSON.stringify({ branch: "now-update/2026-04-17" })), env);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      ok: true,
      status: "cleared",
      cleared: 2,
    });
  });

  it("returns 200 with status=no-snapshot when nothing to clear", async () => {
    const env = makeEnv(makeKV());
    const res = await handle(postRequest(JSON.stringify({ branch: "now-update/2026-04-17" })), env);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      ok: true,
      status: "no-snapshot",
    });
  });

  it("returns 500 with status=corrupt on malformed snapshot", async () => {
    const kv = makeKV();
    await kv.put(consumedKey("now-update/2026-04-17"), "{not valid");
    const env = makeEnv(kv);
    const res = await handle(postRequest(JSON.stringify({ branch: "now-update/2026-04-17" })), env);
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      ok: false,
      status: "corrupt",
    });
    // Snapshot is kept for inspection.
    expect(await kv.get(consumedKey("now-update/2026-04-17"))).toBe("{not valid");
  });

  it("returns 500 with status=partial-failure when some deletes throw", async () => {
    const store = new Map<string, string>();
    const failKey = inputKey("2026-04-17T10:00:00.000Z", "bad");
    const okKey = inputKey("2026-04-17T10:00:01.000Z", "ok");
    store.set(okKey, JSON.stringify({ type: "building", content: "ok", createdAt: "x" }));
    store.set(failKey, JSON.stringify({ type: "thinking", content: "bad", createdAt: "x" }));

    const kv: KVStore = {
      async put(key, value) {
        store.set(key, value);
      },
      async get(key) {
        return store.get(key) ?? null;
      },
      async delete(key) {
        if (key === failKey) {
          throw new Error("simulated KV delete failure");
        }
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

    await writeConsumedSnapshot(kv, "now-update/2026-04-17", [okKey, failKey]);

    const env = makeEnv(kv);
    const res = await handle(postRequest(JSON.stringify({ branch: "now-update/2026-04-17" })), env);
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      ok: false,
      status: "partial-failure",
      cleared: 1,
      failed: 1,
    });
    // Snapshot retained for retry.
    expect(await kv.get(consumedKey("now-update/2026-04-17"))).not.toBeNull();
  });
});
