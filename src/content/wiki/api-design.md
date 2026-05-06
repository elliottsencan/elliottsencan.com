---
title: API design
summary: >-
  Clean API design prioritizes hiding complexity behind narrow, stable
  interfaces; sources here address runtime validation of response shapes, typed
  abstractions over legacy protocols, component input hygiene, and why deep
  modules help both humans and LLMs reason about code.
sources:
  - >-
    2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with
  - 2026-04/2026-04-30t231709-conductor
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
compiled_at: '2026-05-06T04:11:30.581Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2757
    output_tokens: 642
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
  cost_usd: 0.017901
---
Good API design is fundamentally about what you expose and what you hide. Four sources here approach that principle from different angles, and they converge on the same core idea: a well-designed interface absorbs complexity internally rather than leaking it to callers.

[AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) frames this most directly, drawing on John Ousterhout's notion of the deep module: a small, stable surface backed by significant implementation depth. The argument is that shallow abstractions, ones where the interface maps almost one-to-one to internal details, force callers to reason about things they should not need to know. That cost is paid by human developers and, increasingly, by LLMs trying to navigate a codebase.

[Conductor](/reading/2026-04/2026-04-30t231709-conductor) is a practical illustration of the same principle at the integration layer. QuickBooks Desktop exposes qbXML and SOAP over a Web Connector; Conductor wraps all of that behind a typed, real-time REST and SDK surface covering 130+ objects. Callers never touch the underlying protocol. The messy reality is hidden; the interface is narrow.

On the consumer side, [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) addresses what happens when a backend's actual response shape drifts from what client code assumes. Using Zod schemas with a custom RxJS operator in Angular, it validates response shapes at the boundary during development, surfacing mismatches before they produce silent runtime failures. This is boundary enforcement: the API contract is made explicit and checked, not assumed.

[A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same logic to component APIs. A component with dozens of inputs is a shallow, wide surface; callers must understand and supply many details. Refactoring toward the Composite Components pattern, where sub-components and directives each own a concern, produces a narrower per-unit API and keeps complexity encapsulated. The component's public interface shrinks even as its internal capability grows.

Taken together: hide implementation depth, validate boundaries explicitly, and resist the pull toward wide surfaces that offload reasoning to the caller.
