---
title: AI agents
summary: >-
  AI agents are LLM-driven systems that take autonomous actions; current
  engineering practice centers on how to structure their tools, constrain their
  inputs, and separate orchestration concerns to get reliable behavior at scale.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
compiled_at: '2026-05-01T05:20:28.127Z'
compiled_with: claude-sonnet-4-6
---
An AI agent pairs a language model with the ability to call tools or execute actions across sessions. The engineering questions that follow from that basic setup are: what should the agent be allowed to see, what should it be allowed to do, and who owns the loop that connects those two things.

On tool design, [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) makes the case that prompt engineering is the wrong lever for reliability. Constraining what an LLM can see, through atomic tools, reference IDs, and unambiguous APIs, produces more predictable behavior than better instructions. That finding sits alongside a debate about MCP as a tool-delivery mechanism. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues teams should ship MCP tools and agent skills rather than build custom orchestration, letting frontier model providers own the loop. [Your Agent Loves MCP as Much as You Love GUIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) pushes back: MCP trades composability and efficiency for discoverability the same way GUIs do, and agents capable of writing code are better served by layered scripts and direct API calls.

On architecture, [Anthropic's Managed Agents write-up](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the harness, sandbox, and session log into independent interfaces so the orchestration layer can evolve as models improve without breaking state. That separation of brain from hands is a concrete answer to the orchestration ownership question.

Agents are also moving into operational infrastructure. [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) describes an AI agent that diagnoses CI failures and quarantines flaky tests across nearly 600,000 jobs in a week, with the observation that log ingestion rather than the AI itself is the harder engineering problem. That points to a pattern across these sources: the model is rarely the bottleneck; the plumbing around it is.
