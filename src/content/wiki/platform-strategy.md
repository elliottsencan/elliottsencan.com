---
title: Platform strategy
summary: >-
  How companies define the layers they own, the surfaces they expose, and where
  they draw the line between commodity infrastructure and defensible
  differentiation.
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
compiled_at: '2026-07-01T04:51:35.783Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6771
    output_tokens: 719
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
  cost_usd: 0.031098
---
Platform strategy is the set of decisions a company makes about which layer of a stack to own, which to expose as a surface for others to build on, and where to stop investing in favor of riding someone else's infrastructure. The sources here illustrate that logic across several domains.

In developer tooling, the argument is explicit: [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) contends that teams building LLM agents should ship MCP tool servers and agent skills that extend frontier agents rather than maintain custom orchestration loops. The platform is Anthropic's; the differentiation is your domain APIs and context. A similar logic runs through [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end), which frames internal developer platforms as the layer an engineering organization builds once so that product teams never have to rebuild it.

At the infrastructure level, [SpaceX & the Sentient Sun](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) shows how Starlink revenue and Falcon 9 reusability stack into a platform that makes Mars colonization and orbital compute viable, each layer subsidizing the next. That stacking model is the core of platform thinking: commoditize one layer to extract value from the next.

Platform durability is a separate question from platform existence. [The Competitive Moat That AI Can't Replicate](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) argues that organizations that automate away human connection destroy trust that no platform feature can restore. [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) is a case study in the opposite direction: a dominant platform degrading under ownership that prioritized growth over reliability, pushing developers toward self-hosted alternatives.

For product strategy, Paul Buchheit's [If your product is Great, it doesn't need to be Good](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) frames the platform decision at the product level: nail the two or three things users come for, and leave the rest deliberately thin. That is platform strategy applied to features rather than infrastructure layers.

The [AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) piece adds a pricing dimension: a 75x spread in model costs means platform choices about which AI provider to standardize on now carry real margin consequences, and provider-agnostic architecture is itself a platform decision.
