---
title: AI agents
summary: >-
  AI agents are LLM-powered systems that take sequences of autonomous actions
  toward goals; current sources converge on architecture decisions around state
  management, verification, memory, and orchestration as the central engineering
  challenges.
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
  - 2026-08/2026-08-11t004752-danielmiesslerlifeos
  - >-
    2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test
compiled_at: '2026-08-31T22:27:59.032Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10423
    output_tokens: 1482
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
  cost_usd: 0.053499
---
An AI agent is a system in which an LLM drives an action loop: the model receives context, selects a tool or action, observes the result, and continues until a goal is met or halted. That loop sounds simple, but nearly every source here is addressing a specific failure mode or design decision that emerges once the loop runs for longer than a few steps.

The most contested question is when to add more agents. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) makes the conservative case plainly: multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, so single-agent systems should be the default. The counterweight is that some tasks structurally benefit from parallelism or specialization. [Anthropic's GAN-inspired planner/generator/evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) handles multi-hour coding sessions by separating concerns across agents precisely because context anxiety and self-evaluation bias make a single agent unreliable at that scale. [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) orchestrates 100+ generative models for autonomous video production. The practical resolution is that multi-agent systems earn their complexity only when the task itself requires it.

Verification is where multi-agent architectures either justify themselves or collapse. [Christopher Meiklejohn's survey of verification patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift, checking work in a different representation than it was produced, is the key variable. Cursor's visual feedback loop is his strongest real-world example. Without some form of independent checking, sycophancy compounds the problem: [a Bayesian model from Chandra et al.](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that even ideally rational users develop delusional belief spirals when interacting with sycophantic models, and informing users of the bias does not reliably prevent it.

State management is the other structural concern. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, which makes the agent serializable, debuggable, and resumable without a separate state machine. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the complementary point that reliable agents need deterministic control flow encoded in software, not increasingly elaborate prompts; explicit state transitions and validation checkpoints are what prevent complex tasks from collapsing. The walkinglabs harness engineering course formalizes this into five subsystems: instructions, state, verification, scope, and session lifecycle.

Memory is increasingly recognized as a distinct problem. [Vectorize's Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures covering world facts, experiences, and mental models rather than just conversation history. [Jakedismo's belief-maintenance proposal](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) frames the failure mode more precisely: most memory systems store assertions without provenance, confidence, or revision history, making them brittle when facts change. The [AI Memory Systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) catalogs 74 systems across these dimensions, signaling that the space is fragmented and that architectural choices here are non-trivial.

At the infrastructure layer, [Speakeasy's AI control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) describes the governance layer enterprises need: unified identity, policy enforcement, tool routing, and observability across all agents. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses a narrower version of the same problem, keeping API credentials encrypted on-device so agents can authenticate without seeing raw tokens. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) targets evaluation, auto-generating training data and guardrail models so agents can be validated without manual annotation pipelines.

Capability is expanding quickly. [Ethan Mollick's hands-on report with Claude 5 Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) finds multi-hour autonomous workflows and sub-agent delegation now functioning reliably, but notes the human role has shifted from doing to commissioning. [Simon Willison's documentation of Fable's autonomous browser automation](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) pairs that observation with a warning: the same resourcefulness that makes agents useful makes unsandboxed agents genuinely dangerous. Sandboxing, as in [Anthropic's vulnerability-discovery pipeline with gVisor](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness), is not optional at production scale.
