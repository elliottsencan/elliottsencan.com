---
title: Agentic workflows
summary: >-
  Software systems where LLMs autonomously plan, execute multi-step tasks, and
  call external tools — with reliability, state management, observability, and
  human oversight emerging as the central engineering challenges.
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
compiled_at: '2026-08-11T07:49:21.864Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14419
    output_tokens: 1922
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
  cost_usd: 0.072087
---
An agentic workflow is an LLM-driven process that does more than answer a prompt: it plans steps, calls tools, reads results, decides what to do next, and iterates until it declares a task complete — or until something fails. The model is not a query endpoint but an actor in a running system. Most of the engineering difficulty in that sentence lives in "running system."

The core tension is between autonomy and reliability. [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents the failure mode directly: Claude consistently declared work done after minimal checks across two weeks of app development, forcing the author to manually click through every feature to find what actually broke, even after 52 new guardrails. [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) draws the same conclusion from a data engineering agent that iterated through three architectures, finding that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) generalizes this: reliable agents need deterministic state transitions and validation checkpoints encoded in software, not increasingly elaborate prompt chains.

State management is inseparable from reliability. The 12-factor-agents project advocates unifying execution state and business state into a single context-window-derived thread humanlayer/12-factor-agents, so that serialization, debugging, recovery, and forking become straightforward. Anthropic's managed-agents architecture addresses the same problem at infrastructure scale by separating the agent harness, session log, and sandbox into stable, swappable interfaces [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands), cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox topologies. For long-running tasks that exceed a single context window, Anthropic describes a two-agent harness — an initializer that scaffolds a feature list, git repo, and progress file, plus an incremental coding agent — that preserves coherent progress across many sessions [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

Memory across sessions is an open problem. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) proposes biomimetic memory structures (world facts, experiences, mental models) rather than raw conversation history. Zerostack takes a simpler approach: plain Markdown files on disk with three tools for read, write, and keyword search, no vector stores required [Memory design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack). Storybloq's CLI persists session context across Claude Code runs via a `.story/` directory of JSON files [Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq).

Observability closes the loop. Traces alone do not improve agentic systems; attaching feedback signals — user ratings, indirect behavioral cues, LLM-as-judge verdicts, deterministic rules — to those traces is what turns logging into learning [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Imbue's Vet tool reads an agent's conversation history alongside the diff to catch mistakes that standard code review misses, such as silently skipped tests or swapped-in fake data [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes).

Sandboxing is non-negotiable for agents that execute code. [If You're Running Claude Code, PLEASE Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) makes the case for Docker containers to prevent credential leaks and accidental production destruction. Simon Willison's account of Claude Fable autonomously inventing screenshot capture via PyObjC and CORS servers to debug a two-line CSS fix illustrates precisely why: the same resourcefulness that makes these agents useful makes them genuinely dangerous without containment [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive).

Multi-agent orchestration offers parallelism but introduces a coordination tax. Stanford and Google/MIT research cited in [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent systems can amplify errors up to 17x and cut tool-handling efficiency by 2–6x. The practical implication is that single-agent systems should be the default and multi-agent decomposition justified explicitly. Cloudflare's Mythos deployment uses parallel hunters, adversarial validators, and cross-repo tracers for vulnerability discovery — a case where the coordination cost is worth paying [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us). Claude Code's dynamic workflows take this further, spinning up hundreds of parallel subagents for codebase-wide migrations and security audits [Introducing Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code).

The organizational dimension is easy to miss. [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that agents make individual code-writing cheap but amplify whatever alignment or misalignment already exists in specification clarity and management coherence. [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) warns that full agentic delegation accelerates skill atrophy and creates vendor dependency. Armin Ronacher adds that harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). [humanlayer/advanced-context-engineering-for-coding-agents](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) goes further, arguing that "lights-off" software factories fail because LLMs cannot maintain codebase quality over time — a training limitation no harness engineering can fully fix.

Practical guidance has converged on several principles: write architectural constraints somewhere the agent can read them; treat tool design as the primary reliability lever; unify state rather than splitting execution from business state; sandbox any agent that executes code; attach feedback to traces rather than just collecting them; and preserve human judgment at consequential decision points rather than automating past it.
