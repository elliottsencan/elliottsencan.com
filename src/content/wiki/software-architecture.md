---
title: Software architecture
summary: >-
  Structural decisions about how systems are organized — from module boundaries
  and state management to deployment topology — determine both how well software
  behaves at runtime and how legibly it can be modified over time.
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
compiled_at: '2026-07-15T10:08:26.214Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12344
    output_tokens: 1463
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
  cost_usd: 0.058977
---
Architecture is the set of structural decisions that are hard to reverse: how concerns are separated, where state lives, how components communicate, and what invariants the system enforces at its boundaries. These choices compound. A codebase organized well from the start stays navigable as it grows; one that accumulates contradictory structural decisions becomes progressively harder to change regardless of how clean individual files look.

The clearest articulation of good structural instinct may be the deep-module argument: small interfaces hiding large implementations reduce cognitive load for both humans and LLMs [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). The Single Responsibility Principle reinforces this, but only when read correctly — SRP means cohesive grouping under a single accountable responsibility, not decomposing classes until each does one trivially small thing [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). Excessive granularity destroys the cognitive simplicity that SRP is supposed to provide. Similarly, frontend codebases organized by domain verticals rather than horizontal technical layers (components, hooks, utils) achieve better cohesion and discoverability [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase).

State management is the site of recurring structural mistakes. The 12-factor-agents project argues that AI applications should unify execution state and business state into a single context-window-derived thread rather than maintaining separate tracking systems — one source of truth that is trivially serializable, debuggable, and resumable [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Temporal's durable execution model takes a related position at the infrastructure layer: persist workflow state at every step so applications recover from failures without manual reconciliation logic [Temporal](/reading/2026-04/2026-04-30t231511-temporal). Jack Vanlightly maps this design space into three durable function forms — stateless functions, sessions, and actors — showing how Temporal, Restate, DBOS, and Resonate each implement the continuum differently [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms). Depot CI applies the same principle to CI pipelines, using AWS Lambda durable functions in a two-layer hierarchy so no long-lived orchestrator process is required [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Boundary enforcement matters as much as boundary design. Zod schema validation in Angular catches unexpected backend response shapes at development time before they surface as runtime errors [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with). AST-based linters can enforce DB layer ownership by banning manual commits and model leakage across layer boundaries [Ban commits/transactions using AST analysis and linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters). MarkdownLM centralizes architectural rules and engineering standards into a living knowledge base, with its Lun tool blocking non-compliant code at the Git layer before it merges [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm).

For agent and multi-agent systems, architectural choices are especially consequential because prompt engineering cannot substitute for structural constraints. A data engineering agent that evolved through a rigid state machine, then an orchestrator, then a single general-purpose agent showed that environmental constraints — tool design, ID keys, context visibility — outperform prompting for reliability [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Anthropic's Managed Agents service separates the agent harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). A GAN-inspired planner-generator-evaluator architecture overcomes context anxiety and self-evaluation bias in long-running coding sessions [Harness Design for Long-Running Application Development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development).

Architecture diagrams are a parallel failure mode: unlabeled resources, overloaded master diagrams, fan traps, and oversimplified behavioral flows all erode the communicative value of structural documentation [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams). Senior developers already struggle to communicate structural reasoning to non-technical stakeholders, partly because complexity management does not map cleanly onto the uncertainty-reduction framing the business uses [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise). Written architectural decisions — specs, ADRs, context files — are not optional overhead. In AI-native codebases, the absence of documented constraints causes each new session to re-derive foundational decisions from scratch, producing drift that compounds into incoherence [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup).
