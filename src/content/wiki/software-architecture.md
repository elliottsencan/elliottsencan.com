---
title: Software architecture
summary: >-
  Software architecture spans the decisions that determine how systems are
  structured, how components communicate, and how those choices compound over
  time — from module boundaries and state management to deployment topology and
  diagramming.
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
compiled_at: '2026-10-19T22:14:52.055Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12683
    output_tokens: 1415
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
  cost_usd: 0.059274
---
Architecture is not a phase of development; it is a continuous series of decisions about where to place logic, how to bound responsibilities, and what constraints to enforce before code reaches production. The sources here span frontend layout, agent design, distributed systems, and tooling infrastructure, but a common thread runs through all of them: structural choices made early propagate farther and compound faster than most teams expect.

Module boundaries are one of the oldest arguments in software. [Go Monk's case for deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce cognitive load for both humans and LLMs, while [Henrique Teixeira's reading of the Single Responsibility Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) warns that over-granularizing in the name of SRP produces the opposite effect: dozens of tiny classes that scatter a single concern across the codebase rather than cohesively grouping it. These two arguments are complementary. Deep modules and correct SRP application both aim at the same goal: making change local.

Component structure in frontend code follows the same logic. [Kobi Hari's piece on Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs should be refactored into composite structures using directives and sub-components, and [Dominik's vertical codebase post](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) extends this to file organization: grouping by domain rather than by technical layer (components, hooks, utils) improves cohesion and makes agent-assisted editing more reliable. Layout architecture has its own structural argument: [Amit Sheen's breakpoint-free UI approach](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) replaces viewport media queries with intrinsic layout, container queries, and fluid clamp() values, a structural shift that moves sizing decisions from the page level to the component level.

State is the other axis where architecture decisions compound. The debate is sharpest in agent and workflow systems. [The 12-factor-agents factor on unified state](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that separating execution state from business state adds complexity that is rarely justified; inferring all execution state from the context window gives a single serializable source of truth. [Temporal's durable execution model](/reading/2026-04/2026-04-30t231511-temporal) takes the opposite organizational stance, persisting workflow state at every step in a dedicated runtime so applications recover from failure without manual reconciliation. [Jack Vanlightly's taxonomy of durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps both approaches onto a behavior-state continuum of stateless functions, sessions, and actors. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) demonstrates a practical synthesis: a two-layer Lambda hierarchy that is stateful and checkpointed without running a long-lived process.

Architectural constraints are most effective when enforced automatically rather than documented and trusted. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) blocks non-compliant code at the Git layer before merge. [The AST-based transaction enforcement post](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) uses flake8 plugins and AST analysis to ensure DB layer ownership is never bypassed. [The GitHub merge queue bug post](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows the cost of a single structural assumption being wrong: temp branches built off the wrong base deleted thousands of lines from main silently.

At the agent and platform level, architecture decisions shape what can be swapped later. [Anthropic's Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates harness, session log, and sandbox into stable interfaces so model implementations can be replaced without rewriting the agent. [The AI agent reliability post](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces an agent through three architectures, concluding that environmental constraints (tool design, ID keys, context visibility) determine reliability more than prompt quality. [The founders' playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) frames the same dynamic for startups: AI removes natural bottlenecks, so architectural decisions and written constraints become the only check on drift across sessions.

Documentation of architecture has its own failure modes. [Billy Pilger's piece on diagram mistakes](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) catalogues seven recurring errors — unlabeled resources, overloaded master diagrams, oversimplified behavioral flows — each of which causes the diagram to misrepresent the actual system rather than clarify it. A diagram that lies about structure is worse than no diagram at all, because it anchors decisions on false premises.
