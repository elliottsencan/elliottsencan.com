---
title: Software architecture
summary: >-
  How systems are structured at every scale — from module boundaries and state
  models to deployment topology and diagramming — shapes correctness,
  evolvability, and the ability of both humans and AI agents to reason about
  code.
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
compiled_at: '2026-10-05T23:58:45.589Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12683
    output_tokens: 1496
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
  cost_usd: 0.060489
---
Architecture is the set of structural decisions that determine how a system's parts relate to each other and how those relationships change over time. The sources here span UI layout, agent design, form modeling, durable execution, and platform engineering, but they converge on a few durable arguments about what makes structure good or bad.

The most persistent theme is that complexity follows from separation of concerns done wrong. [Single Responsibility Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) is widely misread as "do one thing" when it actually means cohesive grouping under a single accountable responsibility; over-granularizing violates the cognitive simplicity SRP is meant to provide. [Deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) extend this: small interfaces hiding large implementations reduce complexity for humans and LLMs alike, contrasting with shallow modules where interface surface area approaches implementation size. Organizing code by domain vertical rather than technical layer compounds the benefit — [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) shows how colocation by feature improves cohesion, discoverability, and AI-agent effectiveness simultaneously.

State management is where architectural mistakes surface most painfully. [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) draws a hard line between form model and domain model, requiring explicit translation rather than letting the two bleed together. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) makes the equivalent argument for AI systems: separating execution state from business state creates unnecessary complexity, and engineering execution state to be derivable from the context window unifies serialization, debugging, recovery, and observability into a single source of truth. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and its taxonomy of [durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) show how persisting workflow state at every step eliminates manual reconciliation logic across stateless functions, sessions, and actors. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same pattern concretely: a two-layer Lambda hierarchy runs a stateful CI scheduler without keeping a long-lived process alive.

Boundary enforcement is a structural concern that only discipline or tooling can guarantee. [Zod schema validation in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at development time before they cause runtime errors. [DB layer ownership](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) enforces strict commit and transaction handling through AST-based tests and linters, preventing DB model leakage. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules into a living knowledge base that AI agents query in real time, with its Lun tool blocking non-compliant code at the Git layer before merge.

Agent system architecture has emerged as its own sub-discipline. The data engineering agent chronicled in [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) evolved from rigid state machine to orchestrator to single general-purpose agent, and the lesson is that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering for reliability. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) reaches the same conclusion independently: deterministic control flow encoded in software beats elaborate prompt chains under complexity. [Anthropic's Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, cutting latency while enabling multi-brain, multi-sandbox topologies.

Architecture documentation has its own failure modes. [Seven common diagram mistakes](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) include unlabeled resources, disconnected nodes, overloaded master diagrams, and over-reliance on AI generation — each degrading the diagram's ability to communicate actual structure. [Why senior developers fail to communicate expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) frames the deeper version of this: engineers speak in complexity management while business stakeholders think in uncertainty reduction, and closing that gap is what architectural communication actually requires.

At the platform level, [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) demonstrates that local-first IndexedDB sync, aggressive code splitting, and optimistic updates are architectural choices, not performance tricks. [Platform engineering](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) shows how internal developer platforms institutionalize those choices across teams. And [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that even foundational cloud abstractions — VMs, remote block devices, networking — can be wrong, and that correct architecture sometimes requires rebuilding from scratch rather than layering on top of flawed primitives.
