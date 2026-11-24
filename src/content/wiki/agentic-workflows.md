---
title: Agentic workflows
summary: >-
  Agentic workflows let AI systems plan, execute multi-step tasks, and use tools
  autonomously — a rapidly maturing practice whose reliability depends on
  harness engineering, state management, and human oversight as much as model
  capability.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - 2026-04/2026-04-30t231319-markdownlm
  - 2026-05/2026-05-03t110355-babysitting-the-agent
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-04t235011-plurai
  - 2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code
  - 2026-05/2026-05-06t171355-vectifyaipageindex
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - >-
    2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning
  - 2026-05/2026-05-11t155625-storybloqstorybloq
  - 2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively
  - 2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - 2026-05/2026-05-19t193626-slow-mode
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - 2026-06/2026-06-04t194244-inside-openais-in-house-data-agent
  - >-
    2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got
  - >-
    2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with
  - 2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos
  - 2026-06/2026-06-11t023157-memory-design-zerostack
  - 2026-06/2026-06-11t023435-subagents-design-zerostack
  - 2026-06/2026-06-11t023723-gi-dellavzerostack
  - 2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - 2026-06/2026-06-14t094245-agentswarms
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - >-
    2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup
  - >-
    2026-06/2026-06-20t053342-if-llms-have-human-like-attributes-then-so-does-age-of
  - 2026-06/2026-06-21t112220-agentic-engineering
  - >-
    2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk
  - 2026-06/2026-06-23t161552-the-coming-loop
  - 2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse
  - 2026-06/2026-06-25t195020-strands-agents
  - 2026-06/2026-06-30t173037-a-return-to-two-pizza-culture
  - 2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades
  - >-
    2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents
  - >-
    2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms
  - 2026-08/2026-08-11t004752-danielmiesslerlifeos
  - >-
    2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test
compiled_at: '2026-11-24T03:49:15.705Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 1907
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
  cost_usd: 0.072363
---
An agentic workflow is an AI system that pursues a goal across multiple steps, calling tools, managing state, and making decisions without a human approving each action. The concept spans a wide range of implementations, from a single coding agent that opens files and runs tests, to orchestrated fleets of parallel subagents handling codebase-wide migrations. What unifies them is autonomous execution — and the engineering discipline required to make that execution trustworthy.

The most consistent finding across sources is that prompting alone does not produce reliable agents. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents need deterministic state transitions and validation checkpoints encoded in software, not increasingly elaborate prompt chains. [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) demonstrates this empirically: a data engineering agent evolved from a rigid state machine through an orchestrator to a single general-purpose agent, and each improvement came from constraining the environment (tool design, ID keys, context visibility) rather than refining prompts.

State management is a central challenge. humanlayer/12-factor-agents argues for unifying execution state and business state into a single context-window-derived thread, making the agent trivially serializable, debuggable, and recoverable. Anthropic's [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) takes a complementary approach, using a two-agent harness where an initializer scaffolds a feature list and progress file so an incremental coding agent can maintain coherent progress across many context windows. Their [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) architecture separates the harness, session log, and sandbox into stable interfaces that can be swapped as models improve, cutting p50 time-to-first-token by roughly 60%.

Memory compounds these concerns. Without persistent memory, each session re-derives foundational decisions from scratch. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) addresses this with biomimetic memory structures covering world facts, experiences, and mental models. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) takes a simpler approach, persisting session context in a `.story/` directory of JSON files. [Memory design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) goes further in the other direction, using plain Markdown on disk with no vector stores at all.

The question of single versus multi-agent architectures has real performance consequences. [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) draws on Stanford and Google/MIT research to show that multi-agent orchestration introduces coordination overhead that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x. The recommendation is to default to single-agent systems and add orchestration only when task decomposition genuinely requires it. Cloudflare's [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) is one documented case where multi-agent architecture — parallel hunters, adversarial validators, cross-repo tracers — clearly outperformed single-agent approaches, in the specific domain of vulnerability discovery.

Observability and feedback loops are increasingly treated as first-class concerns. [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone do not improve agentic systems; attaching feedback signals (user ratings, indirect behavior, LLM-as-judge, deterministic rules) is what turns logging into a learning loop. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) automates evaluation and guardrail model generation with sub-100ms latency and 8x lower cost than GPT-as-judge approaches.

Sandboxing and security are non-negotiable at production scale. [If You're Running Claude Code, PLEASE Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) makes the case for Docker sandboxing to prevent credential leaks even in auto-approve mode. [Simon Willison's report on Claude Fable 5](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents an agent inventing elaborate browser automation techniques to debug a two-line CSS fix — the same resourcefulness that makes powerful agents useful also makes unsandboxed agents dangerous. [Anthropic's defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing for autonomous vulnerability discovery and remediation pipelines.

Several sources push back on the assumption that full autonomy is desirable. [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full agentic workflows accelerate skill atrophy and create vendor dependency. [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) describes an agent that keeps the human involved at every step, trading short-term productivity for genuine learning. [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents the practical cost of insufficient oversight: an agent consistently declaring work done after minimal checks, requiring manual verification of every feature.

[The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) locates the real constraint upstream of execution: shared context, specification clarity, and organizational alignment. Agents amplify whatever coherence or misalignment an organization already has. [Armin Ronacher's warning](/reading/2026-06/2026-06-23t161552-the-coming-loop) sharpens this into a structural concern — harness loops that orchestrate agents are becoming unavoidable, but they also amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. [humanlayer/advanced-context-engineering](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) goes furthest, arguing that lights-off software factories fail because LLMs cannot maintain codebase quality over time, a limitation no amount of harness engineering can fix.

The picture that emerges is not one of autonomous AI replacing engineering judgment, but of a new engineering discipline: designing harnesses, state representations, memory systems, feedback loops, and sandboxes that make model-driven execution trustworthy enough to extend incrementally.
