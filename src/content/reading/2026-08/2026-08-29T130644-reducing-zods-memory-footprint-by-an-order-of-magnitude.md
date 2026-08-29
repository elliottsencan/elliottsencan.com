---
title: >-
  Reducing Zod's memory footprint by an order of magnitude with memoizing
  prototypes
url: 'https://zod.dev/blog/reducing-memory-footprint'
summary: >-
  Zod 4.5 cuts per-schema heap usage up to 10x by replacing eagerly bound
  methods with lazily memoizing prototype getters that only allocate memory for
  methods that are actually accessed.
category: tech
kind: article
added: '2026-08-29T20:06:44.872Z'
author: Colin McDonnell
source: Zod
topics:
  - software-engineering
  - open-source
  - api-design
  - benchmarks
  - engineering-craft
compiled_at: '2026-08-29T20:06:44.872Z'
compiled_with: claude-sonnet-4-6
title_source: model
compile_cost:
  usage:
    input_tokens: 4055
    output_tokens: 158
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
  cost_usd: 0.014535
---

