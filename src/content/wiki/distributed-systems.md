---
title: Distributed systems
summary: >-
  Distributed systems underpin cloud infrastructure, durable execution,
  multi-agent coordination, and observability tooling — and the field's core
  formalisms keep resurfacing as adjacent disciplines quietly rediscover them.
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
compiled_at: '2026-11-10T01:18:02.991Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 997
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
  cost_usd: 0.028638
---
Distributed systems problems — consensus, failure recovery, state coordination, backpressure, latency — do not stay neatly inside any one subdiscipline. Several recent sources converge on the observation that practitioners keep rediscovering classical distributed systems theory without naming it as such.

Christopher Meiklejohn's multi-agent systems series makes this explicit. The [concluding post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) argues that the MAS field is quietly reinventing distributed systems — topology-to-reliability mappings, CRDTs for shared state, failure recovery, backpressure protocols — without the vocabulary to recognize it. An [earlier installment on debate, state, and coordination](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) draws on the CALM theorem directly, arguing that coordination structure must match task structure and that distributed systems formalisms offer untapped tools for multi-agent reasoning.

Durable execution is another domain where distributed systems primitives surface under a different name. Jack Vanlightly's [taxonomy of durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) — stateless functions, sessions, and actors — maps how platforms like Temporal and DBOS handle the behavior-state continuum. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same ideas concretely: a two-layer Lambda hierarchy with checkpointing and callback-driven coordination to avoid long-lived processes, trading simplicity for the fault-tolerance guarantees that distributed state management requires.

At the infrastructure layer, the same tensions appear. David Crawshaw's [critique of cloud abstractions](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that VMs tied to fixed resources and slow remote block devices are fundamentally wrong primitives. Marc Brooker's [post on TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) is a narrower but illustrative case: Nagle's algorithm, designed for a different network era, silently kills latency in modern datacenter environments because application-layer protocols have solved the problem it was invented to address.

Observability across distributed systems is its own challenge. The [SigNoz guide to reading distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy and critical-path analysis as practical tools for understanding system behavior in unfamiliar codebases — work that becomes necessary precisely because distributed systems hide causality across service and network boundaries.

Formal specification is one attempted remedy. The [SysMoBench study](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) benchmarks LLMs on generating TLA+ specs from real system code, finding near-perfect syntax scores but only roughly 46% conformance — evidence that models recite textbook distributed protocols rather than faithfully capturing actual implementations. The gap matters because correctness in distributed systems depends on the specifics, not the archetype.

Colin Breck's [piece on performance gains that do not matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) adds a systems-thinking constraint: even large throughput improvements fail to change outcomes when pipeline backpressure or discrete capacity increments absorb the gain elsewhere. That framing applies broadly to distributed system optimization — a component cannot be tuned in isolation from the pipeline it sits inside.
