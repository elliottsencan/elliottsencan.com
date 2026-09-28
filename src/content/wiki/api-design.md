---
title: API design
summary: >-
  Principles and patterns for shaping interfaces — whether REST endpoints,
  component inputs, library exports, or module boundaries — so they are minimal,
  typed, and honest about the contracts they expose.
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
compiled_at: '2026-09-28T22:59:44.792Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 866
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
  cost_usd: 0.037614
---
Good API design is fundamentally about contracts: what a caller can expect, what variants it must handle, and how much complexity the interface forces the caller to absorb. Several recurring principles emerge across these sources.

The case for small, stable surfaces is made most directly in the argument that deep modules — small interfaces hiding large implementations — reduce complexity for both humans and LLMs [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). A narrow interface lets callers ignore internal detail; a wide one leaks it. The same logic appears in Angular component design: components bloated with dozens of inputs should be refactored into composites where each concern is encapsulated and the public surface shrinks [A Better way to build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to).

Type specificity is a related discipline. Angular's Signal Forms documentation argues that form models should avoid `undefined`, prefer static structure, and use explicit types so the shape of data is unambiguous at the boundary between form and domain [Form Model Design](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms). Zod extends this to runtime: schema validation with a custom RxJS operator catches unexpected backend response shapes at development time before they cause silent failures in production [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with). Orval and Zod together, noted in a roundup of JS libraries, let teams generate typed API clients directly from OpenAPI specs [Seven Cool JavaScript Libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about).

Abstraction quality matters as much as surface size. Conductor wraps QuickBooks Desktop's qbXML/SOAP layer behind a typed REST and SDK interface — the value is precisely that callers never touch the underlying protocol [Conductor](/reading/2026-04/2026-04-30t231709-conductor). The unicode-animations library takes the same approach at a smaller scale: raw frame data and a two-field `Spinner` interface hide all timing logic, so consumers just destructure `frames` and `interval` [unicode-animations](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations).

Format choices have correctness consequences. YAML's Norway problem — where `NO` parses as `false` — is a concrete example of a serialization format making implicit type coercions that violate caller expectations, a bug that persisted across libraries for over a decade after the spec was fixed [YAML? That's Norway Problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem).

Finally, the MCP discussion reframes what counts as an API surface for AI agents: MCP functions as a GUI-like interface useful for human-readable tool discovery, but agents that can write code are better served by raw APIs and scripts that avoid token overhead and composability friction [Your agent loves MCP as much as you love GUIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis).
