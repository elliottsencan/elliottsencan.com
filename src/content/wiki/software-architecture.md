---
title: Software architecture
summary: >-
  Software architecture spans decisions about module boundaries, state
  management, deployment topology, and how systems communicate — with sources
  collectively showing that good architecture reduces complexity for humans and
  AI alike.
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
compiled_at: '2026-08-03T19:39:51.364Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12533
    output_tokens: 1350
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
  cost_usd: 0.057849
---
Architecture is the set of structural decisions that determine how a system's parts are divided, how they communicate, and how state moves through them. The sources here span frontend layout, agent harnesses, distributed workflow engines, and codebase organization, but a consistent theme runs through all of them: clear boundaries and explicit state management outperform clever runtime behavior.

The module-boundary question shows up at every scale. ["AI Likes Deep Modules"](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce complexity for both humans and LLMs, contrasting deep Go modules against shallow ones that leak implementation detail. ["Single Responsibility, the Distorted Principle"](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) pushes back on the common over-granularization of classes, noting that SRP is about cohesive grouping under one accountable responsibility, not about minimizing lines per file. Vertical codebase organization follows the same logic: [TkDodo's piece](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues that grouping files by domain rather than technical layer improves cohesion and makes colocated context accessible to both developers and AI agents.

State management is the other axis where architectural choices compound. [12-factor-agents' Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that separating execution state from business state creates unnecessary complexity; deriving both from a single context-window thread simplifies serialization, debugging, and recovery. Temporal's durable execution model takes the opposite infrastructure route, persisting workflow state at every step so distributed applications can recover from failures automatically, and [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this into three forms — stateless functions, sessions, and actors — showing how Temporal, Restate, DBOS, and Resonate each implement the spectrum. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same pattern to Lambda, using a two-layer Run/Workflow hierarchy to run stateful CI without a long-lived process.

Agent architectures have become a live laboratory for these same questions. [Anthropic's Managed Agents post](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces so model improvements can be swapped in without rebuilding the system. [The harness design piece](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator split for long autonomous coding sessions. Both share a structural instinct: isolate concerns so that changing one component does not require rebuilding the rest. [Aiyan's data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) evolved through three architectures — rigid state machine, orchestrator, single general-purpose agent — and found that environmental constraints in tool design outperformed prompt engineering for reliability, reinforcing that structure is more durable than instruction.

Layer violations and implicit coupling cause specific failure modes. [The DB commits post](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) enforces strict layer ownership of database transactions using AST-based linters to prevent business logic from leaking into the persistence layer. [Angular's Signal Forms model design guide](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) addresses the related problem of conflating form models with domain models, arguing for explicit translation between them. [The Angular component composition piece](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) treats bloated component inputs as an architectural smell, recommending the Composite Components pattern to encapsulate concerns.

Documenting architecture is its own discipline. [Ilograph's diagram mistakes post](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies how unlabeled resources, overloaded master diagrams, and oversimplified behavioral flows produce documentation that misleads rather than clarifies. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) takes a preventive stance, centralizing architectural rules into a living knowledge base that AI agents query in real time, with Git-layer enforcement blocking non-compliant code before it merges.

At the infrastructure layer, [David Crawshaw's piece on building a cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that current cloud primitives — VMs tied to fixed resources, slow remote block storage, expensive networking — are the wrong abstractions, and that correct architecture requires rebuilding those foundations. That claim echoes across the other sources: when foundational decisions are wrong, no amount of layering on top recovers the situation cleanly.
