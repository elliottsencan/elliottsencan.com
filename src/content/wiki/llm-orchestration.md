---
title: LLM orchestration
summary: >-
  The layer of control logic that sequences, routes, and coordinates LLM calls —
  ranging from simple harness loops to multi-agent pipelines — and the ongoing
  debate about how much of it to build versus delegate to hosted platforms.
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
compiled_at: '2026-09-07T21:18:22.998Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1216
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
  cost_usd: 0.03624
---
LLM orchestration is the machinery that sits around model calls: deciding which model runs when, how state persists across turns, how subagents are spawned and supervised, and how failures escalate. The field is moving fast enough that architectural choices made six months ago are already being revisited.

The most basic form is a harness loop. [Anthropic's harness design work](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator trio that lets Claude sustain multi-hour coding sessions without losing state. A companion post on [effective harnesses for long-running agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) formalizes the pattern further: an initializer scaffolds a feature list and progress file, an incremental coding agent works through it window by window. The key insight across both is that the harness, not the prompt, is the reliability mechanism.

That point is made directly by [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): agents need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, rather than elaborate prompt chains. [A practical case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) of a data engineering agent cycling through state machine, orchestrator, and single-agent architectures reaches the same conclusion — environmental constraints like tool design and context visibility outperform prompt engineering for reliability.

Above the single-agent harness sits multi-agent orchestration. [Christopher Meiklejohn's survey of Wave 1 MAS research](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) catalogs how systems like CAMEL, ChatDev, and AutoGen handled coordination in 2023, and identifies shared failure modes: no concurrency control, no escalation paths. A later installment on debate, state, and coordination argues that coordination structure must match task structure, and that distributed systems theory offers largely untapped formalisms here.

At the infrastructure level, [Anthropic's Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve. The [AI control plane framing from Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) extends this to enterprise governance: unified identity, policy enforcement, tool routing, and observability across every agent a company operates.

Routing is an increasingly distinct sub-problem. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE routing model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a preference-aligned alternative using a compact 1.5B model that maps queries to user-defined domains without retraining when new models are added.

A recurring strategic question is how much orchestration to own. [Aiyan's argument](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) is pointed: teams should skip custom orchestration frameworks and ship MCP tool servers instead, letting Anthropic maintain the loop. Claude Code's [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) — where Claude itself writes orchestration scripts that spawn hundreds of parallel subagents — illustrates how quickly that delegation is becoming practical.

[Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) offers the sharpest caution: harness loops are becoming unavoidable but amplify LLMs' worst tendencies, risking codebases that require machine participation to maintain. How much orchestration logic to encode, and where human judgment must remain in the loop, is the open engineering question the field has not settled.
