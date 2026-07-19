---
title: It's always TCP_NODELAY. Every damn time.
url: 'https://brooker.co.za/blog/2024/05/09/nagle.html'
summary: >-
  Marc Brooker argues that Nagle's algorithm is obsolete on modern datacenter
  hardware and that TCP_NODELAY should be the default, since application-layer
  protocols have effectively solved the tiny-packet problem and the
  Nagle/delayed-ACK interaction still silently kills latency.
category: tech
kind: article
added: '2026-07-19T14:32:55.605Z'
author: Marc Brooker
source: Marc's Blog
topics:
  - distributed-systems
  - production-systems
  - systems-design
  - reliability
  - engineering-craft
compiled_at: '2026-07-19T14:32:55.605Z'
compiled_with: claude-sonnet-4-6
title_source: model
compile_cost:
  usage:
    input_tokens: 4063
    output_tokens: 128
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
  cost_usd: 0.014109
---

