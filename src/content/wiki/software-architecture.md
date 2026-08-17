---
title: Software architecture
summary: >-
  Software architecture spans decisions about module boundaries, state
  management, control flow, and system topology — choices that determine how
  well a system can be understood, evolved, and operated under real conditions.
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
compiled_at: '2026-08-17T18:51:22.665Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12533
    output_tokens: 1466
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
  cost_usd: 0.059589
---
Architecture is not a single decision but an accumulating set of constraints that shape every subsequent choice made on a codebase. Several sources here converge on one persistent theme: complexity is best managed by reducing the surface area that any one module exposes to the rest of the system.

[AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes this explicit, contrasting shallow interfaces that leak implementation detail against deep modules whose small public surfaces hide substantial behavior. The argument extends to LLM coding assistants: a deep interface is easier for a model to reason about because there is less ambient detail to misinterpret. This pairs with [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle), which corrects the common misreading of SRP as "do only one thing" and reframes it as cohesive grouping under a single accountability. Over-granularizing classes produces the same cognitive overhead SRP was meant to eliminate.

Boundary decisions also apply at the component level. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs should be decomposed using the Composite Components pattern, pushing features into directives and sub-components so each concern stays encapsulated. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) extends this to file organization, arguing that grouping by domain vertical rather than horizontal technical layer (components, hooks, utils) improves cohesion and makes the codebase more navigable for both developers and AI agents.

State management is a second axis where architectural choices compound. [Factor 5 of 12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that separating execution state from business state adds unnecessary complexity; inferring both from a single context-window-derived thread simplifies serialization, debugging, and recovery. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) taxonomizes durable execution into stateless functions, sessions, and actors, showing how platforms like Temporal, Restate, DBOS, and Resonate each implement these patterns along a behavior-state continuum. [Temporal itself](/reading/2026-04/2026-04-30t231511-temporal) demonstrates one end of that spectrum: persisting workflow state at every step so distributed applications recover from failures without manual reconciliation. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies similar thinking at the infrastructure layer, using Lambda durable functions to run a stateful checkpointed scheduler without a long-lived process.

Control flow is a third dimension. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces an agent's evolution through rigid state machine, orchestrator, and single general-purpose agent architectures, concluding that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering for reliability. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) arrives at the same point from a different direction: deterministic state transitions and validation checkpoints embedded in software are more reliable than elaborate prompt chains.

At the system boundary, how components communicate matters as much as how they are structured internally. [Angular API Response Management with Zod](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) treats schema validation at the API boundary as a structural concern: catching unexpected response shapes at development time prevents them from propagating as runtime errors. [Banning manual DB commits via AST linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) applies the same logic at the data layer, enforcing strict DB-layer ownership through automated checks so architectural constraints survive code review.

Documentation of architectural intent is itself an architectural problem. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes rules and engineering standards into a living knowledge base that AI agents query in real time, with a Git-layer tool blocking non-compliant code before it merges. [The AI-native startup playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) frames this as a startup-survival issue: codebases without written architectural constraints cause AI sessions to re-derive foundational decisions from scratch and drift from the original design. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) addresses the representation side, cataloguing pitfalls — unlabeled resources, overloaded master diagrams, oversimplified behavioral flows — that cause diagrams to mislead rather than communicate.

Finally, [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) pushes the argument to the infrastructure level, contending that current cloud primitives — VMs tied to fixed resources, slow remote block devices, expensive networking — are wrong abstractions that force every application built on top of them to work around fundamental mismatches. Architecture decisions made at the platform layer propagate upward into every application that runs on it.
