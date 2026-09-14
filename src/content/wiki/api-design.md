---
title: API design
summary: >-
  API design concerns how interfaces expose functionality to callers, balancing
  surface area, type safety, and implementation depth across everything from
  REST endpoints to component inputs and library exports.
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
compiled_at: '2026-09-14T21:31:40.449Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 748
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
  cost_usd: 0.035844
---
Good API design consistently resolves a single tension: how much to expose versus how much to hide. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes this explicit, arguing that small interfaces hiding large implementations reduce cognitive load for both humans and LLMs. A wide, shallow interface forces callers to understand internals; a narrow, deep one lets them ignore them.

The same principle shows up in component design. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs are surface-area failures: the Composite Components pattern moves concerns into directives and sub-components so each boundary stays narrow and purposeful.

Type safety is the other recurring theme. [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how Zod schema validation catches unexpected backend response shapes at development time rather than letting them corrupt runtime state. [Seven Cool JavaScript Libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) surfaces Orval, which generates typed API clients directly from OpenAPI specs, and Zod again as a runtime boundary between untrusted external data and internal types. The value in both cases is the same: the API contract is made explicit and machine-checkable rather than implicit and discovered through failure.

Format choices carry hidden costs. [YAML? That's Norway Problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) traces how YAML's implicit type coercion turns the country code NO into a boolean false, a design decision baked into parsers that still has not been fully corrected decades later. Configuration APIs that rely on implicit typing create bugs that are invisible until a particular value triggers the coercion.

At the infrastructure layer, [Conductor](/reading/2026-04/2026-04-30t231709-conductor) illustrates what a well-designed abstraction buys: by wrapping QuickBooks Desktop's qbXML and SOAP interfaces in a typed Python/Node.js/REST layer, it makes 130+ object types accessible without requiring callers to know anything about the underlying protocol. The interface hides complexity proportional to the complexity it replaces.

[Your agent loves MCP as much as you love GUIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) adds a consumer-side angle: for AI agents, APIs are preferable to GUI-mediated protocols like MCP because they avoid token overhead and compose more naturally. The right API design depends partly on who the caller is.
