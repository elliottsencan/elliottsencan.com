---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing what an LLM
  receives in its context window — structuring, compressing, persisting, and
  retrieving information so agents produce reliable output across tasks and
  sessions.
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
compiled_at: '2026-07-09T23:18:51.770Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1446
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
  cost_usd: 0.048063
---
Context engineering names the discipline of deciding what goes into an LLM's context window, how it is structured, when it arrives, and what gets discarded. As AI agents move from single-turn assistants to long-running systems, the quality of that window increasingly determines whether the system works or not.

The phrase captures a shift in where the hard problems live. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that code generation is no longer the bottleneck: the real constraints are specification clarity and shared organizational context, and agents amplify whatever alignment or misalignment already exists. Context engineering is what turns that observation into a practice.

At the structural level, several sources treat the context window itself as a state container. The 12-factor-agents project [Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should both be inferred from a single context-window-derived thread, making the system trivially serializable, debuggable, and resumable. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) service externalizes the session log as a stable interface so the harness and sandbox can evolve independently. Their [long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses a progress file and feature list to maintain coherent state across many context windows without drift.

Memory design is a recurring sub-problem. The zerostack agent [uses plain Markdown files](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) with regex retrieval rather than vector stores, a deliberate choice driven by RAM constraints and provider neutrality. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across Claude Code sessions via a `.story/` directory of JSON files. A more principled critique from [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) reframes memory as a belief-maintenance problem: systems that store assertions without provenance, confidence, or revision history propagate stale information into later context windows.

Retrieval is the other axis. The Karpathy LLM-wiki pattern, documented in two Reddit threads, builds curated Markdown knowledge bases that an LLM queries holistically. [One builder](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) reports that cross-document synthesis is genuinely superior to RAG for curated research, but that hallucinations baked in at ingest propagate structurally, making a lint step non-negotiable. [VectifyAI's PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) takes a different angle, replacing vector similarity with LLM reasoning over hierarchical tree indexes, achieving 98.7% accuracy on FinanceBench. Recursive Language Models [as described by dbreunig](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) address context rot by keeping data in a REPL and letting the model pull selectively into token space.

Compression matters when context is scarce or expensive. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. KV caching [treated as a persistent data asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can reduce prefill costs by up to 20x. A skeptical counterpoint from [Przemek Mroczek](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) warns that compression tools advertising 60-90% savings are often measuring vanity metrics rather than task accuracy, and that silent data loss in agent pipelines is a real risk.

At the tooling layer, [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) generates multi-resolution structural views of source code via wavelet transforms, providing token-efficient context without language-specific parsers. OpenAI's [internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) stacks schema metadata, human annotations, code enrichment, and self-improving memory to query 600+ petabytes accurately. Anthropic's [analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) achieves 95% accuracy through canonical datasets and curated skill docs; a [critique from Genloop](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes that replicating that accuracy requires months of senior data engineering most organizations cannot afford, which is itself an argument for treating context construction as a first-class engineering investment.
