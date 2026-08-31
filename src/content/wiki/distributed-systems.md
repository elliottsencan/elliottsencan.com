---
title: Distributed systems
summary: >-
  The theory and practice of coordinating computation across multiple machines,
  spanning durable execution, observability, formal verification, networking
  defaults, and the infrastructure abstractions that shape what distributed
  software can do.
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
compiled_at: '2026-08-31T22:33:52.583Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 1056
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
  cost_usd: 0.029523
---
Distributed systems is the field concerned with how software components running on separate machines communicate, coordinate, and maintain consistent state under partial failure. The sources here span several layers of that problem: execution models, observability, formal specification, network behavior, and the infrastructure abstractions underneath everything.

At the execution layer, durable execution frameworks address one of the oldest distributed problems: how to run long-lived stateful workflows reliably when any individual machine can fail. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space onto three forms, stateless functions, sessions, and actors, and shows how Temporal, Restate, DBOS, and Resonate each make different tradeoffs along a behavior-state continuum. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) offers a concrete production case: Lambda durable functions run a checkpointed workflow scheduler without a long-lived process, using a two-layer Lambda hierarchy and callback-driven coordination.

Observability of these systems is its own discipline. [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) treats distributed tracing as a reading skill, covering span anatomy, critical-path analysis, and recognizable antipatterns like N+1 staircases. That practical framing pairs with [Colin Breck's point](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) that performance improvements in pipelines can be neutralized by attention thresholds, discrete capacity increments, and backpressure, meaning local optimization rarely translates directly to system-level gain.

Formal methods remain the most rigorous tool for reasoning about distributed protocols. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) tested leading LLMs on generating TLA+ specs from real system code, finding near-perfect syntax scores but only around 46% conformance, because models recite textbook protocols rather than modeling actual implementations. The gap between a known protocol and a deployed system is exactly where distributed bugs hide.

At the network layer, [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues that Nagle's algorithm is obsolete on modern datacenter hardware and that TCP_NODELAY should be the default; the Nagle/delayed-ACK interaction still silently inflates latency in systems where application-layer protocols have already solved the tiny-packet problem it was designed for.

The infrastructure abstractions that host distributed software are also under pressure. [David Crawshaw](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that VMs tied to fixed resources, slow remote block storage, and expensive networking are fundamentally wrong foundations and announces a cloud built from different primitives. Meanwhile, [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) targets the operational gap at the Kubernetes layer, where platform teams typically stitch together kubectl and several other tools to get visibility across clusters.

Multi-agent systems are independently rediscovering distributed systems concepts. Christopher Meiklejohn's series notes that coordination structures like CALM, CRDTs for shared state, and backpressure protocols are already established in distributed systems theory, but the MAS field is arriving at them without the vocabulary to name them [part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate), [part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open). That convergence suggests the formal tools built for distributed databases and message-passing systems have a second life in agent coordination.
