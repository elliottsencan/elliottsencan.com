---
title: Platform strategy
summary: >-
  Platform strategy concerns how companies define their layer of control, what
  they own versus delegate, and how those choices determine defensibility — from
  internal developer platforms to AI infrastructure to product positioning.
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
compiled_at: '2026-06-24T04:39:23.492Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6771
    output_tokens: 774
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
  cost_usd: 0.031923
---
A platform is a bet on what layer to own. The sources here approach that bet from several angles: infrastructure, product, and competitive positioning.

In software infrastructure, the argument for building an internal developer platform is that engineering teams need a stable, opinionated foundation so they can ship without re-solving the same problems repeatedly. [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) frames this as reducing cognitive load for product teams while centralizing reliability and compliance concerns. The platform team owns the paved road; everyone else drives on it.

AI has added a new version of this question. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that teams building on LLMs should not try to own the orchestration layer. That layer belongs to frontier model providers. The real platform play is building the domain-specific APIs and context that extend those agents, because that is where differentiation actually lives.

On the infrastructure side of AI, [He Came, He Saw, He Cooked](/reading/2026-04/2026-04-24t162154-he-came-he-saw-he-cooked) and [SpaceX & the Sentient Sun](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) both describe how compute infrastructure — cloud capacity and orbital data centers respectively — represents a foundational platform layer that everything else stacks on top of.

The pricing dimension matters too. [The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) shows a 75x spread in token costs across frontier models, which means platform choices about model providers are now margin decisions. Building provider-agnostic from day one is framed as basic platform hygiene.

At the product level, [If Your Product Is Great, It Doesn't Need to Be Good](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) offers a complementary view: platform defensibility often starts with being exceptional at a narrow set of capabilities rather than achieving broad feature parity. Optimal Workshop makes a similar move in its [head-to-head comparison with UserTesting](/reading/2026-04/2026-04-30t231745-optimal-vs-usertesting), positioning itself as the end-to-end UX research platform versus a narrower competitor.

Platform dependency carries risk in both directions. [GitHub Is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) is a direct case study in platform decay: developers who built workflows on GitHub face real costs when that platform's reliability erodes under new ownership. Choosing which platforms to depend on, and maintaining the ability to migrate, is itself a strategic decision.
