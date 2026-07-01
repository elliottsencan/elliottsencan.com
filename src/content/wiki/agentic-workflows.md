---
title: Agentic workflows
summary: >-
  Agentic workflows let LLMs autonomously plan, execute, and iterate through
  multi-step tasks — a rapidly maturing practice defined as much by harness
  engineering, state management, and human oversight as by model capability.
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
compiled_at: '2026-07-01T04:41:34.799Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 13725
    output_tokens: 1785
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
  cost_usd: 0.06795
---
An agentic workflow is one where a language model takes sequential actions across multiple steps, using tools, making decisions, and looping until a task is complete, rather than responding once to a prompt. The sources collected here trace the current state of that practice across architecture, reliability, tooling, and the harder question of what human involvement should look like at scale.

The reliability gap between "agent runs" and "agent succeeds" is the dominant concern. [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents this concretely: after two weeks and 52 added guardrails, the agent still declared work done after minimal verification, forcing manual inspection of every feature. The pattern appears at the design level too. [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) evolved a data engineering agent through three architectures and concluded that environmental constraints — tool design, ID keys, visible context — outperform prompt engineering every time. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) puts the same point formally: reliable agents need deterministic state transitions and validation checkpoints encoded in software, not elaborate prompt chains.

The harness — the scaffolding around the model — has emerged as the primary engineering surface. Anthropic has published two detailed treatments. [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent design where an initializer scaffolds a feature list, git repo, and progress file while an incremental coding agent carries out work across many context windows without losing state. [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) goes further, separating the harness, session log, and sandbox into stable, swappable interfaces so implementations can change as models improve — cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox configurations. The [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) curriculum names five harness subsystems — instructions, state, verification, scope, and session lifecycle — as the variables that turn unreliable model output into dependable engineering results.

State management is where harness design gets specific. [12-factor-agents, Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread: simpler to serialize, easier to debug, recoverable from any point by reloading the thread. [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop) accepts that outer harness loops are now unavoidable but warns they amplify the LLM's worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain.

Observability closes the loop but only when paired with feedback. [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone don't improve systems; attaching feedback signals (user ratings, indirect behavior, LLM-as-judge, deterministic rules) is what turns observability into a learning mechanism across model, harness, and context layers. Memory is the related problem. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures — world facts, experiences, mental models — so agents compound across sessions rather than starting fresh. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) solves the same problem with a simpler .story/ directory of JSON files persisted across Claude Code sessions.

The single-versus-multi-agent decision has clearer guidance now. [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) synthesizes Stanford and Google/MIT research: multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2-6x, so single-agent systems should be the default. Multi-agent designs earn their place for genuinely parallelizable work. [Introducing Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) shows Anthropic's own answer: Claude writing orchestration scripts that spin up hundreds of parallel subagents for codebase-wide migrations and security audits. [Cloudflare's Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) found that multi-agent harnesses with parallel hunters, adversarial validators, and cross-repo tracers dramatically improve vulnerability discovery over generic coding agents.

Sandboxing is a non-negotiable infrastructure requirement once agents can autonomously invoke tools. [If You're Running Claude Code, PLEASE Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) makes the case for Docker containers to prevent credential leaks and accidental production writes. [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) illustrates why: Claude 5 autonomously invented browser automation techniques to debug a two-line CSS fix, the same resourcefulness that makes unsandboxed agents genuinely dangerous.

Organizational fit shapes outcomes as much as architecture. [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that agents amplify whatever alignment or misalignment an organization already has — shared context, specification clarity, and management coherence determine results, not raw agent capability. [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) warns that full agentic workflows accelerate skill atrophy and invert developer priorities toward speed over understanding. The counterpoint from [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode) proposes keeping the human involved at every step — planning together, teaching concepts, never autonomously looping — as a deliberate trade of short-term speed for long-term ownership. These tensions do not resolve neatly; different teams are making different bets.
