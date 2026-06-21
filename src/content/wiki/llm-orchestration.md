---
title: LLM orchestration
summary: >-
  The layer of logic that sequences, coordinates, and constrains LLM agents
  across tasks, spanning harness design, control flow, state management, and
  multi-agent coordination patterns that together determine whether autonomous
  systems stay on track.
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
compiled_at: '2026-06-21T20:15:31.026Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5126
    output_tokens: 1240
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
  cost_usd: 0.033978
---
LLM orchestration covers the scaffolding that sits between a raw model and a completed task: how work is broken into steps, how agents hand off state to each other, how errors are caught, and how long-running sessions avoid losing context. The field has moved quickly enough that what counted as a sophisticated orchestration pattern in 2023 is now considered a liability.

The early wave of multi-agent research, surveyed by [Meiklejohn](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the), focused on proving that agents could coordinate at all. Systems like CAMEL, ChatDev, MetaGPT, and AutoGen each wired agents together under a fixed role hierarchy. [Meiklejohn's walkthrough](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) of those papers identifies shared failure modes: no concurrency control, no escalation paths, and loop structures that could not recover from partial failures. The lesson was that role assignment is not the same as coordination.

A persistent theme across more recent work is that prompt engineering cannot substitute for structural control. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents need deterministic state transitions and validation checkpoints encoded in software, not in prompts. The same conclusion emerged empirically in a data engineering case study at [Aiyan](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it), where a system cycled through a state machine, then an orchestrator, then a single general-purpose agent, finding that tool design and context visibility outperformed every prompt iteration.

Harness design is the practical implementation of these principles. Anthropic has published several pieces on what durable harnesses look like. [Martin, Cemaj, and Cohen](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) describe Managed Agents as a separation of harness, session log, and sandbox into stable interfaces that can be swapped independently as models improve. [Rajasekaran](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture designed to overcome context anxiety and self-evaluation bias across multi-hour coding sessions. [Young](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) adds a two-agent initializer-plus-incremental-coder pattern that maintains progress across context windows via a persistent state file. Anthropic's dynamic workflows feature, [announced in May 2026](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code), takes this further by letting Claude generate orchestration scripts that spawn hundreds of parallel subagents automatically.

At a higher level, [Batchu at Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames the enterprise problem as an "AI control plane": a governance layer that unifies identity, policy enforcement, tool routing, and observability across all agents in an organization. Meiklejohn's fifth installment extends this with formal grounding, arguing that coordination structure must match task structure and that distributed systems theory offers formalisms the field has not yet adopted.

On the build-versus-integrate question, [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are rarely a moat, and that teams building on frontier agents should invest in domain-specific APIs and MCP tool servers rather than maintaining their own loops. Several open-source projects, including [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) and the [orchestrator-supaconductor plugin](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor), take the opposite position and build full orchestration stacks as composable infrastructure. The [harness-forge skill](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) represents a third path: automated optimization of the harness itself, running propose-score-Pareto loops to tune memory, retrieval, and prompt templates around a fixed model.
