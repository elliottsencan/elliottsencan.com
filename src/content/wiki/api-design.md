---
title: API design
summary: >-
  Good API design hides complexity behind narrow, stable interfaces; sources
  here address that principle from schema validation in Angular HTTP layers,
  typed QuickBooks abstraction, component input discipline, and LLM-friendliness
  of deep modules.
sources:
  - >-
    2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with
  - 2026-04/2026-04-30t231709-conductor
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
compiled_at: '2026-05-06T04:20:25.103Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2757
    output_tokens: 537
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
  cost_usd: 0.016326
---
The core of API design is the contract between a module and its callers: what is exposed, what is hidden, and how much the caller must know to use it correctly. Four sources touch this from different angles, all arriving at the same conclusion: leaky, wide, or unvalidated interfaces create problems at scale.

[Zod-based response validation](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) addresses the external API surface: when a backend response deviates from the expected shape, runtime errors surface in production rather than at dev time. Wrapping Angular HTTP calls with a custom RxJS operator that validates against a Zod schema catches those mismatches early, treating the API contract as something to enforce rather than assume.

[Conductor](/reading/2026-04/2026-04-30t231709-conductor) illustrates what a well-designed API can replace: decades of qbXML and SOAP complexity collapsed into a typed Python, Node.js, and REST interface covering 130+ QuickBooks objects. The abstraction works because it hides implementation detail completely, exposing only the objects callers actually need.

The component-level analogue appears in [Angular component composition](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to): components with dozens of inputs are effectively wide APIs. Each input is a coupling point. Moving concerns into directives and sub-components narrows the interface and keeps each unit's contract legible.

[AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes this explicit: deep modules, interfaces that hide complexity behind a small surface, are easier for LLMs to reason about than shallow ones that leak implementation detail across layers. The argument applies equally to human callers. A narrow interface forces the designer to decide what matters; a wide one defers that decision to every consumer.
