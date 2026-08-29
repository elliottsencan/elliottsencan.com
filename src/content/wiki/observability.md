---
title: Observability
summary: >-
  Observability spans from distributed trace analysis and Kubernetes visibility
  to agentic feedback loops, covering both the tooling that exposes system
  internals and the human cost of acting on what that data reveals.
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
compiled_at: '2026-08-29T20:19:58.503Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3801
    output_tokens: 901
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
  cost_usd: 0.024918
---
Observability is the property of a system that lets you answer questions about its internal state from its external outputs. In practice, that means traces, metrics, events, and logs, plus the tooling and workflows for acting on them.

Distributed traces are the foundational artifact. [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) walks through span anatomy, critical-path analysis, and common pathological patterns like N+1 staircases, emphasizing that traces are navigable even in codebases you didn't write, provided you know how to read span timing and parent-child relationships. The discipline compounds with scale: Netflix built a full in-house LLM serving stack partly because it needed observability control it couldn't get from third-party providers, with deployment strategies and batching behavior it could actually inspect [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix).

At the Kubernetes layer, the observability problem is fragmentation. Platform teams typically stitch together kubectl and several other tools to get a coherent picture of cluster state. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) consolidates topology, events, Helm, GitOps, image inspection, and security audits into a single binary, reducing the context-switching that obscures what is actually happening across multiple clusters.

For agentic systems, traces alone are insufficient. Harrison Chase argues that attaching structured feedback signals (user ratings, indirect behavioral signals, LLM-as-judge scores, deterministic rules) to traces is what converts observability into a learning loop [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Without feedback, you can see what happened but not whether it was correct. A related critique applies to production agentic analytics more broadly: high accuracy figures often depend on months of data engineering work that most teams cannot replicate, making raw observability data misleading without the surrounding infrastructure [Anthropic Agentic Analytics](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got).

The human side of observability is underexamined. Systems designed to maximize data output, without filtering for relevance, shift cognitive load onto on-call engineers. [Finite Attention](/reading/2026-05/2026-05-19t134831-finite-attention-why-burnout-isnt-your-fault-and-how) frames this as a design failure: alert fatigue and burnout are products of push-everything architectures that ignore human attention limits. One counter-proposal is a push-based, multi-bot model that surfaces only relevant context at the right moment.

Good observability also requires that the tools producing signals are themselves trustworthy. Emphere's testing approach for their container security tool requires red runs that prove the system fails loudly when it would otherwise overclaim certainty, such as misattributing imports in multiprocess containers [Testing a Security Tool Like It Can Hurt People](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people). An observability system that silently lies about its own confidence is worse than no observability at all.
