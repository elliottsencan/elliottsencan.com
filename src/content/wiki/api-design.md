---
title: API design
summary: >-
  API design concerns how interfaces expose functionality to callers, covering
  surface area, type safety, schema validation, and the tradeoff between hiding
  complexity behind small interfaces versus leaking it through large ones.
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
compiled_at: '2026-06-20T22:13:24.299Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7893
    output_tokens: 752
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
  cost_usd: 0.034959
---
A well-designed API hides implementation detail behind a narrow surface. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) frames this as the core principle: small interfaces that conceal large implementations reduce cognitive load for both human developers and LLMs working with the code. The inverse, shallow modules with wide interfaces and thin implementations, forces callers to manage complexity that belongs inside the module.

Type safety and schema validation are one concrete way to enforce interface contracts. [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how Zod schemas applied at the boundary between an Angular app and a backend catch unexpected response shapes at development time rather than letting them produce silent runtime failures. Zod also appears in [Seven Cool JavaScript Libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) as a general-purpose schema validation tool worth reaching for whenever an API boundary is crossed.

Surface area matters on the component side too. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components accumulating dozens of inputs become hard to use because callers must understand too much to get a result. Decomposing into smaller, focused sub-components and directives keeps each API surface legible.

Format choices propagate their own bugs. [YAML? That's Norway Problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) traces how YAML's implicit type coercion turns the country code NO into a boolean false across widely-used parser libraries, years after the spec fixed it. Data formats that do implicit coercion impose hidden contract terms on every API that uses them.

[Conductor](/reading/2026-04/2026-04-30t231709-conductor) illustrates the value of a well-abstracted wrapper API: it replaces qbXML and SOAP with fully-typed Python, Node.js, and REST endpoints over QuickBooks Desktop, letting developers work with 130+ object types without learning the underlying wire format.

Finally, the question of who or what the API is for shapes its design. [Your agent loves MCP as much as you love GUIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that MCP layers built for AI agents are analogous to GUIs built for humans: convenient for non-technical users but wasteful for callers that can consume raw APIs directly. An agent that can write code should work against clean APIs and composable scripts rather than against a mediation layer optimized for human-readable interaction.
