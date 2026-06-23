---
title: Agentic workflows
summary: >-
  Agentic workflows — systems where LLMs autonomously plan, execute multi-step
  tasks, and call tools across context windows — demand architectural discipline
  around state, harness design, memory, observability, and human oversight to be
  reliable in production.
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
compiled_at: '2026-06-23T00:03:34.879Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12685
    output_tokens: 1512
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
  cost_usd: 0.060735
---
An agentic workflow is a system where an LLM drives multi-step execution: calling tools, branching on results, spawning subagents, and persisting state across context windows rather than producing a single response. The pattern has matured enough that practitioners are now writing down what it actually takes to make these systems work, and the emerging consensus points away from prompt engineering and toward structural engineering.

The most consistent finding across implementations is that reliability comes from the harness, not the model. A data engineering agent that evolved through three architectures found that environmental constraints — tool design, ID keys, context visibility — outperformed prompt engineering at every stage [don't-prompt-your-agent-for-reliability-engineer-it](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). The 12-factor-agents project makes a similar structural argument: unifying execution state and business state into a single context-window-derived thread simplifies serialization, debugging, and recovery without requiring a separate state machine [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). A harness engineering course formalizes this into five subsystems — instructions, state, verification, scope, and session lifecycle — that turn unreliable model output into dependable engineering results [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering).

Anthropics own production systems illustrate what this looks like at scale. Their Managed Agents service separates the agent harness, session log, and sandbox into stable, swappable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox configurations [scaling-managed-agents-decoupling-the-brain-from-the-hands](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). For long-running tasks, a two-agent harness — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent — lets Claude make consistent progress across many context windows without losing state [effective-harnesses-for-long-running-agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Claude Code's dynamic workflows take this further by letting Claude write orchestration scripts that spin up hundreds of parallel subagents for codebase-wide migrations or security audits [introducing-dynamic-workflows-in-claude-code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code).

The question of single versus multi-agent architectures has a cautious answer: Stanford and Google/MIT research finds that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2–6x, making single-agent systems the default for most tasks [how-to-choose-between-single-and-multi-agent-solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Zerostack's subagent design offers a narrower pattern that captures coordination gains without the full cost: read-only parallel child agents handle multi-file codebase exploration without bloating the main agent's context, yielding a 25% gain in exploration time [subagents-design-zerostack](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack).

Memory and observability are the two infrastructure pieces most implementations still underinvest in. The Hindsight library builds biomimetic memory structures — world facts, experiences, mental models — so agents accumulate knowledge across sessions rather than starting cold each time [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). LangChain's Harrison Chase argues that traces alone do not improve agentic systems; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — is what turns observability into a learning loop across model, harness, and context layers [agent-observability-needs-feedback-to-power-learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning).

Sandboxing is the safety primitive that practitioners most agree on. Claude Fable's resourcefulness — inventing screenshot capture via PyObjC and CORS servers to debug a two-line CSS fix — is the same property that makes unsandboxed agents dangerous [claude-fable-is-relentlessly-proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Running agents inside containers like Docker's sbx sandbox is the minimum viable mitigation [if-youre-running-claude-code-please-run-it-in-a-box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box).

Two structural critiques cut across all of this. First, agentic workflows amplify organizational alignment, not just individual productivity: the real bottleneck was always shared context, specification clarity, and management coherence [the-bottleneck-was-never-the-code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Second, full autonomy carries a skill-atrophy cost; some practitioners argue for keeping humans involved at every planning step to preserve genuine understanding of the code being produced [slow-mode](/reading/2026-05/2026-05-19t193626-slow-mode). Both concerns point toward the same practical principle: agentic workflows are not a substitute for engineering judgment, they are an amplifier of it.
