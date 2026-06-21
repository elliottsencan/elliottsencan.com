---
title: Observability
summary: >-
  Observability spans infrastructure, distributed systems, and AI agents —
  moving from raw data collection toward actionable feedback loops, human-scale
  signal filtering, and the ability to diagnose unfamiliar systems under
  pressure.
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
compiled_at: '2026-06-21T20:20:37.825Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3500
    output_tokens: 746
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
  cost_usd: 0.02169
---
Observability is the practice of making a running system legible from the outside: understanding what it is doing, why, and where it is failing, without necessarily having written the code. In infrastructure contexts, this means unifying signals that are currently spread across many tools. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) is built explicitly around this problem, consolidating topology, events, Helm state, GitOps, and audit logs that platform teams typically chase across kubectl and five other tools.

For distributed systems, observability centers on traces. [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) walks through how to read spans, identify critical paths, and spot pathological patterns like N+1 staircases in code you did not write, which is usually the real-world condition.

For AI agents, observability takes on a different character. Traces are necessary but not sufficient. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces only become useful when feedback signals are attached to them: user ratings, indirect behavioral signals, LLM-as-judge scores, and deterministic rules. Without feedback, you have a log; with it, you have a learning loop. The [AI control plane architecture](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) from Speakeasy frames observability as a governance requirement, routing and auditing every agent action across identity and policy layers.

A recurring concern across sources is that more data does not equal better observability. [Abby Malson](/reading/2026-05/2026-05-19t134831-finite-attention-why-burnout-isnt-your-fault-and-how) argues that systems optimized for data output without attention to human cognitive limits cause on-call burnout, and that push-based, context-filtered alerting is the corrective. The point generalizes: observability that floods rather than filters is counterproductive. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) reinforces this from a production-incident angle, noting that the discipline of rolling back before debugging presupposes you can actually see what changed.

Finally, observability infrastructure itself needs testing. [Emphere](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) describes using red runs that prove their container security tooling fails loudly rather than silently overclaims, a principle that applies to any observability layer where false confidence is worse than acknowledged uncertainty.
