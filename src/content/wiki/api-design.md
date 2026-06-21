---
title: API design
summary: >-
  API design concerns how interfaces expose functionality to callers, with
  recurring pressure toward small surfaces, strong contracts, and deliberate
  separation between what a module reveals and what it hides.
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
compiled_at: '2026-06-21T18:36:47.666Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7893
    output_tokens: 845
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
  cost_usd: 0.036354
---
The surface a module exposes to its callers is one of the most consequential decisions in software. Expose too much and every internal change risks breaking downstream consumers; expose too little and callers work around the interface rather than through it.

[Go Monk's piece on deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) frames this as the central tension directly: a deep module has a small interface over a large implementation, and that asymmetry is what reduces complexity system-wide. A shallow module with a sprawling interface shifts cognitive load onto every caller and makes the codebase harder for both humans and LLMs to reason about.

The same instinct appears in UI component design. [Kobi Hari's argument against bloated Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) is essentially an API design argument: a component accepting dozens of inputs has a wide, unpredictable surface. Refactoring toward the Composite Components pattern moves concerns into directives and sub-components so each unit stays focused and the public contract stays narrow.

Strong contracts also require validation. [Daniel Sogl's Zod-with-Angular approach](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how runtime schema validation catches cases where a backend response deviates from the expected shape, surfacing contract violations during development rather than as silent runtime errors. Zod itself appears in [Neciu Dan's JS library roundup](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) as a general-purpose schema validation tool worth reaching for at any layer that consumes external data.

Serialization formats can introduce subtle contract breakage that is easy to overlook. [The YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) is a precise example: the string "NO" silently coerces to a boolean in YAML 1.1, a parsing behavior that persists in widely-used libraries even after the spec fixed it in v1.2. Any API or configuration surface that relies on implicit type coercion inherits this fragility.

[Conductor's typed wrapper over QuickBooks Desktop](/reading/2026-04/2026-04-30t231709-conductor) illustrates the value of abstraction at the integration layer. The underlying protocol is SOAP-based qbXML delivered through the Web Connector, a surface hostile to modern tooling. The typed Python, Node.js, and REST layer hides all of that, giving callers a clean contract over 130-plus object types without exposing the underlying complexity.

Finally, [Ajeesh Mohan's argument about MCP versus direct APIs for AI agents](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) touches on audience-appropriateness as an API design concern. MCP is useful when the consumer is a human or a system that needs structured discovery; for agents that can write code, the abstraction layer adds token cost and composability friction without adding clarity. The right interface depends on who is calling.
