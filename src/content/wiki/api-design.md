---
title: API design
summary: >-
  How APIs are shaped — their surface area, type contracts, and module depth —
  determines how easy systems are to use, compose, and evolve, whether consumed
  by humans or AI agents.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - >-
    2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with
  - 2026-04/2026-04-30t231412-form-model-design-angular-signal-forms
  - 2026-04/2026-04-30t231709-conductor
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
  - >-
    2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about
  - 2026-05/2026-05-18t113714-yaml-thats-norway-problem
  - 2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm
  - 2026-06/2026-06-17t075738-gunnargray-devunicode-animations
  - 2026-07/2026-07-04t141323-the-vertical-codebase
compiled_at: '2026-07-04T21:17:10.421Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8043
    output_tokens: 753
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
  cost_usd: 0.035424
---
A recurring insight across sources is that smaller surfaces hiding larger implementations produce better APIs. [Go Monk's piece on deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) formalizes this: a small interface over a large implementation reduces the cognitive load on callers and, increasingly, on LLMs parsing unfamiliar codebases. The inverse — shallow modules with wide surfaces — forces callers to understand and coordinate internals that should be encapsulated.

The same principle shows up in component design. [Kobi Hari's argument against bloated Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) is essentially an API-design argument: when a component accumulates dozens of inputs, its surface becomes unwieldy and hard to compose. Refactoring into directives and sub-components restores a clean contract at each boundary.

Type contracts are the other major lever. [Daniel Sogl's Zod-plus-RxJS pattern](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) treats backend responses as untrusted at the boundary and validates them against a schema before they propagate. This catches shape mismatches at dev time rather than at runtime. The same Zod library surfaces in [a JS library roundup](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) alongside Orval, which generates typed API clients from OpenAPI specs — both tools that push contract enforcement earlier in the development cycle.

Serialization formats introduce their own API surface hazards. The YAML Norway problem — where the country code `NO` parses as boolean `false` in spec versions before v1.2 — is documented in [lab174's writeup](/reading/2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm) and illustrates how implicit type coercion in a data format becomes a silent API contract that breaks consumers in surprising ways.

The audience for an API matters too. [Ajeesh Mohan's MCP critique](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that MCP is a GUI-style abstraction optimized for human-readable tooling, not for agents that can call raw APIs directly — pointing to the cost of wrapping well-designed APIs in an additional layer agents do not need. Conductor's [fully-typed wrapper over QuickBooks Desktop](/reading/2026-04/2026-04-30t231709-conductor) shows the opposite value: when the underlying protocol is qbXML over SOAP, a typed API layer is the abstraction that makes the system usable at all.
