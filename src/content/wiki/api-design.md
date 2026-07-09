---
title: API design
summary: >-
  Principles for designing interfaces — whether REST endpoints, component
  inputs, or module boundaries — that minimize what callers need to know while
  keeping implementations free to evolve.
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
compiled_at: '2026-07-09T23:17:51.765Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8043
    output_tokens: 822
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
  cost_usd: 0.036459
---
Good API design is fundamentally about managing the boundary between a caller and an implementation. The shape of that boundary determines how much cognitive load the caller carries and how freely the implementation can change.

One axis is surface area. [Go Monk's analysis of deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) frames this directly: a small interface hiding a large implementation is better than a large interface hiding a small one. Shallow interfaces leak complexity outward; deep ones absorb it. The same logic applies to Angular component design, where [Kobi Hari argues](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) that components bloated with dozens of inputs should shed concerns into directives and sub-components so each piece of the public surface stays coherent.

Another axis is type fidelity. [Angular's Signal Forms documentation](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) recommends specific types over general ones, avoiding `undefined` in form models, and drawing an explicit boundary between the form model and the domain model. That boundary does real work: it prevents transport-layer concerns from bleeding into business logic. Zod operationalizes this at runtime. [Daniel Sogl's guide to Angular API validation](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how schema validation with a custom RxJS operator catches unexpected backend shapes at development time rather than as silent runtime failures, and [Orval is noted](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) for generating fully-typed API clients from OpenAPI specs — pushing type contracts as close to the wire as possible.

Data format choices also shape what an API exposes. [The YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) is a concrete example of how implicit type coercion in a serialization format — `NO` parsing as `false` — creates silent misbehavior that propagates across every system consuming that format. Predictable, explicit types matter at the protocol level, not just in application code.

Abstraction quality matters too. [Conductor's wrapper over QuickBooks Desktop](/reading/2026-04/2026-04-30t231709-conductor) illustrates what a well-designed abstraction layer looks like in practice: it hides qbXML, SOAP, and the Web Connector behind a typed Python, Node.js, and REST surface, giving callers 130+ object types without exposing any of the underlying protocol complexity.

Finally, [the MCP-as-GUI argument](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) raises a context-specific version of the surface-area question: for AI agents that can write code, a heavyweight tool-based interface imposes token costs and composability constraints that a direct API call would avoid. The right API design depends on who the caller is.
