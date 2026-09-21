---
title: LLM orchestration
summary: >-
  LLM orchestration covers the control structures, harnesses, and coordination
  patterns that direct language models through multi-step tasks, and the field
  is rapidly splitting into debates about where that logic should live and who
  should own it.
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
compiled_at: '2026-09-21T21:53:31.588Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1233
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
  cost_usd: 0.036495
---
Orchestration is the layer between a raw language model and a completed task: the code that decides what the model does next, tracks state across steps, routes between models, and enforces constraints when the model would otherwise drift. Every source here is, in one way or another, an argument about how to design that layer.

The earliest multi-agent systems treated orchestration as a research artifact. [Wave 1 systems like CAMEL, MetaGPT, and AutoGen](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) proved that agents could coordinate at all, but shipped without concurrency control or escalation paths. The coordination structures were baked into prompts, and they broke under load. That lesson keeps recurring: [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) and [the data engineering case study from Aiyan](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) both argue that prompt engineering cannot substitute for deterministic control flow. State machines and validation checkpoints, not more elaborate instructions, are what keep agents on track.

Anthropics engineering posts represent the current production consensus. [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the harness, session log, and sandbox into stable interfaces so the orchestration layer can evolve independently of the model. The [two-agent harness for long-running tasks](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses an initializer to scaffold state that persists across context windows. The [GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) separates generation from critique to fight self-evaluation bias. [Dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) push this further, letting Claude itself write the orchestration scripts that spin up parallel subagents for codebase-wide tasks.

That last move raises the sharpest strategic question in the field. [Aiyan's orchestrator post](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are not defensible: frontier agents like Claude Code will absorb the loop, and the durable investment is in MCP tool servers and domain-specific APIs. [The harness-forge project](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) takes a complementary view, treating the scaffolding around a fixed model as a space to optimize with a propose-score-Pareto loop. Meanwhile [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer harness loops, however well-designed, amplify LLMs' worst tendencies and risk producing codebases that require machine participation to read.

At the infrastructure level, orchestration increasingly means routing. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match requests to the best-fit LLM for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves similar alignment with a 1.5B model trained on human preferences. The [AI control plane framing from Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) extends this into enterprise governance: unified identity, policy enforcement, and observability across every agent a company runs.

Across these sources, [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) offer one architectural direction for the context problem, keeping data in a REPL environment rather than cramming it into the token window. [Coordination theory](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) suggests the field has underused distributed systems formalisms for matching coordination structure to task structure. Both point toward the same gap: orchestration today is largely empirical, and the theoretical foundations are still being built.
