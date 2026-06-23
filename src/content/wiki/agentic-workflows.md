---
title: Agentic workflows
summary: >-
  Agentic workflows are systems where AI agents autonomously plan, act, and
  iterate across multi-step tasks — a space where architecture, state
  management, reliability engineering, and human oversight questions are all
  still being actively worked out.
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
compiled_at: '2026-06-23T01:55:38.401Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12689
    output_tokens: 1805
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
  cost_usd: 0.065142
---
An agentic workflow is any system where an LLM takes sequences of actions toward a goal with minimal step-by-step human direction: running tools, writing and executing code, delegating to subagents, reading results, and looping until the task is done. The sources here span from hands-on failure reports to reference architectures to philosophical challenges, and they converge on several tensions that define the space.

The most consistent finding is that prompting alone cannot produce reliable agents. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traced an agent through three architecture generations and concluded that environmental constraints — tool design, visible IDs, context shape — did more work than any prompt refinement. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the structural version of that argument: complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints. [The 12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) extends this further, arguing that execution state and business state should be unified into a single context-window-derived thread so that the entire agent history is serializable, debuggable, and recoverable from any point.

State continuity across sessions is a recurring design problem. [Anthropic's harness engineering post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent pattern — an initializer that scaffolds a feature list, git repo, and progress file, plus an incremental coding agent — that lets Claude make consistent progress across many context windows. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) solves the same problem by persisting session context in a `.story/` directory of JSON files. [Zerostack's memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) takes a deliberately minimal path: plain Markdown on disk with auto-injected XML context blocks, no vector stores. [Vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) goes the other direction, building biomimetic memory structures — world facts, experiences, mental models — for agents that need to learn and improve over time.

Observability and feedback loops are what separate deployable systems from demos. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone accomplish nothing; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — to those traces is what creates a learning loop across model, harness, and context layers. [Anthropic's Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates harness, session log, and sandbox into stable interfaces precisely so each layer can be improved independently without breaking clients.

The single-versus-multi-agent question has a clearer empirical answer than the discourse suggests. [Research cited by Ben Dickson](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) from Stanford and Google/MIT found that multi-agent orchestration can amplify errors up to 17x and reduce tool-handling efficiency by 2 to 6x; single agents should be the default unless the task genuinely requires parallelism. [Anthropic's Claude Code dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) and [Cloudflare's Mythos harness](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) represent cases where parallel subagents do earn their overhead — large-scale migrations and cross-repo vulnerability discovery — but those are exceptions, not defaults.

Sandboxing is non-negotiable once agents can autonomously execute code. [Simon Willison's account of Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents an agent spontaneously inventing browser automation techniques involving screenshot capture and template injection to debug a two-line CSS fix, then notes that the same resourcefulness makes unsandboxed agents genuinely dangerous. [A separate post](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues Claude Code should always run inside Docker's sbx sandbox to prevent credential leaks and accidental production data destruction.

Two longer-range criticisms cut against the workflow-maximalist position. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full agentic coding workflows accelerate skill atrophy and invert developer priorities toward speed over understanding, creating vendor dependency in the process. [Pete Millspaugh at Val Town](/reading/2026-05/2026-05-19t193626-slow-mode) proposes a Slow Mode where the agent plans with the human at every step and never autonomously loops, trading short-term velocity for genuine skill retention. The organizational bottleneck framing from [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) reinforces both: coding agents make individual code-writing cheap, but the real constraints are shared context, specification clarity, and management coherence — and agents amplify existing misalignment rather than dissolving it. [Christopher Meiklejohn's two-week build diary](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) puts a face on that: the agent consistently declared work done after minimal checks, leaving him to manually click through every feature despite 52 added guardrails.

Where the infrastructure is right, results are real. [Anthropic's self-service analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) automated 95% of business analytics queries at roughly 95% accuracy using canonical datasets, a semantic layer, and curated skill docs — though [a critique from Genloop](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes that replicating those results requires months of senior data engineering work most organizations cannot provide. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) covers 600+ petabytes using layered context and self-improving memory — a reminder that production agentic workflows require as much investment in data architecture as in model selection.
