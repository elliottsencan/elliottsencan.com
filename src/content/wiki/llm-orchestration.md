---
title: LLM orchestration
summary: >-
  LLM orchestration covers the architectures, harnesses, and control structures
  that direct one or more language models through multi-step tasks, with active
  debate over how much of that logic belongs in software versus model prompts.
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
compiled_at: '2026-10-19T22:11:18.589Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1224
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
  cost_usd: 0.03636
---
At its simplest, LLM orchestration is the software layer that sequences model calls, routes inputs, manages state, and decides when a task is done. The hard questions are how much of that logic to encode explicitly versus leaving to the model, and whether to build it yourself or delegate it to a managed platform.

The engineering consensus is shifting toward explicit structure. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not increasingly elaborate prompt chains. [Aiyan's piece on data engineering agent architectures](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces this lesson empirically: a system that cycled through rigid state machine, orchestrator, and finally a single general-purpose agent found that environmental constraints like tool design, ID keys, and context visibility outperformed prompt engineering at every stage.

State and memory are recurring pressure points. Anthropic's harness design posts describe two complementary patterns: a [two-agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) where an initializer scaffolds a feature list and progress file before handing off to an incremental coding agent, and a [GAN-inspired planner-generator-evaluator triad](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) that addresses context anxiety and self-evaluation bias during multi-hour sessions. The [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the agent harness, session log, and sandbox into stable interfaces so the system can swap models without breaking clients. The Recursive Language Model framing from [dbreunig](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) pushes further, keeping data in a REPL environment and letting the model pull selectively into token space to avoid context rot.

At the multi-agent level, [Christopher Meiklejohn's survey series](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) maps two waves of research: 2023 coordination proofs-of-concept (CAMEL, AutoGen, MetaGPT) and 2025 reliability measurement. [Wave 1 systems](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) shared failure modes including missing concurrency control and no escalation paths. [Wave 2 work](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that coordination structure must match task structure, and that distributed systems formalisms offer untapped tools for the field.

Routing is a distinct sub-problem when multiple models are available. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best-fit backend for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a 1.5B preference-aligned routing model that maps queries to user-defined domains without retraining when new models are added.

The build-versus-delegate question runs through the practitioner sources. [Aiyan's orchestrator piece](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues teams should skip custom orchestration frameworks and ship MCP tool servers instead, letting frontier agents like Claude Code maintain the loop. Anthropic's [dynamic workflows launch](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) shows the platform direction: Claude now writes orchestration scripts itself, spinning up hundreds of parallel subagents for large-scale tasks. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) raises the counterweight: outer harness loops amplify LLMs' worst tendencies toward defensive, opaque code and risk creating codebases that require machine participation to maintain, which demands human oversight that the orchestration layer itself does not supply.
