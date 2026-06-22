---
title: LLM orchestration
summary: >-
  LLM orchestration covers the architectures, harnesses, and control structures
  that coordinate one or more language models through multi-step tasks, and the
  growing consensus that deterministic scaffolding beats prompt engineering for
  reliability.
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
  - 2026-06/2026-06-21t130526-agentic-engineering
  - 2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router
  - >-
    2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences
compiled_at: '2026-06-22T02:34:34.672Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5506
    output_tokens: 1205
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
  cost_usd: 0.034593
---
LLM orchestration is the layer between a raw model API and a completed task: the scaffolding that sequences calls, routes outputs, manages state, and decides when to delegate to subagents or tools. Across the sources here, a consistent argument emerges that this layer deserves serious engineering attention rather than prompt-level hacks.

The earliest multi-agent systems, surveyed in [Wave 1 research](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), treated coordination as an emergent property of role-playing agents with no concurrency control and no escalation paths. Papers like CAMEL, MetaGPT, and AutoGen demonstrated that agents could coordinate at all, but left the hard operational questions unanswered. The [landscape overview](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) characterizes a second wave focused on measuring reliability rather than proving possibility.

Practical experience sharpened the lessons. A data engineering agent that evolved through a rigid state machine, then an orchestrator, then a single general-purpose agent found that [environmental constraints outperform prompt engineering](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it): well-designed tool interfaces, stable ID keys, and explicit context visibility matter more than elaborate instructions. [Brian Suh arrives at the same conclusion](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) from a different angle: reliable agents need deterministic control flow encoded in software, not longer prompt chains.

Anthropics engineering posts describe concrete harness designs. [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the agent harness, session log, and sandbox into stable interfaces so the system can absorb model improvements without client-breaking changes. A [two-agent harness for long-running apps](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) separates initialization from incremental execution, letting Claude maintain progress across context windows. A [GAN-inspired planner/generator/evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) addresses context anxiety and self-evaluation bias during multi-hour coding sessions. Most recently, [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let Claude generate its own orchestration scripts and spin up hundreds of parallel subagents for large-scale migrations.

At the infrastructure tier, [AI control plane architecture](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames orchestration as a governance problem: routing, identity, policy enforcement, and observability must be unified across every agent and model endpoint. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) and the [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) address a narrower slice: automatically matching each request to the best model for cost, latency, or quality without retraining.

The strategic question is who should own the orchestration layer. [Aiyan argues](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) that custom orchestration frameworks are not a competitive advantage; teams should ship MCP tool servers and agent skills that extend frontier agents, letting Anthropic maintain the loop. The [harness-forge project](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) and the [orchestrator-supaconductor plugin](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) both operate inside that model, treating the frontier agent as fixed and optimizing the scaffolding around it. [Coordination theory from distributed systems](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) offers formalism the field has not fully adopted: the CALM theorem and shared-notebook state patterns suggest that coordination structure should match task structure rather than being bolted on.
