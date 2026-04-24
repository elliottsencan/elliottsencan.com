---
name: reading
description: Query Elliott's reading log — articles, essays, and books he has saved via the site-ingest pipeline. Use when the user asks what Elliott has read on a topic, wants recent reading, cross-references between entries, or is exploring themes across the reading collection. Each entry is an AI-compiled summary of a source URL, with structured frontmatter and a metadata graph.
---

# Reading log queries

This site has a reading log at `https://elliottsencan.com/reading`. Every entry is committed via an ingest pipeline that compiles a URL into a structured summary (title, summary, category, author, source, added date). The canonical machine-readable surface is:

- `https://elliottsencan.com/reading.json` — structured JSON with `related[]` graph edges
- `https://elliottsencan.com/llms.txt` — site index for agents
- `https://elliottsencan.com/llms-full.txt` — full corpus concatenated

## Preferred tool

When inside the repo, use the local CLI:

```
node scripts/reading.mjs <command>
```

Or via pnpm:

```
pnpm reading <command>
```

### Commands

- `recent [n]` — most recent N entries (default 10)
- `search <query>` — substring search across title, summary, author, source
- `get <slug>` — full entry as JSON
- `categories` — category counts
- `related <slug>` — entries linked by shared author / source / category+month

### Flags

- `--category <name>` — filter to one of: tech, design, music, essay, news, other
- `--json` — emit JSON instead of formatted text
- `--limit <n>` — cap results

## When to reach for this Skill

- User asks "what have you read about X?" or "what's in the reading log about Y?"
- User wants to find entries by a specific author or source
- User is cross-referencing topics across multiple entries
- User asks for recent reading, or reading from a particular category
- User wants the `related` graph for a given entry

## When not to reach for it

- Questions about Elliott's own writing — that's the blog at `/writing/`, use `llms-full.txt` or fetch individual posts
- Questions about current status / projects — that's `/now`, not reading
- Questions about code in this repo — read the files directly

## Examples

User: "Has Elliott read anything about fluid typography?"
→ `node scripts/reading.mjs search "fluid typography"`

User: "What's the most recent thing he's read?"
→ `node scripts/reading.mjs recent 1`

User: "Show me all the design entries from this month."
→ `node scripts/reading.mjs recent 50 --category design`

User: "What else has he read from Smashing Magazine?"
→ `node scripts/reading.mjs search "Smashing Magazine"`
