---
title: LLM orchestration
summary: >-
  The layer of software that manages how language models are invoked, sequenced,
  and coordinated — covering routing, harness design, multi-agent pipelines, and
  the debate over how much of that logic should live in code versus prompts.
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
compiled_at: '2026-10-13T00:19:12.075Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1283
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
  cost_usd: 0.037245
---
LLM orchestration covers everything between a user request and a model response when that gap involves more than a single inference call: routing queries to the right model, chaining or parallelizing agents, managing state across context windows, and enforcing control flow. The field has matured quickly enough that a taxonomy is useful before diving into specifics.

At the routing layer, [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model (Plano-Orchestrator) to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) takes a lighter approach with a 1.5B model that maps queries to user-defined domains, achieving strong alignment with human preferences without retraining when new models are added. Routing is thus the first orchestration decision: which model runs at all.

Once a model is selected, harness design determines how its outputs accumulate into something useful over time. Anthropic's Managed Agents service separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve [without breaking clients](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). A separate Anthropic post describes a two-agent harness — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent — that maintains coherent state across many context windows [without losing progress](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). A GAN-inspired variant adds a third evaluator agent to overcome [self-evaluation bias in long coding sessions](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). Harness-Forge goes further, running a propose-score-Pareto loop to optimize the scaffolding itself: memory, retrieval, and prompt templates treated as [tunable variables rather than fixed choices](/reading/2026-06/2026-06-14t091145-001tmfharness-forge).

The control-flow debate cuts across all of this. [Brian Suh argues](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) that reliable agents need deterministic state transitions and validation checkpoints encoded in software, not longer prompts. The data engineering case study at [aiyan.io](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) reached the same conclusion empirically: a system that started as a rigid state machine, became an orchestrator, and then collapsed to a single general-purpose agent found that environmental constraints — tool design, ID keys, context visibility — outperformed prompt engineering at every stage. Armin Ronacher adds a counterweight: harness loops are becoming unavoidable, but they amplify LLMs' worst tendencies and risk producing codebases [that require machine participation to maintain](/reading/2026-06/2026-06-23t161552-the-coming-loop).

At scale, orchestration becomes a platform question. [Anthropic's dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let Claude write its own orchestration scripts, spinning up hundreds of parallel subagents for codebase-wide migrations. The enterprise governance layer — identity, policy enforcement, tool routing, observability — is what [Speakeasy calls the AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). One contrarian position: [aiyan.io argues](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) that custom orchestration frameworks are rarely the right investment; shipping MCP tool servers and letting frontier agents like Claude Code maintain the loop preserves optionality without rebuilding infrastructure that Anthropic will improve anyway.

The academic lineage, surveyed by [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the), moves from 2023 coordination proofs-of-concept (CAMEL, MetaGPT, AutoGen) to 2025 reliability measurement, with recurring failure modes like missing concurrency control and no escalation paths. The CALM theorem and shared-notebook state models from that literature suggest distributed systems theory has [largely untapped formalisms](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) to offer the field.
