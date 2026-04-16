/**
 * KV helpers for the NOW_INPUTS namespace.
 *
 * Keys use the prefix `input:{iso-timestamp}:{random-6}` so listing naturally
 * returns newest-first when sorted descending. Values are JSON-serialized
 * NowInput objects.
 */

import type { NowInput, NowInputType } from "./types.ts";
import { log } from "./util.ts";

const KEY_PREFIX = "input:";
// Bound fan-out on list+get. Well above any realistic weekly input volume
// (5/min rate limit on /input means ~200 max between crons) but cheap
// insurance if inputs ever stop being cleared on schedule.
const LIST_LIMIT = 200;

function randomSuffix(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(3));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function writeInput(
  kv: KVNamespace,
  entry: { type: NowInputType; content: string; url?: string },
): Promise<NowInput> {
  const createdAt = new Date().toISOString();
  const key = `${KEY_PREFIX}${createdAt}:${randomSuffix()}`;
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
 * List all queued inputs, newest-first. Skips any entries that fail to
 * parse (corrupt JSON, unexpected shape) rather than throwing — one bad
 * row shouldn't block the weekly draft.
 */
export async function getInputs(kv: KVNamespace): Promise<NowInput[]> {
  const list = await kv.list({ prefix: KEY_PREFIX, limit: LIST_LIMIT });
  if (list.list_complete === false) {
    log.warn("kv", "list", "input list truncated at LIST_LIMIT", { limit: LIST_LIMIT });
  }
  const keys = list.keys
    .map((k) => k.name)
    .sort()
    .reverse();
  const values = await Promise.all(keys.map((k) => kv.get(k)));
  const parsed: NowInput[] = [];
  for (const [i, raw] of values.entries()) {
    if (!raw) continue;
    try {
      const obj = JSON.parse(raw) as NowInput;
      if (typeof obj.type === "string" && typeof obj.content === "string") {
        parsed.push(obj);
      }
    } catch {
      log.warn("kv", "parse", "skipped malformed input", { key: keys[i] ?? "<unknown>" });
    }
  }
  return parsed;
}

/**
 * Delete every queued input. Called AFTER a /now PR is successfully opened;
 * if the PR fails mid-pipeline, inputs are preserved for the next run.
 *
 * Uses `Promise.allSettled` so a single KV delete failure doesn't drop the
 * rest of the batch silently; failures are counted and logged, and the
 * returned count reflects what actually succeeded.
 */
export async function clearInputs(kv: KVNamespace): Promise<number> {
  const list = await kv.list({ prefix: KEY_PREFIX, limit: LIST_LIMIT });
  const results = await Promise.allSettled(list.keys.map((k) => kv.delete(k.name)));
  let succeeded = 0;
  let failed = 0;
  for (const result of results) {
    if (result.status === "fulfilled") succeeded += 1;
    else failed += 1;
  }
  if (failed > 0) {
    log.error("kv", "clear", "some deletes failed — inputs may double-consume next run", {
      failed,
      succeeded,
    });
  } else {
    log.info("kv", "clear", "inputs cleared", { count: succeeded });
  }
  return succeeded;
}
