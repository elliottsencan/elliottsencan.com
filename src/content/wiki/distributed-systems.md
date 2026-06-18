---
title: Distributed systems
summary: >-
  Distributed systems thinking appears across fault tolerance, durable
  execution, multi-agent LLM coordination, and observability, with a recurring
  theme that the field's hard-won theory about state, failure, and coordination
  is underused in newer engineering contexts.
sources:
  - 2026-05/2026-05-01t112302-the-three-durable-function-forms
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - >-
    2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2
  - >-
    2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
  - 2026-05/2026-05-05t135637-reddit-rdevops
  - 2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla
  - 2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions
  - 2026-05/2026-05-31t164554-jj-vcsjj
  - >-
    2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code
aliases:
  - fault-tolerance
  - stateful-computing
compiled_at: '2026-06-18T21:45:09.664Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4497
    output_tokens: 839
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
  cost_usd: 0.026076
---
The core problems of distributed systems, managing state across nodes, handling partial failure gracefully, and coordinating concurrent actors, keep resurfacing in domains that don't always acknowledge the lineage. Two clusters of sources make this pattern visible.

On the infrastructure side, durable execution frameworks like Temporal, Restate, DBOS, and Resonate each encode different answers to the state-vs-behavior tradeoff. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps these onto three forms: stateless functions, sessions, and actors, each with different concurrency guarantees. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) is a practical instance of the same tradeoff, using AWS Lambda durable functions with a two-layer hierarchy to get checkpointed, stateful workflow execution without a long-lived process. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates what happens when distributed state assumptions break silently: constructing temp branches from stale divergence points rather than HEAD quietly corrupted main branches.

On the multi-agent LLM side, Christopher Meiklejohn's series makes the distributed systems connection explicit. [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that coordination structure must match task structure and that distributed systems theory offers vocabulary the MAS field is ignoring, specifically citing the CALM theorem. [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) catalogs open problems including topology-to-reliability mapping and CRDTs for shared agent state. [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) establishes why this matters: MAS systems fail 41-87% of the time across empirical benchmarks, with information synthesis rather than coordination being the core bottleneck.

Formal verification runs into a parallel gap. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) found that LLMs generate TLA+ with near-perfect syntax but only ~46% conformance to actual distributed system implementations, meaning they reproduce textbook protocols rather than the real systems they're asked to model.

Observability closes the loop. [SigNoz's guide to distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) treats span shapes and attributes as the primary artifact for understanding unfamiliar system architecture, which presupposes that traces are the ground truth of what a distributed system actually did, not what its design said it would do.
