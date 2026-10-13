---
title: Software architecture
summary: >-
  Software architecture encompasses the structural decisions that determine how
  systems are organized, how components communicate, and how constraints are
  enforced — decisions that compound over time and shape what a system can
  become.
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
compiled_at: '2026-10-13T00:22:33.056Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12683
    output_tokens: 1413
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
  cost_usd: 0.059244
---
Architecture is not a single decision but a stack of them: how modules are bounded, how state is managed, how interfaces are drawn, and where enforcement lives. The sources here collectively argue that good architecture makes correct behavior the path of least resistance, and bad architecture makes every session a fresh negotiation with accumulated drift.

The principle of deep modules — small interfaces hiding large implementations — appears in [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) as a durable heuristic for reducing complexity, and the claim extends naturally to LLM-assisted codebases: when a module's surface area is small, an agent can reason about it without needing to internalize its internals. The Single Responsibility Principle, as clarified in [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle), reinforces this by arguing that SRP is about cohesive grouping under one accountable responsibility, not about atomizing code into the smallest possible units. Over-granularization violates the cognitive simplicity SRP is meant to provide.

How concerns are grouped spatially matters too. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues for organizing frontend code by domain vertical rather than horizontal technical layer, improving cohesion and discoverability. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same logic at the component level: bloated input APIs should be refactored into Composite Component patterns, with features distributed into directives and sub-components so each concern remains encapsulated.

State management is where architectural choices become most consequential. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) taxonomizes durable execution into stateless functions, sessions, and actors along a behavior-state continuum. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) show what it looks like to persist workflow state at every step so distributed systems recover from failure without manual reconciliation logic. The 12-factor-agents guidance goes further, arguing in [Factor 5: Unify Execution State](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) that execution state and business state should collapse into a single context-window-derived thread whenever possible, making the system trivially serializable, debuggable, and resumable.

Enforcement at the boundary is a recurring theme. [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows Zod schema validation catching unexpected backend response shapes at development time rather than runtime. [Ban commits/transactions using AST analysis](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) advocates enforcing DB layer ownership via AST-based tests and linters so the constraint is structural, not social. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a living knowledge base that blocks non-compliant code at the Git layer before it merges. [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates the consequences of enforcement gaps: a GitHub bug silently deleted thousands of lines by building temp branches off the wrong base, an incident Trunk avoided through a deliberate architectural choice about where temp branches are allowed to live.

For agent-driven and AI-native systems, architectural clarity becomes especially load-bearing. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through three successive architectures, concluding that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering for reliability. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) frames this as an AI-native startup imperative: without specs and architectural constraints written somewhere the AI can read, each session re-derives foundational decisions from scratch and the codebase accumulates drift with no coherent mental model.

Documentation of architecture is its own failure mode. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies pitfalls — unlabeled resources, overloaded master diagrams, fan traps, over-reliance on AI generation — that produce diagrams which obscure rather than communicate structure. Separately, [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) points out that architects often describe their decisions in complexity-management terms while the rest of the business thinks in terms of uncertainty reduction, and that gap is itself an architectural risk.
