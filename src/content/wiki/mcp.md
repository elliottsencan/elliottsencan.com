---
title: Model Context Protocol (MCP)
summary: >-
  MCP is a standard for exposing platform-specific tools and context to frontier
  AI agents, letting teams ship capabilities without building or maintaining
  custom orchestration frameworks.
sources:
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
compiled_at: '2026-05-01T05:03:40.146Z'
compiled_with: claude-sonnet-4-6
---
MCP (Model Context Protocol) is a convention for packaging tools, actions, and context that AI agents can call at runtime. Rather than embedding platform knowledge inside a bespoke orchestration layer, a team ships an MCP server that exposes its capabilities, and any compatible agent can pick them up.

[The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues directly from this: the orchestration loop is not defensible because model providers keep improving it. The durable bet is building MCP tools and agent skills that carry platform-specific context and actions, letting the frontier model handle coordination. The strategic implication is that engineering time spent maintaining a custom orchestration framework is opportunity cost against shipping tools that actually reflect proprietary knowledge.

The [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) is a concrete instance of that pattern. It packages Databricks-specific skills, MCP tools, and a visual builder into a kit that plugs directly into Claude Code, Cursor, Windsurf, and similar coding assistants. The Spark, Unity Catalog, and MLflow surface areas get exposed as callable tools rather than being baked into any single agent product.

Together the two sources describe both the why and a working example of the how: MCP as the interface layer between domain expertise and general-purpose agents.
