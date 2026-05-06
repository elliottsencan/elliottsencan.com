---
title: Distributed systems
summary: >-
  Distributed systems theory supplies the vocabulary and failure models that
  recurring engineering problems demand, from durable execution frameworks to
  multi-agent LLM coordination to merge queue consistency bugs.
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
  - 2026-05/2026-05-05t135637-reddit-rdevops
compiled_at: '2026-05-06T16:09:08.196Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3761
    output_tokens: 609
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
  cost_usd: 0.020418
---
The core challenge distributed systems pose is deceptively simple: multiple processes share state and must coordinate, and the ways they can fail are numerous, often silent, and hard to classify. Three distinct bodies of work in recent reading converge on this problem from different angles.

Jack Vanlightly's taxonomy of durable execution [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps stateless functions, sessions, and actors onto a behavior-state continuum across Temporal, Restate, DBOS, and Resonate. The central insight is that choosing the wrong execution form for a given concurrency pattern produces correctness failures that look like application bugs but are structural.

Christopher Meiklejohn's eight-part multi-agent systems series makes an explicit argument that the LLM field is reinventing distributed systems without acknowledging it. Part 5 [on debate, state, and coordination](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) invokes the CALM theorem and shared-notebook state to show that coordination structure must match task structure. Part 4 [on Wave 2 failures](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reports failure rates of 41-87% across empirical studies, attributing the bottleneck to information synthesis rather than raw coordination. Part 8 [on open questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) closes by cataloguing CRDTs for shared state, graceful failure recovery, and topology-to-reliability mapping as unsolved problems the field could borrow from distributed systems theory directly.

The GitHub merge queue incident [covered by Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates how a single consistency assumption, constructing temp branches from stale divergence points rather than HEAD, can silently corrupt a shared mutable resource. It is a textbook distributed state bug appearing in everyday CI infrastructure.
