---
title: LLM orchestration
summary: >-
  The layer of logic that sequences, routes, and coordinates LLM calls —
  spanning harness design, multi-agent coordination, and model routing — and
  whose architecture determines whether agents remain reliable, maintainable,
  and human-legible at scale.
sources:
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - >-
    2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - 2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors
  - 2026-05/2026-05-18t222802-raellioctowiz
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - 2026-06/2026-06-14t094245-agentswarms
  - 2026-06/2026-06-21t112220-agentic-engineering
  - 2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router
  - >-
    2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences
  - 2026-06/2026-06-23t161552-the-coming-loop
  - 2026-06/2026-06-25t195020-strands-agents
  - 2026-07/2026-07-02t052125-jangles-bytepythia
compiled_at: '2026-07-06T00:17:03.571Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5866
    output_tokens: 1195
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
  cost_usd: 0.035523
---
LLM orchestration covers every mechanism that decides when a model call happens, what context it receives, how its output feeds into the next step, and which model handles the request at all. The sources here span three overlapping problems: harness design for long-running agents, multi-agent coordination topology, and request-level model routing.

On harness design, Anthropic has published two detailed accounts. [Scaling Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) describes a hosted architecture that separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve. [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent design, an initializer and an incremental coder, that persists progress across context windows via a shared file. Both pieces treat the harness as a first-class engineering artifact rather than scaffolding to discard once prompts get good enough. [Harness Design for Long-Running Application Development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) extends this with a GAN-inspired planner-generator-evaluator structure aimed at defeating context anxiety and self-evaluation bias.

The reliability question is where sources converge most sharply. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces one team's path through three architectures, concluding that tool design and context visibility outperform prompt engineering. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point structurally: deterministic state transitions and validation checkpoints in code beat elaborate prompt chains. The [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) project formalizes this into an optimization loop that tunes the scaffolding around a fixed model, treating harness parameters as the search space rather than weights.

Multi-agent coordination has its own research lineage. Christopher Meiklejohn's series traces two waves: 2023 proofs-of-concept like CAMEL, ChatDev, and AutoGen [demonstrating coordination was possible](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) but finding shared failure modes including missing concurrency control, then a 2025 wave focused on reliability measurement [and coordination structures matched to task structure](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). Anthropic's [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) operationalize this at scale: Claude writes its own orchestration scripts and spins up hundreds of parallel subagents.

Model routing is a distinct layer of orchestration. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B routing model that maps queries to user-defined domains without retraining when the model pool changes.

A dissenting thread runs through several sources. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues teams should skip custom orchestration and instead ship MCP tool servers that extend frontier agents, letting model providers maintain the loop. Armin Ronacher's [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop) raises a harder concern: harness loops amplify LLMs' worst tendencies toward defensive, opaque code, and risk producing codebases that require machine participation to maintain. The engineering question of how much control flow belongs in orchestration versus in the model itself remains open.
