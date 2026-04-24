---
title: "Half a Karpathy wiki, on purpose"
description: "Mapping my site's ingest pipeline onto Karpathy's LLM Wiki pattern surfaced one piece I already had, one piece I had to build, and one piece I deliberately deferred. Here's how the layers ended up."
date: 2026-04-24
draft: true
tags: ["systems", "agents", "knowledge-base", "llm"]
aiAssistance: "heavy"
aiNote: "Outlined and drafted in collaboration with Claude (Opus 4.7) during the build of the endpoints, worker pipelines, and content collections this post documents. Prose will be rewritten before publish."
---

There is a satisfying moment in a build when you can name what you have versus what you are pretending to have. I started this round wanting to make my reading log queryable by agents, leaned on Karpathy's LLM Wiki pattern as a guide, and very nearly published a post claiming my reading log already was the wiki. It wasn't. The post is about why, and what I changed to make the claim closer to true.

## What Karpathy's pattern actually is

Karpathy's LLM Wiki pattern, sketched in a gist from April 2026, is three folders.

`raw/` holds source material. `wiki/` holds LLM-compiled encyclopedia-style articles, one per concept, synthesizing across multiple sources. `index.md` is a short map of every wiki article, sized to fit in a single context window. The agent loads `index.md`, picks articles, loads those. That is the whole retrieval step. No vector search, no embeddings, no chunk boundaries.

The structural commitment that matters is the per-concept indexing of the wiki. Karpathy's wiki articles are not summaries of single sources. They synthesize across sources to describe a concept. That is why his pattern compounds when you re-run compilation: better models produce better cross-source articles, not just cleaner per-source notes.

## What I had

The site's existing ingest pipeline runs on every link I save from my phone. Cloudflare Worker, Anthropic, GitHub commit. Each link produces one markdown file at `src/content/reading/{YYYY-MM}/{timestamp}-{slug}.md`, with a frontmatter that has been growing more structured: title, URL, summary, category, author, source, topics, model provenance.

When I held this up next to Karpathy's pattern, the temptation was to call this the wiki. The compile step is genuinely there. URL goes in, LLM produces structured output, repository absorbs it. It looks like a wiki article in the same way a single page of a notebook looks like a wiki article: it has structure, it is human-readable, it cites its source.

It is not a wiki. It is one source per article. Karpathy's wiki is one concept per article, drawing on many sources. Those are different data structures that happen to share a compile step. Calling the per-source corpus "the wiki" because it shares the LLM-as-compiler shape is a category mistake, and a careful reader who has read both Karpathy's gist and my post would push back, correctly.

## The structural fix

The honest move was to keep the per-source layer for what it is, build the missing concept layer, and put both behind a clean retrieval index. Three layers, named for what they do.

Reading entries are the citation layer. One file per URL I have saved, with structured frontmatter and no body. They are not wiki articles. They are the underlying source-of-truth that anything synthesizing across reading material has to draw on. The site exposes them at `/reading` for humans who want a chronological view, and at `/reading.json` with metadata-derived `related[]` edges and a `wiki_concepts[]` reverse index pointing at any concept article that cites the entry.

Wiki concepts are the synthesis layer. A new content collection at `src/content/wiki/`, populated by a new worker endpoint `POST /synthesize`. The pipeline reads every reading entry, groups them by their `topics[]` field, and for any topic with two or more contributing sources calls Anthropic to compile a synthesis article. Articles cite the contributing sources inline, link to related concepts, and land at `/wiki/<slug>` with a JSON dump at `/wiki.json`.

`llms.txt` is the index. It now leads with the wiki as the recommended starting point for topical questions and demotes the reading log to "underlying citation index." `llms-full.txt` concatenates the wiki articles before the reading entries before the longform writing, so an agent doing a single-fetch ingestion gets the synthesis-first ordering.

The compile model becomes legible: every reading entry is an artifact of `/link`, every wiki article is an artifact of `/synthesize`, and the two never run in the same call. They share infrastructure (GitHub commits, Anthropic structured output, Zod schemas) but produce different artifacts on different cadences for different audiences.

## What changed in the ingest

Adding the wiki layer required cleaning up a piece of the ingest pipeline I had over-extended in an earlier pass.

The `/link` schema had grown a `detail` field that emitted a longer markdown synthesis into the body of each entry. That field was prefiguring the wiki layer that did not yet exist, and I had been calling it the wiki article on the way in. With the actual wiki layer now compiled separately, the detail body became the wrong layer for cross-source synthesis. It was duplicating with the eventual wiki articles on the only-this-source dimension, which was the dimension the wiki layer best handles by drawing on multiple sources at once.

So the schema slimmed back to a clean source citation: title, URL, summary, category, author, source, topics, compiled_at, compiled_with. The body is empty. The wiki layer is where synthesis lives.

The `/link` prompt also picked up an existing-topics context loader. Topic stability matters once a wiki layer exists, because near-duplicate topic slugs fragment the wiki. The worker now fetches the public `/reading.json` before each ingest, extracts the union of topics already in use, and passes that list to the prompt with instructions to strongly prefer those slugs. Topic sprawl becomes a self-correcting drift instead of an accelerating one.

The `/recompile` endpoint, which already existed for re-running ingest against the current prompt and model, doubles as the migration tool for older entries. Once the new prompt ships, a single call updates every pre-existing entry to the new shape.

## Compounding stays cheap

Karpathy's pattern keeps raw on disk so the wiki can be re-compiled with a better model later. I do not store raw in the repo. The Internet Archive does, and the existing `/recompile` worker fetches timestamp-pinned snapshots back through the same Anthropic call when I want to bring older entries forward. The same compounding loop now extends to the wiki layer: when a new model warrants it, `/recompile` refreshes the citations and `/synthesize` rebuilds the concept articles on top of them.

Cost is low. A full corpus rebuild at current scale is maybe a dollar. The synthesis run at the 2-source threshold produces only one or two articles at four entries; it scales gradually as topics accumulate.

## The bench-test result

At the end of the build, the corpus has four reading entries. Two of them happen to share `responsive-design` and `css-primitives` as topics, so the first `/synthesize` run compiles two wiki concept articles. The remaining topics have one source each, and there is nothing to synthesize from. The wiki is genuinely small.

That is the right answer. The wiki is honest at every scale: an empty `/wiki` page when nothing yet clusters, two articles when something does, hundreds eventually if the corpus grows. Anyone who reads both my system and Karpathy's gist now sees the same shape with the same commitments.

## What I left alone

A few things were tempting to add and I did not.

Vector search and RAG remain off. At forty kilobytes of summary text, the entire corpus fits inside any modern context window with three orders of magnitude to spare. Adding embeddings would solve a problem I do not have.

Cross-concept articles, like Karpathy's "see also" backlinks at the article level, are deferred. Each wiki article emits a `related_concepts[]` field when the model finds natural cross-links from a fixed list of active topics, but I am not pre-computing a backlink graph or running a separate concept-relations pass. That can wait until the wiki has enough articles for relations to be interesting.

The `/synthesize` cron is off. The endpoint is manual-only. I want to read the first few generated articles before letting the worker schedule itself.

## What this is

A small site running a bigger pattern, kept honest by naming the layers for what they are. The wiki sits alongside the reading log, not on top of it. The compile step from Karpathy's pattern was always running, but the wiki itself I had to build. Now that both exist, the post that names them can be true.
