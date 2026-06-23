---
title: LLM orchestration
summary: >-
  LLM orchestration covers the harnesses, control flow, routing, and multi-agent
  coordination layers that govern how language models are invoked, sequenced,
  and managed to complete complex tasks reliably.
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
compiled_at: '2026-06-23T23:21:57.209Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5577
    output_tokens: 1181
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
  cost_usd: 0.034446
---
At its core, LLM orchestration is the infrastructure between a model and a task: the scaffolding that decides which model runs when, what context it sees, how results pass between steps, and how failures get handled. The field has matured rapidly from early proof-of-concept coordination systems toward production-grade architectures with hard engineering constraints.

The 2023 wave of multi-agent research, surveyed by [Meiklejohn](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the), established that agents could coordinate at all. Systems like CAMEL, ChatDev, and AutoGen demonstrated role-based pipelines, but [Meiklejohn's Wave 1 analysis](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) catalogued their shared failure modes: missing concurrency control, no escalation paths, and fragile message-passing. The 2025 wave shifted focus to reliability measurement rather than new coordination schemes.

A recurring conclusion across practitioners is that prompt engineering is a poor substitute for structural control. [Aiyan's reliability post](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traced a data-engineering agent through three architectures before finding that environmental constraints, tool design, and context visibility outperform elaborate prompts. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same argument more directly: complex tasks require deterministic control flow with explicit state transitions and validation checkpoints encoded in software.

Harness design is one practical answer. Anthropic's engineering posts describe harnesses as the stable scaffolding that separates model logic from session state and execution environment. Their [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the agent harness, session log, and sandbox into swappable interfaces so the system can absorb model improvements without breaking clients. A [two-agent harness for long-running coding work](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses an initializer and an incremental coding agent to maintain progress across context windows, while a [GAN-inspired planner/generator/evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) addresses context anxiety and self-evaluation bias in multi-hour sessions. Anthropic extended this further with [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code), which automatically writes orchestration scripts that spawn hundreds of parallel subagents for large-scale tasks.

At the routing layer, orchestration also means selecting the right model per request. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts routing model to match requests to models by cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B routing model that maps queries to user-defined domains without retraining as new models are added.

Enterprise deployments add a governance layer on top. [Speakeasy's control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames this as unifying identity, policy enforcement, tool routing, and observability across all agents in an organization.

A contrarian view runs through several sources. [Aiyan's orchestration post](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are not a competitive moat; teams should ship MCP tool servers and agent skills that extend frontier agents rather than maintaining their own loops. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) accepts that harness loops are becoming unavoidable but warns they amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain, raising unresolved questions about human oversight.
