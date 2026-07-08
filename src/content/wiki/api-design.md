---
title: API design
summary: >-
  API design shapes how well software components can be composed, validated, and
  understood; sources here address surface area, schema correctness, deep module
  principles, and the trade-offs that accumulate when interfaces grow without
  discipline.
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
compiled_at: '2026-07-08T00:10:18.043Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8043
    output_tokens: 799
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
  cost_usd: 0.036114
---
Good API design is primarily a question of surface area. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues for deep modules: small, stable interfaces that hide large implementations. The contrast with shallow modules, which expose nearly as much complexity as they contain, shows why interface discipline matters for both human readers and LLMs trying to reason about a codebase.

Runtime surprises from unexpected backend shapes are a direct cost of under-specified contracts. [Daniel Sogl](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) addresses this with Zod schema validation inside a custom RxJS operator, catching response mismatches at development time rather than in production. The same Zod approach appears in [Neciu Dan's library roundup](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about), where Orval is also noted for generating typed clients directly from OpenAPI specs, pushing contract enforcement earlier still.

Interface bloat compounds the problem at the component level. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) shows how Angular components accumulate dozens of inputs over time, and argues that refactoring toward the Composite Components pattern, distributing concerns into directives and sub-components, keeps each public API narrow and comprehensible. Angular's own Signal Forms documentation makes a related point about [form model design](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms): prefer type specificity, avoid undefined, and keep a clear translation layer between the form model and the domain model.

Data format choices can silently corrupt an API's contracts. The [YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) is an instructive case: the country code NO parses as a boolean false in YAML 1.1, a spec-level decision that persists in widely-used libraries despite being corrected in YAML 1.2. Serialization format semantics are part of the API contract whether they are documented or not.

[Conductor](/reading/2026-04/2026-04-30t231709-conductor) illustrates what a well-designed abstraction layer looks like in practice: a typed Python, Node.js, and REST surface over QuickBooks Desktop's qbXML and SOAP internals, turning a hostile legacy protocol into a clean, modern interface. The value is entirely in what the abstraction hides. That same logic runs through [Ajeesh Mohan's argument](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) that AI agents should prefer APIs and scripts over MCP's higher-level GUI-style interface when composability and token efficiency matter.
