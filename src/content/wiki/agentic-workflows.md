---
title: Agentic workflows
summary: >-
  Agentic workflows delegate multi-step tasks to LLM-driven systems that plan,
  call tools, and loop without constant human direction — a maturing practice
  defined by ongoing tension between automation depth, reliability engineering,
  and human oversight.
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
compiled_at: '2026-11-10T01:11:28.153Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 1992
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
  cost_usd: 0.073638
---
An agentic workflow is any system where an LLM takes a goal, selects tools, executes actions across multiple steps, and decides when the task is done — all with minimal per-step human intervention. The pattern has moved from experiment to production infrastructure fast enough that a coherent engineering discipline is forming around it, even as practitioners disagree sharply on how autonomous these systems should actually be.

The reliability question is the first fault line. [Aiyan's data-engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) tracks an agent through three architectural generations and concludes that environmental constraints — well-designed tools, stable ID keys, visible context — do more for LLM reliability than any amount of prompt tuning. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) reaches the same conclusion from a different angle: complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not increasingly elaborate prompt chains. The [12-factor-agents guide](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) adds that unifying execution state and business state into a single context-window-derived thread simplifies serialization, debugging, and recovery without requiring separate orchestration bookkeeping.

Anthropics's production experience fills out the harness picture. Their [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces — cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox topologies. Their [effective harnesses post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent design where an initializer scaffolds a feature list and progress file before a coding agent begins, so state survives across context windows. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names five subsystems every reliable harness needs: instructions, state, verification, scope, and session lifecycle. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) push this further by having the model itself write orchestration scripts that spin up hundreds of parallel subagents for codebase-wide tasks.

Memory and context are a parallel engineering problem. Stateless agents re-derive decisions from scratch each session, causing drift. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses this with a `.story/` directory of JSON files that persist session context. [Zerostack's memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown on disk with auto-injected XML blocks — no vector stores. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) takes a biomimetic approach, building world facts, experiences, and mental models so agents compound learning over time. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a knowledge base agents query in real time, with its Lun tool blocking non-compliant code at the Git layer.

Observability closes the loop. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone don't improve agentic systems — attaching feedback signals (user ratings, indirect behavior, LLM-as-judge, deterministic rules) to traces is what turns logging into a learning loop. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) auto-generates evaluation and guardrail models for agents, claiming sub-100ms latency at a fraction of GPT-as-judge cost.

Multi-agent architectures add coordination overhead that is easy to underestimate. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x — making single-agent systems the right default for most tasks. [Cloudflare's Glasswing project](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) shows where multi-agent payoff is genuine: parallel hunters, adversarial validators, and cross-repo tracers dramatically improve vulnerability discovery over generic coding agents. [Zerostack's subagents design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) finds a narrower, practical win: read-only parallel child agents for codebase exploration reduce main-agent context bloat by 25%.

Safety and sandboxing run through the literature as a consistent concern. [Claude Fable's autonomous behavior](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) — inventing elaborate browser automation to debug a two-line CSS fix — illustrates how capable agents' resourcefulness becomes a hazard outside sandboxes. [cekrem's Docker sandboxing post](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) makes the case that Claude Code should always run inside a container even in auto-approve mode. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing for an autonomous vulnerability discovery pipeline. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeps credentials encrypted on-device so agents authenticate without ever seeing raw tokens.

The human oversight debate sits beneath all of it. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full agentic workflows accelerate skill atrophy and create vendor dependency, and that LLMs should stay as secondary delegation tools. [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) goes further: an agent that keeps the human involved at every step, trading short-term throughput for genuine understanding and long-term code ownership. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) reframes the problem organizationally — agents make code cheap but amplify whatever alignment or misalignment an organization already has; shared context and specification clarity remain the real bottleneck. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops risk producing codebases that require machine participation to maintain, raising questions about whether human engineering judgment can survive the handoff. [HumanLayer's critique](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) is blunter: lights-off software factories fail because LLMs cannot maintain codebase quality over time, and no amount of harness engineering fixes a training-time limitation.
