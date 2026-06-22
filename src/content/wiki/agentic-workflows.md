---
title: Agentic workflows
summary: >-
  Agentic workflows delegate multi-step tasks to LLM-driven agents operating
  across context windows, tools, and sandboxes — a design space defined by
  competing pressures between autonomy and reliability, speed and understanding,
  capability and control.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - 2026-04/2026-04-30t231319-markdownlm
  - 2026-05/2026-05-03t110355-babysitting-the-agent
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-04t235011-plurai
  - 2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code
  - 2026-05/2026-05-06t171355-vectifyaipageindex
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - >-
    2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning
  - 2026-05/2026-05-11t155625-storybloqstorybloq
  - 2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively
  - 2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - 2026-05/2026-05-19t193626-slow-mode
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - 2026-06/2026-06-04t194244-inside-openais-in-house-data-agent
  - >-
    2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got
  - >-
    2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with
  - 2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos
  - 2026-06/2026-06-11t023157-memory-design-zerostack
  - 2026-06/2026-06-11t023435-subagents-design-zerostack
  - 2026-06/2026-06-11t023723-gi-dellavzerostack
  - 2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - 2026-06/2026-06-14t094245-agentswarms
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - >-
    2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup
  - >-
    2026-06/2026-06-20t053342-if-llms-have-human-like-attributes-then-so-does-age-of
  - 2026-06/2026-06-21t112220-agentic-engineering
  - 2026-06/2026-06-21t130526-agentic-engineering
compiled_at: '2026-06-22T02:30:30.922Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12614
    output_tokens: 1628
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
  cost_usd: 0.062262
---
An agentic workflow is an LLM-driven process that spans multiple tool calls, context windows, or coordinated subagents to complete a task that would otherwise require continuous human steering. The term covers everything from a single agent looping through a to-do list to a parallel swarm of hundreds of subagents rewriting a codebase. What unites these patterns is the shift of orchestration logic from human to machine — and the engineering consequences that follow.

The reliability problem surfaces immediately in practice. A data engineering agent built through three successive architectures — rigid state machine, orchestrator, then a single general-purpose agent — found that environmental constraints (tool design, ID keys, context visibility) outperformed prompt engineering at every stage [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). The same conclusion appears in a parallel framing: agents need deterministic control flow encoded in software, explicit state transitions, and validation checkpoints, not increasingly elaborate prompt chains [Agents Need Control Flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). Anthropic's harness engineering work formalizes this into five subsystems — instructions, state, verification, scope, and session lifecycle — that convert unreliable model output into dependable results [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering).

State management is a recurring structural challenge. When an agent spans many context windows, it loses its own history. Anthropic's two-agent pattern — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent that reads from it — keeps long-running work coherent [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). The 12-factor-agents approach argues for unifying execution state and business state into a single context-window-derived thread, making the agent trivially serializable and resumable from any point [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Biomimetic memory structures — world facts, experiences, mental models persisted outside the context window — extend this further, letting agents improve across sessions [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight).

Observability closes the loop. Traces alone don't improve agentic systems; attaching feedback signals — user ratings, indirect behavior signals, LLM-as-judge, deterministic rules — turns observability into a learning loop across model, harness, and context layers [Agent Observability Needs Feedback](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Anthropic's Managed Agents service instantiates this at infrastructure scale, separating the agent harness, session log, and sandbox into stable, swappable interfaces so each component can evolve independently as models improve [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Multi-agent architectures amplify both capability and error. Stanford and Google/MIT research suggests that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2-6x compared with single-agent baselines, making single-agent the appropriate default for most tasks [Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Anthropic's Claude Fable deployment runs counter-examples: multi-hour autonomous workflows, parallel subagents for security audits, and dynamic orchestration scripts that spin up hundreds of subagents for codebase-wide migrations [Introducing Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). The honest account from Cloudflare's Mythos deployment shows that multi-agent harnesses with parallel hunters, adversarial validators, and cross-repo tracers genuinely outperform generic coding agents on vulnerability discovery [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us). The gap between these results and the error-amplification research likely comes down to task structure: parallel independent subtasks tolerate coordination overhead better than tightly coupled sequential work.

Sandboxing is a non-negotiable property of any production agentic system. Claude Fable's tendency to invent elaborate browser automation techniques to debug a two-line CSS fix illustrates how agent resourcefulness becomes a security hazard outside a container [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Running agents in Docker sandboxes prevents credential leaks and accidental data destruction while preserving full auto-approve mode within the container [If You're Running Claude Code](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box).

The organizational dimension is as consequential as the technical one. Coding agents make individual code-writing cheap, but the real bottleneck was always shared context, specification clarity, and management coherence — and agents amplify whatever alignment or misalignment an organization already has [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). The case against full agentic delegation — that it accelerates skill atrophy, inverts developer priorities toward speed over understanding, and creates vendor dependency — remains a credible counterweight to the productivity case [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Val Town's Slow Mode proposal, which keeps the human programmer involved at every planning step to trade short-term speed for genuine code ownership, is a practical instantiation of that concern [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode).
