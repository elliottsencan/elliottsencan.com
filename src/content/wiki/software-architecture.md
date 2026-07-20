---
title: Software architecture
summary: >-
  Software architecture spans the decisions that determine how systems are
  structured, how components communicate, and how those choices constrain
  everything built afterward — from module boundaries and state management to
  deployment topology and long-term maintainability.
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
compiled_at: '2026-07-20T19:48:15.338Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12533
    output_tokens: 1358
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
  cost_usd: 0.057969
---
Architecture is the set of decisions made early that are hardest to reverse later. A recurring theme across the sources here is that the wrong structural choice does not fail immediately — it compounds. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) names this directly: without specs and architectural constraints written somewhere an AI agent can read, each coding session re-derives foundational decisions from scratch, and the resulting codebase has no coherent mental model behind it. That observation now applies whether you are a solo founder or an engineering team maintaining a distributed platform.

Module design is one axis where architectural thinking recurs. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce complexity for both humans and LLMs, contrasting this with shallow modules that merely move complexity into callers. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) adds a related correction: SRP is misread as "do one thing" when it actually means cohesive grouping under a single accountable responsibility. Over-granularizing classes violates the cognitive simplicity the principle was meant to create. These two accounts agree on the core point: good module boundaries are about information hiding and coherent ownership, not raw size.

Code organization at the file and folder level follows the same logic. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues that grouping frontend code by domain vertical rather than by technical layer (components, hooks, utils) improves cohesion and discoverability, and even helps AI agents navigate a repo without excessive context bloat. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) applies similar thinking to UI: intrinsic layouts, container queries, and fluid values push complexity into CSS itself rather than scattering it across breakpoint-specific branches.

State and execution management is where architectural choices become most consequential in distributed systems. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and the taxonomy laid out in [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) map the space: stateless functions, sessions, and actors correspond to different behavior-state tradeoffs, and platforms like Temporal, Restate, DBOS, and Resonate each implement subsets of these patterns. [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows this in practice: Depot's CI orchestrator uses a two-layer Lambda hierarchy with callback-driven coordination to run stateful workflows without a long-lived process. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) adds that separating execution state from business state often introduces unnecessary complexity — inferring both from a single context-window-derived thread simplifies serialization, recovery, and debugging.

For distributed systems specifically, [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) covers how internal developer platforms exist to abstract infrastructure complexity from product teams, while [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that current cloud abstractions are fundamentally wrong — VMs tied to fixed resources and slow block storage — requiring a ground-up rethink. [How's Linear so fast?](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) demonstrates what thoughtful architectural choices yield in practice: local-first IndexedDB sync, aggressive code splitting, and optimistic updates combine to produce near-instant perceived performance.

The communication layer between components also carries architectural weight. [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how Zod schema validation at API boundaries catches shape mismatches before they reach runtime. [Ban commits/transactions using AST analysis](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) extends this to database layer ownership, using AST-based linters to enforce that only the DB layer issues commits.

Documentation and communicability of architecture is its own recurring thread. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies pitfalls including overloaded master diagrams and oversimplified behavioral flows. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) reframes the challenge: senior engineers speak in terms of complexity management while stakeholders think in terms of uncertainty reduction, and the gap between those registers is where architectural rationale gets lost.
