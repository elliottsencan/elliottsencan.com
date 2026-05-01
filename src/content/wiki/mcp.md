---
title: Model Context Protocol (MCP)
summary: >-
  MCP is a standard for exposing platform-specific tools and context to AI
  agents, letting teams ship capabilities that plug into frontier models rather
  than building custom orchestration infrastructure.
sources:
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
compiled_at: 2026-05-01T05:35:16.661Z
compiled_with: claude-sonnet-4-6
---
MCP (Model Context Protocol) is a convention for packaging tools, actions, and platform-specific context in a form that [AI agents](/wiki/ai-agents) can consume directly. Instead of each team building its own orchestration layer to connect LLMs to their systems, they ship MCP tools that existing agents pick up and use.

[The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are not a durable advantage. Model providers already handle the orchestration loop; the real leverage is in the tools and skills that give agents platform-specific knowledge and actions. MCP is the mechanism that makes those tools portable across agents and environments.

The Databricks AI Dev Kit ([databricks-solutions/ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit)) shows what this looks like in practice. The kit packages Databricks-specific skills as MCP tools that drop into Claude Code, Cursor, Windsurf, and similar coding assistants. Teams working with Spark, Unity Catalog, MLflow, or Databricks Apps get those capabilities without writing integration glue for each assistant separately.

Together, the two sources frame MCP less as a protocol curiosity and more as a production strategy: define capabilities once, distribute them to wherever agents are already running, and let the model handle reasoning about when and how to use them.
