---
title: Software architecture
summary: >-
  Software architecture governs how systems are structured, how concerns are
  separated, and how those structural choices propagate through reliability,
  evolvability, and the teams that maintain them.
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
compiled_at: '2026-07-08T00:21:20.880Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12177
    output_tokens: 1328
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
  cost_usd: 0.056451
---
Architecture is not a single decision but an accumulation of structural choices that either compound cleanly or compound into debt. The sources here surface that pattern across frontend layout, distributed workflows, agent systems, and organizational tooling.

In UI work, the dominant architectural shift is away from global viewport breakpoints toward component-intrinsic layout. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that container queries, fluid `clamp()` values, and container units should govern component sizing, with media queries reserved only for device capabilities and user preferences. That is not a styling preference; it is a structural claim about where layout logic should live.

Component boundaries matter at the code level too. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) shows that bloated input APIs are a symptom of poor decomposition, and that the Composite Components pattern restores encapsulation by distributing behavior across directives and sub-components. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) pushes back on the popular misreading of SRP as "do one thing," arguing that cohesive grouping under a single accountable responsibility is the actual goal, and that over-granularizing classes destroys the cognitive clarity SRP is supposed to provide. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) extends this: small interfaces hiding large implementations reduce complexity for humans and LLMs alike, making systems easier to reason about and evolve.

At the codebase organization level, [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues for colocation by domain vertical rather than by technical layer, improving cohesion and discoverability and, notably, making AI agents more effective by keeping related code physically adjacent.

Distributed systems introduce a different class of structural problem: how workflow state survives failures. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) define the design space, with durable execution persisting workflow state at every step so applications recover automatically. [Building CI with Lambda Durable Functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows a concrete production implementation: a two-layer Lambda hierarchy that runs a stateful CI scheduler without a long-lived process. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) makes the related argument that AI applications should unify execution state and business state into a single context-window-derived thread, rather than separating them into two independently managed stores.

Agent architecture specifically is its own contested design space. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) documents a system that evolved through a rigid state machine, then an orchestrator, then a single general-purpose agent, concluding that environmental constraints (tool design, ID keys, context visibility) outperform prompt engineering. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) agrees: deterministic state transitions and validation checkpoints embedded in software are what make agents reliable at scale. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) design separates harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve — architecture as a hedge against capability change.

Diagram quality matters too. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies concrete failure modes — unlabeled resources, overloaded master diagrams, oversimplified behavioral flows — that cause architectural intent to be lost in communication.

At a cultural level, [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) points out that architects typically frame their work as complexity management while the rest of the organization thinks in terms of uncertainty reduction. That translation gap is itself an architectural problem, because decisions that cannot be explained cannot be enforced or evolved. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) makes the same point from a different angle: AI-native codebases require written architectural decisions and context files from day one, because without them each new session re-derives foundational choices and the codebase drifts into incoherence.
