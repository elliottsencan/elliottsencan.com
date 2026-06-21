---
title: Retrieval-augmented generation
summary: >-
  RAG grounds LLM outputs in external documents at query time; recent work
  challenges whether vector similarity retrieval is the right mechanism, and how
  caching, memory, and alternative indexing strategies change the calculus.
sources:
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-06t171355-vectifyaipageindex
  - >-
    2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure
  - >-
    2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs
  - 2026-06/2026-06-04t194244-inside-openais-in-house-data-agent
  - 2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison
  - >-
    2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage
  - 2026-06/2026-06-14t094245-agentswarms
  - 2026-06/2026-06-20t145835-chopratejasheadroom
compiled_at: '2026-06-21T20:21:20.188Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4539
    output_tokens: 997
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
  cost_usd: 0.028572
---
Retrieval-augmented generation connects an LLM to a document corpus so it can answer questions using content outside its training weights. The standard implementation embeds documents into vectors, retrieves the closest matches to a query, and stuffs them into the prompt as context. Several sources here push back on parts of that pipeline.

[PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity entirely with a hierarchical tree index built from long documents, using LLM reasoning to navigate the tree during retrieval. On FinanceBench it reaches 98.7% accuracy, suggesting that for structured, long-form documents the vector step is the weak link, not the context window.

The Karpathy LLM-wiki pattern goes further and removes retrieval altogether for curated corpora. Rather than querying at inference time, the model compiles documents into structured Markdown that fits in context. A practical build report confirms the tradeoff honestly: cross-document synthesis is genuinely better than RAG for research, but hallucinations baked in at ingest propagate structurally, making a lint or health-check pass non-negotiable [building-karpathys-llm-wiki-honest-takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways). The implementation guide treats the pattern as preferable to RAG precisely because it avoids retrieval latency and chunking artifacts [2026-04-30t232052](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base).

On the infrastructure side, RAG is explicitly named as a primary beneficiary of KV cache persistence. Everpure's KVA system reuses attention states across sessions on NFS and S3 storage, delivering up to 20x faster inference [20x-faster-inference](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs)], and their granular-prompt caching splits prompts into reusable chunks so only changed tokens are processed, cutting time-to-first-token for RAG workloads specifically [granular-prompt-caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure).

Context compression is another lever. The headroom library compresses RAG chunks before they reach the LLM, reporting 60-95% token reduction without quality loss [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). This matters most when retrieved chunks are verbose or redundant.

Multimodal RAG extends the pattern to images and video. The 2025 VLM survey notes that vision-language models now participate in multimodal retrieval pipelines, retrieving across image and text jointly [vlms-2025](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger).

OpenAI's internal data agent illustrates production-scale RAG: layered context including schema metadata, human annotations, code enrichment, and institutional docs powers natural-language queries across 600+ petabytes, with self-improving memory to handle coverage gaps [inside-openais-in-house-data-agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent). The belief-maintenance framing from agent memory research applies here too: storing raw retrieved assertions without provenance or confidence scores is a structural weakness regardless of retrieval mechanism [agent-memory-belief-maintenance](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage).
