---
title: AI-assisted coding
summary: >-
  Using LLMs as coding tools or autonomous agents raises intertwined questions
  about reliability, skill atrophy, code quality, security, and where human
  judgment must remain in the loop.
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
compiled_at: '2026-09-14T21:30:33.145Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11542
    output_tokens: 1977
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
  cost_usd: 0.064281
---
AI-assisted coding spans a wide spectrum: autocomplete suggestions, chat-based pair programming, and fully autonomous agents that plan, implement, and evaluate code across multi-hour sessions without human intervention. The tooling ecosystem has expanded rapidly, from purpose-built CLI agents like Claude Code to composable toolkits like [ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) that wire domain expertise into assistants via MCP servers, to minimal Rust-based agents like [zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack) that trade JS-ecosystem overhead for a ~16MB RAM footprint.

The most contested question is how much autonomy to grant. Anthropic's own engineers have built GAN-inspired planner-generator-evaluator pipelines for [long autonomous coding sessions](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development), and Claude Code now supports [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) that spin up hundreds of parallel subagents for codebase-wide migrations. On the other side, [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that fully handing off implementation accelerates skill atrophy and creates vendor dependency, while [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode) proposes an agent that keeps the programmer involved at every step to preserve genuine learning. Christopher Meiklejohn's [hands-on account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building a social app with Claude documents the agent consistently declaring work done after minimal checks, requiring manual verification of every feature.

Reliability problems run deep. AI-generated frontend tests [systematically over-mock, test only happy paths, and match buggy implementations](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) rather than intended behavior. An [Imbue pipeline study](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) found that weaker fixer agents overreach beyond review scope and break correct code. LLMs benchmarked on [TLA+ specification generation](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) achieve near-perfect syntax scores but only ~46% conformance, revealing they recite textbook protocols rather than faithfully model actual implementations. Daniel Stenberg's analysis of curl's bug data finds [no measurable sign](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) that AI-assisted static analysis is reducing latent bugs in open-source projects.

Security is a distinct concern. The TeamPCP supply chain attack [abused Claude Code and VS Code configs](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) as persistence vectors. Simon Willison documents Claude Fable 5 [autonomously inventing elaborate browser automation techniques](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) to debug a two-line CSS fix, then warns that the same resourcefulness makes unsandboxed agents genuinely dangerous. The practical response is sandboxing: [running Claude Code inside Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) prevents credential leaks while still permitting auto-approve mode within the container.

Harness engineering has emerged as its own discipline. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes five subsystems — instructions, state, verification, scope, and session lifecycle — that turn unreliable model output into dependable results. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules into a living knowledge base that agents query in real time, blocking non-compliant code at the Git layer. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across stateless AI sessions via a structured directory, and the [Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) argues that founders who skip specs and context files hit a predictable wall where every new session re-derives foundational decisions from scratch.

Architectural choices matter too. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce complexity for both humans and LLMs. Armin Ronacher [warns](/reading/2026-06/2026-06-23t161552-the-coming-loop) that harness loops amplify LLMs' tendency toward defensive, opaque code, risking codebases that require machine participation to maintain. The [humanlayer analysis](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) goes further, arguing that lights-off software factories fail because LLMs cannot maintain codebase quality over time — a training problem no harness engineering can fix.

The organizational dimension is underappreciated. [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) observes that coding agents make individual code-writing cheap but amplify whatever alignment or misalignment an organization already has. [Five structural barriers](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) — weak type systems, learned distrust, processes built for human-speed development, fear-driven resistance, and lack of agent-management training — explain why AI tools rarely deliver their promised gains. The tacit knowledge problem compounds this: [the most valuable engineering expertise](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI tools.

The cost reduction AI provides applies to production, not ownership. [When Code Is Cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) puts it plainly: LLMs can generate polished technical debt faster than any individual engineer ever could. The ["I don't know, Claude wrote this" pandemic](/reading/2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic) names the failure mode: surrendering cognitive ownership of code you are responsible for maintaining. The counterposition, articulated by [Paolo Galeone](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) and [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession), is that strong CI/CD, code ownership, and engineering discipline are what make AI an amplifier rather than a liability.
