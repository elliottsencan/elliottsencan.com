---
title: Software architecture
summary: >-
  Software architecture is the set of structural decisions that determine how
  systems are organized, how components relate, and how well those systems can
  be understood, extended, and recovered from failure.
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
compiled_at: '2026-06-21T18:26:42.298Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11582
    output_tokens: 1200
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
  cost_usd: 0.052746
---
Architecture decisions accumulate. A choice made early about how modules relate, where state lives, or how components expose their interfaces shapes every decision that follows — and the cost of reversing it compounds. That compounding logic runs through nearly every source here, whether the subject is frontend layouts, distributed workflows, AI agents, or legacy Rails codebases.

At the component level, two principles recur: hide complexity behind narrow interfaces, and group behavior by responsibility rather than by task count. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that a small interface over a large implementation reduces cognitive load for both human readers and LLMs. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects the common misreading of SRP: it is about cohesive accountability, not granularity. Over-splitting classes in the name of SRP violates the very simplicity SRP is supposed to produce. Angular's component design literature echoes this: [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) documents how components bloated with inputs should be refactored into composites where each concern is encapsulated behind a clean API.

State management is where architectural intent most often breaks down in practice. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that separating execution state from business state adds complexity that is rarely justified — inferring both from a single serializable thread keeps the system debuggable, recoverable, and forkable. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and the taxonomy in [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) address the same problem at the infrastructure layer: durable execution platforms persist workflow state at every step so distributed systems can recover from failures without manual reconciliation. [Building CI with Lambda Durable Functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows this pattern applied to CI orchestration — a stateful scheduler with no long-lived process.

For agent systems specifically, architectural constraints outperform prompt engineering. [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces three architectural generations of a data engineering agent, concluding that tool design and context visibility do more for reliability than elaborate prompts. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point from the control-flow angle: deterministic state transitions and validation checkpoints, not prompt chains, are what prevent complex tasks from collapsing. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) architecture separates the harness, session log, and sandbox behind stable interfaces so that model upgrades can be swapped without restructuring the surrounding system.

Diagrams are often where architecture is communicated — and where it is most distorted. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies structural failures like overloaded master diagrams and fan traps that make systems look simpler or more coherent than they are, obscuring the very decisions diagrams are supposed to capture.

Architectural legibility has also become a first-order AI concern. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) argues that specs and architectural decision records are not optional overhead in AI-assisted development — without them, each session re-derives foundational decisions from scratch and the codebase drifts into incoherence. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) takes that further by centralizing architectural rules into a living knowledge base that agents query in real time, with a Git-layer enforcement hook blocking non-compliant code before it merges.

Across frontend, backend, and agent systems, the pattern is consistent: decisions about structure, interface boundaries, and state representation are the lever that determines whether a system stays comprehensible as it grows.
