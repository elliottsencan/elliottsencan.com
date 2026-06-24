---
title: Platform strategy
summary: >-
  Platform strategy concerns how products, companies, and infrastructure layers
  define their competitive position by controlling a foundational layer others
  build on or depend on, rather than competing feature-by-feature.
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
compiled_at: '2026-06-24T06:35:39.050Z'
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
Platform strategy is the practice of positioning a product or infrastructure layer such that others build on top of it, creating compounding advantages that narrow point solutions cannot replicate. The sources here approach this from several angles: infrastructure, product design, developer tooling, and competitive moats.

The clearest infrastructure case is SpaceX. [The a16z profile](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) frames Starlink revenue and Falcon 9 reusability not as ends but as funding mechanisms for Starship, which functions as a cost-reduction platform for everything above it, from lunar factories to orbital data centers. Each layer funds the next.

In software, the same logic appears at the developer tooling level. [Cavallin's platform engineering piece](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) argues internal developer platforms exist to absorb operational complexity so product teams never have to solve the same infrastructure problem twice. The platform's value is that it becomes the default path. Similarly, [the Aiyan post on LLM agents](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that building custom orchestration is a trap: the real platform play is shipping MCP tool servers that extend frontier agents like Claude Code, ceding the loop to Anthropic while owning domain context.

Paul Buchheit's older argument fits here too. [His essay on great products](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) holds that excellence at two or three core attributes matters more than feature completeness. Platforms that try to be everything tend to dilute the core; platforms that own one layer deeply tend to win.

The risk of platform concentration shows up in [David Bushell's piece on GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking): when a platform degrades, dependency becomes liability. The [AI pricing war analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) extends this, recommending provider-agnostic architecture from day one so no single model vendor controls your margins. Both are arguments for managing platform risk, not avoiding platforms entirely.

[Ghost in the Data's piece on human connection](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) adds a counter-pressure: automating away human touchpoints to optimize platform efficiency destroys trust that no AI layer can rebuild. The moat that matters is sometimes what the platform declines to automate.
