---
title: LLM orchestration
summary: >-
  LLM orchestration covers the architectures, harnesses, and control structures
  that coordinate one or more language models across multi-step tasks, and
  recent sources converge on moving that coordination out of prompts and into
  explicit software structure.
sources:
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - >-
    2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - 2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors
  - 2026-05/2026-05-18t222802-raellioctowiz
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - 2026-06/2026-06-14t094245-agentswarms
compiled_at: '2026-06-20T12:43:04.311Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4825
    output_tokens: 1037
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
  cost_usd: 0.03003
---
Orchestration in the LLM context means the layer that decides what a model does next, what tools it can reach, what state it carries between steps, and how failure is handled. The sources here trace an arc from early proofs-of-concept to production-grade design principles.

The 2023 wave of multi-agent research, covered in [Meiklejohn's Wave 1 survey](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), established that agents could coordinate at all. Systems like CAMEL, ChatDev, MetaGPT, and AutoGen each tried different coordination patterns, but shared failure modes: no concurrency control, no escalation paths, brittle message-passing. These were demonstrations, not production harnesses.

The reliability turn pushed orchestration toward deterministic structure. [Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues directly that complex agents need explicit state transitions and validation checkpoints encoded in software, not prompt chains. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows the same lesson through iteration: a rigid state machine gave way to an orchestrator, then to a single general-purpose agent, with environmental constraints on tool design and context visibility doing more work than any prompt.

Anthropics engineering posts formalize this into harness design. The [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable swappable interfaces so the orchestration layer can evolve as models improve. The [long-running harness post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent split, initializer plus incremental coder, with a persistent progress file bridging context windows. The [GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) addresses context anxiety and self-evaluation bias specifically.

At scale, orchestration becomes a parallelism problem. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let Claude write orchestration scripts that spawn hundreds of parallel subagents for tasks like codebase migrations. The [orchestrator-supaconductor plugin](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) demonstrates a similar pattern, turning a single natural-language command into a full pipeline with a virtual board of directors for high-stakes decisions.

Coordination structure between agents is its own sub-problem. [Meiklejohn's debate and coordination survey](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) covers convergent debate, adversarial debate, and shared-notebook state, arguing that coordination must match task structure and that distributed systems theory offers formalisms the field has not yet used.

The governance question surfaces at the enterprise layer. [Speakeasy's AI control plane overview](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames orchestration as a policy and identity problem: who routes which agent to which tool, with what observability. Meanwhile [Aiyan's strategy piece](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that the orchestration loop itself is not defensible, and teams should let frontier agents like Claude handle it while investing in domain-specific tool servers and APIs instead.
