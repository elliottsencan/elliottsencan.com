---
title: Platform strategy
summary: >-
  How products and organizations define their competitive layer: whether to
  build proprietary infrastructure, extend existing platforms, or position a
  core capability as the foundation others build on.
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
compiled_at: '2026-06-23T01:59:46.787Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6771
    output_tokens: 654
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
  cost_usd: 0.030123
---
Platform strategy concerns where a product or organization draws its competitive boundary. The sources here approach that question from several angles, and the tensions between them are instructive.

The clearest case for platform thinking as offense comes from SpaceX. [A16z's profile](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) frames Starlink revenue and Falcon 9 reusability not as ends but as capital that funds Starship, which in turn makes everything else possible. Each layer funds the next; the platform is the strategy.

A contrasting argument runs through the AI tooling space. [Aiyan's piece on orchestration](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) makes the case that building your own orchestration layer is a trap. Ship MCP tool servers and extend frontier agents instead. Your moat is domain context and unique APIs, not the coordination loop. That is a platform-extension posture rather than a platform-ownership one.

The pricing collapse in AI models sharpens this. [Superframeworks](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between cheapest and most expensive frontier models, which changes which business models are viable. Building provider-agnostic from the start is framed as a survival requirement, not a nice-to-have.

Paul Buchheit's older argument cuts across all of this: [great products](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) do two or three things exceptionally well and deliberately neglect the rest. Platform breadth and feature completeness are separate questions. A platform can win by being indispensable on a narrow axis.

The risks of platform dependency show up in [David Bushell's account of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking), where years of accumulated network effects did not prevent quality decay once Microsoft owned the layer. Platform lock-in cuts both ways.

[Ghost in the Data](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) adds that organizations automating away human contact destroy trust that no platform feature can recover. That is a reminder that platform moats built on efficiency metrics can erode the softer assets they depend on.
