---
title: Retrieval-augmented generation
summary: >-
  RAG grounds LLM outputs in external knowledge at inference time; recent work
  questions when vector similarity retrieval is the right tool and what
  alternatives — hierarchical indexing, KV caching, compiled wikis — better
  serve different workloads.
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
compiled_at: '2026-06-22T07:25:47.879Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4539
    output_tokens: 870
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
  cost_usd: 0.026667
---
Retrieval-augmented generation pairs a language model with a retrieval step that pulls relevant context from an external corpus before generation. The basic pattern is well-established, but several sources here push on its assumptions and identify cases where it underperforms or can be replaced.

The most direct challenge comes from [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex), which replaces vector similarity search with hierarchical tree indexes over long documents, using LLM reasoning to navigate the index rather than embedding distance. On FinanceBench it reaches 98.7% accuracy. The authors frame this as "vectorless RAG" — retrieval without the retrieval bottleneck that comes from chunking documents into semantically lossy fragments.

A complementary critique appears in the Karpathy LLM Wiki threads. [One Reddit implementation](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) found that for curated research, having the model synthesize documents into structured Markdown at ingest time produces better cross-document reasoning than querying a vector store at runtime. The [accompanying how-to](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) notes this approach avoids RAG entirely at query time, at the cost of hallucinations baked in structurally if the ingest step is not linted.

On the infrastructure side, RAG workloads are a primary driver of KV cache optimization. [Pure KVA's granular prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are reprocessed, cutting time-to-first-token and GPU cost for repeated RAG queries. [The companion post](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) reports up to 20x faster inference by persisting attention states across sessions on NFS and S3.

RAG also appears as a standard component in agentic pipelines. [AgentSwarms](/reading/2026-06/2026-06-14t094245-agentswarms) includes RAG alongside ReAct and multi-agent patterns as a foundational building block. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) uses layered context — schema metadata, annotations, institutional docs — that functions as a structured form of RAG over 600+ petabytes. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) addresses a downstream problem: RAG chunks inflating context windows, which it compresses by 60-95% before they reach the model.

The thread connecting these sources is that RAG is not a single technique but a design space. Vector similarity search, hierarchical indexing, compiled knowledge bases, and layered metadata retrieval are all answers to the same question — how to give a model the right information at the right time — and the best answer depends on document structure, query patterns, and latency constraints.
