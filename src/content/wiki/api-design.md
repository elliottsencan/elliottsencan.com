---
title: API design
summary: >-
  How APIs are structured shapes the complexity developers face: clean, narrow
  interfaces with deep implementations reduce cognitive load, while schema
  validation, type specificity, and module boundaries determine how well an API
  holds up at runtime.
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
compiled_at: '2026-10-13T00:11:33.145Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 761
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
  cost_usd: 0.036039
---
A recurring theme across sources is the tension between what an API exposes and what it hides. [Go Monk's piece on deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues directly for this: a small interface concealing a large implementation reduces the complexity a caller must reason about, contrasting verbose shallow Go patterns against concise deep ones. The same principle surfaces in component API design. [Kobi Hari's Angular post](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) treats a component bloated with dozens of inputs as a design failure, recommending the Composite Components pattern so each concern is encapsulated and the exposed surface stays minimal.

Type specificity and runtime validation are the other axis. [Daniel Sogl's Zod-plus-RxJS approach in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) addresses what happens when a backend response deviates from the expected shape: catching that mismatch at dev time, via schema validation, prevents silent runtime failures. The [Angular Signal Forms documentation](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) extends this to form models, advising against `undefined` and favoring precise types that distinguish form-layer concerns from domain-layer ones. [Zod 4.5's memory work](/reading/2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude) shows the library itself applying API design discipline internally: lazily memoizing prototype getters rather than eagerly allocating bound methods, cutting heap usage without changing the public interface.

Abstraction boundaries also define what a good API is wrapping. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) is a practical example: it hides qbXML, SOAP, and the QuickBooks Web Connector behind a fully-typed Python, Node.js, and REST surface, so callers get real-time read/write access to QuickBooks Desktop without touching the underlying protocol. That wrapper pattern mirrors the deep-module argument at the product level.

The MCP discussion adds a different angle. [Ajeesh Mohan's piece](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that MCP functions like a GUI for AI agents — useful for non-developers but wasteful for agents capable of calling APIs directly, since the extra abstraction layer burns tokens and limits composability. The implication is that the right API surface depends on who or what is consuming it: humans benefit from guardrails and convenience, while programmatic consumers benefit from thinner, more direct interfaces.
