---
title: Platform strategy
summary: >-
  How platforms define their scope, build defensible layers, and choose what to
  own versus what to leave to others — a question that runs from cloud
  infrastructure to internal developer tools to product positioning.
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
  - 2026-07/2026-07-09t070315-the-submarine
compiled_at: '2026-07-09T14:17:58.902Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7034
    output_tokens: 761
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
  cost_usd: 0.032517
---
Platform strategy is the set of choices a company makes about which layer of a stack to own, how to attract participants, and where to draw the line between platform and product. Those choices ripple outward: pick the wrong layer to own and competitors commoditize you; pick too many layers and you spread yourself thin.

The clearest statement of the positioning problem comes from [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat), which argues that teams building on top of frontier AI models should resist owning the orchestration loop and instead invest in the APIs and domain context that only they can provide. The orchestration layer will be won by Anthropic or a peer; the moat is in what you plug into it. This is a direct application of the classic platform insight: build where you have durable advantage, not where someone better-resourced is already building.

[Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) pushes the same logic down to infrastructure. The argument there is that existing cloud platforms are built on abstractions — VMs, remote block devices, expensive networking — that no longer reflect what workloads actually need. Owning the wrong abstraction locks customers and providers alike into compounding inefficiency.

[Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) applies the question internally: internal developer platforms exist because no team should rebuild the same deployment, observability, and access-control primitives in every product team. The platform team's job is to make the right path the easy path.

On the product side, [If Your Product Is Great, It Doesn't Need to Be Good](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) offers the counterweight: platform breadth can be a trap. Gmail and the iPod succeeded by being exceptional on two or three dimensions and ignoring the rest. A platform that tries to cover everything rarely dominates anything.

[The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) adds a pricing-layer dimension: a 75x spread in token costs across providers means platform decisions about model selection are now margin decisions. Building provider-agnostic from day one is framed as a platform hygiene requirement, not an optimization.

[The Competitive Moat That AI Can't Replicate](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) complicates the purely technical framing: platforms that automate away human contact destroy trust that no subsequent personalization layer can rebuild. Platform strategy is not only about APIs and abstractions; it also involves what kinds of relationships the platform forecloses.
