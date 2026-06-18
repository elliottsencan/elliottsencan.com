---
title: Software architecture
summary: >-
  Software architecture governs how systems are structured, how components
  communicate, and how complexity is managed over time — principles that apply
  equally to UI layouts, agent pipelines, distributed workflows, and legacy
  codebases.
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
compiled_at: '2026-06-18T22:52:43.699Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11752
    output_tokens: 1207
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
  cost_usd: 0.053361
---
Architecture decisions accumulate. They determine what a system can become, not just what it is today. The sources here approach that truth from many angles: UI composition, agent reliability, distributed state, module design, and the diagrams teams use to reason about it all.

At the component level, two complementary principles recur. The Single Responsibility Principle, as [Teixeira argues](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle), is not about doing "one thing" in a narrow sense but about cohesive grouping under a single accountable responsibility. Over-granularizing classes produces fragmentation that defeats the cognitive simplicity SRP is meant to provide. The related concept of deep modules — small interfaces hiding large implementations — is the positive formulation: [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that deep modules reduce complexity for both humans and LLMs, because the surface area that callers must understand stays minimal regardless of how much work happens underneath. Angular's component model illustrates what happens when the opposite choice is made: [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) describes components bloated with dozens of inputs and argues for the Composite Components pattern to push concerns into directives and sub-components.

At the system level, the biggest architectural question is often where state lives and how it flows. Linear's local-first architecture — IndexedDB sync, optimistic updates, service worker precaching — is the reason the app feels instant; [Brotzky's breakdown](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) treats these as deliberate structural choices, not performance tricks. Temporal and similar durable execution platforms answer the same question for long-running distributed work: persist state at every step so failures require no manual reconciliation [Temporal](/reading/2026-04/2026-04-30t231511-temporal). Vanlightly's taxonomy of durable function forms — stateless functions, sessions, actors — maps how different platforms position themselves along a behavior-state continuum [Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms). Depot's CI orchestrator makes the same tradeoff concrete: a two-layer Lambda hierarchy runs a stateful workflow scheduler without any long-lived process [Scholten](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

For agent systems, architectural choices around state and control flow determine reliability more than prompt quality does. [Aiyan's data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) evolved through a rigid state machine, then an orchestrator, then a single general-purpose agent, finding that environmental constraints — tool design, ID keys, context visibility — outperformed prompt engineering at every stage. The 12-factor-agents project extends this: [Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, because a unified thread is trivially serializable, debuggable, and resumable. Anthropic's Managed Agents service takes a complementary approach at scale, separating the agent harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve [Martin et al.](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Across all of these domains, documentation and diagrams are where architectural intent either survives or dissipates. [Pilger's catalogue of diagram mistakes](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) — unlabeled resources, fan traps, overloaded master diagrams, oversimplified behavioral flows — points to how easily a diagram obscures the very structure it is supposed to communicate. MarkdownLM takes a more proactive stance, centralizing architectural rules and engineering standards into a living knowledge base that AI agents query in real time, with its Lun tool blocking non-compliant code at the Git layer [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm).

The throughline is that architecture is a form of constraint design. Whether the domain is UI layout, distributed state, agent control flow, or module boundaries, the decisions that matter most are the ones that make bad states unreachable — not the ones that try to handle them after the fact.
