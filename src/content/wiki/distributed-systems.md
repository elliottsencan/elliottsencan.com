---
title: Distributed systems
summary: >-
  Distributed systems problems — coordination, state, failure recovery,
  backpressure, and observability — recur across cloud infrastructure, durable
  execution, multi-agent AI, and container orchestration, often rediscovered
  without the vocabulary to name them.
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
compiled_at: '2026-08-29T20:15:07.013Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 965
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
  cost_usd: 0.028158
---
The problems that define distributed systems do not stay in one domain. Coordination failures, partial state, backpressure, and failure recovery show up in cloud infrastructure, CI pipelines, multi-agent AI, and container runtimes. What changes is the vocabulary used to describe them.

Jack Vanlightly's taxonomy of durable execution [maps directly onto classical distributed state problems](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms): stateless functions, sessions, and actors differ primarily in how much state they hold and for how long. Temporal, Restate, DBOS, and Resonate each implement some subset of these forms. Depot CI's use of AWS Lambda durable functions [demonstrates the same pattern in production](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions), using a two-layer Lambda hierarchy and callback-driven coordination to run stateful CI workflows without a long-lived process.

Christopher Meiklejohn's multi-agent systems series [makes the parallel explicit](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open): the open problems in MAS — topology-to-reliability mapping, CRDTs for shared state, failure recovery, backpressure protocols — are distributed systems problems. The field is rediscovering them without the vocabulary. An earlier post in the series [argues that the CALM theorem and coordination theory](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) offer formalisms the AI community has not yet adopted.

Formal verification faces a related gap. SysMoBench [found that LLMs score near-perfectly on TLA+ syntax](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) but achieve only around 46% conformance and 41% invariant scores when modeling real systems, because models recite textbook protocols rather than faithfully representing actual implementations.

At the infrastructure layer, Marc Brooker's note on TCP_NODELAY [identifies a concrete coordination artifact](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time): the interaction between Nagle's algorithm and delayed ACKs silently degrades latency in datacenter networks. Colin Breck's analysis of backpressure [shows that even large performance gains can fail to matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) when a pipeline bottleneck elsewhere absorbs the improvement. David Crawshaw [argues the abstractions underlying current clouds are wrong from the start](/reading/2026-07/2026-07-05t170602-building-a-cloud) — VMs tied to fixed resources, slow remote block storage, expensive networking — and that building correctly requires rethinking those foundations.

Observability across distributed systems is its own skill. Reading distributed traces in unfamiliar codebases [requires understanding span anatomy, critical-path analysis, and N+1 patterns](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) before the data becomes actionable. Kubernetes cluster management [surfaces the same fragmentation problem at the operations layer](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui): platform teams typically stitch together kubectl and multiple auxiliary tools to get a coherent view of multi-cluster topology.
