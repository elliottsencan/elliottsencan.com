---
title: Retrieval-augmented generation
summary: >-
  RAG grounds LLM outputs in external documents at query time; sources here span
  vector-based, vectorless, and hybrid approaches, alongside caching strategies
  and architectural critiques that complicate the standard pipeline.
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
compiled_at: '2026-06-20T22:14:23.465Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4539
    output_tokens: 787
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
  cost_usd: 0.025422
---
Retrieval-augmented generation connects a language model to external knowledge by fetching relevant content at inference time and including it in the prompt. The standard picture involves embedding documents into a vector store, retrieving the closest matches to a query, and appending those chunks to the context. Several sources here push against or extend that baseline in interesting ways.

[PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) drops vector similarity entirely, replacing it with hierarchical tree indexes over long documents and LLM reasoning to identify relevant sections. On FinanceBench it hits 98.7% accuracy, which its authors present as evidence that vector retrieval is not the only path to precise grounding.

Karpathy's LLM-wiki pattern, documented across two Reddit threads ([implementation guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and [honest takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways)), sidesteps RAG at query time altogether by pre-compiling knowledge into structured Markdown files that the model reads directly. The tradeoff is sharp: cross-document synthesis is genuinely better than chunk retrieval for curated research, but hallucinations baked in at ingest propagate structurally rather than appearing as isolated query-time errors, making a lint or health-check step mandatory.

On the infrastructure side, RAG workloads are a primary beneficiary of KV-cache advances. Everpure's Pure KVA persists attention states across sessions on NFS and S3, delivering up to [20x faster inference](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs), and [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are reprocessed. Token compression is a complementary lever: [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses RAG chunks before they reach the model, reporting 60-95% token reduction without measurable quality loss.

OpenAI's internal data agent shows RAG operating at enterprise scale, layering schema metadata, human annotations, code enrichment, and institutional documents to let employees query [600+ petabytes across 70k datasets](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) in natural language. Multimodal RAG extends the same retrieval logic to images and video, noted as an emerging application area in the [2025 VLM survey](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger).
