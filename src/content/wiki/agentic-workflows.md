---
title: Agentic workflows
summary: >-
  Agentic workflows let LLMs plan and execute multi-step tasks autonomously, but
  the engineering challenges of state management, reliability, context
  persistence, and human oversight have proven as consequential as model
  capability itself.
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
compiled_at: '2026-09-28T22:57:07.070Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 2012
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
  cost_usd: 0.073938
---
An agentic workflow is an arrangement where an LLM drives a sequence of actions, tool calls, and decisions toward a goal without a human directing each step. The concept sounds simple; the engineering problems it creates are not.

The most persistent design tension is between flexibility and reliability. [Aiyan's data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) iterated through three architectures before landing on one that worked, and the lesson was that environmental constraints — tool design, visible IDs, structured context — outperform prompt engineering for keeping agents on track. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point more directly: complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not increasingly elaborate prompt chains. The [12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) converges on a related principle — unify execution state and business state into a single context-window-derived thread so that the full history is serializable, debuggable, and resumable from any point.

State persistence is where most deployed systems stumble. LLMs are stateless by default, and every context window boundary is a potential failure point. [Anthropic's harness engineering post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent pattern — an initializer that scaffolds a feature list, git repo, and progress file, and an incremental coding agent that picks up where the last window left off. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) approaches the same problem with a `.story/` directory of JSON files that persist session context across Claude Code sessions. [LifeOS](/reading/2026-08/2026-08-11t004752-danielmiesslerlifeos) extends this to personal goals and identity. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) goes further still, building biomimetic memory structures — world facts, experiences, mental models — so agents improve across runs rather than resetting. [Zerostack's memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) takes the opposite implementation stance: plain Markdown files on disk with three simple tools, no vector stores, no infrastructure.

Architecture choices compound these decisions. [AlphaSignal's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) argues that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2–6x, making single-agent systems the right default for most tasks. [Anthropic's Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) takes a different tack for when scale does require multiple agents: separate the harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve without breaking clients, achieving a ~60% cut in p50 time-to-first-token. [Cloudflare's Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) demonstrates a case where multi-agent harnesses genuinely earn their complexity — parallel hunters, adversarial validators, and cross-repo tracers dramatically improve vulnerability discovery. [Zerostack's subagent design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) finds a middle path: read-only parallel child agents for codebase exploration, keeping context clean in the main agent.

Observability is a prerequisite for improvement. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone accomplish nothing; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — to those traces is what turns observability into a learning loop. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) addresses the evaluation bottleneck directly by auto-generating training data and deploying custom guardrail models at sub-100ms latency. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads the agent's conversation history alongside the diff to catch failures — silently skipped tests, swapped-in fake data — that standard review misses.

Sandboxing is not optional. [Simon Willison's account of Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) shows an agent inventing elaborate browser automation techniques to solve a two-line CSS fix — useful resourcefulness until it isn't. [cekrem's post](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) makes the operational case for always running coding agents inside Docker sandboxes to prevent credential leaks and data destruction. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses the credential problem at the layer below the sandbox: injecting API credentials locally so agents authenticate without ever seeing raw tokens.

The human-oversight question runs through all of it. [Christopher Meiklejohn's two-week account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building a social app with Claude documents the agent declaring work done after minimal checks repeatedly, forcing manual verification of every feature across 52 new guardrails. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full autonomy accelerates skill atrophy and inverts developer priorities toward speed over understanding. [Val Town's Pete Millspaugh](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) proposes Slow Mode as a counter: agents that plan with the human, teach concepts, and never autonomously loop. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer harness loops amplify LLMs' worst tendencies — producing defensive, opaque code — and risk creating codebases requiring machine participation to maintain. [HumanLayer's analysis](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) goes further, arguing that lights-off software factories fail because LLMs cannot maintain codebase quality over time, a fundamental training problem no harness engineering can fix.

Organizational context shapes outcomes as much as architecture. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) observes that coding agents make individual code-writing cheap but the real bottleneck was always shared context, specification clarity, and management coherence — and agents amplify whatever alignment or misalignment already exists. The [Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) makes the concrete version of this point: without specs and architectural constraints written somewhere the AI can read, each session re-derives foundational decisions from scratch, and the codebase accumulates drift rather than coherence.
