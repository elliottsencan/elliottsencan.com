---
title: Distributed systems
summary: >-
  Distributed systems theory underpins a wide range of modern infrastructure
  concerns, from durable execution patterns and coordination protocols to
  observability, networking defaults, and the abstraction layers that
  orchestrate compute at scale.
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
compiled_at: '2026-11-24T03:55:42.548Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 964
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
  cost_usd: 0.028143
---
The practical concerns of distributed systems keep resurfacing across otherwise unrelated infrastructure work. Durable execution is one clear example. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of stateless functions, sessions, and actors frames the design space as a behavior-state continuum, mapping platforms like Temporal, Restate, DBOS, and Resonate to those forms. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same logic practically: a two-layer Lambda hierarchy with checkpointed state avoids long-lived processes by leaning on durable execution primitives.

Coordination and consistency questions thread through multi-agent systems research too. [Meiklejohn's fifth installment](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) on MAS explicitly invokes the CALM theorem and argues that the right coordination structure depends on the task structure, drawing directly on distributed systems formalism. His [concluding post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) names unsolved problems in MAS, including CRDTs for shared state, failure recovery, and backpressure protocols, noting the field is rediscovering distributed systems without the vocabulary to name it.

Formal modeling remains hard even with LLM assistance. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) found that leading models score near-perfect on TLA+ syntax but only around 46% on spec conformance and 41% on invariant correctness, because they reproduce textbook protocols rather than faithfully modeling actual implementations.

Observability across distributed services has its own craft. [SigNoz's tracing guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 staircase patterns as the practical vocabulary for reasoning about behavior you did not write.

At the infrastructure layer, [Crawshaw's critique](/reading/2026-07/2026-07-05t170602-building-a-cloud) targets the wrong abstractions baked into current clouds: VMs tied to fixed resources, slow remote block storage, and expensive networking. Meanwhile, [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues Nagle's algorithm is obsolete in datacenter environments because application-layer protocols have solved the tiny-packet problem, and the Nagle/delayed-ACK interaction still silently degrades latency. Performance improvements at any one layer do not automatically translate to system-level gains; [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies attention thresholds, discrete capacity increments, and pipeline backpressure as the constraints that swallow even order-of-magnitude wins.

Kubernetes management sits at the operational surface of all this. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) addresses the tooling fragmentation that platform teams face when coordinating across multiple clusters, unifying topology, Helm, GitOps, and audit views into a single binary.
