---
title: Software architecture
summary: >-
  Software architecture spans module boundaries, state management, deployment
  topology, and organizational structure — with recurring pressure to keep
  interfaces small, state unified, and constraints encoded in the system rather
  than enforced by convention.
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
compiled_at: '2026-09-07T21:21:53.620Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12683
    output_tokens: 1468
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
  cost_usd: 0.060069
---
The architectural choices made early in a system's life determine what kinds of changes remain cheap later. That principle appears across contexts: [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) warns that AI-native startups that skip specs and architectural decision records end up with codebases that have no coherent mental model, because each AI session re-derives foundational decisions from scratch and those decisions drift. The same compounding effect shows up in legacy codebases: a consulting engineer's week-one Rails audit [starts with stakeholder interviews and the schema](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) precisely because that accumulated history of decisions is the only honest map of what the system is.

Module design shapes how manageable a system stays under change. The argument for deep modules — small interfaces hiding large implementations — is that they reduce the cognitive surface area exposed to callers, making the system easier for both humans and LLMs to evolve [without requiring callers to understand internals](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). The Single Responsibility Principle points in the same direction but is frequently misread: it does not mean each class does only one thing, but that [cohesive behaviors with a single accountable reason to change stay together](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). Over-granularizing violates the cognitive simplicity SRP was meant to provide. At the component level, Angular's Composite Components pattern applies the same logic: [components bloated with dozens of inputs should push features into directives and sub-components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) so each concern stays encapsulated and the public API stays clean.

File and folder organization is itself an architectural decision. Organizing frontend codebases by domain verticals rather than horizontal technical layers [improves cohesion and discoverability, and happens to make AI agents more effective](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) because related files land in context together. DB layer ownership of transactions follows similar reasoning: [banning manual commits outside the DB layer via AST-based tests and linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) encodes a constraint that convention alone cannot hold.

State management is where architectural decisions most visibly become runtime behavior. The 12-factor-agents guidance argues that [execution state and business state should be unified into a single context-window-derived thread](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), making the system trivially serializable, debuggable, and recoverable. Durable execution platforms like Temporal take a complementary position: [persisting workflow state at every step lets distributed applications recover automatically from failures](/reading/2026-04/2026-04-30t231511-temporal) without manual reconciliation. Jack Vanlightly taxonomizes durable execution into [three forms — stateless functions, sessions, and actors — mapped along a behavior-state continuum](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms), showing how Temporal, Restate, DBOS, and Resonate each implement these patterns. Depot's CI orchestrator demonstrates the pattern concretely: [AWS Lambda durable functions run a stateful, checkpointed workflow scheduler without keeping a long-lived process alive](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Constraints enforced by the environment consistently outperform constraints enforced by convention or prompt. A data engineering agent [evolved through rigid state machine, orchestrator, and single general-purpose agent architectures](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it), with the conclusion that tool design and context visibility beat prompt engineering for LLM reliability. MarkdownLM extends this into [a living knowledge base that AI agents query in real time, with its Lun tool blocking non-compliant code at the Git layer](/reading/2026-04/2026-04-30t231319-markdownlm) before it merges. Anthropic's Managed Agents service separates harness, session log, and sandbox into [stable interfaces so implementations can be swapped as models improve](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands), cutting time-to-first-token and enabling multi-brain architectures.

Architecture diagrams — the communication layer for all of this — have their own failure modes. [Seven common pitfalls](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) include unlabeled resources, overloaded master diagrams, oversimplified behavioral flows, and over-reliance on AI generation, each of which obscures rather than clarifies system structure. Linear's near-instant performance demonstrates what coherent architectural choices produce in practice: [local-first IndexedDB sync, aggressive code splitting, service worker precaching, and optimistic updates](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) add up to a perceptibly different product. Cloud infrastructure itself is not exempt: [the argument that VMs tied to fixed resources and slow remote block devices are fundamentally wrong abstractions](/reading/2026-07/2026-07-05t170602-building-a-cloud) extends architectural critique all the way down to the platform layer.
