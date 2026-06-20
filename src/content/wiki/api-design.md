---
title: API design
summary: >-
  API design shapes how systems expose functionality to callers, with recurring
  principles around narrow interfaces, runtime validation, typed contracts, and
  the cost of leaking implementation detail through surface area.
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
compiled_at: '2026-06-20T12:48:33.328Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7893
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
  cost_usd: 0.034869
---
A well-designed API hides complexity behind a small surface. [Go Monk's piece on deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) frames this directly: a small interface over a large implementation reduces cognitive load for both humans and LLMs trying to reason about a system. The inverse, a shallow module that exposes its internals, forces callers to understand what should be encapsulated.

The same principle appears in UI component design. [Kobi Hari's argument against bloated Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) treats dozens of `@Input()` properties as a design smell, proposing the Composite Components pattern so each concern stays encapsulated and the public API of a component stays minimal and legible.

Narrow interfaces also require accurate contracts. [Daniel Sogl's Zod-in-Angular walkthrough](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows what happens when a backend silently changes its response shape: runtime failures that could have been caught at dev time with schema validation. Zod itself appears again in [Neciu Dan's JS library roundup](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) as a general-purpose schema tool, and Orval is noted there as a code-generator that derives typed clients directly from OpenAPI specs, pushing contract accuracy upstream.

Data format choices can quietly violate contracts. [The YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) is a concrete example: the country code `NO` parses as boolean `false` in YAML 1.1, and widely-used libraries still exhibit this behavior in 2026 despite the spec fix. Configuration APIs that rely on implicit type coercion inherit this fragility.

Abstraction layers built over legacy protocols illustrate how API design can rescue awkward underlying systems. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) wraps QuickBooks Desktop's qbXML and SOAP interfaces behind a fully-typed REST and SDK surface, making 130+ object types accessible without callers ever touching the underlying wire format.

The question of who or what the API caller is matters too. [Ajeesh Mohan's MCP piece](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that GUI-style interfaces designed for human navigation are wasteful when the caller is an AI agent capable of writing code directly against APIs. The right abstraction level depends on the consumer.
