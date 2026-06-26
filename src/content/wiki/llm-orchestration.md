---
title: LLM orchestration
summary: >-
  The layer of control logic that sequences, routes, and coordinates LLM calls
  and agent actions, now evolving from custom frameworks toward structured
  harnesses, multi-agent pipelines, and governance planes.
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
compiled_at: '2026-06-26T02:59:32.867Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5727
    output_tokens: 1215
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
  cost_usd: 0.035406
---
LLM orchestration refers to the control logic that decides when to call a model, which model to call, how to sequence actions across multiple agents, and how to handle failures, state, and context across those calls. The sources collected here span a wide range: opinionated advice on where to invest engineering effort, concrete harness architectures from Anthropic, routing research, and retrospective surveys of the early multi-agent literature.

The sharpest strategic argument comes from [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat), which contends that building a custom orchestration framework is a poor use of engineering time. Frontier agents like Claude Code already handle the loop; the defensible surface is your domain APIs and context, not the plumbing that sequences them.

On the engineering side, multiple sources converge on the same lesson: prompt engineering alone cannot make an orchestrated system reliable. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through three architectures before settling on environmental constraints, tool design, and context visibility as the actual levers. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point in terms of deterministic state transitions and validation checkpoints.

Anthropics own engineering posts show what this looks like in practice. [Scaling Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) describes separating the agent harness, session log, and sandbox into stable interfaces so the system can swap models without breaking clients. [Harness Design for Long-Running Application Development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) outlines a GAN-inspired planner-generator-evaluator split for multi-hour coding sessions, and [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) adds an initializer-plus-incremental-agent pattern for maintaining state across many context windows. [Introducing Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) takes this further, letting Claude write its own orchestration scripts and spin up hundreds of parallel subagents for large-scale tasks.

At the infrastructure level, [AI Control Plane: Architecture and Vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) describes a governance layer that unifies identity, policy enforcement, tool routing, and observability across all agents an enterprise runs. LLM routing is a distinct sub-problem: [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) and [DigitalOceans Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) each describe systems that select models per-request based on cost, latency, or quality, using compact routing models rather than hard-coded rules.

The multi-agent coordination literature, surveyed by Christopher Meiklejohn across [Part 1](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the), [Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), and [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate), identifies a recurring failure mode in early systems: coordination mechanisms were bolted on without matching them to task structure. Shared state, debate protocols, and formal results like the CALM theorem each address different coordination problems, and choosing the wrong abstraction is as costly as having none.

A counterweight to enthusiasm appears in [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop), which warns that harness loops amplify LLMs worst tendencies and can produce codebases that require machine participation to remain legible, raising questions about whether human oversight remains meaningful when the orchestrator runs autonomously for hours.
