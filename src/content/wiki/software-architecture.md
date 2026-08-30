---
title: Software architecture
summary: >-
  Software architecture spans the decisions that determine how systems are
  structured, how components relate, and how those choices compound over time —
  from module boundaries and state management to deployment topology and diagram
  clarity.
sources:
  - 2026-04/2026-04-24t085352-building-a-ui-without-breakpoints
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - >-
    2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with
  - 2026-04/2026-04-30t231319-markdownlm
  - 2026-04/2026-04-30t231412-form-model-design-angular-signal-forms
  - 2026-04/2026-04-30t231511-temporal
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - 2026-05/2026-05-01t112302-the-three-durable-function-forms
  - 2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
  - 2026-05/2026-05-06t204115-platform-engineering-end-to-end
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - 2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla
  - >-
    2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise
  - 2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us
  - 2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - >-
    2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for
  - 2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle
  - 2026-06/2026-06-11t023157-memory-design-zerostack
  - 2026-06/2026-06-11t023435-subagents-design-zerostack
  - >-
    2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store
  - 2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams
  - >-
    2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage
  - 2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown
  - 2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm
  - >-
    2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup
  - >-
    2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week
  - 2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router
  - 2026-06/2026-06-23t232444-repowise-devrepowise
  - 2026-07/2026-07-04t141323-the-vertical-codebase
  - 2026-07/2026-07-05t170602-building-a-cloud
  - >-
    2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters
  - >-
    2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent
  - 2026-08/2026-08-29t224355-how-llms-actually-work
compiled_at: '2026-08-30T05:59:32.032Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12683
    output_tokens: 1369
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
  cost_usd: 0.058584
---
Architecture decisions operate at every scale, from the shape of a single module to the topology of a distributed system. Across the sources here, a consistent pressure emerges: the choices made early about structure, state, and interfaces determine what becomes easy or impossible later.

At the module level, the Single Responsibility Principle is one of the most frequently misread guides. [Teixeira's analysis](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that SRP does not mean "do only one thing" but rather "group behaviors under a single accountable responsibility." Over-granularizing violates the cognitive simplicity SRP was intended to provide. This cohesion argument extends to how codebases are organized at larger scale: [TkDodo's case for vertical codebases](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) shows that organizing by domain rather than by technical layer improves cohesion and discoverability, and has the side effect of making AI-agent navigation more effective. The complementary principle of deep modules — small interfaces hiding large implementations — is made explicit in [Go Monk's piece on LLM preferences](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules), which notes that both humans and models find deep modules easier to reason about than shallow ones.

State management is where many architectural failures actually live. The [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, making serialization, debugging, recovery, and observability all simpler by eliminating the gap between two separately maintained representations. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and the durable execution patterns described by [Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) approach this from the infrastructure side: persisting workflow state at every step so distributed systems recover from failures without manual reconciliation. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies this concretely, using AWS Lambda durable functions to run a stateful, checkpointed scheduler without a long-lived process.

Interface and component design carry their own architectural weight. Angular's [Signal Forms documentation](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) treats the separation of form model and domain model as a first-class concern. [Kobi Hari's component composition argument](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) makes the parallel case that components bloated with inputs should be refactored into directives and sub-components to keep concerns encapsulated. At the data boundary, [Zod validation in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time rather than letting them cause runtime failures — a structural choice about where validation lives in the system.

Architecture for AI-assisted development introduces pressures that did not exist before. The [AI-native startup playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) identifies a specific failure mode: without specs and architectural constraints written somewhere the AI can read, each session re-derives foundational decisions from scratch and the codebase loses coherence. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) addresses this by centralizing architectural rules into a living knowledge base that agents query in real time, with a Git-layer tool that blocks non-compliant code before it merges.

Diagram quality matters for the same reason legibility matters generally. [Pilger's review of architecture diagram mistakes](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies seven pitfalls — unlabeled resources, disconnected nodes, overloaded master diagrams, oversimplified behavioral flows — each of which obscures system structure rather than communicating it. The senior developer communication problem identified by [Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) operates at the same level: architects think in terms of complexity management, while the rest of the organization thinks in terms of uncertainty reduction.

At the infrastructure boundary, [Crawshaw's critique of cloud abstractions](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that VMs tied to fixed resources, slow remote block devices, and expensive networking are fundamentally wrong primitives, and that the entire cloud layer needs different foundational abstractions. [The Trunk merge queue analysis](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows a narrower but concrete consequence: an architectural choice about whether temp branches are ever pushed to main was what determined whether a GitHub bug deleted thousands of lines of production code. Structure, at every level, determines what failures are even possible.
