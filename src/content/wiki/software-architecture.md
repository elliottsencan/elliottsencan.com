---
title: Software architecture
summary: >-
  Software architecture governs how systems are structured, how components
  relate, and how those decisions propagate through reliability,
  maintainability, and team cognition — a concern that spans UI layout, agent
  harnesses, distributed workflows, and module design.
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
compiled_at: '2026-11-10T01:25:28.688Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12683
    output_tokens: 1586
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
  cost_usd: 0.061839
---
Architecture is the set of structural decisions that constrain everything built afterward. Those decisions appear at every level: how a frontend distributes layout responsibility, how an agent coordinates sub-tasks, how a distributed system persists state across failures, how a module exposes its interface. The common thread across sources here is that good architecture reduces the cognitive surface area humans and machines need to hold in mind to change a system safely.

At the UI layer, [Amit Sheen's breakpoint-free argument](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) reframes layout as an intrinsic property of components rather than a viewport condition. Container queries and fluid `clamp()` values let each component own its own sizing logic, eliminating the implicit dependency on global breakpoints — the same separation-of-concerns argument that [Kobi Hari makes for Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to), where dozens of inputs on a single component are a symptom of missing encapsulation, not a feature. Dominik's case for [vertical codebase organization](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) extends this further: collocating code by domain rather than technical layer keeps cohesion visible and makes both human navigation and AI-agent traversal more reliable.

Module design principles underpin these choices. [The "deep modules" argument](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) holds that small interfaces hiding large implementations reduce the complexity tax on every consumer, while [the SRP revisionist reading](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues the principle was never about granularity but about cohesive accountability — over-splitting classes fragments behavior that belongs together and defeats the cognitive goal SRP was meant to serve.

At the system level, architecture directly determines failure behavior. [Temporal's durable execution model](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover automatically; [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this across stateless functions, sessions, and actors, showing how Temporal, Restate, DBOS, and Resonate each occupy different positions on the behavior-state continuum. [Depot's Lambda-based CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same logic practically: a two-layer Lambda hierarchy keeps the scheduler stateful and checkpointed without a long-lived process. The [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates the negative case — an architectural choice to push temp branches to main created a silent failure path that deleted thousands of lines; Trunk's choice to never do that was the entire defense.

For agent systems the structural debates are parallel. [The data engineering agent evolution](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) — from rigid state machine to orchestrator to single general-purpose agent — shows that environmental constraints outperform prompt engineering as a reliability mechanism. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) formalizes this by arguing that unifying execution state and business state into a single context-window-derived thread simplifies serialization, debugging, and recovery. [Anthropic's Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates harness, session log, and sandbox into stable interfaces precisely so implementations can be swapped as models improve. [Brian Suh's control-flow argument](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) is the bluntest: deterministic state transitions encoded in software beat elaborate prompt chains at any meaningful scale of complexity.

Representation matters as much as structure. [Architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) fail when they conflate behavioral and structural views, leave nodes disconnected, or collapse multiple perspectives into one overloaded diagram. [MarkdownLM's approach](/reading/2026-04/2026-04-30t231319-markdownlm) of centralizing architectural rules into a queryable knowledge base — with a Git-layer linter blocking non-compliant code — treats architecture as a live, enforceable contract rather than a document that decays.

[Linear's performance architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows what sustained structural discipline produces: local-first IndexedDB sync, optimistic updates, and aggressive code splitting combine to make latency feel absent. [David Crawshaw's cloud critique](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues the opposite case — that today's cloud primitives (VM-bound resources, slow remote block storage) are foundational abstractions that have been wrong from the start, and that no amount of layering fixes a bad substrate.

The meta-point from [senior developer communication research](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) is that architecture's value is legible inside engineering teams but nearly invisible to the business, which thinks in uncertainty rather than complexity. That gap is a structural problem in itself — and [the AI-native startup playbook's](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) warning about agentic technical debt makes it concrete: without written architectural constraints, each AI coding session re-derives foundational decisions from scratch and the codebase drifts into incoherence that no single piece caused.
