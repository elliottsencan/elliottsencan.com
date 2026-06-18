---
title: What Happens If a Merge Queue Builds on the Wrong Commit
url: >-
  https://trunk.io/blog/what-happens-if-a-merge-queue-builds-on-the-wrong-commit?rdt_cid=5174018760352507425&utm_source=reddit
summary: >-
  A GitHub merge queue bug silently deleted thousands of lines from main
  branches by building temp branches off the wrong base commit — Trunk explains
  why their architectural choice to never push temp branches to main avoided the
  incident entirely.
category: tech
kind: article
added: '2026-05-03T22:05:55.644Z'
author: Phil Vendola
source: Trunk
topics:
  - continuous-integration
  - software-architecture
  - reliability
  - developer-tooling
  - production-systems
compiled_at: '2026-06-18T22:34:00.010Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4383
    output_tokens: 111
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
  cost_usd: 0.014814
---

