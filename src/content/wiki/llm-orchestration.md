---
title: LLM orchestration
summary: >-
  The coordination layer that routes, sequences, and manages LLM calls across
  agents and tools — covering harness design, multi-agent patterns, context
  management, and the debate over where orchestration logic should live.
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
compiled_at: '2026-07-01T02:02:18.306Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5727
    output_tokens: 1419
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
  cost_usd: 0.038466
---
LLM orchestration refers to the machinery that sits between a user's intent and the individual model calls that fulfill it: routing requests to models, sequencing tool use, managing context across turns, and coordinating multiple agents toward a shared goal. The sources here pull in several directions, but a common thread runs through them: orchestration is an engineering problem, not a prompting problem.

The most direct statement of this comes from [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts), who argues that reliable agents need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, rather than prompt chains that collapse under complexity. The same conclusion emerges from a case study at [Aiyan](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it), where a data engineering agent cycled through a rigid state machine, an orchestrator, and finally a single general-purpose agent, with environmental constraints like tool design and context visibility consistently outperforming prompt engineering for reliability.

What that control infrastructure actually looks like varies by scale. Anthropic's [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve. A related post on [harness design for long-running apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture that handles multi-hour coding sessions without context collapse. The [effective harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) piece goes further, using a two-agent initializer-plus-incremental-coder setup with a persistent progress file to maintain state across context windows. Anthropic's [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) takes this to its logical extreme: Claude itself writes orchestration scripts that spin up hundreds of parallel subagents for large-scale tasks.

Context management is a consistent pressure point. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) address context rot by keeping data in a REPL environment and pulling it into token space selectively. [Harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) automates harness optimization itself, running a propose-score-Pareto loop over memory, retrieval, and context construction decisions.

At the multi-agent coordination level, [Christopher Meiklejohn's survey](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) maps two research waves: 2023 coordination proofs-of-concept and 2025 reliability measurement. His [Wave 1 analysis](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) of CAMEL, MetaGPT, AutoGen, and others identifies shared failure modes including missing concurrency control and no escalation paths. The debate, state, and coordination installment argues coordination structure must match task structure, and that distributed systems theory offers formalisms the field has not yet absorbed.

Model routing is a distinct orchestration subproblem. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) takes a lighter approach, using a compact 1.5B model aligned to user-defined domains without retraining when new models are added.

The enterprise governance angle appears in [Speakeasy's AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors), which frames orchestration as requiring a unified identity, policy enforcement, tool routing, and observability layer across all agents. The [agentic engineering reference guide](/reading/2026-06/2026-06-21t112220-agentic-engineering) provides a vocabulary for these concerns, covering agent loops, prompt caching, context rot, and guardrails.

A skeptical note comes from [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop), who warns that outer harness loops amplify LLMs' worst tendencies and risk creating codebases requiring machine participation to maintain. A complementary strategic argument appears at [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat): custom orchestration frameworks are unlikely to be a durable competitive advantage, and teams are better served shipping domain-specific tools that extend frontier agents rather than maintaining their own loops.
