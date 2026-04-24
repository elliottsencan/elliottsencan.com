#!/usr/bin/env node
/**
 * reading — query the elliottsencan.com reading log from the command line.
 *
 * Backed by the public /reading.json endpoint. Designed to be invoked by
 * the companion Skill at .claude/skills/reading/SKILL.md, or directly by
 * humans and agents with shell access.
 *
 * Commands:
 *   reading recent [n]                  most recent N entries (default 10)
 *   reading search <query>              substring search across title+summary
 *   reading get <slug>                  full entry JSON by slug
 *   reading categories                  list categories with counts
 *   reading related <slug>              entries related via metadata graph
 *
 * Flags (apply to recent/search):
 *   --category <name>                   filter by category
 *   --json                              emit JSON instead of formatted text
 *   --limit <n>                         cap result count (default 20 for search)
 *   --source <url>                      override data source URL
 */

const DEFAULT_SOURCE = "https://elliottsencan.com/reading.json";

function parseArgs(argv) {
  const args = { _: [], flags: {} };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) {
        args.flags[key] = true;
      } else {
        args.flags[key] = next;
        i++;
      }
    } else {
      args._.push(a);
    }
  }
  return args;
}

async function loadData(source) {
  const res = await fetch(source);
  if (!res.ok) {
    throw new Error(`fetch ${source} failed: ${res.status}`);
  }
  return await res.json();
}

function formatEntry(entry) {
  const meta = [entry.author, entry.source].filter(Boolean).join(", ");
  const head = `${entry.added.slice(0, 10)}  [${entry.category}]  ${entry.title}`;
  const body = [meta && `  ${meta}`, `  ${entry.url}`, `  ${entry.summary}`]
    .filter(Boolean)
    .join("\n");
  return `${head}\n${body}`;
}

function matches(entry, query) {
  const q = query.toLowerCase();
  return (
    entry.title.toLowerCase().includes(q) ||
    entry.summary.toLowerCase().includes(q) ||
    (entry.author ?? "").toLowerCase().includes(q) ||
    (entry.source ?? "").toLowerCase().includes(q)
  );
}

async function main() {
  const { _: positional, flags } = parseArgs(process.argv.slice(2));
  const [cmd, ...rest] = positional;
  const source = flags.source ?? process.env.READING_SOURCE ?? DEFAULT_SOURCE;

  if (!cmd || cmd === "--help" || cmd === "-h" || cmd === "help") {
    process.stdout.write(`reading — query the reading log

Commands:
  recent [n]            most recent N entries (default 10)
  search <query>        substring search
  get <slug>            full entry JSON by slug
  categories            list categories with counts
  related <slug>        entries related via shared author/source/category+month

Flags:
  --category <name>     filter by category
  --json                emit JSON
  --limit <n>           cap result count
  --source <url>        override data source (default ${DEFAULT_SOURCE})
`);
    return;
  }

  const data = await loadData(source);
  let entries = data.entries;
  if (flags.category) {
    entries = entries.filter((e) => e.category === flags.category);
  }

  switch (cmd) {
    case "recent": {
      const n = Number(rest[0] ?? flags.limit ?? 10);
      const out = entries.slice(0, n);
      emit(out, flags.json);
      return;
    }
    case "search": {
      const query = rest.join(" ");
      if (!query) {
        throw new Error("search requires a query");
      }
      const limit = Number(flags.limit ?? 20);
      const out = entries.filter((e) => matches(e, query)).slice(0, limit);
      emit(out, flags.json);
      return;
    }
    case "get": {
      const slug = rest[0];
      if (!slug) {
        throw new Error("get requires a slug");
      }
      const entry = entries.find((e) => e.slug === slug);
      if (!entry) {
        process.stderr.write(`no entry with slug: ${slug}\n`);
        process.exit(1);
      }
      process.stdout.write(`${JSON.stringify(entry, null, 2)}\n`);
      return;
    }
    case "categories": {
      const counts = new Map();
      for (const e of data.entries) {
        counts.set(e.category, (counts.get(e.category) ?? 0) + 1);
      }
      const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
      if (flags.json) {
        process.stdout.write(`${JSON.stringify(Object.fromEntries(sorted), null, 2)}\n`);
        return;
      }
      for (const [cat, count] of sorted) {
        process.stdout.write(`${String(count).padStart(4)}  ${cat}\n`);
      }
      return;
    }
    case "related": {
      const slug = rest[0];
      if (!slug) {
        throw new Error("related requires a slug");
      }
      const root = data.entries.find((e) => e.slug === slug);
      if (!root) {
        process.stderr.write(`no entry with slug: ${slug}\n`);
        process.exit(1);
      }
      const relatedSlugs = new Set(root.related.map((r) => r.slug));
      const out = data.entries.filter((e) => relatedSlugs.has(e.slug));
      emit(out, flags.json);
      return;
    }
    default:
      process.stderr.write(`unknown command: ${cmd}\n`);
      process.exit(1);
  }
}

function emit(entries, asJson) {
  if (asJson) {
    process.stdout.write(`${JSON.stringify(entries, null, 2)}\n`);
    return;
  }
  if (entries.length === 0) {
    process.stdout.write("no entries\n");
    return;
  }
  process.stdout.write(entries.map(formatEntry).join("\n\n"));
  process.stdout.write("\n");
}

main().catch((err) => {
  process.stderr.write(`${err.message}\n`);
  process.exit(1);
});
