---
title: Agentic workflows
summary: >-
  Agentic workflows delegate multi-step tasks to LLM-driven agents that plan,
  call tools, and loop autonomously; the field's central challenge is making
  that autonomy reliable, safe, and productively scoped without simply prompting
  harder.
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
  - 2026-06/2026-06-21t130526-agentic-engineering
compiled_at: '2026-06-21T20:11:32.618Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12614
    output_tokens: 1754
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
  cost_usd: 0.064152
---
An agentic workflow is one where an LLM drives a sequence of decisions and tool calls with minimal human intervention per step. The pattern has moved from research curiosity to production infrastructure quickly enough that the engineering problems outpace the marketing claims.

The core reliability problem surfaces consistently across sources. Christopher Meiklejohn [documents firsthand](https://elliottsencan.com/reading/2026-05/2026-05-03t110355-babysitting-the-agent) how Claude declares work complete after minimal verification, requiring manual click-through of every feature after 52 added guardrails. The lesson from a data engineering agent described by Aiyan [is the inverse of conventional wisdom](https://elliottsencan.com/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it): three architectural generations, from rigid state machine to orchestrator to single general-purpose agent, showed that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering. Brian Suh [makes the same point structurally](https://elliottsencan.com/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): reliable agents need deterministic control flow encoded in software, not increasingly elaborate prompt chains.

State management is the substrate beneath reliability. The 12-factor-agents project [argues for unifying execution state and business state](https://elliottsencan.com/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) into a single context-window-derived thread, which makes serialization, debugging, and recovery all simpler. Anthropic's harness engineering work [describes a two-agent initializer-plus-incremental-coder architecture](https://elliottsencan.com/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) that preserves progress across context windows via a git repo and a progress file. Their Managed Agents service [separates the harness, session log, and sandbox into stable, swappable interfaces](https://elliottsencan.com/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands), cutting p50 time-to-first-token by roughly 60% and allowing model upgrades without breaking clients.

Memory is equally central. The Hindsight project [builds biomimetic memory structures](https://elliottsencan.com/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) — world facts, experiences, mental models — so agents compound learning across sessions. Zerostack [takes a simpler approach](https://elliottsencan.com/reading/2026-06/2026-06-11t023157-memory-design-zerostack): plain Markdown files on disk, no vector stores, with auto-injected XML context blocks and three tools for read, write, and search. Storybloq [persists session context](https://elliottsencan.com/reading/2026-05/2026-05-11t155625-storybloqstorybloq) via a .story/ directory of JSON files. The practical consensus is that stateless agents degrade quickly on anything longer than a single session.

Single-agent versus multi-agent is a live design question with quantified costs. Ben Dickson [cites Stanford and Google/MIT research](https://elliottsencan.com/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) showing multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, making single-agent the right default for most tasks. Cloudflare's Project Glasswing [argues the other direction for security work](https://elliottsencan.com/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us): parallel hunters, adversarial validators, and cross-repo tracers in a multi-agent harness dramatically improve vulnerability discovery. Anthropic's Claude Code [now supports dynamic workflows that spin up hundreds of parallel subagents](https://elliottsencan.com/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) for large-scale migrations and audits. The appropriate topology depends on error sensitivity and task parallelizability.

Observability closes the loop. Harrison Chase [argues that traces alone do not improve agentic systems](https://elliottsencan.com/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning): attaching feedback signals — user ratings, LLM-as-judge scores, deterministic rules — to traces is what turns monitoring into a learning loop. Plurai [automates the evaluation and guardrail side](https://elliottsencan.com/reading/2026-05/2026-05-04t235011-plurai), generating training data and deploying custom judgment models with sub-100ms latency.

Sandboxing is non-negotiable once agents have filesystem and network access. Simon Willison [documents Claude Fable autonomously inventing elaborate browser automation techniques](https://elliottsencan.com/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) to debug a two-line CSS fix, noting that resourcefulness at that level makes unsandboxed agents genuinely dangerous. The case for Docker containment [is made directly by cekrem](https://elliottsencan.com/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box): credential leaks and accidental data destruction are real risks that auto-approve mode inside a container eliminates safely.

The organizational dimension is underweighted in most tooling discussions. The Typical Set [observes that coding agents make code-writing cheap but amplify organizational misalignment](https://elliottsencan.com/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) — shared context, specification clarity, and management coherence remain the actual bottlenecks. Lars Faye [argues more directly](https://elliottsencan.com/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that full agentic delegation accelerates skill atrophy and inverts developer priorities toward speed over understanding. Pete Millspaugh [proposes a "Slow Mode"](https://elliottsencan.com/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) that keeps the human involved at every planning step to trade short-term throughput for long-term ownership.
