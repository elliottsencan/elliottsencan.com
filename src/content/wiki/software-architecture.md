---
title: Software architecture
summary: >-
  Software architecture is the set of structural decisions that determine how a
  system's components are organized, bounded, and connected — decisions that
  compound over time and shape what becomes easy or hard to change.
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
compiled_at: '2026-07-01T04:53:21.673Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11882
    output_tokens: 1362
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
  cost_usd: 0.056076
---
Architecture is not a document or a diagram phase. It is the accumulated weight of decisions about where responsibilities live, how components communicate, and what the system treats as a boundary. Several sources here converge on a single uncomfortable truth: most architectural pain comes from decisions that seemed local at the time.

The clearest statement of what architecture is actually managing comes from [a piece on SRP](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle), which argues the Single Responsibility Principle is misread as "do one thing" when it means something more precise: cohesive grouping under a single accountable reason to change. Over-granularizing classes violates the cognitive simplicity SRP exists to provide. That framing pairs directly with [the argument for deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules): small interfaces hiding large implementations reduce complexity for both human readers and LLMs. Shallow modules invert that ratio, leaking implementation into callers and multiplying the surface area that must be understood before anything can change.

Boundaries matter at the component level too. [Angular's composite components pattern](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) shows how bloated input APIs signal that responsibilities have collapsed into a single node. The fix is decomposition into directives and sub-components, each encapsulating one concern. The same logic applies to form models: [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) distinguishes form model from domain model and insists on explicit translation between them, keeping each layer coherent on its own terms.

At the infrastructure level, architectural choices have failure modes that are hard to reverse. [Trunk's merge queue post](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) is instructive: a GitHub bug silently deleted thousands of lines because temp branches were pushed to main. Trunk avoided the incident because their architecture never permitted that write path. The structural constraint was load-bearing before the failure scenario was even imagined.

State management is where distributed system architecture gets most consequential. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step, letting applications recover from failures automatically. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps durable execution into stateless functions, sessions, and actors along a behavior-state continuum, showing how Temporal, Restate, DBOS, and Resonate each implement these patterns differently. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same thinking at a product level: a two-layer Lambda hierarchy with checkpointed state eliminates the long-lived process that would otherwise be a single point of failure.

Agent architectures have surfaced a parallel set of decisions. [The 12-factor agents factor on unified state](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that separating execution state from business state creates complexity that is rarely justified; inferring both from the context window makes serialization, debugging, and recovery trivial. [Anthropic's Managed Agents post](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) shows the complementary move at scale: stable interfaces between the harness, session log, and sandbox let implementations be swapped independently as models improve. [The data engineering agent case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) makes the same point bottom-up: moving through rigid state machine, orchestrator, and single general-purpose agent architectures, the team found that environmental constraints — tool design, ID keys, context visibility — outperformed prompt engineering for reliability at every stage.

Documentation and diagrams are part of the architecture surface. [Ilograph's diagram mistakes post](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies unlabeled resources, overloaded master diagrams, and fan traps as the most common ways that structural thinking fails to transfer. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) takes this further: centralizing architectural rules into a living knowledge base that AI agents query in real time, with Git-layer enforcement via its Lun tool, treats the spec as an active constraint rather than a reference artifact.

The compounding nature of architectural debt is made explicit in [the AI-native startup playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup): without specs and architectural constraints written somewhere an AI can read, each session re-derives foundational decisions from scratch and those decisions drift. The result is a codebase with no coherent mental model, not because any single piece is bad, but because the pieces were never designed to fit together. Architecture is, in that sense, the discipline of keeping fit-together possible.
