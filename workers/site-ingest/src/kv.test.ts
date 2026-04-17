import { describe, expect, it } from "vitest";
import {
  consumedKey,
  consumeSnapshot,
  getInputs,
  inputKey,
  writeConsumedSnapshot,
  writeInput,
} from "./kv.ts";
import type { KVStore, NowInput } from "./types.ts";

// Minimal in-memory KVStore fake. Implements exactly the surface kv.ts
// declares — no cast needed because KVStore is the narrow interface.
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
        keys: [...store.keys()]
          .filter((k) => k.startsWith(prefix))
          .map((name) => ({ name })),
        list_complete: true,
      };
    },
  };
}

const TEST_BRANCH = "now-update/2026-04-17";

// Seed an input directly by key to sidestep timestamp-based ordering races.
async function seedInput(kv: KVStore, key: string, input: NowInput): Promise<void> {
  await kv.put(key, JSON.stringify(input));
}

describe("getInputs", () => {
  it("returns { key, input } entries newest-first", async () => {
    // Seed two inputs with known keys so sort order is deterministic.
    const kv = makeKV();
    const earlier = inputKey("2026-04-17T10:00:00.000Z", "aaa111");
    const later = inputKey("2026-04-17T11:00:00.000Z", "bbb222");
    await seedInput(kv, earlier, {
      type: "building",
      content: "first",
      createdAt: "2026-04-17T10:00:00.000Z",
    });
    await seedInput(kv, later, {
      type: "thinking",
      content: "second",
      createdAt: "2026-04-17T11:00:00.000Z",
    });

    const entries = await getInputs(kv);
    expect(entries.map((e) => e.key)).toEqual([later, earlier]);
    expect(entries.map((e) => e.input.content)).toEqual(["second", "first"]);
  });

  it("returns empty array when no inputs queued", async () => {
    const kv = makeKV();
    expect(await getInputs(kv)).toEqual([]);
  });

  it("skips malformed JSON entries without dropping valid ones", async () => {
    const kv = makeKV();
    await writeInput(kv, { type: "building", content: "good" });
    await kv.put(inputKey("2026-04-17T12:00:00.000Z", "corrupt"), "{not valid json");

    const entries = await getInputs(kv);
    expect(entries).toHaveLength(1);
    expect(entries[0]?.input.content).toBe("good");
  });

  it("skips entries whose shape doesn't match StoredNowInputSchema", async () => {
    const kv = makeKV();
    await writeInput(kv, { type: "building", content: "good" });
    // Valid JSON, but wrong shape — missing `createdAt`, non-enum `type`.
    await kv.put(
      inputKey("2026-04-17T12:00:00.000Z", "shape1"),
      JSON.stringify({ type: "unknown", content: "x" }),
    );
    await kv.put(
      inputKey("2026-04-17T12:00:01.000Z", "shape2"),
      JSON.stringify({ type: "building" }),
    );

    const entries = await getInputs(kv);
    expect(entries).toHaveLength(1);
    expect(entries[0]?.input.content).toBe("good");
  });
});

describe("writeConsumedSnapshot", () => {
  it("stores the key list keyed by branch under consumed:<branch>", async () => {
    const kv = makeKV();
    const keys = [
      inputKey("2026-04-17T10:00:00.000Z", "abc123"),
      inputKey("2026-04-17T11:00:00.000Z", "def456"),
    ];
    await writeConsumedSnapshot(kv, TEST_BRANCH, keys);

    const raw = await kv.get(consumedKey(TEST_BRANCH));
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw as string);
    expect(parsed.keys).toEqual(keys);
    expect(parsed.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("writes under the documented key prefix", async () => {
    // Guards the wire format so a prefix change is a loud failure, not a silent one.
    const kv = makeKV();
    await writeConsumedSnapshot(kv, TEST_BRANCH, []);
    expect(await kv.get(`consumed:${TEST_BRANCH}`)).not.toBeNull();
  });
});

describe("consumeSnapshot", () => {
  it("deletes every referenced input key and the snapshot itself", async () => {
    const kv = makeKV();
    const k1 = inputKey("2026-04-17T10:00:00.000Z", "aaa");
    const k2 = inputKey("2026-04-17T10:00:01.000Z", "bbb");
    await seedInput(kv, k1, { type: "building", content: "a", createdAt: "x" });
    await seedInput(kv, k2, { type: "thinking", content: "b", createdAt: "x" });
    await writeConsumedSnapshot(kv, TEST_BRANCH, [k1, k2]);

    const result = await consumeSnapshot(kv, TEST_BRANCH);
    expect(result).toEqual({ status: "cleared", cleared: 2 });

    expect(await kv.get(consumedKey(TEST_BRANCH))).toBeNull();
    expect(await getInputs(kv)).toEqual([]);
  });

  it("leaves inputs written after the snapshot intact (preserves queued-after-merge)", async () => {
    const kv = makeKV();
    const consumedInput = inputKey("2026-04-17T10:00:00.000Z", "aaa");
    await seedInput(kv, consumedInput, {
      type: "building",
      content: "will be consumed",
      createdAt: "x",
    });
    await writeConsumedSnapshot(kv, TEST_BRANCH, [consumedInput]);

    // An input arrives after the snapshot is written but before the merge
    // fires /consume. It must survive.
    const postSnapshot = inputKey("2026-04-17T11:00:00.000Z", "bbb");
    await seedInput(kv, postSnapshot, {
      type: "thinking",
      content: "queued after PR open",
      createdAt: "x",
    });

    await consumeSnapshot(kv, TEST_BRANCH);

    const remaining = await getInputs(kv);
    expect(remaining).toHaveLength(1);
    expect(remaining[0]?.key).toBe(postSnapshot);
    expect(remaining[0]?.input.content).toBe("queued after PR open");
  });

  it("is a no-op when no snapshot exists for the branch", async () => {
    const kv = makeKV();
    const result = await consumeSnapshot(kv, "now-update/never-opened");
    expect(result).toEqual({ status: "no-snapshot" });
  });

  it("is idempotent — second call returns no-snapshot", async () => {
    const kv = makeKV();
    const k1 = inputKey("2026-04-17T10:00:00.000Z", "aaa");
    await seedInput(kv, k1, { type: "building", content: "a", createdAt: "x" });
    await writeConsumedSnapshot(kv, TEST_BRANCH, [k1]);

    await consumeSnapshot(kv, TEST_BRANCH);
    const second = await consumeSnapshot(kv, TEST_BRANCH);
    expect(second).toEqual({ status: "no-snapshot" });
  });

  it("leaves a corrupt-JSON snapshot in place and returns status corrupt", async () => {
    const kv = makeKV();
    const inputK = inputKey("2026-04-17T10:00:00.000Z", "aaa");
    await seedInput(kv, inputK, { type: "building", content: "a", createdAt: "x" });

    // Write a malformed snapshot directly.
    await kv.put(consumedKey(TEST_BRANCH), "{not valid json");

    const result = await consumeSnapshot(kv, TEST_BRANCH);
    expect(result).toEqual({ status: "corrupt" });
    // Snapshot itself is retained for human inspection.
    expect(await kv.get(consumedKey(TEST_BRANCH))).toBe("{not valid json");
    // Referenced input keys are NOT silently dropped.
    expect(await kv.get(inputK)).not.toBeNull();
  });

  it("leaves a wrong-shape snapshot in place and returns status corrupt", async () => {
    const kv = makeKV();
    // Snapshot with keys as a number instead of string[].
    await kv.put(
      consumedKey(TEST_BRANCH),
      JSON.stringify({ keys: 42, createdAt: "2026-04-17T00:00:00.000Z" }),
    );

    const result = await consumeSnapshot(kv, TEST_BRANCH);
    expect(result).toEqual({ status: "corrupt" });
    expect(await kv.get(consumedKey(TEST_BRANCH))).not.toBeNull();
  });

  it("leaves a non-string-array snapshot in place and returns status corrupt", async () => {
    const kv = makeKV();
    await kv.put(
      consumedKey(TEST_BRANCH),
      JSON.stringify({ keys: ["input:abc", 42, "input:def"], createdAt: "2026-04-17" }),
    );
    const result = await consumeSnapshot(kv, TEST_BRANCH);
    expect(result).toEqual({ status: "corrupt" });
    expect(await kv.get(consumedKey(TEST_BRANCH))).not.toBeNull();
  });

  it("reports partial-failure and retains snapshot when some deletes fail", async () => {
    // Build a KV where one specific key's delete rejects.
    const store = new Map<string, string>();
    const failingKey = inputKey("2026-04-17T10:00:00.000Z", "bad");
    const okKey = inputKey("2026-04-17T10:00:01.000Z", "ok");
    store.set(okKey, JSON.stringify({ type: "building", content: "ok", createdAt: "x" }));
    store.set(
      failingKey,
      JSON.stringify({ type: "thinking", content: "bad", createdAt: "x" }),
    );

    const kv: KVStore = {
      async put(key, value) {
        store.set(key, value);
      },
      async get(key) {
        return store.get(key) ?? null;
      },
      async delete(key) {
        if (key === failingKey) {
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

    await writeConsumedSnapshot(kv, TEST_BRANCH, [okKey, failingKey]);

    const result = await consumeSnapshot(kv, TEST_BRANCH);
    expect(result).toEqual({ status: "partial-failure", cleared: 1, failed: 1 });
    // Snapshot retained so a retry can finish the job.
    expect(await kv.get(consumedKey(TEST_BRANCH))).not.toBeNull();
    // The key that did delete is gone; the failing key remains.
    expect(await kv.get(okKey)).toBeNull();
    expect(await kv.get(failingKey)).not.toBeNull();
  });
});

describe("key builders", () => {
  // These tests pin the exact wire format so a prefix change trips CI
  // instead of quietly orphaning data. Update alongside any kv.ts change.
  it("inputKey produces input:<timestamp>:<suffix>", () => {
    expect(inputKey("2026-04-17T10:00:00.000Z", "abc123")).toBe(
      "input:2026-04-17T10:00:00.000Z:abc123",
    );
  });

  it("consumedKey produces consumed:<branch>", () => {
    expect(consumedKey("now-update/2026-04-17")).toBe("consumed:now-update/2026-04-17");
  });
});
