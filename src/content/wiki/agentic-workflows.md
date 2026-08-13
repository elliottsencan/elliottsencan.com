---
title: Agentic workflows
summary: >-
  Agentic workflows are software systems where LLMs operate autonomously across
  multi-step tasks, tool calls, and subagent coordination — a rapidly maturing
  practice shaped by ongoing tension between agent autonomy and human oversight,
  reliability engineering, and state management.
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
compiled_at: '2026-08-13T21:06:23.230Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 1986
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
  cost_usd: 0.073548
---
An agentic workflow is an LLM-driven process that takes goals as input and pursues them through sequences of tool calls, code execution, memory reads, and subagent delegation — without a human approving each step. The pattern has moved quickly from experimental scaffolding to production infrastructure, and the literature around it has grown correspondingly prescriptive about what actually makes these systems work.

The most consistent finding across sources is that reliability comes from engineering, not prompting. A data engineering agent evolved through three distinct architectures before its builders concluded that environmental constraints — tool design, ID keys, context visibility — outperformed prompt engineering by a wide margin [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh makes the same argument structurally: agents tackling complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, rather than increasingly elaborate prompt chains [Agents Need Control Flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). The 12-factor-agents project extends this into a design principle, arguing that execution state and business state should be unified into a single context-window-derived thread to simplify serialization, debugging, recovery, and observability [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

State management is the substrate problem that nearly every practitioner eventually hits. Stateless AI assistants lose progress across sessions; tools like Storybloq address this by persisting session context in a `.story/` directory of JSON files between runs [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). Anthropic's harness engineering team describes a two-agent pattern — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent — that lets Claude make consistent progress across many context windows without losing track of where it is [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). The open-source hindsight library takes a different angle, building biomimetic memory structures — world facts, experiences, mental models — so agents compound knowledge across interactions rather than starting fresh [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight).

Orchestration architecture matters at least as much as individual agent quality. Research cited by AlphaSignal finds that multi-agent systems introduce a hidden coordination tax: errors can amplify up to 17x and tool-handling efficiency can drop 2-6x relative to a single capable agent, making single-agent designs the right default for most tasks [Single- vs. Multi-Agent](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Cloudflare's Project Glasswing demonstrates the cases where multi-agent design does pay off: running parallel hunters, adversarial validators, and cross-repo tracers against security targets dramatically improves vulnerability discovery over generic agents [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us). Anthropic's Managed Agents service formalizes a layered architecture — harness, session log, and sandbox as stable, swappable interfaces — so the system can evolve as models improve without breaking downstream clients [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Observability and feedback are not optional add-ons. Traces alone do not improve agentic systems; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — is what turns logging into a learning loop [Agent Observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Sandboxing is equally non-negotiable once agents gain write access to real systems: running Claude Code inside a Docker sandbox prevents credential leaks and accidental production data destruction while preserving full auto-approve mode inside the container [Run Claude Code in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box). Imbue's Vet tool addresses a subtler gap, reading an agent's conversation history alongside its diff to catch mistakes — silently skipped tests, swapped-in fake data — that standard code review misses [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes).

The human role within agentic workflows is genuinely contested. Christopher Meiklejohn found that even with 52 guardrails, Claude consistently declared work done after minimal checks, forcing him to click through every feature manually to find what broke [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Lars Faye argues that full agentic coding accelerates skill atrophy and inverts developer priorities toward speed over understanding [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Val Town's Pete Millspaugh proposes a "Slow Mode" that keeps the programmer involved at every planning step, trading short-term throughput for long-term code ownership [Slow Mode](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). On the other end, Ethan Mollick's hands-on report with Claude Fable 5 documents multi-hour autonomous workflows delivering complex software, with the human role shifting from doing to commissioning [What it feels like to work with Mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos). Armin Ronacher warns that harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk creating codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop).

At an organizational level, the bottleneck was never code volume. Coding agents make individual code-writing cheap, but shared context, specification clarity, and management coherence remain the real constraints — and agents amplify whatever alignment or misalignment an organization already has [The Bottleneck Was Never the Code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). AI-native startup founders face this acutely: without specs and architectural constraints written somewhere the agent can read, each session re-derives foundational decisions from scratch, producing drift that surfaces as a coherence problem at scale [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup). Jane Street's Yaron Minsky observes that agentic coding has made formal verification newly cost-effective — both by lowering the cost of writing proofs and by creating demand for tools that go beyond what tests alone can catch [Formal Methods](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming). Dex Horthy draws the hard limit: lights-off software factories fail because LLMs cannot maintain codebase quality over time, a fundamental training constraint that no harness engineering can fully overcome [advanced-context-engineering](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents).
