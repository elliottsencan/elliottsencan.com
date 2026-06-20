---
title: Platform strategy
summary: >-
  How companies and products define their boundaries, attract third parties, and
  maintain durable advantages — seen here across developer platforms, AI
  tooling, internal engineering platforms, and competitive positioning.
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
aliases:
  - ai-strategy
compiled_at: '2026-06-20T12:49:11.448Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6356
    output_tokens: 746
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
  cost_usd: 0.030258
---
Platform strategy is the set of decisions about what a product controls directly, what it opens to others, and where durable advantage actually lives. The sources here approach that question from several angles, and the through-line is consistent: owning the loop matters less than owning the layer that is hardest to replicate.

The clearest statement of this comes from [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat), which argues that teams building LLM agents should stop competing with Anthropic on orchestration and instead invest in the APIs, domain context, and tool surfaces that frontier agents will call. The orchestration loop is a commodity; the specialized skill or data layer underneath it is the platform. This is a direct corollary of classic platform logic: own the scarce input, not the generic connector.

The same logic appears in the AI pricing context. The AI Model Pricing War notes a 75x spread between cheapest and most expensive frontier models and argues that the correct response is provider-agnostic architecture. Being locked to one model provider is the platform-dependency trap in miniature; the advice to build on swappable abstractions is the same advice any platform-adjacent product should follow.

[Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) translates this inside the enterprise. Internal developer platforms exist to make the right path the easy path for engineering teams; the platform team's job is to own the paved road, not every service that runs on it. That boundary question, what the platform controls versus what it exposes, is the same strategic question facing external product platforms.

[He Came, He Saw, He Cooked](/reading/2026-04/2026-04-24t162154-he-came-he-saw-he-cooked) touches platform strategy in the context of Apple's leadership transition and compute positioning, illustrating how platform incumbents must continuously defend their layer against displacement from above (AI) and below (commoditized hardware).

Two sources point to what platforms cannot manufacture. [The Competitive Moat That AI Can't Replicate](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) argues that human trust and relational continuity are destroyed, not replaced, when platforms automate away direct contact. [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) documents what happens when a platform deprioritizes reliability and quality: the switching costs that once kept developers in place erode, and alternatives become viable. Both cases confirm that a platform's moat is only as durable as the experience it actually delivers to the people depending on it.
