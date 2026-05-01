---
title: Developer tools for AI agents
summary: >-
  The current wave of AI agent tooling centers on how to structure interfaces,
  APIs, and sandboxes so that agents behave reliably, with MCP emerging as a key
  but contested abstraction layer.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
related_concepts:
  - ai-agents
  - mcp
  - software-engineering
compiled_at: '2026-05-01T04:13:16.187Z'
compiled_with: claude-sonnet-4-6
---
The question running through recent writing on this subject is not whether to build tools for AI agents, but how to structure those tools so agents can use them without accumulating errors or requiring constant prompt engineering.

[Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) draws a pointed analogy: MCP tools constrain agents the way GUIs constrain developers, trading composability for discoverability. Agents that can write code are often better served by layered scripts and direct API calls than by MCP wrappers. The abstraction is convenient but lossy.

[Aiyan's piece on orchestration](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) takes the opposite angle on MCP: rather than building custom orchestration frameworks, teams should ship MCP tools and agent skills that expose platform-specific context and actions, leaving the orchestration loop to frontier model providers. The argument is about where to concentrate engineering effort, not about MCP's theoretical limits.

The practical tension between these two positions gets some resolution in [Aiyan's reliability piece](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it), which shows through three rewrites of a data engineering agent that constraining what an LLM can see, through atomic tools, reference IDs, and unambiguous APIs, produces more reliable behavior than prompt engineering. The implication is that tool design is load-bearing regardless of which abstraction layer you choose.

[Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) is a concrete instantiation of this approach: a toolkit that gives coding assistants like Claude Code and Cursor Databricks-specific MCP tools and skills for Spark, Unity Catalog, and MLflow, plus a visual builder for constructing those integrations.

At the infrastructure level, [Anthropic's Managed Agents write-up](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) describes separating the agent harness, execution sandbox, and session log into independent interfaces so the system can absorb model improvements without breaking state. That separation is itself a form of tool design, making the harness a swappable component rather than a monolith.
