---
title: API design
summary: >-
  Good API design hides complexity behind clean, stable interfaces; sources here
  approach that principle from runtime validation, typed SDK abstraction,
  component interface composition, and LLM-friendliness.
sources:
  - >-
    2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with
  - 2026-04/2026-04-30t231709-conductor
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
compiled_at: '2026-05-06T04:23:18.295Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2757
    output_tokens: 534
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
  cost_usd: 0.016281
---
The core tension in API design is between what a surface exposes and what it hides. A narrow, well-typed interface lets callers reason about behavior without understanding internals; a leaky or overgrown one pushes that burden outward.

["AI Likes Deep Modules"](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) frames this as a property LLMs depend on: shallow abstractions force the model to trace logic across many layers, while deep modules concentrate complexity so the interface itself carries enough information to proceed. The same principle applies to human callers.

On the consumption side, [the Angular/Zod piece](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) addresses what happens when an external API's actual response shape drifts from what client code assumes. Using Zod schemas inside a custom RxJS operator catches those mismatches at development time rather than as silent runtime failures, effectively enforcing a contract at the boundary.

[Conductor](/reading/2026-04/2026-04-30t231709-conductor) illustrates the same principle from the provider side: it wraps QuickBooks Desktop's qbXML and SOAP surface behind a fully-typed Python, Node.js, and REST API, so integrators interact with 130+ QuickBooks objects without touching the underlying protocol. The abstraction does the hiding; the typed surface does the communicating.

Component API design follows related logic. [Kobi Hari's piece on Angular composition](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs are the UI equivalent of a wide, shallow module: every caller must understand every option. Refactoring into directives and sub-components keeps each interface small and each concern encapsulated, which is the same depth-over-breadth tradeoff the other sources describe.
