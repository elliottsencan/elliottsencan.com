---
title: What Happens If a Merge Queue Builds on the Wrong Commit
url: >-
  https://trunk.io/blog/what-happens-if-a-merge-queue-builds-on-the-wrong-commit?rdt_cid=5174018760352507425&utm_source=reddit
summary: >-
  A GitHub merge queue bug silently rewrote main branches by constructing temp
  branches from stale divergence points rather than HEAD, and Trunk explains why
  their architecture—never pushing temp branches to main—made them immune to the
  same failure.
category: tech
added: '2026-05-03T22:05:55.644Z'
author: Phil Vendola
source: Trunk
topics:
  - continuous-integration
  - developer-tooling
  - distributed-systems
  - engineering-craft
  - flaky-tests
compiled_at: '2026-05-03T22:05:55.644Z'
compiled_with: claude-sonnet-4-6
title_source: model
compile_cost:
  usage:
    input_tokens: 3791
    output_tokens: 118
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
  cost_usd: 0.013143
---

