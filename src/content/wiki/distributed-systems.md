---
title: Distributed systems
summary: >-
  Distributed systems problems recur across cloud infrastructure, multi-agent
  AI, durable execution, and observability — the same concerns about state,
  coordination, failure, and latency appear whether the nodes are containers,
  lambdas, or LLM agents.
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
compiled_at: '2026-08-17T18:44:09.476Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 1020
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
  cost_usd: 0.028983
---
The core concerns of distributed systems — how to coordinate state across nodes, handle partial failures, and reason about ordering — keep resurfacing in contexts that do not always name themselves as distributed systems problems.

Christopher Meiklejohn makes the most explicit case for this. In his multi-agent systems series, he argues that the MAS field is quietly rediscovering distributed systems theory without the vocabulary to name it [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open). The CALM theorem, CRDTs for shared agent state, backpressure protocols, and topology-to-reliability mappings are all borrowed directly from distributed systems research [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). His point is that coordination structure must match task structure — a principle that applies equally to microservices and to networks of LLM agents.

Durable execution frameworks are another site where distributed concerns are central. Jack Vanlightly's taxonomy of stateless functions, sessions, and actors maps directly onto how systems manage state persistence across failures [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms). Depot's CI orchestrator puts this concretely: it uses AWS Lambda durable functions with a two-layer hierarchy and callback-driven coordination to run stateful workflows without a long-lived process [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Observability in distributed systems has its own reading discipline. Distributed traces expose the critical path across services, and recognizing patterns like N+1 staircases requires understanding both span anatomy and how requests propagate through a call graph [How to read distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code). At the networking layer, Marc Brooker notes that the interaction between Nagle's algorithm and delayed ACKs still silently kills latency in distributed systems, and that TCP_NODELAY should simply be the default on modern datacenter hardware [It's always TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time).

Formal verification of distributed protocols is harder than it looks. A SIGOPS benchmark found that LLMs achieve near-perfect TLA+ syntax scores but only around 46% conformance and 41% invariant scores when modeling real system implementations, because they reproduce textbook protocols rather than the actual code [Can LLMs model real-world systems in TLA+?](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). Colin Breck's analysis of pipeline backpressure adds a complementary point: even correct performance improvements in one part of a distributed pipeline may not change outcomes if a downstream stage is the binding constraint [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter).

At the infrastructure layer, David Crawshaw argues that VMs tied to fixed resources, slow remote block devices, and expensive networking are the wrong abstractions for cloud systems, and that building correctly requires revisiting those foundations [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud). Kubernetes management tools like Radar address a narrower problem: the operational complexity of observing distributed cluster state across multiple clusters without assembling a patchwork of separate tools [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui).
