---
title: AI Agents
summary: >-
  Autonomous AI agents that perceive context, plan, execute tools, and loop
  until a goal is met — a rapidly maturing category with open debates around
  architecture, memory, verification, and when multi-agent orchestration
  actually helps.
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
compiled_at: '2026-11-10T01:12:06.930Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10423
    output_tokens: 1468
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
  cost_usd: 0.053289
---
An AI agent is a system that takes a goal, decomposes it into steps, calls tools or sub-agents to execute those steps, observes results, and iterates until the task is complete or it hits a boundary. The concept has moved from research curiosity to production infrastructure fast enough that engineering conventions are still being argued in public.

The single-vs-multi-agent question is one of the most active debates. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) argues that multi-agent orchestration carries a hidden coordination tax — error amplification up to 17x and tool-handling efficiency losses of 2–6x — making single-agent the safer default for most tasks. That tension is real in practice: [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) deploys a multi-agent system to orchestrate 100+ generative models for video editing end-to-end, while [Mendral's CI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) handles 575K weekly build jobs as a focused single-purpose agent that opens fix PRs automatically.

Control flow is a persistent fault line. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents need deterministic state transitions and validation checkpoints encoded in software, not prompt elaboration. The 12-factor-agents project takes a compatible position: [Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) recommends unifying execution state and business state into a single context-window-derived thread to simplify serialization, debugging, and recovery. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes this further, naming five subsystems — instructions, state, verification, scope, and session lifecycle — that convert unreliable model output into dependable results.

Verification is where many agent designs break. [Christopher Meiklejohn's survey of multi-agent verification patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) identifies modality shift — checking work in a different representation than it was produced — as the key variable. Anthropic's own engineering describes a [GAN-inspired planner/generator/evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) built to overcome self-evaluation bias during multi-hour autonomous coding sessions. Claude Fable's proactive resourcefulness, [documented by Simon Willison](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive), illustrates the other side of that coin: the same autonomy that invents creative debugging workarounds makes unsandboxed agents a genuine security risk.

Memory architecture is an open frontier. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures — world facts, experiences, mental models — so agents accumulate learning across sessions. A sharper framing comes from [Jakedismo's belief-maintenance proposal](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): current memory systems fail because they store bare assertions with no provenance, confidence, or revision history; the fix is tracking beliefs with supersession chains and outcome-scored pruning. The [AI Memory Systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) catalogues 74 implementations across these dimensions.

Enterprise deployment adds governance concerns on top of architecture. [Speakeasy's AI control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) covers the identity, policy, routing, and observability layer that organizations need once multiple agents share tools and data. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses the credential problem specifically, keeping API tokens encrypted on-device so agents authenticate without ever seeing raw secrets. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) shows what production scale looks like: GPT-5 and Codex querying 600+ petabytes across 70k datasets using layered context enrichment and self-improving memory.

The capability trajectory matters for how seriously to take all of this. [Frontier model task-horizon benchmarking](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) finds GPT-5.5 completing roughly three-minute human tasks at 50% reliability, with that horizon doubling approximately every year since 2019. [Ethan Mollick's report on Claude Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) characterizes the shift as moving from doing to commissioning: the human role becomes specifying goals and reviewing outputs rather than executing steps. That shift in human-agent division of labor is the through-line across nearly every source here.
