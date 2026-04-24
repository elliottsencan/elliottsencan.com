---
title: "Half a Karpathy wiki, on purpose"
description: "Mapping my site's ingest pipeline onto Karpathy's LLM Wiki pattern surfaced one piece I already had, one piece I had to build, and one piece I deliberately deferred. Here's how the layers ended up."
date: 2026-04-24
draft: true
tags: ["systems", "agents", "knowledge-base", "llm"]
aiAssistance: "heavy"
aiNote: "Outlined and drafted in collaboration with Claude (Opus 4.7) during the build of the endpoints, worker pipelines, and content collections this post documents. Prose will be rewritten before publish."
---

Every link I save from my phone runs through Anthropic and lands as a structured markdown citation in `src/content/reading`. To make that corpus queryable by agents, I built a concept-indexed wiki layer on top, following the shape of [Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). This is how the layers fit together.

## Karpathy's pattern

The gist is three folders.

`raw/` holds source material. `wiki/` holds LLM-compiled encyclopedia-style articles, one per concept, synthesizing across multiple sources. `index.md` is a short map of every wiki article, sized to fit in a single context window. The agent loads `index.md`, picks articles, loads those. That is the whole retrieval step. No vector search, no embeddings, no chunk boundaries.

The structural commitment that matters is the per-concept indexing of the wiki. Karpathy's wiki articles are not summaries of single sources. They synthesize across sources to describe a concept. That is why his pattern compounds when you re-run compilation: better models produce better cross-source articles, not just cleaner per-source notes.

## The three layers

Three layers, named for what they do.

Reading entries are the citation layer. One file per URL I have saved, with structured frontmatter and no body. They are not wiki articles. They are the underlying source-of-truth that anything synthesizing across reading material has to draw on. The site exposes them at `/reading` for humans who want a chronological view, and at `/reading.json` with metadata-derived `related[]` edges and a `wiki_concepts[]` reverse index pointing at any concept article that cites the entry.

Wiki concepts are the synthesis layer. A new content collection at `src/content/wiki/`, populated by a new worker endpoint `POST /synthesize`. The pipeline reads every reading entry, groups them by their `topics[]` field, and for any topic with two or more contributing sources calls Anthropic to compile a synthesis article. Articles cite the contributing sources inline, link to related concepts, and land at `/wiki/<slug>` with a JSON dump at `/wiki.json`.

There are two indexes, both deliberately. `wiki.txt` is the wiki layer's own navigator: every concept article, title and summary, designed to stay scannable as the wiki grows. `llms.txt` is the site-wide entry point: wiki, reading, writing, /now, all under one root file with a pointer to `wiki.txt` for the full wiki list. Karpathy keeps his wiki index separate from any site index for the same reason — the wiki is its own retrieval surface and earning a dedicated index pays off as concepts accumulate. `llms-full.txt` concatenates the wiki articles before the reading entries before the longform writing, so an agent doing a single-fetch ingestion gets the synthesis-first ordering.

The compile model becomes legible: every reading entry is an artifact of `/link`, every wiki article is an artifact of `/synthesize`, and the two never run in the same call. They share infrastructure (GitHub commits, Anthropic structured output, Zod schemas) but produce different artifacts on different cadences for different audiences.

## How ingest works

`POST /link` takes a URL and an optional excerpt. The Worker fetches the page title if missing, calls Anthropic for a structured summary, and commits a markdown citation to the repo. The output is a clean source record: title, URL, summary, category, author, source, topics, compiled_at, compiled_with. The body is empty; single-source pseudo-synthesis stays out of the schema, and the wiki layer handles cross-source synthesis in its own collection.

Topic stability is enforced at ingest because near-duplicate slugs fragment the wiki. Before each `/link` call the worker fetches the public `/reading.json`, extracts the union of topics already in use, and passes that list to the prompt with instructions to strongly prefer existing slugs. Topic sprawl becomes a self-correcting drift instead of an accelerating one.

`POST /recompile` re-runs the ingest pipeline against existing entries, fetching their content from the Internet Archive snapshot closest to the original `added` timestamp and writing the rebuilt entry as part of a PR. Same prompt, same Zod schema, just applied to older material.

## Compounding stays cheap

Karpathy's pattern keeps raw on disk so the wiki can be re-compiled with a better model later. I do not store raw in the repo. The Internet Archive does, and the existing `/recompile` worker fetches timestamp-pinned snapshots back through the same Anthropic call when I want to bring older entries forward. The same compounding loop now extends to the wiki layer: when a new model warrants it, `/recompile` refreshes the citations and `/synthesize` rebuilds the concept articles on top of them.

Cost is low. A full corpus rebuild at current scale is maybe a dollar. The synthesis run at the 2-source threshold produces only one or two articles at four entries; it scales gradually as topics accumulate.

## The bench-test result

At the end of the build, the corpus has four reading entries. Two of them happen to share `responsive-design` and `css-primitives` as topics, so the first `/synthesize` run compiles two wiki concept articles. The remaining topics have one source each, and there is nothing to synthesize from. The wiki is genuinely small.

## What I left alone

A few things were tempting to add and I did not.

Vector search and RAG remain off. At forty kilobytes of summary text, the entire corpus fits inside any modern context window dozens of times over. Adding embeddings would solve a problem I do not have.

Cross-concept articles, like Karpathy's "see also" backlinks at the article level, are deferred. Each wiki article emits a `related_concepts[]` field when the model finds natural cross-links from a fixed list of active topics, but I am not pre-computing a backlink graph or running a separate concept-relations pass. That can wait until the wiki has enough articles for relations to be interesting.

The `/synthesize` cron is off. The endpoint is manual-only. I want to read the first few generated articles before letting the worker schedule itself.

The wiki is honest at every scale: empty when nothing clusters, two articles when something does, hundreds eventually if the corpus grows.
