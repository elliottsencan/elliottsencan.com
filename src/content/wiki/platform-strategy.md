---
title: Platform strategy
summary: >-
  How companies and products define their platform layer, defend it against
  commoditization, and decide what to own versus delegate to others.
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
compiled_at: '2026-06-22T07:25:29.655Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6534
    output_tokens: 697
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
  cost_usd: 0.030057
---
Platform strategy is the set of choices about which layer of a stack to own, what to expose to others, and where to draw the line between commodity infrastructure and defensible differentiation. Several sources illuminate different facets of the same core tension.

In infrastructure terms, [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) describes internal developer platforms as the answer to that question inside large engineering orgs: consolidate shared concerns (provisioning, observability, deployment) so product teams build on stable ground rather than reinventing it. The platform team owns the floor; everyone else builds on it.

The same logic applies at the product level. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that teams building LLM agents should not invest in custom orchestration layers. Anthropic owns the agent loop; your moat is the domain APIs and context you expose via MCP tool servers. Trying to own the orchestration layer is a category error when a frontier provider will maintain it better than you can.

[The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) adds a pricing dimension: a 75x spread between the cheapest and most expensive frontier models means platform decisions now carry direct margin consequences. Building provider-agnostic from day one is the hedge against being trapped on an expensive layer you do not control.

Platform decay is the other side of this. [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) documents what happens when a platform that developers depend on degrades under new ownership. The strategic implication is that betting on any single platform carries lock-in risk, which mirrors the provider-agnostic argument above.

[The Competitive Moat That AI Can't Replicate](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) points at something platforms frequently optimize away: human trust built through repeated personal interaction. Organizations that automate every customer touchpoint in pursuit of efficiency destroy a form of loyalty that no platform feature can reconstruct.

At the startup level, [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) frames the MVP stage as a platform-architecture decision disguised as a build question. How you structure the codebase and what context you make legible determines what is possible at scale. Early platform choices compound.
