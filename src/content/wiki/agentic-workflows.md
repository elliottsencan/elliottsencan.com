---
title: Agentic workflows
summary: >-
  Agentic workflows chain LLM calls, tools, and state management into sequences
  that execute multi-step tasks autonomously — a rapidly maturing practice where
  architecture, harness design, and human oversight matter more than prompt
  quality.
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
compiled_at: '2026-06-20T22:03:46.985Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12313
    output_tokens: 1656
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
  cost_usd: 0.061779
---
An agentic workflow is any system where an LLM takes a sequence of actions, uses tools, and makes decisions across multiple steps to complete a task, rather than responding to a single prompt. The pattern spans a wide range of implementations: from a single agent with a loop and a tool registry, to multi-brain, multi-sandbox architectures that parallelize work across hundreds of subagents [Anthropic's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code).

The clearest design lesson across sources is that reliability comes from engineering, not prompting. A data engineering agent evolved through three distinct architectures before its builders concluded that tool design, explicit IDs, and context visibility outperform elaborate prompt chains [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). The 12-factor-agents project makes a related point about state: unifying execution state and business state into a single context-window-derived thread simplifies serialization, recovery, and debugging without requiring separate infrastructure [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Brian Suh argues that complex tasks need deterministic control flow encoded in software — explicit state transitions and validation checkpoints — rather than increasingly elaborate prompt chains [Agents Need Control Flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts).

Harness design is a distinct engineering discipline. Anthropic's Managed Agents service separates the agent harness, session log, and sandbox into stable, swappable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling the system to evolve as models improve [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). A complementary Anthropic post describes a two-agent harness — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent — that sustains consistent progress across many context windows [Effective Harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). The walkinglabs course formalizes this further, identifying five harness subsystems: instructions, state, verification, scope, and session lifecycle [learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering).

Memory and context persistence are equally foundational. Storybloq persists session context in a .story/ directory of JSON files to make stateless AI assistants compound across sessions [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). The Hindsight library goes further, building biomimetic memory structures — world facts, experiences, mental models — so agents improve over time rather than restarting cold [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). OpenAI's internal data agent layers schema metadata, human annotations, code enrichment, and self-improving memory to serve accurate analytics across 600+ petabytes [OpenAI data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent).

Observability and feedback close the loop. Traces alone do not improve agentic systems; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — to those traces is what turns logging into a learning system [Agent Observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Plurai addresses the evaluation side, auto-generating training data and guardrail models with sub-100ms latency and substantially lower cost than GPT-as-judge [Plurai](/reading/2026-05/2026-05-04t235011-plurai).

The multi-agent question has a provisional answer: single-agent systems should be the default. Stanford and Google/MIT research cited by AlphaSignal finds that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2–6x [single vs. multi-agent](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Cloudflare's Project Glasswing is a counter-example where multi-agent harnesses with parallel hunters and adversarial validators genuinely improve vulnerability discovery [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us), suggesting the tradeoff is task-dependent.

Sandboxing is not optional. Claude Fable autonomously invented browser automation techniques to debug a two-line CSS fix — the same resourcefulness that makes it useful makes an unsandboxed agent dangerous [Simon Willison on Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Running coding agents inside isolated containers like Docker's sbx sandbox prevents credential leaks and accidental production damage [Claude Code sandboxing](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box).

Two structural critiques cut across this engineering literature. First, coding agents amplify whatever organizational alignment already exists; the bottleneck was never code velocity but shared context, specification clarity, and management coherence [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Second, full agentic autonomy risks skill atrophy and inverted developer priorities — trading understanding for speed — which Val Town's Slow Mode proposal addresses by keeping the human involved at every planning and implementation step [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode). Lars Faye makes the sharpest version of this point, arguing that agentic coding workflows create vendor dependency while accelerating the erosion of the judgment needed to evaluate what agents produce [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap).
