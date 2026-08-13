---
title: Distributed systems
summary: >-
  The theory and practice of coordinating computation across multiple nodes,
  covering consistency, failure, state management, and the networking primitives
  that bind it all together.
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
compiled_at: '2026-08-13T21:12:17.574Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 944
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
  cost_usd: 0.027843
---
Distributed systems problems surface across nearly every layer of modern software. The core tensions, state vs. statelessness, coordination vs. autonomy, and failure tolerance vs. simplicity, appear in contexts ranging from cloud infrastructure to multi-agent AI research.

[Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of durable execution organizes these tensions into three forms: stateless functions, sessions, and actors. The classification maps cleanly onto how systems manage state over time, and how platforms like Temporal, Restate, DBOS, and Resonate make different tradeoffs at each point on that continuum. Depot's CI orchestrator applies one such pattern directly: [using AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) to run stateful, checkpointed workflows without keeping any long-lived process alive, coordinating through a two-layer Lambda hierarchy with callback-driven job signaling.

Observability is the other side of that coordination coin. [Reading distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) in unfamiliar systems requires understanding span anatomy and critical-path analysis, since N+1 staircases and other structural pathologies only become visible at the trace level. Formal verification of distributed protocols is harder still: [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) found that leading LLMs score near-perfectly on TLA+ syntax but only around 46% on conformance and 41% on invariants, because models recite textbook protocols rather than faithfully modeling actual implementations.

Performance intuitions in distributed pipelines are often misleading. [Colin Breck's analysis](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) shows that attention thresholds, discrete capacity increments, and pipeline backpressure can make even order-of-magnitude speedups irrelevant to real outcomes. At the network layer, [Marc Brooker makes the case](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) that Nagle's algorithm is obsolete in datacenter contexts; the interaction between Nagle and delayed-ACK silently kills latency, and TCP_NODELAY should be the default. Meanwhile, [David Crawshaw argues](/reading/2026-07/2026-07-05t170602-building-a-cloud) that cloud platforms are built on fundamentally wrong abstractions, with VMs tied to fixed resources and expensive remote block devices, and that fixing distributed systems requires rethinking the hardware and network primitives underneath them.

The multi-agent systems research surveyed by Christopher Meiklejohn is quietly rediscovering distributed systems from a different direction. [Part 5 of his MAS series](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) applies the CALM theorem and coordination theory to LLM agent interaction, while [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) identifies open problems, including CRDTs for shared agent state, backpressure protocols, and topology-to-reliability mapping, that are textbook distributed systems concerns. The field is converging on these problems without yet having the vocabulary to name them as such.
