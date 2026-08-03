---
title: Agentic workflows
summary: >-
  Agentic workflows coordinate LLMs across multi-step, often long-running tasks
  through harnesses, state management, and tool use — a space where
  architectural discipline consistently outperforms prompt engineering for
  reliability.
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
compiled_at: '2026-08-03T19:28:51.882Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14089
    output_tokens: 2089
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
  cost_usd: 0.073602
---
The defining characteristic of an agentic workflow is that the model does not produce a single response and stop. It reasons across multiple steps, calls tools, accumulates state, and loops until a task is done or a checkpoint interrupts it. That basic loop — think, act, observe, repeat — is simple to describe and hard to make reliable at scale.

The architectural choices that make or break these systems are now fairly well-documented. Anthropic's Managed Agents service separates the agent harness, session log, and sandbox into stable, swappable interfaces [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands), cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox configurations. The 12-factor-agents project makes a related argument at the application layer: execution state and business state should be unified into a single context-window-derived thread, which makes the agent trivially serializable, resumable, and forkable [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Anthropic's harness engineering post extends this further, describing a two-agent pattern — an initializer that scaffolds a feature list and progress file plus an incremental coding agent — to maintain consistent progress across many context windows [Effective Harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

Control flow is a recurring theme. Both a data engineering case study [Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) and Brian Suh's control flow argument [Control Flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) reach the same conclusion: explicit state transitions and validation checkpoints encoded in software outperform prompt chains when tasks grow complex. The harness engineering curriculum formalizes this into five subsystems — instructions, state, verification, scope, and session lifecycle [Harness Engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering). Claude Fable's release demonstrates where this trajectory is heading: Claude Code can now write orchestration scripts that spin up hundreds of parallel subagents for codebase-wide migrations and security audits [Dynamic Workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code), while Zerostack's subagent design achieves a 25% gain in code exploration time by delegating multi-file reads to read-only child agents rather than bloating the main context [Zerostack Subagents](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack).

Memory and context persistence are unsolved by default. Stateless agents re-derive foundational decisions in each session, causing architectural drift [Founders Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup). Storybloq persists session context as JSON files in a .story/ directory [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq); Zerostack uses plain Markdown with auto-injected XML blocks [Zerostack Memory](/reading/2026-06/2026-06-11t023157-memory-design-zerostack); Hindsight builds biomimetic structures covering world facts, experiences, and mental models [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). Recursive Language Models (RLMs) approach the problem differently by keeping data in a REPL environment and letting the LLM selectively pull it into token space, which avoids context rot [RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Reliability and observability close the loop. LangChain's Harrison Chase argues that traces alone accomplish nothing — attaching feedback signals (user ratings, LLM-as-judge, deterministic rules) to traces is what converts observability into a learning loop [Observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Plurai auto-generates evaluation and guardrail models in minutes with sub-100ms latency [Plurai](/reading/2026-05/2026-05-04t235011-plurai); MarkdownLM blocks non-compliant agent output at the Git layer [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm); Imbue's Vet tool reads an agent's conversation history alongside the diff to catch mistakes standard code review misses [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes).

The literature also documents the failure modes candidly. Agents consistently declare tasks done after minimal verification, forcing human manual testing [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2-6x, making single-agent systems the right default for most tasks [Single vs. Multi-Agent](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Harness loops amplify LLMs' tendency toward defensive, opaque code and risk producing codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). Imbue's pipeline experiment found that weaker fixer agents break correct code when operating beyond review scope [AI Code Review](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse).

Sandboxing is a security prerequisite, not an optimization. Claude Fable's resourcefulness in inventing novel automation techniques [Fable Proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) is the same property that makes unsandboxed agents dangerous. Sandboxed execution is standard practice [Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box), Anthropic's security harness uses gVisor [Defending Code](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness), and Latchkey keeps credentials encrypted on-device so agents authenticate against services without ever seeing raw tokens [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

The organizational dimension matters as much as the technical one. Coding agents make individual code-writing cheap, but shared context, specification clarity, and management coherence remain the binding constraint [Bottleneck](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Full autonomy also carries a skill-atrophy risk: handing off implementation entirely accelerates development speed while inverting developer priorities toward throughput over understanding [Agentic Coding Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). One proposed counter is Slow Mode — keeping the programmer involved at every planning and implementation step to trade short-term speed for genuine ownership [Slow Mode](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). The broader question of whether lights-off software factories can sustain codebase quality over time remains open [Advanced Context Engineering](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents).
