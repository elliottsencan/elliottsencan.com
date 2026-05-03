---
title: AI-assisted coding
summary: >-
  Using AI to write, plan, or evaluate code, from autocomplete to fully
  autonomous multi-agent pipelines, with ongoing debate about how much developer
  involvement those workflows demand.
sources:
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
compiled_at: '2026-05-03T19:07:46.332Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 1450
    output_tokens: 416
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
  cost_usd: 0.01059
---
AI-assisted coding now spans a wide range from suggestion-level autocomplete to multi-hour autonomous pipelines. At the agentic end, architectures like the planner-generator-evaluator model described by [Anthropic engineering](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) split work across specialized agents to sidestep context-window limits and self-evaluation bias, producing full-stack applications with minimal human intervention. The [orchestrator-supaconductor plugin](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) takes a similar direction, routing a single natural-language command through planning, parallel execution, quality evaluation, and a virtual board of reviewers for high-stakes architectural choices.

The more automation these systems offer, the sharper the question of what the developer is actually doing. [Lars Faye argues](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that full reliance on agents is self-undermining: the critical thinking and debugging skills needed to supervise an agent are the same ones that atrophy when you stop writing code yourself. Vendor lock-in and unpredictable token costs compound that risk. The Anthropic piece does not directly address this paradox, focusing instead on architecture for reliability, but the two concerns sit in real tension. A pipeline designed to run autonomously for hours assumes the developer can validate its output, which requires exactly the judgment that over-reliance on such pipelines erodes.
