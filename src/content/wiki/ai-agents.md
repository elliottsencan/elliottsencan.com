---
title: AI agents
summary: >-
  AI agents are LLM-driven systems that act on tools and APIs; recent work
  converges on the view that reliability comes from constrained interfaces and
  decoupled architecture, not from prompting or custom orchestration.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
compiled_at: '2026-05-01T05:02:27.829Z'
compiled_with: claude-sonnet-4-6
---
An AI agent pairs a language model with a set of actions it can invoke: API calls, code execution, tool wrappers. The practical challenge is making those actions reliable and the architecture maintainable as models improve.

On the question of tooling interfaces, two sources pull in different directions. [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues teams should ship MCP tools and agent skills rather than build custom orchestration, letting frontier model providers handle the loop. [Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) pushes back: MCP imposes the same discoverability-over-efficiency tradeoff that GUIs impose on developers, and agents that can write code are better served by layered scripts and direct API calls. The disagreement is real and unresolved; the right answer likely depends on whether your agent can generate code or is restricted to predefined tool calls.

Reliability is not a prompting problem. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows that constraining what the model can see, through atomic tools, reference IDs, and unambiguous APIs, outperforms prompt engineering across three rewrites of the same agent. The interface design determines the behavior ceiling.

At the infrastructure level, Anthropic's [Managed Agents service](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, execution sandbox, and session log into independent interfaces. Decoupling these lets the harness evolve as models improve without breaking state or requiring full system rebuilds. That separation mirrors the broader principle: agents are easier to maintain when each layer has a single responsibility.

In production, the bottleneck is often not the model at all. [Mendral's CI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team), which diagnoses failures and quarantines flaky tests across hundreds of thousands of CI jobs, found that log ingestion, not AI inference, was the hardest engineering problem. Agents operating at scale inherit the data pipeline problems of any large system.
