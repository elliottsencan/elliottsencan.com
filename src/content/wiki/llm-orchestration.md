---
title: LLM orchestration
summary: >-
  LLM orchestration covers the control structures, harness designs, and
  coordination patterns that govern how language models are invoked, sequenced,
  and supervised — whether in single-agent loops or across distributed
  multi-agent pipelines.
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
compiled_at: '2026-07-09T23:25:00.468Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5866
    output_tokens: 1184
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
  cost_usd: 0.035358
---
Orchestration is the layer between a raw model and a useful system. It decides when a model runs, what context it receives, which tools it can call, and how its outputs are validated or handed off. The sources here span that entire problem: from theoretical coordination papers to production harness designs to arguments about where custom orchestration is and isn't worth building.

The earliest multi-agent systems, surveyed in [Wave 1 research](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), established that agents could coordinate at all — CAMEL, ChatDev, MetaGPT, and AutoGen each used different delegation patterns — but shared failure modes: no concurrency control, no escalation paths, coordination mechanisms that didn't match the task structure. Subsequent work on debate and state pushed further, finding that the right coordination model depends heavily on the task, and that distributed systems theory offers formalisms the field hasn't fully borrowed.

On the practical engineering side, multiple sources converge on the same finding: prompting is a poor substitute for structure. [Brian Suh argues](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) that reliable agents need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints. A case study in [data engineering agent evolution](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) confirms this, showing that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering across three successive architectures.

Harness design is where this plays out concretely. Anthropic's [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve. Their [long-running harness work](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses an initializer agent to scaffold a feature list and progress file before a coding agent begins, maintaining state across multiple context windows. A GAN-inspired three-agent setup — planner, generator, evaluator — addresses context anxiety and self-evaluation bias during [multi-hour autonomous coding sessions](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). [Dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) extend this further, letting Claude write its own orchestration scripts that spin up parallel subagents for large-scale tasks.

A dissenting view from [Aiyan's orchestration post](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are rarely the right investment: teams should ship MCP tool servers and agent skills that plug into frontier agents, letting providers maintain the loop. The [AI control plane framing](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) from Speakeasy takes a different angle — enterprises need a governance layer unifying identity, policy enforcement, tool routing, and observability across all agents, which is itself an orchestration problem at the infrastructure level.

At the routing layer, both [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) and [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) address model selection as an orchestration sub-problem: routing each request to the best-fit model for cost, latency, or quality using compact routing models rather than fixed assignments.

Armin Ronacher's [warning about harness loops](/reading/2026-06/2026-06-23t161552-the-coming-loop) cuts across all of this: outer orchestration loops amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. The engineering challenges of orchestration are tractable; the oversight questions they raise are not yet resolved.
