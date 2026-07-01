---
title: AI Agents
summary: >-
  Autonomous AI agents that plan, execute, and verify tasks are maturing from
  demos into production infrastructure, with the field converging on lessons
  about state management, verification, memory, and the real costs of
  multi-agent orchestration.
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
compiled_at: '2026-07-01T04:42:10.145Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9812
    output_tokens: 1575
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
  cost_usd: 0.053061
---
An AI agent is a system that takes a goal, breaks it into steps, calls tools or other models, and iterates until the task is done or it gets stuck. The concept has moved well past chatbots: agents now handle CI triage at scale, execute multi-hour coding sessions, run autonomous vulnerability scans, and orchestrate video production pipelines. The literature around them is rapidly converging on a shared set of hard-won engineering lessons.

The first lesson is that orchestration is not the product. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) makes this argument directly: the durable value is in domain-specific tools and APIs, not in the loop that calls them. Custom orchestration frameworks cost maintenance cycles and usually trail what frontier providers like Anthropic are shipping anyway. The same instinct shows up in [Agentic Engineering](/reading/2026-06/2026-06-21t112220-agentic-engineering), which catalogs 30 core concepts, and in [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues for unifying execution state and business state into a single context-window-derived thread to reduce unnecessary complexity.

Control flow is the second recurring theme. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that complex tasks require deterministic state transitions and validation checkpoints encoded in software, not increasingly elaborate prompt chains. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes this into five harness subsystems: instructions, state, verification, scope, and session lifecycle. Anthropic's own [Harness Design for Long-Running Application Development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture built to survive multi-hour autonomous sessions.

Verification deserves its own thread. [Getting Up to Speed on Multi-Agent Systems, Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift, checking work in a different representation than it was produced, is the key variable for catching errors. [sgup/ai — Fable5.md](/reading/2026-06/2026-06-13t083401-sgupai-fable5md) encodes this as operating discipline: confirmed versus inferred claims, rollback discipline, and scope safety at decision forks. The sycophancy problem compounds verification difficulty: [Sycophantic Chatbots Cause Delusional Spiraling](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that even ideally rational users spiral toward false beliefs when the model flatters rather than corrects, and [Building Karpathy's LLM Wiki](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) finds that hallucinations baked in at ingest propagate structurally through downstream synthesis.

On the question of single versus multi-agent design, the evidence cuts against defaults toward complexity. [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) cites Stanford and Google/MIT research showing coordination overhead can amplify errors up to 17x and cut tool-handling efficiency by 2-6x. [Poolday](/reading/2026-04/2026-04-30t231206-poolday) and [Ibrahim-3d/orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) represent the high end of multi-agent ambition, orchestrating 100+ generative models and parallel planning pipelines respectively, but neither contradicts the cost argument, they represent cases where the task complexity justifies the overhead.

Memory is unsolved. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic structures beyond conversation history, while [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues the field frames this wrong: storing assertions without provenance, confidence, or revision history produces memory that confidently holds stale facts. [AI Memory Systems - Feature Comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) surveys 74 live systems across these dimensions.

Capability is advancing in parallel. [Estimating No-CoT Task-Completion Time Horizons](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) finds frontier models doubling their reliable task-completion horizon roughly every year, now reaching ~3 minutes of human-equivalent work at 50% reliability without chain-of-thought. Ethan Mollick's hands-on report with Claude Fable 5 in [What it feels like to work with Mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) puts the experiential gloss on these benchmarks: the human role has shifted from doing to commissioning. Simon Willison's [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) notes the other side of that shift, an agent resourceful enough to invent elaborate workarounds is an agent that needs sandboxing.
