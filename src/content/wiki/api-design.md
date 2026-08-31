---
title: API design
summary: >-
  API design shapes how well a surface area conceals complexity, validates its
  contracts, and stays composable — themes running through everything from
  schema validation libraries to module depth heuristics to component
  boundaries.
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
compiled_at: '2026-08-31T22:29:56.326Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 851
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
  cost_usd: 0.037389
---
Good API design is fundamentally about the ratio between what a caller must know and what the implementation hides. [Go Monk's analysis of deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes this explicit: a small interface over a large implementation reduces cognitive load for both human developers and LLMs navigating a codebase, while shallow modules that expose their internals force callers to understand too much.

The same principle appears at the component level in UI frameworks. [Kobi Hari's argument against bloated Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) is that dozens of inputs create a wide, fragile API surface; the fix is the Composite Components pattern, which pushes concerns into directives and sub-components so each public interface stays narrow and coherent.

Contract enforcement at boundaries is a recurring concern. [Daniel Sogl's approach to Angular API responses](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) uses Zod schemas inside a custom RxJS operator to catch shape mismatches between what the backend sends and what the application expects, catching drift at development time rather than at runtime. Zod itself has matured as a validation layer; [Colin McDonnell's account of Zod 4.5](/reading/2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude) shows the library reducing per-schema heap usage by an order of magnitude through lazily memoizing prototype getters, demonstrating that a widely-used API contract tool must also manage its own resource costs. [Orval, noted in the JS libraries roundup](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about), takes this further by generating typed client code directly from OpenAPI specs, making the schema the single source of truth for both server and client.

Data format choices can silently break API contracts. [The YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) illustrates how a parsing ambiguity in a configuration format — the country code NO being parsed as boolean false — persisted across spec versions and popular libraries for over a decade, undermining the assumption that a configuration surface behaves predictably.

At a higher level, [Conductor's typed API over QuickBooks Desktop](/reading/2026-04/2026-04-30t231709-conductor) is a case study in wrapping a hostile underlying protocol. By hiding qbXML and SOAP behind a clean REST and SDK surface, it converts a painful integration into something with stable, typed contracts for 130+ object types. [Ajeesh Mohan's piece on MCP versus direct APIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) adds a consumption-side perspective: well-designed APIs that agents can call programmatically are preferable to GUI-oriented protocols when the caller can write code, because the latter imposes token overhead and composability limits that a clean API surface avoids.
