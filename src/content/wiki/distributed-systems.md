---
title: Distributed systems
summary: >-
  Distributed systems span coordination protocols, durable execution,
  observability tooling, and network primitives — a field that multi-agent AI
  research is quietly rediscovering from scratch.
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
compiled_at: '2026-11-03T00:37:31.119Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 953
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
  cost_usd: 0.027978
---
The concerns that define distributed systems — coordination, fault tolerance, state consistency, and observability — keep resurfacing across contexts that don't always acknowledge the lineage. Christopher Meiklejohn's MAS series makes this explicit: [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that the CALM theorem and convergent versus adversarial debate structures map directly onto consistency and coordination problems classical DS theory already formalizes, and [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) catalogs open MAS questions — CRDTs for shared state, backpressure protocols, failure recovery, topology-to-reliability mapping — that are distributed systems problems with new names.

Durable execution is one place where DS primitives are being rearticulated into product-level abstractions. Jack Vanlightly's taxonomy of stateless functions, sessions, and actors [maps three durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) onto a behavior-state continuum implemented differently by Temporal, Restate, DBOS, and Resonate. Depot's CI orchestrator [instantiates one of these patterns in practice](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions): a two-layer Lambda hierarchy replaces a long-lived process with checkpointed, callback-driven coordination on AWS.

At the infrastructure layer, distributed systems concerns show up in how clusters are observed and how networks behave. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) addresses the gap between raw kubectl output and cluster-wide topology understanding. [Distributed tracing](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) provides the runtime observability that cluster UIs cannot: span anatomy, critical-path analysis, and N+1 staircase patterns let engineers locate latency sources in unfamiliar codebases. At the transport layer, [Marc Brooker's argument](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) that Nagle's algorithm silently kills latency in datacenter environments — because application protocols have already solved the tiny-packet problem — shows how decades-old defaults accumulate cost at scale.

Formal verification sits at the edge of the field. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) tests whether LLMs can produce TLA+ specs from real system code, finding near-perfect syntax scores but only \~46% conformance — LLMs reproduce textbook protocols rather than actual implementations. That gap matters precisely because distributed systems correctness depends on specifying what a system actually does, not what a canonical algorithm is supposed to do.

[Colin Breck's analysis of performance gains](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) applies directly to distributed pipeline design: attention thresholds, discrete capacity increments, and backpressure mean that local throughput improvements often fail to move system-level outcomes. The insight that pipeline backpressure constrains end-to-end performance echoes Meiklejohn's call for formal backpressure protocols in multi-agent systems — different vocabularies, same structural problem.
