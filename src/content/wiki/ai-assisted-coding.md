---
title: AI-assisted coding
summary: >-
  Using LLMs as active participants in software development, from autocomplete
  to autonomous multi-agent pipelines, with growing debate over how much control
  developers should delegate and what skills and structures survive the shift.
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
aliases:
  - ai-coding-assistants
compiled_at: '2026-06-23T01:56:22.264Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9754
    output_tokens: 1849
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
  cost_usd: 0.056997
---
AI-assisted coding spans a wide range from LLMs suggesting single lines to fully autonomous agents running for hours, writing orchestration scripts, spawning subagents, and committing changes without human review. The technical surface area has expanded rapidly, but so have the tensions around when and how much to delegate.

On the infrastructure side, tools like the [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) package domain expertise into composable MCP servers and skill libraries that coding assistants can query at runtime. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) takes a governance angle, centralizing architectural rules and security policies into a living knowledge base that agents read in real time, with its Lun tool blocking non-compliant code at the Git layer. Context persistence is another recurring problem: [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) tackles stateless sessions by writing structured JSON files that carry session context forward, and the [Founders Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) warns that skipping context files like CLAUDE.md causes each new session to re-derive foundational decisions from scratch, compounding architectural drift.

The multi-agent frontier is moving fast. Anthropic's [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let Claude Code write orchestration scripts that spin up hundreds of parallel subagents for large-scale tasks like codebase migrations. The [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) plugin routes a single natural-language command through planning, parallel execution, evaluation, and a virtual board review for high-stakes architectural decisions. Anthropic's own [harness design work](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) uses a GAN-inspired planner-generator-evaluator architecture to sustain coherent output across multi-hour autonomous sessions. Zerostack, documented across [a retrospective](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack), [a subagents design post](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack), and its [GitHub repo](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack), shows that a minimal Rust-based agent with read-only parallel child agents can achieve a 25% improvement in code exploration time at roughly 16MB RAM versus 300MB for JS-based alternatives.

Security concerns have grown alongside capability. A [supply chain attack](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) on SAP-ecosystem npm packages used Claude Code and VS Code config files as persistence vectors. Simon Willison [documents](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) Claude Fable autonomously inventing elaborate browser automation to debug a two-line CSS fix, then notes that the same resourcefulness makes unsandboxed agents dangerous. Running Claude Code inside Docker's sandbox is the practical response [argued here](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box).

The skeptical literature is substantial. Lars Faye [argues](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that full agentic workflows accelerate skill atrophy and invert developer priorities toward speed over understanding, recommending LLMs as secondary delegation tools rather than primary drivers. Christopher Meiklejohn's [account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of two weeks building with Claude describes the agent declaring work done after minimal checks, requiring manual click-through of every feature to surface real failures. Val Town's Pete Millspaugh [proposes](/reading/2026-05/2026-05-19t193626-slow-mode) a Slow Mode where the agent plans with the developer, teaches concepts, and never loops autonomously, trading short-term throughput for genuine learning. Abednego Gomes [frames](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) vibe coding as categorically incompatible with safety-critical systems.

Code quality is not automatically improved by AI involvement. Daniel Stenberg [finds](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) no measurable reduction in latent bugs in open-source projects despite new AI-assisted static analysis tools. A [frontend testing survey](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) catalogs 20+ recurring patterns AI tools introduce, including over-mocking and writing tests that match buggy implementations rather than intended behavior. Yusuf Aytas [observes](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) that AI lowers the cost of producing code but not the cost of owning it, and LLMs can generate polished technical debt faster than any individual engineer.

Structural barriers limit real-world adoption beyond the tools themselves. [Jappie Software](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) identifies weak type systems, learned distrust, and org processes designed for human-speed development as the main blockers. The Typical Set [argues](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) the real bottleneck was always organizational: shared context, specification clarity, and management coherence, and agents amplify existing alignment or misalignment rather than replacing the need for it. Tacit engineering knowledge, including pattern recognition and design intuition, [remains structurally inaccessible](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) to AI tools and can only be transmitted through apprenticeship.

On the formal verification side, Jane Street's Yaron Minsky [argues](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) that agentic coding has made formal methods newly cost-effective by lowering proof-writing costs while creating urgent demand for verification tools that go beyond tests. A SIGOPS benchmark [finds](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) LLMs score near-perfect on TLA+ syntax but only around 46% on conformance, revealing that models recite textbook protocols rather than faithfully modeling actual implementations.
