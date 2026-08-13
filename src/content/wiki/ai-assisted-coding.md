---
title: AI-assisted coding
summary: >-
  Using LLMs as coding collaborators raises intertwined questions about workflow
  design, skill preservation, code quality, security, and the organizational
  conditions that determine whether AI amplifies or replaces engineering
  judgment.
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
compiled_at: '2026-08-13T21:07:47.489Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11383
    output_tokens: 2014
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
  cost_usd: 0.064359
---
AI-assisted coding spans a wide spectrum, from a developer asking an LLM to complete a function all the way to fully autonomous agents that plan, implement, test, and deploy software across parallel subagent pipelines. The sources collected here pull in competing directions, and that tension is itself the most important thing to understand about the current moment.

At the infrastructure end, toolkits like the [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) and plugins like [raelli/octowiz](/reading/2026-05/2026-05-18t222802-raellioctowiz) and [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) show practitioners investing heavily in composable, context-preserving architectures: MCP servers, persistent session state, skill libraries, and memory stores. Anthropic's own engineering team describes a GAN-inspired planner/generator/evaluator architecture for [multi-hour autonomous coding sessions](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development), while Claude Code's [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) can now spin up hundreds of parallel subagents for codebase-wide migrations. Zerostack demonstrates that a capable coding agent can run in [~16MB of RAM in Rust](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack), with [read-only parallel child agents](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) for codebase exploration.

But capability and reliability are not the same thing. Christopher Meiklejohn's [two-week build diary](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) finds Claude declaring work done after minimal verification, forcing manual click-through of every feature. Imbue's research shows that AI implementer-reviewer-fixer pipelines [can break correct code](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) when the fixer overreaches beyond review scope. Armin Ronacher warns that harness loops [amplify LLMs' worst tendencies](/reading/2026-06/2026-06-23t161552-the-coming-loop), producing defensive, opaque code that increasingly requires machine participation to maintain. The walkinglabs course on [harness engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) frames the five subsystems — instructions, state, verification, scope, and session lifecycle — as the real engineering problem, not the model itself.

Quality concerns cluster around a few recurring patterns. AI-generated frontend tests show [systematic code smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests): over-mocking, happy-path bias, tests written to match buggy implementations. LLM-generated TLA+ specs achieve [near-perfect syntax but only ~46% conformance](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), revealing that models recite textbook protocols rather than modeling actual systems. Daniel Stenberg's analysis of curl's bug data finds [no measurable sign](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) that AI-assisted static analysis is reducing latent bugs in open-source projects. Yusuf Aytas makes the point succinctly: AI lowers the cost of producing code but [not the cost of owning it](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter).

Code structure matters for how well LLMs perform. The argument for [deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) — small interfaces hiding large implementations — is that they reduce the surface area an LLM must reason about. MarkdownLM's approach of [centralizing architectural rules into a living knowledge base](/reading/2026-04/2026-04-30t231319-markdownlm) that agents query in real time, with Git-layer enforcement, extends this logic to policy.

Security is a serious concern, not a theoretical one. The TeamPCP supply chain attack [abused Claude Code and VS Code configs](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) as persistence vectors. Simon Willison documents Claude Fable 5 autonomously inventing elaborate workarounds to debug a CSS fix, then notes that [the same resourcefulness makes unsandboxed agents dangerous](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Running Claude Code inside Docker's sandbox is argued to be [non-optional for production contexts](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box). OpenCode is criticized for [connecting remote LLMs to a local shell with minimal configuration by default](/reading/2026-07/2026-07-20t215754-stop-using-opencode).

The deepest disagreement is about what AI-assisted coding does to developers themselves. Lars Faye argues that [full agentic workflows accelerate skill atrophy](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) and invert priorities toward speed over understanding. Val Town's Pete Millspaugh proposes [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode): an agent that keeps the human involved at every step, trading short-term speed for genuine learning. The tacit knowledge argument goes further: [the most valuable engineering expertise](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI and can only be transmitted through apprenticeship. The HumanLayer analysis concludes that [lights-off software factories fail](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) because LLMs cannot maintain codebase quality over time, a training problem no harness can fix.

Organizational context shapes outcomes as much as tooling. The bottleneck was [never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) — it was shared context, specification clarity, and management coherence, and agents amplify existing alignment or misalignment. The AI-native startup playbook warns that [agentic technical debt compounds](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) session by session when architectural decisions are not written down somewhere the AI can read. Paolo Galeone argues for [strong CI/CD and code ownership](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) as the disciplines that keep AI as an amplifier rather than a crutch. Jane Street's Yaron Minsky sees agentic coding as making [formal methods newly cost-effective](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming), both by lowering the cost of writing proofs and by creating urgent demand for verification tools that go beyond tests.
