---
title: Software architecture
summary: >-
  Software architecture governs how systems are structured, how responsibilities
  are divided, and how those decisions compound over time — shaping everything
  from component boundaries to failure recovery to the legibility of a codebase
  for both humans and AI.
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
compiled_at: '2026-06-22T02:29:45.952Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11764
    output_tokens: 1625
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
  cost_usd: 0.059667
---
Architecture is fundamentally a set of decisions about where complexity lives. The classic formulation from the Single Responsibility Principle captures this: SRP is not about classes doing "one thing" but about cohesive grouping under a single accountable responsibility, and over-granularizing violates the cognitive simplicity the principle was meant to provide [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). A complementary framing comes from the argument for deep modules: small interfaces hiding large implementations reduce the surface area that any caller — human or LLM — needs to understand [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). These two ideas converge on the same structural goal: hide complexity behind stable boundaries.

That goal shows up at every scale. At the component level, Angular components bloated with dozens of inputs should be refactored with the Composite Components pattern, moving concerns into directives and sub-components so each boundary stays clean [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to). At the UI layout level, the argument for intrinsic design — replacing viewport breakpoints with fluid clamp() values and container queries — is structurally the same move: push layout logic into the component rather than coordinating it externally [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints). Angular's Signal Forms documentation makes the same point for form models: maintain a clear boundary between the form model and the domain model, and prefer static structure over dynamic shape [Form Model Design](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms).

At the distributed-systems level, the question of where state lives is critical. Temporal persists workflow state at every step so applications can recover from failures without manual reconciliation [Temporal](/reading/2026-04/2026-04-30t231511-temporal), and a taxonomy of durable execution forms — stateless functions, sessions, and actors — maps how platforms like Temporal, Restate, and DBOS implement this along a behavior-state continuum [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms). Depot CI's orchestrator applies the same principle to CI pipelines, using Lambda durable functions and a two-layer hierarchy to run stateful workflows without a long-lived process [Building CI with Lambda Durable Functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions). Linear's architecture shows what local-first design looks like at product scale: IndexedDB sync, optimistic updates, and service worker precaching produce near-instant interactions precisely because state is close to the client [How's Linear So Fast?](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown).

For agent systems, architectural choices outperform prompt engineering for reliability. A data engineering agent that moved through rigid state machine, orchestrator, and single general-purpose agent architectures showed that environmental constraints — tool design, ID keys, context visibility — determined reliability more than prompts [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). The 12-factor-agents framework proposes unifying execution state and business state into a single context-window-derived thread, enabling serialization, debugging, recovery, and observability from one source of truth [12-Factor Agents: Unify Execution State](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Anthropic's Managed Agents service applies separation of concerns at the infrastructure level, decoupling agent harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Architecture also determines what can go wrong invisibly. A GitHub merge queue bug silently deleted thousands of lines by building temp branches off the wrong base commit; Trunk's architectural choice to never push temp branches to main avoided the incident entirely [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). Zod schema validation in Angular catches unexpected backend response shapes at dev time rather than allowing them to propagate as runtime errors [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with). MarkdownLM takes a related approach by centralizing architectural rules and engineering standards into a living knowledge base that blocks non-compliant code at the Git layer [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm).

Documentation of architecture is its own failure mode. Seven common pitfalls in architecture diagrams — unlabeled resources, disconnected nodes, overloaded master diagrams, oversimplified behavioral flows — collectively obscure the decisions that diagrams are meant to communicate [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams). For AI-native startups, the same principle applies to codebases: skipping specs, architectural decisions, and context files means each AI session re-derives foundational decisions from scratch, and the resulting drift is a compounding form of technical debt [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup).

The senior developer communication gap maps onto this directly. Senior engineers think in terms of complexity management — which architectural decisions reduce future surface area — while business stakeholders think in terms of uncertainty reduction, and bridging that gap is where architectural reasoning becomes organizational impact [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise).
