---
title: Agentic workflows
summary: >-
  Agentic workflows are AI systems that execute multi-step tasks autonomously,
  and the literature clusters around a shared tension: how much structure,
  sandboxing, and human oversight is needed before autonomy becomes an asset
  rather than a liability.
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
compiled_at: '2026-08-31T22:27:21.969Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 2023
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
  cost_usd: 0.074103
---
An agentic workflow is an AI system given a goal and the tools to pursue it across multiple steps, often across many context windows, without a human approving each action. The concept has moved fast enough that sources disagree on fundamental questions: whether agents should be single or multi-agent, whether reliability comes from prompting or engineering, and whether full autonomy is desirable at all.

The reliability question is where the most engineering consensus has formed. [Aiyan](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) tracked a data engineering agent through three architectures and found that environmental constraints — tool design, ID keys, context visibility — outperformed prompt engineering at every stage. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) reaches the same conclusion: reliable agents need deterministic control flow and explicit state transitions in software, not more elaborate prompt chains. The [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) project frames this structurally, arguing that unifying execution state and business state into a single context-window-derived thread simplifies serialization, debugging, and recovery. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names five subsystems that turn unreliable model output into dependable results: instructions, state, verification, scope, and session lifecycle.

Anthropics engineering blog has published the most detailed production accounts. Their [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) service separates the agent harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox architectures. Their [effective harnesses for long-running agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) post describes a two-agent design — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent — to maintain consistent progress across context windows. Anthropic also [launched dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code), letting Claude write its own orchestration scripts and spin up hundreds of parallel subagents for codebase-wide migrations and security audits.

Memory and state persistence are a recurring implementation problem. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context via a `.story/` directory of JSON files. [Zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown on disk with auto-injected XML context blocks, avoiding vector stores entirely. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) takes the other direction, building biomimetic memory structures — world facts, experiences, mental models — claiming state-of-the-art LongMemEval results. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) uses layered context including schema metadata, human annotations, and self-improving memory to query 600+ petabytes reliably.

The single-agent versus multi-agent question has concrete stakes. [Ben Dickson drawing on Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2-6x, making single-agent systems the right default for most tasks. [Cloudflare's Mythos harness](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) goes the other direction, using parallel hunters, adversarial validators, and cross-repo tracers to dramatically improve vulnerability discovery — a case where the task structure justifies the multi-agent overhead. [Zerostack's subagent design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) takes a middle position: read-only parallel child agents for codebase exploration only, keeping the main agent's context uncluttered.

Sandboxing and security are not optional at meaningful autonomy levels. [Simon Willison documented Claude Fable 5](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) autonomously inventing browser automation techniques across hours of work, then noted that the same resourcefulness makes unsandboxed agents genuinely dangerous. [cekrem](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues Claude Code should always run inside Docker's sandbox to prevent credential leaks and production data destruction. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing for its autonomous vulnerability scanning pipeline.

Observability is not passive monitoring. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces only become useful when feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — are attached to them, turning observation into a learning loop. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) automates this by generating training data and evaluation models for agents without requiring labeled datasets.

The honest failure modes are documented too. [Christopher Meiklejohn's account of two weeks building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) shows an agent that consistently declares work done after minimal checks, requiring the human to manually verify every feature. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues full agentic workflows accelerate skill atrophy and invert developer priorities toward speed over understanding. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) frames the organizational version: agents make code cheap but amplify whatever alignment or misalignment an organization already has.

The debate about human involvement has not settled. Val Town's Slow Mode proposal argues for keeping the human involved at every step to preserve genuine learning. [Ethan Mollick's hands-on report with Claude Fable 5](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) describes multi-hour autonomous workflows that deliver complex software, but notes the human role has shifted from doing to commissioning. [Jane Street's Yaron Minsky](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) sees agentic coding as newly making formal methods cost-effective, both by lowering proof costs and by creating urgent demand for verification beyond what tests alone provide.
