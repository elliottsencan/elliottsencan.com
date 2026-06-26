---
title: Platform strategy
summary: >-
  Platform strategy concerns how products, companies, and infrastructure layers
  define their core value, build moats, and position themselves relative to
  adjacent competitors and ecosystem participants.
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
compiled_at: '2026-06-26T03:01:17.114Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6771
    output_tokens: 754
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
  cost_usd: 0.031623
---
Platform strategy names the set of choices that determine what a product or company controls, what it cedes to others, and where its defensible value actually lives. The sources here approach that question from several angles: internal developer platforms, AI tooling ecosystems, infrastructure bets, and product focus.

The internal platform angle is the most concrete. [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) frames internal developer platforms as infrastructure layers whose purpose is to reduce cognitive load on product teams, not to accumulate features. The platform team's job is to make good paths easy, not to own everything. That framing echoes Paul Buchheit's older argument in [If your product is Great, it doesn't need to be Good](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good): nail two or three things exceptionally well and resist the pull toward completeness. Feature breadth is not a moat.

The AI tooling sources push this further. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues directly that teams building on LLMs should not invest in custom orchestration frameworks; the moat is in proprietary APIs and domain context, not in the coordination layer. Ship MCP tool servers and agent skills that extend frontier agents, and let the foundation model provider own the loop. The [AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) piece reinforces this by noting that a 75x pricing gap across providers means anyone who has bet on a single model is strategically exposed; building provider-agnostic from day one is now a platform requirement, not an optimization.

At the infrastructure scale, [SpaceX & the Sentient Sun](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) shows what platform strategy looks like when the layers stack over decades: Starlink revenue funds reusability, reusability funds cost reduction, cost reduction makes the next layer possible. Each layer is both product and subsidy for the next.

[The Competitive Moat That AI Can't Replicate](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) adds a counterpoint: platforms that automate away human relationships in the name of efficiency destroy the trust that made users sticky in the first place. Moats built on operational metrics can erode the very thing the metrics cannot measure. [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) is a live example: reliability and quality decay under a platform owner can scatter a developer base that once had high switching costs.
