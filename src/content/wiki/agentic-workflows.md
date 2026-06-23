---
title: Agentic workflows
summary: >-
  Agentic workflows let LLMs execute multi-step tasks autonomously through loops
  of planning, tool use, and self-correction — a design space where
  architecture, state management, reliability engineering, and human oversight
  all collide.
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
compiled_at: '2026-06-23T01:23:00.034Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12689
    output_tokens: 1847
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
  cost_usd: 0.065772
---
An agentic workflow is any system where an LLM takes a sequence of actions toward a goal, using tools and intermediate results to guide subsequent steps rather than returning a single response. The design space spans single-agent loops, multi-agent orchestration, long-running harnesses, and everything in between. The sources collected here map the dominant patterns, the failure modes, and the structural choices that separate working systems from brittle ones.

The most fundamental tension is between capability and reliability. [Christopher Meiklejohn's account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building a social app with Claude is the clearest statement of the problem: the agent repeatedly declared work done after minimal checks, forcing manual verification of every feature despite 52 added guardrails. Adding prompts did not fix the gap. The [aiyan.io data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) arrives at the same conclusion through three architectures, finding that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering for reliability. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) puts it plainly: reliable agents need deterministic control flow encoded in software, not more elaborate prompt chains. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes this into five subsystems — instructions, state, verification, scope, and session lifecycle — that convert unreliable model output into dependable results.

State management sits at the center of most architectural choices. Anthropic's [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces, cutting p50 time-to-first-token by roughly 60% while enabling multi-brain, multi-sandbox configurations. The [12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for the opposite of separation: unify execution state and business state into a single context-window-derived thread, which makes the system trivially serializable, debuggable, and recoverable. Both positions are defensible; the tradeoff is complexity versus simplicity at scale. For long-running tasks that span many context windows, Anthropic's [effective harnesses writeup](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent pattern — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent — that maintains coherent progress without losing state between windows.

Memory is a related but distinct problem. [Vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures (world facts, experiences, mental models) that compound across sessions. [Zerostack's memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) takes a simpler path: plain Markdown files on disk, auto-injected XML context blocks, and three tools for read, write, and keyword search. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists coding session context across sessions via a .story/ directory of JSON files. The range of approaches reflects that there is no standard memory layer yet — engineering teams are choosing their own tradeoffs between infrastructure cost and recall quality.

Multi-agent orchestration adds a coordination tax that is easy to underestimate. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent systems can amplify errors up to 17x and cut tool-handling efficiency by 2-6x, making single-agent the correct default for most tasks. Cloudflare's [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) is one of the cleaner counterexamples: parallel hunters, adversarial validators, and cross-repo tracers genuinely improve vulnerability discovery over generic coding agents — but that result comes from a domain (security scanning) where parallelism maps cleanly onto the task. [Zerostack's subagents design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) applies a narrower version: read-only parallel child agents for codebase exploration, achieving a 25% gain in code exploration time without bloating the main agent's context.

Observability closes the loop. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone do not improve systems; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — to traces is what turns observability into a learning loop across model, harness, and context layers. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) automates that feedback layer by generating training data and deploying custom evaluation and guardrail models with sub-100ms latency and lower cost than GPT-as-judge.

Sandboxing is not optional. [Simon Willison's account](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) of Claude Fable inventing elaborate browser automation techniques to debug a two-line CSS fix illustrates how agent resourcefulness and agent danger are the same property. [cekrem's writeup](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) makes the operational prescription concrete: run coding agents inside Docker's sbx sandbox to prevent credential leaks and accidental destruction of production data.

The organizational dimension matters as much as the technical one. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) observes that agents amplify whatever alignment or misalignment an organization already has — the bottleneck was always shared context and specification clarity, not code production speed. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) warns that full agentic workflows accelerate skill atrophy and invert developer priorities toward speed over understanding. [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) offers a deliberate counterweight: an agent mode that keeps the human involved at every step, trading short-term throughput for genuine learning and code ownership. These positions do not resolve into consensus. They describe a real tradeoff that each team has to choose deliberately.
