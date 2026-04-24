---
title: "My reading list was already an LLM wiki"
description: "Mapping my site's ingest pipeline onto Karpathy's LLM Wiki pattern surfaced a lot of alignment and a few seams worth closing. The interesting work sat in noticing what was already running."
date: 2026-04-24
draft: true
tags: ["systems", "agents", "knowledge-base", "llm"]
aiAssistance: "heavy"
aiNote: "Outlined and drafted in collaboration with Claude (Opus 4.7) during the build of the endpoints and CLI this post documents. Prose will be rewritten before publish."
---

A small satisfaction in engineering is catching the moment when the system you want to build is mostly the system you already have.

I set out this week to make the reading log on this site queryable by agents. Other people's agents, my own, whatever comes next. The ingest pipeline had been running for a while: an iOS shortcut fires a URL at a Cloudflare Worker, the Worker hands it to Claude, Claude emits a structured summary, the Worker commits a markdown file to the repo. Every link I save produces one reading entry at `src/content/reading/{YYYY-MM}/{timestamp}-{slug}.md`, with YAML frontmatter and an empty body.

The goal was an agent-facing knowledge base. RAG was the first thing that came to mind and immediately failed the math. Eighty entries at roughly five hundred bytes apiece is forty kilobytes of text, which fits into a modern context window three hundred times over. A vector database and a chunking strategy for forty kilobytes would be infrastructure looking for a problem.

Around this time I re-read Andrej Karpathy's LLM Wiki gist, and something clicked.

## The LLM Wiki pattern

Karpathy's articulation is elegant and compact. Three folders: `raw/` holds source material, `wiki/` holds LLM-compiled encyclopedia-style articles, and `index.md` maps every article in one file small enough to fit in context. An agent (or you) loads `index.md`, picks which articles are relevant, loads those. That is the whole retrieval step. No vector search, no embeddings, no chunk boundaries cutting through arguments.

The pattern earns its keep on several axes. The `wiki/` articles are the compiled artifact, so re-running compilation with a better model produces a better wiki. The index is human-readable, which makes every retrieval debuggable. The whole system is plain text in a filesystem, which means git history gives you audit trails without extra infrastructure.

It is the kind of design that reads as obvious in retrospect, which is usually a sign it names something people were already circling toward.

## The mapping moment

I started drawing boxes and arrows to figure out what my knowledge base would look like. About two minutes in, the shape of my existing pipeline came into focus.

- Karpathy's `raw/` is source material. My `raw/` is the URL. The Worker fetches the page, reads the title, extracts an excerpt, and throws the rest away.
- Karpathy's `wiki/` is a folder of LLM-compiled articles, one per concept. My `wiki/` is `src/content/reading/**/*.md`, one article per source, compiled by Claude at ingest time.
- Karpathy's `index.md` is a short map. My index did not exist yet, but I had Pagefind handling search for humans and was planning to add `llms.txt` for agents.

The compile step that makes the LLM Wiki a wiki was running on my site already. I had been looking at it for weeks and calling it "the ingest pipeline."

This is a good feeling. It is also a useful one, because once you see the shape you can look at the rest of the site and ask whether the same shape is running elsewhere.

## Three pipelines, one shape

It was. The site has three jobs that all look the same if you squint.

`/link` compiles one URL into one markdown entry on every ingest. `/now` runs weekly, reads active Linear projects plus phone inputs plus recent reading, and drafts the `/now` page as a PR. What I almost built, on top of both, was a `/synthesize` pipeline that would read the reading collection monthly and compile per-topic articles about recurring themes.

Three pipelines, same ingredients. Each one reads from a bounded set of inputs, runs them through a Claude call with a system prompt, and writes AI-compiled markdown back to the repo. The only differences are what counts as input, how often the pipeline fires, and whether the output is one file or many.

Drawing them side by side made the redundancy obvious. Building a third compile pipeline to generate topic articles, when `/now` was already doing weekly synthesis over the same reading collection, was parallelizing a pattern instead of extending it. The thing I actually wanted out of topic articles was not the articles themselves. It was topic-based querying for agents. That is a tagging and graph problem, not a compile-a-new-file problem.

The integrated move was smaller. Add a `topics[]` field to the reading frontmatter. Have the existing `/link` prompt emit three to five topic slugs per entry alongside the title and summary it was already producing. Skip the separate monthly synthesis job. An agent that wants a topical view filters the reading JSON by topic and reads the per-entry summaries; that is already a serviceable wiki article for most queries, and where it is not, the agent can compose synthesis on the fly from the filtered entries.

That pattern, noticing that three things share a shape and collapsing two of them into the third, is the cheapest refactor in engineering and the easiest one to miss when you have momentum.

## Side by side with the Wiki

Once the simplification was clear, the comparison to Karpathy's pattern got easier. Most of it maps one-to-one. A few pieces needed adapting to this site's specifics.

The matches. Per-source AI-compiled articles. URLs as the raw citation layer. A short index (`llms.txt`) and a longer full-corpus dump (`llms-full.txt`) at the site root. Selective loading by pointing an agent at the index and letting it choose what to fetch. Structured frontmatter as the machine-readable interface, prose below as the human one.

The adaptations. Karpathy keeps the full raw text of every source on disk, which makes recompilation with a better model a local operation. Doing that on a public site would mean re-hosting other people's articles in a public repo, which is a copyright conversation I would rather not have. The Internet Archive already stores timestamp-pinned snapshots of almost anything worth saving, so the adaptation is to treat them as the raw layer and call out to them when recompilation matters.

Karpathy's wiki articles include LLM-inferred semantic backlinks between related concepts. At eighty entries, that felt like speculative structure paid for with LLM inference. A metadata graph gives me most of the value for free: entries by the same author, entries from the same source, entries sharing a topic, entries in the same category-plus-month bucket. Cheap computation over existing frontmatter, not an extra compile pass.

Karpathy's wiki has cross-source synthesis articles. I decided those were premature and will wait until a single topic accumulates enough entries that a human cannot hold them in their head. Probably around fifteen, probably not this year. Until then, the per-entry summaries plus topic filtering cover almost every question I would actually ask.

The one piece I did need to add was a longer body. The 240-character summary on each entry is the right size for the reading page layout but thin for agent consumption. So the ingest pipeline now also emits a longer markdown `detail` into the entry body. Same Claude call, one more output field. The reading page still shows the short summary; the agent surface gets the encyclopedic one.

## Compounding through the Wayback Machine

The part of Karpathy's pattern I enjoyed adapting the most was the compounding loop.

In the original pattern, compounding comes from rerunning compilation. A new model drops, you rerun the wiki build, the articles get better. The raw files in `raw/` are what makes that possible.

My raw files live on the open web, not on my disk. When I wanted to add a recompilation path, my first instinct was to start keeping the fetched HTML alongside the summary. Ten kilobytes per article, a thousand articles, ten megabytes of other people's work checked into a public repo. That is a worse system than what it replaces.

The Internet Archive is the rest of this sentence. The Wayback Availability API takes a URL plus a timestamp and returns the closest snapshot. The Worker picks the `added` date off the frontmatter, asks IA for a snapshot from that moment, runs the snapshot text through the same Claude call `/link` uses for fresh ingests, and writes the rebuilt entry back to a branch. When all entries in a scope are rebuilt, it opens a single PR with a diff and a summary of which entries changed and which could not be found in the archive.

A few details that made this more pleasant than I expected.

Snapshots are timestamp-pinned. If a publisher rewrites or retracts a piece after I read it, recompiling later still gets me the article as it was when I read it. The `added` date in my frontmatter doubles as a pointer into the Wayback index.

The endpoint is dry-run by default. `POST /recompile` with `dry_run: true` reports what would change without writing anything. Flipping the flag off is what opens the PR. Making the safe path the default removes a whole category of accidental runs.

Scope is explicit. The request body specifies which entries are in play: `all`, `since: <date>`, a list of `slugs`, or `compiled_before_model: <id>`. The last one is the interesting one. The schema now writes `compiled_with` into every new entry, so recompiling becomes "rebuild everything not yet tagged with the current model."

Cost is a non-issue. A full rebuild of the current corpus is around eighty Claude calls with prompt caching on the system prompt. A dollar or two. Rare operation, trivial expense.

The whole compounding story is: the Internet Archive stores raw, I store compiled, and a handful of code connects the two when I want it to.

## The query surface

With the collection confirmed as the wiki, all that was left was exposing it to agents.

Three layers, in order of friction.

`reading.json` is the structured snapshot. Astro emits it at build time from the content collection, enriched with the metadata graph. Each entry comes with its topics, its relateds, its compiled-with metadata, and (when present) the longer detail body. An agent that knows JSON can do everything useful with one fetch.

`llms.txt` and `llms-full.txt` follow the llmstxt.org shape. The short one is an index of the site with links to writing, the reading JSON, and the full corpus file. The long one is the whole corpus concatenated into markdown, ready to drop into any agent's context. Both are at the site root. No auth, no shape to remember.

A tiny `reading` CLI wraps the JSON. `node scripts/reading.mjs recent 10`, `search "fluid typography"`, `get <slug>`, `related <slug>`. The CLI is a hundred lines of Node and a companion `.claude/skills/reading/SKILL.md` tells any Skills-aware agent when to reach for it. A few minutes in and I had Claude Code cross-referencing things I had read from inside an unrelated project.

I considered an MCP server instead of a CLI. For this surface, MCP was the heavier option. CLI plus Skill runs in any shell, is debuggable by a human, needs no SDK, and the Skill gives the agent enough intent data to pick it up at the right moments. If I ever want the same tools in an agent UI without shell access, wrapping the CLI as MCP is a small adapter.

## Thresholds, not omissions

A few things are deliberately not in the system yet. Each one has the signal that would flip it on.

RAG or vector search stays off until a topic filter plus keyword search misses a query I care about, or the corpus passes a couple thousand entries. Neither of those is within shouting distance.

Cross-source synthesis articles stay off until a single topic accumulates enough entries that on-demand synthesis from filtered entries stops being sufficient. Maybe around fifteen, maybe more. When it matters, the Worker gets another endpoint that is structurally identical to `/now`, just scoped to topics instead of weeks.

Semantic backlinks inferred by the model stay off unless the metadata graph starts missing connections that matter. The topic field covers this for now.

Hosted MCP or multi-agent-friendly tool interfaces stay off until shell access stops being the common substrate.

The point of writing these down is to convert "I did not build X" into "X turns on when Y." It makes the system easier to revisit. The absent layers are not gaps, they are hibernating.

## What it added up to

The final diff is smaller than any of my early plans.

Three endpoints at the site root (`reading.json`, `llms.txt`, `llms-full.txt`). One `topics[]` field on every new reading entry, plus `compiled_with` and `compiled_at` for provenance. A longer `detail` body alongside the short summary. A Worker endpoint `/recompile` that routes through the Internet Archive to rebuild old entries against a newer model when one shows up. A CLI and a Skill so the whole thing is queryable from any shell an agent can reach.

The architecture of the site was mostly there already. Claude was already compiling my reading into structured markdown every time I saved a link. The Wiki pattern gave me a vocabulary to notice that, and most of the work after that noticing was deciding which layers to leave off.

Good patterns tend to be like this. They do not introduce a new shape so much as they name the one you were already running, which makes it possible to extend it one field at a time.
