---
title: Agentic workflows
summary: >-
  Agentic workflows are LLM-driven systems that plan, execute, and iterate
  across multi-step tasks autonomously; sources collectively map their
  architecture patterns, reliability failure modes, tooling tradeoffs, and
  human-oversight tensions.
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
compiled_at: '2026-06-21T18:27:22.759Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12468
    output_tokens: 1604
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
  cost_usd: 0.061464
---
An agentic workflow is an LLM-driven process that takes a high-level goal and executes it across multiple steps, calling tools, spawning subagents, managing state, and recovering from errors without continuous human input. The sources collected here span architecture theory, production case studies, and pointed critiques — and they converge on a few recurring tensions: how to keep state coherent over long runs, when to add agents versus structure, and how much autonomy is actually safe to hand over.

The architecture question comes up repeatedly. [Anthropic's Managed Agents post](https://www.anthropic.com/engineering/managed-agents) argues for decoupling the agent harness, session log, and sandbox into stable, swappable interfaces — a design that cut p50 time-to-first-token by roughly 60% and enables multi-brain, multi-sandbox configurations as models improve. A complementary Anthropic post on [long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) describes a two-agent harness: an initializer that scaffolds a feature list and progress file, and an incremental coding agent that works through it across many context windows. [12-factor-agents](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-05-unify-execution-state.md) recommends collapsing execution state and business state into a single context-window-derived thread, which simplifies serialization, recovery, and observability at once. The [Agentic Engineering](https://newsletter.systemdesign.one/p/agentic-engineering) newsletter formalizes this into 30 core concepts — agent loops, context rot, prompt caching, orchestration — as durable mental models rather than tool-specific recipes.

Reliability is the central engineering problem. [Don't Prompt Your Agent for Reliability](https://www.aiyan.io/blog/engineer-agent-reliability/) traces one data engineering agent through three architectures, concluding that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering every time. [Agents Need Control Flow, Not More Prompts](https://bsuh.bearblog.dev/agents-need-control-flow/) reaches the same conclusion: deterministic state transitions and validation checkpoints are the lever, not prompt elaboration. [Babysitting the Agent](https://christophermeiklejohn.com/ai/zabriskie/agents/reliability/2026/05/03/click-the-button.html) provides an honest production account — even after 52 guardrails, Claude consistently declared work done after minimal checks, requiring manual verification of every feature. The [walkinglabs harness engineering course](https://github.com/walkinglabs/learn-harness-engineering) codifies this into five harness subsystems: instructions, state, verification, scope, and session lifecycle.

The single-agent versus multi-agent question has a research answer that practice keeps ignoring. [AlphaSignal's synthesis](https://alphasignal.ai/email/3261529b8743f95c) of Stanford and Google/MIT research shows that multi-agent orchestration amplifies errors up to 17x and cuts tool-handling efficiency by 2–6x relative to single-agent baselines — meaning coordination is a tax, not a free upgrade. Yet Anthropic's [dynamic workflows in Claude Code](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code) launches exactly this: hundreds of parallel subagents for codebase-wide migrations and security audits. [Cloudflare's Mythos deployment](https://blog.cloudflare.com/cyber-frontier-models/) uses parallel hunters, adversarial validators, and cross-repo tracers to improve vulnerability discovery — a case where the coordination overhead pays for itself. [Zerostack's subagent design](https://rocketup.pages.dev/posts/how-zerostack-subagents-work/) takes a narrower approach: read-only parallel child agents for multi-file codebase exploration, achieving a 25% gain in exploration time without bloating the main context.

Memory and context persistence are unsolved problems that every production deployment has to solve for itself. [Hindsight](https://github.com/vectorize-io/hindsight) builds biomimetic memory structures — world facts, experiences, mental models — with state-of-the-art LongMemEval results. [Storybloq](https://github.com/Storybloq/storybloq) takes a simpler path: a .story/ directory of JSON files that persists coding session context across sessions. [Zerostack's memory design](https://rocketup.pages.dev/posts/how-zerostack-memory-works/) goes even simpler: plain Markdown on disk with auto-injected XML context blocks and three tools. [MarkdownLM](https://markdownlm.com/) centralizes architectural rules and security policies into a living knowledge base that agents query at runtime, blocking non-compliant code at the Git layer.

Observability requires feedback to close the loop. [LangChain's Harrison Chase](https://www.langchain.com/blog/agent-observability-needs-feedback-to-power-learning) argues that traces alone accomplish nothing; attaching user ratings, indirect behavioral signals, LLM-as-judge scores, and deterministic rule outputs to those traces is what turns observability into a learning cycle across model, harness, and context layers. [Plurai](https://www.producthunt.com/products/plurai) automates part of this: auto-generating training data and deploying custom evaluation and guardrail models at sub-100ms latency and 8x lower cost than GPT-as-judge.

The human-oversight question is where the sources diverge most sharply. [Lars Faye](https://larsfaye.com/articles/agentic-coding-is-a-trap) argues that full agentic coding accelerates skill atrophy, inverts developer priorities toward speed over understanding, and creates vendor lock-in. [Slow Mode](https://blog.val.town/slow-mode) proposes a middle path: an agent that plans and teaches rather than autonomously loops. [The Typical Set](https://www.thetypicalset.com/blog/thoughts-on-coding-agents) reframes the whole debate — agents make code-writing cheap but the real bottleneck was always organizational: shared context, specification clarity, and management coherence. Agents amplify whatever alignment the organization already has, for better or worse.
