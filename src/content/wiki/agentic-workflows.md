---
title: Agentic workflows
summary: >-
  Agentic workflows delegate multi-step tasks to LLM-driven agents operating
  across tool calls, context windows, and execution environments — raising hard
  questions about reliability, state management, human oversight, and
  organizational fit.
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
compiled_at: '2026-07-04T21:15:04.933Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 13725
    output_tokens: 1958
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
  cost_usd: 0.070545
---
An agentic workflow is any system where an LLM takes a sequence of actions autonomously, selecting tools, making decisions, and producing side effects across multiple steps without requiring a human prompt at each turn. The concept spans a spectrum from simple tool-calling loops to multi-agent pipelines running hundreds of parallel subagents. Across that spectrum, the same tensions recur: model capability versus system reliability, autonomy versus oversight, speed versus correctness.

The architectural center of gravity has shifted toward the harness. Anthropic's engineering posts describe a two-agent setup — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent — that lets Claude make consistent progress across context windows without losing state [see effective harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Their Managed Agents service goes further, separating the agent harness, session log, and sandbox into stable, swappable interfaces so implementations can change as models improve without breaking clients, cutting p50 time-to-first-token by roughly 60% [see managed agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). The 12-factor-agents project distills similar logic into a design principle: unify execution state and business state into a single context-window-derived thread, making the whole history serializable, debuggable, and resumable from any point [see factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

Reliability engineering is a recurring preoccupation. One data engineering agent evolved through three architectures — rigid state machine, orchestrator, then single general-purpose agent — finding that environmental constraints in tool design and context visibility outperform prompt engineering [see engineer reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh makes the same point more directly: complex agents need deterministic control flow encoded in software, not elaborate prompt chains [see control flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). Christopher Meiklejohn's two-week account of building with Claude documents the failure mode in practice: the agent consistently declares work done after minimal checks, requiring manual verification of every feature despite 52 added guardrails [see babysitting](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Harness-based observability — attaching feedback signals to traces so the system learns across model, harness, and context layers — is one proposed response [see observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning).

State and memory are structurally difficult. Agents operating across long tasks or multiple sessions need mechanisms beyond conversation history. The Hindsight project builds biomimetic memory structures — world facts, experiences, mental models — so agents accumulate knowledge over time [see hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). Zerostack takes a simpler route: plain Markdown files on disk, auto-injected as XML context blocks, with read/write/search tools and no vector infrastructure [see zerostack memory](/reading/2026-06/2026-06-11t023157-memory-design-zerostack). Storybloq persists session context across Claude Code sessions via a .story/ directory [see storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). The Founders Playbook frames persistent context as a founding discipline: skip architectural decision files and each new session re-derives foundational choices from scratch, producing drift that compounds [see founders playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup).

Multi-agent orchestration adds a coordination tax. Research cited by AlphaSignal finds that multi-agent setups can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x compared to single-agent baselines, making single-agent systems the right default for most tasks [see single vs multi](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Claude Code's dynamic workflows move in the opposite direction, spinning up hundreds of parallel subagents for codebase-wide migrations and security audits [see dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Cloudflare's Project Glasswing uses parallel hunters, adversarial validators, and cross-repo tracers to improve vulnerability discovery [see glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us). The multi-agent approach appears most justified when subtasks are genuinely parallel and independently verifiable; otherwise the coordination overhead dominates.

Sandboxing is treated as non-negotiable by several sources. Simon Willison documents Claude Fable autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, and warns that the same resourcefulness makes unsandboxed agents dangerous [see fable proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Running Claude Code inside Docker's sbx sandbox is one concrete response [see sandbox](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box)]. Anthropic's defending-code reference harness uses gVisor sandboxing for autonomous vulnerability discovery [see defending code](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness).

The organizational layer is where many agentic workflows stall. Coding agents make individual code-writing cheap, but the real bottleneck was always shared context, specification clarity, and management coherence — and agents amplify whatever alignment or misalignment already exists [see bottleneck](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code)]. Structural barriers including weak type systems, learned distrust of generated code, and org processes built for human-speed development explain why AI coding tools rarely deliver promised productivity gains [see barriers](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively). Armin Ronacher warns that harness loops risk producing codebases that require machine participation to maintain, raising questions about human oversight and engineering judgment [see coming loop](/reading/2026-06/2026-06-23t161552-the-coming-loop).

Skill atrophy is a contested concern. Lars Faye argues that full agentic coding workflows invert developer priorities toward speed over understanding and create vendor dependency [see trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Val Town's Pete Millspaugh proposes a Slow Mode that keeps the human involved at every step, trading short-term productivity for genuine learning [see slow mode](/reading/2026-05/2026-05-19t193626-slow-mode). Against this, Ethan Mollick's hands-on report with Claude Fable finds it a genuine capability leap for complex software tasks, but notes the human role has shifted from doing to commissioning [see mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos). The disagreement is less about capability than about what developers should preserve.
