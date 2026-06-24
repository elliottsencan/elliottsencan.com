---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing,
  compressing, routing, and persisting what enters an LLM's context window,
  treating that window as an engineering surface rather than a passive
  receptacle.
sources:
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - 2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code
  - 2026-05/2026-05-06t171355-vectifyaipageindex
  - 2026-05/2026-05-11t155625-storybloqstorybloq
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - 2026-05/2026-05-18t222802-raellioctowiz
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching
  - >-
    2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - 2026-06/2026-06-04t194244-inside-openais-in-house-data-agent
  - >-
    2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got
  - >-
    2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with
  - 2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison
  - 2026-06/2026-06-11t023157-memory-design-zerostack
  - >-
    2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store
  - >-
    2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - 2026-06/2026-06-20t145835-chopratejasheadroom
  - 2026-06/2026-06-21t112220-agentic-engineering
  - >-
    2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk
compiled_at: '2026-06-24T06:29:22.790Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1066
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
  cost_usd: 0.042363
---
The phrase "context engineering" names a practice that has emerged from hard experience building agent systems: model quality matters less than what the model actually sees. Every source in this cluster treats the context window not as a byproduct of prompting but as the primary engineering artifact to be designed, managed, and optimized.

The most foundational articulation comes from [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should be unified into a single context-window-derived thread. The context window becomes the source of truth: serializable, debuggable, forkable, and recoverable from any point. This framing turns context from ephemeral scratch space into a structured, stateful record.

Construction is only half the problem. Once context is treated as a first-class asset, teams must decide what to keep out of it. [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction without quality loss. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code so an LLM receives a multi-resolution structural view rather than a raw file dump. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity search with hierarchical tree indexes and LLM reasoning, achieving near-perfect accuracy on financial benchmarks without embedding pipelines.

Persistence across sessions is a recurring pressure point. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) serializes AI coding session state into a `.story/` directory so context compounds across stateless assistant invocations. Anthropic's [effective harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) article describes an initializer agent that scaffolds a feature list and progress file before handing off to an incremental coding agent, a pattern that preserves coherent state across many context windows. The [zerostack memory design](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) reaches a similar conclusion with minimal infrastructure: plain Markdown files and regex retrieval outperform vector stores when the constraint is low RAM and provider neutrality.

Memory architecture choices are not neutral. [Jakedismo's belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that most agent memory systems fail because they store assertions without provenance, confidence, or revision history. Storing what happened is easier than storing whether that record is still true.

At scale, context engineering becomes infrastructure. [Anthropic's Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces, cutting time-to-first-token by ~60% while enabling multi-brain architectures. KV cache management is the cost lever underneath this: [treating the KV cache as a shared data asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) injected via fast storage can reduce prefill costs by up to 20x.

Organizational context is not separate from technical context. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) makes the case that coding agents amplify whatever specification clarity and management coherence already exist; the bottleneck was always shared context, not code generation. Context engineering in this view extends beyond the prompt and into how teams document decisions, structure knowledge, and maintain alignment across contributors.
