---
title: LLM orchestration
summary: >-
  The systems, patterns, and tradeoffs involved in coordinating one or more LLMs
  across multi-step tasks, from simple harnesses that manage context and state
  to full multi-agent pipelines with routing, evaluation, and control flow.
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
compiled_at: '2026-07-01T04:49:55.231Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5727
    output_tokens: 1252
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
  cost_usd: 0.035961
---
LLM orchestration names the layer of software that sits between a raw model API and a completed task. That layer handles control flow, context management, tool dispatch, state persistence, and increasingly the coordination of multiple agents working in parallel or sequence. The design decisions made at this layer determine whether an agent system is reliable, auditable, and actually useful.

The architectural debate sharpest right now is whether teams should build custom orchestration at all. [Aiyan argues no](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat): the orchestration loop is not a moat, and the effort spent maintaining a bespoke framework is better spent on domain-specific MCP tool servers that slot into frontier agents like Claude Code. Anthropic's own engineering blog sides with hosted infrastructure; the [Managed Agents post](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) describes separating the agent harness, session log, and sandbox into stable, swappable interfaces so the runtime can evolve independently of clients.

When custom orchestration is warranted, the literature consistently argues for explicit structure over prompt engineering. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the point directly: complex tasks need deterministic state transitions and validation checkpoints encoded in software, not increasingly elaborate prompt chains. The same lesson appears in a [data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) that iterated through state machine, orchestrator, and single-agent architectures, finding that tool design and context visibility outperformed prompt refinement at every stage.

For long-running tasks that exceed a single context window, harness design becomes the central problem. [Anthropic's harness post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent split: an initializer that scaffolds a feature list, repo, and progress file, then an incremental coding agent that reads that file to resume across context resets. A complementary [GAN-inspired architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) adds a dedicated evaluator agent to check output quality and break the self-evaluation bias that plagues single-agent loops. Anthropic's [dynamic workflows launch](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) pushes this further, letting Claude itself write orchestration scripts that spin up hundreds of parallel subagents for tasks like codebase-wide migrations.

Coordination between agents introduces distributed-systems problems that the early multi-agent research underestimated. [Christopher Meiklejohn's survey of Wave 1 work](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) identifies missing concurrency control and absent escalation paths as shared failure modes across CAMEL, AutoGen, MetaGPT, and peers. His follow-up on debate and state argues that coordination structure must match task structure, and that distributed systems formalisms remain underused in the field.

At scale, orchestration shades into routing: choosing which model handles which request. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match requests to the best available model on cost, latency, or quality dimensions. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) takes a preference-alignment approach with a compact 1.5B model that maps queries to user-defined domains without requiring retraining when new models are added.

Enterprise deployments add a governance dimension. [Speakeasy's AI control plane overview](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames orchestration as needing a unified layer for identity, policy enforcement, tool routing, and observability across every agent and system. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) adds a harder concern: harness loops amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain, raising real questions about human oversight that architecture alone does not answer.
