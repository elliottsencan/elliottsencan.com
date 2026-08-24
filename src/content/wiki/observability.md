---
title: Observability
summary: >-
  Observability spans infrastructure visibility, distributed tracing, and
  agentic feedback loops, with sources pushing beyond raw data collection toward
  systems that surface actionable signals without overwhelming the people or
  agents reading them.
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
compiled_at: '2026-08-24T18:51:31.130Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3801
    output_tokens: 924
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
  cost_usd: 0.025263
---
Observability is not just about collecting data. It is about surfacing the right information at the right level of abstraction so that something, human or agent, can act on it.

At the infrastructure layer, tools like [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) address the fragmentation problem directly: platform teams typically stitch together kubectl and several other tools to get a picture of what is running, where, and whether it is healthy. Radar consolidates topology, events, Helm, GitOps, and security checks into a single binary, making the cluster's state legible without cloud account dependencies. This is a design argument as much as a tooling argument: unified visibility beats a patchwork of purpose-built CLIs.

At the request level, distributed tracing is the primary instrument. [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers the mechanics of reading traces in unfamiliar codebases: span anatomy, critical-path analysis, and recognizing patterns like N+1 staircases that indicate structural problems rather than one-off slowness. The key skill is tracing back from a symptom in the trace to the responsible code, not just confirming that something was slow.

For agentic systems, traces are necessary but not sufficient. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces without attached feedback signals are dead ends. User ratings, indirect behavioral signals, LLM-as-judge outputs, and deterministic rules need to be linked to trace data to create a learning loop across model, harness, and context layers. Observability becomes the instrumentation layer for continuous improvement, not just diagnosis.

The AI control plane framing from [Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) extends this further: enterprise deployments need observability unified across every agent and system, alongside identity and policy enforcement. Without that unified view, governance becomes guesswork.

A persistent tension runs through several sources: more data does not equal better observability. [Abby Malson](/reading/2026-05/2026-05-19t134831-finite-attention-why-burnout-isnt-your-fault-and-how) argues that on-call burnout stems from systems designed to maximize data output without accounting for human attention limits. The same critique applies to any observability system that floods operators with undifferentiated signals. Her proposed fix, a push-based architecture that surfaces only relevant context when needed, is a design principle as much as an implementation suggestion.

[Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) makes a related point from incident experience: rollback before debugging. That heuristic only works if you can see quickly what changed and what the system's current state is. Observability is the precondition for that kind of fast, safe incident response.

Security tooling adds another dimension. [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) treats certainty itself as something to observe: their system must fail loudly when it overclaims, such as attributing an import in a multiprocess container instead of abstaining. Observability here means knowing the limits of what the system knows, not just what it can see.
