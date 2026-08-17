---
title: Agentic workflows
summary: >-
  Agentic workflows delegate multi-step tasks to AI agents that plan, execute,
  and loop autonomously — with reliability depending far more on harness
  architecture, state design, and environmental constraints than on prompt
  engineering.
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
compiled_at: '2026-08-17T18:38:22.151Z'
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
An agentic workflow is one where an AI model takes a sequence of actions toward a goal, invoking tools, spawning subagents, and iterating across context windows without a human directing each step. The concept spans a wide design space — from a single agent looping through a task list to parallel swarms of specialized subagents — and the engineering challenges differ sharply depending on where on that spectrum a system sits.

The most consistent finding across practitioners is that reliability comes from structure, not from better prompts. A data engineering agent case study [described at aiyan.io](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) evolved through three architectures before settling on the lesson that tool design, ID keys, and context visibility outperform prompt iteration. [Brian Suh makes the same argument directly](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): complex tasks need explicit state transitions and validation checkpoints encoded in software, not longer prompt chains. The [12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) formalizes one piece of this — unifying execution state and business state into a single context-window-derived thread, which simplifies debugging, serialization, and recovery without requiring separate infrastructure to track step counts and retry state.

Harness design is the practical implementation of this principle. Anthropic's [effective harnesses post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent setup — an initializer that scaffolds a feature list and progress file, and a coding agent that reads that file to resume across context windows — allowing consistent progress on long tasks. Their [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces, cutting p50 time-to-first-token by ~60% and enabling multi-brain, multi-sandbox configurations that evolve as models improve. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names the five subsystems that any harness must address: instructions, state, verification, scope, and session lifecycle.

State and memory are recurring pain points. Stateless agents lose context between sessions, forcing humans to re-explain decisions. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses this with a `.story/` directory of JSON files that persist session context. [Zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown on disk with auto-injected XML blocks and three tools for read, write, and keyword search — no embeddings, no infrastructure. [Vectorize-io's Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) takes a more ambitious approach, building biomimetic memory structures to let agents learn and improve over time. OpenAI's internal data agent [uses layered context](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) — schema metadata, human annotations, code enrichment, and self-improving memory — to query 600+ petabytes accurately.

Multi-agent architectures add coordination costs that compound error rates. [Ben Dickson summarizes Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finding that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2–6x relative to single-agent systems, making single-agent the correct default for most tasks. That said, parallel subagent patterns do offer real gains in specific cases: [Zerostack's subagent design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) spawns read-only child agents for multi-file exploration, gaining 25% in code exploration time. Cloudflare's [Mythos security harness](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) uses parallel hunters, adversarial validators, and cross-repo tracers to improve vulnerability discovery well beyond what a single agent achieves.

Sandboxing and credential management are non-negotiable when agents run autonomously. [cekrem's post on Claude Code](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues for Docker sandboxing to prevent credential leaks and accidental production data destruction. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) injects API credentials locally so agents can authenticate against services without seeing raw tokens. Simon Willison's account of [Claude Fable inventing elaborate browser automation](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) to debug a two-line CSS fix illustrates why the same resourcefulness that makes capable agents useful makes unsandboxed agents dangerous.

Observability without feedback loops is insufficient. [LangChain's Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that traces only become useful when feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — are attached to them, turning tracing into a learning loop across model, harness, and context layers.

Critics of full agentic automation raise concerns that go beyond engineering. [Lars Faye argues](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that full agentic coding workflows accelerate skill atrophy and create vendor dependency. [Christopher Meiklejohn's account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building with Claude over two weeks finds that the agent consistently declares work done after minimal verification, requiring manual checks to find breakage despite 52 added guardrails. Armin Ronacher [warns that harness loops](/reading/2026-06/2026-06-23t161552-the-coming-loop) amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. The organizational dimension matters too: [The Typical Set observes](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) that coding agents make code-writing cheap but amplify existing alignment or misalignment in the teams directing them.

Anthropics's production analytics stack — [documented on the Claude blog](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) and [critiqued by Genloop](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) — illustrates the organizational prerequisites clearly: 95% accuracy over 95% of queries required months of senior data engineering work to build canonical datasets and a semantic layer. The accuracy is real, but replicating it demands infrastructure investment most organizations cannot absorb quickly.

For builders, the practical upshot across these sources is consistent: invest in harness architecture before agent capability, design environmental constraints rather than prompt engineering for reliability, sandbox everything with side effects, and treat the coordination overhead of multi-agent systems as a cost requiring justification rather than a default pattern.
