---
title: LLM orchestration
summary: >-
  The layer of control logic that coordinates how language models call tools,
  spawn subagents, manage state, and sequence work — and the ongoing debate
  about whether that layer belongs in custom frameworks or in the models
  themselves.
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
compiled_at: '2026-06-20T22:08:01.786Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4825
    output_tokens: 1028
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
  cost_usd: 0.029895
---
LLM orchestration names the control logic that sits above a model call: deciding what tools to invoke, when to hand off to another agent, how to carry state across context windows, and what counts as a completed task. The sources here treat orchestration as a genuine engineering discipline, not a prompt-writing exercise.

The foundational debate is whether teams should build their own orchestration frameworks at all. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues they shouldn't — frontier agents like Claude Code already handle the loop, so the durable investment is in the MCP tool servers and domain APIs that feed them, not in custom harness code. That position is complicated by Anthropic's own engineering posts, which show how much design goes into a good harness even inside Anthropic: [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces so the system can evolve as models improve, and [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent design — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent — that preserves coherent state across many context windows.

The reliability question runs through almost every source. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) and [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) converge on the same point: environmental constraints and deterministic state transitions outperform elaborate prompts. The [GAN-inspired planner/generator/evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) addresses a related problem — context anxiety and self-evaluation bias — by separating concerns across specialized roles rather than asking one agent to do everything.

Multi-agent coordination is the scaling dimension. [Wave 1 MAS research](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) (CAMEL, ChatDev, MetaGPT, AutoGen) established that agents can coordinate but exposed shared failure modes: no concurrency control, no escalation paths. The debate and coordination survey argues that distributed systems theory offers formalisms the field has not yet adopted, and that coordination structure must match task structure. Anthropic's [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) takes a different approach: let the model itself write the orchestration scripts that spin up parallel subagents for large-scale tasks.

At the infrastructure layer, the [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) concept adds governance — identity, policy enforcement, tool routing, and observability — across all agents in an enterprise. [Recursive Language Models](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) and [harness optimization](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) push further, treating the scaffold itself as a tunable artifact: memory, retrieval, and context construction can be optimized in a propose-score loop independent of the model weights.
