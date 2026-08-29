---
title: API design
summary: >-
  How to structure interfaces so the surface area stays minimal, the contract
  stays trustworthy, and the implementation can evolve without leaking
  complexity to callers.
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
compiled_at: '2026-08-29T20:11:12.033Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8208
    output_tokens: 767
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
  cost_usd: 0.036129
---
A recurring theme across the sources here is that good API design is about information hiding: small, stable surfaces that conceal whatever complexity lives underneath. [Go Monk's piece on deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes this most explicit, arguing that a narrow interface over a large implementation reduces cognitive load for both human developers and LLMs working in the codebase. Shallow wrappers that expose implementation details fail by the same measure.

The flip side of a small surface is a trustworthy contract. Validating the shape of data at the boundary — rather than assuming it — is the practical implementation of that principle. [Daniel Sogl's Angular piece](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how Zod schemas used with a custom RxJS operator catch mismatched backend responses at development time instead of producing silent runtime failures. Zod itself has been through a serious internal redesign: [Colin McDonnell's post on Zod 4.5](/reading/2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude) shows that the library reduced per-schema heap usage by up to 10x by replacing eagerly bound methods with lazily memoizing prototype getters, a reminder that a well-designed public API can be preserved across major internal rewrites.

Contract fidelity also depends on the serialization format. [The Norway problem post](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) is a cautionary example: YAML's implicit type coercion turned the country code NO into a boolean false across libraries still using pre-1.2 spec behavior, silently corrupting data at parse time. Explicit typing and schema validation are defenses against exactly this class of breakage.

At the component level, [Kobi Hari's Angular components post](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same principle to UI: components bloated with dozens of inputs are effectively wide, shallow APIs. The Composite Components pattern moves responsibility into sub-components and directives, keeping each unit's interface narrow and testable. [Angular's Signal Forms documentation](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) reinforces this with guidance on type specificity and avoiding undefined, both of which reduce the ambiguity a caller must handle.

Finally, [Conductor's approach](/reading/2026-04/2026-04-30t231709-conductor) to wrapping QuickBooks Desktop illustrates what a well-designed abstraction layer accomplishes at product scale: qbXML, SOAP, and the Web Connector are hidden behind a fully-typed REST and SDK surface, giving developers access to 130+ object types without touching the underlying protocol.
