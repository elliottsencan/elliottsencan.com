---
title: LLM agents
summary: >-
  LLM agents are language models embedded in structured harnesses that plan, use
  tools, and complete multi-step tasks autonomously; current work shows they
  require careful context and role scoping to stay reliable and low-noise at
  scale.
sources:
  - 2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us
  - 2026-05/2026-05-18t222802-raellioctowiz
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - >-
    2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got
  - >-
    2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with
  - 2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison
  - 2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos
  - >-
    2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier
  - 2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack
  - 2026-06/2026-06-11t023157-memory-design-zerostack
  - 2026-06/2026-06-11t023435-subagents-design-zerostack
compiled_at: '2026-05-20T15:00:48.039Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2344
    output_tokens: 396
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
  cost_usd: 0.012972
last_source_added: '2026-06-11T09:34:35.304Z'
---
An LLM agent pairs a language model with external tools, memory, and a control loop so it can pursue goals across multiple steps rather than answering a single prompt. Two patterns emerge from recent deployments: structured multi-agent harnesses for complex domain tasks, and role-scoped memory systems that keep individual agent sessions focused.

Cloudflare's Project Glasswing [ran Anthropic's Mythos model](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) against more than 50 internal repositories for security research. The model advanced exploit-chain construction and proof generation, but reliable, low-noise vulnerability findings only appeared once the team wrapped it in a structured multi-agent harness. Without that scaffolding, output quality degraded. The finding points to a recurring constraint: raw model capability is necessary but not sufficient; orchestration determines whether results are actionable.

Octowiz approaches the same constraint from the context side. It [stores engineering doctrine in LiteLLM Proxy memory](/reading/2026-05/2026-05-18t222802-raellioctowiz) and fetches only the relevant slice, whether planning, TDD, review, or QA, per session. Keeping context windows small and role-specific is treated as a first-class engineering concern rather than an afterthought, reducing noise from irrelevant instructions competing for attention.
