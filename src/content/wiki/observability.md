---
title: Observability
summary: >-
  Observability spans infrastructure, distributed systems, and AI agents — the
  practice of making system internals legible through traces, metrics, and
  feedback so engineers can reason about and improve what they cannot directly
  see.
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
  - 2026-06/2026-06-23t232444-repowise-devrepowise
  - 2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix
compiled_at: '2026-11-24T04:00:38.693Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3801
    output_tokens: 704
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
  cost_usd: 0.021963
---
Observability is the discipline of making a running system's internal state readable from its outputs. At the infrastructure layer, tools like Radar consolidate that visibility: [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) replaces the typical patchwork of kubectl and five other tools with a single binary that surfaces topology, events, Helm state, and audit results across multiple clusters. The goal is not feature completeness but eliminating the switching cost between fragmented views.

At the distributed systems layer, observability means traces. [SigNoz's guide to reading distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and common patterns like N+1 staircases — the basic grammar engineers need to debug code they didn't write. Traces tell you what happened and in what order; they don't by themselves tell you why something went wrong or how to fix it.

For AI agents, that gap is sharper. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues traces alone don't improve agentic systems — attaching feedback signals (user ratings, indirect behavior signals, LLM-as-judge scores, deterministic rules) to those traces is what turns observability into a learning loop. The [AI control plane framing from Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) extends this further, treating observability as one pillar of enterprise governance alongside identity and policy enforcement across every agent and system.

A recurring tension is the human cost of too much data. [Abby Malson](/reading/2026-05/2026-05-19t134831-finite-attention-why-burnout-isnt-your-fault-and-how) argues that on-call burnout comes from systems designed to maximize data output without accounting for attention limits — observability tooling that alerts on everything effectively alerts on nothing. The implication is that good observability is as much about signal selection and delivery as it is about data collection.

That selectivity matters for security tooling too. [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) treats loud failure on overclaimed certainty as a correctness property — their eBPF-based container scanner is designed to abstain rather than misattribute. Observability that surfaces false confidence is worse than no observability.
