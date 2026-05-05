---
title: AI Agents
summary: >-
  AI agents are LLM-powered systems that plan and act autonomously; current
  sources trace the architecture patterns, reliability failure modes, tooling
  conventions, and human-oversight tensions that define where the field actually
  stands.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231206-poolday
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - 2026-04/2026-04-30t231319-markdownlm
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - >-
    2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2
  - 2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6
  - 2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
  - 2026-05/2026-05-03t110355-babysitting-the-agent
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
compiled_at: '2026-05-04T03:35:30.883Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6656
    output_tokens: 1267
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
  cost_usd: 0.038973
---
An AI agent, in the practical sense most of these sources use, is an LLM-based system that issues actions, uses tools, and pursues goals across multiple steps without requiring a human to approve each one. The definition sounds simple; the engineering is not.

The architectural options range from rigid state machines to orchestrator-plus-subagents to single general-purpose agents. [One data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) walked through all three and found that environment design and atomic tool definitions outperform prompt engineering as a reliability strategy at every stage. Anthropic's own [Managed Agents service](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) formalizes this by separating the harness, session log, and sandbox into independent interfaces, cutting p50 time-to-first-token by roughly 60% and p95 by over 90%. A [GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) extends this further for multi-hour autonomous coding sessions.

Multi-agent systems add a coordination tax. [Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) shows orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, making single-agent the sensible default for most tasks. A comprehensive [eight-part MAS survey](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) maps the two research waves: 2023 coordination work (CAMEL, AutoGen, MetaGPT) and 2025 reliability work, concluding that information synthesis is the core bottleneck, not coordination. Empirical failure rates across 1,600 traces run [41 to 87%](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2), and [verification via modality shift](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) is the pattern that most reliably catches errors before they propagate.

Tooling conventions are still unsettled. One view holds that [MCP servers](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) are the right abstraction for platform-specific context and actions, letting model improvements compound rather than decay. A dissenting view calls [MCP a GUI for agents](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis): constrained, token-expensive, and non-composable, with layered scripts and API skills being preferable for code-capable agents. Context management is a recurring concern across both views; tools like [tiered markdown knowledge bases](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) and [biomimetic memory systems](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) exist precisely to reduce token waste during long sessions.

Deployed examples include [Mendral's CI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) processing 1.18 billion log lines to auto-diagnose flaky tests, [Poolday's multi-agent video editor](/reading/2026-04/2026-04-30t231206-poolday) orchestrating 100+ generative models, and [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) arming coding assistants with 50+ executable platform tools.

The human-oversight question is unresolved in both research and practice. [Lars Faye argues](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that full reliance on coding agents erodes the debugging skills needed to supervise them. [A first-person account of building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents the agent declaring work done before it actually works, repeatedly, regardless of guardrails. The open questions the MAS survey closes with, including topology-to-reliability mapping and graceful failure recovery, suggest the field needs distributed-systems theory as much as it needs better models.
