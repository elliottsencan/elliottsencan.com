---
title: "Now"
description: "What I'm working on right now."
updated: 2026-08-30
standfirst: "Deep in the post-festival stretch at StarLifter, with AI engineering reading piling up and the portfolio site and herald-ui waiting in the wings"
---

## Building

The festival platform for Same Same But Different shipped its August 24 deadline. The backend-first system handling ticketing, scheduling, maps, and push notifications for around 7,500 attendees made it to the gate. Wrapping up readiness work now.

The portfolio site is still in flight, working through an eval layer milestone. The core question I keep returning to: whether per-claim sidecar scores actually catch the synthesis failures I notice by eye when the wiki recompiles, or whether they're a false signal.

I'm also advising at ShopTickets.net on architecture and code review, which bleeds into some of the same thinking around how decision layers and data pipelines compose at scale.

## Thinking about

High standards exist to make difficult things simple.

## Reading / Listening

The recent reading has tilted toward AI engineering fundamentals and the limits of agent-assisted development. "Don't be a meat proxy" is a short piece worth sitting with: the argument is that relaying raw AI output without reading or synthesizing it shifts all the cognitive work onto whoever's downstream, and the actual value is in understanding the output and responding in your own words. Pairs well with Paolo Galeone's "Use Your Brain," which makes a similar case from the engineering side, advocating code ownership and CI discipline so AI stays an amplifier rather than a crutch.

The humanlayer piece on advanced context engineering for coding agents is a useful counterweight to optimism about lights-off software factories. Its core claim: LLMs can't maintain codebase quality over time, and that's a training problem no amount of harness engineering fixes.

On the more technical side, Netflix's writeup on in-house LLM serving is a good reference for the tradeoffs in running your own inference stack. The Zod 4.5 memory footprint post is a satisfying read on memoizing prototype patterns, the kind of low-level optimization that's easy to miss but hard to forget once you've seen it.

## Making

Same Same But Different just wrapped its festival weekend. Platform and gates both held.