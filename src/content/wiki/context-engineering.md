---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing, managing,
  and compressing what an LLM sees in its context window — spanning memory
  architecture, retrieval strategy, state representation, and token economics —
  to make agent behavior reliable at scale.
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
  - >-
    2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents
compiled_at: '2026-08-11T05:14:22.502Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8962
    output_tokens: 1584
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
  cost_usd: 0.050646
---
Context engineering names the practice of controlling what information reaches a language model's context window, when, and in what form. It sits beneath prompt engineering in specificity and beneath model training in scope, but it is increasingly where agentic systems succeed or fail.

The most direct framing comes from [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should be unified into a single context-window-derived thread. The appeal is architectural simplicity: one source of truth, trivial serialization, easy recovery from any checkpoint, and observable history. The corollary, stated plainly, is that whatever you cannot put in the context window is a liability you must minimize.

Anthropics engineering work illustrates this at production scale. The [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) architecture separates the agent harness, session log, and sandbox into stable interfaces so that context construction can be iterated without breaking downstream clients. The [long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) takes a different angle: an initializer scaffolds a feature list and a progress file that the incremental agent reads on each new context window, preserving coherent state across what would otherwise be amnesiac restarts.

Persistence without a heavy backend is a recurring theme. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) writes session state to a `.story/` directory of JSON files, threading it back into each new session. [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) and its companion [design walkthrough](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) use plain Markdown on disk with auto-injected XML context blocks, arguing that minimal RAM and provider neutrality make vector stores a poor fit. The [LostWarrior knowledge-base CLI](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) organizes project context as tiered Markdown with both a human-readable index and a machine-readable manifest, letting agents navigate without burning excess tokens.

Retrieval architecture is contested. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with hierarchical tree indexes and LLM reasoning, reporting 98.7% accuracy on FinanceBench. The Karpathy LLM wiki pattern, covered in a [practical implementation guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and an [honest postmortem](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), skips retrieval entirely for curated research domains, having the model maintain structured Markdown files and query them wholesale. The postmortem notes a hard constraint: hallucinations baked in at ingest propagate structurally, making lint and health-check steps non-negotiable.

Token economics shape every context decision. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared asset can cut prefill costs by up to 20x. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code to produce multi-resolution structural views that are token-efficient without requiring language-specific parsers. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. A skeptical counterpoint from [Mroczek](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) warns that compression metrics are often vanity numbers that strip useful signal and lack task-accuracy validation.

Memory quality is not just a storage problem. [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that agent memory systems fail by storing assertions without provenance, confidence, or revision history, and proposes belief-maintenance architecture with supersession and outcome-scored pruning. The [sgup agent instructions](/reading/2026-06/2026-06-13t083401-sgupai-fable5md) operationalize this at the prompt level, distinguishing confirmed from inferred claims and mandating rollback discipline.

The organizational dimension is easy to overlook. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) observes that the real bottleneck for coding agents is shared context and specification clarity, not code generation speed. [Anthropic's analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) achieved 95% query accuracy by building canonical datasets and curated skill docs that route the model to governed sources. A critique from [Genloop](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes that this level of data engineering is inaccessible to most organizations, a reminder that context engineering is as much an institutional investment as a technical one. [HumanLayer's advanced context engineering notes](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) push further, arguing that no amount of harness engineering compensates for a model that cannot maintain codebase quality over time.
