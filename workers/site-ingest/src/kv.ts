/**
 * KV helpers for the NOW_INPUTS namespace.
 *
 * Two record types share this namespace, distinguished by key prefix:
 *   - `input:{iso-timestamp}:{random-6}` — one queued phone input per key.
 *     Sorting by key returns newest-first.
 *   - `consumed:{branch}` — a snapshot of which input keys fed a specific
 *     /now PR. Written when the PR is opened; consumed (keys deleted +
 *     snapshot deleted) when the PR's branch merges to main.
 *
 * Key shapes and value schemas are centralized here (builders + Zod
 * schemas) so callers don't inline the prefix strings. Change the shape
 * in one place and the types follow.
 */

import { z } from "zod";
import type { ConsumeResult, KeyedNowInput, KVStore, NowInput, NowInputType } from "./types.ts";
import { log } from "./util.ts";

// ---------- key shapes ----------

const INPUT_PREFIX = "input:";
const CONSUMED_PREFIX = "consumed:";

export function inputKey(createdAt: string, suffix: string): string {
  return `${INPUT_PREFIX}${createdAt}:${suffix}`;
}

export function consumedKey(branch: string): string {
  return `${CONSUMED_PREFIX}${branch}`;
}

// Bound fan-out on list+get. Well above any realistic weekly input volume
// (5/min rate limit on /input means ~200 max between crons) but cheap
// insurance if inputs ever stop being cleared on schedule.
const LIST_LIMIT = 200;

// ---------- value schemas ----------

const NOW_INPUT_TYPES = ["reading", "listening", "thinking", "building", "activity"] as const;

/**
 * Shape validator for an input read back from KV. Deliberately looser
 * than the POST /input schema in inputs.ts — this one tolerates any
 * content length, since we wrote it and size caps should never block
 * a consume. Drift between these two schemas is fine as long as the
 * /input schema's output is always a subset of this one.
 */
const StoredNowInputSchema: z.ZodType<NowInput> = z.object({
  type: z.enum(NOW_INPUT_TYPES),
  content: z.string(),
  url: z.string().optional(),
  createdAt: z.string(),
});

/**
 * Shape of a `consumed:<branch>` KV entry. Writer (`writeConsumedSnapshot`)
 * and reader (`consumeSnapshot`) both go through this schema so they can't
 * drift apart.
 */
const ConsumedSnapshotSchema = z.object({
  keys: z.array(z.string()),
  createdAt: z.string(),
});

// ---------- operations ----------

function randomSuffix(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(3));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function writeInput(
  kv: KVStore,
  entry: { type: NowInputType; content: string; url?: string },
): Promise<NowInput> {
  const createdAt = new Date().toISOString();
  const key = inputKey(createdAt, randomSuffix());
  const stored: NowInput = {
    type: entry.type,
    content: entry.content,
    createdAt,
    ...(entry.url ? { url: entry.url } : {}),
  };
  await kv.put(key, JSON.stringify(stored));
  log.info("kv", "write", "input stored", { type: entry.type });
  return stored;
}

/**
 * List all queued inputs, newest-first, paired with their KV keys so callers
 * can later snapshot exactly which keys fed a run. Skips entries that fail
 * to parse (corrupt JSON, unexpected shape) rather than throwing.
 */
export async function getInputs(kv: KVStore): Promise<KeyedNowInput[]> {
  const list = await kv.list({ prefix: INPUT_PREFIX, limit: LIST_LIMIT });
  if (list.list_complete === false) {
    log.warn("kv", "list", "input list truncated at LIST_LIMIT", { limit: LIST_LIMIT });
  }
  const keys = list.keys
    .map((k) => k.name)
    .sort()
    .reverse();
  const values = await Promise.all(keys.map((k) => kv.get(k)));
  const parsed: KeyedNowInput[] = [];
  for (const [i, raw] of values.entries()) {
    if (!raw) {
      continue;
    }
    const key = keys[i] ?? "<unknown>";
    const input = parseStoredInput(raw);
    if (input === null) {
      log.warn("kv", "parse", "skipped malformed input", { key });
      continue;
    }
    parsed.push({ key, input });
  }
  return parsed;
}

function parseStoredInput(raw: string): NowInput | null {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return null;
  }
  const result = StoredNowInputSchema.safeParse(json);
  return result.success ? result.data : null;
}

/**
 * Record which input keys fed a specific /now PR. The snapshot is later
 * consumed (keys deleted, snapshot deleted) when the PR's branch merges
 * to main. Overwrites any existing snapshot for the same branch — if a
 * same-day rerun rebuilds the PR, the newer snapshot wins.
 */
export async function writeConsumedSnapshot(
  kv: KVStore,
  branch: string,
  keys: string[],
): Promise<void> {
  const snapshot = ConsumedSnapshotSchema.parse({
    keys,
    createdAt: new Date().toISOString(),
  });
  await kv.put(consumedKey(branch), JSON.stringify(snapshot));
  log.info("kv", "snapshot", "consumed snapshot written", {
    branch,
    count: keys.length,
  });
}

/**
 * Delete every input key referenced by a branch's snapshot, then delete
 * the snapshot itself. Returns a ConsumeResult so the caller can tell
 * clean success apart from the fault-tolerant paths:
 *
 * - Missing snapshot → {status: "no-snapshot"}. Idempotent second call.
 * - Corrupt snapshot (bad JSON or wrong shape) → {status: "corrupt"};
 *   the snapshot is left in place so a human can inspect it and recover
 *   manually rather than losing the key list to auto-cleanup.
 * - Some deletes fail → {status: "partial-failure", ...}; the snapshot
 *   is left so a retry (manual workflow dispatch) can finish the job.
 * - All deletes succeed → {status: "cleared", cleared: N}; snapshot
 *   deleted. Cheapest normal path.
 *
 * The snapshot is only removed on the fully-clean path so that every
 * failure mode remains debuggable and retryable.
 */
export async function consumeSnapshot(kv: KVStore, branch: string): Promise<ConsumeResult> {
  const key = consumedKey(branch);
  const raw = await kv.get(key);
  if (!raw) {
    log.info("kv", "consume", "no snapshot for branch — no-op", { branch });
    return { status: "no-snapshot" };
  }

  const snapshot = parseSnapshot(raw);
  if (snapshot === null) {
    log.error("kv", "consume", "snapshot malformed — leaving in place for inspection", {
      branch,
    });
    return { status: "corrupt" };
  }

  const results = await Promise.allSettled(snapshot.keys.map((k) => kv.delete(k)));
  const failed = results.filter((r) => r.status === "rejected").length;
  const cleared = snapshot.keys.length - failed;

  if (failed > 0) {
    log.error("kv", "consume", "some input deletes failed — snapshot retained for retry", {
      branch,
      cleared,
      failed,
      total: snapshot.keys.length,
    });
    return { status: "partial-failure", cleared, failed };
  }

  await kv.delete(key);
  log.info("kv", "consume", "snapshot consumed", { branch, cleared });
  return { status: "cleared", cleared };
}

function parseSnapshot(raw: string): z.infer<typeof ConsumedSnapshotSchema> | null {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return null;
  }
  const result = ConsumedSnapshotSchema.safeParse(json);
  return result.success ? result.data : null;
}
