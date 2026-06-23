---
title: Platform strategy
summary: >-
  How platforms create durable competitive positions by controlling
  infrastructure layers, owning unique APIs or domain context, and choosing
  which capabilities to build versus delegate to adjacent platform owners.
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
compiled_at: '2026-06-23T00:05:52.212Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6767
    output_tokens: 740
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
Platform strategy concerns how companies and products define the layer of value they own and how they relate to the layers above and below them. The sources collected here approach this from several angles: infrastructure plays, developer tooling, AI-era moats, and product focus.

The internal developer platform as a strategic asset gets detailed treatment in [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end), which argues that internal platforms exist to reduce cognitive load on product teams, not to accumulate features. The platform succeeds when it disappears into the workflow.

A complementary argument appears in [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat): teams building on top of frontier AI agents should stop trying to own the orchestration loop and instead invest in the unique APIs and domain context that no one else can replicate. The orchestration layer is commodity infrastructure; your data and integrations are the actual platform.

SpaceX illustrates this logic at scale. [SpaceX & the Sentient Sun](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) describes how Starlink revenue and Falcon 9 reusability compound into a launch cost advantage that becomes self-reinforcing, each layer funding the next.

On the product side, [If your product is Great, it doesn't need to be Good](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) argues that platform position comes from owning a few attributes exceptionally well rather than matching every competitor feature. Gmail and the iPod won by focusing, not by completing.

[The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) adds a caution: when a foundational input commodity reprices by 75x, the platforms built on top face margin exposure unless they built provider-agnostic from the start. Dependency on a single infrastructure vendor is a platform risk, not just an engineering preference.

[GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) makes the corresponding point from the user side: once a platform erodes reliability and quality, the switching cost that locked users in stops protecting it. Platform lock-in is not permanent if the core value degrades.

Finally, [The Competitive Moat That AI Can't Replicate](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) argues that human trust and relationship are platform assets too, ones that metric-driven automation systematically destroys without appearing on any balance sheet.
