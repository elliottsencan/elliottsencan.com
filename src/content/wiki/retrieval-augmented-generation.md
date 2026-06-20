---
title: Retrieval-augmented generation
summary: >-
  RAG connects LLMs to external knowledge at inference time, but newer
  approaches challenge vector-similarity retrieval with tree indexes, KV-cache
  persistence, and structured belief systems that change what retrieval even
  means.
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
compiled_at: '2026-06-20T12:49:34.492Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4409
    output_tokens: 960
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
  cost_usd: 0.027627
---
Retrieval-augmented generation is the practice of supplying an LLM with retrieved context at inference time rather than encoding all knowledge in model weights. The canonical form uses vector embeddings to find semantically similar chunks, but several active projects now argue that vector similarity is the wrong primitive for retrieval.

[PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces embedding lookup with a hierarchical tree index built from the document itself, then uses LLM reasoning to navigate that tree. On FinanceBench it reaches 98.7% accuracy, a result the authors attribute to context-awareness that flat vector search cannot provide. The gap is meaningful: vector retrieval finds locally similar text; tree traversal can respect document structure and section relationships.

A different challenge to standard RAG comes from the LLM-wiki pattern discussed in two Reddit threads. [One implementation report](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) found that compiling source documents into a curated, pre-synthesized knowledge base produces cross-document reasoning that RAG cannot easily replicate, because RAG retrieves fragments while the wiki bakes synthesis in at ingest. The tradeoff is fragility: hallucinations introduced during ingest propagate structurally, making a lint or health-check step non-negotiable. [The implementation guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) frames this as a deliberate alternative to RAG rather than an extension of it.

On the infrastructure side, two Everpure posts address RAG's compute cost. [Granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks via metadata pointers so only changed tokens are reprocessed, cutting time-to-first-token for RAG workloads. [KV-cache persistence on S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) extends this further by persisting attention states across sessions, delivering up to 20x faster inference without changing the model or deployment stack.

Multimodal RAG appears as a distinct capability in the [2025 VLM survey](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger), where vision-language models retrieve across image, video, and text jointly. OpenAI's internal data agent [uses layered context](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) including schema metadata, human annotations, and institutional docs to query 600-plus petabytes, which is RAG at enterprise scale with retrieval sources that go well beyond document corpora.

The memory-systems angle complicates the picture further. [Agent memory as belief maintenance](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that storing retrieved assertions without provenance or revision history causes agents to treat stale or wrong information as current fact. The [Hindsight memory system](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) addresses this with biomimetic memory structures that update over time. Both suggest that retrieval is not just a lookup problem but a belief-management one: what the system retrieves, and whether it trusts what it retrieved, are as important as retrieval accuracy.
