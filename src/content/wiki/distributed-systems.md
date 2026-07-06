---
title: Distributed systems
summary: >-
  Distributed systems problems recur across orchestration, multi-agent
  coordination, container infrastructure, and cloud design: the field's core
  tensions around state, failure, and coordination keep resurfacing in new
  contexts.
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
compiled_at: '2026-07-06T00:13:28.612Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4384
    output_tokens: 920
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
  cost_usd: 0.026952
---
The practical challenges of distributed systems show up everywhere modern software runs at scale: how to checkpoint long-running work, how to coordinate concurrent actors, how to observe what actually happened, and how to build infrastructure that reflects the actual costs of compute and network.

Durable execution is one concrete application. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) proposes a taxonomy of stateless functions, sessions, and actors arranged along a behavior-state continuum, and maps how Temporal, Restate, DBOS, and Resonate each occupy different positions on it. The same pattern appears in practice at [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions), which uses AWS Lambda durable functions arranged in a two-layer hierarchy to run a stateful, checkpointed CI scheduler without keeping a persistent process alive.

Multi-agent AI systems are quietly re-encountering classical distributed systems problems without always using the vocabulary to name them. Christopher Meiklejohn's series notes that the CALM theorem and CRDTs apply directly to shared agent state [in the debate and coordination installment](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate), and the concluding post [on open questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) maps unsolved problems including topology-to-reliability mappings, failure recovery, and backpressure protocols onto distributed systems formalisms.

Observability is the discipline that lets engineers reason about distributed behavior after the fact. [How to read distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and common patterns like N+1 staircases in unfamiliar codebases. Separately, [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) benchmarks LLMs on generating TLA+ specifications from real system code, finding that models score near-perfectly on syntax but only around 46% on behavioral conformance, suggesting they recite textbook protocols rather than faithfully modeling actual implementations.

At the infrastructure layer, [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) addresses the operational complexity of multi-cluster Kubernetes by unifying topology, events, Helm, GitOps, and audits into a single interface. And [David Crawshaw's Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that foundational abstractions in current cloud platforms are wrong: VMs tied to fixed resources, slow remote block storage, and expensive networking create systemic inefficiencies that no amount of application-level optimization can fully overcome.

Performance gains inside a distributed pipeline do not automatically translate to system-level improvements. [Colin Breck's analysis](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies attention thresholds, discrete capacity increments, and backpressure as three constraints that can render even order-of-magnitude speedups irrelevant when the bottleneck lies elsewhere in the system.
