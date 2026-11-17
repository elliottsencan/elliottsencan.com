---
title: Observability
summary: >-
  Observability spans infrastructure visibility, distributed tracing, and
  agentic feedback loops, with consistent pressure to surface the right signal
  to the right audience rather than simply collecting more data.
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
compiled_at: '2026-11-17T01:46:50.253Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3801
    output_tokens: 813
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
  cost_usd: 0.023598
---
Observability is the practice of making system internals legible from external outputs. The concept spans several distinct but related problem spaces: cluster-level infrastructure visibility, distributed request tracing, and feedback signals for agentic systems.

At the infrastructure layer, the core complaint is tool sprawl. Platform teams running Kubernetes typically juggle kubectl, Helm tooling, GitOps dashboards, and separate audit tooling simultaneously [Radar HQ](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui). Tools like [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) attempt to collapse that surface into a single binary with unified topology, live traffic, and security checks.

At the request level, distributed traces are the primary artifact. Reading them in unfamiliar codebases requires understanding span anatomy and recognizing common failure patterns like N+1 staircases before tracing back to the responsible code [SigNoz](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code). The unwritten rule that follows: when something goes wrong in production, roll back first and use traces to understand why afterward [manager.dev](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering).

For agentic systems, trace-based observability is necessary but not sufficient. Harrison Chase argues that attaching feedback signals to traces, whether user ratings, indirect behavioral signals, LLM-as-judge verdicts, or deterministic rules, is what converts raw observability into a learning loop [LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). The AI control plane framing from Speakeasy extends this further, treating observability as one pillar of a broader governance layer alongside identity, policy enforcement, and tool routing [Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors).

A recurring tension across sources is the gap between data collection and actionable signal. Abby Malson argues that on-call burnout follows directly from systems designed to maximize data output without accounting for human attention limits, proposing push-based architectures that surface only relevant context [Ergonaut Automation Labs](/reading/2026-05/2026-05-19t134831-finite-attention-why-burnout-isnt-your-fault-and-how). Netflix's in-house LLM serving stack treats deployment-level observability as a first-class concern when running vLLM at scale [Netflix TechBlog](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). Security tooling adds another constraint: observable behavior must fail loudly when a tool overclaims certainty rather than silently returning a wrong answer [Emphere](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people).
