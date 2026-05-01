---
title: Model Context Protocol (MCP)
summary: >-
  MCP is a standard for exposing platform-specific tools and context to AI
  agents, letting teams ship capabilities that frontier models can use directly
  rather than building custom orchestration layers.
sources:
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
related_concepts:
  - ai-agents
  - developer-tools
  - software-engineering
compiled_at: '2026-05-01T04:13:50.840Z'
compiled_with: claude-sonnet-4-6
---
MCP (Model Context Protocol) is a convention for packaging tools, context, and actions in a form that AI coding assistants and agent runtimes can consume without custom integration work. The practical case for it comes from two directions: architectural and applied.

On the architectural side, [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom LLM orchestration frameworks are not defensible and that teams should instead ship MCP tools and agent skills that surface platform-specific context and actions to existing frontier agents. The orchestration loop itself is increasingly handled by model providers, so the durable work is in the tools, not the scaffolding around them.

On the applied side, [databricks-solutions/ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutions-ai-dev-kit) is a concrete example: a toolkit that gives coding assistants like Claude Code, Cursor, and Windsurf Databricks-specific MCP tools covering Spark, Unity Catalog, MLflow, and Databricks Apps. It treats MCP as the delivery mechanism for platform expertise that would otherwise require manual context-stuffing or bespoke connectors.

Together these sources frame MCP as infrastructure for capability distribution. Platforms expose MCP tools; agents consume them; teams avoid rebuilding orchestration from scratch.
