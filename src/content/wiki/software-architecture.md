---
title: Software architecture
summary: >-
  Software architecture shapes how systems handle complexity, failure, and
  change — spanning component boundaries, state management, diagramming
  practices, and the structural decisions that determine whether a codebase
  remains legible over time.
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
compiled_at: '2026-08-03T10:12:07.474Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12533
    output_tokens: 1311
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
  cost_usd: 0.057264
---
Architecture is ultimately about managing complexity at scale. The choices made early — how components are bounded, where state lives, how layers communicate — compound over time in both directions. Good decisions reduce the surface area that breaks; bad ones create the hidden coupling that surfaces when systems grow or teams change.

The most durable structural guidance tends to center on encapsulation. Deep modules, as [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues, hide large implementations behind small interfaces, reducing the cognitive overhead required to reason about a system. This is related to, but not identical to, the Single Responsibility Principle — which [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues is widely misread as "do one thing" when it actually means cohesive grouping under a single accountable responsibility. Over-granularizing classes or components fragments behavior without reducing complexity. The same logic applies at the component level: [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) shows how Angular components bloated with dozens of inputs should be refactored into composites with directives and sub-components, keeping concerns encapsulated and APIs narrow.

File and folder structure encodes architectural intent. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues that organizing by domain vertical rather than by technical layer (components, hooks, utils) improves cohesion and discoverability — and, practically, makes AI-agent traversal more effective by keeping related code colocated.

State management is where architectural decisions create the most hidden complexity. [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) recommends unifying execution state and business state into a single context-window-derived thread, making the system trivially serializable, recoverable, and observable. Temporal and related durable execution platforms take a complementary approach: [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) taxonomizes durable execution into stateless functions, sessions, and actors mapped along a behavior-state continuum, while [Temporal](/reading/2026-04/2026-04-30t231511-temporal) itself persists workflow state at every step so distributed applications recover from failure automatically. [Building CI with Lambda Durable Functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows this pattern applied to CI orchestration, running a stateful checkpointed scheduler on AWS Lambda without a long-lived process.

Boundary enforcement is a recurring theme. [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows that architectural constraints — tool design, ID keys, context visibility — outperform prompt engineering for LLM agent reliability. [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) demonstrates catching unexpected backend shapes at the boundary using Zod schema validation rather than letting runtime errors propagate. [Ban commits/transactions using AST analysis and linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) extends this to DB layer ownership, using AST-based tests to prevent model leakage into application code.

Diagrams are architecture's communication layer, and they carry their own failure modes. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies concrete pitfalls — unlabeled resources, overloaded master diagrams, fan traps, and behavioral flows that omit branching — with fixes for each.

At the platform level, [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) addresses why internal developer platforms exist and what success looks like, while [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that current cloud abstractions — VMs tied to fixed resources, slow remote block devices — are structurally wrong and need rethinking from scratch.

For AI-native systems, architectural legibility becomes a prerequisite for sustained development. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) notes that skipping specs and architectural decision records means each AI session re-derives foundational choices from scratch, causing drift across the codebase. Documented constraints, readable structure, and enforced boundaries are what keep AI a force multiplier rather than a source of entropy.
