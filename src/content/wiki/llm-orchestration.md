---
title: LLM orchestration
summary: >-
  LLM orchestration covers how language models are coordinated, scheduled, and
  supervised across agent loops, multi-agent pipelines, and harness layers, with
  active debate over where to place control logic and who should own the loop.
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
compiled_at: '2026-07-02T12:31:14.338Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5866
    output_tokens: 1192
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
  cost_usd: 0.035478
---
LLM orchestration is the set of mechanisms that govern how language models receive tasks, call tools, delegate to other agents, and return results, spanning single-agent harnesses, multi-agent pipelines, and cross-system routing.

The earliest coordination experiments, documented in 2023 papers like CAMEL, ChatDev, MetaGPT, and AutoGen, demonstrated that agents could cooperate at all [Getting Up to Speed, Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). Those systems surfaced shared failure modes: no concurrency control, no escalation paths, and coordination structures that did not match task structure [Getting Up to Speed, Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). The lesson from that wave is that debate and shared-notebook patterns each suit different task types, and borrowed formalisms from distributed systems remain underused.

As orchestration moved toward production, two positions on control logic hardened. One holds that reliability comes from deterministic software: explicit state transitions and validation checkpoints, not longer prompt chains [Agents Need Control Flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). A data engineering case study confirms this, showing that environmental constraints on tool design and context visibility outperformed prompt engineering across three successive architectures [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it).

Harness design has become a discipline of its own. Anthropic's work separates the agent harness, session log, and sandbox into stable, swappable interfaces so the stack can evolve as models improve [Scaling Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). For long-running tasks, a two-agent initializer-plus-incremental-coder pattern maintains progress across context windows [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents), and a GAN-inspired planner-generator-evaluator architecture addresses context anxiety and self-evaluation bias during multi-hour coding sessions [Harness Design for Long-Running Apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). Harness parameters themselves can be optimized: harness-forge implements a propose-score-Pareto loop to tune memory, retrieval, and prompt templates around a fixed model [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge).

At a higher level, orchestration intersects model routing. DigitalOcean's Inference Router uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality [DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router), while Arch-Router achieves preference-aligned routing with a compact 1.5B model that maps queries to user-defined domains without retraining as new models arrive [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

A recurring strategic question is who should own the outer loop. One argument is that custom orchestration frameworks are not defensible and teams should instead ship MCP tool servers that extend frontier agents, letting providers maintain the harness [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat). Anthropic's dynamic workflows move in exactly that direction, generating orchestration scripts that spin up hundreds of parallel subagents automatically [Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Armin Ronacher counters that outer loops are becoming unavoidable but warns they amplify LLMs' worst tendencies and risk creating codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). That tension between delegation and oversight sits at the center of where orchestration is heading.
