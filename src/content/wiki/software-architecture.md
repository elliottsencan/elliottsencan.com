---
title: Software architecture
summary: >-
  Software architecture encompasses the structural decisions that determine how
  systems are organized, how components interact, and how those choices
  propagate through reliability, maintainability, and team cognition.
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
compiled_at: '2026-09-21T21:57:01.795Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12683
    output_tokens: 1429
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
  cost_usd: 0.059484
---
Architecture is not a single decision but a cumulative record of structural choices, each of which constrains or enables what comes next. Several recurring themes across these sources: the boundary between execution concerns and domain concerns, the interface contract between components, and the way structural decisions shape reliability before any code runs.

One of the clearest arguments for treating structure as a reliability mechanism comes from the agent space. [Don't Prompt Your Agent for Reliability](2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) documents three successive architectures for a data engineering agent — rigid state machine, orchestrator, then single general-purpose agent — showing that environmental constraints built into the architecture (tool design, ID keys, context visibility) outperformed prompt engineering at every stage. [Agents Need Control Flow, Not More Prompts](2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) reaches the same conclusion: deterministic state transitions and validation checkpoints, encoded in software, beat elaborate prompt chains when tasks grow complex.

State management is where many architectural debates concentrate. The [12-factor-agents Factor 5](2026-05/2026-05-19t174452-humanlayer12-factor-agents) argument for unifying execution state and business state into a single context-window-derived thread is a specific instance of a general principle: unnecessary state separation creates complexity that compounds. [Temporal](2026-04/2026-04-30t231511-temporal) and the [three durable function forms](2026-05/2026-05-01t112302-the-three-durable-function-forms) (stateless, session, actor) approach the same problem from the distributed systems side — persisting workflow state at every step so recovery is automatic rather than manual. [Depot's CI orchestrator](2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies durable Lambda functions to a stateful workflow scheduler, eliminating the long-lived process.

Interface design runs through several sources. [AI Likes Deep Modules](2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce complexity for both humans and LLMs. [Single Responsibility, the Distorted Principle](2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects the common misreading of SRP as "do only one thing," insisting the principle is about cohesive grouping under a single accountable responsibility — over-granularizing violates the cognitive simplicity SRP is meant to provide. Angular's component architecture surfaces the same tension: [A Better Way to Build Angular Components](2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs should be refactored using the Composite Components pattern, moving concerns into directives and sub-components.

Code organization at the codebase level follows a parallel logic. [The Vertical Codebase](2026-07/2026-07-04t141323-the-vertical-codebase) argues for domain-vertical organization over horizontal technical layers, showing that colocation by functionality improves cohesion, discoverability, and AI-agent effectiveness. [How I Audit a Legacy Rails Codebase](2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) shows the diagnostic side: reading the schema and Gemfile before running any tools reveals the architectural assumptions baked into a codebase's history.

Architectural decisions decay without enforcement. [MarkdownLM](2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a living knowledge base that AI agents query at ingest time, with its Lun tool blocking non-compliant code at the Git layer. [Banning commits using AST analysis](2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) enforces DB layer ownership of transactions through flake8 plugins and LLM-assisted CI checks. Both treat the architecture as something that must be mechanically enforced, not merely documented.

At scale, architectural diagrams become a communication artifact with their own failure modes. [7 More Common Mistakes in Architecture Diagrams](2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies unlabeled resources, overloaded master diagrams, and oversimplified behavioral flows as the most common ways diagrams mislead rather than clarify.

Two sources address the infrastructure layer directly. [Building a Cloud](2026-07/2026-07-05t170602-building-a-cloud) argues that VMs tied to fixed resources, slow remote block storage, and expensive networking are wrong abstractions that every workload inherits. [How's Linear so fast](2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows the opposite end: a local-first IndexedDB sync architecture with aggressive code splitting and optimistic updates achieves near-instant UI response by choosing the right data locality model from the start.

For AI-native products specifically, [The Founder's Playbook](2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) warns that skipping architectural constraints at the MVP stage produces "agentic technical debt" — each new AI session re-derives foundational decisions from scratch, and the resulting codebase accumulates incoherence that surfaces late and is expensive to repair.
