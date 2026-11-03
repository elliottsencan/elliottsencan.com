---
title: API design
summary: >-
  Good API design favors narrow interfaces over wide ones, runtime validation
  over blind trust, and abstractions that hide complexity rather than expose it
  — principles that surface across frontend components, libraries, and backend
  wrappers alike.
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
compiled_at: '2026-11-03T00:33:23.985Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 871
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
  cost_usd: 0.037689
---
A well-designed API conceals its implementation and exposes only what callers need. [Go Monk's analysis of deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) frames this precisely: a small interface over a large implementation reduces cognitive load for both human readers and LLMs navigating unfamiliar code. Shallow interfaces, by contrast, leak details and raise the cost of every change.

This principle appears at multiple layers. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) illustrates it at the service boundary: it wraps QuickBooks Desktop's qbXML and SOAP protocol in a fully-typed Python, Node.js, and REST surface, giving developers access to 130+ object types without touching the underlying wire format. The implementation is large; the interface is clean.

At the component level, [Kobi Hari's argument against bloated Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) makes the same point in UI terms: a component with dozens of inputs is a wide, leaky interface. Refactoring concerns into directives and sub-components keeps each unit's API small and its behavior encapsulated.

Runtime trust is a separate but related design question. Even a well-shaped API can return unexpected data. [Daniel Sogl's Zod-in-Angular pattern](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) addresses this by validating backend responses against explicit schemas, catching shape mismatches at development time rather than letting them surface as silent runtime failures. Zod itself appears in [a broader JS library roundup](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) alongside Orval, which generates typed API clients from OpenAPI specs, tightening the contract between server and consumer. [Zod 4.5's memory optimization](/reading/2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude) shows that validation infrastructure itself benefits from careful API internals: replacing eagerly bound methods with lazily memoizing prototype getters cut per-schema heap usage by up to 10x.

Data format choices can quietly break API contracts. The [YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) is a concrete example: the country code NO parsed as a boolean in YAML 1.0 through 1.1, and popular libraries still exhibit the bug in 2026 despite the spec fix landing over a decade ago. Configuration and serialization formats are interfaces too, and their edge cases have the same consequences as type mismatches in code.

Finally, [Ajeesh Mohan's critique of MCP](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) raises a question about audience: MCP is a GUI-like abstraction that works well for humans but adds token overhead and composability friction for AI agents, which would benefit more from direct API and script access. Interface design always encodes assumptions about who the caller is.
