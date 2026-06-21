---
title: AI agents
summary: >-
  AI agents are LLM-powered systems that plan, act, and iterate autonomously
  across multi-step tasks; current practice clusters around architecture
  choices, memory design, verification, and the coordination costs of
  multi-agent approaches.
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
compiled_at: '2026-06-21T18:23:21.833Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9516
    output_tokens: 1372
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
  cost_usd: 0.049128
---
An AI agent is a system that uses a language model to execute multi-step tasks autonomously, taking actions, calling tools, and looping until some goal is satisfied or a human intervenes. The concept has moved rapidly from prototype to production, and the engineering literature around it increasingly concerns not whether agents work but under what conditions they are reliable, safe, and worth the complexity.

The first major tension in agent design is single vs. multi-agent architecture. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) argues that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2-6x, making a single agent the right default for most tasks. The [Supaconductor project](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) and [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) sit at the opposite end, using multi-agent pipelines for tasks that genuinely require parallelism or specialization. [Anthropic's GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) offers a middle path: structured role separation within a controlled loop rather than ad-hoc agent proliferation.

Reliability is the second major cluster. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not increasingly elaborate prompt chains. The [12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) extends this by recommending that execution state and business state be unified into a single context-window-derived thread, which simplifies serialization, debugging, and recovery. [Christopher Meiklejohn's survey of verification patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) adds that the key variable in agent self-checking is modality shift: verifying outputs in a different representation than they were produced, with Cursor's visual feedback loop as the strongest real-world example.

Memory is the third problem. [Vectorize-io's Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) takes a biomimetic approach, building world facts, experiences, and mental models so agents improve over time. A complementary argument from [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) reframes the problem entirely: agent memory fails because systems store assertions rather than beliefs, missing provenance, confidence, and revision history. The [LostWarrior knowledge-base CLI](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) addresses a narrower version of the problem, structuring project context as tiered markdown so agents can navigate without burning excess tokens.

Safety and oversight cut across all of these. [Simon Willison's documentation of Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) shows that a highly capable, proactive agent autonomously inventing browser automation techniques is also genuinely dangerous when unsandboxed. [Anthropic's vulnerability-discovery harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing to contain an agentic security pipeline. [Speakeasy's AI control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) argues enterprises need a dedicated governance layer unifying identity, policy enforcement, tool routing, and observability across every agent they deploy. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) addresses the evaluation side, auto-generating training data and guardrail models for agents without labeled data pipelines.

On the orchestration strategy question, [aiyan.io argues](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) that teams should skip building custom orchestration frameworks and instead ship MCP tool servers and agent skills that extend frontier agents, letting model providers maintain the loop. [Ethan Mollick's hands-on report with Claude Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) confirms the capability direction: multi-hour autonomous workflows are real, but the human role has shifted from doing to commissioning. Capability benchmarks support the trajectory; [LessWrong analysis](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) finds frontier models handle roughly three-minute human tasks at 50% reliability, doubling approximately every year since 2019.
