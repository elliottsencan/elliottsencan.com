---
title: Platform strategy
summary: >-
  Platform strategy concerns how companies and products define the layer they
  own, what they expose to others, and where defensibility actually lives —
  questions that cut across infrastructure, AI, and startup competition.
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
compiled_at: '2026-07-02T12:33:12.677Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6771
    output_tokens: 688
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
  cost_usd: 0.030633
---
A platform is defined less by its technical architecture than by the decision of what to control and what to expose. That choice determines where value accumulates and who captures it.

The clearest recent articulation of this comes from the AI tooling space. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that teams building on top of frontier models should skip custom orchestration and instead invest in the APIs and domain context that make their surface irreplaceable. The orchestration layer will commoditize; the proprietary data and integrations underneath it will not. This mirrors the classic platform insight: build at the layer that is hardest to replicate.

Paul Buchheit's older framing cuts in the same direction from the product side. [If Your Product Is Great, It Doesn't Need to Be Good](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) argues that durable products nail two or three attributes exceptionally well and ignore everything else. A platform strategy is the organizational version of that bet: pick the layer you can own, build depth there, and let others build on top.

SpaceX illustrates this at infrastructure scale. [SpaceX and the Sentient Sun](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) traces how Starlink revenue and Falcon 9 reusability stack into progressively lower-cost access, with each layer subsidizing the next. The platform is the launch and connectivity infrastructure; everything else — lunar factories, orbital data centers — rides on top of it.

Platform decay is the flip side. [GitHub Is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) documents how reliability and quality erosion under Microsoft has opened space for alternatives, a reminder that platform lock-in is only as durable as the platform itself. [Ghost in the Data's piece on competitive moats](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) makes the related point that trust and human connection, once automated away, cannot be rebuilt by any subsequent technical investment.

For internal platforms, [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) grounds the same logic in developer tooling: internal developer platforms exist to reduce cognitive overhead and improve delivery velocity, and their success is measured by adoption, not by feature count. The same test applies externally.
