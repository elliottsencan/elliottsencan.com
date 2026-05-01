---
title: AI agents
summary: >-
  AI agents are LLM-driven systems that take actions on behalf of users; recent
  writing converges on the idea that reliability comes from structural
  constraints on what the model can see and do, not from better prompts.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
related_concepts:
  - mcp
  - developer-tools
  - software-engineering
compiled_at: '2026-05-01T04:13:03.090Z'
compiled_with: claude-sonnet-4-6
---
An AI agent pairs an LLM with the ability to call tools, write code, or take multi-step actions in the world. The interesting engineering questions are about architecture: how to structure the boundary between the model and its environment, and where to invest building effort.

Two pieces from aiyan.io make related arguments about where that investment belongs. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are not defensible and that teams should instead ship MCP tools and agent skills that give frontier models platform-specific context, letting model providers own the orchestration loop. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) extends this: three rewrites of a data engineering agent show that atomic tools, reference IDs, and unambiguous APIs produce more reliable behavior than prompt engineering does. The structural constraint on what the model can see matters more than what the model is told.

On the infrastructure side, Anthropic's [Managed Agents post](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, sandbox, and session log into independent interfaces so the harness can evolve as models improve without losing state. Decoupling brain from hands is the same principle applied at the service level.

The MCP question cuts across these pieces. [Mad About Code](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) pushes back on MCP as a general solution: MCP constrains agents the way GUIs constrain developers, trading composability for discoverability, and agents capable of writing code are better served by layered scripts and direct API calls. That sits in tension with the aiyan.io recommendation to invest in MCP tooling, though the disagreement may partly be about agent capability: the Mad About Code critique applies most clearly to code-capable agents, while the orchestration argument is about where teams spend engineering time regardless of tool protocol.
