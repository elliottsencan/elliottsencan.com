---
title: LLM orchestration
summary: >-
  LLM orchestration covers the architectural patterns, harnesses, and
  coordination layers that govern how language models plan, delegate, and
  execute multi-step tasks, and the field is actively converging on
  infrastructure-level solutions over ad-hoc prompting.
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
  - 2026-08/2026-08-11t004752-danielmiesslerlifeos
compiled_at: '2026-08-13T21:15:58.787Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1337
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
  cost_usd: 0.038055
---
LLM orchestration is the set of mechanisms that decide how a language model receives tasks, breaks them into steps, delegates subtasks to tools or other agents, and manages state across context windows. The field has matured quickly enough that a coherent design debate is visible across both research and engineering practice.

The earliest coordination experiments, surveyed in [Wave 1 of the MAS series](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), established that LLM agents could coordinate at all, but exposed shared failure modes: no concurrency control, no escalation paths, and fragile turn-taking protocols. Those 2023 proofs-of-concept gave way to a second wave focused on reliability measurement, and then to production-grade harnesses. [Meiklejohn's landscape survey](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) frames the shift as a narrowing: agentic coding benchmarks gave the field a concrete target to optimize against.

A recurring lesson across practitioner sources is that prompt engineering is the wrong tool for structural problems. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents require deterministic control flow encoded in software, with explicit state transitions and validation checkpoints. The same conclusion surfaces in [a case study of a data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) that cycled through a rigid state machine, an orchestrator pattern, and finally a single general-purpose agent, finding that environmental constraints on tool design and context visibility outperformed elaborate prompting at every stage.

Harness design has become its own discipline. Anthropic's engineering posts describe concrete patterns: a [two-agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) separating an initializer from an incremental coding agent, a [GAN-inspired planner-generator-evaluator structure](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) for multi-hour autonomous sessions, and a [Managed Agents service](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) that decouples the agent harness, session log, and sandbox into swappable interfaces. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) push further, letting the model write its own orchestration scripts to spin up parallel subagents at scale. The [harness-forge skill](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) treats harness configuration itself as an optimization target, running propose-score-Pareto loops over memory, retrieval, and prompt templates.

Coordination structure at the multi-agent level has its own literature. [Meiklejohn's debate and state survey](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that coordination mechanisms must match task structure, and that distributed systems formalisms are underused. The [orchestrator-supaconductor plugin](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) operationalizes one pattern: a single natural-language command triggers parallel execution, quality evaluation, and a virtual board for high-stakes decisions.

A governance layer is emerging on top of these patterns. [Speakeasy's AI control plane framing](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) adds identity, policy enforcement, and observability as requirements once agents reach enterprise scale. At the infrastructure level, model routing is itself a form of orchestration: [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) and [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) both treat model selection as a matchmaking problem, using compact routing models to align requests with cost, latency, and quality targets.

The open question is oversight. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' defensive and opaque tendencies, risking codebases that require machine participation to maintain. [Aiyan's architectural advice](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) responds to this tension pragmatically: skip custom orchestration entirely and extend frontier agents via MCP tool servers, letting the model provider maintain the loop while teams invest in domain-specific context and APIs.
