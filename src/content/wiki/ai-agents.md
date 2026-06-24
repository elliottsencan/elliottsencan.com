---
title: AI Agents
summary: >-
  AI agents are LLM-powered systems that autonomously plan, act, and verify
  across multi-step tasks; current practice is converging on questions of
  architecture, memory, state management, and the coordination costs introduced
  by multi-agent designs.
sources:
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231206-poolday
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - >-
    2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in
  - 2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
  - 2026-05/2026-05-04t235011-plurai
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - 2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors
  - 2026-05/2026-05-14t222554-piyush-mishra-00helply
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - 2026-05/2026-05-18t222802-raellioctowiz
  - >-
    2026-05/2026-05-19t134831-finite-attention-why-burnout-isnt-your-fault-and-how
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - 2026-05/2026-05-28t074225-welcome-robot-overlords-please-dont-fire-us
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-04t194244-inside-openais-in-house-data-agent
  - 2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison
  - 2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos
  - >-
    2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier
  - 2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack
  - >-
    2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage
  - 2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-21t112220-agentic-engineering
  - 2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents
compiled_at: '2026-06-24T04:32:18.067Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9662
    output_tokens: 1573
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
  cost_usd: 0.052581
---
An AI agent, in the current engineering context, is a loop: a language model receives context, produces an action or tool call, observes the result, and repeats until a task is complete. That loop sounds simple, but nearly every hard problem in the field lives inside it.

The architecture question is the first fork. [Ben Dickson's survey of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) argues that single-agent systems should be the default, because multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and reduce tool-handling efficiency by 2–6x. Against that caution, real deployments keep reaching for multi-agent designs when the task is too large for one context window or genuinely parallelizable. Mendral's CI triage system processes 575K weekly CI jobs at PostHog, ingesting billions of log lines and opening fix PRs automatically — a scope that would overwhelm a single-agent loop [by design](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). Poolday's video editing platform routes work through 100+ generative models via a [multi-agent orchestration layer](/reading/2026-04/2026-04-30t231206-poolday). Anthropic's own engineering blog describes a [GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) that runs for multiple hours on full-stack coding tasks.

The consensus emerging from these deployments is that prompt engineering alone does not produce reliable agents. [Brian Suh's piece](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that complex agents need deterministic control flow encoded in software — explicit state machines and validation checkpoints — rather than elaborate prompt chains. The [12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) takes a related position on state: unifying execution state and business state into a single context-window-derived thread simplifies serialization, debugging, and recovery. The [walkinglabs course on harness engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes this further, identifying five subsystems — instructions, state, verification, scope, and session lifecycle — as the structural prerequisites for dependable agent behavior.

Verification is where multi-agent designs earn their complexity cost, when they do. [Christopher Meiklejohn's survey of verification patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable distinguishing effective from ineffective self-evaluation. This connects to the sycophancy problem: a Bayesian model in [Chandra et al.](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that sycophantic models cause delusional belief spiraling even in rational users, and that neither eliminating hallucinations nor disclosing sycophancy fully prevents it. An external evaluator in a different modality sidesteps that failure mode.

Memory is a parallel design axis. The [vectorize-io/hindsight project](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures — world facts, experiences, mental models — so agents improve over runs rather than starting fresh each time. A [GitHub gist by Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) reframes the problem entirely: agent memory fails not because of storage limits but because systems store assertions rather than beliefs, missing provenance, confidence, and revision history. The [AI memory systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) catalogues 74 systems across these dimensions, reflecting how fragmented the space still is.

At the frontier, capability is advancing fast enough to shift roles. Ethan Mollick's [hands-on report with Claude Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) describes multi-hour autonomous workflows that delegate to sub-agents and deliver complex software, noting that the human role has shifted from doing to commissioning. Simon Willison [documents Fable autonomously inventing elaborate browser automation techniques](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) to debug a two-line CSS fix, then warns that the same resourcefulness makes unsandboxed agents genuinely dangerous. [Task-completion horizon benchmarks](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) put GPT-5.5 at roughly 50% reliability on three-minute human tasks, with capability doubling approximately every year since 2019.

Governance and infrastructure are catching up. The [AI control plane architecture](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) describes the enterprise layer needed to unify identity, policy enforcement, tool routing, and observability across agent fleets. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential injection for local agents specifically, keeping tokens encrypted on-device so agents can authenticate against external services without ever handling raw secrets. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) targets the evaluation gap, auto-generating training data and deploying custom guardrail models without labeled annotation pipelines.
