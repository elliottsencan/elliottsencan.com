---
title: LLM orchestration
summary: >-
  The layer of control logic that sequences, routes, and coordinates LLM calls
  across tools and agents, with current debate centering on how much of that
  logic belongs in code versus prompts versus hosted infrastructure.
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
compiled_at: '2026-11-03T00:41:20.035Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1151
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
  cost_usd: 0.035265
---
LLM orchestration names the control layer that decides when a model runs, what it receives, which tools it calls, how outputs get validated, and how state survives across turns. Every sufficiently complex agent system has one, whether it is written explicitly or grows organically from prompt chains.

The foundational tension in the field is between prompt-based and code-based control. [Aiyan's case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through three architectures, concluding that environmental constraints, meaning tool design, stable ID keys, and explicit context visibility, outperform increasingly elaborate prompts. [Brian Suh makes the same argument more bluntly](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): complex tasks require deterministic state transitions and validation checkpoints encoded in software, not longer prompt chains that collapse under complexity.

On the infrastructure side, there is an active push to move orchestration logic into hosted layers rather than bespoke application code. Anthropic's Managed Agents service [separates the agent harness, session log, and sandbox into stable, swappable interfaces](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) so the system can evolve as models improve without breaking clients. A companion post describes [a two-agent harness pairing an initializer with an incremental coding agent](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) to maintain progress across context windows, while [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let Claude write its own orchestration scripts and spin up hundreds of parallel subagents. Aiyan's strategic conclusion follows: teams should [skip custom orchestration frameworks and ship MCP tool servers instead](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat), letting Anthropic maintain the loop.

At the multi-agent level, orchestration must also handle how agents coordinate. [Meiklejohn's survey of Wave 1 MAS research](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) identifies shared failure modes in early systems: missing concurrency control and no escalation paths. A later installment argues [coordination structure must match task structure](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate), and that distributed systems theory offers formalisms the field has not yet adopted.

Routing, a narrower orchestration problem, is seeing dedicated infrastructure. DigitalOcean's Inference Router [uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). Arch-Router takes a different approach: [a compact 1.5B model maps queries to user-defined domains and action types](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences), achieving preference alignment without retraining when new models are added.

Harness design as a discipline is also receiving explicit attention. [A GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) addresses context anxiety and self-evaluation bias during multi-hour coding sessions. [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) implements a propose-score-Pareto loop to optimize the scaffolding itself, treating memory, retrieval, and prompt templates as tunable parameters.

Armin Ronacher adds a cautionary note: [outer harness loops amplify LLMs' worst tendencies](/reading/2026-06/2026-06-23t161552-the-coming-loop), producing defensive, opaque code that may require machine participation to maintain. The orchestration layer is unavoidable, but its growth raises real questions about whether human engineers retain enough context to oversee what it produces.
