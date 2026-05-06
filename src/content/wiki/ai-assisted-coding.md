---
title: AI-assisted coding
summary: >-
  AI coding assistants accelerate development but introduce tradeoffs around
  skill atrophy, codebase design, verification, and security that shape how much
  value they actually deliver.
sources:
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - 2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6
  - 2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
aliases:
  - ai-coding-assistants
compiled_at: '2026-05-06T04:00:39.071Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3515
    output_tokens: 744
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
  cost_usd: 0.021705
---
AI coding assistants, ranging from inline completers to fully autonomous agents, are now capable of planning, generating, and evaluating code across multi-hour sessions. Anthropic's own engineering describes a GAN-inspired planner-generator-evaluator architecture that sustains coherent full-stack work without collapsing under context pressure [harness design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). Tools like Claude Code and Cursor have accumulated enough adoption that purpose-built extension layers now exist: Databricks ships an MCP server and skill pack that grounds these assistants in verified Spark and Databricks patterns [ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit), and community plugins can turn a single prompt into a multi-agent pipeline with parallel execution and architectural review boards [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor).

The capability gains come with costs. Lars Faye argues that leaning on agents for execution erodes exactly the critical-thinking and debugging skills a developer needs to supervise those agents, creating a compounding liability alongside vendor lock-in and unpredictable token costs [agentic coding trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Codebase structure also matters: AI tools perform worse against shallow, leaky abstractions because they force the model to reason across too many layers simultaneously, while deep modules with narrow interfaces keep reasoning tractable [deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules).

Verification is an open problem. Multi-agent systems research finds that modality shift, checking output in a different representation than it was produced in, separates meaningful structural gates from weak self-evaluation [verification patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). Benchmarks used to evaluate these systems were mostly designed for single agents and fail to measure coordination overhead or failure recovery, making published results from frameworks like ChatDev and MetaGPT difficult to compare [benchmarks](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7).

Security is an emerging surface. The TeamPCP supply-chain attack poisoned SAP-ecosystem npm packages with a payload that specifically abused Claude Code and VS Code configuration as persistence vectors, illustrating that the tooling layer around AI assistants is now a target [npm supply chain](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing).
