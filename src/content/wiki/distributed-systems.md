---
title: Distributed systems
summary: >-
  Distributed systems problems — coordination, state management, failure
  recovery, and observability — recur across cloud infrastructure, durable
  execution, multi-agent AI, and formal verification research.
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
compiled_at: '2026-07-09T23:21:22.411Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4384
    output_tokens: 887
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
  cost_usd: 0.026457
---
The problems that define distributed systems keep resurfacing in contexts that don't always name themselves as such. Durable execution frameworks like Temporal, Restate, DBOS, and Resonate are one clear example: [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of stateless functions, sessions, and actors maps directly onto the behavior-state tradeoffs that distributed systems designers have long navigated. Depot's CI orchestrator is another: it uses AWS Lambda durable functions with a two-layer hierarchy and callback-driven coordination to run stateful workflows without a persistent process, handling exactly the failure-recovery and checkpointing problems that distributed systems formalize [Scholten, Depot](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

The multi-agent AI field is quietly rediscovering the same territory. [Meiklejohn's series](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that coordination structure must match task structure, and invokes the CALM theorem — a result from distributed systems theory — to reason about when agent coordination requires synchronization. The concluding post [maps open problems](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) including topology-to-reliability, CRDTs for shared agent state, backpressure protocols, and failure recovery, noting that the field lacks the vocabulary to name what it is rebuilding.

Formal verification of distributed systems has its own gap. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) found that leading LLMs score near-perfect on TLA+ syntax but only around 46% on behavioral conformance and 41% on invariants, because models recite textbook protocols rather than faithfully capturing actual implementations.

At the infrastructure layer, [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) surfaces the operational complexity of multi-cluster Kubernetes management, and [Velichko's container tutorial](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows how Linux namespace and mount primitives underpin the isolation model that distributed compute depends on. Observability across these systems is its own discipline: [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 trace patterns as practical tools for understanding unfamiliar distributed codebases.

Performance in distributed pipelines is subject to constraints that raw throughput numbers obscure. [Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies attention thresholds, discrete capacity increments, and pipeline backpressure as the three reasons even order-of-magnitude improvements often fail to change outcomes — a reminder that distributed system performance is always a system-level question, not a component-level one.
