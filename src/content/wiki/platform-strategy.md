---
title: Platform strategy
summary: >-
  How platforms define competitive position, attract builders, and sustain moats
  — covering infrastructure platforms, product platforms, and the strategic
  choices that determine who captures value in a stack.
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
compiled_at: '2026-06-22T02:40:04.002Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6356
    output_tokens: 687
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
  cost_usd: 0.029373
---
Platform strategy concerns who owns the layer that others build on, and how that ownership translates into durable advantage. The sources here approach it from several angles, none of which fully agrees with the others, and the tension is worth naming.

The internal developer platform angle is the most operational. [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) describes internal developer platforms as infrastructure that reduces cognitive load on product teams by abstracting away deployment, networking, and compliance into a self-service layer. The platform team's value is measured by how much faster product engineers can ship, not by the platform's own feature count. That framing treats platform ownership as a service relationship, not a power relationship.

The AI tooling angle flips that framing. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that teams building on top of frontier agents should stop trying to own the orchestration layer and instead expose their domain logic as MCP tool servers, letting Anthropic or another model provider own the loop. The moat is proprietary context and APIs, not the coordination infrastructure. The platform, in this reading, is whoever controls the agent runtime, and the right move for most teams is to be a plugin, not a platform.

The pricing dynamics article adds a complication. [The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x spread between cheap and expensive frontier models, which means platform decisions made at 2025 price points may be wrong by late 2026. Building provider-agnostic from day one is framed as a hedge against platform lock-in, not just a technical nicety.

[GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) illustrates what platform lock-in looks like from the dependent's side. When a platform's quality degrades, migration costs and ecosystem gravity keep developers on it longer than they rationally should stay. That stickiness is itself a platform strategy, though not one that helps the platform improve.

Across these sources, the recurring question is where the value-capture layer actually sits. [The Competitive Moat That AI Can't Replicate](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) argues that human trust and relationship are moats no platform logic can replicate, which suggests that purely technical platform advantages erode faster than organizations expect.
