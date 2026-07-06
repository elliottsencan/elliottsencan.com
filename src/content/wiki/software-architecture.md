---
title: Software architecture
summary: >-
  The structural decisions that shape how systems are organized, how components
  communicate, and how complexity is managed — spanning module design, state
  handling, deployment topology, and the conventions that keep codebases
  coherent over time.
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
compiled_at: '2026-06-22T07:15:32.947Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11764
    output_tokens: 1514
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
  cost_usd: 0.058002
last_source_added: '2026-07-06T00:06:02.351Z'
---
Architecture is the set of decisions that determine how a system's parts fit together and why. Those decisions show up at every scale: the shape of a single module, the boundary between two services, the way state moves through a distributed workflow, and the conventions that prevent a codebase from fragmenting session by session.

At the module level, the tension is between hiding complexity and exposing the right surface. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce cognitive load for both humans and LLMs, where shallow modules with wide interfaces push complexity onto callers. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) pushes back on the common misreading of SRP as "do only one thing," arguing that the principle actually calls for cohesive grouping under a single accountable responsibility — over-granularizing classes trades one kind of mess for another.

At the component level, the same logic applies to UI code. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that bloated components with dozens of inputs should be decomposed using the Composite Components pattern, moving concerns into directives and sub-components. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes a parallel structural argument for layout: intrinsic CSS — container queries, fluid `clamp()` values, container units — should replace viewport breakpoints, reserving media queries for device capabilities rather than sizing logic.

State management is where structural choices have the longest tail. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) proposes a taxonomy of stateless functions, sessions, and actors mapped along a behavior-state continuum, showing how Temporal, Restate, DBOS, and Resonate each implement these patterns differently. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) itself represents the durable execution approach: persisting workflow state at every step so distributed applications recover automatically. [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies this concretely — Depot's CI orchestrator uses a two-layer Lambda hierarchy and callback-driven coordination to run a stateful workflow scheduler without a long-lived process. The 12-factor-agents project takes a complementary stance: [Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) recommends unifying execution state and business state into a single context-window-derived thread so that serialization, debugging, and recovery all become trivial.

Agent system architecture has emerged as its own design space. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through three architectures — rigid state machine, orchestrator, then single general-purpose agent — concluding that environmental constraints outperform prompt engineering. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) frames this as a general principle: reliable agents need deterministic state transitions and validation checkpoints encoded in software. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) architecture separates harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve — cutting p50 time-to-first-token by ~60%. Their earlier [harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator structure for multi-hour autonomous coding.

Cross-cutting structural concerns recur across several sources. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules into a living knowledge base that AI agents query in real time, with a Git-layer tool blocking non-compliant code before it merges. The [Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) frames this as survival: without specs and architectural constraints written somewhere the AI can read, each session re-derives foundational decisions from scratch and the codebase drifts. [How I Audit a Legacy Rails Codebase](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) shows the diagnostic version of the same problem — reading schema and Gemfile before any tooling, because structure reveals what fear and politics will not.

Diagram quality is also architectural work. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies unlabeled resources, overloaded master diagrams, and over-reliance on AI as the most damaging pitfalls — a reminder that how a system is represented shapes how it is understood and changed.

[Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) situates all of this in a business context: senior engineers think in terms of complexity management while stakeholders think in terms of uncertainty reduction. Bridging that gap is itself an architectural skill.
