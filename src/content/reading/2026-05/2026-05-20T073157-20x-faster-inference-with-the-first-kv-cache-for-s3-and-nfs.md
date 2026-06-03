---
title: 20x Faster Inference with the First KV Cache for S3 and NFS
url: >-
  https://blog.everpuredata.com/purely-technical/20x-faster-inference-first-kv-cache-for-s3-and-nfs/
summary: >-
  Pure Storage's Key-Value Accelerator (KVA) delivers up to 20x faster LLM
  inference by persisting and reusing precomputed attention states across
  sessions on NFS and S3 storage, eliminating redundant prefill computation
  without changing model or infrastructure.
category: tech
added: '2026-05-20T14:31:57.941Z'
author: 'Robert Alvarez, Jean-Baptiste Thomas'
source: Everpure Blog
topics:
  - llm-inference
  - ai-infrastructure
  - benchmarks
  - retrieval-augmented-generation
  - production-systems
compiled_at: '2026-05-20T14:31:57.941Z'
compiled_with: claude-sonnet-4-6
title_source: model
compile_cost:
  usage:
    input_tokens: 5010
    output_tokens: 142
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
  cost_usd: 0.01716
---

