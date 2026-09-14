---
title: AI Agents
summary: >-
  Software systems where LLMs autonomously plan, execute, and verify multi-step
  tasks — with active debate over architecture, memory, verification, state
  management, and when single-agent simplicity outperforms multi-agent
  coordination.
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
compiled_at: '2026-09-14T21:29:48.021Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10423
    output_tokens: 1579
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
  cost_usd: 0.054954
---
An AI agent is a system in which a language model drives a loop of reasoning, tool use, and action toward a goal without requiring step-by-step human direction. The concept spans a wide range of implementations, from narrow task runners to multi-hour autonomous pipelines, and the field's active disagreements are as instructive as its settled patterns.

The most persistent architectural debate is whether to build custom orchestration at all. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues teams should skip bespoke orchestration frameworks and instead publish MCP tool servers that extend frontier agents like Claude Code, letting the model provider maintain the loop. That position finds a counterpoint in several implementation-first sources: [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) describes five harness subsystems — instructions, state, verification, scope, and session lifecycle — that engineers must own to get reliable output, and [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that deterministic state transitions and validation checkpoints in code outperform increasingly elaborate prompt chains.

The single-agent versus multi-agent question has empirical weight behind it now. [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) cites Stanford and Google/MIT research showing that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x compared to single-agent baselines, making the single-agent default the right choice for most tasks. Where multi-agent systems do earn their complexity, verification across agents becomes critical: [Getting Up to Speed on Multi-Agent Systems, Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) identifies modality shift — checking work in a different representation than it was produced — as the key variable for catching errors, with Cursor's visual feedback loop as the strongest current example. Anthropic's own [Harness Design for Long-Running Application Development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator architecture that addresses context anxiety and self-evaluation bias during multi-hour coding sessions.

Memory is a distinct unsolved layer. [Agent memory is a belief-maintenance problem, not a storage problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that storing assertions rather than beliefs — missing provenance, confidence, and revision history — is the root cause of memory system failures, proposing a belief-maintenance architecture with supersession and outcome-scored pruning. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) implements biomimetic memory structures (world facts, experiences, mental models) to get state-of-the-art LongMemEval results, and [AI Memory Systems — Feature Comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) catalogs 74 systems across architecture, search modes, and knowledge lifecycle. State management adjacent to memory also demands attention: [12-factor-agents, Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) recommends unifying execution state and business state into a single context-window-derived thread to simplify serialization, debugging, and recovery.

Deployment-grade agents require a governance layer. [AI Control Plane: Architecture and Vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) describes the enterprise need to unify identity, policy enforcement, tool routing, and observability across every agent and system, while [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses the narrower credential problem by keeping API tokens encrypted on-device. Real-world scale looks like [Mendral's CI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team), which ingests billions of log lines weekly to triage flaky tests and open fix PRs, or [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent), which routes natural-language queries across 600 petabytes using layered context and self-improving memory.

Capability trajectories matter for calibrating expectations. [Estimating No-CoT Task-Completion Time Horizons](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) finds GPT-5.5 handles roughly three-minute human tasks at 50% reliability, a capability that has doubled annually since 2019. [What it feels like to work with Mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) reports Claude 5 Fable completing multi-hour agentic workflows with sub-agent delegation, shifting the human role from doing to commissioning. Simon Willison's [documentation of Fable's behavior](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) adds a direct warning: the same resourcefulness that makes capable agents useful makes unsandboxed agents genuinely dangerous, a point the [sgup/ai Fable5.md operating instructions](/reading/2026-06/2026-06-13t083401-sgupai-fable5md) address through scope safety, rollback discipline, and epistemic hygiene.
