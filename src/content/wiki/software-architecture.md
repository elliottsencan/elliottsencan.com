---
title: Software architecture
summary: >-
  The structural decisions that determine how a system's components relate,
  communicate, and evolve — spanning module boundaries, state management, layer
  ownership, and the tradeoffs between simplicity and capability.
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
compiled_at: '2026-07-21T05:06:34.464Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12533
    output_tokens: 1448
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
  cost_usd: 0.059319
---
Software architecture is the set of decisions that determine how a system is organized: where responsibilities live, how components communicate, which concerns are separated and which are unified, and what constraints propagate across the codebase over time. These decisions compound. Getting them right early reduces cognitive load; getting them wrong creates the kind of technical debt that neither refactoring sprints nor AI coding assistants can easily undo.

The most durable architectural principles center on managing complexity through deliberate structure. The Single Responsibility Principle is widely misread as "do one thing" when it actually means [cohesive grouping of behaviors under a single accountability](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) — over-granularizing creates more cognitive surface area, not less. A related argument comes from module design: [deep modules with small interfaces hiding large implementations](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) reduce the number of decisions a caller must make, and this matters especially now that LLMs traverse codebases — shallow interfaces multiply the concepts a model must hold simultaneously.

Layering and ownership decisions have similar weight. Organizing frontend code by [domain verticals rather than horizontal technical layers](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) keeps related logic colocated, which improves discoverability and makes AI-agent traversal more effective. On the backend, [enforcing strict DB layer ownership of commits and transactions](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) through AST-based linting prevents leakage across layer boundaries before it reaches production. Angular's component design literature makes the same argument at the UI level: [components bloated with dozens of inputs should be refactored into composites](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to), with each concern encapsulated in directives or sub-components.

State management is another axis where architectural choices have long-range consequences. The 12-factor agents guide argues for [unifying execution state and business state into a single context-window-derived thread](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), avoiding the complexity of tracking current step, retry counts, and workflow position as separate records. Temporal and its contemporaries take the complementary approach at infrastructure scale: [persisting workflow state at every step so distributed applications recover from failures automatically](/reading/2026-04/2026-04-30t231511-temporal). Jack Vanlightly's taxonomy maps this design space into [three durable function forms — stateless functions, sessions, and actors](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) — showing how platforms like Temporal and Restate implement different points on the behavior-state continuum. Depot's CI orchestrator is a practical case: [Lambda durable functions run a stateful, checkpointed scheduler without a long-lived process](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

For agentic systems specifically, architectural choices outperform prompt engineering. A data engineering agent evolved through rigid state machine, orchestrator, and single general-purpose agent forms, and the finding was that [environmental constraints — tool design, ID keys, context visibility — determine reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) more than prompts do. Anthropic's managed agents service demonstrates the same principle at service level: [separating the agent harness, session log, and sandbox into stable interfaces](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) lets implementations swap as models improve.

Architectural legibility has become a first-class concern in AI-assisted development. [Founders who skip specs, architectural decision records, and context files hit a wall where every new session re-derives foundational decisions from scratch](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup), and the resulting codebase has no coherent mental model even if no single piece is obviously broken. MarkdownLM addresses this by [centralizing architectural rules into a living knowledge base that AI agents query in real time, with a Git-layer tool that blocks non-compliant code before merge](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms).

Even diagramming has architectural stakes. [Seven common pitfalls in architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) — unlabeled resources, fan traps, overloaded master diagrams, oversimplified behavioral flows — reflect the same underlying problem: representations that obscure rather than communicate structure. A diagram that cannot be read is an architectural decision that cannot be evaluated.

At the platform level, [today's cloud abstractions — VMs tied to fixed resources, slow remote block storage, expensive networking — are structurally misaligned with the workloads they now run](/reading/2026-07/2026-07-05t170602-building-a-cloud), which explains why application-layer architecture has grown so complex. The 44-layer frontend stack is the downstream consequence of [each tool being built to solve a specific pain introduced by the layer beneath it](/reading/2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent). Understanding that history is part of understanding any system built on top of it.
