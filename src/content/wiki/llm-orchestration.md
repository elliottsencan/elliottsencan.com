---
title: LLM orchestration
summary: >-
  LLM orchestration is the set of architectural patterns, harnesses, and control
  layers that coordinate how language models plan, delegate, and execute work,
  with evolving consensus that structural constraints beat prompt engineering
  for reliability.
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
compiled_at: '2026-08-31T22:37:34.626Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1169
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
  cost_usd: 0.035535
---
LLM orchestration covers the mechanisms that sit between a raw model and a useful outcome: loops, harnesses, routing layers, multi-agent coordination, and the scaffolding that keeps long-running tasks coherent across context windows. The field has matured quickly, and the sources here trace an arc from early proof-of-concept coordination to production-grade architecture.

The first wave of multi-agent research, documented by [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the), was largely about demonstrating that LLMs could coordinate at all. Systems like CAMEL, MetaGPT, and AutoGen showed role-based delegation and message-passing, but [shared failure modes](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) included no concurrency control and no escalation paths. [Later work](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) on debate, shared-notebook state, and the CALM theorem argued that coordination structure must match task structure, and that distributed systems theory offers untapped formalisms.

A recurring finding across practitioner sources is that prompting cannot substitute for engineering. A data engineering agent that cycled through state machine, orchestrator, and single-agent architectures showed that [tool design and context visibility](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) outperform prompt engineering for reliability. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point more bluntly: complex tasks need deterministic control flow with explicit state transitions and validation checkpoints, not longer prompt chains.

Harness design has emerged as its own subfield. Anthropic has published multiple pieces on it: [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into swappable interfaces; a [two-agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses an initializer plus an incremental coder to maintain state across context windows; and a [GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) tackles context anxiety and self-evaluation bias. [Dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) take this further, letting the model itself write orchestration scripts that spin up parallel subagents at scale.

At the infrastructure layer, orchestration increasingly means routing. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match requests to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves similar alignment with a compact 1.5B model keyed on user-defined domains. The [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) concept extends this to enterprise governance: unified identity, policy enforcement, tool routing, and observability across every agent a company runs.

A strategic counterpoint runs through the practitioner sources. [Aiyan argues](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) that building custom orchestration frameworks is a distraction; shipping MCP tool servers and agent skills that extend frontier agents yields more durable value. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) agrees harness loops are becoming unavoidable but warns they amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. The orchestration layer is not neutral infrastructure; its design choices shape what human oversight remains possible.
