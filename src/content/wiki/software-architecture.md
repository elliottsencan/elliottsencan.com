---
title: Software architecture
summary: >-
  Software architecture governs how systems are structured, how components
  relate, and how those decisions constrain everything built on top — from
  module boundaries and state management to deployment topology and long-term
  evolvability.
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
compiled_at: '2026-11-24T04:02:56.778Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12683
    output_tokens: 1541
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
  cost_usd: 0.061164
---
Architecture is the set of structural decisions that are hard to reverse. The sources here approach it from many directions, but a consistent thread runs through them: good architecture reduces the surface area of things that can go wrong, while bad architecture compounds every subsequent problem.

Module design is where most architectural decisions become concrete. The case for deep modules — small interfaces hiding large implementations — applies equally to human readers and to LLMs navigating a codebase [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). The Single Responsibility Principle reinforces this, but only when read correctly: SRP means grouping cohesive behaviors under a single accountable owner, not splitting classes into the smallest possible units [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). Over-granularization is itself an architectural failure. How code is organized at the file and directory level matters too: collocating by domain vertical rather than by technical layer (components, hooks, utils) keeps cohesion local and makes both human and agent navigation faster [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase).

State management sits at the core of distributed architecture. Temporal's durable execution model persists workflow state at every step so applications recover automatically from failures [Temporal](/reading/2026-04/2026-04-30t231511-temporal), and Jack Vanlightly's taxonomy of durable function forms — stateless functions, sessions, and actors — maps this design space across implementations including Temporal, Restate, and DBOS [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms). Depot CI applies the same principle using AWS Lambda durable functions for a stateful, checkpointed CI scheduler without a long-lived process [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions). The 12-factor agents framework pushes further: unifying execution state and business state into a single context-window-derived thread simplifies serialization, debugging, and recovery [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

Agent architecture follows the same structural logic. A data engineering agent evolved through three designs — rigid state machine, orchestrator, then a single general-purpose agent — with the finding that environmental constraints (tool design, ID keys, context visibility) outperform prompt engineering for reliability [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Anthropic's Managed Agents service separates the harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). A GAN-inspired planner/generator/evaluator architecture overcomes self-evaluation bias during multi-hour autonomous coding sessions [Harness Design for Long-Running Application Development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). Reliable agents need deterministic control flow encoded in software, not elaborate prompt chains [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts).

Architectural constraints also need enforcement mechanisms. MarkdownLM centralizes architectural rules and security policies into a knowledge base that AI agents query in real time, with its Lun tool blocking non-compliant code at the Git layer [MarkdownLM](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms). Enforcing DB layer ownership of all commits via AST-based tests and linters is another form of the same principle — the rule lives in the toolchain, not in a document [Ban commits/transactions using AST analysis and linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters). The merge queue incident at GitHub — where a bug silently deleted thousands of lines by building temp branches off the wrong base commit — illustrates how a single architectural choice (never push temp branches to main) can prevent an entire category of failure [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).

At the platform level, Linear's local-first IndexedDB sync with optimistic updates explains how architectural choices produce perceived performance [How's Linear so fast?](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown). Platform engineering more broadly is about building internal infrastructure that reduces coordination costs for product teams [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end). And the cloud itself can be critiqued architecturally: the exe.dev founder argues that VMs tied to fixed resources and slow remote block devices are fundamentally wrong abstractions that the entire industry has built on top of [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud).

For AI-native startups, architectural legibility compounds over time. Without specs and architectural decisions written where AI agents can read them, each new session re-derives foundational choices, and drift accumulates into a codebase with no coherent mental model [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup). The constraint that makes architecture matter has not changed: decisions made early shape what is possible later.
