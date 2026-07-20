---
title: Distributed systems
summary: >-
  The theory and practice of coordinating processes across network boundaries,
  covering consistency, failure, state management, and the observability tools
  needed to reason about systems that no single node fully sees.
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
compiled_at: '2026-07-20T19:44:28.376Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 976
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
  cost_usd: 0.028323
---
Distributed systems problems surface everywhere modern software runs at scale. The core challenges, coordination, consistency, failure recovery, and backpressure, recur across domains that don't always name themselves as distributed systems work.

The connection between formal specification and real implementations is one persistent gap. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds that LLMs can generate syntactically correct TLA+ specs at near-perfect rates but achieve only about 46% conformance when modeling actual system code, because they reproduce textbook protocols rather than the logic of specific implementations. This matters because TLA+ exists precisely to catch the edge cases that textbook descriptions elide.

Durable execution is one practical answer to failure recovery in distributed workflows. Jack Vanlightly's taxonomy maps the space into three forms: stateless functions, sessions, and actors, each sitting at a different point on a behavior-state continuum [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms). Depot CI's orchestrator applies this concretely, using a two-layer Lambda hierarchy with callback-driven job coordination so that a stateful workflow scheduler survives without a persistent long-running process [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Once a distributed system is running, observability becomes the primary way to understand it. Reading distributed traces in unfamiliar codebases requires understanding span anatomy and critical-path analysis; common pathologies like N+1 staircases are visible once you know what shape to look for [How to read distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code). Kubernetes adds another layer; Radar addresses the tooling fragmentation that makes multi-cluster topology hard to reason about without juggling kubectl and several auxiliary tools [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui).

Performance gains inside a distributed pipeline don't always propagate. Colin Breck identifies three constraints that suppress the impact of local optimizations: attention thresholds, discrete capacity increments, and pipeline backpressure [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter). Network latency is another source of silent degradation; Marc Brooker makes the case that Nagle's algorithm combined with delayed ACKs still kills distributed system latency in datacenters where the original tiny-packet problem no longer applies [It's always TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time).

Christopher Meiklejohn's multi-agent systems series repeatedly argues that the MAS field is quietly reinventing distributed systems. The CALM theorem, CRDTs for shared state, backpressure protocols, and failure recovery are all problems with existing distributed systems literature, but MAS researchers are rediscovering them without that vocabulary [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open). That gap represents both an opportunity and a risk: the same coordination mistakes distributed systems research already solved are being made again at the agent layer.
