---
title: Distributed systems
summary: >-
  The theory and practice of coordinating computation across multiple processes
  or machines, spanning durable execution, networking, observability, and formal
  verification.
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
compiled_at: '2026-09-14T21:35:37.913Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 1008
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
  cost_usd: 0.028803
---
Distributed systems concerns how computation is split across multiple processes, machines, or clusters and what must be done to make that split reliable, observable, and correct.

One recurring theme is durable execution: how to run long-lived, stateful workflows across failures without keeping a process alive indefinitely. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps the design space into three forms — stateless functions, sessions, and actors — and shows how Temporal, Restate, DBOS, and Resonate each land at different points on a behavior-state continuum. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) illustrates the same tradeoffs in practice: AWS Lambda durable functions replace a long-lived scheduler with a checkpointed, callback-driven two-layer hierarchy.

Observability across distributed services requires reading traces you often didn't produce. [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and recognizing patterns like N+1 staircases in unfamiliar codebases. Managing clusters at scale has its own tooling gap; [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) addresses the patchwork of kubectl and ancillary tools by unifying topology, events, Helm, GitOps, and audits into a single open-source Kubernetes UI.

Network-level defaults matter significantly at scale. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues that Nagle's algorithm is obsolete in datacenter contexts because the Nagle/delayed-ACK interaction silently degrades latency, and that TCP_NODELAY should be the default now that application-layer protocols handle small-packet coalescing. [David Crawshaw](/reading/2026-07/2026-07-05t170602-building-a-cloud) goes further, arguing that the cloud's foundational abstractions — VMs tied to fixed resources, slow remote block storage, expensive networking — are themselves wrong and need to be replaced from scratch.

Performance improvements in distributed pipelines don't always translate to outcomes. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies attention thresholds, discrete capacity increments, and pipeline backpressure as the three constraints that explain why even order-of-magnitude gains can fail to matter downstream.

Formal verification of distributed protocols is increasingly tested against LLM-generated specs. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) found that leading LLMs score near-perfectly on TLA+ syntax but only around 46% on conformance and 41% on invariants, because the models recite textbook protocols rather than modeling actual implementations.

The multi-agent systems literature is quietly re-deriving distributed systems results. [Meiklejohn's series](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) applies the CALM theorem to agent coordination, arguing that coordination structure must match task structure. The concluding post [maps open problems](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) including topology-to-reliability mapping, CRDTs for shared agent state, failure recovery, and backpressure protocols — problems the distributed systems field has formal vocabulary for but MAS research has not yet adopted.
