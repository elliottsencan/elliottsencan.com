---
title: AI agents
summary: >-
  AI agents are LLM-driven systems that perceive state, call tools, and take
  multi-step actions autonomously; a growing body of research shows their
  reliability depends far more on environment design, state management, and
  verification architecture than on prompt quality alone.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231206-poolday
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - 2026-04/2026-04-30t231319-markdownlm
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - >-
    2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2
  - 2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6
  - 2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
  - 2026-05/2026-05-03t110355-babysitting-the-agent
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
  - 2026-05/2026-05-04t235011-plurai
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - 2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla
  - 2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors
  - >-
    2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-04t194244-inside-openais-in-house-data-agent
  - >-
    2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier
  - 2026-06/2026-06-11t023157-memory-design-zerostack
  - >-
    2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage
  - 2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-14t094245-agentswarms
  - 2026-06/2026-06-21t112220-agentic-engineering
compiled_at: '2026-06-18T21:39:17.616Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11370
    output_tokens: 1716
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
  cost_usd: 0.05985
last_source_added: '2026-06-21T20:05:26.957Z'
---
An AI agent is an LLM-based system that loops over perception, reasoning, and action across multiple steps, often invoking external tools and maintaining some form of state between turns. The category spans single-model coding assistants, multi-agent pipelines with specialized sub-agents, and fully autonomous systems that run for hours without human input.

The most consistent practical finding across recent work is that prompt engineering is a weak substitute for structural reliability mechanisms. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces three successive architectures, concluding that atomic tools and explicit environment design outperform elaborate prompts at every stage. [Brian Suh makes the same point more directly](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, is what makes agents verifiable. [The 12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) extends this by arguing that execution state and business state should be unified into a single context-window-derived thread, which makes sessions serializable, debuggable, and resumable.

Anthropics engineering posts operationalize these principles at scale. [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into independent interfaces, cutting p50 time-to-first-token by around 60% and p95 by over 90%. [Harness design for long-running apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture for multi-hour autonomous coding sessions. [Effective harnesses for long-running agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) splits work into an initializer agent and an incremental coding agent to maintain consistent progress across context-window boundaries. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes harness components as instructions, state, verification, scope, and session lifecycle.

Multi-agent systems add coordination costs that single-agent defaults avoid. Christopher Meiklejohn's eight-part series maps the research landscape: [Wave 1 papers](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) (CAMEL, ChatDev, MetaGPT, AutoGen) demonstrated that agents could coordinate but shared a failure mode of treating errors as termination. [Wave 2 empirical work](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) found failure rates of 41-87% across 1,600 traces, with information synthesis, not coordination, as the primary bottleneck. [The benchmarks installment](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) notes that most MAS benchmarks were designed for single agents and cannot measure coordination overhead, which is why ChatDev and MetaGPT report contradictory results. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) quantifies the coordination tax: multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2-6x, making single-agent the sensible default for most tasks.

Verification is the other axis where the field is still unsettled. Meiklejohn's [verification patterns installment](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift, checking work in a different representation than it was produced in, separates weak self-verification from structural gates. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) takes this further by using multi-agent debate to validate training data for guardrails, deploying a small language model for evals at sub-100ms latency. Memory is a related open problem: [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) uses biomimetic retrieval structures, while [Jakedismo's belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that all current memory designs fail because they store assertions rather than beliefs with provenance and revision history.

Observability closes the loop. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone do not improve agents; feedback signals, whether user ratings, behavioral cues, or deterministic rules, are what turn observability into learning. [The AI control plane framing from Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) adds a governance layer concern: as agents touch more enterprise systems, identity, policy enforcement, and observability need to be unified across all agent traffic.

The human-in-the-loop question remains unresolved in practice. [Lars Faye's skeptical take](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full reliance on coding agents erodes the debugging skills needed to supervise them, a compounding liability. [Christopher Meiklejohn's personal account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents the gap between an agent declaring work complete and work actually working, no matter what guardrails are in place. [Simon Willison's account of Claude Fable 5](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) shows the inverse risk: an agent so proactively autonomous it invented a custom CORS server and injected JavaScript into templates to debug a CSS scrollbar, spending $12 in tokens on a problem that needed a narrower scope.
