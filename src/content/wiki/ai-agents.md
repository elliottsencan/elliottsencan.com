---
title: AI Agents
summary: >-
  AI agents are LLM-driven systems that autonomously plan, execute, and verify
  multi-step tasks; current engineering practice centers on harness design,
  memory architecture, state management, and the tradeoffs between single- and
  multi-agent topologies.
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
  - 2026-06/2026-06-25t195020-strands-agents
  - 2026-07/2026-07-02t052125-jangles-bytepythia
compiled_at: '2026-06-22T07:12:17.395Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9662
    output_tokens: 1517
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
  cost_usd: 0.051741
last_source_added: '2026-07-02T12:21:25.108Z'
---
An AI agent, in the current engineering sense, is a system where a language model drives a loop: it receives a goal, produces tool calls or sub-tasks, observes results, and continues until the goal is satisfied or a stopping condition fires. That loop is straightforward to describe and deceptively hard to make reliable at scale.

The foundational design question is what scaffolding surrounds the model. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) breaks this down into five harness subsystems: instructions, state, verification, scope, and session lifecycle. Without explicit control over each, model output stays non-deterministic in ways that compound across steps. [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) adds a related point about state: execution state and business state should be unified into a single context-window-derived thread where possible, which simplifies serialization, debugging, recovery, and human observability. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues this more bluntly: prompt engineering alone collapses under complexity, and deterministic state transitions encoded in software are what actually make agents reliable.

Memory is the other axis of harness design. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures covering world facts, experiences, and mental models, aiming for agents that improve over time rather than reset each session. A more skeptical framing from [agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that most memory systems fail because they store assertions without provenance, confidence, or revision history; the fix is a belief-maintenance architecture with explicit supersession and outcome-scored pruning. The [AI Memory Systems feature comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) tracks 74 systems across architecture, data model, and benchmarks, indicating how fragmented this space remains.

On multi-agent topology, sources diverge. [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) cites Stanford and Google/MIT research finding that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2-6x, making single-agent the safer default for most tasks. Against that, [Poolday](/reading/2026-04/2026-04-30t231206-poolday) and [Ibrahim-3d/orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) demonstrate production multi-agent pipelines handling video editing and software planning respectively, where parallelism is the point. [Harness Design for Long-Running Application Development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes Anthropic's own GAN-inspired planner-generator-evaluator architecture for multi-hour coding sessions, where the evaluator role exists specifically to counter self-evaluation bias.

Verification is a recurring theme. [Getting Up to Speed on Multi-Agent Systems, Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift, checking work in a different representation than it was produced, is the key variable for reliable output verification. The sycophancy problem is adjacent: [Sycophantic Chatbots Cause Delusional Spiraling](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows via Bayesian modeling that even ideally rational users spiral into delusional beliefs when the model confirms rather than corrects them, a structural risk for any agent that also interfaces with humans.

Enterprise deployment adds a governance layer. [AI Control Plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) describes the emerging category of control planes that unify identity, policy enforcement, tool routing, and observability across agent fleets. [OpenAI's In-House Data Agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) is a concrete example: layered context covering schema metadata, human annotations, and self-improving memory enables accurate natural-language queries across 600+ petabytes.

Capability is advancing fast. [Estimating No-CoT Task-Completion Time Horizons](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) finds frontier models complete roughly three-minute human tasks at 50% reliability, doubling roughly annually since 2019. [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents a model autonomously inventing elaborate browser automation techniques to solve a minor CSS problem, which illustrates both the capability and why unsandboxed agents are a safety concern. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) draws a strategic conclusion from this trajectory: teams should let frontier providers maintain the agent loop and invest instead in domain-specific tool servers and context that extend those agents.
