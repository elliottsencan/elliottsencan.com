---
title: Software architecture
summary: >-
  Software architecture spans decisions about how systems decompose,
  communicate, and enforce boundaries — from component structure and state
  management to distributed execution, diagram clarity, and the encoding of
  constraints into tooling.
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
compiled_at: '2026-08-31T22:41:01.484Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12683
    output_tokens: 1419
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
  cost_usd: 0.059334
---
Architecture is not a single decision but a running negotiation between competing forces: how to partition behavior, where to hold state, how to make constraints enforceable rather than advisory, and how to communicate structure to everyone who needs to understand it. The sources collected here address all of these tensions from different angles.

The most direct treatment of decomposition principles comes from [Single Responsibility](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle), which argues that SRP is routinely misread as "do one thing" when Robert Martin meant cohesive grouping under a single accountable reason to change. Over-splitting produces artificial boundaries that increase cognitive load rather than reduce it. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) extends this into a module-design heuristic: small, stable interfaces that hide large implementations reduce complexity for both human readers and LLMs working with the code. These two pieces together make a consistent case that the right unit of decomposition is the one that minimizes interface surface, not the one that minimizes implementation size.

Organization at the file level matters for the same reasons. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues for grouping frontend code by domain rather than by technical layer, so that everything a feature needs lives together. The argument is partly about discoverability, partly about how AI coding agents traverse codebases — colocation by feature reduces the number of directories an agent must cross to understand a change.

Angular-specific sources illustrate two complementary principles. [Angular component composition](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs are architectural failures, and that the Composite Components pattern — moving concerns into directives and sub-components — recovers clean boundaries. [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) addresses the boundary between form models and domain models specifically, arguing for explicit translation layers rather than shared mutable structures.

State management is a thread running through several sources. [12-Factor Agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that separating execution state from business state creates unnecessary complexity: if you can derive all execution state from the context window, a single unified thread simplifies serialization, debugging, recovery, and observability. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) address the same problem at the distributed-systems layer. Jack Vanlightly's taxonomy of stateless functions, sessions, and actors maps the design space for durable execution, and [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) demonstrates one concrete instantiation of these patterns using AWS Lambda.

On the agent-architecture side, [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through three evolutionary architectures — rigid state machine, orchestrator, single general-purpose agent — concluding that environmental constraints beat prompt engineering for reliability. [Agents Need Control Flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) draws the same conclusion from a different angle: deterministic state transitions encoded in software outperform elaborate prompt chains when tasks grow complex. [Anthropic's managed-agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) formalizes the insight into stable interfaces between harness, session log, and sandbox, allowing implementations to be swapped as models improve.

Constraint enforcement is another recurring concern. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules into a knowledge base that AI agents query in real time, with its Lun tool blocking non-compliant code at the Git layer. [Banning commits at the DB layer via AST analysis](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) makes a parallel argument: encode ownership rules as linter checks and CI gates rather than documentation. [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows the cost of missing such constraints — a silent GitHub bug deleted thousands of lines; Trunk's architectural decision to never push temp branches to main was what avoided the incident.

Finally, [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) addresses the communication side of architecture: unlabeled resources, fan traps, and over-reliance on AI-generated diagrams all produce artifacts that misrepresent the systems they are meant to explain. Architecture decisions that cannot be communicated clearly are indistinguishable, in practice, from decisions that were never made.
