---
title: LLM orchestration
summary: >-
  LLM orchestration covers the patterns, architectures, and tooling used to
  coordinate language models through multi-step tasks, from simple harnesses to
  multi-agent pipelines with explicit state, control flow, and evaluation loops.
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
aliases:
  - workflow-orchestration
compiled_at: '2026-06-18T22:57:39.387Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4995
    output_tokens: 1023
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
  cost_usd: 0.03033
---
The core question in LLM orchestration is how to structure control flow around a model so it can complete complex, long-running tasks reliably. Early answers were largely prompting strategies; the field has converged on the view that [environmental constraints and explicit software structure](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) outperform prompt engineering for that goal.

A recurring architecture is the separation of roles: planner, executor, and evaluator. Anthropic's harness work describes a [GAN-inspired three-agent setup](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) where each role is isolated to prevent self-evaluation bias, and a [two-agent initializer-plus-coder pattern](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) that persists state across context windows via a progress file and git repo. The [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) formalizes this further by separating the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve.

The evolution of a single data engineering agent through three successive designs — state machine, orchestrator, general-purpose agent — illustrates how teams often discover that [tool design and context visibility matter more than orchestration sophistication](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). That aligns with the argument that [custom orchestration frameworks are not a durable moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat); shipping MCP tool servers and domain-specific skills on top of frontier agents is more defensible than maintaining a bespoke loop.

At the research level, [Wave 1 multi-agent systems](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) (CAMEL, MetaGPT, AutoGen) proved agents could coordinate but exposed shared failure modes: no concurrency control, no escalation paths. Later work on debate and coordination argues that coordination structure must match task structure, and that distributed systems theory offers formalisms the field has not yet fully applied.

On the infrastructure side, [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) keep data outside the context window in a REPL environment, addressing context rot by letting the model pull selectively. [Dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) take a different route, letting the model itself write orchestration scripts that spin up hundreds of parallel subagents. Both approaches treat the orchestration layer as something that can be generated or optimized rather than hand-authored. [Harness Forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) makes this explicit, running a propose-score-Pareto loop to optimize the scaffold around a fixed model.

Enterprise adoption adds a governance dimension: the [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) concept frames orchestration as a policy and identity layer that sits above individual agents and enforces routing, observability, and access control across every system an agent touches.
