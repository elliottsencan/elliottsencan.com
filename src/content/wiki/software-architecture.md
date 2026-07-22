---
title: Software architecture
summary: >-
  Software architecture is the set of structural decisions that determine how
  systems are organized, decomposed, and constrained — decisions whose effects
  on complexity, reliability, and evolvability compound over time.
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
compiled_at: '2026-07-22T05:58:51.043Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12533
    output_tokens: 1364
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
  cost_usd: 0.058059
---
Architecture is not a single decision but an accumulation of them: how responsibilities are divided, where state lives, which boundaries enforce which invariants, and how the pieces communicate. The sources here span UI layout, distributed systems, agent design, and codebase organization, but a common thread runs through all of them: architectural choices made early shape what is even possible to change later.

The most durable architectural principle across these sources is encapsulation of complexity behind narrow interfaces. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes this explicit, arguing that small interfaces hiding large implementations reduce cognitive load for both humans and LLMs. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) reinforces the point from a different angle: SRP is about cohesive grouping under a single accountable concern, not atomization into tiny classes. Over-granularizing violates the cognitive simplicity the principle was designed to provide. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same logic to UI components, arguing that bloated multi-input components should be refactored using the Composite Components pattern, with each concern encapsulated in its own directive or sub-component.

Where state lives is a recurring architectural question. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) both address distributed state: Temporal persists workflow state at every step so applications recover from failures automatically, while Jack Vanlightly's taxonomy maps durable execution into stateless functions, sessions, and actors along a behavior-state continuum. [Building CI with Lambda Durable Functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows this in practice: Depot's CI orchestrator uses AWS Lambda durable functions in a two-layer hierarchy, keeping a stateful scheduler running without a persistent process. The 12-factor-agents guide takes a different angle, arguing that AI apps should [unify execution state and business state](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) into a single serializable thread derivable from the context window, avoiding the complexity of managing them separately.

Boundaries between layers matter as much as the layers themselves. [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how Zod schema validation at the API boundary catches unexpected response shapes before they propagate into application state. [Ban commits/transactions using AST analysis and linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) takes a stricter approach: enforcing DB layer ownership of all commits through AST-based linters and CI checks so that database concerns cannot leak upward. Both are architectural constraints enforced by tooling rather than convention.

Codification of architectural decisions is a theme in several sources. MarkdownLM centralizes architectural rules into a living knowledge base that AI agents query in real time, with its Lun tool blocking non-compliant code at the Git layer. The Founder's Playbook makes the same argument for AI-native startups: [skipping specs and architectural decision records](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) causes each AI coding session to re-derive foundational decisions from scratch, producing drift that compounds into incoherence.

Organizational structure of a codebase is itself an architectural decision. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues for organizing by domain verticals rather than horizontal technical layers, citing improved cohesion, discoverability, and AI-agent effectiveness. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes a parallel argument for component-first UI architecture: intrinsic layout with container queries and fluid clamp() values localizes layout logic within components rather than scattering it across global breakpoints.

Architecture diagrams are themselves a communication artifact with failure modes. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies unlabeled resources, overloaded master diagrams, and oversimplified behavioral flows as pitfalls that make diagrams actively misleading. The broader implication is that architectural thinking has to survive translation into documentation that other people can act on, which connects back to [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise): the gap between how engineers think about structure and how the rest of an organization interprets it is itself an architectural problem.
