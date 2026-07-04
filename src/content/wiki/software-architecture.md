---
title: Software architecture
summary: >-
  Software architecture spans decisions about module boundaries, state
  management, component composition, and system topology — choices that
  determine how well a system scales, recovers, and remains comprehensible to
  both humans and machines.
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
compiled_at: '2026-07-04T21:27:29.982Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12036
    output_tokens: 1442
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
  cost_usd: 0.057738
---
Architecture is the set of decisions that constrain all subsequent decisions. Where those constraints are well-chosen, the system remains tractable as it grows. Where they are not, complexity compounds in ways that become expensive to reverse.

The most durable architectural principle across the sources here is that complexity should be hidden behind narrow interfaces. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes this explicit: small interfaces hiding large implementations reduce the cognitive surface that any reader — human or LLM — needs to hold in mind. This maps directly onto the Single Responsibility Principle as correctly understood: not "do one small thing" but "group behaviors under one accountable concern" so that the interface remains stable even as the implementation changes. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that over-granularizing classes in the name of SRP actually violates the cognitive simplicity SRP is supposed to provide.

Component design follows the same logic at the UI layer. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs should be refactored via the Composite Components pattern, moving concerns into directives and sub-components so each piece remains encapsulated. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) extends this to file organization, showing that grouping by domain vertical rather than horizontal technical layer improves cohesion and discoverability. Both sources agree that the structure of the code should reflect the structure of the problem domain, not the structure of the toolchain.

State management is a recurring fault line. [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, making the system trivially serializable, debuggable, and resumable. Temporal and its durable execution model [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) approach the same problem differently: by persisting workflow state at every step, distributed systems can recover from failures without manual reconciliation logic. [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies this to CI orchestration specifically, using a two-layer Lambda hierarchy to run a stateful scheduler without a long-lived process. These three converge on the insight that state durability must be a structural property of the system, not an afterthought.

Boundary enforcement matters as much as boundary design. [From Flaky to Flawless: Angular API Response Management with Zod](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time via schema validation before they propagate as runtime errors. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules into a living knowledge base that blocks non-compliant code at the Git layer. [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows the cost of boundary failures at the infrastructure level: a GitHub merge queue bug silently deleted thousands of lines by building off the wrong base commit, and the architectural choice to never push temp branches to main was what avoided the incident for Trunk users.

At scale, topology choices shape reliability in ways that cannot be patched after the fact. [Scaling Managed Agents: Decoupling the Brain from the Hands](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces so implementations can be swapped independently as models improve. [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) situates internal developer platforms as the architectural layer that absorbs infrastructure complexity so product teams do not have to. [How's Linear so fast?](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows what intentional topology produces in practice: local-first IndexedDB sync, aggressive code splitting, and optimistic updates combine into near-instant performance.

Across all of these, the common thread is that architecture decisions determine what is easy and what is hard for everyone who follows. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) puts this starkly in the AI-native context: without written specs and architectural constraints, each AI coding session re-derives foundational decisions from scratch and the codebase drifts into incoherence — not because any single piece is bad, but because the pieces were never designed to fit together. Architecture diagrams themselves can mislead when poorly constructed; [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies unlabeled resources, overloaded master diagrams, and oversimplified behavioral flows as pitfalls that obscure the very decisions diagrams are meant to communicate.
