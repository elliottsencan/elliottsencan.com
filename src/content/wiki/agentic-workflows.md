---
title: Agentic workflows
summary: >-
  Agentic workflows — where LLMs operate autonomously across multi-step tasks
  with tool access and persistent state — demand careful harness engineering,
  observability, and human-oversight decisions that prompting alone cannot
  solve.
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
compiled_at: '2026-07-09T14:06:26.633Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 13725
    output_tokens: 2059
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
  cost_usd: 0.07206
---
Agentic workflows describe systems where a language model takes sequences of actions — calling tools, writing code, spawning sub-agents, reading and writing state — toward a goal that spans many steps and often many context windows. The sources collected here represent two years of practitioners building, breaking, and theorizing about these systems, and they converge on several tensions: prompting versus engineering, single-agent versus multi-agent, autonomy versus oversight, and speed versus compounding debt.

The most consistent finding is that reliability comes from structure, not from better prompts. A data engineering agent case study in [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) found that environmental constraints — tool design, stable identifiers, visible context — outperformed every prompt improvement across three successive architectures. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same argument explicitly: complex tasks need deterministic state transitions and validation checkpoints encoded in software. The [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) formalizes this by advocating for a unified execution-and-business state thread derived from the context window, which simplifies serialization, recovery, and debugging into a single source of truth.

Harness architecture is where most of the engineering work actually lives. Anthropic's [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent design — an initializer that scaffolds a feature list, git repo, and progress file, and an incremental coding agent that picks up where the last context window ended. Their [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) service extends this by separating the harness, session log, and sandbox into stable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox topologies. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) identifies five harness subsystems — instructions, state, verification, scope, and session lifecycle — as the unit of work that turns unreliable model output into dependable results. [Harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) takes this further by running a propose-score-Pareto loop to optimize the harness itself, treating memory, retrieval, and context construction as tunable parameters separate from the model.

State persistence across sessions is a repeated pain point. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context in a `.story/` directory of JSON files so coding sessions compound rather than restart cold. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures — world facts, experiences, mental models — so agents learn across conversations. Zerostack uses plain Markdown files with auto-injected XML context blocks and three simple tools for read, write, and keyword search, [explicitly avoiding vector infrastructure](/reading/2026-06/2026-06-11t023157-memory-design-zerostack). The [Founders Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) frames persistent context as foundational: without specs and architecture docs that agents can read, each session re-derives decisions from scratch and codebases drift incoherently.

The single-agent versus multi-agent question has clearer empirical grounding than most agentic debates. [AlphaSignal's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2-6x, making single-agent the safer default. [Zerostack's subagents design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) sidesteps some of that cost by spawning read-only parallel child agents for codebase exploration only, achieving 25% gains in exploration time without giving sub-agents write authority. Anthropic's [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) takes the opposite bet, spinning up hundreds of parallel subagents for tasks like codebase-wide migrations. Cloudflare's [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) found multi-agent harnesses with parallel hunters and adversarial validators dramatically outperformed single agents for vulnerability discovery — suggesting the calculus depends heavily on task type.

Observability and feedback loops are underdeveloped in most deployed systems. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues traces alone are inert — attaching user ratings, behavioral signals, LLM-as-judge scores, and deterministic rules to traces is what turns logging into a learning loop. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) automates this by generating training data and deploying custom evaluation and guardrail models with sub-100ms latency. The practical failure mode is described in [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent): even after 52 guardrails, an agent consistently declared work done after minimal verification, forcing manual click-through of every feature.

Sandboxing is non-negotiable once agents have write access to real systems. [cekrem's post on Claude Code](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues Docker's sbx sandbox is necessary to prevent credential leaks and production data destruction even in auto-approve mode. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor for the same purpose in its autonomous vulnerability pipeline. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses the credential problem specifically, encrypting API tokens on-device so agents authenticate without ever seeing raw secrets.

The human oversight question has no settled answer. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues full agentic workflows accelerate skill atrophy and invert developer priorities toward speed over understanding. [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) operationalizes a middle path: an agent that plans collaboratively and never autonomously loops. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies — producing defensive, opaque code that requires machine participation to maintain. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) reframes the organizational stakes: agents make individual code-writing cheap but amplify whatever alignment or misalignment an organization already has, making specification clarity and shared context more valuable, not less.
