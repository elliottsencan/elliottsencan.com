---
title: "Now"
description: "What I'm working on right now."
updated: 2026-09-20
standfirst: "Staff engineer at StarLifter by day, winding down festival season for SSBD, and thinking hard about what it means to actually understand the code you ship"
---

## Building

The Same Same But Different festival platform shipped its August 24 deadline. Most of the active build work is behind us now; what remains is the post-festival retrospective and whatever hardening follows. Seven thousand five hundred people through the gates is a decent stress test.

At StarLifter I'm in the first-30-days ramp as Staff Engineer. The company builds what they call an enterprise decision layer: agentic systems that reason over live business context and take governed action. The problems are interesting and the deadline pressure is real.

The portfolio site is in a slower orbit right now. The eval layer work continues in the background, specifically the question of whether per-claim sidecar scores catch synthesis failures that are obvious by eye when the LLM wiki recompiles. No clean answer yet.

## Thinking about

High standards exist to make difficult things simple.

## Reading / Listening

The reading lately has a clear theme: cognitive ownership in an AI-assisted world. "Don't be a meat proxy" put it plainly: the value you add is understanding the output and responding in your own words, not relaying it. The piece on the "Claude wrote this" pandemic and Paolo Galeone's "Use Your Brain" are making similar arguments from different angles. Engineers who ship AI-generated code they don't understand aren't moving faster, they're shifting debt onto whoever reads it next.

On the more technical side, the Netflix LLM serving writeup is worth reading for anyone thinking about inference at scale. vLLM over TensorRT-LLM, OpenAI-compatible API surface, batched constrained decoding: good detail on a layer of the stack that's hardening fast. The Zod 4.5 memory footprint piece is a nice case study in using memoizing prototype getters to cut heap usage without changing the API surface.

## Making

Same Same But Different just wrapped. Festival prep and platform work ran in parallel for most of the summer; both are done now. Hollywood Principle work is sitting in the margins while the StarLifter ramp takes priority.