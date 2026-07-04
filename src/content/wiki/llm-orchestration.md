---
title: LLM orchestration
summary: >-
  LLM orchestration is the layer of control flow, harness design, and routing
  logic that coordinates how language models are invoked, sequenced, and managed
  in production systems, from single-agent loops to large multi-agent pipelines.
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
compiled_at: '2026-07-04T21:23:38.980Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5866
    output_tokens: 1182
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
  cost_usd: 0.035328
---
LLM orchestration covers the scaffolding that sits between raw model calls and useful outcomes: how tasks get decomposed, how agents are sequenced or run in parallel, how state persists across context windows, and how different models get selected for different requests.

The architectural debate runs from thin to thick scaffolding. [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are a trap and that teams should instead ship MCP tool servers and agent skills, letting frontier agents like Claude Code own the loop. The opposite instinct is to engineer the harness directly: [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the case that reliable agents require deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not elaborate prompts. A data engineering case study by [Aiyan](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces three iterations, from a rigid state machine through an orchestrator to a single general-purpose agent, concluding that environmental constraints such as tool design and context visibility do more for reliability than prompt engineering.

Anthropics published engineering work shows how harness design becomes its own discipline at scale. Their [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) service separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve. A complementary post on [long-running application development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture that runs multi-hour coding sessions without losing coherence. A simpler two-agent [initializer-plus-incremental-coder harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) scaffolds a feature list and progress file so Claude can maintain direction across many context windows. Anthropics [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) take this further, letting Claude write its own orchestration scripts that spin up hundreds of parallel subagents for tasks like codebase-wide migrations.

Coordination structure for multi-agent systems draws on older distributed systems intuitions. [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) surveys the 2023 wave of papers including CAMEL, ChatDev, MetaGPT, and AutoGen, identifying shared failure modes: missing concurrency control and no escalation paths. A follow-up on debate, state, and coordination argues that coordination structure must match task structure and that distributed systems theory offers untapped formalisms for the field.

At the infrastructure layer, orchestration shades into routing: which model handles which request. [DigitalOcean](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) routes requests with a 30B mixture-of-experts model that optimizes for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B model that maps queries to user-defined domains without retraining when new models arrive. Enterprise governance adds another layer: the [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) concept unifies identity, policy enforcement, tool routing, and observability across every agent in an organization.

A recurring concern is what orchestration does to codebases over time. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer harness loops amplify LLMs worst tendencies, producing defensive and opaque code that increasingly requires machine participation to maintain.
