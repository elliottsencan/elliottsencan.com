---
title: 'Designing Memory for zerostack: Plain Files, No Vector Store'
url: 'https://xavierforge.dev/en/posts/zerostack-memory-design/'
summary: >-
  A walkthrough of the file-based memory subsystem built for the zerostack
  coding agent, explaining why plain Markdown files and regex retrieval beat
  vector stores given the project's constraints of minimal RAM, no daemon, and
  provider neutrality.
category: tech
kind: article
added: '2026-06-11T09:36:20.507Z'
author: Xavier
source: Xavier's Data Forge
topics:
  - llm-agents
  - context-engineering
  - software-architecture
  - ai-infrastructure
  - open-source
compiled_at: '2026-06-18T22:45:13.925Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6137
    output_tokens: 157
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
  cost_usd: 0.020766
---

