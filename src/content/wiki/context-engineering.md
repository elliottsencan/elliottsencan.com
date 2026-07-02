---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing, managing,
  and compressing what goes into an LLM's context window — treating the window
  as a first-class engineering artifact rather than an incidental input.
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
compiled_at: '2026-07-02T12:25:35.554Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1231
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
  cost_usd: 0.044838
---
Context engineering treats the LLM context window as a primary engineering concern: what information enters it, in what form, at what cost, and how that information persists across turns or sessions. The term names a cluster of practices that have converged across agentic system design, retrieval, memory architecture, and inference optimization.

The most direct statement of the stakes comes from [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should be unified into a single context-window-derived thread. Keeping them unified eliminates a whole class of synchronization bugs and makes the thread trivially serializable, resumable, and forkable. [Agentic Engineering](/reading/2026-06/2026-06-21t112220-agentic-engineering) names "context rot" as one of the canonical failure modes engineers must design around: as a session grows, earlier information degrades in influence, and without active management the model's effective working memory shrinks.

Two broad strategies address the problem: retrieve less but better, or compress aggressively. On the retrieval side, [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes from long documents and uses LLM reasoning rather than vector similarity for context-aware retrieval, reaching 98.7% accuracy on FinanceBench. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) take this further, keeping data in a REPL environment and letting the LLM pull selectively into token space rather than stuffing the window upfront. On the compression side, [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) proxies tool outputs and RAG chunks through a compressor before they hit the model, reporting 60-95% token reduction. A dissenting note: [the RTK skepticism piece](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that compression tools often report vanity metrics and can introduce silent data loss in agent pipelines without task-accuracy benchmarks to justify the trade-off.

Session persistence is the temporal dimension of context engineering. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists AI coding session context across sessions via a `.story/` directory, turning stateless assistants into compounding collaborators. [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) does the same with plain Markdown files and auto-injected XML context blocks, deliberately avoiding vector stores to minimize infrastructure. [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) runs a propose-score loop to optimize the full scaffolding around a fixed model, treating memory layout and context construction as tunable parameters.

KV caching sits at the infrastructure layer of this stack. [Everpure Engineering](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) frames the KV cache as a persistent shared asset injected via RDMA rather than recomputed per request, claiming up to 20x prefill cost reduction. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) service separates the session log from the execution harness, cutting p50 time-to-first-token by roughly 60% in part by controlling what state flows across context boundaries.

The hardest problem is not construction but correctness. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) uses wavelet transforms to give LLMs multi-resolution structural views of source code without language-specific parsers. But [the Karpathy LLM wiki post-mortem](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) reports that hallucinations baked in at ingest propagate structurally through the knowledge base, making the lint step non-negotiable. [Jakedismo's belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) generalizes this: agent memory systems fail when they store assertions without provenance, confidence, or revision history. Context engineering, on this view, is less about storage and more about epistemic hygiene under uncertainty.
