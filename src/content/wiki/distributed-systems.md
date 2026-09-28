---
title: Distributed systems
summary: >-
  Distributed systems span everything from container isolation and network
  tuning to durable execution and formal verification, with recurring themes of
  coordination overhead, state management, and the gap between theory and
  running systems.
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
compiled_at: '2026-09-28T23:03:52.247Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 986
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
  cost_usd: 0.028473
---
The practical concerns of distributed systems surface across a wide range of problems, but a few tensions keep reappearing: how to manage state across failures, how coordination structure affects reliability, and how the abstractions we choose shape what is even visible when things go wrong.

On the execution side, [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) proposes a taxonomy of stateless functions, sessions, and actors mapped along a behavior-state continuum, showing how Temporal, Restate, DBOS, and Resonate each make different tradeoffs. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies one instance of this in practice: a two-layer Lambda hierarchy with checkpoint-driven coordination eliminates long-lived processes without sacrificing stateful progress tracking.

Coordination structure is the thread running through Christopher Meiklejohn's multi-agent systems series. [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that the CALM theorem and related distributed systems formalisms are directly applicable to LLM agent coordination, and that coordination must match task structure to avoid unnecessary synchronization. [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) makes the diagnosis explicit: the MAS field is quietly rediscovering CRDTs, backpressure, and failure recovery without the vocabulary to name them.

Observability in distributed systems requires its own skill set. [How to read distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 staircase patterns as tools for reasoning about systems you did not build. Kubernetes cluster management has a parallel gap: [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) addresses the fragmented tooling problem by unifying topology, events, Helm, GitOps, and audit views across multiple clusters in a single binary.

At the network layer, [Marc Brooker's TCP_NODELAY post](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows how a protocol-level default from an earlier era, Nagle's algorithm, silently degrades latency in modern datacenters where application-layer protocols already handle small-packet batching. [David Crawshaw's cloud critique](/reading/2026-07/2026-07-05t170602-building-a-cloud) takes this critique to the infrastructure layer: VMs tied to fixed resources, slow remote block storage, and expensive networking are architectural choices baked into cloud platforms that distort every system built on top of them.

Formal verification offers one way to close the gap between specification and behavior, but [SysMoBench's benchmarks of LLMs on TLA+](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) show the gap is wide: near-perfect syntax scores but only around 46% conformance, because models recite textbook protocols rather than faithfully modeling actual implementations. [Colin Breck's performance piece](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) adds a complementary caution: even correct improvements can be absorbed by attention thresholds, discrete capacity increments, or pipeline backpressure, leaving system-level outcomes unchanged.
