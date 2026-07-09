---
title: Distributed systems
summary: >-
  Distributed systems theory explains coordination, consistency, and failure at
  scale; current practice rediscovers these ideas through durable execution,
  multi-agent coordination, container infrastructure, and observability tooling.
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
compiled_at: '2026-07-09T14:11:53.767Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4384
    output_tokens: 825
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
  cost_usd: 0.025527
---
The core problems of distributed systems, consistency under failure, coordination across processes, state management without a single owner, keep resurfacing across apparently unrelated fields. Christopher Meiklejohn's MAS series makes this explicit: [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that coordination structure must match task structure and invokes the CALM theorem as a formalism the multi-agent field has not yet adopted, while [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) catalogs open problems like CRDTs for shared state and backpressure protocols, noting the field is quietly rediscovering distributed systems without the vocabulary to name it.

On the formal verification side, [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds that LLMs can reproduce textbook TLA+ protocols at near-perfect syntax scores but fail at ~46% conformance when asked to model actual system implementations, revealing a gap between pattern recall and genuine specification.

Durable execution is one practical response to coordination problems. Jack Vanlightly's [taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of stateless functions, sessions, and actors maps how Temporal, Restate, DBOS, and Resonate each trade off behavior and state. Depot's [CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) is a concrete instance: a two-layer Lambda hierarchy with callback-driven coordination eliminates the need for a long-lived process while preserving stateful, checkpointed workflows.

Observability is the runtime counterpart to formal reasoning. [Reading distributed traces in unfamiliar codebases](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) treats span anatomy and critical-path analysis as the practical tools for understanding system behavior after deployment, especially when the author of the code is unavailable.

Infrastructure abstractions shape what distributed systems can do. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) addresses operational complexity at the cluster layer, and Colin Breck's analysis of [performance gains that do not matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) applies directly: discrete capacity increments and pipeline backpressure mean that optimizing one node in a distributed pipeline often changes nothing end-to-end. David Crawshaw's [argument](/reading/2026-07/2026-07-05t170602-building-a-cloud) that today's cloud is built on wrong abstractions, fixed-resource VMs, slow remote block storage, expensive networking, frames the same constraint at the infrastructure layer.
