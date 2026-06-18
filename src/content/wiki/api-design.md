---
title: API design
summary: >-
  API design spans both the surface contracts between systems and the internal
  module interfaces within a codebase, with themes of type safety, validation,
  abstraction depth, and composability appearing across libraries, frameworks,
  and backend integrations.
sources:
  - >-
    2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with
  - 2026-04/2026-04-30t231709-conductor
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
  - >-
    2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about
  - 2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm
  - 2026-06/2026-06-17t075738-gunnargray-devunicode-animations
compiled_at: '2026-06-18T21:41:36.942Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7425
    output_tokens: 576
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
  cost_usd: 0.030915
---
Good API design balances expressiveness with constraint. A narrow, well-typed surface forces callers to interact correctly; a bloated or leaky one shifts that burden onto every consumer.

Runtime validation is one place where that principle becomes concrete. [Angular with Zod](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) illustrates the cost of trusting backend shapes implicitly: unexpected fields or missing properties propagate silently until they surface as UI bugs. Using Zod schemas inside a custom RxJS operator catches contract violations at the boundary, failing fast in development rather than degrading quietly in production. Zod also appears in a broader JS library roundup [alongside Orval](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about), which generates fully-typed API clients from OpenAPI specs, pushing the contract definition upstream into a schema that both server and client agree on.

Abstraction depth matters on the module side too. The argument in [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) is that interfaces hiding complexity behind simple surfaces serve both human and AI consumers better than shallow ones that expose implementation details. A deep module requires callers to understand less while accomplishing more.

The same logic applies at the component level. [Composite Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argue that components with dozens of inputs are a design smell: each input is a point of contract, and too many of them make the API brittle. Distributing behavior into directives and sub-components keeps each surface small.

[Conductor](/reading/2026-04/2026-04-30t231709-conductor) shows what good abstraction looks like at the integration layer. QuickBooks Desktop exposes qbXML and SOAP; Conductor replaces that with a typed REST and SDK interface covering 130+ objects. The underlying protocol complexity disappears entirely behind a surface designed for modern tooling.
