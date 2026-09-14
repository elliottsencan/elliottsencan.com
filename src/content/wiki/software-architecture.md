---
title: Software architecture
summary: >-
  Software architecture governs how systems are structured, how concerns are
  separated, and how those choices constrain everything that follows — from UI
  layout strategies to distributed workflow durability to AI agent reliability.
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
compiled_at: '2026-09-14T21:42:53.490Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12683
    output_tokens: 1393
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
  cost_usd: 0.058944
---
Architecture decisions set constraints that compound. A choice made early — how state is stored, where validation lives, how components are decomposed — shapes what the system can become. The sources here span frontend layout, distributed execution, agent design, and codebase organization, but they converge on a consistent theme: structural decisions outperform local fixes.

On the frontend, [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that viewport breakpoints are the wrong unit of abstraction. Component-first layouts using container queries and fluid `clamp()` values push layout responsibility down to each component, where it belongs. This is an architectural claim: the boundary between "what the component knows" and "what the page knows" should be drawn differently than convention suggests. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) makes the same move at the codebase level, arguing that organizing by domain vertical rather than technical layer (components, hooks, utils) produces better cohesion and even improves AI-agent effectiveness when navigating code.

Component decomposition recurs in [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to), which frames the "component monster" problem — dozens of inputs, sprawling APIs — as a structural failure. The fix is the Composite Components pattern: move concerns into directives and sub-components so each element has a clean, bounded responsibility. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) warns against the opposite failure: over-granularizing in the name of SRP. The principle means cohesive grouping under a single accountability, not atomization. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) extends this into module design — small interfaces hiding large implementations reduce complexity for humans and LLMs alike.

In distributed systems, the architectural choices shift to durability and state management. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) describe how persisting workflow state at every step — rather than relying on in-process memory — lets applications recover from failure without manual reconciliation. [Building CI with Lambda Durable Functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies this concretely: Depot's CI orchestrator uses a two-layer Lambda hierarchy to run stateful, checkpointed workflows without a long-lived process. [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) achieves near-instant UI performance through local-first IndexedDB sync and optimistic updates — moving state closer to the client as an explicit structural choice.

Agent systems surface the same tensions. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through three architectural evolutions — state machine, orchestrator, single general-purpose agent — concluding that environmental constraints (tool design, ID keys, context visibility) matter more than prompt quality. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) agrees: deterministic state transitions encoded in software, not in prompts, are what make agents reliable at scale. [12-factor-agents, Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, eliminating the complexity that arises from tracking them separately.

Architectural documentation matters too. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies how diagrams mislead — unlabeled resources, fan traps, overloaded master diagrams — and how those failures propagate misunderstanding downstream. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) takes a harder line: codify architectural rules into a living knowledge base that agents query in real time, with Git-layer enforcement that blocks non-compliant code before it merges.

[The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) frames the long-term cost of deferring architecture: AI removes traditional development bottlenecks, so without written specs and architectural constraints, each session re-derives foundational decisions and the codebase drifts from any coherent model. The debt compounds because it has no natural limit. That observation connects back to [auditing legacy codebases](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week), where the first job is surfacing fear and knowledge gaps before running any tools — because the architecture that matters is the one people are afraid to touch.
