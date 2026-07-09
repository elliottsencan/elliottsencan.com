---
title: API design
summary: >-
  API design covers the decisions that shape how software exposes functionality
  to callers — interface width, type safety, validation boundaries, and the
  trade-offs between abstraction depth and flexibility.
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
compiled_at: '2026-07-09T14:08:41.098Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8043
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
  cost_usd: 0.035319
---
A recurring theme across many of the sources here is the value of narrow, deliberately shaped interfaces. The "deep modules" argument from [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) captures it directly: small public surfaces hiding large implementations reduce the cognitive load on every caller, and that benefit compounds when LLMs are the ones reading or generating code. The inverse, a wide surface loaded with dozens of parameters, is the "component monster" problem that [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) addresses in the Angular context: bloated input lists signal that concerns haven't been separated, and the fix is pushing behavior into directives and sub-components so each boundary stays clean.

Type safety at the API boundary is a separate but related concern. [Daniel Sogl](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how runtime validation with Zod catches mismatches between what a backend claims to return and what the frontend actually receives — a gap that static types alone can't close because TypeScript types are erased at runtime. Orval, mentioned in [Neciu Dan's JS library roundup](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about), takes a complementary angle: generating typed client code directly from OpenAPI specs so the schema is the single source of truth.

Data format choices can introduce silent correctness bugs. The YAML Norway problem documented by [lab174](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) — where the string "NO" parses as a boolean false across multiple popular libraries — illustrates that even widely-used serialization formats carry inherited ambiguities that affect any API relying on them for configuration or data exchange.

Abstraction layers over legacy systems present their own design challenge. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) wraps QuickBooks Desktop's qbXML and SOAP surface in a fully-typed REST and SDK layer, trading the complexity of the underlying protocol for a predictable, versioned interface. That is the deep-module pattern applied at the integration layer.

The MCP discussion in [Ajeesh Mohan's piece](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) raises an audience question that applies broadly: an interface optimized for human discoverability (many named tools, descriptive metadata) may be the wrong shape for a programmatic caller that would be better served by composable primitives with lower overhead. The right API surface depends on who or what is calling it.
