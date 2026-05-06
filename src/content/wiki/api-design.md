---
title: API design
summary: >-
  API design concerns the contracts between software components: their shape,
  type guarantees, and how much complexity they expose. Sources here address
  runtime validation, abstraction depth, component input surfaces, and why clean
  interfaces matter for AI-assisted development.
sources:
  - >-
    2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with
  - 2026-04/2026-04-30t231709-conductor
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
compiled_at: '2026-05-06T04:03:24.027Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2757
    output_tokens: 568
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
  cost_usd: 0.016791
---
A well-designed API hides the right amount of complexity and exposes a surface that callers can use without needing to understand the internals. That principle appears across several distinct contexts in these sources.

On the boundary between a frontend and a backend, the contract is often assumed rather than enforced. [Sogl's piece on Angular and Zod](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) addresses this directly: a custom RxJS operator runs Zod schema validation against HTTP responses at dev time, surfacing unexpected shapes before they propagate into component state. The API contract becomes executable, not just documented.

The same instinct appears at the product level. [Conductor](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) wraps QuickBooks Desktop's qbXML and SOAP surface behind a fully-typed REST and SDK interface, so developers interact with clean, versioned objects rather than a legacy protocol. Abstracting away the implementation is the product.

Within a codebase, component input lists function as internal APIs. [Kobi Hari argues](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) that Angular components bloated with dozens of inputs are the UI equivalent of a leaky abstraction: callers must know too much, and the component cannot evolve without breaking its consumers. The Composite Components pattern he proposes relocates concerns into directives and sub-components, keeping each public surface small.

The AI-tooling angle sharpens the stakes. [Go Monk's piece on deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) observes that LLMs perform better when APIs are deep rather than shallow: a narrow interface over rich behavior lets the model reason locally, while leaky abstractions force it to chase context across layers. Good API design has always aided human readers; it turns out to aid AI ones too.
