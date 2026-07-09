---
title: Software architecture
summary: >-
  Software architecture is the set of decisions that determine how a system's
  components are structured, composed, and bounded — decisions that shape
  correctness, maintainability, and the cognitive load placed on everyone who
  works with the system afterward.
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
compiled_at: '2026-07-09T14:19:45.446Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12177
    output_tokens: 1339
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
  cost_usd: 0.056616
---
Architecture is rarely a single decision. It is a accumulation of choices about where boundaries go, how state is managed, what each unit is responsible for, and how the pieces communicate. The sources here converge on a few recurring tensions: the cost of separation versus the cost of coupling, the value of environmental constraints over ad-hoc workarounds, and the way structural choices propagate forward in time.

The most persistent theme is how responsibility gets carved up. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that SRP is routinely misread as "do only one thing" when it actually means cohesive grouping under a single accountable responsibility. Over-granularizing creates its own complexity and violates the cognitive simplicity SRP was meant to provide. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes the complementary case: small interfaces hiding large implementations reduce the cognitive surface area for both humans and LLMs. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies this to component design, arguing that inputs-bloated components should be refactored using composition patterns so each concern stays encapsulated and APIs remain clean.

State management is a second axis. [Factor 5 of 12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread rather than maintaining parallel structures that diverge. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) provides a taxonomy mapping stateless functions, sessions, and actors along a behavior-state continuum, showing how Temporal, Restate, and others position themselves against it. [Building CI with Lambda Durable Functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) demonstrates this in practice: Depot CI uses a two-layer Lambda hierarchy and callback-driven coordination to run stateful workflows without a long-lived orchestrator process.

For agent systems specifically, architecture matters more than prompting. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces one data engineering agent through three architectural iterations, concluding that tool design and context visibility outperform prompt engineering. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) reaches the same conclusion from a different angle: deterministic state transitions and validation checkpoints are what make complex tasks tractable. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) post formalizes this into stable interface contracts separating harness, session log, and sandbox so implementations can be swapped independently.

Organizing code by domain rather than technical layer is another structural claim with broad support. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues that collocating by domain verticals improves cohesion, discoverability, and even AI-agent effectiveness compared to horizontal layers. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) applies this reasoning to frontend layout, arguing that component-intrinsic sizing with container queries should replace viewport-global breakpoints as the primary structural unit.

Architecture also determines what can be enforced automatically. MarkdownLM centralizes architectural rules into a knowledge base that AI agents query in real time, with a Git-layer tool blocking non-compliant code before it merges. [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows the inverse: a structural decision about where temporary branches are pushed was the difference between avoiding and suffering a silent data-loss bug at scale.

Finally, architecture accrues debt in ways that differ from ordinary technical debt. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) notes that AI-assisted development compounds architectural drift when specs and constraints are not written down, because each session re-derives foundational decisions from scratch. [Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) points out that even the communication of architecture has failure modes: overloaded master diagrams, unlabeled resources, and over-reliance on AI generation all obscure rather than clarify the actual structure of a system.
