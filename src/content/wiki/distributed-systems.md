---
title: Distributed systems
summary: >-
  The design principles, failure modes, and coordination patterns of systems
  spread across multiple processes or machines, from durable execution and
  container isolation to trace analysis and formal verification.
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
compiled_at: '2026-07-24T04:59:33.416Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 1049
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
  cost_usd: 0.029418
---
Distributed systems problems keep reasserting themselves across domains that do not always recognize them as such. Christopher Meiklejohn's MAS series makes this explicit: the final installment [argues directly](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) that multi-agent AI research is quietly rediscovering distributed systems without the vocabulary to name it. Problems like topology-to-reliability mapping, CRDTs for shared state, failure recovery, and backpressure protocols are open questions in that field, yet they have decades of prior art in distributed systems theory. An earlier post in the same series [applies the CALM theorem](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) to agent coordination, arguing that coordination structure must match task structure and that distributed systems formalisms are an untapped resource for the field.

Durable execution is one area where distributed systems thinking is being actively formalized. Jack Vanlightly [proposes a taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of three forms, stateless functions, sessions, and actors, mapped along a behavior-state continuum and implemented differently by Temporal, Restate, DBOS, and Resonate. Depot's CI orchestrator [demonstrates one form in practice](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions): a two-layer Lambda hierarchy that checkpoints a stateful workflow scheduler without a long-lived process.

At the infrastructure layer, container isolation rests on Linux primitives. Ivan Velichko [shows](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) how mount namespaces, mount propagation, and pivot_root combine to produce filesystem isolation, grounding Kubernetes abstractions in the kernel mechanisms underneath them. Radar [addresses the observability gap](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) at the cluster level, unifying topology, events, Helm, GitOps, and audits across multiple clusters in a single open-source binary.

Understanding what is happening inside a running distributed system is a distinct skill. A SigNoz guide [covers span anatomy, critical-path analysis, and N+1 staircase patterns](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) for engineers reading traces in unfamiliar codebases. Formal verification offers a complementary approach: SysMoBench [benchmarks LLMs on generating TLA+ specifications](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) from real system code and finds near-perfect syntax scores but only around 46% conformance, because models recite textbook protocols rather than modeling actual implementations.

Network configuration is a persistent source of distributed system latency. Marc Brooker [makes the case](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) that Nagle's algorithm is obsolete in datacenter environments and that the silent interaction between Nagle and delayed ACKs still kills latency in systems where TCP_NODELAY has not been set. At the platform level, David Crawshaw [argues](/reading/2026-07/2026-07-05t170602-building-a-cloud) that cloud platforms are built on wrong abstractions, VMs tied to fixed resources, slow remote block storage, and expensive networking, and that correcting these requires building from scratch rather than layering on top of them.

Across these sources a consistent theme emerges: the hard problems in distributed systems, state management, coordination, failure recovery, and observability, recur at every layer of the stack and in adjacent fields that do not yet have names for them.
