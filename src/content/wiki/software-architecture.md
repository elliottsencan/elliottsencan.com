---
title: Software architecture
summary: >-
  Software architecture spans decisions about how systems are structured,
  decomposed, and evolved — from module boundaries and state management to
  distributed execution patterns and the organizational forces that shape
  codebases over time.
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
compiled_at: '2026-08-24T18:54:42.959Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12533
    output_tokens: 1634
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
  cost_usd: 0.062109
---
Software architecture is the set of structural decisions that determine how a system's parts relate to each other, how complexity is managed across those parts, and how the whole survives change. The sources collected here approach it from many angles, but several threads run through most of them.

Module design sits at the foundation. [Deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce cognitive load for both human engineers and LLMs, contrasting this with shallow modules that leak complexity into callers. The [Single Responsibility Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) adds nuance: SRP is frequently misread as "do one thing," when its actual intent is cohesive grouping of behaviors under a single accountable responsibility. Over-granularizing classes violates the cognitive simplicity SRP was meant to provide. [Vertical codebase organization](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) extends this to directory structure, arguing that colocating code by domain rather than technical layer (components/hooks/utils) improves cohesion and discoverability.

Component-level design echoes the same concern. [Angular component composition](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs should be refactored using the Composite Components pattern, moving features into directives and sub-components so each concern stays encapsulated. [Angular's Signal Forms model design](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) applies the same thinking to data: separate form models from domain models and keep type specificity high. At the UI layer, [building without breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that intrinsic layouts and container queries belong to component architecture, with media queries reserved for device capabilities rather than layout decisions.

State management and distributed execution represent a second cluster. [Temporal's durable execution](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Three durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) taxonomizes this space into stateless functions, sessions, and actors along a behavior-state continuum, then maps how Temporal, Restate, DBOS, and Resonate each implement these patterns. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies durable functions in practice, using a two-layer Lambda hierarchy to run stateful CI pipelines without a long-lived process. The 12-factor-agents [unified state principle](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should be collapsed into a single context-window-derived thread when possible, simplifying serialization, recovery, and observability. [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows these principles at scale: local-first IndexedDB sync, optimistic updates, and aggressive code splitting combine into near-instant perceived performance.

Architecture for AI-assisted and agent-driven systems adds newer constraints. [Anthropic's managed agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve. [Harness design for long-running apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator structure that overcomes context anxiety during multi-hour autonomous coding. [Agent reliability through engineering](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) and [control flow over prompting](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) both conclude that environmental constraints and deterministic state transitions outperform prompt engineering for reliability. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules into a living knowledge base that agents query in real time, blocking non-compliant code at the Git layer before it merges.

Documentation and legibility close the loop. [Architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) fail when they overload a single view, use unlabeled resources, or oversimplify behavioral flows. [AI-native startup founders](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) who skip specs and architectural decision records accumulate compounding technical debt because each new AI session re-derives foundational decisions from scratch. [Senior developers](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) compound this when they communicate in terms of complexity management while the business thinks in terms of uncertainty reduction, a translation gap that is itself an architectural problem.

[Enforcing DB layer ownership via AST linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) and [Zod schema validation at the API boundary](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) illustrate how architectural decisions get encoded as automated constraints rather than conventions. The [historical arc of frontend layering](/reading/2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent) puts all of this in context: each new layer in a stack was originally a targeted solution to a real pain, and the accumulated weight of those solutions is itself an architectural fact that every new system must reckon with.
