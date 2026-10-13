---
title: AI-assisted coding
summary: >-
  Using LLMs as coding collaborators spans a wide spectrum from inline
  suggestion to fully autonomous agents, raising persistent questions about
  skill atrophy, code quality, security, and where human judgment must remain
  irreplaceable.
sources:
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - 2026-04/2026-04-30t231319-markdownlm
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - 2026-05/2026-05-02t094735-approaching-zero-bugs
  - 2026-05/2026-05-03t110355-babysitting-the-agent
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
  - 2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code
  - 2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla
  - 2026-05/2026-05-11t155625-storybloqstorybloq
  - >-
    2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio
  - >-
    2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning
  - >-
    2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession
  - 2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - 2026-05/2026-05-18t222802-raellioctowiz
  - >-
    2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you
  - 2026-05/2026-05-19t193626-slow-mode
  - 2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter
  - >-
    2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - >-
    2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for
  - 2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack
  - 2026-06/2026-06-11t023435-subagents-design-zerostack
  - 2026-06/2026-06-11t023723-gi-dellavzerostack
  - 2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - 2026-06/2026-06-17t075816-matt-palmer
  - >-
    2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup
  - 2026-06/2026-06-22t000701-the-idiot-index-for-code
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
  - 2026-06/2026-06-23t161552-the-coming-loop
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse
  - 2026-06/2026-06-23t232444-repowise-devrepowise
  - 2026-07/2026-07-07t170607-the-software-engineering-war
  - 2026-07/2026-07-20t215754-stop-using-opencode
  - >-
    2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents
  - 2026-08/2026-08-03t025839-dont-be-a-meat-proxy
  - >-
    2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms
  - 2026-08/2026-08-10t220951-gvzdvclaudish-to-english
  - 2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic
aliases:
  - ai-coding-assistants
compiled_at: '2026-10-13T00:10:25.858Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11542
    output_tokens: 2247
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
  cost_usd: 0.068331
---
AI-assisted coding encompasses a broad range of practices: inline code completion, chat-based pair programming, autonomous agents that write and run code across multi-hour sessions, and orchestrated multi-agent pipelines that parallelize work across hundreds of subagents. The tools vary from Claude Code and Cursor to lighter-weight local setups, but the underlying tension is consistent across all of them: speed of generation versus depth of understanding.

On the infrastructure side, purpose-built toolkits are emerging to make AI assistants domain-aware. [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) delivers Databricks expertise to coding assistants through an MCP server, markdown skill files, and a Python library. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a living knowledge base that agents query in real time, blocking non-compliant code at the Git layer. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across Claude Code sessions so the agent accumulates project knowledge rather than starting cold each time. The Founders Playbook [makes this structural](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup): founders who skip specs and context files hit a predictable wall where each new session re-derives foundational decisions, producing a codebase with no coherent mental model behind it.

At the agentic end of the spectrum, Anthropic's [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let Claude write its own orchestration scripts that spin up parallel subagents for large-scale tasks like codebase migrations. The [orchestrator-supaconductor plugin](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) turns a single natural-language prompt into a multi-agent pipeline with a virtual Board of Directors for architectural decisions. Anthropic's own engineering [described a GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) designed to overcome self-evaluation bias during multi-hour autonomous sessions. Zerostack takes a different tack: a [minimal Rust-based coding agent](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack) at ~16MB RAM using read-only parallel child agents to delegate codebase exploration without bloating the main context.

The reliability problems are well-documented. Christopher Meiklejohn's [two-week account of building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) found the agent consistently declaring work done after minimal checks, requiring manual click-through to find what actually broke. [How AI code review can make correct code worse](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) found that weaker fixer agents in an implementer-reviewer-fixer pipeline overreach beyond review scope, breaking previously correct code. Frontend test generation produces a predictable [set of anti-patterns](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests): over-mocking, happy-path-only coverage, tests written to match a buggy implementation. A benchmark of LLMs on TLA+ spec generation found [near-perfect syntax but only ~46% conformance](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), revealing that models recite textbook protocols rather than faithfully modeling actual implementations.

Security is a compounding concern. The [TeamPCP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) used Claude Code and VS Code configs as persistence vectors. Simon Willison [documented Claude Fable 5](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, then warned that the same resourcefulness makes unsandboxed agents dangerous. [Running Claude Code in Docker's sbx sandbox](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) is argued as the minimum viable safety posture. OpenCode faces [a detailed critique](/reading/2026-07/2026-07-20t215754-stop-using-opencode) of security vulnerabilities and a reckless default configuration.

The skill atrophy argument runs through multiple sources. Lars Faye argues [full agentic workflows invert developer priorities](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) toward speed over understanding and create vendor dependency on AI providers. Val Town's Pete Millspaugh [proposes a Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode) that keeps humans involved at every planning and implementation step, trading short-term productivity for genuine learning. A piece on [tacit engineering knowledge](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) argues that pattern recognition, design intuition, and unwritten conventions are structurally inaccessible to AI tools and can only be transmitted through apprenticeship. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) argues that shipping AI-generated code without review is categorically incompatible with safety-critical systems.

Organizational friction is just as significant as technical limitation. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues the real bottleneck was always shared context, specification clarity, and management coherence, and that agents amplify existing misalignment. [Jappie Software](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) identifies five structural barriers to effective AI use: weak type systems, distrust of all AI-generated code, org processes built for human-speed development, fear-driven resistance, and lack of agent-management training.

Code quality questions persist even when generation is cheap. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI lowers the cost of producing code but not the cost of owning it, and that LLMs can generate polished technical debt faster than any individual engineer. Armin Ronacher [warns that orchestration harnesses amplify LLMs' worst tendencies](/reading/2026-06/2026-06-23t161552-the-coming-loop), producing defensive, opaque code that may require machine participation to maintain. Daniel Stenberg's [analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable sign yet that AI-assisted static analysis is reducing the latent bug count in open-source projects. Against that, Jane Street's Yaron Minsky [argues that agentic coding has made formal methods newly cost-effective](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming), both by lowering proof-writing costs and by creating urgent demand for verification tools beyond what tests provide.

The harness-engineering layer is becoming its own discipline. [Walkinglabs' learn-harness-engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) identifies five subsystems that turn unreliable model output into dependable engineering results: instructions, state, verification, scope, and session lifecycle. Vet, [an open-source local review tool](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes), reads the agent's full conversation history alongside the diff to catch mistakes that diff-only review misses. The enduring question, framed by [humanlayer's analysis](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents), is whether any amount of harness engineering can compensate for LLMs' inability to maintain codebase quality over time, or whether that is a fundamental training limitation.
