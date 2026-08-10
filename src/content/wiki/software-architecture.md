---
title: Software architecture
summary: >-
  How systems are structured — from module boundaries and state design to
  deployment topology — shapes reliability, maintainability, and how well both
  humans and AI agents can reason about a codebase.
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
compiled_at: '2026-08-10T19:06:33.362Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12533
    output_tokens: 1420
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
  cost_usd: 0.058899
---
Architecture is the set of decisions that determine how a system's parts fit together, what each part is responsible for, and how the whole behaves under stress. Those decisions compound: a wrong choice about where state lives or how modules are split becomes progressively more expensive to reverse. Several sources here converge on that compounding quality from different angles.

The clearest statement of the boundary problem comes from the Single Responsibility Principle debate. [Teixeira argues](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) that SRP is widely misread as "do one thing" when it actually means cohesive grouping under a single accountable responsibility. Over-granularizing classes fragments cohesion and defeats the cognitive simplicity SRP was supposed to provide. [Go Monk extends this](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) with the deep-module framing: small interfaces hiding large implementations reduce complexity for both humans and LLMs, while shallow modules expose too much surface area for too little abstraction.

Organizing code by domain rather than technical layer follows naturally. [TkDodo makes the case](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) for vertical codebases — grouping by domain vertical rather than horizontal layers like components, hooks, and utils — arguing that colocation by functionality improves cohesion, discoverability, and AI-agent effectiveness. The Angular guidance on [component composition](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) reinforces this: components bloated with dozens of inputs should be refactored using the Composite Components pattern so each concern stays encapsulated. [Angular's Signal Forms documentation](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) adds a complementary point about type specificity and the discipline of translating cleanly between form and domain models rather than bleeding one into the other.

State design cuts across all of these. The [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, simplifying serialization, debugging, and recovery. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of durable execution — stateless functions, sessions, and actors — maps the same territory from the infrastructure side, showing how platforms like Temporal implement these patterns differently. [Temporal itself](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation logic. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies a similar idea at the CI layer, using Lambda durable functions with a two-layer hierarchy to run stateful workflows without a long-lived process.

At the enforcement layer, architectural decisions only hold if they cannot be bypassed. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes rules and standards into a living knowledge base that blocks non-compliant code at the Git layer before it merges. [The DB-layer ownership post](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) advocates banning manual commits and DB model leakage via AST-based tests and linters. [Trunk's analysis of the GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows the inverse: an architectural choice to never push temp branches to main avoided a silent data-deletion incident that affected other setups.

For agent-based systems specifically, [the Aiyan data-engineering post](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows that environmental constraints — tool design, stable IDs, context visibility — outperform prompt engineering across three architectures tried in sequence. [Brian Suh makes the structural argument explicitly](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): reliable agents need deterministic control flow encoded in software, not elaborate prompt chains. [Anthropic's Managed Agents write-up](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) shows what that looks like at scale — separating the harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve.

Documentation and diagrams close the loop. [Billy Pilger's catalogue of architecture diagram mistakes](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) — unlabeled resources, overloaded master diagrams, oversimplified behavioral flows — points to the same underlying problem: diagrams that fail to communicate decisions are as costly as decisions never made. [Tuhin Nair's piece on senior developer communication](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) frames the stakes: engineers think in complexity management while stakeholders think in uncertainty reduction, and the gap between those framings is where architectural intent gets lost.
