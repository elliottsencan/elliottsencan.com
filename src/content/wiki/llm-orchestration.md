---
title: LLM orchestration
summary: >-
  LLM orchestration covers the control structures, harnesses, and routing layers
  that coordinate language models and agents across multi-step tasks, with
  sources ranging from architectural patterns to warnings about what
  orchestration complexity costs.
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
compiled_at: '2026-07-08T00:17:20.790Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5866
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
  cost_usd: 0.036198
---
Orchestration, in the LLM context, refers to any layer that manages how models receive tasks, call tools, hand off to other agents, and accumulate state across turns. The shape of that layer is contested: it can be a rigid state machine, a general-purpose orchestrator, a hosted harness, or a routing model that picks the right backend per request.

The earliest multi-agent systems (CAMEL, MetaGPT, AutoGen and peers) demonstrated that agents could coordinate at all, but [Meiklejohn's Wave 1 survey](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) identifies their shared failure modes: no concurrency control, no escalation paths, coordination mechanisms that don't match task structure. A later installment on debate and coordination argues that distributed systems theory offers formalisms the field has not yet borrowed.

On the architecture side, two positions have hardened. One holds that deterministic control flow encoded in software beats prompt engineering: [Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) and the [Aiyan reliability piece](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) both show that explicit state transitions and environmental constraints outperform elaborate prompts when tasks grow complex. The other position, illustrated by Anthropic's own engineering posts, is to separate the agent harness from the model: [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples session log, sandbox, and harness into swappable interfaces; the [effective harnesses post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent initializer-plus-coder that maintains state across many context windows; the [harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) uses a GAN-inspired planner-generator-evaluator loop to combat context rot and self-evaluation bias.

At the infrastructure level, orchestration splits into request routing and agent coordination. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best-fit backend; [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a 1.5B preference-aligned alternative that adds new models without retraining. Above that sits the [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors): unified identity, policy enforcement, and observability across every agent and tool in an enterprise stack.

Recent tooling pushes orchestration further toward automation. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let the model write orchestration scripts that spin up hundreds of parallel subagents. The [orchestrator-supaconductor plugin](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) turns a single natural-language command into a planning-execution-evaluation pipeline with a virtual board for high-stakes decisions. [RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) suggest a different angle: keep data in a REPL environment and let the model pull only what it needs into token space, then mine the resulting traces to build lower-latency agents.

The strategic question is whether custom orchestration is worth building at all. [Aiyan's orchestrator piece](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues it is not: the loop itself is a commodity, and differentiation lives in domain APIs and context, not in the harness. Ronacher's [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop) accepts that harness loops are becoming unavoidable but warns they amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. The tension between orchestration as infrastructure and orchestration as liability runs through the field.
