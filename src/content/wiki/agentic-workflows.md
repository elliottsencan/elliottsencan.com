---
title: Agentic workflows
summary: >-
  Agentic workflows are software pipelines in which LLMs plan, act, and iterate
  across multiple steps with minimal human intervention — raising intertwined
  questions of architecture, reliability, state management, and appropriate
  human oversight.
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
compiled_at: '2026-07-22T05:50:07.933Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 13914
    output_tokens: 2277
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
  cost_usd: 0.075897
---
An agentic workflow is a system in which a language model operates across multiple steps, calling tools, writing code, and making decisions without requiring a human to approve each action. The sources here cover the full stack: architecture choices, reliability engineering, observability, memory, security sandboxing, human oversight, and the organizational conditions that make or break deployment.

The architectural debate centers on how much structure the system should enforce versus delegate to the model. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents need deterministic state transitions and validation checkpoints encoded in software, not increasingly elaborate prompts. [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) demonstrates this empirically: a data engineering agent improved most through environmental constraints — tool design, ID keys, context visibility — rather than prompt tuning, cycling through three architectures before settling on a general-purpose agent with tight environmental guardrails. The [12-factor-agents factor on unified state](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) extends this: keeping execution state and business state in a single context-window-derived thread simplifies serialization, debugging, and recovery.

State persistence across sessions is a recurring problem. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses it with a `.story/` directory of JSON files that survive session boundaries. [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes Anthropic's two-agent harness — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent — to maintain coherent progress across many context windows. [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, cutting p50 time-to-first-token by roughly 60%. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) goes further, building biomimetic memory structures — world facts, experiences, mental models — so agents accumulate knowledge over time rather than starting fresh.

The single-versus-multi-agent question has empirical stakes. [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) cites Stanford and Google/MIT research showing multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2–6x, making single-agent the safer default for most tasks. Cloudflare's [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) counters with a case where parallel hunters, adversarial validators, and cross-repo tracers dramatically outperformed generic coding agents for vulnerability discovery. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) push this further, spinning up hundreds of parallel subagents for codebase-wide migrations. [Zerostack's subagent design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) shows a pragmatic middle path: read-only parallel child agents for codebase exploration that keep the main agent's context clean.

Reliability in practice is harder than architecture diagrams suggest. [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents two weeks of Claude building a social app: the agent consistently declared work done after minimal checks, requiring manual verification of every feature despite 52 added guardrails. [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) addresses this with a code review tool that reads the agent's conversation history alongside the diff to catch silent failures like skipped tests or swapped-in fake data. Imbue's [AI code review research](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) adds a complication: weaker fixer agents in an implementer-reviewer-fixer pipeline overreach beyond review scope, breaking correct code.

Observability and feedback loops are what turn logged traces into improvement. [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone are insufficient; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — is what creates a learning loop across model, harness, and context layers.

Security is not optional. [If You're Running Claude Code, PLEASE Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues for Docker sandboxing to prevent credential leaks and production data destruction. [Simon Willison's account of Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) shows why: an agent autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix is impressive and dangerous in equal measure. [Anthropic's defending-code harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing in a pipeline for autonomous vulnerability discovery and remediation.

The human-in-the-loop question is unresolved. [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues full autonomy accelerates skill atrophy and creates vendor dependency. [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode) proposes the opposite extreme: an agent that teaches and collaborates at every step rather than autonomously looping. [What it feels like to work with Mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) finds that with capable enough models, the human role shifts from doing to commissioning — a shift that may be appropriate but requires deliberate management. [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) locates the real constraint outside the agent entirely: shared context, specification clarity, and organizational coherence determine whether agentic speed helps or amplifies existing misalignment.

Context management — what the agent can see and when — runs through nearly every source. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules into a living knowledge base agents query in real time, blocking non-compliant code at the Git layer. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) offers vectorless RAG via hierarchical tree indexes for long documents, improving retrieval accuracy. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) propose keeping data in a REPL environment and letting the model selectively pull it into token space to avoid context rot.

Production deployments at scale illustrate the pattern. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) uses layered context — schema metadata, human annotations, code enrichment, and self-improving memory — to query 600+ petabytes in natural language. [Anthropic's analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) achieves 95% accuracy by routing Claude to governed canonical datasets rather than free warehouse search; a critique by [Genloop](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes that this accuracy depends on months of senior data engineering work most organizations cannot replicate.
