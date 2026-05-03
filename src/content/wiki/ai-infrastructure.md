---
title: AI infrastructure
summary: >-
  Where to place bets in the AI stack: whether to build orchestration harnesses
  or composable tool layers, and when multi-agent coordination creates more
  overhead than it resolves.
sources:
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
compiled_at: '2026-05-03T19:06:39.465Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 1281
    output_tokens: 444
    cache_creation_input_tokens: 0
    cache_read_input_tokens: 0
  model: claude-sonnet-4-6
  pricing:
    model: claude-sonnet-4-6
    input_per_million: 3
    output_per_million: 15
    cache_read_per_million: 0.3
    cache_write_5m_per_million: 3.75
    priced_at: '2026-04-30'
  cost_usd: 0.010503
---
The recurring question in AI infrastructure is where durable value actually lives. Two failure modes are worth naming: over-investing in orchestration glue that model providers will eventually obsolete, and reaching for multi-agent complexity when a single agent would suffice.

On the first point, [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom LLM orchestration harnesses decay with each model upgrade, making the team that built them pay a reinvestment tax every time frontier capabilities improve. The alternative is to ship MCP tool servers and agent skills that provide platform-specific context and actions. That layer compounds with model improvements rather than fighting them; a better Claude or GPT makes your tools more capable without requiring a rewrite of the scaffolding around them.

On the second point, [Ben Dickson at AlphaSignal](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) draws on Stanford and Google/MIT research to argue that multi-agent orchestration carries a coordination tax that is easy to underestimate. Errors can amplify up to 17x across agent handoffs, and tool-handling efficiency drops 2-6x compared to single-agent baselines. The practical implication is that multi-agent architectures need a genuine justification, not just the appearance of modularity.

Taken together, the picture is that AI infrastructure decisions should be made against a question of durability. Orchestration logic tied to a specific model version is a liability. Composable tool surfaces and lean agent topologies are assets that survive the next model release.
