---
title: Software architecture
summary: >-
  The structural decisions shaping how systems are organized, how components
  communicate, and where responsibility lives — from module boundaries and state
  unification to diagram clarity and the compounding cost of deferred
  architectural choices.
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
compiled_at: '2026-07-16T11:38:04.810Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12344
    output_tokens: 1288
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
  cost_usd: 0.056352
---
Architecture is not a phase in a project; it is the accumulated set of structural decisions that determine what a system can do, how it fails, and how hard it is to change. The sources here converge on a few recurring tensions: where to draw module boundaries, how to manage state across distributed or agentic systems, how to communicate structure to other humans and machines, and what happens when those decisions get deferred.

On module design, the case for deep modules appears repeatedly. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce cognitive load for both developers and LLMs, contrasting explicit Go examples to show how shallow decomposition multiplies the surface area a reader must track. This pairs with the SRP discussion in [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle), which pushes back on the popular reading of SRP as "do one thing" — the principle actually groups behaviors under a single accountable responsibility, and over-granularizing produces the fragmentation SRP was meant to prevent. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) extends this to project layout, arguing that organizing by domain vertical rather than technical layer (components, hooks, utils) improves cohesion and makes codebase navigation tractable for AI agents working across file boundaries.

State is the other persistent theme. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps durable execution onto a behavior-state continuum — stateless functions, sessions, and actors — and shows how platforms like Temporal implement each. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) itself anchors the case for persisting workflow state at every step so that distributed applications recover from failure without manual reconciliation. [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows this applied: Depot's CI orchestrator uses a two-layer Lambda hierarchy to run stateful checkpointed workflows without a long-lived process. The 12-factor-agents guide goes further, arguing that execution state and business state should be unified into a single context-window-derived thread rather than tracked separately, because unification makes serialization, debugging, and recovery straightforward [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

Agent architectures introduce their own structural questions. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces one team's progression through three architectures — rigid state machine, orchestrator, then general-purpose agent — finding that environmental constraints (tool design, ID keys, context visibility) outperform prompt engineering. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point structurally: reliable agents need deterministic state transitions and validation checkpoints encoded in software. Anthropic's managed agents post separates harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Architectural decisions also compound. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) makes the case that skipping specs and architectural constraints in an AI-native codebase does not produce ordinary technical debt — it produces compounding drift, because each new session re-derives foundational decisions from scratch and the codebase loses its coherent mental model. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) addresses this directly by centralizing architectural rules and engineering standards into a living knowledge base that AI agents query in real time, with its Lun tool blocking non-compliant code at the Git layer before merge.

Communicating architecture to other people is its own discipline. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies pitfalls — unlabeled resources, overloaded master diagrams, oversimplified behavioral flows — with concrete fixes. And [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) frames the meta-problem: developers speak in terms of complexity management, but stakeholders think in terms of uncertainty reduction, and that translation gap is where architectural reasoning goes unheard.
