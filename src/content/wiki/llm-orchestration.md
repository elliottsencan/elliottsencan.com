---
title: LLM orchestration
summary: >-
  LLM orchestration covers the architectures, harnesses, and control structures
  that coordinate language models and agents across multi-step tasks, with
  sources ranging from hosted managed services to locally-run swarms and routing
  layers.
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
compiled_at: '2026-09-14T21:39:29.715Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1206
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
  cost_usd: 0.03609
---
Orchestration, in the LLM context, refers to everything that sits around the model: the loop that drives it forward, the state it reads and writes, the tools it can call, and the logic that decides when to hand off work or stop. The field has matured rapidly enough that the design choices at this layer now define reliability and scalability more than prompt quality does.

The earliest wave of multi-agent research, covered by [Meiklejohn's survey](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), established that agents can coordinate at all. Systems like CAMEL, ChatDev, and AutoGen demonstrated role-based pipelines, but each lacked concurrency control and escalation paths. A later installment [on debate and coordination](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that coordination structure must match task structure, and that distributed systems theory offers underused formalisms here.

The structural question that followed was where to encode control. [Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues for explicit state transitions and validation checkpoints in software rather than prompt chains. [Aiyan's reliability piece](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) reaches the same conclusion from a data engineering case study: a system evolved from rigid state machine to orchestrator to single general-purpose agent, and the lesson was that tool design and context visibility beat prompt engineering.

Anthropics own engineering posts represent one end of the spectrum: managed infrastructure that separates concerns cleanly. [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the agent harness, session log, and sandbox into stable interfaces. [Harness design for long-running apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture for multi-hour sessions, while [effective harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) details a two-agent initializer-plus-incremental-coder setup that maintains state across context windows. [Dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) extends this further by letting the model write its own orchestration scripts to spawn hundreds of parallel subagents.

A dissenting view comes from [Aiyan's orchestration strategy piece](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat), which argues teams should not build custom orchestration at all. The loop is a commodity; the durable value is in MCP tool servers and domain-specific APIs that extend frontier agents.

For routing specifically, [DigitalOcean's inference router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match requests to the best-fit backend by cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves similar alignment with a compact 1.5B model that maps queries to user-defined domains without retraining when new models arrive.

The enterprise governance layer is addressed by [Speakeasy's control plane architecture](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors): identity, policy enforcement, tool routing, and observability unified across all agents. [Meiklejohn's landscape survey](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) adds that recent reliability measurement research has narrowed what orchestration actually needs to solve.

Armin Ronacher [raises the counterweight](/reading/2026-06/2026-06-23t161552-the-coming-loop): harness loops amplify LLMs' tendency toward defensive, opaque code, and risk producing codebases that require machine participation to maintain. Orchestration, in this framing, is not only a technical problem but a question about where engineering judgment lives.
