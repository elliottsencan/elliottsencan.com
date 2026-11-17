---
title: Distributed systems
summary: >-
  Distributed systems theory underpins modern infrastructure concerns — from
  durable execution and container isolation to trace observability and network
  latency — with LLM-era multi-agent work quietly rediscovering its core
  formalisms.
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
compiled_at: '2026-11-17T01:41:51.219Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 1057
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
  cost_usd: 0.029538
---
Distributed systems is the branch of computer science concerned with how independent processes coordinate, fail, and recover across a network. The sources here approach the field from several angles, but a consistent thread runs through them: classical distributed systems problems keep resurfacing in new contexts, often without the vocabulary to name them.

Durable execution is one contemporary reframing. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps the design space into stateless functions, sessions, and actors along a behavior-state continuum, showing how platforms like Temporal and DBOS implement the same underlying coordination patterns differently. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) makes this concrete: a two-layer Lambda hierarchy checkpoints stateful CI workflows without a long-lived process, trading persistent infrastructure for durable state.

Observability tools are the runtime complement to that coordination logic. [SigNoz's trace guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) explains how distributed traces expose critical-path bottlenecks and N+1 patterns in unfamiliar codebases — the kind of analysis that only makes sense because requests cross process and service boundaries.

At the infrastructure layer, [Crawshaw's critique of cloud abstractions](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that VMs with fixed resources and slow remote block storage are the wrong foundation, suggesting that the field's dominant platform choices encode early constraints that no longer reflect hardware reality. Network behavior reinforces this: [Brooker's post on TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) documents how Nagle's algorithm interacts with delayed ACKs to silently inflate latency in datacenters, a low-level coordination failure that surfaces repeatedly in distributed services. And [Breck's analysis of performance gains](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) adds that pipeline backpressure and discrete capacity increments mean even order-of-magnitude improvements often fail to move system-level outcomes.

The multi-agent systems literature is rediscovering this terrain from an AI direction. [Meiklejohn's post on coordination](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) explicitly invokes the CALM theorem and argues that coordination structure must match task structure — a claim any distributed systems engineer would recognize. His concluding piece on open questions [names CRDTs, backpressure, and failure recovery](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) as unsolved problems in MAS, noting the field is quietly reinventing distributed systems without the vocabulary to do so.

Formal verification is another lens. [SysMoBench's LLM evaluation](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds that LLMs can produce syntactically valid TLA+ but achieve only about 46% conformance when modeling real system implementations, because they recite textbook protocols rather than capturing actual behavior. The gap between specification and implementation is a persistent distributed systems problem; LLMs make it newly measurable.

[Kubernetes tooling like Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) and [container filesystem internals](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) represent the operational layer where these abstractions are deployed and managed, connecting theoretical coordination concerns to the platform engineers who run distributed workloads day to day.
