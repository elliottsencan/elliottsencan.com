---
title: LLM orchestration
summary: >-
  LLM orchestration covers the harnesses, control planes, and multi-agent
  coordination patterns that govern how language models are routed, sequenced,
  and supervised — a layer that has grown from academic curiosity into
  production infrastructure.
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
compiled_at: '2026-07-09T14:15:50.043Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5866
    output_tokens: 1284
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
  cost_usd: 0.036858
---
Orchestration sits between raw model calls and finished application behavior. At minimum it means deciding which model handles which request; at maximum it means multi-agent pipelines with planners, generators, evaluators, parallel subagents, and governance layers — all running autonomously over hours.

The early multi-agent papers (CAMEL, ChatDev, MetaGPT, AutoGen) treated orchestration as a coordination proof-of-concept: could agents take roles and pass messages? [Wave 1 survey](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) shows they could, but shared failure modes persisted: no concurrency control, no escalation paths, no reliable state management. Those gaps drove the practical architectures that followed.

One line of work treats orchestration as harness engineering. Anthropic's Managed Agents service separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can absorb model improvements without breaking clients [managed-agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). A related post on long-running app development describes a GAN-inspired planner/generator/evaluator triad designed to defeat context anxiety and self-evaluation bias across multi-hour coding sessions [harness-design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). The two-agent initializer-plus-incremental-coder pattern preserves state across context windows via a git repo and progress file [effective-harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

Control flow is a recurring theme. Both [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) and [the data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) argue that prompt engineering is the wrong lever for reliability; explicit state transitions, validation checkpoints, and environmental constraints (tool design, ID keys, context visibility) are what actually stabilize agent behavior. A state machine is more predictable than a sufficiently creative prompt.

At the routing end, orchestration means matching requests to models. DigitalOcean's Inference Router uses a 30B mixture-of-experts model (Plano-Orchestrator) and a live ranking engine to select for cost, latency, or quality [inference-router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). Arch-Router takes a preference-alignment angle, using a compact 1.5B model to map queries to user-defined domains and action types without retraining when new models arrive [arch-router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

For large-scale parallelism, Anthropic's dynamic workflows in Claude Code let the model write orchestration scripts that spin up hundreds of subagents for codebase-wide migrations or security audits [dynamic-workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). The orchestrator-supaconductor plugin demonstrates a similar pattern: a single natural-language command triggers planning, parallel execution, quality evaluation, and a virtual Board of Directors for high-stakes decisions [supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor).

Enterprise deployments add a governance dimension. The AI control plane concept unifies identity, policy enforcement, tool routing, and observability across all agents in an organization [control-plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). The debate, state, and coordination literature argues that coordination structure must match task structure, and that distributed systems theory offers formalisms the field has not fully absorbed [coordination-survey](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate).

A dissenting note worth holding: [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. And [aiyan.io's orchestration post](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are not a moat — the durable investment is in MCP tool servers and domain-specific APIs that extend frontier agents, not in reimplementing the loop itself.
