---
title: Developer tools for AI agents
summary: >-
  The current generation of agent developer tools clusters around a shared
  insight: constraining what an agent can see and do produces more reliable
  behavior than prompting it toward reliability.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
compiled_at: '2026-05-01T05:20:40.655Z'
compiled_with: claude-sonnet-4-6
---
MCP has become the default surface for exposing platform capabilities to AI agents, but its role is contested. [Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues MCP functions like a GUI for agents: it trades composability and efficiency for discoverability, which matters more for human developers than for agents that can write and execute code directly. Against that, [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) treats MCP tools as the right unit of investment precisely because they slot into existing frontier agents without requiring teams to own the orchestration loop.

The Databricks AI Dev Kit [illustrates the MCP-as-platform-extension model in practice](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit): it packages Spark, Unity Catalog, and MLflow context into MCP tools and coding-assistant skills so that Claude Code, Cursor, and Windsurf can operate inside a Databricks environment without bespoke integrations per tool.

At the infrastructure layer, Anthropic's Managed Agents work [decouples the agent harness, the execution sandbox, and the session log into independent interfaces](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands), so the orchestration code can evolve as models improve without breaking state or replaying history. That separation echoes the reliability argument made by [Aiyan's data engineering rewrites](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it): atomic tools, reference IDs, and narrow APIs reduce what the model has to reason about, and that reduction does more for output quality than prompt engineering.

The tension running through all of this is between discoverability and control. MCP tools make capabilities findable; layered scripts and direct API calls make them precise. The Mohan and Aiyan positions are not simply opposed, they apply at different points in an agent's maturity: discoverability first, then tighten the surface area as failure modes become clear.
