---
title: Model Context Protocol (MCP)
summary: >-
  MCP is a standard for exposing platform-specific tools and context to frontier
  AI agents, letting teams ship capabilities without building or owning the
  orchestration layer themselves.
sources:
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
compiled_at: '2026-05-01T05:13:43.348Z'
compiled_with: claude-sonnet-4-6
---
MCP (Model Context Protocol) is a convention for packaging tools, actions, and platform context in a form that LLM-based agents can consume directly. Rather than each team constructing its own orchestration framework around a language model, they publish MCP tools that slot into whatever agent runtime the user is already running.

[The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) makes the case that custom orchestration is a commodity: model providers are converging on capable, general-purpose agent loops, and the real leverage sits in the tools and domain knowledge you expose to those loops. Shipping MCP tools instead of owning the orchestration means you stop maintaining infrastructure that will be outpaced by frontier providers and start building the platform-specific surface area that actually differentiates you.

That pattern appears in practice with the [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit), which packages Databricks-specific skills and MCP tools for coding assistants like Claude Code, Cursor, and Windsurf. Rather than requiring developers to learn Spark or Unity Catalog APIs from scratch, the kit arms existing agents with the context they need to generate correct Databricks code. The orchestration stays with the coding assistant; Databricks contributes the domain layer.

Taken together, the pattern is consistent: MCP shifts the question from "how do we build an agent" to "what tools should our platform expose to agents that already exist."
