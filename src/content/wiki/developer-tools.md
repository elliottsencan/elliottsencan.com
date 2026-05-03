---
title: Developer tools
summary: >-
  A cluster of tools, platforms, and patterns for building, operating, and
  extending software systems, with recent entries focused on AI-native tooling,
  agent infrastructure, and the MCP protocol as a coordination layer.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t231206-poolday
  - 2026-04/2026-04-30t231319-markdownlm
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t231511-temporal
  - 2026-04/2026-04-30t231709-conductor
  - 2026-04/2026-04-30t231745-optimal-vs-usertesting
  - 2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui
  - 2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui
compiled_at: '2026-05-03T19:05:21.873Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3128
    output_tokens: 937
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
  cost_usd: 0.023439
---
Developer tooling in 2025-2026 is splitting into two broad camps: tools that help humans write and understand code, and infrastructure that helps AI agents act reliably inside complex systems. The two camps increasingly overlap.

On the human side, Robert Nystrom's [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) remains a reference for understanding language implementation from first principles, shipping two complete interpreters in Java and C alongside prose in a single repository. Conductor takes a different angle, wrapping QuickBooks Desktop's aging qbXML and SOAP interfaces in a fully-typed Python, Node.js, and REST API so developers can skip protocol archaeology. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses distributed system reliability by persisting workflow state at every step, removing the need for manual failure-recovery logic.

On the AI-agent side, MCP has emerged as a contested abstraction. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships an MCP server and skill pack that give coding assistants like Claude Code and Cursor access to 50+ Databricks-specific tools. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) bundles MCP into a Kubernetes UI so agents can query cluster topology directly. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) serves documentation to both humans and LLMs, with MCP and llms.txt support built in.

But MCP's role is genuinely disputed. [Mad About Code](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that MCP is essentially a GUI for agents: constrained, token-expensive, and non-composable, better replaced by layered scripts and direct API access for agents that can write code. [aiyan.io](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) pushes back in practice, arguing teams should ship MCP tool servers rather than custom orchestration harnesses that rot with each model upgrade.

Reliability patterns for agent systems have also matured. Anthropic's [Managed Agents](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) post shows that decoupling the harness, session log, and sandbox cut p50 time-to-first-token by roughly 60%. A companion [aiyan.io piece](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) traces how environment design and atomic tools outperform prompt engineering across three successive agent architectures. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) extends this toward governance, enforcing architectural rules and security policies at the Git layer so agents cannot merge non-compliant code.

[Poolday](/reading/2026-04/2026-04-30t231709-conductor) demonstrates applied agent tooling in a non-code domain, using a multi-agent system to orchestrate 100+ generative models for video editing, outputting editable projects rather than static renders.
