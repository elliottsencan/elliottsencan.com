---
title: Distributed systems
summary: >-
  Distributed systems research and practice spans durable execution, container
  isolation, coordination theory, observability, and networking fundamentals,
  with multi-agent AI emerging as a field quietly rediscovering the same hard
  problems.
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
compiled_at: '2026-07-22T05:53:45.759Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 1092
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
  cost_usd: 0.030063
---
Distributed systems is the study and engineering of software that runs across multiple processes or machines, coordinating state and behavior reliably despite partial failures, network delays, and concurrency. The discipline has a body of classical results, but current work keeps extending it in new directions.

Durable execution is one active front. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) proposes three forms, stateless functions, sessions, and actors, mapped along a behavior-state continuum, and shows how Temporal, Restate, DBOS, and Resonate each implement subsets of those patterns. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies a concrete instance: a two-layer Lambda hierarchy with callback-driven coordination that runs stateful CI workflows without keeping a long-lived process alive, demonstrating that durable execution models are now practical infrastructure choices and not just academic proposals.

Observability is the counterpart discipline. [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and common pathologies like N+1 staircases in unfamiliar codebases, making the point that traces are the primary artifact for reasoning about system behavior when you lack source-level knowledge.

Networking fundamentals remain relevant. [Brooker's post on TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues that Nagle's algorithm is obsolete on modern datacenter hardware and silently kills latency through its interaction with delayed ACKs. The lesson generalizes: low-level defaults set for a different hardware era keep causing production problems.

Formal verification of distributed protocols is getting pressure-tested against LLMs. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds that leading models score near-perfect on TLA+ syntax but only around 46% on conformance and 41% on invariants, because they reproduce textbook protocol descriptions rather than modeling actual implementations. This matters for distributed systems specifically because correctness proofs are worth little if the spec does not match the code.

Multi-agent AI systems are surfacing distributed systems problems under new names. [Meiklejohn's series](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that coordination structure must match task structure, and invokes the CALM theorem to reason about when coordination is necessary. The concluding post [maps open questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) including topology-to-reliability mapping, CRDTs for shared agent state, failure recovery, and backpressure protocols, noting that the field is rediscovering classical distributed systems results without the vocabulary to name them.

Platform-level concerns appear in [Radar's Kubernetes UI](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui), which unifies topology, events, Helm, GitOps, and audits across clusters, and in [Crawshaw's critique](/reading/2026-07/2026-07-05t170602-building-a-cloud) of cloud abstractions built on VMs with fixed resources and slow remote block devices. Both reflect a recurring pattern: the operational complexity of distributed infrastructure keeps outpacing the tooling built to manage it.

Performance gains in distributed pipelines also have non-obvious limits. [Breck's analysis](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies attention thresholds, discrete capacity increments, and pipeline backpressure as reasons why order-of-magnitude improvements often fail to change outcomes, a caution relevant to any optimization work on a system with multiple bottleneck stages.
