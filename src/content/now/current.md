---
title: "Now"
description: "What I'm working on right now."
updated: 2026-08-16
standfirst: "Deep in the final push before festival gates open, with AI engineering reading running heavy and a new staff role at StarLifter holding the background"
---

## Building

The festival platform for Same Same But Different is the most time-pressured thing on my plate. It's a backend-first system handling ticketing, scheduling, maps, and push notifications for around 7,500 attendees, with a hard ship date before the festival gates open August 24. Currently in the maps and notifications stretch, which is the last big milestone before readiness work begins.

The portfolio site is also in flight, working through an eval layer milestone. The core question I keep returning to: whether per-claim sidecar scores actually catch the synthesis failures I notice by eye when the wiki recompiles, or whether they're a false signal.

## Thinking about

High standards exist to make difficult things simple.

## Reading / Listening

Reading has been heavily AI-engineering-flavored lately, with a recurring theme: the gap between what agents can do in a demo and what they do to a codebase over time. The humanlayer "lights-off software factory" piece and Paolo Galeone's "Use Your Brain" essay are good complements. One argues the training problem means no harness can fix quality drift; the other calls for CI discipline and code ownership so AI stays an amplifier. "Don't be a meat proxy" makes a related point about the cognitive work of actually reading and synthesizing AI output before passing it on.

Also read through the LifeOS repo, which is an interesting practical attempt at persistent agent memory and goal tracking. And the Netflix in-house LLM serving writeup is worth the time if you're thinking about inference at scale: engine selection rationale, batched constrained decoding, the full stack.

On the lighter end, the TCP_NODELAY piece is a good reminder that Nagle's algorithm is still silently killing latency in systems that should know better.

## Making

Same Same But Different is a week out. Platform work and festival prep are running in parallel.