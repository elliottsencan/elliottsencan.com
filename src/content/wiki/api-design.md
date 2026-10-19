---
title: API design
summary: >-
  Good API design favors small surfaces hiding large implementations, runtime
  validation of contract shapes, and clean boundaries between domain models — a
  theme running through sources on schema validation, module depth, component
  interfaces, and wrapper libraries.
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
compiled_at: '2026-10-19T22:03:25.818Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 887
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
  cost_usd: 0.037929
---
A recurring insight across several sources is that the best APIs expose as little as possible. [Go Monk's piece on deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) frames this directly: a small interface over a large implementation reduces cognitive load for both human developers and LLMs navigating a codebase. Shallow interfaces, by contrast, leak complexity outward and force callers to reason about internals. The same logic appears in component design: [Kobi Hari's argument against bloated Angular inputs](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) holds that dozens of props on a single component signal a missing boundary, and that the Composite Components pattern restores clean, encapsulated interfaces.

Runtime contract validation is a second consistent theme. [Daniel Sogl's Zod-plus-RxJS approach in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches shape mismatches between what a backend promises and what it actually sends, surfacing them at development time rather than as silent runtime failures. Zod itself appears as a recommended tool in a broader JS library roundup [by Neciu Dan](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) for exactly this reason. The performance cost of schema objects is real, though; [Colin McDonnell's Zod 4.5 post](/reading/2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude) shows that eagerly allocating methods per schema instance balloons heap usage, and that memoizing prototype getters cut it by an order of magnitude.

Model translation is a subtler API concern. [Angular's Signal Forms documentation](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) distinguishes between a form model and a domain model, arguing that collapsing them produces type imprecision and structural rigidity. Keeping them separate and translating explicitly at the boundary is the same instinct that drives wrapper libraries like [Conductor](/reading/2026-04/2026-04-30t231709-conductor), which hides qbXML and SOAP behind a typed Python, Node.js, and REST surface so callers never touch the legacy protocol directly.

Format choices also affect API reliability. [The YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) is a case study in implicit type coercion inside a serialization format: the country code `NO` silently parses as boolean false in YAML 1.1, and popular libraries still exhibit the bug years after the spec fixed it. Explicit, typed formats reduce this class of error at the contract boundary.

Finally, [Ajeesh Mohan's argument that MCP is a GUI for agents](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) adds an audience-specificity dimension: the right API surface depends on who or what is calling it. A tool abstraction optimized for human discoverability adds token overhead when consumed by an agent that could call a raw API directly. Good design accounts for the caller's actual capabilities.
