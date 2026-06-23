---
title: Platform strategy
summary: >-
  Platform strategy concerns how companies define the foundational layer they
  own, what they expose to others, and where they concentrate investment to
  build durable competitive position.
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
compiled_at: '2026-06-23T23:22:14.189Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6771
    output_tokens: 635
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
  cost_usd: 0.029838
---
Platform strategy is the set of decisions about what a company owns as infrastructure, what it surfaces as an interface for others to build on, and where it draws the line between commodity and defensible value. Several sources here illuminate different dimensions of that problem.

SpaceX is the clearest structural example. [A16z's profile](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) traces how Starlink revenue, Falcon 9 reusability, and Starship cost reductions stack into a platform for orbital infrastructure, lunar factories, and eventually Mars colonization. Each layer subsidizes the next, and the platform logic is explicit: own the launch economics, then everything above them becomes available.

In software, the platform question is increasingly about where to draw the boundary between your proprietary context and the commodity orchestration layer. [Aiyan's argument](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) is direct: custom LLM orchestration frameworks are not a moat, and teams that invest there are competing with Anthropic on Anthropic's terms. The defensible position is in domain-specific APIs and context, surfaced as MCP tool servers that extend frontier agents rather than replicate them.

Platform durability also depends on what you do not automate away. [Ghost in the Data](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) argues that organizations destroying human connection through metric-driven efficiency decisions lose trust that no AI personalization can rebuild. The moat was never the feature set; it was accumulated relational capital that a platform decision quietly spent down.

GitHub is a cautionary case. [David Bushell's assessment](/reading/2026-05/2026-05-10t205349-github-is-sinking) documents how reliability and quality declined under Microsoft while the platform's network effects kept most users locked in longer than the product quality warranted. Platform incumbency buys time but does not replace investment in the core.

Paul Buchheit's older framing still applies: [great products](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) win by being exceptional on two or three dimensions and ignoring the rest. Platform strategy is one expression of that principle at the product-line level, choosing which layer to make excellent and letting others build everything adjacent to it.
