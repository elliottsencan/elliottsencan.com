---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, managing,
  and persisting the information a language model receives — treating the
  context window as a first-class engineering concern rather than an incidental
  input.
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
compiled_at: '2026-06-20T12:47:31.329Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8285
    output_tokens: 1316
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
  cost_usd: 0.044595
---
Context engineering is the practice of deliberately constructing, managing, and persisting the information a language model receives — treating the context window as a first-class engineering concern rather than an incidental input.

The foundational insight across most of the sources here is that model capability is rarely the binding constraint. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues the real bottleneck is organizational: shared context, specification clarity, and coherent management. Agents amplify whatever alignment or misalignment an organization already has baked in. A similar framing appears in Anthropic's agentic analytics stack, where 95% accuracy on business queries came not from a better model but from canonical datasets, a semantic layer, and curated skill docs that route Claude to governed sources rather than letting it freely search a warehouse [Anthropic blog](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with).

At the retrieval layer, several projects challenge the default assumption that vector similarity is the right mechanism. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes from long documents and uses LLM reasoning for retrieval rather than embeddings, claiming 98.7% accuracy on FinanceBench. The Karpathy LLM-wiki pattern takes a different approach: the model itself compiles and maintains structured Markdown files, enabling cross-document synthesis at query time without a retrieval step at all — though a developer who actually built it [found](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) that hallucinations baked in at ingest propagate structurally, making a lint step non-negotiable. [zerostack's memory system](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) takes a similar minimalist stance: plain Markdown on disk, regex retrieval, auto-injected XML context blocks, no vector store.

Persistence across sessions is a recurring concern. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists coding session context in a .story/ directory of JSON files. The LostWarrior knowledge-base CLI [organizes project context](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) as tiered Markdown with a machine-readable manifest so agents navigate without burning excess tokens. Anthropic's long-running agent harness [solves the same problem](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) structurally: an initializer scaffolds a feature list, git repo, and progress file so a coding agent can resume coherently across many context windows.

On the architecture side, the 12-factor-agents project [argues](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) that execution state and business state should be unified into a single context-window-derived thread, simplifying serialization, debugging, and recovery. Anthropic's Managed Agents service [extends this](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) by decoupling the agent harness, session log, and sandbox into swappable interfaces, cutting p50 time-to-first-token by ~60%.

Efficiency pressures run through the infrastructure layer too. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared asset rather than a recomputed artifact can reduce prefill costs by up to 20x. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code to produce multi-resolution structural views that deliver precise context without language-specific parsers. Recursive Language Models, as described by [dbreunig](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms), keep data in a REPL environment and let the model pull selectively into token space, addressing context rot without expanding the window.

The memory dimension is not purely a storage problem. [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that agent memory systems fail because they store assertions without provenance, confidence, or revision history — proposing a belief-maintenance architecture with supersession and outcome-scored pruning instead. The [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) project operationalizes context construction itself as an optimization target, running a propose-score-Pareto loop to tune memory, retrieval, and prompt templates around a fixed model.
