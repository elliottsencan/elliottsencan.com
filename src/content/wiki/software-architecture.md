---
title: Software architecture
summary: >-
  Software architecture concerns how systems are structured so they remain
  comprehensible, reliable, and evolvable — a theme running through component
  design, state management, durable execution, agent systems, and the diagrams
  that communicate all of the above.
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
compiled_at: '2026-07-01T00:43:08.081Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11882
    output_tokens: 1363
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
  cost_usd: 0.056091
---
Architecture is the set of decisions that determine what a system can and cannot become. Those decisions touch every layer: how components expose their interfaces, how state is stored and recovered, how agents or services coordinate, and how humans communicate structure to each other and to AI tools.

On component design, a consistent thread is that interfaces should be narrow and implementations deep. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small public surfaces hiding large implementations reduce cognitive load for both human developers and LLMs navigating a codebase. The Single Responsibility Principle reinforces this from a different angle: [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects the common misreading of SRP as "do one thing" and restates it as cohesive grouping under a single accountable responsibility. Granularizing too far violates the cognitive simplicity SRP is meant to create. Angular-specific guidance makes the same point concretely: [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) shows how component APIs bloated with dozens of inputs should be refactored into Composite Component trees, with each concern held by a directive or sub-component.

State management is where architectural choices become most consequential for reliability. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) proposes a taxonomy — stateless functions, sessions, and actors — and maps Temporal, Restate, DBOS, and Resonate onto it. Temporal itself represents the durable execution approach: persisting workflow state at every step so distributed systems recover from failures without manual reconciliation [Temporal](/reading/2026-04/2026-04-30t231511-temporal). Depot CI applies the same pattern at the infrastructure level, using AWS Lambda durable functions with a two-layer hierarchy and callback-driven coordination rather than keeping long-lived processes alive [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions). The 12-factor-agents project pushes this further, arguing that for many agent applications, execution state and business state should be unified into a single context-window-derived thread rather than maintained separately — simplifying serialization, debugging, and recovery [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

Agent system architecture has attracted its own emerging best practices. The key insight across several sources is that structural constraints outperform prompt engineering. [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through three architectures — rigid state machine, orchestrator, and single general-purpose agent — concluding that tool design and context visibility determine reliability more than prompts do. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same argument from a control-flow perspective: explicit state transitions and validation checkpoints in software beat elaborate prompt chains. Anthropic's managed agent service separates harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands), while their GAN-inspired multi-agent harness uses a planner, generator, and evaluator to overcome context anxiety and self-evaluation bias [Harness Design for Long-Running Application Development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development).

Architecture diagrams, often treated as an afterthought, carry their own failure modes. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) catalogs seven: unlabeled resources, disconnected nodes, overloaded master diagrams, oversimplified behavioral flows, pointless animations, fan traps, and over-reliance on AI generation. Each one creates a different kind of miscommunication about how the system actually works.

A cross-cutting theme is that architectural decisions need to be written down where both humans and AI tools can read them. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) notes that skipping specs and architectural decision files causes AI-assisted sessions to re-derive foundational decisions from scratch each time, producing drift rather than coherent structure. MarkdownLM takes this further, centralizing architectural rules and engineering standards into a knowledge base that AI agents query in real time, with its Lun tool blocking non-compliant code at the Git layer [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm). Architecture, in short, is only as durable as the constraints that enforce it.
