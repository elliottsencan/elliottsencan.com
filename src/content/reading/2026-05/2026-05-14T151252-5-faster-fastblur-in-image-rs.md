---
title: 5× faster fast_blur in image-rs
url: 'https://apas.tel/blog/optimizing-image-rs-blur'
summary: >-
  Arthur Pastel achieves a 5.9× speedup on Rust's image-rs fast_blur by
  replacing float accumulators with integer arithmetic and substituting
  expensive division instructions with precomputed reciprocal multiplication.
category: tech
added: '2026-05-14T22:12:52.626Z'
author: Arthur Pastel
topics:
  - engineering-craft
  - benchmarks
  - open-source
  - systems-design
  - software-engineering
compiled_at: '2026-05-14T22:12:52.626Z'
compiled_with: claude-sonnet-4-6
title_source: model
compile_cost:
  usage:
    input_tokens: 6681
    output_tokens: 165
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
  cost_usd: 0.022518
---

