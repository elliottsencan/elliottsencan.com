---
title: Platform strategy
summary: >-
  How platforms create defensible positions by controlling the layer where value
  aggregates, whether through API ownership, internal developer tooling, data
  network effects, or the trust accumulated in human relationships.
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
compiled_at: '2026-06-21T18:37:22.876Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6356
    output_tokens: 695
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
  cost_usd: 0.029493
---
Platform strategy concerns where a company or product chooses to sit in a stack and what that position allows it to extract or defend over time. The sources here approach that question from several angles, and the through-line is the same: the platform layer that others depend on captures durable advantage; everything built on top of it is more exposed.

The clearest expression of this appears in the argument that orchestration logic is not a moat for AI teams. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) puts it directly: if you build a custom agent loop, you own a cost center that Anthropic or another frontier lab will obsolete. The defensible position is the domain API or proprietary data context that any orchestrator needs to call, not the orchestrator itself. Ship MCP tool servers; let the platform vendor own the loop.

The same logic applies to infrastructure. [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) describes internal developer platforms as a deliberate strategic layer inside an organization: by owning the abstraction that product teams build on, the platform team controls reliability, deployment patterns, and developer experience across the company. The platform is the product, even when no external customer ever touches it.

Platform decay is the inverse problem. [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) documents how Microsoft's stewardship of GitHub has degraded reliability and quality to the point where switching costs, once enormous, no longer feel prohibitive. A platform that stops investing in the experience developers depend on loses the lock-in that justified its position.

Pricing is also a platform decision. [The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) shows a 75x gap between cheap and expensive frontier models, and the strategic implication for builders is to remain provider-agnostic from day one so no single vendor's pricing decisions can restructure your margins overnight. That is a platform dependency problem dressed as a procurement decision.

Finally, [The Competitive Moat That AI Can't Replicate](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) points at something orthogonal but important: the platforms that automate away human touchpoints destroy unmeasurable trust that no subsequent personalization layer can rebuild. Human connection, accumulated over years, functions as a platform in its own right, one with genuine switching costs that do not appear on any dashboard.
