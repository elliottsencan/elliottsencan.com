---
title: Software architecture
summary: >-
  Software architecture spans decisions about module boundaries, state
  management, deployment topology, and how systems communicate — choices that
  determine whether a system remains comprehensible and evolvable under real
  conditions.
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
compiled_at: '2026-08-29T20:22:15.972Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12533
    output_tokens: 1435
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
  cost_usd: 0.059124
---
Architecture is the set of decisions that are expensive to reverse: how responsibilities divide across components, where state lives, how boundaries are drawn and enforced. The sources here converge on one repeated finding — good architecture reduces the cognitive surface area that any one person or agent must hold in mind at once.

Module design sits at the center of that. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues directly for small interfaces hiding large implementations, contrasting shallow modules that leak complexity through their surfaces with deep ones that absorb it. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) makes an adjacent argument: SRP is not about doing one thing, it is about cohesive grouping under a single accountable responsibility, and over-granularizing classes defeats the cognitive simplicity the principle was meant to create. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) extends this to UI components, recommending the Composite pattern to push concerns into directives and sub-components rather than bloating a single input-laden component.

Where responsibility lands shapes how codebases are organized. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues for domain-vertical file organization over horizontal technical layers, improving cohesion and making colocation obvious to both humans and AI agents. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the same kind of argument at the layout layer: intrinsic layouts and container queries keep style decisions local to the component that owns them, rather than scattering breakpoint logic across a global stylesheet.

State management is a repeated fault line. [Factor 5 of 12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread — one source of truth that trivially serializes, debugs, and recovers. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) approach the same problem at the distributed-systems level, where durable execution platforms persist workflow state at every step so long-running processes survive failure without manual reconciliation. [Building CI with Lambda Durable Functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows what that looks like in practice: a two-layer Lambda hierarchy replaces a long-lived orchestrator process with checkpointed stateful execution.

Enforcement of architectural decisions is its own design problem. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes rules and standards into a living knowledge base, blocking non-compliant code at the Git layer before it merges. [Banning commits via AST analysis](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) is a narrower version of the same instinct: encode the constraint in tooling rather than documentation. [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates the cost of weak enforcement: an architectural choice about temp branch handling determined whether a GitHub bug deleted thousands of lines from main.

For AI-assisted development, architecture shapes model effectiveness. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through three architectures, finding that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering. [Anthropic's Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates harness, session log, and sandbox into stable interfaces so implementations can swap as models improve. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) makes the debt argument explicit: without architectural constraints written where AI can read them, each coding session re-derives foundational decisions from scratch and the codebase loses coherence.

[Architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) are where architectural thinking becomes communicable — and where it most often fails through unlabeled nodes, overloaded master diagrams, and over-simplified behavioral flows. [How's Linear So Fast](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows what deliberate architectural choices produce at the product level: local-first IndexedDB sync, aggressive code splitting, and optimistic updates combine into near-instant perceived performance. [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues the same point at infrastructure scale — VMs tied to fixed resources and slow remote block devices are wrong abstractions that accumulate cost across every workload built on top of them.
