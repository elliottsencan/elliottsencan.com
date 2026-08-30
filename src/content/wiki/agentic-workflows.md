---
title: Agentic workflows
summary: >-
  Agentic workflows let LLMs plan, execute, and iterate over multi-step tasks
  autonomously — a space where architecture, state management, and human
  oversight matter more than prompt quality alone.
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
compiled_at: '2026-08-30T05:45:31.936Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 1925
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
  cost_usd: 0.072633
---
An agentic workflow is any system where an LLM issues actions, observes results, and continues over multiple steps without constant human direction. The concept has moved rapidly from research curiosity to production practice, and the sources collected here map both the engineering patterns that work and the failure modes that keep recurring.

The most durable lesson across these sources is that prompt engineering is a poor substitute for structural design. [Aiyan's data engineering agent]((/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it)) evolved through three architectures before settling on one where environmental constraints — tool design, ID keys, explicit context visibility — did the work that prompts kept failing to do. Brian Suh reaches the same conclusion independently: [agents need deterministic control flow encoded in software](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts), not increasingly elaborate prompt chains. The [12-factor agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) formalizes one such structural rule — unify execution state and business state into a single context-window-derived thread — so that the entire workflow history is serializable, debuggable, and resumable without a separate state machine.

State and memory are where most real-world agents break. Stateless sessions mean each new context window re-derives decisions that were already made, causing the kind of architectural drift the [AI-native startup playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) calls "agentic technical debt." Several projects attack this directly. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across Claude Code sessions via a `.story/` directory. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures — world facts, experiences, mental models — so agents accumulate knowledge rather than starting fresh. [Zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) takes the opposite infrastructure bet: plain Markdown files on disk, no vector stores, with auto-injected XML context blocks.

Harness engineering has become its own discipline. Anthropic's [Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces — achieving ~60% reduction in p50 time-to-first-token while enabling multi-brain, multi-sandbox configurations. Their [long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) pairs an initializer agent with an incremental coding agent to maintain consistent progress across many context windows. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names the five subsystems that matter: instructions, state, verification, scope, and session lifecycle. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) extend this further, letting the model write its own orchestration scripts to spin up hundreds of parallel subagents for codebase-wide tasks.

Multi-agent architectures carry hidden costs. Research cited by [Ben Dickson](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2–6x compared to single-agent systems, making the single-agent default appropriate for most tasks. [Zerostack's subagent design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) handles this by spawning read-only parallel child agents only for codebase exploration, keeping the main agent's context clean. Cloudflare's [Mythos security harness](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) uses parallel hunters, adversarial validators, and cross-repo tracers — but that complexity is justified by the specific demands of vulnerability discovery across 50+ repositories.

Observability and feedback loops are underbuilt in most agentic systems. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone are inert; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — to those traces is what turns observability into a learning system. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) approaches this from the evaluation side, auto-generating training data and deploying guardrail models at sub-100ms latency. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) takes a lighter approach: reading the agent's conversation history alongside the diff to catch mistakes that standard code review misses.

Sandboxing is consistently under-prioritized. [cekrem's argument](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) for always running Claude Code inside Docker is blunt: credential leaks and accidental production data destruction are real risks in auto-approve mode. Simon Willison documents [Claude Fable autonomously inventing browser automation techniques](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) — useful resourcefulness that becomes a threat vector without containment. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing as a baseline assumption for its autonomous vulnerability pipeline.

The human role in agentic workflows remains contested. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues full autonomy accelerates skill atrophy and inverts developer priorities toward speed over understanding. [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) suggests trading short-term throughput for genuine learning by keeping humans involved at every planning step. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) reframes the question entirely: agentic coding makes individual code-writing cheap but amplifies whatever organizational alignment or misalignment already exists, making the real bottleneck shared context and specification clarity rather than execution speed. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk creating codebases that require machine participation to maintain.

The pattern that runs through even the most optimistic sources is that agentic workflows transfer complexity rather than eliminate it. The model's execution cost drops; the cost of designing the harness, managing state, verifying outputs, and maintaining human oversight rises to compensate.
