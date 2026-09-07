---
title: Distributed systems
summary: >-
  Distributed systems span coordination, fault tolerance, state management, and
  observability; current sources trace how those classical concerns resurface in
  durable execution, multi-agent AI, container infrastructure, and network
  protocol choices.
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
compiled_at: '2026-09-07T21:14:32.437Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 1046
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
  cost_usd: 0.029373
---
The classical problems of distributed systems, coordination under failure, state consistency, backpressure, and observability, keep reappearing in new contexts even when practitioners do not recognize them by name. Christopher Meiklejohn's MAS series makes this explicit: [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that multi-agent LLM coordination is quietly rediscovering convergence protocols and the CALM theorem, and [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) catalogs the open problems the field has yet to name, including CRDTs for shared state, failure recovery patterns, and backpressure protocols.

Durable execution is another surface where distributed systems theory cashes out in practice. Jack Vanlightly's taxonomy [maps stateless functions, sessions, and actors](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) onto a behavior-state continuum and shows how Temporal, Restate, DBOS, and Resonate each implement them. Depot's CI orchestrator [applies one of those patterns directly](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions), using AWS Lambda durable functions in a two-layer hierarchy to run a stateful, checkpointed workflow scheduler without a long-lived process.

At the infrastructure layer, container isolation rests on Linux primitives that are themselves coordination mechanisms. Ivan Velichko's tutorial [shows how mount namespaces, mount propagation, and pivot_root](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) compose to produce filesystem isolation, while [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) addresses the operational problem of reasoning across multiple Kubernetes clusters when topology, events, and GitOps state are spread across separate tools.

Observability is the runtime complement to correctness. The SigNoz guide on [reading distributed traces in unfamiliar codebases](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 staircase patterns, making the point that traces are an interpretive skill as much as a tooling question.

Two sources address the gap between theoretical correctness and practical impact. Colin Breck [identifies attention thresholds, discrete capacity increments, and pipeline backpressure](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) as the constraints that make even order-of-magnitude improvements fail to matter at the system level. Marc Brooker [argues that Nagle's algorithm is obsolete](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) in modern datacenters because the Nagle/delayed-ACK interaction silently inflates latency in ways application teams rarely trace to the root cause. David Crawshaw [contends the problem runs deeper](/reading/2026-07/2026-07-05t170602-building-a-cloud), arguing that cloud platforms are built on fundamentally wrong abstractions, VMs tied to fixed resources and slow remote block devices, and that fixing distributed system performance requires rebuilding the substrate.

Formally specifying distributed systems remains hard even for LLMs. A SysMoBench study [found that leading models score near-perfect on TLA+ syntax but only around 46% on conformance and 41% on invariant correctness](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), because the models recite textbook protocols rather than faithfully modeling actual implementations.
