---
title: Software architecture
summary: >-
  Software architecture governs how systems are structured, how components
  relate, and how those decisions propagate through reliability,
  maintainability, and team cognition — a theme running across UI layout, agent
  design, durable execution, and module boundaries.
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
compiled_at: '2026-11-17T01:49:07.039Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12683
    output_tokens: 1441
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
  cost_usd: 0.059664
---
Architecture is the set of decisions that determine what a system can and cannot do later. Those decisions show up everywhere: in whether a UI reaches for media queries or container queries, in how an agent manages state, in whether a CI scheduler survives a Lambda crash, in which commit lands on main. The sources here collectively argue that good architecture is about constraint, coherence, and visibility — and that bad architecture is often the result of letting each layer make its own ad-hoc choices.

On the front end, [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that viewport breakpoints are an architectural smell: they couple layout decisions to device categories rather than to component context. Replacing them with container queries and `clamp()` values pushes layout responsibility down to the component itself, where it belongs. The same logic — keep responsibility close to the thing being described — runs through [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to), which argues that components bloated with dozens of inputs should be decomposed using the Composite Components pattern so each concern stays encapsulated. The [Single Responsibility Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) article extends this further, clarifying that SRP is about cohesive grouping under a single accountable responsibility, not about atomizing classes until they are useless.

Module design is where architecture becomes most legible at the code level. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues for hiding large implementations behind small interfaces — a property that benefits both human readers and LLMs navigating the codebase. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) makes the complementary point that file organization is an architectural decision: colocating by domain vertical rather than by technical layer improves cohesion and discoverability, and incidentally makes agent-assisted editing more reliable.

State management is a recurring fault line. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread rather than tracking them in separate stores — simplifying serialization, debugging, and recovery. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) address the same problem at the distributed-systems level: persisting workflow state at every step so that long-running processes can recover without manual reconciliation. [Building CI with Lambda Durable Functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows this pattern applied concretely, with a two-layer Lambda hierarchy replacing a long-lived orchestration process.

For agent systems specifically, architecture has become the primary lever for reliability. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces one team's evolution through three agent architectures — rigid state machine, orchestrator, then single general-purpose agent — finding that environmental constraints outperform prompt engineering at every stage. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point in principle: deterministic state transitions and validation checkpoints are architectural properties, not prompt properties. [Anthropic's Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces precisely so that the underlying model can be swapped without rearchitecting everything.

Enforcement at the boundary matters as much as the design itself. MarkdownLM blocks non-compliant code at the Git layer. [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows the cost of an architectural choice — pushing temp branches to main — that made a subtle bug catastrophic at scale. [Ban commits/transactions using AST analysis](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) applies the same principle to database layer ownership: enforce it structurally, not by convention.

Finally, architecture shapes how systems can be understood. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) catalogs representation failures — unlabeled nodes, fan traps, overloaded master diagrams — that obscure rather than communicate structure. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) frames the same gap at the human level: architects think in terms of complexity management, but stakeholders think in terms of uncertainty reduction, and bridging that translation is part of the work.
