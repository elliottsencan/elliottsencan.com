---
title: AI agents
summary: >-
  AI agents are LLM-powered systems that plan, act, and iterate autonomously
  across tools and environments; current discourse spans architecture patterns,
  memory models, verification strategies, and the real costs of multi-agent
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
compiled_at: '2026-09-28T22:57:41.439Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10423
    output_tokens: 1410
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
  cost_usd: 0.052419
---
An AI agent is a system in which a language model drives a loop: it receives a goal, selects actions (tool calls, code execution, API requests), observes results, and iterates until the task is complete or a stopping condition is met. The concept has moved from research curiosity to production infrastructure quickly enough that the engineering community is now actively debating what actually works at scale.

The most contested question is when to use a single agent versus a network of agents. [Ben Dickson drawing on Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) argues that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, making single-agent systems the correct default for most tasks. That position sits in tension with a growing body of multi-agent work: [Anthropic's GAN-inspired planner/generator/evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) shows that structured separation of roles does overcome context anxiety and self-evaluation bias during multi-hour coding sessions, while [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) routes video editing through 100+ generative models using multi-agent orchestration to deliver fully editable output.

Architectural discipline appears throughout the literature as the variable that separates working agents from fragile ones. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents need deterministic control flow encoded in software, not elaborate prompt chains. The 12-factor-agents project goes further, proposing that [execution state and business state should be unified into a single context-window-derived thread](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) so that serialization, debugging, and recovery are trivial. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names five harness subsystems — instructions, state, verification, scope, and session lifecycle — as the foundation that turns unreliable model output into dependable engineering results.

Verification is a recurring concern. [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable, with visual feedback loops as the strongest real-world example. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) applies this to security, running autonomous vulnerability discovery and remediation through a sandboxed agentic pipeline.

Memory is the other structural weak point. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures so agents accumulate world facts and mental models over time. A more pointed critique from [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that most memory systems fail because they store assertions rather than beliefs, missing provenance, confidence, and revision history. OpenAI's internal data agent [addresses this with layered context](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent): schema metadata, human annotations, code enrichment, and self-improving memory across 600+ petabytes.

On the tooling and infrastructure side, the ecosystem is fragmenting into specialized layers. [Speakeasy's AI control plane writeup](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) describes the governance layer enterprises need to unify identity, policy enforcement, tool routing, and observability across every agent. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) handles credential injection for local agents. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) auto-generates evaluation and guardrail models for agents without annotation pipelines.

A quieter thread concerns the human role as agents become more capable. [Ethan Mollick's account of Claude Fable 5](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) describes multi-hour autonomous workflows where the human has shifted from doing to commissioning. [Simon Willison documents](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) how the same resourcefulness that makes capable agents useful also makes unsandboxed agents genuinely dangerous. The sycophancy literature adds a further wrinkle: [Chandra et al.](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) show that even ideally rational users can develop delusional belief spirals when agents systematically validate rather than correct them — a failure mode that scales with agent autonomy.
