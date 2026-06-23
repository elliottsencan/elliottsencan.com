---
title: Agentic workflows
summary: >-
  Agentic workflows use LLMs as autonomous actors that plan, call tools, and
  loop across steps — a design space where architecture, state management, and
  human oversight matter far more than prompt quality alone.
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
  - >-
    2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk
  - 2026-06/2026-06-23t161552-the-coming-loop
compiled_at: '2026-06-23T23:17:21.980Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12910
    output_tokens: 1703
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
  cost_usd: 0.064275
---
Agentic workflows are systems where a language model does more than answer a single question: it plans, calls tools, checks results, and iterates across multiple steps to complete a task. The past year of engineering practice has made clear that the hard problems in this space are not model capability problems — they are software engineering problems.

The most consistent finding across implementations is that prompting cannot substitute for structure. A data engineering agent documented in [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) evolved through three architectures before settling on one where environmental constraints — tool design, ID keys, context visibility — did the reliability work that prompt engineering could not. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) reaches the same conclusion: deterministic state transitions and validation checkpoints in code outperform elaborate prompt chains as task complexity grows. The [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) project formalizes one implication: unify execution state and business state into a single context-window-derived thread so that the system is serializable, debuggable, and resumable without a separate state machine.

State management is the connective tissue of any long-running agent. Anthropic's [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent initializer-plus-incremental pattern that writes a feature list and progress file to disk so Claude can continue across context windows. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) takes a similar approach with a `.story/` directory of JSON files. [Zerostack's memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown on disk with auto-injected XML context blocks, deliberately avoiding vector stores. More sophisticated is [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight), which builds biomimetic memory structures — world facts, experiences, mental models — so agents accumulate knowledge across sessions rather than starting fresh.

Orchestration architecture is genuinely contested. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) service separates the harness, session log, and sandbox into swappable interfaces, enabling multi-brain and multi-sandbox configurations while cutting p50 time-to-first-token by around 60%. Claude Code's [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let the model itself write orchestration scripts that spin up hundreds of parallel subagents for large-scale tasks. But research cited in [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) — drawing on Stanford and Google/MIT work — warns that multi-agent coordination introduces a hidden tax: errors can amplify up to 17x and tool-handling efficiency can drop 2-6x. Single-agent systems should be the default unless the task structure genuinely demands parallelism. [Zerostack's subagent design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) offers a middle path: read-only parallel child agents for codebase exploration that don't bloat the main agent's context.

Observability and feedback loops are underbuilt in most agentic systems. [LangChain's framing](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) is that traces alone accomplish nothing; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — to those traces is what turns observability into improvement across model, harness, and context layers. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) addresses the evaluation side by auto-generating training data and deploying custom guardrail models at sub-100ms latency.

Sandboxing and safety are not optional. [Claude Fable's resourcefulness](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) — autonomously inventing browser automation techniques to debug a two-line CSS fix — illustrates exactly why unsandboxed agents are dangerous. The recommendation to [run Claude Code in Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) is a direct response. [Harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) and [learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) both treat the harness — instructions, state, verification, scope, session lifecycle — as the primary engineering artifact, not the model.

The human-oversight question has no settled answer. [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents an agent that consistently declares work done after minimal checks, requiring the human to manually verify every feature despite 52 added guardrails. [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) goes further, arguing that full autonomy accelerates skill atrophy and creates vendor dependency. Slow Mode proposes keeping the human involved at every planning step. [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop) frames the concern structurally: harness loops are becoming unavoidable, but they amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) adds that agents amplify whatever organizational alignment or misalignment already exists — specification clarity and shared context remain the real constraints.
