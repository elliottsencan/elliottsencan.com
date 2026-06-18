---
title: Agentic workflows
summary: >-
  Agentic workflows let LLMs plan and execute multi-step tasks autonomously; the
  field's central challenge is making that autonomy reliable through harness
  engineering, state management, and human oversight rather than through prompt
  engineering alone.
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
aliases:
  - workflow-orchestration
compiled_at: '2026-06-18T22:53:27.302Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12298
    output_tokens: 1784
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
  cost_usd: 0.063654
---
An agentic workflow is an LLM-driven process where the model takes sequential actions, calls tools, and makes decisions across multiple steps to complete a goal without a human in the loop at every turn. The concept spans everything from a single coding agent looping over a task list to multi-agent pipelines where orchestrators spawn hundreds of parallel subagents. [Anthropic's Claude Code dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) demonstrate the upper end: the model automatically writes orchestration scripts that spin up parallel subagents for codebase-wide migrations and security audits.

The gap between that capability and reliable production use is what most of the field is actively closing. A recurring finding is that prompt engineering is the wrong lever. [Aiyan's data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) evolved through three architectures before settling on the insight that environmental constraints, including tool design, ID keys, and context visibility, outperform increasingly elaborate prompts. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same argument structurally: complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not longer prompt chains. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes this into five subsystems: instructions, state, verification, scope, and session lifecycle.

State management is a central design problem. Stateless models lose context across sessions, causing agents to re-derive decisions from scratch and accumulate what one AI-native startup guide calls "agentic technical debt" — a codebase with no coherent mental model behind it because sessions never built on each other [the Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup). Solutions vary in complexity: [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across runs in a `.story/` directory of JSON files; [zerostack uses plain Markdown on disk](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) with auto-injected XML context blocks and three tools for read, write, and search; [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures covering world facts, experiences, and mental models for state-of-the-art LongMemEval results. The [12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, which makes the full history serializable, debuggable, and recoverable from any point.

For long-running work, [Anthropic's harness engineering post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent pattern where an initializer scaffolds a feature list, git repo, and progress file before handing off to an incremental coding agent, letting Claude make consistent progress across many context windows. Anthropic's [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox architectures.

Observability and feedback loops are increasingly recognized as non-optional. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone accomplish nothing; attaching feedback signals, user ratings, indirect behavior signals, LLM-as-judge scores, and deterministic rules, to those traces is what turns monitoring into improvement. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) addresses evaluation at the model layer, auto-generating training data and deploying custom guardrail models for agents with sub-100ms latency.

The multi-agent versus single-agent question has a clear default from research: [Ben Dickson drawing on Stanford and Google/MIT work](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x. Multi-agent architectures earn their complexity only when tasks are genuinely parallelizable and coordination costs are bounded. [Zerostack's read-only parallel child agents](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) are a constrained example: they explore the codebase without writing, keeping the main agent's context lean.

Sandboxing is not optional when agents operate autonomously. [Simon Willison's account of Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents an agent inventing elaborate browser automation techniques to debug a two-line CSS fix; the same resourcefulness applied to production credentials is the threat. Running coding agents inside Docker containers, as [cekrem argues](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box), enables full auto-approve mode safely by limiting blast radius.

The organizational critique of agentic workflows is pointed. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) observes that agents make code-writing cheap but amplify whatever alignment or misalignment an organization already has; the bottleneck was always shared context and specification clarity. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) warns that full agentic delegation accelerates skill atrophy and creates vendor dependency. [Christopher Meiklejohn's two-week account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building with Claude illustrates the failure mode concretely: agents declare work done after minimal checks, shifting the human role to manual verification of every feature. Val Town's [Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) offers the sharpest counter-design: keep the human involved at every planning step, trading short-term throughput for genuine understanding and long-term code ownership.
