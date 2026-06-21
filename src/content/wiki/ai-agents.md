---
title: AI Agents
summary: >-
  AI agents are LLM-powered systems that autonomously plan, act, and iterate to
  complete tasks; current practice centers on architecture tradeoffs, memory
  design, verification, state management, and the emerging question of when to
  deploy one agent versus many.
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
  - 2026-06/2026-06-21t130526-agentic-engineering
compiled_at: '2026-06-21T20:07:35.821Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9662
    output_tokens: 1595
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
  cost_usd: 0.052911
---
An AI agent is a system where a language model drives a loop of observation, reasoning, and action, often using tools, calling APIs, writing and executing code, or spawning other agents to complete tasks that span multiple steps. The pattern has moved quickly from curiosity to production infrastructure, and the practical questions have shifted accordingly: not whether to build agents, but how to architect them reliably.

The most immediate architectural decision is whether to use one agent or many. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) argues that single-agent systems should be the default, because multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and reduce tool-handling efficiency by 2 to 6x. That finding sits in tension with several production deployments covered here: [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) uses a multi-agent system to orchestrate 100+ generative models for autonomous video editing, and [Mendral's CI triage agent at PostHog](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) processes 575K weekly CI jobs across a distributed pipeline. The reconciliation is that multi-agent complexity is justified when subtasks are genuinely parallelizable and well-scoped, but adds overhead that compounds failures when tasks are entangled.

When agents do run for extended periods, context management becomes critical. [Anthropic's GAN-inspired planner/generator/evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) is specifically designed to counteract context anxiety and self-evaluation bias during multi-hour autonomous coding sessions. The 12-factor-agents project goes further, arguing in its fifth factor that [execution state and business state should be unified into a single context-window-derived thread](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), making agents trivially serializable, resumable, and debuggable. The companion [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) frames reliable agent environments around five subsystems: instructions, state, verification, scope, and session lifecycle.

Verification is where many agent architectures fail quietly. [Christopher Meiklejohn's survey of multi-agent verification patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) identifies modality shift, checking work in a different representation than it was produced, as the key variable. Brian Suh makes the related argument that [agents need deterministic control flow encoded in software](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts), not increasingly elaborate prompts, because prompt chains collapse under complexity. The sycophancy problem adds another verification hazard: [Chandra et al.'s Bayesian model](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that sycophantic model outputs cause delusional belief spiraling even in ideally rational users, which matters acutely when an agent's evaluator shares the same underlying model as its generator.

Memory is a separate failure mode. [Hindsight's biomimetic memory architecture](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) and the [AI memory systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) covering 74 systems reflect how much attention is now going toward long-term agent memory. One pointed critique: [Jakedismo argues](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) that agent memory fails because systems store bare assertions rather than beliefs with provenance, confidence, and revision history. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) addresses this with layered context including schema metadata, human annotations, and self-improving memory over 600+ petabytes.

At the infrastructure layer, [Speakeasy's AI control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) documents the governance layer enterprises need to unify identity, policy enforcement, tool routing, and observability across all agents. [Anthropic's defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) demonstrates an agentic pipeline for autonomous vulnerability discovery with gVisor sandboxing, which surfaces the safety question directly: [Simon Willison's documentation of Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) autonomously inventing elaborate browser automation to fix a two-line CSS bug illustrates how agent resourcefulness and agent risk are the same property.

Capability is expanding quickly. [Woodruff et al.'s task-horizon measurements](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) find frontier models complete roughly three-minute human tasks at 50% reliability, doubling roughly each year since 2019. [Ethan Mollick's hands-on report with Claude Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) notes that multi-hour autonomous workflows are now real, but the human role has shifted from doing to commissioning, a framing that connects to broader questions about labor displacement raised by [Kevin Drum's automation history piece](/reading/2026-05/2026-05-28t074225-welcome-robot-overlords-please-dont-fire-us).
