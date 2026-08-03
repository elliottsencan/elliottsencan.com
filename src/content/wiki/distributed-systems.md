---
title: Distributed systems
summary: >-
  The theory and practice of coordinating computation across multiple nodes,
  spanning durability, observability, consistency, network behavior, and the
  abstractions that make these concerns manageable at scale.
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
compiled_at: '2026-08-03T10:05:49.985Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 981
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
  cost_usd: 0.028398
---
Distributed systems problems surface at every layer of modern infrastructure. The networking layer has its own persistent traps: [Marc Brooker's analysis](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows that Nagle's algorithm, designed to reduce tiny-packet overhead on slow networks, now silently degrades latency in datacenters because its interaction with delayed ACKs predates application-layer batching. TCP_NODELAY should simply be on by default. At a higher level, [David Crawshaw argues](/reading/2026-07/2026-07-05t170602-building-a-cloud) that cloud platforms compound the problem by building on wrong abstractions from the start: VMs tied to fixed resources and slow remote block devices make fundamental inefficiencies structural rather than incidental.

Durability and coordination are the next layer up. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of durable execution into stateless functions, sessions, and actors maps the behavior-state continuum that frameworks like Temporal, Restate, DBOS, and Resonate each navigate differently. Depot's CI orchestrator is a practical instantiation of this: [Iris Scholten describes](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) a two-layer Lambda hierarchy that runs stateful, checkpointed workflows without keeping any long-lived process alive, using callback-driven coordination instead.

Observability across these distributed workflows is its own discipline. [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) on reading distributed traces in unfamiliar codebases covers span anatomy, critical-path analysis, and recognizing patterns like N+1 staircases, all of which require understanding the causal structure of the system before any tool output becomes legible.

Formal verification offers a different angle on correctness. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds that LLMs generating TLA+ specs score near-perfect on syntax but only around 46% on conformance and 41% on invariants, because models recite textbook protocols rather than faithfully capturing actual implementations. Verifying real distributed systems remains hard even with ML assistance.

Perhaps the most striking cross-cutting observation comes from Christopher Meiklejohn's multi-agent systems series. [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that coordination structure must match task structure and that distributed systems theory, including the CALM theorem, offers untapped formalisms for multi-agent coordination. [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) pushes further: open problems like topology-to-reliability, CRDTs for shared state, failure recovery, and backpressure protocols show that the multi-agent field is quietly rediscovering distributed systems without the vocabulary to name what it is doing.

Performance gains inside distributed pipelines are also subject to systemic constraints. [Colin Breck's analysis](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) of attention thresholds, discrete capacity increments, and pipeline backpressure explains why even order-of-magnitude improvements to one component frequently fail to change end-to-end outcomes. Optimizing a node in isolation is not the same as improving the system.
