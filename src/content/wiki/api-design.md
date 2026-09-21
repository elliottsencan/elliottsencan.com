---
title: API design
summary: >-
  Good API design hides complexity behind narrow interfaces, enforces contracts
  at boundaries, and keeps consumers decoupled from implementation details,
  themes that run across schema validation, module depth, and surface-area
  reduction.
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
compiled_at: '2026-09-21T21:45:49.219Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 842
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
  cost_usd: 0.037254
---
A recurring pressure in software development is the gap between what an API exposes and what it conceals. [Go Monk's argument for deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes this explicit: a small interface hiding a large implementation reduces the cognitive surface that both humans and LLMs must hold in mind, and shallow modules that leak their internals compound complexity across every consumer.

Contract enforcement at the boundary is the other constant theme. [Daniel Sogl's Angular guide](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) demonstrates using Zod with a custom RxJS operator to validate backend response shapes at development time, catching drift between the documented API and actual payloads before it surfaces as a runtime error. Zod itself gets heavier treatment in [Colin McDonnell's memory-footprint post](/reading/2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude), which shows how per-schema allocation costs matter at scale, and in the [JavaScript libraries roundup](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about), which notes Orval as a tool for generating typed clients directly from OpenAPI specs.

Surface-area discipline shows up on the component side too. [Kobi Hari's Angular composition piece](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs are an API design failure; the fix is decomposing into directives and sub-components so each unit exposes only what its callers need. The [Angular Signal Forms docs](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) apply the same logic to form models, recommending type specificity and explicit translation layers between form and domain representations rather than letting internal shapes leak outward.

Abstraction layering is equally visible at the infrastructure level. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) wraps QuickBooks Desktop's qbXML and SOAP stack behind a typed REST and SDK surface, trading the full complexity of the legacy protocol for a narrow, versioned interface developers can reason about. [Ajeesh Mohan's MCP piece](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) inverts the question: when an agent can write code, routing it through a GUI-style protocol layer wastes tokens and breaks composability, so the right abstraction is direct API and script access.

Data format choices sit beneath all of this. The [YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) illustrates what happens when a serialization format's implicit type coercion produces surprising values at parse time; library implementations lagging years behind spec fixes mean the API contract between config author and parser is subtly broken for a large share of real-world toolchains.
