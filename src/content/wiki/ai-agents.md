---
title: AI agents
summary: >-
  Software systems that autonomously plan, execute, and verify multi-step tasks
  using LLMs as their reasoning core, with active debate around architecture,
  memory, verification, coordination overhead, and where human oversight remains
  necessary.
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
compiled_at: '2026-06-20T12:34:53.981Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9361
    output_tokens: 1356
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
  cost_usd: 0.048423
---
An AI agent is a software system that uses a language model to plan and execute sequences of actions toward a goal, rather than responding to a single prompt and stopping. The concept spans a wide range, from a single model calling a handful of tools to elaborate multi-agent pipelines where specialized subagents divide labor, evaluate each other's output, and escalate decisions to human reviewers.

The architectural question that dominates current practice is how much structure to impose around the model's reasoning. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, rather than increasingly elaborate prompts. The 12-factor-agents project pushes a related principle: unify execution state and business state into a single context-window-derived thread, so the full history is serializable, debuggable, and resumable without a separate tracking layer [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). [Walkinglabs](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes this further, naming five harness subsystems — instructions, state, verification, scope, and session lifecycle — as the difference between unreliable model output and dependable engineering results.

Verification is where many agentic systems break down. [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable in output quality, with visual feedback loops as the strongest real-world example. Anthropic's own engineering writeup on long-running coding sessions uses a GAN-inspired planner/generator/evaluator structure to overcome self-evaluation bias during multi-hour autonomous runs [Anthropic engineering](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development).

Memory is a separate problem. The dominant framing — retrieving stored text — misses the point, according to [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): agents need belief-maintenance systems that track provenance, confidence, and revision history, not assertion storage. The [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) project pursues biomimetic memory structures that let agents improve over time, and OpenAI's internal data agent layers schema metadata, human annotations, code enrichment, and self-improving memory to query 600+ petabytes accurately [OpenAI](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent).

The multi-agent question has a measurable cost. Research cited by [Ben Dickson](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent orchestration can amplify errors up to 17x and reduce tool-handling efficiency by 2–6x compared to single-agent baselines, making single-agent the correct default for most tasks. When multi-agent systems are warranted — as in Poolday's 100+ model video editing pipeline [Poolday](/reading/2026-04/2026-04-30t231206-poolday) or Mendral's CI triage agent at PostHog [Mendral](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) — the coordination overhead must be justified by the task's parallelism or specialization needs.

Governance becomes critical at enterprise scale. [Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) describes an AI control plane that unifies identity, policy enforcement, tool routing, and observability across every agent and system in an organization. The safety dimension is non-trivial: [Simon Willison](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents a frontier model autonomously inventing browser automation techniques to solve a trivial CSS problem, and notes that the same resourcefulness that makes agents useful makes unsandboxed agents genuinely dangerous.

Capability is advancing measurably. Frontier models now complete roughly three-minute human tasks at 50% reliability without chain-of-thought reasoning, a capability that has doubled annually since 2019 [LessWrong](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier). Ethan Mollick's hands-on report with Claude 5 Fable finds it capable of multi-hour autonomous workflows with sub-agent delegation [Mollick](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos), a shift he describes as moving the human role from doing to commissioning.
