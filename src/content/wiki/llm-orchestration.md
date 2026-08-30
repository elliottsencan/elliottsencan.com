---
title: LLM orchestration
summary: >-
  LLM orchestration covers the architectures, harnesses, and control structures
  that coordinate one or more language models across multi-step tasks, and a
  growing body of practice argues that deterministic scaffolding beats prompt
  engineering for reliability.
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
compiled_at: '2026-08-30T05:55:52.217Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1309
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
  cost_usd: 0.037635
---
LLM orchestration refers to the layer of code and infrastructure that sequences model calls, manages state, routes requests, and coordinates multiple agents toward a goal. The concept spans a wide range, from simple loops that call one model repeatedly to full multi-agent pipelines where specialized subagents run in parallel under a supervising planner.

Early multi-agent research, catalogued by [Meiklejohn](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), treated coordination itself as the research question. Systems like CAMEL, MetaGPT, and AutoGen demonstrated that agents could cooperate, but they shared failure modes: no concurrency control, no escalation paths, and no durable state. The second wave shifted attention to measuring reliability rather than proving coordination was possible at all [Meiklejohn, landscape](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the).

The practical lesson that emerged is that prompt engineering cannot substitute for structural control. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents require deterministic state transitions and validation checkpoints encoded in software. The Aiyan engineering team reached a similar conclusion after iterating through a state machine, an orchestrator, and then a single general-purpose agent: environmental constraints on tools and context visibility outperformed increasingly elaborate prompts [Aiyan, reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it).

Harness design has become its own sub-discipline. Anthropic has published multiple pieces on the topic: one describes a GAN-inspired planner-generator-evaluator architecture for multi-hour coding sessions [Rajasekaran](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development), another details a two-agent initializer-plus-incremental-coder pattern that maintains progress across context windows [Young](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents), and a third describes Managed Agents as a hosted service that separates the agent harness, session log, and sandbox into stable interfaces so the system can evolve as models improve [Martin et al.](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). Claude Code now generates orchestration scripts automatically, spinning up hundreds of parallel subagents for large-scale tasks like codebase migrations [Anthropic](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code).

At the routing layer, orchestration also means selecting which model handles each request. DigitalOcean's Inference Router uses a 30B mixture-of-experts model to match requests to the best-fit model for cost, latency, or quality [Hafeez](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router), while the Arch-Router paper proposes a compact 1.5B model that aligns routing with user-defined preferences without retraining when new models are added [Tran et al.](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

One contested question is how much orchestration teams should build themselves. [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are not a defensible investment, and that teams should instead ship MCP tool servers and agent skills that extend frontier agents, letting providers maintain the loop. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) accepts that outer harness loops are becoming unavoidable but warns they amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. The harness optimization work at [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) treats the scaffold itself as the variable to optimize, running a propose-score-Pareto loop over memory, retrieval, and prompt templates rather than tuning model weights.

Enterprise deployments add a governance dimension. Speakeasy's AI control plane reference architecture frames orchestration as unified identity, policy enforcement, tool routing, and observability across every agent a company runs [Batchu](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors), a concern also reflected in Amazon's Strands SDK, which ships guardrails and observability as first-class features [Strands](/reading/2026-06/2026-06-25t195020-strands-agents).
