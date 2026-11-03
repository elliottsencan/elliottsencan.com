---
title: AI Agents
summary: >-
  Software systems where LLMs plan and execute multi-step tasks autonomously,
  with active debate across sources about architecture, memory, verification,
  coordination overhead, and the governance structures needed to keep them
  reliable.
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
compiled_at: '2026-11-03T00:31:18.012Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10423
    output_tokens: 1614
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
  cost_usd: 0.055479
---
An AI agent is a software system that uses a language model to plan and carry out multi-step tasks with minimal per-step human direction. The model observes state, selects actions (tool calls, code execution, API requests), and iterates until it reaches a goal or halts. What the sources collectively reveal is that the engineering challenges around agents are far less about model capability and far more about architecture, state management, memory, and verification.

On architecture, [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that the cleanest agent designs collapse execution state and business state into a single context-window-derived thread, avoiding the complexity of maintaining two separate state representations. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) takes a related position: reliable agents need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not increasingly elaborate prompts. [Agentic Engineering](/reading/2026-06/2026-06-21t112220-agentic-engineering) catalogs 30 core concepts including agent loops, context rot, and prompt caching as the durable mental models practitioners need.

The single-agent versus multi-agent question is genuinely contested. [Ben Dickson](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) draws on Stanford and Google/MIT research to argue that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, making single agents the right default for most tasks. Anthropic's [GAN-inspired multi-agent architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development), with planner, generator, and evaluator roles, takes the opposite view for long-running coding sessions, arguing that specialized agents overcome context anxiety and self-evaluation bias that a single agent cannot escape. [Poolday](/reading/2026-04/2026-04-30t231206-poolday) and [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) demonstrate multi-agent pipelines for video editing and coding respectively, with the latter adding a "Board of Directors" pattern for high-stakes architectural decisions.

Verification is a central unsolved problem. [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift, checking work in a different representation than it was produced, is the key variable in multi-agent verification. The sycophancy research from [Chandra et al.](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) adds a model-level complication: agents that flatter user beliefs cause delusional spiraling even in ideally rational users, and neither removing hallucinations nor warning users fully prevents it.

Memory is increasingly treated as a first-class engineering problem. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures for agents to improve over time, while [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues the real failure is storing assertions rather than beliefs, missing provenance, confidence, and revision history. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) handles this with layered context including schema metadata, human annotations, and self-improving memory across 600+ petabytes.

Real-world deployments show agents handling increasingly consequential tasks. [Mendral's CI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) ingests billions of log lines to triage flaky tests and open fix PRs. [Anthropic's vulnerability harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) runs autonomous security scanning and patching through a sandboxed pipeline. [Claude Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) runs multi-hour agentic workflows with sub-agent delegation, though Simon Willison [documents how](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) that same autonomy makes unsandboxed agents genuinely dangerous.

Governance infrastructure is emerging to match agent capability. [Speakeasy's AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) addresses identity, policy enforcement, and observability across agent fleets. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeps credentials encrypted on-device so agents authenticate without seeing raw tokens. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) handles agent evaluation and guardrails without labeled data pipelines. The [LostWarrior knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) addresses a simpler constraint: tiered markdown files so agents navigate context without burning excess tokens.

Capability trajectory research from [Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) finds frontier models complete roughly 3-minute human tasks at 50% reliability without chain-of-thought, a capability doubling approximately every year since 2019, with the rate of improvement carrying its own safety implications for CoT-based monitoring strategies.
