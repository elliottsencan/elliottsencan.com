---
title: AI agents
summary: >-
  Autonomous systems that plan, act, and verify across tool calls and multi-step
  workflows, with active debate over architecture choices, coordination costs,
  memory design, state management, and the governance infrastructure needed to
  make them reliable.
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
  - 2026-07/2026-07-09t161342-ai-2040-plan-a
compiled_at: '2026-07-09T23:15:57.578Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10122
    output_tokens: 1462
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
  cost_usd: 0.052296
---
An AI agent, in practice, is an LLM embedded in a loop: it receives a goal, selects tools, observes results, and iterates until done or stuck. That loop can be simple — a single model running sequentially — or elaborate, with specialized sub-agents handing work between each other. The central tension across most current writing on the topic is not whether agents work, but how to keep them reliable when the scope of their autonomy grows.

The case for multi-agent architectures is that parallelism and specialization can handle tasks no single context window can hold. Anthropic's internal harness work describes a GAN-inspired planner/generator/evaluator triad that runs multi-hour autonomous coding sessions, explicitly designed to overcome the self-evaluation bias a single agent exhibits [Harness Design for Long-Running Application Development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). Poolday's Creator-1 routes video editing across 100+ generative models through a similar orchestration layer, producing fully editable outputs rather than static renders [Poolday](/reading/2026-04/2026-04-30t231206-poolday). The case against is quantitative: Stanford and Google/MIT research cited by Ben Dickson shows coordination overhead can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, making single-agent systems the right default for most tasks [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions).

Verification is the structural problem that multi-agent architectures expose. Christopher Meiklejohn's survey of verification patterns argues that the key variable is modality shift: checking work in a different representation than it was produced in, because agents are systematically overconfident in their own output [Getting Up to Speed on Multi-Agent Systems, Part 6: Verification Patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). Brian Suh makes a related point about control flow: reliability comes from deterministic state transitions and validation checkpoints encoded in software, not from more elaborate prompting [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). The 12-factor-agents project extends this into a concrete principle, arguing that execution state and business state should be unified into a single context-window-derived thread, making serialization, debugging, and recovery tractable [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

Memory is a second structural problem. The naive model — storing conversation history — fails over long sessions because agents accumulate stale or contradictory assertions with no mechanism to revise them. One framing proposes treating agent memory as a belief-maintenance problem rather than a storage problem, requiring provenance, confidence scores, scope, and supersession records [Agent memory is a belief-maintenance problem, not a storage problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). The vectorize-io/hindsight project approaches the same problem through biomimetic memory structures that separate world facts, experiences, and mental models [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). A live comparison of 74 agent memory systems across architecture and benchmark dimensions illustrates how fractured the solution space still is [AI Memory Systems — Feature Comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison).

At the infrastructure layer, enterprise deployments require a governance layer — unified identity, policy enforcement, tool routing, and observability — that Speakeasy calls the AI control plane [AI Control Plane: Architecture and Vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). Credential management is a specific pinch point: Latchkey addresses it by injecting API credentials locally so agents can authenticate against external services without ever receiving raw tokens [Latchkey: Credential Layer for Local AI Agents](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

Capability is advancing faster than governance. Simon Willison documents Claude Fable 5 autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, and notes that the same resourcefulness makes unsandboxed agents genuinely dangerous [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Frontier model task-completion horizons are doubling roughly every year; GPT-5.5 now handles approximately three-minute human tasks at 50% reliability without chain-of-thought reasoning, with safety implications for monitoring approaches that depend on CoT visibility [Estimating No-CoT Task-Completion Time Horizons of Frontier AI Models](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier). The practical consequence, as Ethan Mollick observes from hands-on work with Claude 5 Fable, is that the human role has shifted from doing to commissioning — directing multi-hour autonomous workflows rather than executing steps [What it feels like to work with Mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos).
