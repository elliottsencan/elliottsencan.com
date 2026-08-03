---
title: Distributed systems
summary: >-
  Distributed systems thinking spans coordination, failure recovery, state
  management, and observability across networked components, with recurring
  themes around abstraction quality, latency, and whether existing theory is
  being applied where it should be.
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
compiled_at: '2026-08-03T19:33:56.947Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 1051
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
  cost_usd: 0.029448
---
Distributed systems is the subdiscipline of computing concerned with multiple components communicating over a network, where partial failure, concurrency, and latency are unavoidable rather than exceptional. The sources here approach that core from several directions.

At the infrastructure layer, [David Crawshaw](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that cloud platforms are built on wrong abstractions from the start: VMs tied to fixed resources, slow remote block devices, and expensive networking impose costs that better primitives could eliminate. That critique lands adjacent to [Marc Brooker's](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) point that even a low-level protocol artifact like Nagle's algorithm, left at its default, silently degrades latency in datacenter environments where its original rationale no longer applies.

At the application layer, [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) taxonomizes durable execution into stateless functions, sessions, and actors, showing how Temporal, Restate, DBOS, and Resonate each make different tradeoffs along a behavior-state continuum. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) demonstrates one such tradeoff in practice: using AWS Lambda durable functions to run a stateful, checkpointed workflow scheduler without keeping a long-lived process alive.

Observability across distributed components is addressed by [Elizabeth at SigNoz](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code), who walks through reading distributed traces in unfamiliar codebases, covering span anatomy, critical-path analysis, and how patterns like N+1 staircases surface in trace data. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) adds a constraint that observability alone cannot fix: pipeline backpressure and discrete capacity increments mean even order-of-magnitude performance gains can fail to change outcomes, because the bottleneck shifts or the improvement never maps to a purchasable unit of capacity.

One of the more striking arguments across these sources comes from Christopher Meiklejohn's multi-agent systems series. [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that the CALM theorem and related distributed systems formalisms are directly applicable to LLM agent coordination, and that coordination structure must match task structure. [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) presses further: the field is quietly rediscovering distributed systems problems, including topology-to-reliability mapping, CRDTs for shared state, and failure recovery, without using the vocabulary to name them.

Formal verification connects to this through [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), which benchmarks LLMs generating TLA+ specs from real system code. The result, near-perfect syntax scores but only around 46% conformance and 41% invariant scores, shows that LLMs reproduce textbook protocols rather than faithfully modeling actual implementations. That gap between textbook knowledge and implementation reality is a recurring distributed systems problem independent of AI.

[Radar's Kubernetes UI](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) is the most operational source here, addressing the cluster management layer rather than distributed systems theory, but it reflects the same underlying complexity: platform teams need unified visibility across topology, events, and multi-cluster state because the components are too numerous and interdependent to reason about through disconnected tools.
