---
title: Software architecture
summary: >-
  Software architecture shapes how well systems can be understood, extended, and
  recovered from failure — with sources spanning module design, state
  management, durable execution, agent harnesses, and the tooling that enforces
  structural decisions at scale.
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
compiled_at: '2026-06-20T22:03:07.213Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11582
    output_tokens: 1296
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
  cost_usd: 0.054186
---
Software architecture is the set of decisions that determine how a system's parts relate, what each part is responsible for, and how the whole survives change and failure. The sources collected here span frontend layout, distributed systems, agent harnesses, and organizational platforms — but a consistent throughline emerges: structural decisions made early propagate deeply, and complexity that is not deliberately contained compounds.

The most durable design heuristic across these sources is the deep module principle. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce the cognitive surface area a reader — human or LLM — must hold at once. The closely related [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects a common misreading: SRP is not about doing one thing, but about cohesive grouping under a single accountable responsibility. Over-granularizing classes fragments cohesion and defeats the cognitive simplicity SRP was meant to create.

The same logic applies at the layout layer. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that component-first UIs should encode their own sizing logic via fluid `clamp()` values and container queries rather than relying on global viewport breakpoints. The architecture of the component itself handles adaptation; the breakpoint becomes an external coupling that the component need not import.

State management is where architectural decisions tend to have the highest failure cost. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) proposes a taxonomy — stateless functions, sessions, and actors — mapped along a behavior-state continuum, showing how Temporal, Restate, DBOS, and Resonate each implement these patterns. [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) demonstrates the pattern in practice: Depot's CI orchestrator uses a two-layer Lambda hierarchy with callback-driven coordination to run stateful workflows without keeping a long-lived process alive. The 12-factor-agents project adds a unification principle — [Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should collapse into a single context-window-derived thread, simplifying serialization, debugging, and recovery.

Agent architectures add new dimensions to familiar tradeoffs. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) documents a data engineering agent that evolved through a rigid state machine, an orchestrator, and finally a general-purpose agent — concluding that environmental constraints (tool design, ID keys, context visibility) outperform prompt engineering for reliability. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) reaches the same conclusion: deterministic state transitions and validation checkpoints in software outperform elaborate prompt chains under complexity. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) architecture separates the harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve — the same separation-of-concerns reasoning applied to AI infrastructure.

Architectural decisions are also enforced, or eroded, by tooling. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a knowledge base that AI agents query in real time, with its Lun tool blocking non-compliant code at the Git layer. [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates the inverse: a GitHub merge queue bug silently deleted thousands of lines because the architecture pushed temp branches to main; Trunk avoided the incident by never doing so.

Documentation and diagrams carry architectural intent — or lose it. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) enumerates how unlabeled resources, fan traps, and overloaded master diagrams obscure the very structure they are meant to convey. And [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) makes the organizational case: founders who skip specs and architectural decision records find that each new AI coding session re-derives foundational decisions from scratch, producing a codebase with no coherent mental model behind it.
