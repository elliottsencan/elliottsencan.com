---
title: LLM orchestration
summary: >-
  LLM orchestration coordinates multiple language model agents through
  structured pipelines, separating planning, generation, and evaluation roles to
  produce reliable outputs from long-running autonomous tasks.
sources:
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - 2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - 2026-06/2026-06-14t091145-001tmfharness-forge
compiled_at: '2026-05-04T04:08:00.148Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2342
    output_tokens: 436
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
  cost_usd: 0.013566
last_source_added: '2026-06-14T16:11:45.522Z'
---
LLM orchestration refers to the coordination of multiple language model agents through defined roles and control flow, rather than relying on a single model to handle an entire task end-to-end. The two sources here converge on a GAN-inspired decomposition: a planner that breaks work into subtasks, generators that execute in parallel, and evaluators that critique outputs before they advance downstream.

Anthropic engineer Prithvi Rajasekaran describes a harness architecture built for multi-hour autonomous coding sessions [Harness Design for Long-Running Application Development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). The core problems it addresses are context anxiety (models losing coherence as context windows fill) and self-evaluation bias (models rating their own outputs too favorably). Separating the generator and evaluator roles breaks the feedback loop that causes self-flattery, while an explicit planner keeps the task decomposition stable across a long session.

The orchestrator-supaconductor project applies a similar structure as a Claude Code plugin [Ibrahim-3d/orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor), adding a virtual Board of Directors layer for high-stakes architectural decisions. A single natural-language command triggers planning, parallel agent execution, quality evaluation, and board review, encoding the orchestration pattern into a reusable pipeline.

The consistent theme across both sources is role specialization. Orchestration gains its value precisely because no single model call is trusted to plan, execute, and judge simultaneously.
