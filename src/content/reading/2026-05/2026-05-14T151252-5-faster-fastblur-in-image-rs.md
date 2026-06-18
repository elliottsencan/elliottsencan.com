---
title: 5× faster fast_blur in image-rs
url: 'https://apas.tel/blog/optimizing-image-rs-blur'
summary: >-
  Step-by-step optimization of Rust's image-rs fast_blur function, replacing
  float arithmetic with integer accumulators and costly integer division with
  reciprocal multiplication to achieve a 5.9× speedup on u8 images.
category: tech
kind: article
added: '2026-05-14T22:12:52.626Z'
author: Arthur Pastel
topics:
  - benchmarks
  - engineering-craft
  - open-source
  - systems-design
  - software-engineering
compiled_at: '2026-06-18T22:39:15.330Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6866
    output_tokens: 152
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
  cost_usd: 0.022878
---

