---
title: Software architecture
summary: >-
  Software architecture spans the structural decisions that determine how
  systems handle complexity, state, failure, and change — from module boundaries
  and deployment topology to the abstractions that govern human and AI
  collaboration on codebases.
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
compiled_at: '2026-07-06T00:20:58.072Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12177
    output_tokens: 1344
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
  cost_usd: 0.056691
---
Architecture is the set of decisions that are hard to reverse: how state is stored, where boundaries fall between components, which invariants the system must uphold, and how failure is handled. The sources here collectively argue that good architecture is primarily about managing complexity rather than enabling any particular feature.

The clearest through-line is boundary design. ["AI Likes Deep Modules"](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes the case that small interfaces hiding large implementations reduce the cognitive load that both humans and LLMs carry when working in a codebase. The Single Responsibility Principle, properly understood, is the same insight: not "do one thing" in the trivially granular sense, but group behaviors that share a reason to change under one accountable owner, as [Henrique Teixeira argues](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). Over-splitting violates the very cognitive simplicity the principle is meant to provide. [TkDodo's vertical codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) applies the same logic at directory scale: organizing by domain rather than technical layer improves cohesion and discoverability, and makes AI-assisted navigation more effective.

State management is the second persistent theme. The 12-factor agents guideline on [unifying execution and business state](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that separating them adds complexity without payoff in many cases; inferring all execution state from the context window simplifies serialization, debugging, and recovery. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and the [durable function taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) show how this principle extends to distributed systems: persisting workflow state at every checkpoint lets long-running processes recover automatically rather than through manual reconciliation. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same pattern with AWS Lambda durable functions, running stateful schedulers without keeping a long-lived process alive.

For agent and AI system architecture specifically, several sources converge on environmental constraints over prompt engineering. The [data engineering agent case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) found that tool design, ID keys, and context visibility outperformed elaborate prompting across three successive architectures. [Brian Suh's post on control flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) frames the same finding as software engineering: deterministic state transitions and validation checkpoints are the mechanism, not prompt chains. Anthropic's [Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) extends this to multi-agent systems, separating the agent harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve.

Architectural diagrams carry their own failure modes. [Billy Pilger's survey](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies unlabeled resources, overloaded master diagrams, and over-reliance on AI generation as common pitfalls — the diagram as a communication artifact has to be as carefully designed as the system it represents.

Component-level architecture has parallel concerns. Angular's [form model design guidance](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) and the [composite components pattern](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) both argue that bloated inputs and mixed concerns are the primary sources of fragility, and that separating form models from domain models and moving features into focused sub-components restores clarity. [Zod validation in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) addresses the boundary between internal and external state: schema enforcement at the API layer catches contract violations before they propagate as runtime errors.

At the infrastructure level, [DigitalOcean's inference router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) and [Linear's local-first sync architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) show that performance is itself an architectural decision made at design time, not an optimization added later. The [AI-native startup playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) arrives at the same conclusion from a product angle: skipping specs and architectural decision records when building with AI tools compounds into a codebase with no coherent mental model, where each session re-derives foundational decisions from scratch.
