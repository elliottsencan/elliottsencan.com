---
title: Distributed systems
summary: >-
  Distributed systems theory supplies the vocabulary and failure models for
  reasoning about coordination, state, and fault tolerance across independent
  components, a foundation that software engineering keeps rediscovering in new
  contexts.
sources:
  - 2026-05/2026-05-01t112302-the-three-durable-function-forms
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - >-
    2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2
  - >-
    2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
compiled_at: '2026-05-04T04:09:12.137Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3584
    output_tokens: 681
    cache_creation_input_tokens: 0
    cache_read_input_tokens: 0
  model: claude-sonnet-4-6
  pricing:
    model: claude-sonnet-4-6
    input_per_million: 3
    output_per_million: 15
    cache_read_per_million: 0.3
    cache_write_5m_per_million: 3.75
    priced_at: '2026-04-30'
  cost_usd: 0.020967
---
Distributed systems is the study of how independent computational components coordinate, share state, and recover from failures when there is no single source of truth and no atomic clock binding them together. The problems are old, but they keep surfacing under new names.

Jack Vanlightly's taxonomy of durable execution [maps three function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) onto a behavior-state continuum: stateless functions, sessions, and actors. Each form represents a different answer to the same question distributed systems has always asked: how much state does a component own, and who is responsible for it when things go wrong? Durable execution platforms like Temporal, Restate, DBOS, and Resonate each make different bets on concurrency models and durability guarantees, but the tradeoffs they navigate are the same ones distributed systems research has worked through for decades.

Christopher Meiklejohn's multi-agent LLM series makes a pointed version of this argument. [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) applies the CALM theorem, borrowed directly from distributed databases, to argue that coordination structure must match task structure, and that the MAS field is reinventing concepts that already have precise names. [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) closes the series by calling for CRDTs for shared agent state and topology-to-reliability mapping as open problems, both of which are established distributed systems research areas. [Wave 2 empirical results](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) quantify the practical cost of ignoring this: multi-agent systems fail 41 to 87 percent of the time under fault injection, with information synthesis rather than coordination emerging as the primary bottleneck.

The merge queue incident described by Phil Vendola [illustrates a subtler failure mode](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit): a system that builds on stale state because it fails to track HEAD correctly. The bug silently corrupted main branches. Trunk's immunity came from an architectural choice, not a patch. That pattern, correct-by-construction rather than defensively correct, is a recurring principle in distributed systems design.
