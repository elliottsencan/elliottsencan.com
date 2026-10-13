---
title: Distributed systems
summary: >-
  Distributed systems span coordination, fault tolerance, state management, and
  networking; recent sources show the field's abstractions being rediscovered by
  multi-agent AI research, tested by LLM spec-generation, and pressured by
  infrastructure choices at every layer.
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
compiled_at: '2026-10-13T00:15:20.094Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 927
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
  cost_usd: 0.027588
---
The core problems of distributed systems, coordination under failure, consistent shared state, and predictable performance, keep resurfacing across contexts that don't always recognize them as such. Christopher Meiklejohn's multi-agent series makes this explicit: [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that coordination structure must match task structure and invokes the CALM theorem directly, while [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) names open problems, topology-to-reliability mapping, CRDTs for shared state, failure recovery, backpressure protocols, that distributed systems research already has vocabulary for. The AI field, he argues, is quietly rediscovering this ground without knowing it.

Durable execution is one concrete place where the field's lessons get re-encoded into new infrastructure. Jack Vanlightly's taxonomy of [three durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps stateless functions, sessions, and actors along a behavior-state continuum, showing how Temporal, Restate, DBOS, and Resonate each make different tradeoffs. Depot's [CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) puts this into practice with AWS Lambda durable functions, using a two-layer hierarchy and callback-driven coordination to run stateful workflows without a persistent process.

Observability across distributed boundaries gets its own discipline. The SigNoz guide on [reading distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 staircase patterns as tools for navigating unfamiliar codebases. Performance gains in this context can be deceptive: Colin Breck's piece on [when performance improvements don't matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies pipeline backpressure and discrete capacity increments as reasons why even order-of-magnitude gains sometimes change nothing.

Networking defaults matter at a low level too. Marc Brooker's post on [TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows how Nagle's algorithm and delayed-ACK interaction silently degrades latency in datacenter environments, and argues the default should have changed long ago. David Crawshaw's [critique of cloud abstractions](/reading/2026-07/2026-07-05t170602-building-a-cloud) goes further, contending that VMs tied to fixed resources and slow remote block devices are foundational mistakes that distort everything built on top of them.

Formal verification of distributed protocols sits in a similar tension. A SIGOPS benchmark [testing LLMs on TLA+ generation](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) found near-perfect syntax scores but only around 46% conformance and 41% invariant accuracy, because models recite textbook protocols rather than modeling actual implementations. Getting formal specs right requires understanding what a system actually does, not what its canonical description says it does.
