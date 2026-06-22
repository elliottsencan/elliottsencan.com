---
title: API design
summary: >-
  Good API design minimizes surface area, enforces type contracts, and hides
  implementation complexity — a principle that shows up across library
  interfaces, component inputs, data serialization formats, and agent tool
  protocols.
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
compiled_at: '2026-06-22T02:39:28.048Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7893
    output_tokens: 832
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
  cost_usd: 0.036159
---
The recurring concern across these sources is the same: an API that leaks complexity onto the caller becomes a burden regardless of the layer it operates at.

The deep-modules argument makes this explicit [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules): small interfaces hiding large implementations reduce cognitive load for both human developers and LLMs generating code. A shallow module forces the caller to reason about internals; a deep one lets the caller ignore them. This maps directly onto Angular component design, where an input-heavy component essentially publicizes its implementation. The Composite Components pattern [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) is a structural response to the same problem: push concerns into directives and sub-components so the public contract stays narrow.

Type safety at the API boundary is a separate but related concern. When a backend returns an unexpected shape, the failure is silent until something blows up at runtime. Using Zod validation with a custom RxJS operator [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches that mismatch at development time. Zod also appears in broader JS tooling surveys [Seven Cool JavaScript Libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) as a practical schema-first approach to tightening contracts across the stack. Angular Signal Forms takes a similar stance on internal data contracts [Form Model Design](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms): avoid undefined, prefer type-specific fields, and translate explicitly between form and domain models rather than letting the two bleed into each other.

Format choices shape API reliability in less obvious ways. YAML's Norway problem [YAML? That's Norway Problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) is a canonical example of implicit coercion creating bugs that survive a spec fix for over a decade because the ecosystem moves slowly. Configuration and serialization formats are APIs too, and silent type coercions are the equivalent of a leaky abstraction.

At the infrastructure layer, Conductor [Conductor](/reading/2026-04/2026-04-30t231709-conductor) demonstrates the value of wrapping a hostile legacy interface (qbXML over SOAP) in a fully-typed, idiomatic surface for Python, Node.js, and REST consumers. The wrapper does not add logic; it hides protocol complexity behind a clean contract. The MCP discussion Your Agent Loves MCP raises the same trade-off from the other direction: MCP is a useful abstraction for agents that cannot write code, but for agents that can, bypassing the abstraction layer and calling APIs directly saves tokens and preserves composability.

Across all these contexts the design pressure is consistent: minimize what callers must know, enforce contracts at boundaries, and resist letting internal structure leak outward.
