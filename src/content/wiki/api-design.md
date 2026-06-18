---
title: API design
summary: >-
  Good API design minimizes surface area, validates contracts at boundaries, and
  hides implementation complexity behind stable interfaces — principles that
  apply equally to REST endpoints, component inputs, module boundaries, and data
  serialization formats.
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
aliases:
  - sdk
compiled_at: '2026-06-18T23:03:00.549Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8063
    output_tokens: 735
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
  cost_usd: 0.035214
---
The core tension in API design is between expressiveness and simplicity. The more an API exposes, the harder it becomes to reason about, maintain, and consume correctly. [Go Monk's analysis of deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) frames this directly: a small interface hiding a large implementation reduces cognitive load for callers and makes the system easier for both humans and LLMs to evolve. Shallow modules — where interface complexity roughly matches implementation complexity — provide no abstraction value.

The same principle surfaces in component design. [Kobi Hari's argument against bloated Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) treats dozens of component inputs as an API smell, addressable by decomposing into directives and sub-components so each unit's public contract stays narrow and each concern stays encapsulated.

At the data boundary, API design intersects with contract validation. [Daniel Sogl's Zod-with-Angular approach](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) and the [JavaScript libraries survey's coverage of Zod and Orval](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) both treat schema validation as a first-class part of API consumption — catching shape mismatches between what a backend promises and what it actually returns before they become runtime failures.

Serialization format choices carry their own hidden API surface. [The YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) illustrates how a format's implicit type coercion rules become part of the API contract whether or not the designer intended them, and how library implementations lagging behind spec corrections can leave that contract broken for years.

Abstracting away legacy protocols is a distinct form of API design. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) wraps QuickBooks Desktop's qbXML and SOAP interface behind a typed Python, Node.js, and REST layer — the abstraction's value is precisely that callers never touch the underlying protocol complexity.

Finally, [Ajeesh Mohan's MCP-as-GUI argument](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) raises the question of who the API consumer is: interfaces designed for human convenience add overhead when the consumer is a program. APIs intended for agent consumption should favor directness and composability over the affordances that make GUIs legible to people.
