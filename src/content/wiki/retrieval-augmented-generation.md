---
title: Retrieval-augmented generation
summary: >-
  RAG grounds LLM outputs in external knowledge at query time; sources here push
  its boundaries through vectorless indexing, multimodal retrieval, KV-cache
  acceleration, and comparisons with full-document synthesis alternatives.
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
compiled_at: '2026-06-22T02:40:22.155Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4539
    output_tokens: 859
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
  cost_usd: 0.026502
---
Retrieval-augmented generation pairs a language model with a retrieval step that fetches relevant context from an external corpus before generation, keeping outputs grounded without baking knowledge into weights. The pattern is now standard enough that it appears as a baseline across radically different projects.

The most direct challenge to conventional vector-search RAG comes from [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex), which replaces embedding similarity with a hierarchical tree index over long documents and uses LLM reasoning to navigate that index. The result is 98.7% accuracy on FinanceBench, a benchmark where standard RAG struggles with multi-hop financial questions. The implication is that vector similarity is one retrieval mechanism, not the only one.

A parallel critique surfaces in the Karpathy LLM Wiki pattern. [The honest-takeaways post](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) argues that for curated research, pre-compiled cross-document synthesis genuinely outperforms RAG, because the synthesis happens at ingest rather than at query time. The tradeoff is structural: hallucinations baked in during compilation propagate quietly, making lint and health-check passes non-negotiable. [The implementation guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) frames this explicitly as a RAG alternative rather than an improvement.

On the infrastructure side, two Everpure posts address RAG's latency and cost profile. [Granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are processed, cutting time-to-first-token for RAG workloads. [KV cache persistence on S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) extends this by persisting attention states across sessions, delivering up to 20x faster inference. Both treat RAG pipelines as a primary beneficiary of caching improvements.

Token pressure is another constraint. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses RAG chunks before they reach the model, reporting 60-95% token reduction without quality loss, which extends effective context for retrieval-heavy workloads.

Multimodal retrieval gets a mention in [the 2025 VLM survey](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger), which treats multimodal RAG as a distinct capability tier for vision-language models operating over mixed image-text corpora.

OpenAI's internal data agent [uses layered context](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) including schema metadata, annotations, and institutional docs to query 600+ petabytes, showing how RAG scales in enterprise settings when paired with self-improving memory and code enrichment.
