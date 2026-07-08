---
title: Platform strategy
summary: >-
  How companies and products position themselves as foundational layers others
  depend on, covering moat design, infrastructure abstraction, and the risks of
  ceding platform ownership.
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
aliases:
  - ai-strategy
compiled_at: '2026-07-08T00:19:37.273Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6912
    output_tokens: 928
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
  cost_usd: 0.034656
---
Platform strategy is the discipline of choosing what layer of a stack to own and how to make that ownership defensible. The sources here approach this from several angles: infrastructure primitives, developer tooling, competitive moat theory, and the compounding costs of getting the layer wrong.

The clearest infrastructure-level argument comes from [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud), where David Crawshaw contends that incumbents like AWS are built on the wrong abstractions. VMs mapped to fixed resources, slow remote block storage, and expensive networking were decisions made early and calcified. A new cloud entrant can redefine the layer entirely rather than compete on the same primitives. That is platform strategy at its most literal: pick the abstraction layer, and you pick your leverage.

[Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) applies the same logic internally. Internal developer platforms exist to let product teams move without coordinating on infrastructure details, which means the platform team is making an explicit bet about which abstractions are stable enough to centralize.

The moat question runs through several pieces. [The Competitive Moat That AI Can't Replicate](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) argues that human trust and relationship are genuinely non-replicable platform advantages, the kind that erode quietly when organizations automate them away. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) makes a parallel point in the AI tooling space: building a custom orchestration layer is not a platform position, because Anthropic and similar frontier labs will out-invest any custom loop. The actual moat is domain-specific data, APIs, and context that extend the platform someone else maintains.

[If Your Product Is Great, It Doesn't Need to Be Good](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) offers a useful constraint: platforms that try to win every dimension win none of them. Paul Buchheit's framing of two or three exceptional attributes maps directly onto the layer-selection problem. You cannot own every abstraction; choosing which few to nail is the strategy.

Risk is what happens when platform dependencies shift without warning. [GitHub Is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) documents what platform lock-in costs when the platform degrades under ownership changes. Developers who depended on GitHub's reliability have limited options once quality slips. [The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) draws the same lesson for AI infrastructure: a 75x spread in token pricing means provider-specific bets carry real margin risk, and building provider-agnostic from day one is a platform posture, not just an engineering preference.

[SpaceX and the Sentient Sun](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) shows platform strategy at the longest time horizon. Starlink revenue funds Falcon 9 operations, which fund Starship development, which opens orbital and eventually interplanetary infrastructure. Each layer funds the next, and reusability compresses the cost curve to the point where new markets become viable. That stacking logic is the same whether the platform is rockets or cloud compute.
