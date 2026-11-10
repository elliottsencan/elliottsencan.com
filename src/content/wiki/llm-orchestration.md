---
title: LLM orchestration
summary: >-
  LLM orchestration covers the architectures, harnesses, and control structures
  that coordinate one or more language models through multi-step tasks, from
  simple loop scaffolds to multi-agent pipelines with routing, state management,
  and evaluation.
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
compiled_at: '2026-11-10T01:21:48.595Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1232
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
  cost_usd: 0.03648
---
Orchestration is the layer between a raw language model and a completed task. It decides what gets called, when, with what context, and what happens to the result. The sources here trace a field moving from ad-hoc prompt chains toward principled software engineering.

The earliest multi-agent work, documented in [Meiklejohn's Wave 1 survey](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), treated coordination as the central problem: could agents divide labor at all? Systems like CAMEL, ChatDev, and AutoGen established that they could, but shared failure modes, including no concurrency control and no escalation paths, revealed that the question of *how* to coordinate was largely unanswered. [Meiklejohn's fifth installment](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) extends this, surveying convergent debate, adversarial debate, and shared-notebook state, and argues that distributed systems theory offers untapped formalisms for getting coordination structure to match task structure.

A recurring theme across practitioner sources is that prompt engineering is the wrong lever for orchestration reliability. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints. The [data engineering agent case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) illustrates this directly: three architectural iterations, from rigid state machine to orchestrator to single general-purpose agent, showed that environmental constraints like tool design and context visibility outperform prompt complexity every time.

Anthropus engineering posts show what this looks like in production. [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve. [Harness design for long-running apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator triad that overcomes context anxiety and self-evaluation bias. [Effective harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) adds a two-agent initializer-plus-incremental-coder pattern that preserves state across many context windows. [Dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) takes this further still, letting Claude itself write orchestration scripts that spin up parallel subagents for large-scale tasks.

Routing is a distinct orchestration sub-problem: given a request, which model handles it? [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match requests to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) shrinks that routing model to 1.5B parameters by aligning on human preferences rather than raw benchmarks, with no retraining when new models are added.

At the governance level, [Speakeasy's AI control plane framing](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) argues that enterprises need a unified identity, policy, and observability layer sitting above all orchestration, treating it as infrastructure rather than application code.

The strategic question is who should own the orchestration loop at all. [Aiyan's post on the orchestrator as moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are rarely defensible; teams building on frontier agents like Claude Code should invest instead in MCP tool servers and domain-specific APIs, letting the model vendor maintain the loop. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) accepts that harness loops are becoming unavoidable but warns they amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain, raising questions about engineering judgment and human oversight that the field has not yet answered.
