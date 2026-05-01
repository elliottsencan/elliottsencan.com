---
title: Developer tools for AI agents
summary: >-
  The design of tools, APIs, and scaffolding for AI agents mirrors long-running
  tensions in software tooling: discoverability vs. composability, convenience
  vs. reliability, and who owns the orchestration layer.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
compiled_at: '2026-05-01T05:12:41.075Z'
compiled_with: claude-sonnet-4-6
---
MCP has become a focal point for how AI agents interact with external systems, and two competing framings have emerged around it. [Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues MCP functions like a GUI for agents: it makes tools discoverable but at the cost of composability and efficiency, which means agents capable of writing code are better served by layered scripts and direct API calls. [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) takes the opposite position on MCP's value, arguing teams should ship MCP tools and agent skills rather than build custom orchestration frameworks, letting model providers handle the orchestration loop.

Those two views agree on one thing: the orchestration layer itself is not where teams should build competitive advantage. The more durable investment is in tools that give agents accurate, platform-specific context and actions. The [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) is a concrete example of that bet, packaging Databricks-specific MCP tools and skills for coding assistants like Claude Code and Cursor.

Reliability is a separate axis from tool design. [Aiyan's agent reliability piece](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows through three rewrites of the same data engineering agent that constraining what an LLM sees, using atomic tools, reference IDs, and unambiguous APIs, outperforms prompt engineering for predictable behavior. The lesson is that the interface design of a tool shapes agent behavior more than instructions do.

At the infrastructure level, [Anthropic's Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the agent harness, the sandbox, and the session log into independent interfaces so that each can evolve without breaking the others. That separation matters because models improve faster than the scaffolding built around them.
