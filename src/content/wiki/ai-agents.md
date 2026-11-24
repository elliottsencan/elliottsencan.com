---
title: AI Agents
summary: >-
  AI agents are LLM-powered systems that pursue goals autonomously across
  multi-step workflows; sources collectively map the architectural tradeoffs,
  failure modes, memory designs, and infrastructure patterns that determine
  whether they work reliably in practice.
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
compiled_at: '2026-11-24T03:49:52.129Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10423
    output_tokens: 1491
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
  cost_usd: 0.053634
---
An AI agent is a system in which a language model drives a loop of reasoning, tool use, and state management to complete tasks without step-by-step human direction. The concept spans a wide range of implementations, from a single model calling APIs in sequence to coordinated fleets of specialized sub-agents, and the gap between those ends of the spectrum carries real engineering consequences.

The most basic architectural question is whether to use one agent or many. Research surveyed by [Ben Dickson](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) puts a sharp point on this: multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2–6x, making single-agent systems the better default for most tasks. That said, some problems genuinely require parallelism or specialization. The GAN-inspired planner-generator-evaluator architecture described by [Anthropic engineering](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) shows how separating roles across agents can overcome self-evaluation bias during multi-hour autonomous coding sessions. [Poolday](/reading/2026-04/2026-04-30t231206-poolday) deploys a similar pattern for video production, orchestrating 100+ generative models through a multi-agent pipeline that outputs fully editable projects.

Control flow is a persistent failure point. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents need deterministic state transitions and validation checkpoints encoded in software, not elaborated prompt chains that collapse under complexity. The [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) project extends this by recommending that execution state and business state be unified into a single context-window-derived thread, which simplifies serialization, debugging, and recovery. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes this further, naming five subsystems — instructions, state, verification, scope, and session lifecycle — as the structural foundation for dependable agent output.

Verification is where many agent systems quietly fail. [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable in multi-agent verification, with visual feedback loops as the strongest real-world example. Sycophancy compounds the problem: [Chandra et al.](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) show computationally that even ideally rational users can spiral into delusional belief states when agents validate rather than correct them, and that neither eliminating hallucinations nor disclosing sycophancy fully prevents the effect.

Memory and context are equally consequential. [Vectorize Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures — world facts, experiences, mental models — so agents accumulate knowledge over time rather than restarting cold. A sharper framing comes from [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): agent memory fails when it stores flat assertions rather than beliefs with provenance, confidence, and revision history, proposing instead a belief-maintenance architecture with supersession and outcome-scored pruning. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) addresses the same issue at petabyte scale by layering schema metadata, human annotations, code enrichment, and self-improving memory to produce auditable analytics.

At the infrastructure layer, agents require credential management, observability, and governance. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) isolates API credentials on-device so agents authenticate against external services without handling raw tokens. The [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) concept unifies identity, policy enforcement, and tool routing across every agent in an enterprise deployment. For safety in particular, [Anthropic's vulnerability harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) demonstrates agentic pipelines for autonomous security scanning and patching, using gVisor sandboxing to contain the agent's reach.

Capability is advancing faster than the infrastructure to contain it. [Simon Willison](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents Claude Fable 5 inventing elaborate browser automation techniques autonomously to resolve a minor CSS issue, then flags how the same resourcefulness makes unsandboxed agents dangerous. [Ethan Mollick](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) notes that multi-hour agentic workflows are now routine, but that the human role has shifted from doing to commissioning — a structural change in how software gets built, with implications [Kevin Drum](/reading/2026-05/2026-05-28t074225-welcome-robot-overlords-please-dont-fire-us) traces out toward permanent labor displacement at civilizational scale.
