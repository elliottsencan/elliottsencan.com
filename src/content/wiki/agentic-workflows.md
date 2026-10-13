---
title: Agentic workflows
summary: >-
  Agentic workflows let LLMs take sequences of actions autonomously across
  tools, sandboxes, and context windows — a space where architecture, harness
  design, state management, and human oversight matter more than prompt quality.
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
compiled_at: '2026-10-13T00:08:57.843Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 2103
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
  cost_usd: 0.075303
---
An agentic workflow is any system where an LLM issues tool calls, interprets results, and takes further actions across multiple steps without human approval at each turn. The concept spans a wide range of implementations: single-agent loops that write and execute code, multi-agent pipelines that parallelize subtasks, and long-running harnesses that persist state across many context windows. What the sources collectively show is that the interesting engineering problems are rarely about the model itself — they are about everything around it.

The case for treating harness design as the primary variable is made most directly by the [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering), which identifies five harness subsystems — instructions, state, verification, scope, and session lifecycle — as the determinants of reliability. [Anthropic's managed agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) operationalizes this by separating the agent harness, session log, and sandbox into stable, swappable interfaces, cutting p50 time-to-first-token by roughly 60% while enabling multi-brain, multi-sandbox configurations. Their [effective harnesses for long-running agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) piece describes a two-agent pattern — an initializer that scaffolds a feature list, git repo, and progress file, plus an incremental coding agent — that maintains coherent progress across many context windows without losing state.

State management is a recurring pressure point. The [12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, so that step tracking, retry counts, and session history are all recoverable from one source of truth. This makes serialization, debugging, and fork-and-resume straightforward. The alternative — separating orchestration state from business state — introduces complexity that most applications do not need. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) takes a simpler approach, persisting session context across runs in a `.story/` directory of JSON files so stateless AI assistants accumulate compounding knowledge about a codebase.

Reliability arguments consistently land on control flow over prompting. [Brian Suh's piece](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that complex tasks require deterministic state transitions and validation checkpoints encoded in software, not more elaborate prompts. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) reaches the same conclusion empirically: the system evolved from a rigid state machine through an orchestrator to a single general-purpose agent, and in each iteration environmental constraints — tool design, ID keys, context visibility — outperformed prompt tuning for reliability. [Anthropic's Glasswing/Mythos work](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) shows that multi-agent harnesses with parallel hunters and adversarial validators dramatically improve vulnerability discovery over generic coding agents, a concrete case where architecture compounds model capability.

The coordination cost of multi-agent systems deserves its own accounting. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent orchestration introduces a hidden coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x. Single-agent systems should be the default; multi-agent architectures are justified only when parallelism genuinely cannot be collapsed. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) push in the opposite direction — spinning up hundreds of parallel subagents for codebase-wide migrations — which makes the coordination cost question more pressing, not less.

Observability and feedback loops are infrastructure, not afterthought. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone do not improve agentic systems; attaching feedback signals — user ratings, indirect behavior signals, LLM-as-judge, deterministic rules — to traces is what turns observability into a learning loop. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) auto-generates training data and deploys custom evaluation and guardrail models at sub-100ms latency, addressing the evaluation gap that most production agent deployments leave open.

Security and sandboxing are not optional. [cekrem's post on Claude Code](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues that running coding agents outside a container sandbox risks credential leaks and production data destruction. [Simon Willison's Fable documentation](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) shows a model autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix — the same resourcefulness that makes agents useful makes unsandboxed agents dangerous. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) pairs agentic vulnerability scanning with gVisor sandboxing as a baseline design.

The human oversight question runs through nearly every source. [Christopher Meiklejohn's two-week account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building with Claude found the agent consistently declares work done after minimal verification, requiring manual review of every feature. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full agentic workflows accelerate skill atrophy and create vendor dependency, recommending LLMs as secondary delegation tools. [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) formalizes the alternative: a mode where the agent plans with the human, teaches concepts, and never autonomously loops — trading short-term throughput for genuine understanding. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies toward defensive, opaque code and risk creating codebases that require machine participation to maintain.

Context persistence and memory are where many practical workflows fail quietly. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) identifies skipping specs, architectural decisions, and context files as the primary cause of AI technical debt — each new session re-derives foundational decisions from scratch, and the resulting codebase has no coherent mental model. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a living knowledge base that agents query in real time, blocking non-compliant code at the Git layer. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) goes further, building biomimetic memory structures — world facts, experiences, mental models — so agents accumulate knowledge rather than starting fresh each session.

The organizational bottleneck framing from [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) is a useful corrective: coding agents make individual code-writing cheap, but the real constraints were always shared context, specification clarity, and management coherence. Agents amplify whatever alignment or misalignment an organization already has. That observation applies to the entire field — agentic workflows are infrastructure for intent, and the quality of that infrastructure depends almost entirely on the engineering judgment applied outside the model.
