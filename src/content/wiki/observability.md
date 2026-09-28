---
title: Observability
summary: >-
  Observability spans distributed tracing, feedback loops, and infrastructure
  visibility — the collective challenge of understanding what systems are
  actually doing, at runtime, under real conditions.
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
compiled_at: '2026-09-28T23:08:51.256Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3801
    output_tokens: 731
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
  cost_usd: 0.022368
---
Observability means more than collecting metrics. It means being able to ask an arbitrary question about system state and get a useful answer, whether that system is a Kubernetes cluster, an LLM-powered agent, or a production service under load.

For infrastructure teams, the problem is tool fragmentation. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) makes the case that platform engineers typically juggle kubectl and five or more separate tools to get a coherent picture of cluster state. Consolidating topology, events, Helm, GitOps, and image inspection into a single interface is itself an observability improvement, not just a convenience one.

At the code level, distributed traces are the primary artifact. [SigNoz](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) walks through span anatomy, critical-path analysis, and common pathological patterns like N+1 staircases, which are often invisible without tracing even to engineers who wrote the code. The article is especially useful as a reminder that traces are navigational: you start from an observed symptom and trace back to a responsible span and then to code.

For agentic systems, traces are necessary but not sufficient. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces without attached feedback signals produce forensics, not learning. Connecting user ratings, indirect behavior signals, LLM-as-judge scores, and deterministic rules to trace data is what turns an observability system into a feedback loop across model, harness, and context layers.

There is also a human dimension. [Abby Malson](/reading/2026-05/2026-05-19t134831-finite-attention-why-burnout-isnt-your-fault-and-how) argues that systems designed to maximize data output without accounting for human attention are a structural cause of on-call burnout. Observability tooling that surfaces everything is not observability that works. The better design is push-based and context-filtered.

At the enterprise governance layer, observability is part of what [Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) calls the AI control plane: a cross-cutting requirement alongside identity, policy enforcement, and tool routing. You cannot audit or govern AI agents you cannot trace. [Unwritten engineering laws](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) reinforce this from the incident side: roll back before debugging, treat every external dependency as a future outage. Both rules presuppose that you can see what is happening in the first place.
