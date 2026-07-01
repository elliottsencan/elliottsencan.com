---
title: LLM orchestration
summary: >-
  LLM orchestration covers how agent loops, harnesses, routing layers, and
  multi-agent pipelines are structured to coordinate language model calls into
  reliable, long-running systems — a space where architectural choices matter
  more than prompt quality.
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
compiled_at: '2026-07-01T00:40:20.234Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5727
    output_tokens: 1271
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
  cost_usd: 0.036246
---
LLM orchestration refers to the infrastructure that sits around raw model calls: the loops, harnesses, routers, and coordination protocols that turn a single LLM into a system capable of sustained, multi-step work. The field has developed fast enough that several distinct design philosophies are already competing.

The earliest multi-agent coordination work, surveyed by [Meiklejohn](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the), focused on whether agents could coordinate at all. Systems like CAMEL, ChatDev, MetaGPT, and AutoGen demonstrated plausible coordination but shared structural weaknesses: no concurrency control, no escalation paths, and brittle role assignment. [Meiklejohn's Wave 1 review](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) treats these as proofs of concept rather than production templates.

The question of coordination structure has deepened since. [Meiklejohn on debate and state](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that the mechanism must match the task: convergent debate, adversarial debate, and shared-notebook state each suit different problem shapes, and distributed systems theory offers formalisms the ML field has largely ignored.

On the reliability side, the consensus across several sources is that prompting cannot substitute for engineering. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues directly that complex agents require deterministic control flow and explicit state transitions, not longer prompts. The same conclusion appears in practice: [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces an agent through three architectures before settling on environmental constraints, tool design, and context visibility as the levers that actually improved reliability.

Harness design has emerged as its own sub-discipline. Anthropic has published two engineering posts on the subject. [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces so the system can absorb model improvements without breaking clients. [Harness design for long-running apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator architecture that sustains coherent work across multi-hour sessions. [Effective harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) adds the pattern of an initializer agent that scaffolds state before a coding agent begins incremental work. [Anthropic's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) takes this further by having Claude write its own orchestration scripts that spawn hundreds of parallel subagents.

Routing is a distinct orchestration concern: which model handles which request. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match requests to models by cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) takes a lighter approach with a 1.5B model that maps queries to user-defined domains without retraining when the model pool changes.

At the governance layer, [Speakeasy's AI control plane overview](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames orchestration as an enterprise policy problem: unified identity, tool routing, and observability across all agents a company runs.

A persistent strategic question runs through this space. [Aiyan's orchestrator piece](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are not a defensible investment; teams should extend frontier agents via MCP tool servers and let providers maintain the loop. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) is less sanguine: harness loops are becoming unavoidable, but they amplify LLM failure modes and risk producing codebases that require machine participation to maintain. The orchestration layer is not neutral infrastructure; its design shapes what kind of software gets written and who can reason about it.
