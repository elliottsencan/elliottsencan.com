---
title: "Now"
description: "What I'm working on right now."
updated: 2026-08-02
standfirst: "Festival crunch, a new role at an AI startup, and a reading diet heavy on inference engineering and what agentic coding actually breaks"
---

## Building

The festival platform for Same Same But Different is the most time-pressured thing on my plate. It's a backend-first system handling ticketing, scheduling, maps, and push notifications for around 7,500 attendees, with a hard ship date before the festival gates open August 24. Currently in the maps and notifications stretch, the last big milestone before readiness work begins.

The portfolio site is also in flight, working through an eval layer milestone. The core question I keep returning to: whether per-claim sidecar scores actually catch the synthesis failures I notice by eye when the wiki recompiles, or whether they're a false signal.

## Thinking about

High standards exist to make difficult things simple.

## Reading / Listening

Netflix's writeup on in-house LLM serving is the most recent thing worth sitting with. The engine selection reasoning is interesting, and the batched constrained decoding section is genuinely useful context for anyone thinking about inference at scale.

The humanlayer piece on lights-off software factories is a useful counterweight to a lot of the agentic hype. The argument: the failure mode isn't harness engineering, it's that LLMs can't maintain codebase quality over time, and no amount of loop-prompting changes that. Worth reading alongside Armin Ronacher's "The Coming Loop," which covers similar ground from a different angle.

Also worth flagging: the Polymarket Postgres MCP piece, which is a good concrete example of what plain-English querying against a large ledger actually looks like in practice. And Marc Brooker's TCP_NODELAY post, which is short and right.

## Making

Same Same But Different is weeks out. Platform work and festival prep are running in parallel.