// One-shot: rewrite reading-entry frontmatter to swap deprecated topic slugs
// to their canonicals. Used during the initial topic-vocabulary cleanup so
// the next /synthesize run sees unified clusters.
//
// Run from repo root: `node --experimental-vm-modules scripts/sync-topic-aliases.mjs`
// (gray-matter lives in the worker package; we resolve it via that path.)

import { readdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const matter = require("./../workers/site-ingest/node_modules/gray-matter");

const ALIASES = new Map([
  ["llm-agents", "ai-agents"],
  ["ai-coding-assistants", "ai-assisted-coding"],
  ["agentic-coding", "ai-assisted-coding"],
]);

const READING_DIR = "src/content/reading";

async function* walkMd(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkMd(full);
    } else if (entry.isFile() && full.endsWith(".md")) {
      yield full;
    }
  }
}

let touched = 0;
for await (const path of walkMd(READING_DIR)) {
  const raw = await readFile(path, "utf8");
  const parsed = matter(raw);
  const topics = parsed.data.topics;
  if (!Array.isArray(topics) || topics.length === 0) {
    continue;
  }
  const rewritten = topics.map((t) => ALIASES.get(t) ?? t);
  const deduped = [...new Set(rewritten)];
  const changed =
    rewritten.length !== topics.length ||
    rewritten.some((t, i) => t !== topics[i]) ||
    deduped.length !== rewritten.length;
  if (!changed) {
    continue;
  }
  parsed.data.topics = deduped;
  await writeFile(path, matter.stringify(parsed.content, parsed.data));
  console.log(`${path}: ${topics.join(",")} → ${deduped.join(",")}`);
  touched += 1;
}
console.log(`\n${touched} entries rewritten`);
