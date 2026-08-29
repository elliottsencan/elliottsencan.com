---
title: AI-assisted coding
summary: >-
  Using LLMs and agentic tools to write, review, and transform code — a practice
  that accelerates output but introduces contested tradeoffs around skill
  retention, code quality, security, and the limits of machine judgment.
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
aliases:
  - ai-coding-assistants
compiled_at: '2026-08-29T20:10:00.005Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11383
    output_tokens: 1796
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
  cost_usd: 0.061089
---
AI-assisted coding spans a wide spectrum, from autocomplete suggestions inside an editor to fully autonomous agents that plan, execute, and verify changes across an entire codebase. The tooling has matured rapidly: [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) packages domain expertise into a composable MCP server and skill library usable across Claude Code, Cursor, and Gemini CLI, while [zerostack](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack) demonstrates that a capable coding agent can be built in Rust with a 16-20MB memory footprint versus \~300MB for JS-based alternatives. Anthropic's own [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) now let Claude write orchestration scripts that spin up hundreds of parallel subagents for codebase-wide migrations and security audits in a single command.

The ergonomics of that power are still being worked out. A [multi-agent harness architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) from Anthropic's engineering team separates planning, generation, and evaluation into distinct roles to overcome context anxiety and self-evaluation bias during multi-hour autonomous sessions. [Zerostack's subagent design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) takes a narrower approach: read-only child agents handle multi-file exploration without bloating the main agent's context, yielding a 25% improvement in code exploration time. Persistent context is its own problem; [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses stateless session resets by persisting session state in a `.story/` directory, and the [AI-native startup playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) argues that skipping specs and context files like CLAUDE.md causes architectural drift that compounds with every new session.

Code quality and correctness remain active problems. [Frontend test generation](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) by AI tools produces recognizable smells: over-mocking, happy-path-only coverage, and tests written to match a buggy implementation rather than intended behavior. An [implement-review-fix pipeline study](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) found that weaker fixer agents overreach beyond review scope and break correct code; softer fixer instructions eliminated catastrophic regressions. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) addresses this by reading agent conversation history alongside the diff to catch errors standard review misses, like silently skipped tests. On formal correctness, an LLM benchmark against TLA+ found [near-perfect syntax scores but only \~46% conformance](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), revealing that models recite textbook protocols rather than faithfully modeling actual implementations. Daniel Stenberg's analysis of curl's vulnerability data [finds no measurable sign yet](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) that AI-assisted static analysis is driving open-source projects toward zero latent bugs.

Security risks are concrete. A [compromised SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) used Claude Code configuration files as a persistence vector. [Claude Fable's autonomous resourcefulness](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) — inventing elaborate browser automation to debug a two-line CSS fix — illustrates why [running coding agents inside Docker sandboxes](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) is recommended practice rather than optional hygiene.

The sharpest debate is over autonomy and skill. [Lars Faye argues](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that full agentic workflows accelerate skill atrophy, invert developer priorities toward speed, and create vendor dependency. [Christopher Meiklejohn's two-week account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building with Claude finds the agent consistently declaring work done after minimal verification, forcing manual click-through of every feature. Val Town's [Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) suggests agents that keep humans involved at every step to trade short-term throughput for genuine understanding. Meanwhile, [tacit knowledge arguments](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) hold that the most valuable engineering expertise — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI tools regardless of how good the harness is, a view that [humanlayer's "lights-off factory" critique](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) extends: LLMs cannot maintain codebase quality over time, and no amount of loop-prompting fixes that.

Practical countermeasures are accumulating: MarkdownLM centralizes architectural rules the AI queries in real time, blocking non-compliant code at the Git layer. [Paolo Galeone](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) calls for strong CI/CD and code ownership to keep AI as an amplifier. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain. The organizational dimension is just as pressing: [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that the real bottleneck was never code-writing speed but shared context, specification clarity, and management coherence — and coding agents amplify whatever alignment or misalignment an organization already has.
