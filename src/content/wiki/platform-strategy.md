---
title: Platform strategy
summary: >-
  Platform strategy concerns how companies define the foundational layer other
  products or users depend on, and where durable competitive advantage lives
  relative to that layer.
sources:
  - 2026-04/2026-04-24t162154-he-came-he-saw-he-cooked
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-30t231537-startupsrip
  - 2026-04/2026-04-30t231745-optimal-vs-usertesting
  - 2026-05/2026-05-06t204115-platform-engineering-end-to-end
  - 2026-05/2026-05-08t131438-apocalypse-no
  - 2026-05/2026-05-10t205349-github-is-sinking
  - >-
    2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on
  - 2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate
  - >-
    2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup
  - 2026-06/2026-06-21t231454-spacex-and-the-sentient-sun
  - 2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good
  - 2026-07/2026-07-05t170602-building-a-cloud
compiled_at: '2026-07-06T00:19:11.138Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6912
    output_tokens: 711
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
  cost_usd: 0.031401
---
A platform is a foundation that others build on or depend on. The strategic question is always where the value concentrates: in controlling the platform itself, in the services that run on top of it, or in the data and relationships that accumulate over time.

The tension between owning a layer versus riding one runs through several of these sources. [David Crawshaw](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that today's cloud platforms are built on wrong abstractions, VMs tied to fixed resources and slow block devices, and that the opportunity exists precisely because incumbents are structurally constrained. Building a cloud from scratch is a bet that the platform layer itself is still contestable. [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) makes the opposite argument for AI agent infrastructure: skip building your own orchestration layer and instead extend frontier agents like Claude Code via MCP tool servers, letting Anthropic own the loop while you invest in your domain-specific APIs and context. The moat is not the platform; it is what you bring to it.

SpaceX illustrates a third model. [A16z](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) profiles Starlink revenue and Falcon 9 reusability as the financial and technical platform that funds Starship, which in turn becomes the infrastructure layer for orbital manufacturing and Mars colonization. Each layer funds the next, compounding advantage over time.

Platform strategy also shapes product decisions. [Paul Buchheit](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) argues that great products nail two or three core attributes and ignore everything else; feature completeness is not the goal. This is a platform-level insight: define what your product is the definitive foundation for, and resist expanding scope until that foundation is solid.

The risk of platform dependency is visible in [David Bushell's](/reading/2026-05/2026-05-10t205349-github-is-sinking) account of GitHub's decline under Microsoft, where reliability and quality degraded enough that developers are migrating to Codeberg or self-hosted alternatives. Platform lock-in that once felt safe becomes a liability when the platform owner's incentives shift. [Ayush Chaturvedi](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) draws the same lesson from AI model pricing: build provider-agnostic from day one, because a 75x price gap between providers means the platform you depend on can reprice your business model overnight.
