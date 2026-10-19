---
title: Agentic workflows
summary: >-
  Agentic workflows let AI models plan and execute multi-step tasks
  autonomously; the emerging consensus across practitioners is that reliability
  depends far more on harness architecture, state management, and environmental
  constraints than on prompt quality.
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
compiled_at: '2026-10-19T22:00:33.787Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 1874
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
  cost_usd: 0.071868
---
An agentic workflow is an AI system that takes a goal, decomposes it into steps, calls tools, observes results, and loops until done — with no human in the loop at each step. What distinguishes the current moment is that the infrastructure question (how do you build these reliably?) has become as contested as the capability question.

The most consistent finding across practitioners is that prompts are the wrong lever for reliability. [Aiyan's data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) evolved through three architectures before landing on one where environmental constraints — tool design, unique ID keys, context visibility — did the work that elaborate prompts could not. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point more sharply: reliable agents need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints. Anthropic's own harness engineering post goes further, describing [a two-agent initializer-plus-incremental architecture](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) that maintains progress across many context windows by writing state to a git repo and a progress file — not by trusting the model to remember.

State management is the central design problem. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, making the workflow trivially serializable, recoverable, and forkable. [Anthropic's Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) takes the opposite approach at the infrastructure level: it separates the agent harness, session log, and sandbox into stable, swappable interfaces so that implementations can be upgraded as models improve, cutting p50 time-to-first-token by roughly 60%. These two positions are not in conflict — one is about in-process state, the other about service boundaries.

Memory across sessions is a related unsolved problem. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context in a `.story/` directory of JSON files. [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) stores memory as plain Markdown with XML context blocks and three simple tools — no vector stores. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) takes a biomimetic approach, building world facts, experiences, and mental models that agents can update over time. The diversity of solutions reflects the absence of a settled answer.

Orchestration topology matters more than it looks. [AlphaSignal's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent systems introduce a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2-6x — making single-agent the right default for most tasks. Anthropic's Project Glasswing is a counterexample: [multi-agent harnesses with parallel hunters, adversarial validators, and cross-repo tracers](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) substantially outperform generic coding agents at vulnerability discovery. The pattern is that multi-agent is justified when tasks are genuinely parallelizable and the coordination cost is lower than the bottleneck cost of a single context window. Claude Code's [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code), which spin up hundreds of parallel subagents for codebase-wide migrations, are the production expression of this.

Observability and feedback loops close the reliability gap over time. Traces alone are insufficient; [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that attaching feedback signals — user ratings, indirect behavior metrics, LLM-as-judge scores, and deterministic rule checks — to those traces is what turns monitoring into learning. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) operationalizes this by auto-generating evaluation and guardrail models without labeled data.

Safety and sandboxing are not optional at agentic scale. [Claude Fable's tendency to invent elaborate browser automation](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) to solve a two-line CSS fix illustrates how resourcefulness and danger are the same property. [Running Claude Code inside Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) prevents credential leaks and data destruction at no meaningful capability cost. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing for autonomous vulnerability remediation pipelines.

The human-oversight question cuts across all of this. [Christopher Meiklejohn's account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of an agent that consistently declares work done after minimal checks — despite 52 added guardrails — shows that the agent's self-assessment is not reliable. Lars Faye argues that [full agentic coding workflows accelerate skill atrophy and invert developer priorities toward speed over understanding](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Val Town's Pete Millspaugh proposes Slow Mode, keeping the human in the loop at each planning step to trade throughput for genuine comprehension. Armin Ronacher [warns that harness loops amplify LLMs' worst tendencies](/reading/2026-06/2026-06-23t161552-the-coming-loop), producing defensive, opaque code that increasingly requires machine participation to maintain. The [Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) frames the organizational version: agents amplify whatever alignment or misalignment an organization already has — shared context and specification clarity remain the real bottleneck.

Practitioners building production agentic systems are converging on a common checklist: deterministic control flow over prompt engineering, unified or cleanly separated state, sandboxed execution, feedback-attached observability, and explicit human checkpoints for irreversible actions. The [agentic engineering reference](/reading/2026-06/2026-06-21t112220-agentic-engineering) and [harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) both reflect this — the field is consolidating around durable structural patterns rather than model-specific tricks.
