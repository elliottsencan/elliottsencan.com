---
title: Distributed systems
summary: >-
  Distributed systems underpin modern software from container orchestration to
  durable execution to multi-agent coordination, with recurring tensions around
  state management, failure recovery, and observability that span tooling,
  theory, and practice.
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
compiled_at: '2026-07-01T01:58:43.714Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4243
    output_tokens: 904
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
  cost_usd: 0.026289
---
The problems that define distributed systems keep resurfacing across different domains, often under different names. State, coordination, failure, and observability are the constants.

Durable execution frameworks are one concrete expression. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps Temporal, Restate, DBOS, and Resonate onto three forms — stateless functions, sessions, and actors — distinguished by how much behavior-coupled state a function carries. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) puts a version of this in production: a two-layer Lambda hierarchy replaces a long-lived process with checkpointed, callback-driven coordination, trading process lifetime for durability.

At the infrastructure layer, container isolation rests on Linux primitives. [Velichko's walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows how mount namespaces, mount propagation, and pivot_root compose into filesystem isolation without any Docker abstraction. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) sits above that layer, addressing the operational cost of managing multiple clusters through a unified topology and audit view.

Observability is where distributed systems reveal their structure post-hoc. [SigNoz's tracing guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) frames span anatomy and critical-path analysis as archaeology — reading a trace in unfamiliar code means reconstructing causality from timing and parent-child relationships.

The multi-agent systems literature, as surveyed by Christopher Meiklejohn, is quietly rediscovering the same terrain. [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) applies the CALM theorem to agent coordination, arguing that coordination structure must match task structure. [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) names the open problems directly: topology-to-reliability mapping, CRDTs for shared agent state, backpressure protocols — all classical distributed systems questions arriving in a new context without the vocabulary to match.

Formal verification faces a parallel gap. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds that LLMs generate syntactically valid TLA+ at high rates but achieve only ~46% conformance when modeling real system implementations, because models recite textbook protocols rather than the actual code in front of them. The gap between a known pattern and a specific implementation is precisely what formal modeling is meant to capture.

Performance sits within these same constraints. [Breck's analysis](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) argues that attention thresholds, discrete capacity increments, and pipeline backpressure routinely neutralize order-of-magnitude gains — a reminder that a distributed system's bottleneck is rarely where measurement first points.
