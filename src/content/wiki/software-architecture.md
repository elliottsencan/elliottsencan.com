---
title: Software architecture
summary: >-
  Software architecture governs how systems are structured, how state flows, and
  how responsibilities are divided — a set of decisions whose costs compound
  over time whether made deliberately or not.
sources:
  - >-
    2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with
  - 2026-04/2026-04-30t231511-temporal
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - 2026-05/2026-05-06t204115-platform-engineering-end-to-end
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - >-
    2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise
  - 2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions
  - >-
    2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - 2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter
  - 2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb
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
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - >-
    2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup
  - >-
    2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week
compiled_at: '2026-06-18T22:00:54.595Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10221
    output_tokens: 1021
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
  cost_usd: 0.045978
---
Architecture is the set of structural decisions that determine what a system can do and how hard it is to change. Those decisions accumulate silently: good ones enable scale, bad ones surface late as compounding debt.

The most consistent theme across sources is that separating concerns cleanly — and making that separation explicit — is cheaper than patching it later. [Kobi Hari's piece on Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that bloated component inputs are an architectural failure, not a style issue: when a component accumulates dozens of inputs, it signals that multiple concerns have been conflated, and the fix is the Composite Components pattern — moving features into directives and sub-components so each concern has a clean boundary. That argument mirrors the rehabilitation of the Single Responsibility Principle in [Henrique Teixeira's essay](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle), which corrects the common misreading of SRP as "do only one thing" and restores its original meaning: cohesion around a single, clearly named responsibility.

State management is a recurring pressure point. The 12-factor-agents project [recommends unifying execution state and business state](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) into a single context-window-derived thread, arguing that one source of truth makes serialization, recovery, and debugging trivially simple. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) operationalizes this for distributed systems by persisting workflow state at every step, eliminating manual reconciliation logic. Depot's CI orchestrator takes a similar approach using [AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions), keeping a checkpointed workflow scheduler without a long-lived process.

Linear's near-instant UI is a case study in how architectural choices compound positively: [local-first IndexedDB sync, aggressive code splitting, and optimistic updates](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) produce an experience that feels impossible until you see the mechanism.

For AI agents specifically, [Brian Suh argues](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) that reliability requires deterministic control flow encoded in software — explicit state transitions and validation checkpoints — rather than prompt chains, which are non-deterministic and unverifiable at scale. Anthropic's multi-agent harness [uses a GAN-inspired planner/generator/evaluator structure](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) to overcome context anxiety and self-evaluation bias during multi-hour autonomous coding sessions.

Documentation and diagrams are part of architecture too. [Billy Pilger identifies seven diagram anti-patterns](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) — unlabeled nodes, fan traps, overloaded master diagrams — that communicate false clarity. The AI-native startup playbook [makes a parallel point about codebases](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup): without written specs and architectural constraints that AI can read, each session re-derives foundational decisions and the codebase loses coherence not because any piece is bad, but because the pieces were never designed to fit together.

[Yusuf Aytas frames the economics plainly](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter): LLMs lowered the cost of producing code but not of owning it. Architectural judgment — deciding what fits together and what should stay separate — remains the scarce asset.
