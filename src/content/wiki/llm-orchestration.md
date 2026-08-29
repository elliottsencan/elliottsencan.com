---
title: LLM orchestration
summary: >-
  The coordination layer that routes, sequences, and manages LLM calls across
  tasks and agents, now a contested design space where architectural choices
  between custom frameworks, hosted harnesses, and control planes carry real
  tradeoffs.
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
compiled_at: '2026-08-29T20:18:46.461Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1100
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
  cost_usd: 0.0345
---
LLM orchestration refers to the layer of software that decides when to call a model, which model to call, what context to pass, and how to sequence or parallelize that work across a larger task. The field has moved fast enough that what counts as good practice in 2023 looks different from what practitioners advocate in 2025 and 2026.

The earliest wave of multi-agent research, covered in detail by [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), treated orchestration as a coordination proof-of-concept. Systems like AutoGen, MetaGPT, and CAMEL established that agents could hand off tasks, but shared failure modes emerged: no concurrency control, no escalation paths, and fragile message-passing that broke under realistic conditions. That body of work clarified the problem without yet solving it.

A recurring theme in more recent writing is that orchestration logic belongs in software, not prompts. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents need deterministic state transitions and validation checkpoints encoded as control flow, because prompt chains collapse under task complexity. This echoes findings from a data engineering case study at [Aiyan](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it), where iterating through a rigid state machine, then an orchestrator, then a single general-purpose agent showed that environmental constraints outperform prompt engineering for reliability.

At the infrastructure level, Anthropic has published several architectural accounts of how orchestration actually runs in production. Their Managed Agents service [separates the agent harness, session log, and sandbox into stable interfaces](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) so the system can evolve as models improve. A GAN-inspired planner-generator-evaluator architecture addresses context anxiety across multi-hour coding sessions [by decomposing roles explicitly](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). More recently, [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let Claude write its own orchestration scripts at runtime, spinning up hundreds of parallel subagents for tasks like codebase-wide migrations.

Model routing sits at one end of the orchestration stack. DigitalOcean's Inference Router uses a 30B mixture-of-experts model to [match each request to the best-fit model for cost, latency, or quality](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router), while the Arch-Router paper proposes a compact 1.5B model that [aligns routing with user-defined domains without retraining when new models arrive](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences). These are specialized orchestration decisions automated by smaller models.

Enterprise deployments add a governance dimension. Speakeasy's reference architecture for an [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) treats identity, policy enforcement, tool routing, and observability as first-class concerns that must unify across every agent and system in an organization.

Not all commentary favors building more orchestration. [Aiyan argues](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) that teams should skip custom orchestration frameworks and instead ship MCP tool servers and agent skills that extend frontier agents, letting Anthropic maintain the loop. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) is more ambivalent: harness loops are becoming unavoidable but risk amplifying LLMs' worst tendencies and producing codebases that require machine participation to maintain, raising questions about human oversight that the field has not fully answered.
