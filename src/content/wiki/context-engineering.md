---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing,
  structuring, compressing, and persisting what an LLM sees in its context
  window — recognized across agent frameworks, retrieval systems, and memory
  architectures as the primary lever on agent quality.
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
compiled_at: '2026-08-10T18:57:21.674Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8962
    output_tokens: 1539
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
  cost_usd: 0.049971
---
Context engineering names the practice of deliberately shaping what goes into a model's context window: what information appears, in what form, at what granularity, and how it persists across turns and sessions. The term reflects a shift from prompt engineering as a one-shot craft toward a systems discipline that spans retrieval, memory, state management, compression, and harness design.

The clearest statement of the stakes comes from [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code): code generation is cheap; the bottleneck is shared context and specification clarity. Agents amplify whatever alignment or misalignment already exists in how work is understood. That framing treats context not as an input detail but as the primary engineering variable.

On the retrieval side, the Karpathy LLM-wiki pattern — discussed in [a practical Reddit walkthrough](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and critically evaluated in [a hands-on build report](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) — trades RAG's fragmented chunk retrieval for model-maintained structured Markdown files. Cross-document synthesis quality improves, but hallucinations baked in at ingest propagate structurally, making lint steps non-negotiable. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) takes a different route: hierarchical tree indexes over long documents, using LLM reasoning rather than vector similarity, reaching 98.7% accuracy on FinanceBench. Both approaches treat retrieval as a context construction problem, not a search problem.

State continuity is the other half. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should be unified into a single context-window-derived thread — simplifying serialization, debugging, and recovery by making the context window the single source of truth. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) implements this at the session level: a `.story/` directory of JSON files that persists AI coding context across sessions, turning stateless assistants into compounding collaborators. [Anthropic's long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses an initializer agent that scaffolds a feature list and progress file so that incremental agents can pick up state across context windows without loss.

Compression is a live tension in the field. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% token reduction by compressing tool outputs and RAG chunks before they reach the model. [Przemek Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) counters that compression tools can produce vanity metrics — stripping output without task-accuracy benchmarks risks silent data loss in agent pipelines. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a principled approach: wavelet transforms on source code produce multi-resolution structural views that are token-efficient without discarding semantics. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) addresses the infrastructure layer, treating the cached key-value computation as a persistent shared asset rather than recomputing it per request.

Memory architecture is increasingly treated as belief maintenance rather than storage. [Jakedismo's gist](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that systems fail by storing bare assertions without provenance, confidence, or revision history, and proposes JSONL-based belief structures with supersession and outcome-scored pruning. The [zerostack memory design](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) reaches a pragmatic opposite conclusion: plain Markdown files with regex retrieval outperform vector stores given constraints of minimal RAM and provider neutrality.

[Anthropic's agentic analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) illustrates context engineering at the organizational scale: canonical datasets, a semantic layer, and curated skill docs route Claude to governed data rather than open warehouse search, achieving 95% accuracy on 95% of queries. [Genloop's critique](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes that replicating those results requires months of senior data engineering work that most organizations cannot front-load. The accuracy number depends on the context scaffolding, not the model alone.

[harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) makes the optimization loop explicit: a propose-score-Pareto cycle that treats memory, retrieval, context construction, and prompt templates as tunable variables around a fixed model. [humanlayer's advanced context engineering writeup](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) offers the sharpest bound on what context engineering can achieve: harness work cannot compensate for a model's inability to maintain codebase quality over time, because that is a training problem. Context engineering is powerful but not unbounded.
