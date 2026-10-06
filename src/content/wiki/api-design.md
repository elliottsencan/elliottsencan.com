---
title: API design
summary: >-
  Good API design minimizes surface area, enforces explicit contracts, and hides
  implementation complexity — principles that apply equally to library
  interfaces, backend schemas, component inputs, and data serialization formats.
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
compiled_at: '2026-10-05T23:47:26.133Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 740
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
  cost_usd: 0.035724
---
A recurring theme across sources on API design is the value of narrow, explicit interfaces that hide large implementations. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) frames this as the "deep module" principle: small interfaces backed by significant functionality reduce cognitive load for both human developers and LLMs working with a codebase. Bloated interfaces are the opposite problem. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) shows how Angular components that accumulate dozens of inputs become difficult to reason about, and argues for refactoring them using composition so each unit exposes only what it needs to.

Runtime contract enforcement is another consistent concern. When a backend returns an unexpected shape, silent failures are worse than loud ones. [Daniel Sogl](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) demonstrates catching schema mismatches at dev time using Zod with a custom RxJS operator in Angular, turning latent bugs into immediate errors. Zod itself continues to evolve on the performance side: [Colin McDonnell](/reading/2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude) describes how Zod 4.5 replaces eagerly bound methods with lazily memoizing prototype getters, cutting per-schema heap usage by up to 10x without changing the outward API.

Serialization formats can introduce subtle contract violations even without code changes. [lab174](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) traces how YAML's implicit type coercion — where the country code NO parses as boolean false — persisted through widely used libraries for over a decade after the spec fixed it, illustrating how format-level ambiguity can silently corrupt data.

API design also shapes how AI agents interact with systems. [Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that MCP-style tool interfaces are analogous to GUIs: useful for humans, but wasteful for agents capable of calling APIs directly. Agents that go through high-level abstraction layers pay token costs without composability benefits, suggesting that clean, scriptable APIs remain preferable when the consumer can handle them. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) applies this in practice by wrapping QuickBooks Desktop's qbXML and SOAP interfaces behind a typed REST and SDK layer, making a historically opaque protocol approachable without exposing its internals.
