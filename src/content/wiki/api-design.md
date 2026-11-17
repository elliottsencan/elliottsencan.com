---
title: API design
summary: >-
  Good API design minimizes surface area while maximizing capability — a
  principle that runs from module boundaries and schema validation to component
  interfaces and the choice of raw APIs over abstraction layers for capable
  consumers.
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
compiled_at: '2026-11-17T01:37:57.045Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 732
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
  cost_usd: 0.035604
---
The clearest statement of good API design across these sources comes from [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules): small interfaces hiding large implementations reduce complexity for both human developers and LLMs. A wide, shallow interface forces callers to understand internals; a narrow, deep one encapsulates them. This principle shows up repeatedly in different domains.

In frontend component design, [From Inputs to Composition](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) makes the same argument at the component level: an Angular component with dozens of inputs is a shallow, sprawling API that leaks responsibility. Refactoring those inputs into directives and sub-components narrows the interface while preserving capability.

Schema design is another surface where interface choices compound. [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) recommends type specificity and avoiding undefined in form models, keeping the contract between layers explicit. [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) and [Seven Cool JS Libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) both point to Zod as a practical tool for enforcing those contracts at the boundary between a client and an external API, catching shape mismatches at dev time.

The cost of a leaky or implicit contract is illustrated by [YAML's Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem): a serialization format that silently coerces `NO` to `false` violates caller expectations in ways that persist for decades across implementations, even after the spec fixes the issue.

At a higher level, [Your agent loves MCP](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that abstraction layers designed for one class of consumer become liabilities for another. MCP is a reasonable interface for humans or non-technical agents, but agents capable of writing code should use raw APIs and scripts directly to avoid token overhead and composability problems. The right API depends on who is calling it.

[Conductor](/reading/2026-04/2026-04-30t231709-conductor) is a concrete example of wrapping a hostile legacy interface (qbXML over SOAP) in a typed, modern API surface, making 130+ QuickBooks Desktop object types accessible without the caller needing to understand the underlying protocol.
