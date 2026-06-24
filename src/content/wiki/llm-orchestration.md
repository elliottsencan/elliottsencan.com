---
title: LLM orchestration
summary: >-
  The layer of logic that sequences, routes, and supervises LLM calls across
  complex tasks, with current practice converging on harness design,
  deterministic control flow, and separation of concerns rather than monolithic
  prompt engineering.
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
compiled_at: '2026-06-24T06:34:04.119Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5577
    output_tokens: 1211
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
  cost_usd: 0.034896
---
LLM orchestration covers everything that happens around a model call rather than inside it: how tasks are decomposed, how multiple agents are sequenced or parallelized, how state persists across context windows, and how results are validated before the next step runs.

The early wave of multi-agent research, surveyed by [Meiklejohn](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the), established coordination as tractable but exposed shared failure modes across systems like CAMEL, MetaGPT, and AutoGen: [no concurrency control, no escalation paths](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), and coordination structures that did not match task structures. That gap is what later harness and control-plane work tries to close.

Two converging arguments have displaced prompt-centric orchestration. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents require deterministic control flow with explicit state transitions and validation checkpoints encoded in software, not prompt chains. A data-engineering case study at [Aiyan](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) reached the same conclusion empirically: environmental constraints, tool design, and ID-keyed context outperform prompt engineering across three successive architectures.

Anthropics engineering work has produced concrete harness patterns. Their [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) service separates the agent harness, session log, and sandbox into stable interfaces so the system can evolve with models without breaking clients. A [two-agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) for long-running coding tasks uses an initializer to scaffold a feature list, git repo, and progress file, then hands off to an incremental agent that stays coherent across many context windows. A [GAN-inspired planner/generator/evaluator](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) architecture addresses self-evaluation bias during multi-hour sessions. Claude Code itself now supports [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) that write orchestration scripts spinning up hundreds of parallel subagents for codebase-wide tasks.

At the infrastructure layer, routing is a first-class orchestration concern. DigitalOceans [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B model that aligns routing decisions with user-defined domains and action types without retraining when new models are added. Speakeasy frames this as an [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors): a governance layer unifying identity, policy enforcement, tool routing, and observability across all agents in an enterprise.

One strategic fork concerns who owns the orchestration loop. [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues teams should skip custom orchestration frameworks and instead ship MCP tool servers and agent skills that extend frontier agents, letting Anthropic maintain the loop. Armin Ronacher takes a more cautionary view: [outer harness loops](/reading/2026-06/2026-06-23t161552-the-coming-loop) are becoming unavoidable but amplify LLMs worst tendencies toward defensive, opaque code, risking codebases that require machine participation to maintain.

[dbreunig](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) adds that Recursive Language Models, which keep data in a REPL environment and let the model pull selectively into token space, produce traces that can be mined to design lower-latency, optimized agents, pointing toward orchestration that learns from its own execution history.
