---
title: Platform strategy
summary: >-
  How products, companies, and infrastructure layers define their scope, defend
  their position, and create ecosystems that others build on or compete within.
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
compiled_at: '2026-07-01T02:04:04.391Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6771
    output_tokens: 640
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
  cost_usd: 0.029913
---
Platform strategy is about choosing what layer to own, what to expose, and what to leave to others. The sources here approach that question from several angles: infrastructure plays, competitive moats, developer ecosystems, and the product decisions that determine whether a company becomes a platform or stays a point solution.

SpaceX illustrates the layered approach at its most ambitious. [A16z's profile](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) frames Starlink revenue and Falcon 9 reusability as the financial substrate that makes Starship and eventually Mars colonization tractable. Each layer funds the next; the platform is the stack, not any single product.

At the developer tooling level, the argument for restraint is sharp. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) makes the case that teams building LLM agents should not own the orchestration loop. Anthropic maintains the loop; your platform's unique APIs and domain context are the actual differentiation. Owning infrastructure you cannot win is a strategic tax, not an asset.

GitHub is the cautionary case. [David Bushell's account](/reading/2026-05/2026-05-10t205349-github-is-sinking) of its decline under Microsoft shows what happens when a platform lets reliability and quality erode: developers start migrating to Codeberg, Forgejo, or self-hosted forges. Lock-in that depends on inertia rather than ongoing value is fragile.

Paul Buchheit's older argument still applies: [nail two or three attributes exceptionally](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) and ignore everything else. Gmail and the iPod succeeded not by being complete but by being undeniably better on the dimensions users cared about. Platform breadth can follow; it cannot substitute for that initial core.

The [AI pricing war analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) adds a supply-side pressure: a 75x gap between the cheapest and most expensive frontier models means the platform layer of AI infrastructure is commoditizing fast. Build provider-agnostic from day one or face margin compression when you are locked to a single vendor's pricing.
