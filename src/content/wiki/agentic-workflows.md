---
title: Agentic workflows
summary: >-
  Agentic workflows let LLMs plan, execute multi-step tasks, and loop on results
  with minimal human intervention — a space where architecture, harness design,
  reliability engineering, and human oversight tensions are all actively
  contested.
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
compiled_at: '2026-08-03T10:00:26.033Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14089
    output_tokens: 1979
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
  cost_usd: 0.071952
---
An agentic workflow is one where an LLM operates inside a loop: it reasons about a task, selects tools, executes actions, observes results, and continues until some completion condition is met. The gap between that simple description and production-ready systems is where nearly all the interesting engineering happens.

The most foundational question is how control flow should be structured. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents need explicit state transitions and validation checkpoints encoded in software, not increasingly elaborate prompt chains. The same theme runs through [harness engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering), which identifies five subsystems — instructions, state, verification, scope, and session lifecycle — that turn model output into dependable results. Anthropic's own engineering posts on [effective harnesses for long-running agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describe a two-agent pattern: an initializer that scaffolds a feature list, git repo, and progress file, and an incremental coding agent that works across many context windows without losing state.

State management is its own discipline. [12-factor-agents factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) recommends unifying execution state and business state into a single context-window-derived thread, making the full history serializable, debuggable, and resumable from any point. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) takes a simpler approach: a .story/ directory of JSON files that persists session context across Claude Code invocations. Zerostack goes further, implementing [file-based Markdown memory](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) with no vector stores and auto-injected XML context blocks, while [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures — world facts, experiences, mental models — so agents accumulate genuine learning across sessions.

Reliability failures in production are well-documented. [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) found that his Claude-built social app required manually clicking through every feature to find what actually broke, despite 52 guardrails. The Aiyan data engineering case study ([Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it)) traced three architecture generations — rigid state machine, orchestrator, single general-purpose agent — and concluded that environmental constraints (tool design, ID keys, context visibility) outperform prompt engineering. The recurring diagnosis: agents need controlled environments, not more instructions.

Multi-agent architectures add coordination overhead that compounds error rates. Research cited by [Ben Dickson](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) shows multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2–6x versus single-agent baselines. That said, parallel subagents are genuinely useful for bounded subtasks: [Zerostack's subagent design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) spawns read-only child agents for codebase exploration, gaining 25% in exploration speed without bloating the main agent's context. Anthropic's [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) takes this further — Claude writes orchestration scripts that spin up hundreds of parallel subagents for codebase-wide migrations or security audits. Anthropic's [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates harness, session log, and sandbox into stable, swappable interfaces, cutting p50 time-to-first-token by ~60% and enabling multi-brain, multi-sandbox architectures.

Observability and feedback loops are underbuilt in most deployments. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone don't improve agentic systems; attaching feedback signals — user ratings, indirect behavior signals, LLM-as-judge, deterministic rules — to traces is what creates a learning loop across model, harness, and context layers. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) auto-generates training data and deploys custom evaluation and guardrail models for agents in minutes, with sub-100ms latency. The [Vet code review tool](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) catches failures — silently skipped tests, fake data — by reading the agent's conversation history alongside the diff.

Sandboxing is a safety prerequisite, not an optimization. [Simon Willison's report on Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) shows the model autonomously inventing screenshot capture techniques and CORS servers to debug a two-line CSS fix; the same resourcefulness makes unsandboxed agents genuinely dangerous. Running Claude Code in Docker's sbx sandbox ([cekrem](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box)) allows full auto-approve mode safely. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing for autonomous vulnerability discovery and remediation pipelines.

Context management is structurally hard. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk creating codebases that require machine participation to maintain. Dex Horthy's [lights-off software factory critique](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) argues the problem is more fundamental: LLMs cannot maintain codebase quality over time, a training limitation that no harness engineering fixes. Lars Faye ([Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap)) frames this as skill atrophy: full agentic workflows invert developer priorities toward speed over understanding and create vendor dependency.

Organizational factors shape outcomes as much as architecture. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) notes that coding agents make individual code-writing cheap but amplify whatever alignment or misalignment an organization already has in shared context and specification clarity. The [AI-Native Startup Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) warns that skipping specs and architectural context files creates compounding agentic technical debt — each new session re-derives foundational decisions from scratch and the codebase drifts.
