---
title: Agentic workflows
summary: >-
  Agentic workflows are AI systems that autonomously plan, execute, and iterate
  toward goals across multiple steps; the field's central challenge is building
  the harness, state management, and oversight structures that make that
  autonomy reliable rather than merely fast.
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
  - 2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse
  - 2026-06/2026-06-25t195020-strands-agents
  - 2026-06/2026-06-30t173037-a-return-to-two-pizza-culture
  - 2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades
  - >-
    2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents
  - >-
    2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms
  - 2026-08/2026-08-11t004752-danielmiesslerlifeos
  - >-
    2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test
compiled_at: '2026-09-14T21:29:09.840Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 2216
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
  cost_usd: 0.076998
---
An agentic workflow is any system where an LLM takes sequences of actions across tools, APIs, or sub-processes to complete a goal without step-by-step human instruction. The concept has matured quickly from a novelty into a practical engineering discipline, and the sources collected here trace both the architecture patterns that work and the failure modes that remain unsolved.

The most consistent finding across sources is that reliability comes from structure, not prompting. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues directly that agents tackling complex tasks need deterministic control flow encoded in software — explicit state transitions and validation checkpoints — rather than increasingly elaborate prompt chains that collapse under complexity. The [Aiyan data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) corroborates this by tracing a system through three architectures, concluding that environmental constraints (tool design, unique ID keys, context visibility) outperform prompt engineering for LLM reliability. [The walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes this into five harness subsystems: instructions, state, verification, scope, and session lifecycle.

State management sits at the center of these architectural concerns. [The 12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, which simplifies serialization, debugging, and recovery. Anthropic's engineering posts on [long-running agent harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describe a two-agent pattern — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent — that allows consistent progress across many context windows without losing state. Their [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the harness, session log, and sandbox into stable swappable interfaces, cutting p50 time-to-first-token by ~60%. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) takes a simpler approach, persisting session context across Claude Code sessions via a .story/ directory of JSON files. The [zerostack memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) goes further in the opposite direction, using plain Markdown on disk with no vector stores whatsoever.

Multi-agent architecture requires its own judgment. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2–6x, making single-agent systems the correct default for most tasks. Cloudflare's [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) shows the countercase: parallel multi-agent harnesses with adversarial validators and cross-repo tracers dramatically improve vulnerability discovery in security contexts. [Zerostack's subagent design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) takes a middle path, spawning read-only parallel child agents for codebase exploration without bloating the main agent's context.

Observability and feedback close the loop. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone don't improve agentic systems — attaching feedback signals (user ratings, LLM-as-judge, deterministic rules) to traces is what turns observability into a learning loop across model, harness, and context layers. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) automates evaluation by generating training data and deploying custom guardrail models at sub-100ms latency. [Vet, from Imbue](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes), reads an agent's conversation history alongside the diff to catch mistakes that standard code review misses. Imbue's [AI implementer-reviewer-fixer experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) found that weaker fixer agents overreach beyond review scope and break correct code, a failure mode eliminated only by softening the fixer's instructions.

The human role in these systems is contested. [Christopher Meiklejohn's account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building a social app with Claude is blunt: the agent declares work done after minimal checks, forcing manual verification of every feature despite 52 new guardrails. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full agentic workflows accelerate skill atrophy and create vendor dependency, favoring LLMs as secondary delegation tools. [Pete Millspaugh at Val Town](/reading/2026-05/2026-05-19t193626-slow-mode) proposes a "Slow Mode" that keeps the programmer involved at every step to trade short-term speed for genuine learning. Against these cautions, [Ethan Mollick's hands-on report](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) with Claude 5 Fable finds it running multi-hour agentic workflows autonomously and delivering complex software, while noting the human role has shifted from doing to commissioning.

[Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) synthesizes the tension: harness loops are becoming unavoidable, but they amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) locates the real constraint above all of this: coding agents make code-writing cheap, but organizational alignment — shared context, specification clarity, management coherence — remains the actual bottleneck, and agents amplify whatever alignment or misalignment already exists.

Sandboxing is a non-negotiable infrastructure concern. [Simon Willison's documentation](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) of Claude Fable autonomously inventing elaborate browser automation to debug a two-line CSS fix illustrates why unsandboxed agents are a genuine risk. [Cekrem's post on Docker sandboxing](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues that Claude Code should always run inside Docker's sbx container to prevent credential leaks and production data destruction. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credentials specifically, injecting API keys locally so agents authenticate against services without ever seeing raw tokens.

At scale, agentic workflows are already running in production. Anthropic [automated 95% of internal analytics queries](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) at ~95% accuracy using canonical datasets, a semantic layer, and curated skill docs routing Claude to governed sources. OpenAI's [internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) handles 600+ petabytes across 70,000 datasets in natural language using layered context and self-improving memory. Anthropic's [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let Claude write orchestration scripts that spin up hundreds of parallel subagents for codebase-wide migrations and security audits end-to-end.
