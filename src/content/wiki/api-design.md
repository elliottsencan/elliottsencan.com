---
title: API design
summary: >-
  Good API design minimizes surface area, enforces strong contracts, and hides
  implementation complexity; sources here approach that principle from schema
  validation, module depth, component boundaries, and data-format pitfalls.
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
compiled_at: '2026-11-24T03:51:55.631Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 759
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
  cost_usd: 0.036009
---
The core tension in API design is between expressiveness and constraint. A wide surface area feels flexible until it becomes a maintenance burden; a narrow, well-typed interface forces callers into correct usage and makes the implementation free to change underneath. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes this case directly: small interfaces hiding large implementations reduce complexity for both human readers and LLMs, while shallow modules merely redistribute it.

Type-level contracts are one of the most practical levers. [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how pairing Zod schema validation with a custom RxJS operator catches unexpected backend response shapes at development time rather than at runtime. Zod itself earns repeated attention: [Seven Cool JavaScript Libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) highlights it as a standout in schema validation, and [Zod 4.5's memory work](/reading/2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude) shows the library eating its own dogma by tightening its internal design to cut per-schema heap usage up to 10x.

Component APIs face the same pressures. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs are a design smell: the Composite Components pattern moves concerns into directives and sub-components so each piece exposes only what it owns. Angular's own [Signal Forms documentation](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) reinforces this with guidance on type specificity, avoiding undefined, and cleanly translating between form and domain models.

Data-format choices can quietly undermine an otherwise sound API. [YAML's Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) illustrates how the country code NO parses as false in many YAML libraries still using the 1.1 spec, a silent type coercion that corrupts data at the boundary between systems.

At the infrastructure layer, [Conductor](/reading/2026-04/2026-04-30t231709-conductor) demonstrates what a well-designed abstraction looks like in practice: a fully-typed Python, Node.js, and REST layer over QuickBooks Desktop that hides qbXML, SOAP, and the Web Connector entirely, exposing instead a clean interface over 130+ object types. That is deep-module thinking applied at service scale.
