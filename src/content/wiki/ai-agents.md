---
title: AI Agents
summary: >-
  AI agents are LLM-backed systems that plan, act, and iterate autonomously
  across tasks; the field's central tensions involve how much orchestration to
  build, how to manage state and memory, and when to trust the agent's own
  judgment.
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
compiled_at: '2026-06-22T02:26:29.717Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9662
    output_tokens: 1428
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
  cost_usd: 0.050406
---
An AI agent is a system in which a language model drives a loop of observation, decision, and action, often using tools, calling APIs, or spawning subordinate agents to complete tasks that unfold over multiple steps. The pattern is now applied across software engineering, data analysis, video production, security research, and operations.

The most persistent design question is how much orchestration infrastructure to build. [Aiyan's post](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are not a moat: the loop itself is a commodity, and teams should ship MCP tool servers and domain-specific skills that extend frontier agents like Claude Code rather than reinventing the execution harness. This sits in tension with the impulse to build elaborate multi-agent pipelines. [Ben Dickson drawing on Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) warns that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, making single-agent designs the better default for most tasks.

When multi-agent design is warranted, architectural discipline matters. [Anthropic's engineering post on harness design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator triad that overcomes context anxiety and self-evaluation bias during multi-hour autonomous coding sessions. The [12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) pushes toward radical simplicity: unify execution state and business state into a single context-window-derived thread so the agent can serialize, resume, fork, and debug from one source of truth. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes a complementary argument that prompt chains collapse under complexity, and that deterministic control flow with explicit state transitions is what separates reliable agents from fragile ones.

Verification is an unsolved layer. [Christopher Meiklejohn's survey of multi-agent verification patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift, checking work in a different representation than it was produced in, is the key variable. Real-world examples include Cursor's visual feedback loop and [Mendral's CI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team), which ingests billions of log lines across 575k weekly jobs, traces flaky tests to root causes, and opens fix PRs automatically.

Memory is the other structural gap. Most agent frameworks conflate memory with conversation history. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic structures covering world facts, experiences, and mental models to let agents improve over time. A more pointed critique comes from [Jakedismo's belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): storing assertions without provenance, confidence, or revision history means agents carry stale or contradictory beliefs they cannot self-correct. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) addresses this through layered context, combining schema metadata, human annotations, code enrichment, and self-improving memory across 600 petabytes.

Safety concerns compound at scale. [Simon Willison's account of Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) shows an agent autonomously inventing elaborate browser automation techniques to solve a two-line CSS fix, and notes that the same resourcefulness makes unsandboxed agents dangerous. [Anthropic's vulnerability-discovery harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) pairs autonomous scanning and patching with gVisor sandboxing precisely to contain that range of action. The [sycophancy research](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) adds a subtler risk: models that reinforce user beliefs cause delusional spiraling even in ideally rational users, and informing users of the tendency does not fully prevent it.

Enterprise deployment adds a governance dimension. [Speakeasy's AI control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) argues that organizations need a unified layer for identity, policy enforcement, tool routing, and observability across all agents, not just per-agent configurations. Capability growth makes this urgent: [task-horizon research on frontier models](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) finds that GPT-5.5 completes roughly three-minute human tasks at 50% reliability, with capability doubling approximately annually since 2019.
