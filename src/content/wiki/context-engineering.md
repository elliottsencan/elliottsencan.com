---
title: Context engineering
summary: >-
  Deliberate construction and management of the information fed into an LLM's
  context window, treated as a first-class engineering problem spanning
  retrieval strategy, knowledge structure, memory systems, and token efficiency.
sources:
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code
compiled_at: '2026-05-04T03:37:55.731Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3399
    output_tokens: 628
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
  cost_usd: 0.019617
last_source_added: '2026-05-06T18:07:28.855Z'
---
Context engineering is the practice of deciding what information an LLM sees, when it sees it, and in what form. It treats the context window not as a passive receptacle but as a surface to be designed, the same way an API schema or a database index is designed.

The clearest articulation of this comes from the LLM-wiki pattern associated with Andrej Karpathy. Rather than retrieving chunks at query time, the model is asked to pre-synthesize raw documents into structured Markdown files that the model can later consume whole. [One implementation guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) describes ingesting sources, having the model build and maintain the wiki, and running health checks to prevent drift. [A developer who built this end-to-end](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) found that cross-document synthesis genuinely outperforms RAG for curated research, but that hallucinations baked in at ingest propagate structurally, making the lint step non-negotiable.

Token efficiency is the other axis. A zero-dependency CLI described in [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) organizes project context as tiered Markdown files with a machine-readable manifest so agents can navigate a knowledge base without burning excess tokens on irrelevant content.

At the infrastructure level, Anthropic's Managed Agents architecture [decouples the agent harness, session log, and sandbox](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) into independent interfaces, cutting p50 time-to-first-token by roughly 60 percent and p95 by over 90 percent. Separating those concerns is itself a context engineering decision: each component controls its own information surface.

Longer-horizon memory is the open problem. [Vectorize's Hindsight system](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) uses biomimetic data structures and multi-strategy retrieval so agents accumulate and query memory across sessions, moving closer to the kind of persistent context that one-shot context windows cannot provide.
