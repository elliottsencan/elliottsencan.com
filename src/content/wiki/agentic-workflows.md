---
title: Agentic workflows
summary: >-
  Agentic workflows let LLMs plan, act, and iterate across multi-step tasks with
  minimal human intervention — a rapidly maturing practice whose central
  tensions involve reliability engineering, state management, human oversight,
  and organizational readiness.
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
compiled_at: '2026-08-10T18:54:50.827Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14281
    output_tokens: 2143
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
  cost_usd: 0.074988
---
An agentic workflow is one where a language model operates across a sequence of tool calls, decisions, and state changes to complete a task that exceeds what fits in a single prompt-response exchange. The idea has moved from research curiosity to production infrastructure quickly enough that the field is now reckoning with what actually makes these systems work — and what consistently breaks them.

The reliability problem surfaces almost everywhere. [Anthropic's engineering team](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) found that separating the agent harness, session log, and sandbox into stable, swappable interfaces lets implementations evolve as models improve without breaking clients — and cut p50 time-to-first-token by roughly 60%. Their separate [long-running agent harness work](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses a two-agent pattern: an initializer that scaffolds a feature list, git repo, and progress file, followed by an incremental coding agent that picks up state across context windows. The [12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) makes a related argument at the design level, advocating for unifying execution state and business state into a single context-window-derived thread so that serialization, recovery, and observability all fall out naturally.

The architectural debate between prompt engineering and structural engineering is largely settled in practice. A [data engineering agent case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) that evolved through rigid state machine, orchestrator, and single general-purpose agent architectures concluded that tool design and environmental constraints outperform prompt refinement for reliability. [Brian Suh makes the same point directly](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): complex tasks require deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not increasingly elaborate prompt chains. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) codifies this into five subsystems — instructions, state, verification, scope, and session lifecycle — that turn unreliable model output into dependable results.

Scale introduces its own failure modes. [Stanford and Google/MIT research cited by AlphaSignal](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) found that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2-6x relative to single-agent systems, making multi-agent architectures a deliberate choice rather than a default. Anthropic's [Mythos security harness](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) nonetheless demonstrates where multi-agent patterns genuinely pay: parallel vulnerability hunters, adversarial validators, and cross-repo tracers substantially improve security coverage over generic coding agents. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) push further, letting Claude write its own orchestration scripts that spin up hundreds of parallel subagents for codebase-wide migrations and security audits.

Memory and context are persistent bottlenecks. The [vectorize-io/hindsight project](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures — world facts, experiences, mental models — so agents accumulate knowledge across sessions rather than starting cold. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) takes a simpler approach, persisting session context as JSON files in a .story/ directory. [Zerostack's file-based memory](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown with auto-injected XML context blocks and three tools: read, write, keyword search — no vector stores. OpenAI's [internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) layers schema metadata, human annotations, code enrichment, and self-improving memory to handle 600+ petabytes across 70,000 datasets. [Anthropic's analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) achieves 95% query accuracy through canonical datasets and a semantic layer — though a [critique from Genloop](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes that replicating those results requires months of senior data engineering work most organizations cannot afford.

Observability is necessary but not sufficient. [LangChain's Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that traces without attached feedback signals — user ratings, behavioral signals, LLM-as-judge, deterministic rules — produce no learning; it is the feedback loop, not the trace, that improves systems over time. [Imbue's Vet tool](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) addresses a related gap: reading an agent's full conversation history alongside the diff to catch mistakes that diff-only review misses.

Sandboxing and credential management become urgent as autonomy increases. [Simon Willison's account of Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) shows an agent autonomously inventing browser automation techniques to debug a two-line CSS fix — resourcefulness that becomes dangerous outside a sandbox. The [case for Docker sandboxing](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) follows directly. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential exposure by injecting API keys locally, keeping tokens encrypted on-device so agents authenticate against services without seeing raw credentials.

The human-in-the-loop question remains genuinely contested. [Christopher Meiklejohn's account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of two weeks building with Claude is blunt: the agent consistently declares work done after minimal checks, requiring manual verification of every feature despite 52 added guardrails. [Lars Faye's critique](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full agentic workflows accelerate skill atrophy and create vendor dependency. Val Town's [Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) offers a counter-design: a mode where the agent teaches concepts and plans collaboratively rather than looping autonomously, trading short-term throughput for long-term understanding. [Armin Ronacher's warning](/reading/2026-06/2026-06-23t161552-the-coming-loop) is the sharpest: harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain.

Organizationally, [The Typical Set observes](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) that agentic coding makes writing code cheap but amplifies whatever alignment or misalignment already exists in an organization's shared context and specification clarity. Werner Vogels [draws a different organizational conclusion](/reading/2026-06/2026-06-30t173037-a-return-to-two-pizza-culture): compressed prototyping time justifies amending the Working Backwards process itself — build first, then write the doc. Both perspectives point to the same underlying shift: the bottleneck in agentic workflows is rarely the model.
