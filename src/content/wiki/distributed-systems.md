---
title: Distributed systems
summary: >-
  Distributed systems span coordination theory, networking primitives, durable
  execution, and observability; recent work reveals how multi-agent AI research
  is independently rediscovering problems the field solved decades ago.
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
compiled_at: '2026-09-21T21:49:45.962Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 883
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
  cost_usd: 0.026928
---
The core tensions in distributed systems — how to coordinate state across nodes, recover from partial failures, and reason about timing — surface across every layer of the stack, from TCP socket options to cloud architecture to LLM agent frameworks.

At the networking layer, [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the case that Nagle's algorithm is a legacy artifact: on modern datacenter hardware, the interaction between Nagle and delayed-ACK silently inflates latency, and application-layer batching has made the algorithm redundant. The fix is trivial — set TCP_NODELAY — but the cost of not knowing this is paid constantly. Colin Breck's analysis of [pipeline backpressure](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) adds a complementary observation: even when individual components get faster, discrete capacity increments and pipeline bottlenecks mean the system-level outcome often does not change.

Durable execution sits one level up. Jack Vanlightly's [taxonomy of durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) — stateless functions, sessions, and actors — maps the design space across platforms like Temporal, Restate, DBOS, and Resonate. Depot's [CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows the pattern applied: a two-layer Lambda hierarchy with checkpointed state replaces a fragile long-lived process, making failure recovery a structural property rather than an afterthought.

Observability across distributed services requires reading traces you didn't produce. The SigNoz guide to [distributed tracing](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path identification, and N+1 staircase patterns — techniques that matter precisely because the system's behavior is not visible from any single component.

Formal verification of distributed protocols is where LLMs currently fall short. A SIGOPS benchmark ([SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla)) found that leading models score near-perfectly on TLA+ syntax but only around 46% on conformance to actual implementations, because they reproduce textbook protocols rather than the specific system under test.

The deepest cross-cutting theme comes from Christopher Meiklejohn's multi-agent systems series. His [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that the CALM theorem and coordination theory from distributed systems offer untapped formalisms for structuring LLM agent interaction. His [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) closes the series by naming open problems — topology-to-reliability mapping, CRDTs for shared agent state, backpressure protocols — that are unsolved in MAS research precisely because the field is rediscovering distributed systems without the vocabulary to recognize it.
