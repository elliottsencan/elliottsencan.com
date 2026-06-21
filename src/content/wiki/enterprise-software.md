---
title: Enterprise software
summary: >-
  Enterprise software sits at the intersection of organizational complexity,
  vendor power, and integration burden, surfacing repeatedly as the substrate
  where AI governance, supply chain risk, and workforce decisions all land.
sources:
  - 2026-04/2026-04-24t162154-he-came-he-saw-he-cooked
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t231537-startupsrip
  - 2026-04/2026-04-30t231709-conductor
  - 2026-04/2026-04-30t231745-optimal-vs-usertesting
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-02t155432-cognitive-offloading-and-ai-how-reliance-on-llms-affects
  - >-
    2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - 2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate
compiled_at: '2026-06-21T18:33:27.364Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4506
    output_tokens: 655
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
  cost_usd: 0.023343
---
Enterprise software is less a product category than a set of entanglements. The sources here touch it from multiple angles: security, governance, workforce economics, and the hard integration work of gluing legacy systems to modern tooling.

The clearest illustration of the integration burden is [Conductor](/reading/2026-04/2026-04-30t231709-conductor), which exists entirely because QuickBooks Desktop's qbXML/SOAP surface is hostile enough that developers will pay for a typed API wrapper rather than deal with it directly. This is a recurring pattern: enterprise systems accumulate proprietary protocols and the ecosystem builds translators around them.

Security exposure scales with that complexity. The supply chain attack documented by [The Hacker News](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) targeted SAP-ecosystem npm packages precisely because SAP's reach into cloud credentials and developer toolchains makes a single poisoned dependency high-value. Enterprise software's privileged access is the attack surface.

On the governance side, [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) argues that MCP's real value proposition is enterprise-scale policy enforcement: an auditable proxy between AI agents and the resources they can touch, something CLI tooling cannot provide at organizational scale. Enterprise requirements, in other words, are shaping the architecture of AI tooling.

Workforce dynamics inside enterprise settings get two different treatments. [Falk and Tsoukalas](/reading/2026-05/2026-05-02t155432-cognitive-offloading-and-ai-how-reliance-on-llms-affects) model a strategic trap where competitive pressure pushes firms to automate headcount before the productivity case is proven, producing collectively worse outcomes. [DHg](/reading/2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile) argues that enterprise dysfunction shows up earlier, in onboarding rituals that simulate agile process while systematically setting new employees up to fail.

[Ghost in the Data](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) adds that organizations automating away human touchpoints lose trust capital that no AI personalization can rebuild, a concern that applies directly to enterprise software vendors whose account relationships depend on human continuity.
