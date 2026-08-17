---
title: LLM orchestration
summary: >-
  LLM orchestration covers the architectural patterns, harness designs, and
  coordination mechanisms that govern how language models plan, delegate, and
  execute work across single-agent loops and multi-agent pipelines.
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
compiled_at: '2026-08-17T18:47:59.153Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1160
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
  cost_usd: 0.0354
---
At its simplest, LLM orchestration is the layer of software that decides what a model does next: which tools it can call, which state it can see, how its output is validated, and when control passes to another agent or back to a human. The field has moved fast enough that the right architecture for one quarter often looks wrong the next.

The earliest serious coordination work, surveyed in [Wave 1 research](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), asked the basic question of whether agents could coordinate at all. Systems like CAMEL, ChatDev, and AutoGen proved they could, but exposed shared failure modes: no concurrency control, no escalation paths, and brittle message-passing. Those gaps pushed later work toward explicit structure rather than emergent behavior.

The structural answer that emerged was the harness: a scaffold that sits outside the model and governs its loop. Anthropic's Managed Agents service [separates the agent harness, session log, and sandbox](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) into swappable interfaces so the system can absorb model upgrades without breaking callers. A companion post on [long-running application development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator split that overcomes context anxiety across multi-hour coding sessions. Separately, a [two-agent initializer-plus-incremental-coder harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) shows how state can be carried across context windows without drift.

Reliability is the thread that connects all of these. One practitioner account traced a data-engineering agent through three architectures before settling on environmental constraints, concluding that [tool design and context visibility outperform prompt engineering](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) for reliability. Brian Suh makes the same argument more directly: [reliable agents need deterministic control flow encoded in software](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts), not elaborate prompt chains.

At scale, orchestration requires routing as well as looping. DigitalOcean's Inference Router uses [a 30B mixture-of-experts model to match each request to the best-fit backend](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) for cost, latency, or quality. The Arch-Router paper proposes [a compact 1.5B routing model that aligns model selection with user-defined preferences](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) without retraining when new models are added. These are orchestration decisions moved upstream, before any agent loop runs.

A skeptical view runs through the practitioner commentary. The argument in [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) is that building custom orchestration frameworks is the wrong investment; the durable advantage lies in domain-specific tools and APIs that extend frontier agents, not in owning the loop. Armin Ronacher extends this concern further, warning that [harness loops amplify LLMs' worst tendencies](/reading/2026-06/2026-06-23t161552-the-coming-loop) and risk producing codebases that require machine participation to maintain.

Coordination structure for multi-agent work gets formal treatment in research on [convergent and adversarial debate, shared-notebook state, and the CALM theorem](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate), which argues that distributed systems theory offers untapped formalisms for the field. Practical implementations like Anthropic's [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code), which spin up hundreds of parallel subagents for codebase migrations and audits, show how far from research proofs those formalisms have traveled in a short time.
