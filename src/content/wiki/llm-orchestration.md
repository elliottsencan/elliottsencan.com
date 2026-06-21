---
title: LLM orchestration
summary: >-
  The layer that sequences, coordinates, and manages LLM agents across tasks —
  covering loop design, harness architecture, multi-agent coordination, and the
  question of how much orchestration to build versus buy.
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
compiled_at: '2026-06-21T18:31:25.666Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4980
    output_tokens: 1132
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
  cost_usd: 0.03192
---
LLM orchestration refers to the software layer that controls how language models are invoked, sequenced, and coordinated to complete tasks that exceed a single inference call. The concept spans everything from a simple retry loop around a single agent to multi-agent pipelines with planners, generators, evaluators, and governance layers.

Early multi-agent research focused on whether coordination was possible at all. [Wave 1 systems like CAMEL, ChatDev, MetaGPT, and AutoGen](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) demonstrated basic role-based coordination but shared failure modes: no concurrency control, no escalation paths, and brittle prompt-driven sequencing. The follow-on question of how agents should interact — convergent debate, adversarial debate, shared state — is addressed by [work surveying coordination structures](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate), which argues that coordination structure must match task structure and that distributed systems theory offers relevant formalisms the field has not yet adopted.

A recurring practical finding is that prompt engineering is the wrong lever for reliability. [One data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traced an agent through three architectures before concluding that environmental constraints — tool design, ID keys, context visibility — outperform prompt tuning. [Brian Suh makes the same argument structurally](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): reliable agents need deterministic control flow encoded in software, not elaborate prompt chains.

Harness design has emerged as a distinct engineering discipline for long-running tasks. [Anthropic's Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve. A [GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) addresses context anxiety and self-evaluation bias during multi-hour coding sessions. A [two-agent initializer-plus-incremental-coder harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) enables consistent progress across context windows by scaffolding a feature list, git repo, and progress file up front. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) take a different angle, keeping data in a REPL environment so the model pulls only what it needs into token space, with emergent traces usable to design optimized lower-latency agents.

At the infrastructure level, [the AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) adds a governance layer covering identity, policy enforcement, tool routing, and observability across every agent a deployment touches. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) push orchestration into the model itself, letting Claude write scripts that spin up hundreds of parallel subagents for tasks like codebase migrations.

The strategic question is how much orchestration to own. [One argument](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) is direct: skip custom orchestration frameworks entirely, ship MCP tool servers and agent skills, and let frontier agents like Claude Code maintain the loop. The moat is domain context and platform APIs, not the orchestration layer itself. Open-source projects like [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) and [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) sit at the other end, giving teams full control over multi-agent pipelines, memory, and observability without vendor lock-in.
