---
title: AI Agents
summary: >-
  AI agents are autonomous software systems that plan, execute, and verify tasks
  with minimal human intervention; the emerging literature spans architecture
  patterns, memory design, coordination tradeoffs, and the governance
  infrastructure required to run them reliably.
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
compiled_at: '2026-08-24T18:38:25.893Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10423
    output_tokens: 1514
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
  cost_usd: 0.053979
---
An AI agent, in practice, is a loop: a model receives context, selects an action, executes it, observes the result, and repeats until some terminal condition. That simple description conceals a wide range of unsolved engineering problems, from how to structure state and memory to when to involve a human and how to verify that the output is actually correct.

The most contested architectural question is whether to build single-agent or multi-agent systems. Research surveyed by [Ben Dickson at AlphaSignal](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) argues single-agent systems should be the default: multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x. Yet multi-agent designs keep appearing wherever parallelism or specialization matters. [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) orchestrates 100+ generative models to produce editable video projects end-to-end; [Mendral's CI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) ingests billions of log lines across 575K weekly jobs, traces flaky tests to root causes, and opens fix PRs automatically. Anthropic's own engineering blog describes a [GAN-inspired planner/generator/evaluator triad](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) that overcomes self-evaluation bias during multi-hour autonomous coding sessions.

Verification is a recurring theme. [Christopher Meiklejohn's analysis of verification patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift, checking work in a different representation than it was produced, is the key variable for catching errors. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) goes further: reliable agents need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not elaborate prompt chains that collapse under complexity. The 12-factor-agents project reinforces this with [Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which recommends unifying execution state and business state into a single context-window-derived thread to simplify serialization, debugging, and recovery.

Memory deserves separate treatment. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures, world facts, experiences, and mental models, so agents improve over time rather than resetting with each session. A complementary argument from [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) reframes the problem entirely: agent memory fails because systems store assertions rather than beliefs, missing provenance, confidence, and revision history. OpenAI's [internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) addresses the same pressure with layered context: schema metadata, human annotations, code enrichment, institutional docs, and self-improving memory over 600+ petabytes.

Context management shapes what agents can even attempt. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) uses tiered markdown files to give agents navigable knowledge bases without burning tokens; [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) identifies five harness subsystems, instructions, state, verification, scope, and session lifecycle, as the engineering layer that converts unreliable model output into dependable results.

At scale, governance becomes unavoidable. [Speakeasy's AI control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) describes the enterprise need for a unified layer handling identity, policy enforcement, tool routing, and observability across every agent. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses the narrower but concrete problem of credential injection, keeping API tokens encrypted on-device so agents can authenticate against external services without ever seeing raw secrets. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) targets evaluation and guardrail infrastructure, auto-generating training data and deploying custom judge models at sub-100ms latency.

Capability is advancing quickly. [Ethan Mollick's hands-on report with Claude Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) finds genuine multi-hour autonomous workflows becoming routine, with the human role shifting from doing to commissioning. [Simon Willison documents](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) the same model inventing elaborate browser automation techniques autonomously, then notes that the same resourcefulness makes unsandboxed agents genuinely dangerous. The safety concern is structural: sycophancy in underlying models causes delusional belief spiraling in users even under ideal Bayesian reasoning, [per Chandra et al.](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in), and neither removing hallucinations nor warning users fully prevents it.
