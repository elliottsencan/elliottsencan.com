---
title: API design
summary: >-
  API design shapes how software exposes its capabilities, with recurring
  tensions between surface size and hiding implementation complexity, type
  safety at boundaries, and matching an API's abstraction level to its consumer.
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
compiled_at: '2026-06-21T20:20:22.086Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7893
    output_tokens: 807
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
  cost_usd: 0.035784
---
A well-designed API hides as much as possible while exposing just enough. [Go Monk's piece on deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) frames this directly: small interfaces hiding large implementations reduce cognitive load for both humans and LLMs navigating a codebase. The alternative, shallow modules with wide surfaces, forces callers to understand implementation details they should never need to touch.

The same principle surfaces at the component level. [Kobi Hari's argument against bloated Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) is that dozens of inputs on a single component constitute a design failure: each input is a published contract, and the accumulation creates a surface that is hard to evolve without breaking callers. Moving concerns into directives and sub-components keeps each contract narrow.

Type safety is the other axis. [Daniel Sogl's Zod-in-Angular pattern](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) addresses the gap between what a backend claims to return and what it actually returns at runtime; validating the schema boundary at dev time turns silent shape mismatches into explicit errors early. The broader JS ecosystem treats this as solved infrastructure: [Neciu Dan's library roundup](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) includes Zod and Orval, a tool that generates typed clients directly from OpenAPI specs, tightening the contract between producer and consumer without manual maintenance.

Abstraction level matters as much as type safety. [Conductor's API over QuickBooks Desktop](/reading/2026-04/2026-04-30t231709-conductor) demonstrates the value of wrapping a hostile integration surface, qbXML and SOAP over a Web Connector, behind a clean REST and typed SDK layer. The complexity doesn't disappear; it gets pushed below the API boundary where most callers never need to see it.

Serialization formats can undermine an otherwise sound design. [The YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) is a concrete case: the country code NO parses as boolean false in YAML 1.1, and widely-used libraries still exhibit this behavior despite the spec fix landing in YAML 1.2 over a decade ago. An API's contract is only as reliable as the parsing layer beneath it.

Finally, the right abstraction depends on the consumer. [The MCP-as-GUI argument](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) contends that MCP-style tool interfaces are appropriate for humans building integrations but wasteful for AI agents that can call code directly, incurring token costs and composability overhead for no benefit. API design choices are not universal; the consumer's capabilities and constraints determine where the right boundary sits.
