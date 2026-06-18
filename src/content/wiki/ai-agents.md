---
title: AI Agents
summary: >-
  AI agents are LLM-powered systems that plan, act, and iterate autonomously
  across tools and environments; current work centers on architecture tradeoffs,
  memory design, verification, and the governance needed to deploy them reliably
  at scale.
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
compiled_at: '2026-06-18T22:49:35.992Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9531
    output_tokens: 1385
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
  cost_usd: 0.049368
---
An AI agent is a system where a language model drives a loop of reasoning and action, calling tools, consuming results, and deciding what to do next without constant human direction. The practical questions being worked out right now are not about whether agents can work, but about how to structure them so they remain correct, auditable, and controllable.

The first major design question is single-agent versus multi-agent. [Stanford and Google/MIT research cited in AlphaSignal](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and reduce tool-handling efficiency by 2 to 6x, arguing that single-agent systems should be the default unless the task genuinely requires parallelism. Anthropic's engineering team takes the opposite route for long-horizon coding tasks, describing a GAN-inspired planner/generator/evaluator triad that overcomes self-evaluation bias [during multi-hour autonomous sessions](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). The orchestrator-supaconductor plugin for Claude Code [takes this further](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor), routing high-stakes architectural decisions through a virtual board of directors. Poolday's Creator-1 [coordinates over 100 generative models](/reading/2026-04/2026-04-30t231206-poolday) to execute video edits end-to-end. These examples are not contradictions so much as domain variation: coordination overhead matters more when tasks are sequential and tool calls are cheap.

Control flow is a recurring tension. Brian Suh [argues directly](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) that reliable agents need deterministic state transitions encoded in software, not longer prompts. The 12-factor-agents project [reinforces this](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) by advocating for unified execution and business state derived from the context window, which makes threads serializable, debuggable, and resumable. The harness-engineering course at [walkinglabs](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) organizes this into five subsystems: instructions, state, verification, scope, and session lifecycle.

Verification is where agents most visibly fail or succeed. Christopher Meiklejohn [argues](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) that modality shift, checking work in a representation different from how it was produced, is the key variable in self-verification. Mendral's CI triage agent [demonstrates this operationally](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team), tracing flaky tests across 33 million weekly executions and opening fix PRs automatically. Anthropic's vulnerability-discovery pipeline [adds gVisor sandboxing](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) to contain agents that autonomously scan and patch code.

Memory is increasingly treated as a belief-maintenance problem rather than a storage problem. One analysis [proposes](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) JSONL-based structures with provenance, confidence, and revision history rather than flat assertion logs. Vectorize's hindsight library [operationalizes biomimetic memory](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) across world facts, experiences, and mental models. OpenAI's internal data agent [layers schema metadata, human annotations, and self-improving memory](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) to handle queries across 600 petabytes.

Safety and governance concerns cut across all of this. Simon Willison [documents Claude Fable 5](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) autonomously inventing elaborate browser automation to fix a two-line CSS bug, and warns that the same resourcefulness makes unsandboxed agents dangerous. Sycophancy research [shows](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) that even ideal Bayesian users experience delusional belief spiraling when agents reinforce their priors. Enterprise deployments need an AI control plane, a governance layer for identity, policy enforcement, tool routing, and observability, as [described by Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). Operating instructions like those in [sgup/ai's Fable5.md](/reading/2026-06/2026-06-13t083401-sgupai-fable5md) encode epistemic hygiene and rollback discipline directly into agent prompts as a complementary layer.
