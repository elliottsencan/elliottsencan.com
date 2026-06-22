---
title: API design
summary: >-
  API design governs how software exposes functionality to callers, with
  principles spanning interface narrowness, type safety, schema validation, and
  the tradeoff between abstraction depth and surface complexity.
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
compiled_at: '2026-06-22T07:24:57.111Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7893
    output_tokens: 724
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
  cost_usd: 0.034539
---
Good API design is fundamentally about managing what callers need to know. The principle of deep modules, described in [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules), puts this directly: a small interface hiding a large implementation reduces cognitive load for both human developers and LLMs working with the codebase. Shallow modules that expose implementation detail create the opposite effect, spreading complexity outward.

The same logic applies to component APIs. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components accumulating dozens of inputs become unworkable; the fix is the Composite Components pattern, pushing concerns into directives and sub-components so each piece exposes only what it must.

Type safety is a recurring mechanism for enforcing API contracts. [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how Zod schema validation inside a custom RxJS operator catches unexpected backend response shapes at development time rather than at runtime. Zod also appears in [Seven Cool JavaScript Libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) as a general-purpose runtime type validation tool. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) takes this further at the product level, wrapping the qbXML and SOAP surface of QuickBooks Desktop behind a fully-typed Python, Node.js, and REST interface, abstracting away protocol complexity entirely.

Data format choices carry their own API risks. [YAML? That's Norway Problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) illustrates how implicit type coercion in YAML — where the string `NO` parses as boolean false — can silently corrupt configuration data passed between systems, and how the fix in the YAML 1.2 spec went unimplemented in major libraries for over a decade.

For AI agents specifically, [Your Agent Loves MCP as Much as You Love GUIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that MCP-style interfaces are analogous to GUIs: useful for humans but inefficient for agents that can consume raw APIs and scripts directly, avoiding token overhead and composability constraints. The implication is that API surface should be designed with the actual consumer in mind, whether that consumer is a human, a framework, or an autonomous agent.
