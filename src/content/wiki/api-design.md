---
title: API design
summary: >-
  The shape of an API boundary matters as much as the logic behind it: sources
  cover runtime schema validation for HTTP responses, typed SDK abstraction over
  legacy protocols, and component input APIs that stay narrow through
  composition.
sources:
  - >-
    2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with
  - 2026-04/2026-04-30t231709-conductor
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
compiled_at: '2026-05-04T04:07:07.458Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2549
    output_tokens: 471
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
  cost_usd: 0.014712
---
API design spans the contract between a producer and its consumers, and three angles emerge across these sources: validating what arrives over the wire, abstracting ugly protocols behind clean interfaces, and keeping component-level input surfaces from bloating.

On the validation side, [Angular API response management with Zod](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) argues that trusting backend responses at runtime is a mistake. Even when types look correct at compile time, a backend shape change silently breaks the app. The fix is pairing Zod schemas with a custom RxJS operator so unexpected response shapes surface at development time rather than in production.

[Conductor](/reading/2026-04/2026-04-30t231709-conductor) takes a different angle: the API being designed is an abstraction over QuickBooks Desktop, a system that communicates via qbXML and SOAP. Conductor exposes 130+ QuickBooks objects through a fully-typed Python, Node.js, and REST surface, hiding the Web Connector entirely. The design decision here is that the consumer should never have to know the underlying protocol exists.

At the component level, [Kobi Hari's piece on Angular composition](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same principle inward: a component with dozens of inputs is a leaky, hard-to-maintain API. The Composite Components pattern moves features into directives and sub-components so each concern is encapsulated and the public input surface stays narrow. A good component API, like a good HTTP API, exposes only what callers actually need.
