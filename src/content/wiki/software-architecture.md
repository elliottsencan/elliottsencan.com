---
title: Software architecture
summary: >-
  Software architecture shapes how systems behave under pressure, how teams
  reason about codebases, and how much complexity accumulates over time —
  spanning module design, state management, deployment topology, and the
  feedback loops that keep all three honest.
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
compiled_at: '2026-07-09T23:29:08.850Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12177
    output_tokens: 1564
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
  cost_usd: 0.059991
last_source_added: '2026-07-16T15:05:20.763Z'
---
Architecture is the set of structural decisions that constrain everything built afterward. Choosing how to decompose a system, where to hold state, and how components communicate determines not just initial behavior but long-term maintainability and the cognitive load placed on every contributor.

Module design sits at the core of most architectural debates. The Single Responsibility Principle is widely misapplied as "do one thing" when it actually calls for cohesive grouping under a single accountable concern [single-responsibility-the-distorted-principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). Deep modules — small interfaces hiding large implementations — reduce the surface area that both humans and LLMs must understand to work with a system safely [ai-likes-deep-modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). In Angular specifically, components bloated with dozens of inputs are a structural smell; the Composite Components pattern moves concerns into directives and sub-components so each piece stays encapsulated [a-better-way-to-build-angular-components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to). Frontend codebases face an analogous tension: organizing by horizontal technical layers (components/hooks/utils) creates coupling across domains, while vertical domain-first colocation improves cohesion and discoverability the-vertical-codebase.

State management is where architectural choices become most consequential under failure. Temporal and its peers represent a class of durable execution platforms that persist workflow state at every step so distributed applications recover automatically [temporal](/reading/2026-04/2026-04-30t231511-temporal). A useful taxonomy breaks durable execution into three forms — stateless functions, sessions, and actors — mapped along a behavior-state continuum, with Temporal, Restate, DBOS, and Resonate implementing each differently [the-three-durable-function-forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms). Depot's CI orchestrator applies this idea concretely: AWS Lambda durable functions run a stateful, checkpointed scheduler without a long-lived process [building-ci-with-lambda-durable-functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions). The 12-factor-agents project argues that AI applications should unify execution state and business state into a single context-window-derived thread, making the whole workflow serializable, debuggable, and forkable from any point [humanlayer12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

Agent and multi-agent system design has surfaced a new set of architectural decisions. A data engineering agent evolved through rigid state machine, orchestrator, and single general-purpose agent forms before the team concluded that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering for reliability [dont-prompt-your-agent-for-reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Anthropic's Managed Agents service separates the agent harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve [scaling-managed-agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). A GAN-inspired multi-agent harness — planner, generator, evaluator — overcomes context anxiety and self-evaluation bias during long autonomous coding sessions [harness-design-for-long-running-application-development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). Reliable agents generally need deterministic control flow encoded in software rather than elaborate prompt chains [agents-need-control-flow-not-more-prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts).

Architectural documentation and enforcement matter as much as the decisions themselves. MarkdownLM centralizes architectural rules into a living knowledge base that AI agents query at commit time, blocking non-compliant code at the Git layer before it merges [markdownlm](/reading/2026-04/2026-04-30t231319-markdownlm). Architectural diagrams fail predictably through unlabeled resources, overloaded master diagrams, and oversimplified behavioral flows — each a symptom of trying to represent too many concerns in one view [7-more-common-mistakes-in-architecture-diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams). The founders' playbook notes that without specs and architectural constraints written somewhere an AI can read, each new session re-derives foundational decisions from scratch, causing drift that compounds rather than clears [the-founders-playbook-building-an-ai-native-startup](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup).

At infrastructure scale, the wrong abstractions impose costs that accumulate invisibly. Today's cloud platforms — VMs tied to fixed resources, slow remote block storage, expensive networking — are structurally misaligned with how modern workloads actually run [building-a-cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud). Linear's near-instant performance comes from a coherent set of architectural choices: local-first IndexedDB sync, optimistic updates, aggressive code splitting, and service worker precaching — each decision reinforcing the others [hows-linear-so-fast](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown). The through-line across scales is the same: coherent structural decisions compound into systems that are fast, recoverable, and understandable; incoherent ones compound into systems that are none of those things.
