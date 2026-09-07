---
title: Agentic workflows
summary: >-
  Agentic workflows are LLM-driven execution loops where models plan, invoke
  tools, and iterate toward goals across multiple steps — raising hard
  engineering questions about architecture, reliability, state management, and
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
  - >-
    2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents
  - >-
    2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms
  - 2026-08/2026-08-11t004752-danielmiesslerlifeos
  - >-
    2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test
compiled_at: '2026-09-07T21:07:46.466Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 1998
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
  cost_usd: 0.073728
---
An agentic workflow is any system where a language model issues actions, observes results, and repeats that loop until a goal is complete, rather than answering a single prompt and stopping. The sources here span production deployments, open-source toolkits, architectural post-mortems, and pointed critiques, and they collectively describe a field learning the hard way that prompting is not engineering.

The most consistent finding is that reliability requires structural intervention, not better instructions. A data engineering agent described in ["Don't Prompt Your Agent for Reliability"](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) evolved through three architectures before landing on one where environmental constraints — tool design, ID keys, context visibility — did the work that prompts could not. ["Agents Need Control Flow, Not More Prompts"](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same argument from first principles: complex tasks need explicit state transitions and validation checkpoints encoded in software, not elaborate prompt chains that collapse under complexity.

State management is one of the field's unsolved problems. Anthropic's Managed Agents service addresses it by separating the agent harness, session log, and sandbox into stable, swappable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox configurations [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). A complementary approach from 12-factor-agents argues that execution state and business state should be unified into a single context-window-derived thread, making the system trivially serializable, debuggable, and recoverable [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). For long-running tasks that span context windows, Anthropic's harness guide describes a two-agent pattern — an initializer that scaffolds a feature list, git repo, and progress file, plus an incremental coding agent that picks up where the last window ended [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

Memory is a distinct layer from state. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures — world facts, experiences, mental models — so agents accumulate knowledge over time rather than resetting between sessions. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) takes a simpler approach, persisting session context as JSON files in a `.story/` directory. [Memory design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) goes further toward minimalism, using plain Markdown on disk with XML context injection and three read/write/search tools — no vector stores, no embeddings.

Multi-agent orchestration is often proposed as the path to scale, but the evidence here is cautious. Research cited in ["How to Choose Between Single- and Multi-Agent Solutions"](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent setups introduce a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2-6x — making single-agent systems the better default for most tasks. Cloudflare's Project Glasswing ["Project Glasswing"](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) is a notable exception, using parallel hunters, adversarial validators, and cross-repo tracers to improve vulnerability discovery in ways a single agent could not match. Anthropic's Claude Code now ships dynamic workflows that spin up hundreds of parallel subagents for large-scale tasks like codebase migrations [Introducing Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code).

Observability is necessary but not sufficient. [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone produce no improvement — attaching feedback signals (user ratings, indirect behavior, LLM-as-judge, deterministic rules) is what turns observability into a learning loop. Without that loop, problems accumulate silently, which is exactly what ["Babysitting the Agent"](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents: an agent consistently declares work done after minimal checks, requiring the human to manually test every feature to find what broke.

Security and sandboxing are non-negotiable at agentic scale. ["If You're Running Claude Code, PLEASE Run It in a Box"](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) advocates Docker sandboxing to prevent credential leaks and accidental production data loss. [Simon Willison's report on Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents an agent autonomously inventing elaborate workarounds — PyObjC screenshot capture, CORS servers, template injection — to debug a two-line CSS fix, illustrating that the same resourcefulness that makes agents useful makes unsandboxed agents dangerous. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential exposure specifically by injecting API tokens locally and keeping them encrypted on-device.

Two broader concerns run through the critical sources. First, "lights-off" automation may have a ceiling: humanlayer/advanced-context-engineering-for-coding-agents argues that LLMs cannot maintain codebase quality over time — a training-level problem harness engineering cannot fix. ["The Coming Loop"](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer harness loops amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. Second, full autonomy may extract a human cost: ["Agentic Coding is a Trap"](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that handing implementation entirely to agents accelerates skill atrophy and inverts developer priorities toward speed over understanding, while ["Slow Mode"](/reading/2026-05/2026-05-19t193626-slow-mode) proposes keeping humans involved at every planning step as a deliberate counterweight.

The organizational dimension matters as much as the technical one. ["The bottleneck was never the code"](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) observes that coding agents make individual code-writing cheap but amplify whatever alignment or misalignment an organization already has — shared context, specification clarity, and management coherence remain the real constraints. Persistent context files and canonical architectural documents are the mechanism most sources converge on to keep agent output coherent across sessions, whether implemented as CLAUDE.md in a founder's repo or as MarkdownLM's living knowledge base [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) that blocks non-compliant code at the Git layer.
