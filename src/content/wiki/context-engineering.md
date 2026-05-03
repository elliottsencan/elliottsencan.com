---
title: Context engineering
summary: >-
  Shaping what an LLM sees in its context window, through document structure,
  tiered manifests, or session architecture, to improve output quality without
  relying solely on model scale or retrieval.
sources:
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
compiled_at: '2026-05-03T19:07:22.836Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2190
    output_tokens: 544
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
  cost_usd: 0.01473
---
Context engineering is the practice of deliberately constructing what a language model receives as input. The premise is that controlling the shape, order, and granularity of information in the context window matters as much as the model itself.

One direction treats the context window as a knowledge base. Andrej Karpathy's LLM-compiled wiki pattern, discussed in [this Reddit walkthrough](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base), has the model ingest raw documents and maintain structured Markdown files that can be queried wholesale, skipping RAG entirely. The tradeoff is real: [a developer who built the pattern end-to-end](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) found cross-document synthesis genuinely better than RAG for curated research, but also found that hallucinations baked in at ingest propagate structurally through the knowledge base, making lint and health-check passes non-negotiable.

Tooling designed for this pattern focuses on token economy. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) is a zero-dependency bash CLI that organizes project context as tiered Markdown files, generating both a human-readable INDEX.md and a machine-readable manifest.json so agents can navigate large knowledge bases without loading everything at once.

At the infrastructure level, context engineering extends to session architecture. [Anthropic's Managed Agents work](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the agent harness, session log, and sandbox into independent interfaces. Separating the session log from execution cut p50 time-to-first-token by roughly 60 percent and p95 by over 90 percent, which shows that how context is stored and surfaced has direct performance consequences beyond the model call itself.
