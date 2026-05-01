---
title: Software engineering
summary: >-
  Software engineering as practice involves reading business context,
  maintaining comprehension, and exercising judgment — skills that algorithm
  interviews undertest and that uncritical AI delegation quietly erodes.
sources:
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - >-
    2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work
compiled_at: '2026-05-01T05:03:49.862Z'
compiled_with: claude-sonnet-4-6
---
Two persistent myths shape how the field selects and develops engineers. The first is that algorithmic puzzle-solving predicts production performance. [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) argues that interview-style algorithm problems test a narrow, trainable skill that bears little relation to what engineers actually do: reading business context, handling dirty inputs, and shipping incremental value. Passing a LeetCode screen is learnable in isolation; it does not transfer to diagnosing why a production system behaves unexpectedly under real conditions.

The second myth is that delegating implementation to AI agents preserves engineering judgment while removing toil. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) describes the loop this creates: effective oversight of AI-generated code requires the same critical thinking and debugging skills that full delegation gradually removes. As comprehension debt accumulates, the engineer becomes less capable of catching the agent's mistakes, which compounds over time. Faye also flags practical costs, including vendor lock-in and unpredictable token expenses, but the deeper problem is skill atrophy in the oversight role itself.

Both sources point at the same underlying gap between how engineering ability is measured or proxied and what it actually consists of. Production engineering is less about producing correct solutions to well-formed problems and more about maintaining enough understanding of a system to reason about its failures and guide its evolution.
