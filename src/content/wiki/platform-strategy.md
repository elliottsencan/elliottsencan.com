---
title: Platform strategy
summary: >-
  Platform strategy concerns how companies define the layer at which they
  compete, what they expose to others, and where they protect their core
  advantage, a question that runs through infrastructure, AI tooling, and
  startup product decisions.
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
compiled_at: '2026-07-04T21:25:47.858Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6771
    output_tokens: 792
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
  cost_usd: 0.032193
---
Platform strategy is the set of choices about which capabilities to own, which to expose as surfaces for others to build on, and where control genuinely matters for competitive survival. The sources here illustrate that question across radically different contexts, but the underlying tension is consistent: build the platform layer or build on top of it.

The clearest statement of platform logic comes from the internal developer platforms world. [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) frames the internal platform as a product sold to internal teams, with a "platform as a product" mindset that requires real investment in APIs, documentation, and developer experience. The platform's value is measured by how much it reduces cognitive load for the teams building on top of it.

The same choice appears in AI tooling. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues directly that teams building LLM agents should stop maintaining custom orchestration layers and instead expose MCP tool servers that extend frontier agents like Claude Code. The orchestration loop is a commodity; the platform-specific APIs and domain context are not. Controlling the orchestration layer looks like a moat until the frontier model provider ships it for free.

The AI pricing collapse sharpens this. [The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between cheapest and most expensive frontier models, which compresses the cost of sitting above the model layer and raises the stakes for picking where your product actually lives. Building provider-agnostic from day one is the defensive move when any single layer can be commoditized.

SpaceX is the extreme version of vertical platform logic. [SpaceX & the Sentient Sun](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) shows Starlink revenue subsidizing reusable launch, which subsidizes Starship development. Each layer finances the next and raises the entry cost for competitors trying to replicate any single piece. That is platform strategy as infrastructure moat.

At the product level, [Paul Buchheit's essay](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) offers a complementary frame: successful platforms nail two or three attributes exceptionally well and neglect everything else. Gmail and the iPod won not through completeness but through precision. Platform decisions require the same discipline, choosing the layer where you can be genuinely better rather than covering the full stack adequately.

[GitHub Is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) is a cautionary case: a platform that accumulated network effects and then degraded in reliability and quality under new ownership, creating enough friction that developers began treating migration as viable. Platform dominance is not self-sustaining once the product stops serving its core use case.
