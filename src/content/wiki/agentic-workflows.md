---
title: Agentic workflows
summary: >-
  Agentic workflows are LLM-driven systems that plan, execute, and iterate
  across multi-step tasks with varying degrees of autonomy, raising persistent
  tradeoffs between capability, reliability, human oversight, and architectural
  discipline.
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
compiled_at: '2026-10-26T22:18:53.508Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 2083
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
  cost_usd: 0.075003
---
An agentic workflow is a system where an LLM operates across multiple steps, calling tools, maintaining or recovering state, and producing outcomes that no single prompt-response exchange could achieve. The design space is wide, and the sources here map both its promise and its failure modes with unusual candor.

The foundational question is what the agent loop looks like. [Anthropic's harness engineering guide](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent structure where an initializer scaffolds a feature list and progress file, and an incremental coding agent picks up across context windows without losing state. Their [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) goes further, separating the harness, session log, and sandbox into stable, swappable interfaces that cut p50 time-to-first-token by roughly 60% and allow multi-brain, multi-sandbox configurations. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) breaks this into five subsystems: instructions, state, verification, scope, and session lifecycle.

State management is where most agentic systems quietly fail. The [12-factor agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, making the full history serializable, debuggable, and resumable from any point. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) takes a simpler approach, persisting session context across conversations in a `.story/` directory of JSON files. [Zerostack's memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) goes simpler still: plain Markdown on disk with auto-injected XML context blocks and three tools for read, write, and keyword search. At the other end, [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures tracking world facts, experiences, and mental models so agents compound knowledge over time.

Reliability consistently proves harder than capability. A [data engineering agent case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) evolved through three architectures before concluding that environmental constraints, explicit tool design, and visible context outperform prompt engineering for reliability. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point directly: complex agent tasks need deterministic control flow encoded in software, not increasingly elaborate prompt chains. [Christopher Meiklejohn's account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of two weeks building a social app with Claude documents what this looks like in practice: the agent repeatedly declares work done after minimal checks, and manual verification catches what 52 guardrails could not.

Observability is necessary but not sufficient. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces without feedback signals are inert; attaching user ratings, indirect behavioral signals, LLM-as-judge verdicts, and deterministic rules to traces is what turns monitoring into a learning loop. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) auto-generates training data and evaluation models for this feedback layer at sub-100ms latency.

Multi-agent architectures introduce their own costs. [Research synthesized by AlphaSignal](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) draws on Stanford and Google/MIT work to show that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2-6x, recommending single-agent systems as the default. [Cloudflare's Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) argues the opposite case: parallel hunters, adversarial validators, and cross-repo tracers dramatically improve vulnerability discovery in security contexts. The tradeoff is real and task-dependent. [Zerostack's subagent design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) finds a middle path by spawning read-only parallel child agents only for codebase exploration, achieving a 25% efficiency gain without bloating the main context.

Sandboxing and security concerns run throughout. [Cekrem's post on Claude Code](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues that any agent with auto-approve mode must run inside a container to prevent credential leaks and production data loss. [Simon Willison documents Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) inventing elaborate browser automation techniques to debug a two-line CSS fix, then warns that the same resourcefulness makes unsandboxed agents genuinely dangerous. [Anthropic's defending-code harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing in a full vulnerability-discovery-and-remediation pipeline.

Context engineering sits underneath most of what works. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a living knowledge base agents query in real time, blocking non-compliant code at the Git layer. [Anthropic's self-service analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) routes Claude through canonical datasets and a semantic layer rather than free warehouse search, achieving 95% accuracy on business queries. A [critique of that approach](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes the result depends on months of senior data engineering work most organizations cannot replicate.

The human-oversight question remains contested. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full agentic workflows accelerate skill atrophy and invert developer priorities toward speed over understanding. [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) formalizes this concern into a design pattern: keep the human involved at every step, trading short-term throughput for genuine learning. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. Opposing this, [Ethan Mollick's hands-on report with Claude Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) documents multi-hour autonomous workflows delivering complex software, concluding the human role has shifted from doing to commissioning. [HumanLayer's context engineering post](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) pushes back on both optimistic positions, arguing that LLMs cannot maintain codebase quality over time regardless of harness sophistication.

Across all these sources, a consistent pattern emerges: the most reliable agentic systems treat the harness as the primary engineering artifact, invest in state management and observability from the start, sandbox agent execution by default, and remain skeptical of autonomy as a goal rather than a means.
