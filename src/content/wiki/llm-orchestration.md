---
title: LLM orchestration
summary: >-
  LLM orchestration is the layer of control flow, harness design, and agent
  coordination that routes, sequences, and supervises language model calls — a
  space evolving rapidly from hand-rolled loops toward managed infrastructure.
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
compiled_at: '2026-10-05T23:55:19.504Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1307
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
  cost_usd: 0.037605
---
LLM orchestration names the structural problem of getting language models to accomplish tasks that exceed a single inference call: routing requests to appropriate models, sequencing tool calls, managing state across context windows, and coordinating multiple agents toward a shared goal.

The earliest multi-agent systems, surveyed by [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the), were largely coordination proofs-of-concept. Systems like CAMEL, ChatDev, and AutoGen, reviewed in [Wave 1](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), demonstrated that agents could coordinate at all, but shared failure modes: no concurrency control, no escalation paths, brittle assumptions about turn-taking. The field's second wave shifted toward measuring reliability, and practical orchestration has followed.

A recurring argument across multiple sources is that prompt engineering is the wrong tool for orchestration reliability. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that complex agents need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints. An earlier case study makes the same point empirically: a data engineering agent evolved through a rigid state machine, an orchestrator, and finally a single general-purpose agent, with reliability gains coming from environmental constraints like tool design and context visibility rather than from prompt refinement [Aiyan](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it).

Harness design has emerged as the primary engineering surface. Anthropic's [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separate the agent harness, session log, and sandbox into stable interfaces so the system can evolve as models improve. A [two-agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) for long-running coding sessions uses an initializer to scaffold state and a coding agent to consume it incrementally across context windows. A GAN-inspired architecture described in [harness design for long-running apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) adds a planner-generator-evaluator triad to address context anxiety and self-evaluation bias. Harness optimization is now tractable enough that [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) implements a propose-score-Pareto loop to search the space of memory, retrieval, and prompt templates around a fixed model.

At scale, orchestration splits into routing and coordination. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves similar routing with a 1.5B model by aligning on user-defined domains rather than requiring retraining. For multi-agent coordination, [Meiklejohn's fifth installment](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that coordination structure must match task structure, and that distributed systems formalisms remain underused in the field.

Enterprise deployments add a governance layer. [Speakeasy's AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) describes identity, policy enforcement, tool routing, and observability as a unified infrastructure concern. Anthropic's [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) push orchestration further by letting Claude itself write the orchestration scripts that spin up parallel subagents for large-scale tasks.

This creates a strategic question that [Aiyan's orchestrator piece](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) addresses directly: if frontier agents like Claude Code handle the loop, teams should invest in domain-specific MCP tool servers and skills rather than custom orchestration frameworks. Armin Ronacher's [counterpoint](/reading/2026-06/2026-06-23t161552-the-coming-loop) is that harness loops are becoming unavoidable but amplify LLMs' worst tendencies, producing opaque codebases that may require machine participation to maintain. The infrastructure is maturing faster than the norms for using it.
