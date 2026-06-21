---
title: Software architecture
summary: >-
  How systems are structured at every layer — from module boundaries and state
  models to deployment topology and diagramming — and why those structural
  choices compound over time.
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
compiled_at: '2026-06-21T20:10:49.987Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11582
    output_tokens: 1312
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
  cost_usd: 0.054426
---
Software architecture is the set of decisions that determine how a system's parts are organized, how they communicate, and how they change. The choices made early tend to compound: a module boundary drawn poorly becomes a source of ongoing drag; a state model that separates execution state from business state creates reconciliation work that never quite goes away.

At the module level, two recurring arguments pull in the same direction. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) contends that small interfaces hiding large implementations reduce cognitive load for both humans and LLMs, contrasting deep Go modules against shallow ones that leak internals. The [Single Responsibility Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) piece reinforces this from a different angle: SRP is widely misread as "do only one thing" when it actually means grouping behaviors under a single accountable responsibility. Over-granularizing violates the very cognitive simplicity the principle is meant to protect.

State management is where architectural choices become load-bearing. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, so that serialization, recovery, and debugging all come for free. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps the wider design space — stateless functions, sessions, and actors — along a behavior-state continuum, with Temporal, Restate, DBOS, and Resonate as concrete implementations. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) itself sits at the durable-execution end of that spectrum, persisting workflow state at every step to eliminate manual failure-recovery logic. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies a similar idea at a smaller scale: AWS Lambda durable functions run a stateful, checkpointed scheduler without a long-lived process.

For agent systems specifically, the architectural lesson keeps repeating: structure beats prompting. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) documents a data-engineering agent that evolved through rigid state machine, orchestrator, and single general-purpose agent forms, concluding that environmental constraints — tool design, ID keys, context visibility — outperform elaborate prompts. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same claim from first principles: explicit state transitions and validation checkpoints in software are more reliable than prompt chains under complexity. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) service generalizes this into stable interface contracts between harness, session log, and sandbox, so implementations can swap as models improve.

Component architecture in UI follows a structurally analogous logic. [Angular's component composition piece](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs should be decomposed using the Composite Components pattern, moving features into directives and sub-components so each concern stays encapsulated. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) applies the same encapsulation logic to layout: component-first UIs should use intrinsic CSS and container queries rather than viewport breakpoints, so components carry their own responsiveness rather than depending on global context.

Architectural decisions also have to be communicated and enforced. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) catalogs how diagrams mislead — unlabeled resources, overloaded master diagrams, oversimplified behavioral flows — and the fixes are structural, not cosmetic. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) takes the enforcement side: architectural rules and engineering standards in a living knowledge base that AI agents query in real time, with a Git-layer tool that blocks non-compliant code before it merges.

The throughline across all of these is that architectural decisions reduce future decision-making cost. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) puts it bluntly: without specs and architectural constraints written where AI can read them, each coding session re-derives foundational decisions from scratch and the codebase drifts into incoherence. Structure, written down and enforced, is what keeps a system legible to the people — and now the agents — working inside it.
