---
title: Retrieval-augmented generation
summary: >-
  RAG couples LLMs with external document retrieval to ground responses in
  stored knowledge; sources here examine its tradeoffs, alternatives,
  infrastructure costs, and failure modes across search, agents, and memory
  systems.
sources:
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - 2026-05/2026-05-06t171355-vectifyaipageindex
  - >-
    2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure
  - >-
    2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs
  - 2026-06/2026-06-04t194244-inside-openais-in-house-data-agent
  - >-
    2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage
  - 2026-06/2026-06-14t094245-agentswarms
  - 2026-06/2026-06-20t145835-chopratejasheadroom
compiled_at: '2026-06-18T21:54:48.586Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4176
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
  cost_usd: 0.025413
last_source_added: '2026-06-20T21:58:35.318Z'
---
Retrieval-augmented generation pairs an LLM with a retrieval step that pulls relevant documents into the prompt at query time, letting the model answer from up-to-date or domain-specific sources without baking that knowledge into weights. The canonical implementation uses vector embeddings to find semantically similar chunks, but that architecture has challengers.

[PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces embeddings entirely with LLM-built structured page indexes, arguing that reasoning over explicit structure outperforms fuzzy vector similarity for many document types. The Karpathy LLM Wiki pattern pushes further: rather than retrieving at query time, an LLM pre-synthesizes documents into a maintained wiki, queried directly. [One builder's honest assessment](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) is that cross-document synthesis genuinely beats RAG for curated research, but hallucinations ingested at build time propagate structurally through the wiki, making a lint pass non-negotiable. A [practical walkthrough](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) frames this as querying at scale without RAG, with periodic health checks to prevent knowledge drift.

On the infrastructure side, RAG workloads are expensive because each query re-prefills a long context. [Everpure's KV cache work](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) reports up to 20x faster inference by persisting precomputed attention states across sessions, and their [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable checkpoints so only token deltas are processed, directly cutting RAG latency and GPU cost.

[OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) applies RAG at scale across 600+ petabytes and 70k datasets, combining it with Codex-enriched table context and a self-learning memory layer. Multimodal RAG now extends the same pattern to images and video, as the [2025 VLM landscape survey](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger) notes.

A sharper critique comes from [a belief-maintenance framing of agent memory](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): RAG stores assertions without provenance, confidence, or revision history, so retrieved facts carry no signal about whether they are still current or how they interact with conflicting claims. [AgentSwarms](/reading/2026-06/2026-06-14t094245-agentswarms) treats RAG as a foundational agentic pattern alongside tool-calling and ReAct, implying it remains practically indispensable even if architecturally limited.
