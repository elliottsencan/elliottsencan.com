---
title: API design
summary: >-
  API design shapes how software components contract with each other; sources
  here treat it through schema validation, module depth, component boundaries,
  and the tradeoffs of abstraction layers.
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
compiled_at: '2026-10-26T22:21:46.785Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 849
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
  cost_usd: 0.037359
---
A well-designed API is one where the interface is narrow and the implementation is deep. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes this explicit, arguing that small interfaces hiding large implementations reduce complexity for both human developers and LLMs navigating a codebase. The corollary is that a shallow interface — one where the surface area grows proportionally to the implementation — imposes cognitive cost on every caller.

Type safety at the boundary between systems is a recurring theme. [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) demonstrates using Zod schema validation with a custom RxJS operator in Angular to catch mismatched backend response shapes at development time rather than at runtime. The same Zod library appears in a broader JS library roundup [Seven Cool JavaScript Libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) as a general-purpose schema tool, and Zod's own engineering work on [reducing memory footprint](/reading/2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude) shows the cost of schema objects at scale and how memoizing prototype getters cut per-schema heap usage by up to 10x.

Data format choices carry their own hazards. [YAML's Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) is a case study in how a serialization format's implicit type coercions — parsing `NO` as `false` — can produce silent, hard-to-trace bugs in any API that relies on that format, even years after the spec was corrected.

Component API design in UI frameworks follows the same depth-over-breadth principle. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues against components that accumulate dozens of inputs, proposing the Composite Components pattern to keep each piece's public surface small and each concern encapsulated. Angular's own [Signal Forms documentation](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) reinforces this with guidance on type specificity and separating form models from domain models.

At a higher level of abstraction, [Conductor](/reading/2026-04/2026-04-30t231709-conductor) illustrates what a well-designed API layer can hide: a fully-typed REST and SDK interface that absorbs the entirety of QuickBooks Desktop's qbXML and SOAP complexity, giving callers a clean surface over 130+ object types. Meanwhile, [Your agent loves MCP](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) complicates the abstraction question for AI consumers, arguing that high-level protocol layers like MCP carry token costs that a code-capable agent could avoid by working directly with lower-level APIs and scripts.
