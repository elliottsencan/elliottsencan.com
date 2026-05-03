---
title: Retrieval-augmented generation
summary: >-
  RAG grounds LLM outputs by fetching relevant context at query time, but
  curated pre-compiled knowledge bases are emerging as a competitive alternative
  for structured, high-recall research tasks.
sources:
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
compiled_at: '2026-05-03T19:08:31.169Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 1969
    output_tokens: 558
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
  cost_usd: 0.014277
---
Retrieval-augmented generation couples a language model with a retrieval step: at query time, relevant documents or passages are fetched from an index and injected into the prompt as grounding context. The approach addresses the fact that models cannot hold all relevant information in weights, and it keeps knowledge updatable without retraining.

The multimodal frontier has extended RAG to images, video, and interleaved documents. [Vision Language Models (2025)](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger) notes that multimodal RAG is now an active subfield, pairing VLMs with retrieval pipelines that index visual as well as textual content. This matters because much real-world knowledge is encoded in figures, diagrams, and video frames that a text-only index would miss.

A different line of work questions whether runtime retrieval is always the right architecture. Andrej Karpathy's LLM-compiled wiki pattern pre-processes a document corpus into structured Markdown files during an ingest phase, so that queries are answered from a maintained knowledge base rather than by live retrieval. [The practical Reddit walkthrough](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) describes this as querying at scale without RAG, emphasizing that the model synthesizes across documents once rather than repeatedly.

[A developer who built the pattern end-to-end](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) found that cross-document synthesis is genuinely stronger than RAG for curated research, because the model reasons over a coherent compiled structure rather than a ranked list of retrieved chunks. The tradeoff is error propagation: hallucinations baked in at ingest become structural, distributed across the compiled files, which makes a lint or health-check step non-negotiable. RAG, by contrast, surfaces source documents directly, so errors stay localized and auditable. Neither architecture is strictly dominant; the choice depends on how stable the corpus is and how much curation effort is sustainable.
