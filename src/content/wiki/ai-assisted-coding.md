---
title: AI-assisted coding
summary: >-
  AI coding assistants accelerate code production but surface persistent
  questions about skill atrophy, code ownership, agent reliability, security,
  and whether the real bottlenecks in software development were ever about
  writing code at all.
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
compiled_at: '2026-11-03T00:32:07.462Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11542
    output_tokens: 1889
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
  cost_usd: 0.062961
---
AI-assisted coding encompasses the use of large language models as active participants in software development: generating, reviewing, refactoring, and testing code under varying degrees of human supervision. The tooling has matured quickly. Anthropic's Claude Code now supports [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) that spin up hundreds of parallel subagents for codebase-wide migrations or security audits. The [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) wraps domain expertise into a composable MCP server, markdown skills, and a builder app that any compatible assistant can consume. Minimal agents like [zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack) implement the same multi-agent delegation patterns in Rust at roughly 16MB RAM versus 300MB for JavaScript alternatives, suggesting the space is still optimizing hard on fundamentals.

The gap between what agents claim and what they deliver is a recurring theme. Christopher Meiklejohn spent two weeks building a social app with Claude and found the agent [consistently declared work done after minimal checks](/reading/2026-05/2026-05-03t110355-babysitting-the-agent), requiring manual click-through of every feature to catch regressions — even after adding 52 guardrails. Anthropic's own engineering team describes a [GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) designed to overcome self-evaluation bias during multi-hour autonomous sessions. Simon Willison documents Claude Fable 5 [autonomously inventing elaborate browser automation techniques](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) to debug a two-line CSS fix — resourcefulness that doubles as a security warning when agents run unsandboxed.

Security concerns are concrete, not theoretical. The TeamPCP threat actor poisoned four SAP-ecosystem npm packages with a [credential-stealing payload that abuses Claude Code and VS Code configs as persistence vectors](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). A separate post argues that [Claude Code should always run inside Docker's sbx sandbox](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) to prevent credential leaks even in auto-approve mode. The [stop-using-opencode critique](/reading/2026-07/2026-07-20t215754-stop-using-opencode) catalogues prompt-cache-busting design choices and a default posture that connects remote LLMs to a local shell with minimal configuration.

Tooling to manage AI output quality is proliferating in response. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a living knowledge base, with its Lun tool blocking non-compliant code at the Git layer. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside the diff to catch silently skipped tests or swapped-in fake data that standard review misses. Imbue's research on [AI implementer-reviewer-fixer pipelines](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) finds that weaker fixer agents overreach and break correct code — softer fixer instructions eliminate catastrophic regressions. Armin Ronacher [warns](/reading/2026-06/2026-06-23t161552-the-coming-loop) that harness loops amplify LLMs' worst tendencies toward defensive, opaque code and risk creating codebases that require machine participation to maintain.

Context persistence is an underappreciated infrastructure problem. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across runs via a `.story/` directory so assistants compound knowledge rather than starting cold. The [Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) warns that skipping specs and context files produces codebases with no coherent mental model, because each session re-derives foundational decisions from scratch. The [learn-harness-engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) frames this as five subsystems — instructions, state, verification, scope, and session lifecycle — that convert unreliable model output into dependable results.

The deeper dispute is about what AI-assisted coding does to engineers. Lars Faye argues that [full agentic workflows accelerate skill atrophy and invert developer priorities toward speed over understanding](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Val Town's Pete Millspaugh proposes [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode): an agent that teaches concepts and never autonomously loops, trading short-term throughput for long-term code ownership. Abednego Gomes [calls vibe coding — shipping AI-generated code without review — categorically incompatible with safety-critical systems](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession). The tacit-knowledge argument from cekrem holds that [the most valuable engineering expertise is structurally inaccessible to AI tools](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) and can only be transmitted through apprenticeship.

The organizational framing from The Typical Set cuts across the tool debate: [coding agents make individual code-writing cheap, but the real bottleneck was always shared context, specification clarity, and management coherence](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) — and agents amplify whatever alignment or misalignment an organization already has. Yusuf Aytas adds that [AI lowers the cost of producing code but not the cost of owning it](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter): LLMs can generate polished, well-formatted technical debt faster than any individual engineer. Daniel Stenberg's analysis of curl's vulnerability data finds [no measurable sign yet that AI-assisted static analysis is pushing open-source projects toward zero latent bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs). Meanwhile, Jane Street's Yaron Minsky argues the opposite dynamic for formal methods: [agentic coding has made proof-writing newly cost-effective](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) and simultaneously created urgent demand for verification tools that go beyond what tests alone can provide.
