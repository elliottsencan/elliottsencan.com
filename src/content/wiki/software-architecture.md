---
title: Software architecture
summary: >-
  Software architecture spans the structural decisions that determine how
  systems handle complexity, state, failure, and change — from module boundaries
  and layout conventions to distributed execution models and the diagrams used
  to communicate them.
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
compiled_at: '2026-11-03T00:45:00.895Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12683
    output_tokens: 1401
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
  cost_usd: 0.059064
---
Architecture is the set of decisions that constrain everything else. Get them right and later changes are local; get them wrong and every feature negotiates with the original mistake. The sources here trace that principle across UI layout, agent systems, distributed execution, module design, and the organizational scaffolding that keeps decisions legible over time.

At the module level, two complementary ideas keep resurfacing. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues for deep modules — small public interfaces hiding large implementations — as the primary tool for managing cognitive load, a property that benefits LLMs reading the code as much as humans. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects the common misreading of the Single Responsibility Principle: it means cohesive grouping under one accountable axis, not decomposing everything into the smallest possible unit. Over-granularizing creates the very complexity SRP was meant to prevent. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same reasoning to Angular components: a component bloated with dozens of inputs should be refactored using the Composite Components pattern so each concern stays encapsulated. [TkDodo](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) extends this to file layout, arguing that organizing by domain vertical rather than horizontal technical layer (components/hooks/utils) improves cohesion and AI-agent traversal alike.

State design is where architectural decisions become most consequential. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) taxonomizes durable execution into three forms — stateless functions, sessions, and actors — showing how Temporal, Restate, DBOS, and Resonate each implement them. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies this concretely: a two-layer Lambda hierarchy runs a stateful, checkpointed scheduler without any long-lived process. The 12-factor-agents project [Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) pushes further, arguing that for agent workloads, execution state and business state should unify into a single context-window-derived thread, making the system serializable, debuggable, and forkable with minimal extra machinery.

For distributed and cloud-scale systems, the argument about abstractions runs parallel. [David Crawshaw](/reading/2026-07/2026-07-05t170602-building-a-cloud) contends that mainstream cloud platforms are built on wrong primitives — VMs tied to fixed resources, slow block storage, expensive networking — and that fixing performance requires rebuilding from different foundations. [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows what correct foundations produce: local-first IndexedDB sync, aggressive code splitting, service worker precaching, and optimistic updates combine to make the app feel instantaneous. [Anthropic's Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) achieves a related separation: decoupling the agent harness, session log, and sandbox behind stable interfaces so implementations can be swapped as models improve.

Enforcing architectural decisions over time requires more than documentation. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules into a living knowledge base that AI agents query in real time, with its Lun tool blocking non-compliant code at the Git layer before it merges. [The Founders Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) identifies the compounding cost of skipping this: without written specs and architectural constraints the AI can read, each coding session re-derives foundational decisions from scratch and the codebase loses its coherent mental model. [Daniel Sogl](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows a narrower enforcement mechanism: Zod schema validation with a custom RxJS operator catches unexpected backend response shapes at dev time before they cause runtime errors.

Communicating architecture adds its own failure modes. [Billy Pilger](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) catalogs seven pitfalls in system diagrams — unlabeled resources, disconnected nodes, overloaded master diagrams, oversimplified behavioral flows, and over-reliance on AI generation — each of which produces a diagram that misleads rather than informs. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) frames the broader communication gap: senior developers reason in terms of complexity management while business stakeholders think in terms of uncertainty reduction, and bridging that translation is as much an architectural skill as choosing the right data structure.
