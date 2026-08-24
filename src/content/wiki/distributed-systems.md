---
title: Distributed systems
summary: >-
  Distributed systems underpin modern infrastructure from container runtimes to
  durable workflow engines, and the field's classical formalisms are proving
  newly relevant as multi-agent AI systems quietly rediscover its unsolved
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
compiled_at: '2026-08-24T18:45:40.626Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 1131
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
  cost_usd: 0.030648
---
Distributed systems is the study of how independent computational nodes coordinate, share state, and tolerate failure. The sources here touch this field from several angles: infrastructure primitives, durable execution, observability, networking, and an emerging convergence with multi-agent AI research.

At the infrastructure layer, containers are the basic unit of isolation. [Ivan Velichko's tutorial](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows how Linux mount namespaces, mount propagation, and `pivot_root` compose to produce filesystem isolation, grounding the abstraction in kernel primitives. Above that layer, Kubernetes clusters those containers at scale, and [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) addresses a practical pain point: operators managing multiple clusters currently stitch together kubectl and several other tools just to get a unified topology view.

Durable execution is a pattern that treats long-running, stateful workflows as first-class distributed objects that survive process failures. [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) organizes the design space into three forms, stateless functions, sessions, and actors, mapped along a behavior-state continuum and implemented differently across Temporal, Restate, DBOS, and Resonate. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) is a concrete application: a two-layer Lambda hierarchy uses checkpointed durable functions to schedule CI jobs without keeping any long-lived process alive.

Observability in distributed systems requires tracing requests across service boundaries. [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and recognizing pathological patterns like N+1 staircases in traces for codebases you did not write.

Networking decisions made at the socket level compound across distributed calls. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the case that Nagle's algorithm is obsolete in datacenter environments: the Nagle/delayed-ACK interaction silently adds latency, and application-layer protocols have already solved the tiny-packet problem that Nagle addressed. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) adds a complementary caution: even genuine performance wins can be swallowed by pipeline backpressure or discrete capacity increments, so latency improvements must be evaluated in system context.

[David Crawshaw](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues at the platform level that VMs tied to fixed resources and slow remote block storage are the wrong abstractions for cloud infrastructure, a critique that applies pressure to the entire stack these other sources operate within.

The most theoretically interesting thread is the convergence of multi-agent AI research with distributed systems. Christopher Meiklejohn's series argues this connection explicitly: [part five](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) notes that the CALM theorem and coordination-structure matching are directly applicable to LLM agent topologies, while [part eight](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) maps open problems, CRDTs for shared state, backpressure protocols, failure recovery, as classical distributed systems questions the MAS field is rediscovering without the vocabulary to name them.

Formal verification of distributed protocols sits alongside this: [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) tests whether LLMs can generate TLA+ specs from real system code. Syntax scores are near-perfect, but conformance to actual implementations sits around 46%, suggesting models have internalized textbook protocols rather than the specific behavior of real systems.
