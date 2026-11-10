---
title: API design
summary: >-
  Good API design minimizes surface area, enforces type safety at boundaries,
  and hides implementation complexity behind stable interfaces — a principle
  that shows up across library, component, and schema design.
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
  - >-
    2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude
compiled_at: '2026-11-10T01:14:05.458Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 795
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
  cost_usd: 0.036549
---
The most durable API design advice across these sources converges on a single idea: small surfaces hiding large implementations. [Go Monk's piece on deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes this explicit, contrasting shallow modules that leak internal complexity against deep ones that do substantial work behind a narrow interface. The same logic applies when [Kobi Hari argues against bloated Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) stuffed with dozens of inputs: the fix is to push concerns into directives and sub-components so each piece exposes only what it must.

Type safety at the boundary is a recurring theme. [Daniel Sogl's Zod-in-Angular piece](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how runtime schema validation catches mismatches between what a backend claims to return and what the frontend actually receives. Zod appears again in [Neciu Dan's JS library tour](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) as a standard tool for this boundary enforcement, and [Zod 4.5's memory optimization work](/reading/2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude) shows the library itself applying good API design internally — lazily allocating only what callers actually use.

Data serialization formats can quietly undermine an otherwise well-typed API. The [YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) illustrates how implicit type coercion in a configuration language creates correctness bugs that persist in widely-used libraries years after the spec fixed them, a reminder that the wire format is part of the interface contract.

Abstraction layers that hide ugly protocols are another form of API design. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) wraps QuickBooks Desktop's qbXML and SOAP Web Connector in a typed REST and SDK surface, trading the raw protocol for predictable, versioned access across 130+ object types. [Ajeesh Mohan's MCP piece](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues the inverse: wrapping a programmatic API in a conversational layer for AI agents imposes token costs and composability costs that direct API access avoids.

Finally, the [unicode-animations library](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations) is a small case study in API surface restraint: a single default export of named spinner objects, each with just two fields, plus two utility functions for custom grids. Zero dependencies, works everywhere.
