---
title: LLM orchestration
summary: >-
  LLM orchestration covers the control structures, harness designs, and routing
  layers that coordinate one or more language models into reliable, long-running
  pipelines, with current practice converging on environmental constraints over
  prompt engineering.
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
  - 2026-06/2026-06-21t130526-agentic-engineering
  - 2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router
  - >-
    2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences
compiled_at: '2026-06-22T07:20:09.636Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5506
    output_tokens: 1239
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
  cost_usd: 0.035103
---
LLM orchestration names the set of architectural decisions that sit between a raw model API and a working agentic system: how the model loop is structured, how state persists across context windows, how sub-tasks are delegated to specialized agents or tools, and how requests are routed to the right model in the first place.

Early multi-agent research, surveyed by [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the), treated coordination itself as the open question. The 2023 wave of systems like AutoGen, MetaGPT, and ChatDev [proved agents could coordinate at all](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) but left gaps: no concurrency control, no escalation paths, no formal grounding for when a given coordination structure actually fits the task. Later work on debate and shared-notebook state [argues that coordination structure must match task structure](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate), and that distributed systems theory offers formalisms the field has not yet absorbed.

On the reliability side, the dominant lesson across several practitioner sources is that prompt engineering is the wrong lever. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) iterated through a rigid state machine, an orchestrator, and finally a single general-purpose agent, finding that tool design and context visibility outperformed prompt complexity at each step. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point structurally: deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, beats elaborate prompt chains when tasks grow in complexity.

For long-running tasks specifically, the challenge is context rot and self-evaluation bias. Anthropic's harness work addresses this through separation of concerns: their Managed Agents architecture [decouples the agent harness, session log, and sandbox into stable, swappable interfaces](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) so the system can absorb model improvements without client breakage. A GAN-inspired planner/generator/evaluator architecture [overcomes self-evaluation bias during multi-hour coding sessions](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development), and a two-agent initializer-plus-incremental-coder design [maintains progress across many context windows via an external progress file](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Recursive Language Models take a different approach: [keeping data in a REPL environment and letting the model pull it selectively into token space](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) avoids filling the context with stale state.

At the infrastructure layer, orchestration shades into routing. DigitalOcean's Inference Router [uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). Arch-Router [proposes a compact 1.5B model that maps queries to user-defined domains and action types](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) without retraining when new models are added. Above routing sits what Speakeasy calls the [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors): the governance layer that unifies identity, policy enforcement, tool routing, and observability across every agent and system in an enterprise.

A recurring strategic tension runs through the build-vs-delegate question. [Aiyan argues](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) that teams should skip custom orchestration frameworks entirely, shipping MCP tool servers and agent skills that extend frontier agents instead, since the orchestration loop itself is not a durable competitive advantage. Anthropic's own Claude Code now [writes orchestration scripts that spin up hundreds of parallel subagents automatically](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code), which adds practical weight to that position.
