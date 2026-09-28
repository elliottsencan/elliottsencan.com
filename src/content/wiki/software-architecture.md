---
title: Software architecture
summary: >-
  Software architecture spans module boundaries, state management, deployment
  topology, and the structural decisions that determine how well a system can be
  understood, extended, and recovered from failure.
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
compiled_at: '2026-09-28T23:11:08.777Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12683
    output_tokens: 1426
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
  cost_usd: 0.059439
---
Architecture is the set of structural decisions that determine how a system's parts relate to each other, how state flows through them, and how the whole behaves when pieces fail or change. The sources here span frontend layout, distributed workflows, agent design, and module organization, but a consistent through-line runs across all of them: constraints encoded in structure outperform constraints encoded in runtime behavior or documentation.

At the module level, [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce complexity for both human readers and LLMs. The opposite failure mode, splitting behavior into too many shallow pieces, shows up in Angular component design: [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) identifies components bloated with dozens of inputs as a structural smell, addressable by moving concerns into directives and sub-components. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) reinforces this, arguing that SRP is misread as "do one thing" when it actually means grouping behaviors under a single accountable responsibility. Over-granularizing violates the cognitive simplicity SRP is meant to provide.

State management is another structural axis. [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) makes the case for unifying execution state and business state into a single context-window-derived thread, which makes the system trivially serializable, debuggable, and resumable. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps a complementary taxonomy across stateless functions, sessions, and actors, showing how platforms like Temporal implement these along a behavior-state continuum. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) itself demonstrates the value: persisting workflow state at every step lets distributed applications recover from failures without manual reconciliation. [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies durable execution to CI orchestration, using a two-layer Lambda hierarchy and callback-driven coordination to run stateful workflows without a long-lived process.

For distributed agent systems, architectural shape matters as much as prompting. [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through three architectures — rigid state machine, orchestrator, general-purpose agent — finding that environmental constraints (tool design, ID keys, context visibility) outperform prompt engineering. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) reaches the same conclusion: reliable agents need deterministic state transitions and validation checkpoints encoded in software. [Anthropic's Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve.

Frontend architecture follows similar principles. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that component-first UIs should encode layout constraints intrinsically via fluid values and container queries rather than global viewport breakpoints. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) extends this to file organization: domain verticals rather than horizontal technical layers improve cohesion and make codebases more legible to agents as well as humans.

Architectural documentation and enforcement close the loop. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules into a living knowledge base and blocks non-compliant code at the Git layer before merge. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) frames this as a first-principle for AI-native development: without specs and architectural constraints written somewhere the AI can read, each session re-derives foundational decisions from scratch and the codebase drifts. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) documents the documentation side of this: overloaded diagrams, unlabeled resources, and fan traps all degrade the shared mental model that architecture is supposed to provide.

[How's Linear so fast?](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows what architectural commitment looks like in production: local-first IndexedDB sync, aggressive code splitting, and service worker precaching combine into near-instant perceived performance. [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) questions the abstractions one layer below, arguing that VMs tied to fixed resources and slow remote block devices are structurally wrong for modern workloads. Architecture is never finished; the question is which constraints are load-bearing and which are inherited by accident.
