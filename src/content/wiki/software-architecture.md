---
title: Software architecture
summary: >-
  Software architecture encompasses the structural decisions that determine how
  systems are organized, how components communicate, and how complexity is
  managed — decisions that compound over time and shape everything from
  performance to maintainability.
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
compiled_at: '2026-08-11T08:02:27.871Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12533
    output_tokens: 1593
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
  cost_usd: 0.061494
---
Architecture is not a single decision but a continuous set of tradeoffs about where to place logic, how to partition state, and how to enforce constraints. The sources here span frontend layout, AI agent harnesses, distributed workflow engines, and organizational platforms, but a common thread runs through all of them: structural choices made early propagate widely, and ad hoc decisions made under pressure tend to compound.

The most fundamental structural question is where to draw module boundaries. ["AI Likes Deep Modules"](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce cognitive load for both humans and LLMs. This maps directly to [the Single Responsibility Principle debate](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle), which clarifies that SRP is not about doing "one thing" but about cohesive grouping under a single accountable owner. Over-granularizing modules violates the very simplicity SRP is meant to provide. [Angular's component composition guidance](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same logic to UI components: inputs-bloated components should be refactored into composites of directives and sub-components, keeping each concern encapsulated.

How code is physically organized reinforces or undermines module clarity. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues that domain-vertical colocation outperforms horizontal layer separation (components/hooks/utils) for cohesion, discoverability, and AI-agent effectiveness. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) applies the same logic to CSS: intrinsic layout with fluid `clamp()` values and container queries removes the coupling between viewport state and component layout decisions.

State management is where architectural choices become most consequential at runtime. [The 12-factor agents "unify execution state" principle](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that separating execution state from business state adds complexity that is often unwarranted — a unified context-window-derived thread simplifies serialization, debugging, and recovery. [Temporal and its taxonomy of durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) show how persisting workflow state at every step eliminates manual failure-reconciliation logic across stateless functions, sessions, and actors. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies this concretely with AWS Lambda durable functions running stateful, checkpointed workflows without a long-lived process.

Where state lives determines failure modes, which is also why [the GitHub merge queue incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) is instructive: Trunk's architectural choice never to push temp branches to main avoided a bug that silently deleted thousands of lines from other users' repos. Structural constraints are a class of reliability mechanism that prompts and alerts cannot substitute for.

Agent architecture has become a microcosm of classical software architecture debates. The data engineering agent case study at [Aiyan](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) cycled through a rigid state machine, an orchestrator, and a single general-purpose agent, finding that environmental constraints — tool design, ID keys, context visibility — outperformed prompt engineering for reliability. [Brian Suh's "control flow, not more prompts"](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same argument more abstractly: deterministic state transitions and validation checkpoints are architectural, not linguistic, solutions. [Anthropic's managed agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) formalizes this by separating the harness, session log, and sandbox into stable interfaces so implementations can swap as models improve.

Architectural integrity degrades without enforcement mechanisms. MarkdownLM's Lun tool blocks non-compliant code at the Git layer. [AST-based linters banning manual DB commits](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) enforce layer ownership statically. [Zod schema validation in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time before they cause runtime failures. The pattern across all three: encode constraints in tooling, not in documentation or convention.

Communication of architecture is its own failure mode. [Seven common mistakes in architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) catalogues how unlabeled resources, fan traps, and overloaded master diagrams cause diagrams to mislead rather than clarify. [Senior developer communication failures](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) identify a parallel gap: architects speak in complexity management terms while stakeholders think in uncertainty reduction terms, and bridging that gap is a structural challenge, not just a rhetorical one.

The AI-native startup framing from [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) makes the stakes explicit: without specs and architectural constraints written where AI agents can read them, each coding session re-derives foundational decisions from scratch and the codebase loses its coherent mental model. Agentic technical debt compounds differently from ordinary technical debt, but the underlying cause is the same — deferred structural decisions.
