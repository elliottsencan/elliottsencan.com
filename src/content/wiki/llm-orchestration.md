---
title: LLM orchestration
summary: >-
  LLM orchestration is the layer of control flow, harness design, and routing
  logic that coordinates one or more language models toward a goal, with debate
  ongoing about how much of that layer should be custom-built versus delegated
  to hosted infrastructure.
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
compiled_at: '2026-08-24T18:49:38.694Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1267
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
  cost_usd: 0.037005
---
Orchestration sits between a raw language model and a finished task. It decides which model runs when, how state survives across context windows, when to branch into parallel subagents, and how failures get caught before they propagate. The sources collected here cover that layer from multiple angles: harness architecture, routing policy, coordination theory, and the question of whether teams should build orchestration at all.

The architectural baseline is a loop: plan, act, evaluate, repeat. [Anthropic's harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) formalizes this as a GAN-inspired triad of planner, generator, and evaluator agents, each running in separate context windows so that no single model both produces and judges its own output. A companion piece on [effective harnesses for long-running agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) adds the practical detail: an initializer scaffolds a git repo and progress file so a downstream coding agent can make consistent progress across many context windows without re-deriving its own state.

State management is where most orchestration designs fail or succeed. [Agentic Engineering](/reading/2026-06/2026-06-21t112220-agentic-engineering) names context rot as a central failure mode: as a long-running loop accumulates turns, earlier context degrades in influence. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) address this by keeping data in a REPL environment and letting the model pull selectively into token space rather than stuffing everything into one window. The [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) from Anthropic separates the agent harness, session log, and sandbox into stable interfaces so each component can be swapped as models improve without breaking the whole system.

Control flow is a recurring prescription. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that prompt engineering cannot substitute for explicit state transitions and validation checkpoints encoded in software. A data engineering case study at [aiyan.io](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) corroborates this: three successive architectures converged on the insight that tool design and environmental constraints beat prompt elaboration for reliability.

At scale, orchestration includes routing: choosing which model handles a given request. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match requests to the best-fit backend for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) takes a lighter approach: a 1.5B model maps queries to user-defined domains and action types without retraining when new models are added.

There is a live disagreement about how much custom orchestration teams should build. [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues the loop is not a moat: frontier agents like Claude Code already maintain it, so teams should invest in MCP tool servers and domain APIs instead. Anthropic's own [dynamic workflows announcement](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) leans the same direction, letting Claude write its own orchestration scripts that spin up parallel subagents for codebase-wide tasks. But [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies and can produce codebases that require machine participation to maintain, raising questions about whether the abstraction is being adopted faster than engineers understand its costs.

Coordination theory from the multi-agent literature adds structure to these debates. [Wave 1 systems](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) like CAMEL and AutoGen showed that agents can coordinate but shared failure modes, including missing concurrency control and no escalation paths, appeared across every design. A later survey argues that coordination structure must match task structure and that distributed systems theory offers formalisms the field has not yet absorbed.
