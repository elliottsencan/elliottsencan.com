---
title: Distributed systems
summary: >-
  A field whose core problems — coordination, failure, state, and observability
  — keep resurfacing across cloud infrastructure, durable execution, multi-agent
  AI, and networking, often rediscovered without the original vocabulary.
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
compiled_at: '2026-10-05T23:51:32.823Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 905
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
  cost_usd: 0.027258
---
Distributed systems is the study of how independent processes coordinate to do work reliably despite partial failures, network delays, and no shared clock. The field's canonical problems are well-documented, but several sources here show those problems being quietly rediscovered in new contexts.

Christopher Meiklejohn's multi-agent systems series is the clearest example. The concluding post argues that MAS researchers are independently arriving at distributed systems problems — topology-to-reliability mapping, shared mutable state, failure recovery, backpressure — without the vocabulary to name them [Open Questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open). An earlier post in the same series invokes the CALM theorem directly, arguing that coordination structure must match task structure and that distributed systems theory offers formalisms the MAS field has not yet borrowed [Debate, State, and Coordination](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate).

Durable execution is another domain where distributed systems primitives resurface. Jack Vanlightly's taxonomy maps stateless functions, sessions, and actors along a behavior-state continuum, and shows how Temporal, Restate, DBOS, and Resonate each implement those patterns differently [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms). Depot's CI orchestrator applies this concretely: Lambda durable functions checkpoint a stateful workflow scheduler without a long-lived process, using a two-layer hierarchy of Run and Workflow Lambdas [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Observability is where the field meets operational reality. Distributed traces expose execution across service boundaries; reading them in unfamiliar codebases requires understanding span anatomy, critical-path analysis, and patterns like N+1 staircases [How to read distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code). At the network layer, Marc Brooker's case for TCP_NODELAY shows how a protocol-level interaction — Nagle's algorithm combined with delayed ACKs — silently inflates latency in datacenter systems that have otherwise solved the tiny-packet problem at the application layer [It's always TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time).

Formal verification of distributed protocols remains hard. SysMoBench found that leading LLMs score near-perfect on TLA+ syntax but only around 46% on conformance and 41% on invariants, because models reproduce textbook protocols rather than faithfully modeling actual implementations [Can LLMs model real-world systems in TLA+?](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). David Crawshaw's critique of cloud infrastructure adds a structural argument: today's platforms are built on wrong abstractions — VMs tied to fixed resources, slow remote block storage, expensive networking — that compound the coordination costs distributed systems are meant to manage [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud).
