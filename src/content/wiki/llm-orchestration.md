---
title: LLM orchestration
summary: >-
  LLM orchestration covers the harnesses, control loops, and routing layers that
  coordinate one or more language models through multi-step tasks, and a growing
  body of practice shows that explicit structure beats prompt complexity for
  reliability.
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
compiled_at: '2026-10-26T22:29:30.655Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1197
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
  cost_usd: 0.035955
---
Orchestration, in the LLM context, is the layer between a raw model and a completed task: the scaffolding that decides what runs, in what order, with what tools, and how to recover when something goes wrong. The sources here span that layer from first principles to production systems.

The earliest wave of multi-agent research, surveyed by [Meiklejohn](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the), treated coordination as the central problem: could agents divide work and talk to each other at all? Papers like CAMEL, MetaGPT, and AutoGen [demonstrated yes](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) but left open questions about concurrency control, state management, and escalation paths when agents deadlock or hallucinate.

Practitioners quickly found that prompt engineering is a poor substitute for structure. A data engineering agent that evolved through a rigid state machine, an orchestrator, and finally a single general-purpose agent showed that [tool design and context visibility](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) outperform prompt tuning at every stage. Brian Suh makes the same point directly: [deterministic control flow and validation checkpoints](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) are what make agents reliable on complex tasks, not longer prompts.

Architecture choices follow from that. Anthropic's Managed Agents service [decouples the agent harness, session log, and sandbox](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) into stable interfaces so each component can evolve independently. A GAN-inspired planner-generator-evaluator arrangement [overcomes context anxiety and self-evaluation bias](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) in multi-hour coding sessions. Anthropic's two-agent harness for long-running work [keeps state across context windows](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) through an initializer that scaffolds a progress file and an incremental coding agent that reads it. Dynamic workflows in Claude Code push this further, [auto-generating orchestration scripts that spin up hundreds of parallel subagents](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) for large-scale migrations and audits.

One contested question is how much custom orchestration teams should build at all. Aiyan argues that [the orchestration loop is commodity](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) and that teams should ship MCP tool servers instead, letting frontier agents like Claude Code own the loop. Armin Ronacher takes a more cautionary view: outer harness loops are [becoming unavoidable but amplify LLMs' worst coding tendencies](/reading/2026-06/2026-06-23t161552-the-coming-loop), producing defensive, opaque codebases that may require machine participation to maintain.

At the infrastructure level, orchestration extends to routing. DigitalOcean's Inference Router [uses a 30B mixture-of-experts model to match each request to the best-fit model](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) for cost, latency, or quality. The Arch-Router paper proposes a [1.5B preference-aligned routing model](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) that maps queries to user-defined domains without retraining when new models arrive. The AI control plane concept [adds governance across those routes](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors): identity, policy, and observability as first-class concerns rather than afterthoughts.

Recursive Language Models offer a related angle: keeping data in a REPL environment and [letting the model pull selectively into token space](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) reduces context rot, and the execution traces those systems produce can inform lower-latency harness designs downstream.
