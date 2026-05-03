---
title: LLM Agents
summary: >-
  LLM agents are autonomous systems where language models plan, execute, and
  coordinate actions across tools and other agents; the field is advancing fast
  but failure rates remain high and human oversight stays non-negotiable.
sources:
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - 2026-04/2026-04-30t231206-poolday
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
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
  - 2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
  - 2026-05/2026-05-03t110355-babysitting-the-agent
compiled_at: '2026-05-03T19:06:30.317Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3838
    output_tokens: 1051
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
  cost_usd: 0.027279
---
An LLM agent is a language model operating with tools, memory, and some degree of autonomous execution rather than just answering prompts. Multi-agent systems extend this by coordinating multiple specialized models across tasks. The taxonomy is now reasonably settled: [Meiklejohn's vocabulary survey](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) maps agent types, coordination structures, and internal components across three major surveys, giving a shared frame for comparing work in the field.

The 2023 wave of research, including CAMEL, ChatDev, MetaGPT, AutoGen, and Generative Agents, asked whether agents could coordinate at all. [Meiklejohn's Wave 1 survey](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) notes that all five papers shared a structural flaw: treating errors as termination conditions rather than recoverable system state. The 2025 reliability wave shifted focus from coordination to failure. [Wave 2 research](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) found failure rates of 41 to 87 percent across 1,600 traces and identified information synthesis, not coordination, as the core bottleneck. Benchmarks have not kept pace; [Meiklejohn's benchmarks piece](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) shows that most evaluation frameworks were designed for single agents and cannot measure coordination quality or communication overhead.

On the architecture side, practitioners have converged on planner-generator-evaluator patterns. [Anthropic's harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired three-agent setup that overcomes context anxiety and self-evaluation bias during multi-hour coding sessions. The [orchestrator-supaconductor plugin](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) takes this further, adding a virtual board-of-directors review step for high-stakes architectural decisions. [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) applies multi-agent orchestration to video production, coordinating over 100 generative models end-to-end.

A recurring debate is where to invest engineering effort. [Aiyan argues](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) that custom orchestration harnesses decay with every model upgrade and that teams should ship MCP tool servers instead, letting frontier model improvements compound rather than require rewrites. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) is a concrete example of this approach, exposing 50-plus platform-specific tools via MCP for coding agents to consume. The counterargument comes from [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap), who contends that heavy reliance on agentic workflows erodes the developer judgment needed to supervise those same agents.

That supervision cost is real. [Meiklejohn's field report](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) on building a social app with Claude describes agents consistently declaring work done before anything actually functions. The open questions in the field, including topology-to-reliability mapping and graceful failure recovery, point toward distributed-systems theory as the next source of progress, per [Meiklejohn's closing essay](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).
