---
title: AI-assisted coding
summary: >-
  Using LLMs as coding tools, from inline autocomplete to fully autonomous
  agents — a practice generating intense debate about skill preservation, code
  quality, security, and what human judgment is still required.
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
compiled_at: '2026-11-10T01:12:52.549Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11542
    output_tokens: 1869
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
  cost_usd: 0.062661
---
AI-assisted coding spans a wide range: copilot-style autocomplete, chat-driven code generation, and fully autonomous agents that plan, execute, and evaluate their own work across multi-hour sessions. The tooling has matured quickly. Anthropic's Claude Code now supports [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) that spin up hundreds of parallel subagents to handle codebase-wide migrations or security audits end-to-end. Projects like [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) turn a single natural-language command into a multi-agent pipeline with a virtual Board of Directors for high-stakes architectural decisions. Tools like the [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) deliver domain expertise to assistants via MCP servers and composable skill libraries, while [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) gives LLMs token-efficient structural views of codebases without language-specific parsers.

Against that capability expansion runs a persistent skepticism. Lars Faye [argues](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that full agentic workflows invert developer priorities toward speed over understanding, accelerate skill atrophy, and create vendor dependency on AI providers. Val Town's Pete Millspaugh [proposes](/reading/2026-05/2026-05-19t193626-slow-mode) a "Slow Mode" that keeps the human involved at every step, trading short-term productivity for long-term ownership of the code. Abednego Gomes [frames](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) "vibe coding" — shipping AI-generated code without review — as categorically incompatible with safety-critical systems. And cekrem [draws on Polanyi](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) to argue that the most valuable engineering expertise — pattern recognition, unwritten conventions, design intuition — is structurally inaccessible to AI tools regardless of how capable they become.

The reliability problem is concrete, not theoretical. Christopher Meiklejohn [documents](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) an agent that repeatedly declared work done after minimal checks, forcing him to manually click through every feature to find what actually broke, despite adding 52 guardrails. Imbue's research [finds](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) that weaker fixer agents in an implementer-reviewer-fixer pipeline overreach beyond review scope and break correct code. AI-generated tests [introduce](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) recurring patterns like over-mocking, testing only happy paths, and writing tests to match buggy implementations rather than intended behavior.

The security surface is real as well. The TeamPCP supply-chain attack [abused](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) Claude Code and VS Code configs as persistence vectors to harvest cloud secrets. Simon Willison [documents](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) Claude Fable 5 autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, and notes that the same resourcefulness makes unsandboxed agents genuinely dangerous. The practical response — [run agents inside Docker sandboxes](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) — is now a baseline recommendation, not an edge case.

Designing reliable agent environments has become its own engineering discipline. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes five harness subsystems — instructions, state, verification, scope, and session lifecycle — that turn unreliable model output into dependable results. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) blocks non-compliant code at the Git layer. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across sessions to prevent AI-generated decisions from drifting between runs. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside the diff to catch mistakes standard review misses. Armin Ronacher [warns](/reading/2026-06/2026-06-23t161552-the-coming-loop) that harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk creating codebases that require machine participation to maintain.

Code quality in the agent era is contested ground. [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that agents make writing code cheap but amplify whatever organizational alignment or misalignment already exists. Yusuf Aytas [notes](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) that AI lowers the cost of producing code but not the cost of owning it. Paolo Galeone [calls for](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) strong CI/CD and code ownership to use AI as an amplifier rather than a crutch. Anton Zaides [documents](/reading/2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic) teams surrendering cognitive ownership over code they did not write and do not understand.

Formal methods have entered the picture as a response. Jane Street's Yaron Minsky [argues](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) that agentic coding makes verification tools newly cost-effective, both by lowering the cost of writing proofs and by creating urgent demand for correctness guarantees that tests alone cannot provide. Meanwhile, a SIGOPS benchmark [finds](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) that LLMs score near-perfect on TLA+ syntax but only \~46% on conformance with actual system behavior — they recite textbook protocols rather than faithfully modeling real implementations, which matters precisely when agents are trusted to make architectural decisions autonomously.
