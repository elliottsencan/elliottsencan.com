---
title: Software architecture
summary: >-
  How systems are structured — their modules, state models, interfaces, and
  constraints — determines reliability, evolvability, and how well both humans
  and AI can reason about them.
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
compiled_at: '2026-06-20T12:38:15.165Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11582
    output_tokens: 1230
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
  cost_usd: 0.053196
---
Software architecture is the set of decisions that shape how a system's parts relate: where state lives, how modules expose their interfaces, how failures propagate, and what constraints govern the whole. These decisions compound. Get them right early and the system remains navigable; get them wrong and each new feature pays interest on earlier mistakes.

The tension between interface simplicity and implementation depth runs through several of the sources here. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small, narrow interfaces hiding large implementations reduce cognitive load for both humans and LLMs — the opposite of shallow modules that leak complexity outward. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) makes a related point: SRP is about cohesive grouping under a single accountable responsibility, not about atomizing classes until each does only one mechanical thing. Over-granularizing is itself a violation of the simplicity SRP was meant to produce.

State management is where many architectural choices become load-bearing. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) taxonomizes durable execution into stateless functions, sessions, and actors, showing how platforms like Temporal and DBOS map to that continuum. [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) demonstrates one concrete application: a stateful CI scheduler implemented as two-layer Lambda hierarchies with checkpoint-driven recovery, keeping no long-lived process alive. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, so that serialization, debugging, and recovery all collapse to the same operation.

Agent systems surface these tensions in concentrated form. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through three successive architectures — rigid state machine, orchestrator, then single general-purpose agent — concluding that environmental constraints outperform prompt engineering for reliability. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) reinforces this: deterministic state transitions and validation checkpoints encoded in software are what make complex agent tasks tractable. [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) shows how Anthropic stabilized agent infrastructure by separating the harness, session log, and sandbox into clean interfaces so implementations can be swapped as models improve.

Diagramming and documentation are where architectural intent either survives or erodes. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) catalogs recurring failures: unlabeled resources, overloaded master diagrams, fan traps, and behavioral flows too simplified to be useful. These are not aesthetic failures — they reflect underlying ambiguity in the architecture itself.

The stakes of architectural decisions extend to AI-assisted development. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) argues that AI-native codebases require written specs and architectural constraints from day one, because without them each AI session re-derives foundational decisions from scratch and the codebase accumulates incoherence rather than technical debt in the traditional sense. [MarkdownLM](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) takes a complementary approach, centralizing architectural rules into a living knowledge base that agents query in real time, with a Git-layer enforcement step blocking non-compliant code before it merges.

UI architecture follows the same logic. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) applies a component-first framing to layout: intrinsic sizing, container queries, and fluid clamp() values replace viewport breakpoints, keeping layout decisions local to the component rather than scattered across global media queries. And at the infrastructure layer, [Linear's performance architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) demonstrates how local-first IndexedDB sync, optimistic updates, and aggressive code splitting compound into perceptible speed — each decision enabling the next.
