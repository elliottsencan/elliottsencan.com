---
title: API design
summary: >-
  API design shapes how well code exposes functionality to callers — covering
  interface width, type safety, serialization choices, and the tradeoffs between
  hiding complexity and composability.
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
compiled_at: '2026-08-30T05:48:12.141Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 785
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
  cost_usd: 0.036399
---
A recurring theme across sources is the tension between surface area and depth. [Go Monk's piece on deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes the case most directly: small interfaces hiding large implementations reduce cognitive load for both human developers and LLMs working with a codebase. The principle shows up elsewhere in different forms. [Kobi Hari on Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs should be decomposed using the Composite Components pattern, so each unit exposes only what its callers actually need. A wide, flat interface is a design smell in both cases.

Type safety is a second through-line. [Daniel Sogl's Zod integration for Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) treats API responses as untrusted data that must be validated against a declared schema at the boundary, catching shape mismatches at dev time rather than runtime. [The Zod 4.5 memory optimization post](/reading/2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude) shows the same library investing heavily in internal efficiency to keep that boundary validation practical at scale. Orval and Zod both appear in [Neciu Dan's JS library roundup](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) as tools that generate typed clients from API specs, reinforcing the idea that schema-first design pays dividends downstream.

Serialization format matters too. [The YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) is a concrete example of a format whose implicit type coercion rules produce silent, incorrect parses — the country code NO becomes boolean false — and the bug persists in major libraries years after the spec fixed it. Configuration and data-interchange formats are part of an API's contract, and surprising coercions break that contract silently.

The question of who the API serves adds another dimension. [Ajeesh Mohan's MCP critique](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that protocol layers designed for human-facing tooling impose unnecessary token and composability costs when the consumer is an AI agent that can call a raw API directly. Conductor's fully-typed REST and SDK layer over QuickBooks Desktop [takes the opposite approach](/reading/2026-04/2026-04-30t231709-conductor): wrapping a notoriously opaque legacy protocol in a clean, typed surface is the right call when the underlying interface is genuinely hostile. The right abstraction level depends on who is consuming the interface and what they would otherwise face.
