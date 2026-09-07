---
title: API design
summary: >-
  Good API design minimizes surface area, enforces contract clarity at
  boundaries, and hides implementation complexity — principles that apply
  equally to library interfaces, HTTP layers, component inputs, and AI agent
  tooling.
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
compiled_at: '2026-09-07T21:10:25.381Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 819
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
  cost_usd: 0.036909
---
The through-line across sources tagged here is that a narrow, well-typed interface is almost always preferable to a wide or implicit one, regardless of whether the "API" is a REST endpoint, a component prop list, a library export, or a module boundary.

The deep-modules argument makes this most explicit: small interfaces hiding large implementations reduce the cognitive load for both human readers and LLMs [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). A shallow module that exposes every internal detail shifts complexity outward onto every caller. The same principle appears in Angular component design, where components bloated with dozens of inputs should be refactored into composite structures so each concern stays encapsulated and the public API stays narrow [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to).

Contract enforcement at the boundary is the complementary concern. Zod schema validation applied to incoming API responses catches shape mismatches at development time rather than letting unexpected structures propagate silently into application state [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with). The same Zod library surfaces in a broader JS ecosystem survey as a standard tool for this kind of boundary hardening [Seven Cool JavaScript Libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about), and Zod's own engineering work on memory efficiency shows that a good API contract need not carry heavy runtime cost [Reducing Zod's Memory Footprint](/reading/2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude).

Serialization format matters too. YAML's Norway problem, where the string "NO" parses as boolean false in many parsers, is a concrete example of what happens when an API's wire format has ambiguous type coercion rules baked in [YAML? That's Norway Problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem). Predictable parsing is a prerequisite for a trustworthy contract.

At a higher level of abstraction, Conductor's typed wrapper over QuickBooks Desktop's qbXML and SOAP stack illustrates the value of hiding a legacy or complex protocol behind a clean, versioned surface [Conductor](/reading/2026-04/2026-04-30t231709-conductor). And the MCP-as-GUI framing argues that protocol wrappers designed for human discoverability impose real costs — token overhead, reduced composability — when the consumer is an automated agent that could instead call typed APIs directly [Your Agent Loves MCP](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis).

Good API design, across all these contexts, means being deliberate about what is exposed, enforcing types at boundaries, and keeping the interface stable while allowing the implementation to change freely underneath.
