---
title: API design
summary: >-
  Good API design hides complexity behind clean interfaces; sources here address
  runtime contract validation, typed abstraction over legacy protocols,
  component surface minimization, and how deep modules aid AI-assisted
  development.
sources:
  - >-
    2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with
  - 2026-04/2026-04-30t231709-conductor
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
compiled_at: '2026-05-06T03:45:13.271Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2757
    output_tokens: 630
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
  cost_usd: 0.017721
---
API design concerns the shape and contract of any interface between software components, whether a REST endpoint, a component's input surface, or a module boundary. The sources collected here approach that concern from several directions.

Runtime validation is one underappreciated axis. Even a well-documented API contract drifts; backends silently change response shapes and frontend code breaks in confusing ways. Using Zod schemas with a custom RxJS operator in Angular, as described in [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with), surfaces those contract violations at development time rather than in production, turning a vague runtime error into a precise schema mismatch.

Abstraction quality is another axis. [Conductor](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) — wait, to be precise: [Conductor](/reading/2026-04/2026-04-30t231709-conductor) wraps QuickBooks Desktop's qbXML and SOAP protocols behind a fully-typed REST and SDK surface. The old protocol is not simplified; it is hidden. Callers get 130+ object types without ever touching the Web Connector. That is the core value proposition of a deep interface: complexity absorbed by the implementer, not pushed onto the consumer.

The same principle applies at the component level. [Kobi Hari's argument](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) against Angular components with dozens of inputs is structurally identical: a wide input surface signals that complexity has leaked outward. The Composite Components pattern moves behavior into directives and sub-components, shrinking the public API and keeping each concern encapsulated.

[AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) adds a newer consideration: LLM coding tools perform better when APIs are deep. Shallow, leaky abstractions force a model to reason across many layers to understand what a function does or how to call it correctly. Deep modules, which hide implementation behind narrow interfaces, reduce the context a model must hold, making AI-assisted work more reliable. Good API design was already a human concern; it turns out to be a machine concern too.
