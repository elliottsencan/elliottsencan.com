---
title: AI agents
summary: >-
  Autonomous AI agents that plan and execute multi-step tasks raise consistent
  architectural questions across tool design, orchestration topology,
  verification, and context management that no single pattern resolves cleanly.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231206-poolday
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - 2026-04/2026-04-30t231319-markdownlm
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
compiled_at: 2026-05-03T19:04:54.975Z
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2713
    output_tokens: 961
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
  cost_usd: 0.022554
---
An AI agent is a system that takes a goal and autonomously executes the steps needed to reach it, [calling tools, spawning sub-processes, and managing state across multiple turns](/wiki/agentic-workflows). The design choices made at each layer determine whether that autonomy is reliable or fragile.

Tool design is one of the first places things go wrong. [Mohan at Mad About Code](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that [MCP tool definitions loaded into context each session](/wiki/mcp) are the agent equivalent of a GUI: constrained, token-expensive, and non-composable. Agents that can write code are better served by layered scripts and API skills built once and reused. The [LostWarrior knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) project extends this logic to context itself, [organizing project knowledge as tiered markdown with a machine-readable manifest so agents navigate without burning excess tokens](/wiki/context-engineering). [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules into a living knowledge base agents query at runtime, with Git-layer enforcement to block non-compliant code before it merges.

Orchestration topology is where single-agent and multi-agent approaches diverge most sharply. [Dickson via AlphaSignal](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) cites Stanford and Google/MIT research showing that multi-agent coordination introduces a hidden tax that can amplify errors up to 17x and cut tool-handling efficiency by 2-6x, making single-agent the default for most tasks. But the [aiyan.io engineering piece](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) found the opposite trajectory in practice: a data engineering agent evolved through a rigid state machine and an orchestrator with sub-agents before settling on a single general-purpose agent with atomic tools, where environment design mattered more than prompt tuning. [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) and the [orchestrator-supaconductor plugin](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) both commit to multi-agent pipelines for tasks that are genuinely parallel, video editing and software planning respectively.

At scale, [infrastructure separates from intelligence](/wiki/ai-infrastructure). Anthropic's [Managed Agents service](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the agent harness, session log, and sandbox into independent interfaces, cutting p50 time-to-first-token by roughly 60% and p95 by over 90%. [Mendral's CI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) processed over a billion log lines weekly to [auto-diagnose flaky tests and open fix PRs](/wiki/continuous-integration), finding that log ingestion speed and routing mattered more than the AI diagnosis itself.

Verification cuts across all of these. [Meiklejohn's survey](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) identifies modality shift as the key variable: checking work in a different representation than it was produced in separates weak self-verification from structural gates that actually catch errors. Without that, an agent checking its own output in the same medium it used to produce it offers minimal reliability guarantees.
