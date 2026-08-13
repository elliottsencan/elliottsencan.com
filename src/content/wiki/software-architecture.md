---
title: Software architecture
summary: >-
  Software architecture shapes every downstream decision about reliability,
  complexity, and change: how components own their concerns, how state flows
  through systems, and how boundaries are drawn determines whether code stays
  legible and evolvable.
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
compiled_at: '2026-08-13T21:19:21.915Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12533
    output_tokens: 1404
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
  cost_usd: 0.058659
---
Architecture is the set of structural decisions that are hard to reverse: how concerns are separated, where state lives, how components communicate, and what constraints the system enforces on itself. A recurring theme across recent engineering writing is that good architecture reduces the surface area of complexity rather than redistributing it.

The tension between shallow and deep modules is one useful frame. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce cognitive load for both humans and LLMs, while shallow modules push complexity outward into call sites. The same logic drives Angular component design: [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) shows how components bloated with dozens of inputs should be decomposed into composites — directives and sub-components — so each concern stays encapsulated and APIs shrink. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) adds that SRP is not "do one thing" but "group behaviors under one accountable responsibility" — over-granularizing classes can violate the cognitive simplicity the principle is meant to provide.

Where state lives has consequences that propagate through entire systems. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread so that serialization, debugging, recovery, and forking become trivial. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) takes a platform-level stance: persisting workflow state at every step so distributed applications recover automatically without manual reconciliation. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) taxonomizes durable execution into stateless functions, sessions, and actors along a behavior-state continuum, then maps Temporal, Restate, DBOS, and Resonate to those patterns. [Building CI with Lambda Durable Functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) demonstrates the same principle in practice: a two-layer Lambda hierarchy runs a stateful CI scheduler without a long-lived process.

For agent systems, architectural choice between rigid state machines, orchestrators, and single general-purpose agents directly determines reliability — not prompt quality. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through all three architectures and concludes that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) generalizes this: reliable agents need deterministic state transitions and validation checkpoints encoded in software. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve — an architectural bet on interface stability over implementation stability.

Code organization at the file and directory level is also architecture. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues for grouping by domain vertical rather than horizontal technical layers, improving cohesion, discoverability, and AI-agent effectiveness. [Ban Commits Using AST Analysis](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) enforces strict DB layer ownership at the linter level — an example of encoding architectural constraints into the toolchain rather than relying on convention.

Constraints enforced at boundaries prevent structural drift. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules into a living knowledge base that AI agents query in real time, with its Lun tool blocking non-compliant code at the Git layer. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) notes that AI-native codebases require specs and architectural decisions written somewhere the AI can read; without them, each session re-derives foundational choices from scratch and the codebase loses coherent structure over time.

Architecture diagrams are the medium through which these decisions get communicated. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies failure modes — unlabeled resources, overloaded master diagrams, oversimplified behavioral flows — that make diagrams actively misleading. And auditing existing architecture before making new decisions matters: [How I Audit a Legacy Rails Codebase](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) starts with stakeholder interviews to surface fear and knowledge gaps before touching any tooling, treating the social layer of architecture as primary evidence.
