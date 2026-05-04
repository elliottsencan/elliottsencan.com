---
title: LLM tooling
summary: >-
  Infrastructure and conventions for making knowledge accessible to language
  models, spanning documentation platforms, structured knowledge bases, and
  LLM-compiled wiki patterns that let models navigate context without burning
  tokens on unstructured retrieval.
sources:
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
compiled_at: '2026-05-04T04:08:13.728Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2706
    output_tokens: 528
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
  cost_usd: 0.016038
---
LLM tooling covers the layer between raw knowledge and the model that needs to consume it. Three sources here converge on a shared problem: LLMs work better when they can reach well-structured, machine-legible context, and building that context is now its own engineering discipline.

[Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) approaches this from the documentation side. It generates and serves docs in formats explicitly designed for model consumption, including llms.txt support and MCP integration, so the same knowledge base that a human reads can be queried directly by an agent without reformatting.

A different angle comes from Andrej Karpathy's LLM-compiled wiki pattern, documented in a [Reddit walkthrough](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base). The idea is to use an LLM itself to ingest raw documents and produce structured Markdown files that persist as a maintained wiki. This sidesteps RAG entirely: instead of retrieving chunks at query time, the model builds a coherent knowledge store upfront and runs periodic health checks to prevent drift. It trades retrieval latency for maintenance overhead.

The [LostWarrior knowledge-base CLI](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes an operational stance on the same problem. A zero-dependency bash tool organizes project context into tiered Markdown files alongside a machine-readable manifest.json, giving AI agents a navigable structure without requiring them to scan entire codebases. The dual output, one for humans and one for agents, points to a broader pattern: knowledge organization for LLMs often means maintaining two parallel representations of the same content.

Across all three, the core concern is context efficiency. Whether through standardized serving formats, pre-compiled wikis, or tiered manifests, the goal is letting a model find what it needs without wasting tokens on unstructured traversal.
