---
title: Distributed systems
summary: >-
  Distributed systems concepts -- coordination, state, failure, and
  observability -- recur across modern infrastructure work, from durable
  execution and container orchestration to multi-agent AI architectures
  rediscovering classical theory.
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
compiled_at: '2026-06-21T18:32:51.346Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3962
    output_tokens: 883
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
  cost_usd: 0.025131
---
The core problems of distributed systems -- how processes coordinate, how state is shared, how failures propagate, and how behavior is observed -- surface repeatedly across infrastructure work that doesn't always name itself as such.

Durable execution frameworks address the coordination and state problems directly. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) taxonomizes implementations like Temporal, Restate, DBOS, and Resonate along a spectrum from stateless functions through sessions to actors, each carrying different tradeoffs around where state lives and how long a workflow persists. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies one of these patterns concretely: a two-layer Lambda hierarchy with checkpointing and callback-driven coordination replaces a long-lived process, offloading durability concerns to the execution layer.

Container infrastructure surfaces the same distribution primitives at the OS layer. [Ivan Velichko's tutorial](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) reconstructs filesystem isolation from mount namespaces, mount propagation, and pivot_root, showing that containers are coordination abstractions built directly on Linux kernel primitives. Managing clusters built from those primitives is its own discipline; [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) argues the tooling gap in Kubernetes observability is real enough that platform teams routinely patch together five or six separate tools just to see topology, events, and Helm state in one place.

Observability under distribution is a distinct skill. [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) treats distributed tracing as a first-class reading practice: span anatomy, critical-path analysis, and N+1 staircase patterns are the vocabulary for reasoning about latency across services you didn't write.

The multi-agent systems literature, surveyed by Christopher Meiklejohn, is quietly re-deriving distributed systems theory. [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that the CALM theorem and coordination-free consistency are directly applicable to deciding when LLM agents must synchronize versus when they can act independently. [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) maps the open problems -- topology-to-reliability, CRDTs for shared agent state, backpressure protocols, failure recovery -- and observes the field is rediscovering these concepts without the vocabulary to name them.

Formal verification of distributed protocols faces its own gap. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds that current LLMs score near-perfectly on TLA+ syntax but only around 46% on conformance to actual system implementations, reciting textbook protocols rather than modeling real code -- a meaningful limitation when correctness proofs depend on faithful specification.
