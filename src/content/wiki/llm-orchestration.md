---
title: LLM orchestration
summary: >-
  LLM orchestration is the set of architectural patterns, harnesses, and control
  structures that coordinate one or more language models through multi-step
  tasks, with emerging consensus that deterministic scaffolding outperforms
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
compiled_at: '2026-06-24T04:38:51.006Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5577
    output_tokens: 1119
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
  cost_usd: 0.033516
---
LLM orchestration covers everything between a raw model call and a completed multi-step task: how work is decomposed, how agents hand off state, how failures are caught, and how context stays coherent across long runs. The sources here span that full stack, from early coordination experiments to production harness design at Anthropic.

The first wave of multi-agent research, covered by [Christopher Meiklejohn's series](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), established that coordination was possible but fragile. Systems like CAMEL, ChatDev, MetaGPT, and AutoGen each found working arrangements for role-based LLM collaboration, but shared failure modes: no concurrency control, no escalation paths, brittle at scale. The follow-on piece on [debate, state, and coordination](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) draws on distributed systems theory to argue that coordination structure must match task structure, and that formalisms from that field remain underused in LLM orchestration.

A recurring theme across newer sources is that prompting is the wrong tool for reliability. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues for explicit state transitions and validation checkpoints encoded in software. An [Aiyan case study on a data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) reached the same conclusion empirically: environmental constraints — tool design, ID keys, context visibility — outperformed elaborate prompt chains across all three architectures the team tried.

On the harness side, Anthropic has published several pieces on concrete architecture. [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve. A [GAN-inspired planner/generator/evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) addresses context anxiety and self-evaluation bias in multi-hour coding runs. The [two-agent initializer-plus-incremental-coder pattern](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) keeps state across context windows using a scaffolded progress file. Most recently, [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) lets Claude write its own orchestration scripts, spinning up hundreds of parallel subagents for large-scale migrations.

At the routing layer, both [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) and the [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) treat model selection itself as an orchestration problem, using compact routing models to match requests to the best-fit backend for cost, latency, or quality. The [AI control plane framing](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) extends this further into enterprise governance: unified identity, policy enforcement, and observability across every agent in a deployment.

Not everyone agrees that custom orchestration layers are worth building. [Aiyan's strategic post](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues teams should skip custom frameworks and instead ship MCP tool servers that extend frontier agents, letting providers like Anthropic maintain the loop. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) accepts that harness loops are unavoidable but warns they amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain.
