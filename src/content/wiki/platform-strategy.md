---
title: Platform strategy
summary: >-
  How platforms define their competitive position through control of key
  interfaces, moat-building, and decisions about where to own versus where to
  extend incumbent infrastructure.
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
compiled_at: '2026-06-20T22:14:04.222Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6356
    output_tokens: 638
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
  cost_usd: 0.028638
---
Platform strategy is fundamentally about deciding what you control, what you build on top of, and where you sit in a value chain relative to others. Several sources here illuminate that question from different angles.

The clearest technical take comes from [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat), which argues that teams building LLM agents should skip custom orchestration layers and instead ship MCP tool servers and skills that extend frontier agents like Claude Code. The strategic logic: Anthropic owns the loop, so fighting that is waste. Your moat is the domain context and proprietary APIs that no one else has. That is a platform positioning argument, not an engineering one.

[Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) applies the same logic internally. Internal developer platforms exist to absorb complexity on behalf of product teams, giving platform engineers control of a shared surface area while freeing others from infrastructure decisions. Who owns the platform layer owns the defaults.

Pricing is another axis of platform control. The AI Model Pricing War documents how a 75x price spread between frontier models has opened up previously unviable business models. The strategic implication is that building provider-agnostic from day one is a hedge against being locked into a platform whose economics shift under you.

[GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) is a cautionary case: when a platform owner deprioritizes reliability and quality, the switching costs that kept users in place erode. Platform lock-in is only durable when the platform continues to deliver.

[The Competitive Moat That AI Can't Replicate](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) adds a non-technical dimension: human trust accumulated through consistent, personal service is a moat that automation systematically destroys when organizations optimize for measurable metrics and cut the interactions that build it. Platforms that automate away their own relationship layer may be trading durable advantage for short-term efficiency.

Across these sources, the through-line is consistent: platform strategy is a question of where you sit in a stack, what interfaces you control, and what dependencies you accept or resist.
