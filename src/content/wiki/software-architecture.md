---
title: Software architecture
summary: >-
  Software architecture encompasses the structural decisions that determine how
  systems are organized, how components communicate, and how complexity is
  managed — spanning module design, state management, distributed execution, and
  the constraints that enforce coherence over time.
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
compiled_at: '2026-07-02T12:34:59.388Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11882
    output_tokens: 1344
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
  cost_usd: 0.055806
---
Architecture decisions compound. A choice made early about how modules expose their interfaces, how state is tracked, or how services recover from failure shapes everything that follows. The sources here span frontend layout, agent systems, distributed workflows, CI infrastructure, and component design, but they converge on a common thread: structural decisions made at the right layer of abstraction reduce complexity more reliably than runtime fixes or clever prompting.

At the module level, [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) applies John Ousterhout's deep module principle directly: small interfaces hiding large implementations reduce cognitive load for both developers and LLMs. The complementary read is [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle), which argues that SRP is commonly misread as "do only one thing" when it actually means cohesive grouping under a single accountable responsibility. Over-granularizing classes violates the cognitive simplicity the principle was meant to produce. Both pieces push the same direction: units of code should have wide, stable implementations behind narrow contracts.

Component-level architecture follows the same logic. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs should be decomposed using the Composite Components pattern, pushing concerns into directives and sub-components. [Form Model Design in Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) extends this to data modeling: form models should be type-specific and structurally clean, with explicit translation layers between form and domain representations. Meanwhile, [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) applies the same encapsulation instinct to layout, replacing viewport breakpoints with container queries and intrinsic CSS so that components carry their own responsive logic rather than depending on global viewport state.

At the system level, the dominant question is how state is managed under failure. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications can recover automatically. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) taxonomizes durable execution into stateless functions, sessions, and actors, showing how Temporal, Restate, DBOS, and Resonate each implement these patterns across a behavior-state continuum. [Building CI with Lambda Durable Functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) demonstrates this in practice: Depot's CI orchestrator uses a two-layer Lambda hierarchy and callback-driven coordination to run stateful workflows without a long-lived process.

For agent systems specifically, several sources argue that architecture beats prompting. [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces an evolution through rigid state machine, orchestrator, and single general-purpose agent architectures, concluding that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same case: reliable agents need explicit state transitions and validation checkpoints encoded in software. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) extends this to state management, arguing that unifying execution state and business state into a single context-window-derived thread simplifies serialization, debugging, and recovery.

[MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) approaches architectural enforcement from the governance side: centralizing rules and standards into a living knowledge base that AI agents query at runtime, with its Lun tool blocking non-compliant code at the Git layer before merge. The Founders Playbook makes a related point at the startup scale — [founders who skip specs and architectural decision records](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) end up with codebases that drift session to session as AI re-derives foundational choices from scratch.

[7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) covers the communication side: unlabeled resources, overloaded master diagrams, and oversimplified behavioral flows are the most common ways documentation fails to convey actual structure. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) frames this as a translation problem — developers think in terms of complexity management while the rest of the business thinks in terms of uncertainty reduction, and architectural decisions get lost in that gap.
