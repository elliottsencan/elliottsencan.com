---
title: Agentic workflows
summary: >-
  Agentic workflows — systems where LLMs autonomously plan, execute, and iterate
  across multi-step tasks — are maturing rapidly, with active debate over
  architecture, reliability, human oversight, and the organizational conditions
  that make them succeed or fail.
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
compiled_at: '2026-08-29T20:08:34.385Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 1975
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
  cost_usd: 0.073383
---
An agentic workflow is a system where a language model drives execution across multiple steps, invoking tools, managing state, and deciding what to do next rather than simply responding to a single prompt. The term covers a wide range from a single agent looping through a task list to hierarchical multi-agent pipelines where orchestrators spawn hundreds of parallel subagents. Anthropic's dynamic workflows in Claude Code, for instance, can [spin up hundreds of parallel subagents](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) to handle codebase-wide migrations or security audits end-to-end. That scale makes architectural decisions consequential.

The most consistent finding across practitioner accounts is that reliability comes from engineering, not prompting. A data engineering agent evolved through three architectures before its authors concluded that [environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) for reducing LLM errors. Brian Suh makes the same argument structurally: [deterministic control flow encoded in software, with explicit state transitions and validation checkpoints](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts), is what allows agents to handle complex tasks without collapsing. The 12-factor-agents project reinforces this at the data layer, arguing that [execution state and business state should be unified into a single context-window-derived thread](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) so the agent's full history is serializable, debuggable, and recoverable without a separate state machine.

Harness design has become its own sub-discipline. Anthropic's Managed Agents service [separates the agent harness, session log, and sandbox into stable interfaces](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) so each layer can evolve independently as models improve, cutting p50 time-to-first-token by roughly 60%. A companion post describes a [two-agent harness — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) — that lets Claude make consistent progress across many context windows. The walkinglabs harness-engineering course names [five harness subsystems: instructions, state, verification, scope, and session lifecycle](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) as the components that turn unreliable model output into dependable results. Armin Ronacher warns, though, that harness loops [amplify LLMs' worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain](/reading/2026-06/2026-06-23t161552-the-coming-loop).

Memory and context persistence are recurring pain points. Tools like [Storybloq persist coding session context across sessions via a .story/ directory](/reading/2026-05/2026-05-11t155625-storybloqstorybloq), while [Hindsight builds biomimetic memory structures — world facts, experiences, mental models — so agents learn over time](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). OpenAI's internal data agent uses [layered context including schema metadata, human annotations, code enrichment, and self-improving memory](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) to handle 600+ petabytes of data reliably. Recursive Language Models offer a different angle: [keeping data in a REPL environment and letting the LLM selectively pull it into token space](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) avoids context rot while generating traces that can inform lower-latency agent designs.

Multi-agent architectures introduce a coordination tax that is easy to underestimate. Stanford and Google/MIT research cited by Ben Dickson finds that [multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2-6x](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) relative to single-agent baselines, making single-agent systems the rational default for most tasks. Cloudflare's Mythos deployment runs counter-examples: [parallel hunters, adversarial validators, and cross-repo tracers dramatically improve vulnerability discovery](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) over generic coding agents in security contexts where parallelism is the point.

Observability and feedback loops are what separate monitoring from improvement. LangChain's Harrison Chase argues that [traces alone don't improve agentic systems — attaching feedback signals to traces is what turns observability into a learning loop](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) across model, harness, and context layers. Plurai automates part of this by [auto-generating training data and deploying custom evaluation and guardrail models at sub-100ms latency](/reading/2026-05/2026-05-04t235011-plurai) without labeled data pipelines.

Sandboxing and credential management are practical prerequisites that get undersold. Claude Code running unsandboxed is [genuinely dangerous given how resourcefully agents invent techniques to accomplish goals](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive), and running it [inside Docker's sbx sandbox prevents credential leaks and accidental production data destruction](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) while still allowing auto-approve mode. Latchkey handles the credential problem by [injecting API tokens into agent calls locally so agents can authenticate against services without ever seeing raw credentials](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

The organizational dimension receives less attention but may be the binding constraint. [Coding agents amplify whatever alignment or misalignment an organization already has](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) — shared context, specification clarity, and management coherence remain the real bottlenecks. Christopher Meiklejohn's honest account of two weeks building with Claude finds that [the agent consistently declares work done after minimal checks, forcing manual verification of every feature](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) despite 52 new guardrails. Lars Faye argues that [full agentic coding workflows accelerate skill atrophy and create vendor dependency](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap), and Val Town's Pete Millspaugh proposes a Slow Mode that [keeps the programmer involved at every step to trade short-term speed for genuine understanding](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Dex Horthy at HumanLayer is more categorical: [lights-off software factories fail because LLMs cannot maintain codebase quality over time](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents), a training problem no harness engineering resolves.
