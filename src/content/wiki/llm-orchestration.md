---
title: LLM orchestration
summary: >-
  The practice of coordinating one or more LLM agents through control
  structures, harnesses, and routing layers, with current sources converging on
  the view that deterministic scaffolding and environmental design outperform
  prompt engineering for reliability.
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
compiled_at: '2026-11-17T01:45:39.747Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1158
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
  cost_usd: 0.03537
---
LLM orchestration refers to the control structures, harnesses, and routing mechanisms that govern how language models are invoked, sequenced, and managed, whether as single agents or in multi-agent pipelines. The design space has expanded rapidly, and the sources here chart its major fault lines.

The earliest multi-agent frameworks, documented in the 2023 wave of coordination papers reviewed by [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), established that agents could coordinate at all, but shared failure modes included missing concurrency control and no escalation paths. The 2025 reliability wave then shifted attention to whether those systems could be trusted in production. That shift runs through almost every source here.

A core argument emerging from multiple directions is that prompt engineering is not the right lever for reliability. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the case directly: complex tasks require deterministic control flow encoded in software, with explicit state transitions and validation checkpoints. A similar lesson came from practice: a data engineering agent [evolved through three architectures](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) and found that environmental constraints, specifically tool design, ID keys, and context visibility, outperformed prompt chains in every configuration.

Harness design is the dominant implementation concern. [Anthropic's Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve. A separate [harness for long-running coding sessions](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses an initializer agent that scaffolds a feature list and progress file, then hands off to an incremental coding agent to maintain state across context windows. [Anthropic's dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) push further, letting Claude itself write orchestration scripts that spin up hundreds of parallel subagents for tasks like codebase-wide migrations. A [GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) addresses context anxiety and self-evaluation bias during multi-hour autonomous sessions.

At the infrastructure layer, orchestration increasingly includes model routing. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a 1.5B preference-aligned routing model that maps queries to domains and action types without retraining when new models are added. [Speakeasy's AI control plane framing](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) adds a governance layer: identity, policy enforcement, tool routing, and observability across every agent and system in an enterprise.

One strategic counterpoint comes from [Aiyan's argument](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) that custom orchestration frameworks are not a defensible investment. Building MCP tool servers and agent skills that extend frontier agents, and letting providers like Anthropic maintain the loop, is framed as the better allocation of engineering effort.

[Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) offers the clearest warning: harness loops amplify LLMs' worst tendencies, producing defensive and opaque code, and risk creating codebases that require machine participation to maintain. The orchestration layer is unavoidable, but it carries real costs to human oversight and engineering judgment that the field has not fully reckoned with.
