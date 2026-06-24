---
title: Software architecture
summary: >-
  Software architecture concerns how systems are structured and why those
  structures hold — spanning module boundaries, state management, distributed
  coordination, and the diagrams and principles used to reason about them.
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
compiled_at: '2026-06-24T06:36:36.176Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11882
    output_tokens: 1311
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
  cost_usd: 0.055311
---
Architecture decisions set the constraints within which all other engineering choices operate. Across the sources here, a consistent thread runs from small-scale module design through distributed systems to AI-driven development: structural clarity pays compound interest, and structural ambiguity compounds debt.

At the module level, [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small, stable interfaces hiding large implementations reduce cognitive load for both humans and LLMs. This pairs with the observation in [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) that SRP is routinely misread as "do only one thing" when it actually calls for cohesive grouping under a single accountable responsibility. Over-granularizing violates the very simplicity SRP is meant to provide.

Component design follows similar logic. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) shows that components bloated with dozens of inputs should be decomposed into directives and sub-components via a Composite Components pattern. Angular's own [Form Model Design](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) documentation extends this to data modeling, separating form models from domain models and enforcing type specificity throughout.

Boundary validation is where architecture meets runtime. [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) demonstrates using Zod schema validation with RxJS in Angular to catch unexpected backend response shapes at development time rather than in production. This is a concrete instance of the broader principle that architectural constraints enforced automatically are more reliable than those enforced by convention.

State management is where distributed architecture decisions become consequential. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) taxonomizes durable execution into stateless functions, sessions, and actors along a behavior-state continuum, then maps Temporal, Restate, DBOS, and Resonate onto that space. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) itself persists workflow state at every step, eliminating manual reconciliation. [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same ideas practically: Depot CI's orchestrator uses a two-layer Lambda hierarchy and callback-driven coordination to run stateful CI workflows without a long-lived process. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) pushes this further, arguing that execution state and business state should often be unified into a single context-window-derived thread — simplifying serialization, debugging, and recovery.

For AI-specific systems, architecture has become the primary reliability lever. [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces one data engineering agent through three architectures — rigid state machine, orchestrator, single general-purpose agent — concluding that environmental constraints outperform prompt engineering. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) reinforces this: reliable agents need deterministic state transitions encoded in software, not elaborate prompt chains. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) service embodies this at scale, separating harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve.

Diagramming and communication are often the weakest layer. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies concrete failures: unlabeled resources, disconnected nodes, overloaded master diagrams, and over-reliance on AI to generate them. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) frames the underlying problem as a language gap: architects think in complexity management while the rest of the business thinks in uncertainty reduction.

Finally, [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) makes explicit what the other sources imply: architectural decisions written down somewhere the AI can read are what prevent AI-assisted codebases from losing coherence session by session. Specs, decision records, and context files are not overhead — they are the architecture's persistence layer.
