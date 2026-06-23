---
title: Platform strategy
summary: >-
  Platform strategy shapes how companies define the layer they own, what they
  expose to others, and where durable advantage accumulates — a question that
  runs through infrastructure, product design, and startup competition alike.
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
compiled_at: '2026-06-23T01:26:27.963Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6771
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
  cost_usd: 0.031503
---
A platform is defined less by its technical architecture than by the decisions a company makes about what to control, what to expose, and where to let others build. Those decisions compound over time in ways that can be hard to reverse.

SpaceX illustrates the infrastructure end of the spectrum. [A16z's profile](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) frames Starlink revenue and Falcon 9 reusability as the financial foundation that makes Starship viable — a classic platform move where one layer subsidizes the next. Each capability stacks into a broader system that would be implausible if built in isolation.

At the product layer, Paul Buchheit's argument is relevant: [great products](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) win by being exceptional on two or three attributes and ignoring the rest. Platform positioning is a version of that same judgment — picking which layer to own deeply rather than spreading across all of them.

For AI builders, the question is acute. [Aiyan's post on orchestration](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are not a moat; frontier agents like Claude Code will absorb that layer. The durable investment is in unique APIs and domain context exposed as MCP tool servers — the parts only you can provide. Similarly, [Superframeworks on AI pricing](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x spread in model costs, which means provider lock-in is a platform risk, not a platform advantage; building provider-agnostic from day one preserves optionality.

Platform dependency can also erode from the other direction — when the platform you rely on degrades. [David Bushell's case against GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) treats declining reliability under Microsoft as reason to migrate before the platform deteriorates further, a reminder that platform leverage cuts both ways for the companies sitting on top of someone else's layer.

Internal platforms follow the same logic. [Luca Cavallin's overview of platform engineering](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) frames internal developer platforms as a product — with a defined user (developers), a value proposition (reduced cognitive load), and an explicit owner — rather than shared infrastructure that everyone maintains and no one owns.

Across all of these contexts, the through-line is the same: platform strategy is a set of bets about which layer will be sticky, which will commoditize, and what you need to own outright versus what you can safely build on top of others.
