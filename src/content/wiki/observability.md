---
title: Observability
summary: >-
  Observability is the practice of making system internals legible through
  telemetry, traces, and feedback signals — spanning Kubernetes clusters,
  distributed services, and AI agents.
sources:
  - 2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui
  - 2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui
  - 2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors
  - >-
    2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning
  - >-
    2026-05/2026-05-19t134831-finite-attention-why-burnout-isnt-your-fault-and-how
  - >-
    2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got
  - 2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering
  - >-
    2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code
  - 2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people
compiled_at: '2026-06-21T18:37:04.208Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3500
    output_tokens: 699
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
  cost_usd: 0.020985
---
Observability spans a wide range of system types, but a consistent thread runs across all of them: collecting data is not enough. The data has to be acted on, and ideally fed back into the system to improve it.

At the infrastructure layer, tools like [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) address observability by consolidating what platform teams typically spread across kubectl and several other tools — topology, events, Helm, GitOps, image inspection, and audits — into a single interface. The problem being solved is not a lack of data but a lack of coherence across it.

For distributed services, distributed traces are the primary artifact. [SigNoz's guide to reading traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers how to work with spans in unfamiliar codebases: reading critical paths, spotting N+1 staircases, and tracing a span back to the code that produced it. Traces make latency and failure legible across service boundaries in a way logs alone cannot.

For AI agents, [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces without feedback signals are observability without leverage. Attaching user ratings, indirect behavioral signals, LLM-as-judge scores, and deterministic rule outputs to traces is what turns a record of what happened into a mechanism for improving what happens next. The [AI control plane framing from Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) places observability inside a broader governance layer for agents, alongside identity and policy enforcement.

A quieter but important argument comes from [Abby Malson's piece on on-call burnout](/reading/2026-05/2026-05-19t134831-finite-attention-why-burnout-isnt-your-fault-and-how): systems optimized for data output without accounting for human attention create their own kind of failure. The volume of observability signals can itself become the problem, which is why push-based filtering and relevance-surfacing matter as much as collection.

[Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) makes a related point from incident experience: the instinct to debug before rolling back is a failure of observability discipline. Having enough signal to know something is wrong is necessary but not sufficient — the operational response has to be wired to the signal.
