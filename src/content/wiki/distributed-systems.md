---
title: Distributed systems
summary: >-
  Distributed systems research and practice spans coordination theory, durable
  execution, observability, and networking; recent work shows LLM-adjacent
  fields quietly rediscovering problems the field solved decades ago.
sources:
  - 2026-05/2026-05-01t112302-the-three-durable-function-forms
  - 2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
  - >-
    2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like
  - 2026-05/2026-05-05t135637-reddit-rdevops
  - 2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla
  - 2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions
  - 2026-05/2026-05-31t164554-jj-vcsjj
  - >-
    2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code
  - 2026-06/2026-06-21t231758-nasa-technical-report-20070005136
  - 2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter
  - 2026-07/2026-07-05t170602-building-a-cloud
  - 2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time
compiled_at: '2026-08-11T05:16:57.129Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 1012
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
  cost_usd: 0.028863
---
Distributed systems is the study and engineering of programs that run across multiple independent processes or machines, where coordination, failure, and state management are fundamental rather than incidental concerns.

The field's theoretical vocabulary is increasingly relevant outside its traditional home. Christopher Meiklejohn's multi-agent series makes the case directly: multi-agent LLM systems are rediscovering distributed systems problems — consensus, shared state, failure recovery, backpressure — without the vocabulary to name them [Getting Up to Speed on Multi-Agent Systems, Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open). An earlier post in the same series shows how the CALM theorem (coordination-free consistency requires monotone logic) maps cleanly onto debates about when LLM agents need to synchronize [Part 5: Debate, State, and Coordination](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate).

On the formal verification side, SysMoBench tested leading LLMs on generating TLA+ specifications from real distributed system code. Syntax scores were near-perfect; conformance and invariant scores hovered around 46% and 41% respectively [Can LLMs model real-world systems in TLA+?](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). The gap separates reciting textbook protocols from faithfully modeling actual implementations — a distinction that matters for any system where correctness proofs are the point.

Durable execution is one of the field's more practically active areas right now. Jack Vanlightly's taxonomy of stateless functions, sessions, and actors maps the behavior-state continuum across Temporal, Restate, DBOS, and Resonate [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms). Depot's CI orchestrator illustrates the same ideas in production: a two-layer Lambda hierarchy uses checkpointed durable functions to run stateful workflow scheduling without a persistent process [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Observability across distributed systems has its own discipline. Reading traces in unfamiliar codebases requires understanding span anatomy, critical-path analysis, and recognizing patterns like N+1 staircases before connecting a slow span back to the code responsible for it [How to read distributed traces when you didn't write the code](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code).

At the infrastructure layer, a persistent tension runs between abstraction and physical reality. Marc Brooker's post on TCP_NODELAY argues that Nagle's algorithm is obsolete on modern datacenter hardware and that its interaction with delayed ACKs still silently kills latency in distributed systems that haven't explicitly disabled it [It's always TCP_NODELAY. Every damn time.](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time). David Crawshaw makes a broader version of the same critique: today's cloud platforms are built on VM abstractions tied to fixed resources and expensive network assumptions that no longer reflect the underlying hardware [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud). Colin Breck adds a systems-level caution: even correct performance improvements in one component often fail to change outcomes when the bottleneck is attention thresholds, discrete capacity increments, or pipeline backpressure elsewhere in the system [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter).
