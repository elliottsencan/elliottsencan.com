---
title: 'Designing Memory for zerostack: Plain Files, No Vector Store'
url: 'https://xavierforge.dev/en/posts/zerostack-memory-design/'
summary: >-
  A walkthrough of the file-based memory subsystem built for zerostack, a
  minimal Rust coding agent, explaining why plain Markdown plus regex retrieval
  was chosen over vector stores given the project's constraints of low RAM, no
  daemon, and provider neutrality.
category: tech
added: '2026-06-11T09:36:20.507Z'
author: Xavier
source: Xavier's Data Forge
topics:
  - context-engineering
  - llm-agents
  - software-architecture
  - ai-assisted-coding
  - open-source
compiled_at: '2026-06-11T09:36:20.507Z'
compiled_with: claude-sonnet-4-6
title_source: model
compile_cost:
  usage:
    input_tokens: 5740
    output_tokens: 122
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
  cost_usd: 0.01905
---

