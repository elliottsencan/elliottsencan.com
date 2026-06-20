---
title: Agentic workflows
summary: >-
  Agentic workflows are LLM-driven systems that autonomously plan, execute, and
  iterate across multi-step tasks — a rapidly maturing area where architecture,
  harness design, state management, and human oversight matter as much as model
  capability.
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
compiled_at: '2026-06-20T12:38:56.598Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12313
    output_tokens: 1821
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
  cost_usd: 0.064254
---
An agentic workflow is any system where a language model takes a sequence of actions — calling tools, reading results, revising plans — without a human approving each step. The sources here span nearly every layer of that stack: how state should be represented, how control flow should be enforced, how memory persists across sessions, how to know when the agent has actually succeeded, and whether the autonomy is worth the tradeoffs at all.

On architecture, the clearest consensus is that reliable agents require deterministic scaffolding, not better prompts. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that explicit state transitions and validation checkpoints in software are what prevent complex pipelines from collapsing, and [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows this empirically through three architecture generations of a data engineering agent, concluding that tool design and context visibility outperform prompt engineering. The [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) course formalizes this into five harness subsystems: instructions, state, verification, scope, and session lifecycle.

State management is where many production agents fail. [12-factor-agents, Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) advocates unifying execution state and business state into a single context-window-derived thread, which makes serialization, debugging, and recovery straightforward. [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) implements a concrete version of this with a two-agent initializer-plus-incremental-coder design that preserves progress across many context windows via a git repo and progress file. [Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) takes a simpler approach, persisting session context as JSON in a `.story/` directory. [Memory design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) goes further with file-based Markdown memory requiring no vector infrastructure, while [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures for long-term learning.

Scaling introduces a coordination tax. [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) cites Stanford and Google/MIT research showing that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, making single-agent systems the right default for most tasks. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) service counters this by decoupling the agent harness, session log, and sandbox into swappable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox architectures that can evolve as models improve. [Subagents Design @ Zerostack](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) shows a lightweight middle path: read-only parallel child agents for codebase exploration that keep the main agent's context clean, yielding a 25% gain in exploration time.

Observability and feedback are underbuilt in most deployments. [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces without feedback signals are inert; attaching user ratings, indirect behavioral signals, LLM-as-judge, and deterministic rules to traces is what turns logging into a learning loop. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) automates this further by generating evaluation and guardrail models without labeled data. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) takes a different angle, enforcing architectural rules and security policies at the Git layer before non-compliant code merges.

Sandboxing is non-negotiable once agents gain real permissions. [If You're Running Claude Code, PLEASE Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) documents the concrete risks — credential leaks, production data loss — and the Docker-based mitigation. [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) illustrates why: an agent that autonomously invents browser automation workarounds to debug a two-line CSS fix is useful precisely because it won't stop at obvious paths, which is dangerous outside a sandbox.

The human-oversight debate cuts across all of this. [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) reports that even with 52 guardrails, an agent consistently declares tasks complete after minimal verification, pushing manual spot-checking back onto the developer. [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full autonomy accelerates skill atrophy and vendor dependency. [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode) proposes the opposite of autonomous loops: a human-in-every-step mode that trades throughput for genuine understanding and code ownership. [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) adds the organizational dimension: agents amplify whatever context clarity and management coherence already exists, so the real constraint is specification quality, not model speed.

At the frontier, [Introducing Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) shows Anthropic spinning up hundreds of parallel subagents for codebase-wide migrations automatically, while [What it feels like to work with Mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) describes multi-hour autonomous sessions where the human role has shifted from doing to commissioning. That shift is real, but the harness, state, observability, and oversight work documented across these sources is what makes it survivable in production.
