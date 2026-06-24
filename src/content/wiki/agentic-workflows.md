---
title: Agentic workflows
summary: >-
  Agentic workflows let LLMs act autonomously across multi-step tasks, and the
  field's central tension is between the efficiency gains they enable and the
  reliability, control, and skill-atrophy problems they introduce.
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
compiled_at: '2026-06-22T07:16:11.274Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12614
    output_tokens: 1561
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
  cost_usd: 0.061257
last_source_added: '2026-06-24T04:28:45.870Z'
---
An agentic workflow is a system where an LLM drives a sequence of actions, tool calls, and decisions with minimal human intervention per step. The sources collected here span implementation architecture, reliability engineering, memory and state management, organizational effects, and the emerging critique of full autonomy.

The most consistent engineering lesson across sources is that prompt engineering is not a substitute for structural design. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traced a system through three architectures and found that environmental constraints, tool design, and context visibility outperformed prompt refinements at every stage. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point more directly: complex tasks need deterministic control flow with explicit state transitions and validation checkpoints, not longer prompt chains. The harness-engineering framing formalizes this, with [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) identifying five harness subsystems, instructions, state, verification, scope, and session lifecycle, as the components that convert unreliable model output into dependable results.

State management is its own discipline within this. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, which makes serialization, debugging, and recovery straightforward. Anthropic's production work shows what that looks like at scale: their [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces, cutting p50 time-to-first-token by roughly 60%, while their [two-agent harness for long-running tasks](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses an initializer and an incremental coding agent to maintain progress across context windows. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) takes a simpler path, persisting session context in a .story/ directory of JSON files to keep stateless assistants compounding across sessions.

Memory is a related but distinct concern. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures covering world facts, experiences, and mental models so agents improve over time rather than starting fresh. Zerostack's [file-based approach](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown on disk with auto-injected XML context blocks, deliberately avoiding vector stores. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) address context rot differently by keeping data in a REPL environment and letting the model pull selectively into token space.

The multi-agent question has become central as workflows grow. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent orchestration can amplify errors up to 17x and reduce tool-handling efficiency by 2 to 6x, making single-agent systems the right default for most tasks. Anthropic's [Claude Code dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) take the opposite direction, spinning up hundreds of parallel subagents for codebase-wide migrations, while Cloudflare's [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) used parallel hunters, adversarial validators, and cross-repo tracers to improve vulnerability discovery. The practical resolution seems to be that multi-agent setups are justified for parallelizable, bounded subtasks rather than open-ended reasoning chains.

Observability and evaluation close the loop. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone don't improve systems; attaching feedback signals, user ratings, indirect behavior, LLM-as-judge, and deterministic rules, is what turns observability into a learning loop. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) approaches this from the evaluation side, auto-generating training data and deploying custom guardrail models at sub-100ms latency.

The sharpest critique in this set is organizational rather than technical. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) observes that coding agents make individual code-writing cheap but the real bottlenecks, shared context, specification clarity, and management coherence, were never about code. Agents amplify existing alignment or misalignment. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) warns that full agentic workflows accelerate skill atrophy and invert developer priorities toward speed over understanding. [Christopher Meiklejohn's account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of two weeks building with Claude found that agents consistently declared work done after minimal verification, forcing manual review despite 52 new guardrails. [Pete Millspaugh's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) responds directly to this, arguing for keeping the human involved at every step to trade short-term throughput for genuine understanding and long-term ownership.
