---
title: "Now"
description: "What I'm working on right now."
updated: 2026-09-06
standfirst: "Post-festival, settling deeper into StarLifter's decision layer work, with the site's eval pipeline and some pointed reading on AI and engineering judgment filling the margins"
---

## Building

The SSBD festival platform shipped before the August 24 gates. That deadline is behind us, which is a relief. The backend-first system handled ticketing, scheduling, maps, and push notifications for around 7,500 attendees. Post-festival wrap and any follow-on platform work will surface as the next milestone takes shape.

The portfolio site is still in flight, working through an eval layer milestone. The core question I keep returning to: whether per-claim sidecar scores actually catch the synthesis failures I notice by eye when the wiki recompiles, or whether they're a false signal. Synthesis-quality eval (Tier 2) is the next thing on the runway, building on the citation-faithfulness work that landed earlier.

## Thinking about

High standards exist to make difficult things simple.

## Reading / Listening

The reading lately has converged on a theme: cognitive ownership in the age of AI-generated code. "Don't be a meat proxy" and "The 'I don't know, Claude wrote this' pandemic" both make the same underlying point from different angles. Relaying or shipping AI output you don't understand isn't delegation, it's offloading the understanding to whoever has to read it next. The Paolo Galeone piece on engineering standards argues for strong CI/CD and code ownership as the floor, with AI as an amplifier rather than a replacement for judgment. All three are worth reading together.

On the technical side, the Netflix in-house LLM serving writeup is a solid tour of what running the full serving stack actually looks like at scale: engine selection tradeoffs, deployment strategies, batched constrained decoding. And the Zod 4.5 memory footprint post is a nice concrete piece of systems thinking, lazily memoizing prototype getters cutting per-schema heap usage up to 10x by simply not allocating for methods you never call.

## Making

Same Same But Different came off. Festival is done for the year.