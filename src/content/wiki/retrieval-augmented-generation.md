---
title: Retrieval-augmented generation
summary: >-
  RAG is the practice of grounding LLM outputs in retrieved context at inference
  time; recent work questions when vector similarity retrieval should be
  replaced or supplemented by structured indexing, curated wikis, or persistent
  memory.
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
compiled_at: '2026-06-18T23:04:00.939Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4579
    output_tokens: 938
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
  cost_usd: 0.027807
---
Retrieval-augmented generation sits at the intersection of two problems: LLMs have finite context and imperfect parametric memory, so systems retrieve relevant documents at query time and hand them to the model as context. Most implementations reach for vector similarity search, but several sources here argue that framing is too narrow.

[PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) removes vectors entirely, building hierarchical tree indexes over long documents and using LLM reasoning to navigate them. It reports 98.7% accuracy on FinanceBench, a benchmark where standard embedding-based RAG struggles with multi-step financial questions. The project is an existence proof that retrieval does not require embedding similarity — it requires good index structure and a model that can traverse it.

The Karpathy LLM Wiki pattern takes a different angle: pre-synthesize a curated knowledge base at ingest time so that query-time retrieval becomes unnecessary for well-scoped domains. [One practical implementation](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) describes ingesting raw documents and having the model maintain structured Markdown, while [a hands-on build report](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) confirms that cross-document synthesis quality exceeds typical RAG for curated research but introduces a new failure mode: hallucinations baked in at ingest propagate structurally through every downstream query.

On the infrastructure side, the cost of repeatedly encoding the same retrieved context is real. [Everpure's KV cache work](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are processed, and [their S3/NFS KV persistence layer](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) reports up to 20x faster inference by reusing attention states across sessions — both directly relevant to RAG pipelines that repeatedly present similar system prompts and retrieved chunks.

Multimodal RAG extends the pattern to images and video, a development covered in the [2025 VLM survey](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger). OpenAI's internal data agent applies layered context — schema metadata, annotations, institutional docs, and self-improving memory — rather than a single retrieval pass to query 600+ petabytes [across 70k datasets](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent).

The [AgentSwarms platform](/reading/2026-06/2026-06-14t094245-agentswarms) treats RAG as one component in multi-agent pipelines rather than a standalone technique, which is where most production use lands. The [AI memory systems comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) catalogues 74 systems across retrieval modes, and the [belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that retrieval alone fails agents because stored assertions carry no provenance or confidence — a critique that applies equally to RAG corpora that are never updated or audited.
