---
title: Software architecture
summary: >-
  How systems are structured — their modules, state models, interfaces, and
  constraints — shapes everything from reliability and performance to how well
  humans and AI tools can reason about and evolve them.
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
compiled_at: '2026-07-01T02:05:32.011Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11882
    output_tokens: 1405
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
  cost_usd: 0.056721
---
Architecture is the set of decisions that determine how a system's parts fit together, how state flows through them, and what constraints govern change. Those decisions compound: good ones reduce the cognitive load of every subsequent engineer; bad ones force workarounds that obscure intent until someone inherits a codebase with no coherent mental model behind it.

Module design sits at the center of many sources here. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues for small interfaces hiding large implementations, contrasting shallow Go modules that expose complexity against deep ones that absorb it. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) refines this: SRP is not "do one thing" but "group behaviors under a single accountable responsibility," and over-granularizing classes violates the cognitive simplicity the principle was designed to provide. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same instinct to UI: components bloated with dozens of inputs should be refactored into composite patterns where each concern stays encapsulated and APIs remain clean.

State management is the other axis. The 12-factor-agents material on [unifying execution and business state](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that separating the two into distinct systems adds complexity that rarely pays off — inferring execution state from the context window yields a single serializable source of truth with trivial recovery and forking. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) takes the complementary position at the infrastructure layer: persist workflow state at every step so distributed applications recover from failures automatically. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) taxonomizes durable execution into stateless functions, sessions, and actors, showing how Temporal, Restate, DBOS, and Resonate each implement these along a behavior-state continuum. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) demonstrates this in production: a two-layer Lambda hierarchy runs stateful, checkpointed workflows without a long-lived process.

At the agent layer, architecture choices determine reliability more than prompting does. [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces three architectures — rigid state machine, orchestrator, then general-purpose agent — concluding that tool design and environmental constraints outperform prompt engineering. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) restates this: explicit state transitions and validation checkpoints in software, not elaborate prompt chains, are what let agents handle complex tasks. [Anthropic's Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates harness, session log, and sandbox into stable interfaces precisely so implementations can be swapped as models improve.

Diagramming and documentation are where architectural intent gets communicated — or lost. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies recurring pitfalls: unlabeled resources, disconnected nodes, overloaded master diagrams, oversimplified behavioral flows, and over-reliance on AI generation. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) addresses the enforcement side: centralizing architectural rules in a living knowledge base that AI agents query in real time, with its Lun tool blocking non-compliant code at the Git layer.

Performance architecture deserves its own line. [How's Linear so fast](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows what local-first IndexedDB sync, aggressive code splitting, service worker precaching, and optimistic updates produce when pursued deliberately. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the structural argument for the front end: fluid clamp() values and container queries eliminate the brittle viewport assumptions baked into breakpoint-driven layouts.

The through-line is that architecture is a form of constraint design. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) frames this in organizational terms: senior engineers think in complexity management while the rest of the business thinks in uncertainty reduction, and the gap between those frames is where architectural decisions go unexplained and unmaintained. The [Founders Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) makes the same point for early-stage products: without specs and architectural constraints written somewhere the AI can read, each session re-derives foundational decisions from scratch and the codebase drifts into incoherence.
