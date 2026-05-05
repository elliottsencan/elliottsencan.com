---
title: Retrieval-augmented generation
summary: >-
  RAG grounds LLM outputs in external documents at query time, but its
  limitations around cross-document synthesis have pushed practitioners toward
  alternatives like compiled knowledge bases that pre-synthesize information
  into structured, queryable Markdown.
sources:
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
compiled_at: '2026-05-04T03:38:56.661Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3029
    output_tokens: 534
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
  cost_usd: 0.017097
---
Retrieval-augmented generation (RAG) is the practice of embedding a query, retrieving semantically similar document chunks from a vector store, and supplying those chunks as context to an LLM before generation. The approach keeps a model's factual grounding updatable without retraining, and it scales reasonably well to large document collections. It has become standard enough that multimodal variants now exist: [the 2025 VLM landscape overview](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger) notes multimodal RAG as one of the notable developments in the vision-language model space, where retrieved content can include images and video alongside text.

Despite its prevalence, RAG has a structural weakness: it retrieves fragments, not synthesized understanding. For curated research corpora where relationships across many documents matter, per-query chunk retrieval often misses the connections between sources. [A developer who built Karpathy's LLM Wiki end-to-end](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) found that pre-synthesized knowledge bases outperform RAG for this use case precisely because cross-document synthesis happens at ingest time rather than at query time. The tradeoff is unforgiving: hallucinations introduced during ingest are baked structurally into every downstream answer, which makes lint and validation steps non-negotiable.

[The practical walkthrough of Karpathy's pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) describes an alternative architecture where the LLM builds and maintains structured Markdown files from raw documents, enabling direct querying at scale without a retrieval step at all. That approach trades RAG's freshness and modularity for synthesis quality, and it only works when the input corpus is curated enough that ingest-time errors can be caught and corrected.
