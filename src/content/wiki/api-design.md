---
title: API design
summary: >-
  Good API design minimizes surface area, validates contracts at boundaries, and
  hides implementation complexity behind stable interfaces — principles that
  apply equally to HTTP endpoints, component inputs, and module boundaries.
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
compiled_at: '2026-07-06T00:10:00.072Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8043
    output_tokens: 752
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
  cost_usd: 0.035409
---
The core tension in API design is between expressiveness and simplicity. A surface that exposes too much forces callers to understand internals; one that exposes too little becomes a bottleneck. [Go Monk's case for deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) frames this directly: small interfaces hiding large implementations reduce the cognitive load on both human readers and LLMs navigating a codebase. The same logic applies whether the boundary is a Go package, a REST endpoint, or a UI component.

At the component level, [Kobi Hari's critique of bloated Angular inputs](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components accumulating dozens of props become difficult to compose and reason about. Refactoring toward the Composite Components pattern keeps each concern encapsulated and shrinks the public API to what callers actually need.

Contract validation at the boundary is a related discipline. [Daniel Sogl's Zod-in-Angular approach](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time rather than letting them propagate as runtime errors. Orval, noted in [Neciu Dan's JS library roundup](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about), takes this further by generating typed clients directly from OpenAPI specs, making the contract machine-checkable end to end.

Serialization formats introduce their own contract hazards. [The lab174 YAML post](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) illustrates how a spec ambiguity — country code NO parsing as boolean false — persisted across popular libraries for over a decade after the spec fixed it, because implementations lagged. API boundaries that rely on YAML carry that risk unless parsers are pinned to v1.2-compliant libraries.

Abstraction layer design also matters for who or what consumes the API. [Ajeesh Mohan's MCP-as-GUI argument](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) notes that protocol layers designed for human-readable interaction impose token costs and composability friction when AI agents consume them; agents are better served by direct API and scripting access. Conductor's approach — [a fully-typed Python and Node.js layer over QuickBooks Desktop's qbXML/SOAP stack](/reading/2026-04/2026-04-30t231709-conductor) — shows the opposite move working well: wrapping an opaque legacy protocol in a clean typed interface so callers never touch the underlying complexity.
