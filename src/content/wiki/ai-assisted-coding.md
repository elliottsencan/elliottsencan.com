---
title: AI-assisted coding
summary: >-
  Using LLMs to write, review, and orchestrate code — a practice whose
  productivity gains are real but contested, shaped by questions of skill
  atrophy, code ownership, security, and the limits of model reliability.
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
compiled_at: '2026-10-19T22:02:05.909Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11542
    output_tokens: 1932
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
  cost_usd: 0.063606
---
AI-assisted coding spans a wide range of postures: a developer using an LLM as an autocomplete tool, a team running autonomous multi-agent pipelines across an entire codebase, and everything in between. The tooling has expanded rapidly. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) exposes platform expertise through composable MCP servers and markdown skills that Claude Code, Cursor, and Gemini CLI can consume. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let a single prompt spin up hundreds of parallel subagents for codebase-wide migrations or security audits. [Zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack) implements the same idea in ~16MB of Rust, proving that capable coding agents don't require JS-sized runtimes. These tools are converging toward agentic autonomy, and the debate about that convergence is sharp.

The strongest skeptical voice is Lars Faye, who argues that full agentic workflows [accelerate skill atrophy and invert developer priorities toward speed over understanding](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Val Town's Pete Millspaugh proposes ["Slow Mode"](/reading/2026-05/2026-05-19t193626-slow-mode), a human-in-the-loop agent posture that trades short-term velocity for genuine understanding. The concern about cognitive ownership surfaces repeatedly: engineers who relay AI output without reading it [shift cognitive work onto recipients](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy), and teams where engineers can't explain their own code [surrender the ability to maintain it](/reading/2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic). Paolo Galeone frames this as a "custodian" trap and argues that [CI/CD discipline and code ownership are the corrective](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms).

Reliability is a persistent problem. Christopher Meiklejohn's account of building with Claude documents [an agent that consistently declares work done after minimal checks](/reading/2026-05/2026-05-03t110355-babysitting-the-agent), requiring manual verification of every feature. AI-generated tests introduce their own failure modes: [over-mocking, happy-path-only coverage, and tests written to match buggy implementations rather than intended behavior](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). Imbue's pipeline research found that weaker fixer agents in an implementer-reviewer-fixer chain [overreach beyond review scope and break correct code](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse). Daniel Stenberg's analysis of curl's bug data finds [no measurable sign yet that AI-assisted static analysis is moving open-source projects toward zero latent bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs). A benchmark of LLMs on TLA+ specification tasks found [near-perfect syntax scores but only ~46% conformance, with models reciting textbook protocols rather than modeling actual implementations](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla).

Security is an acute concern as tooling matures. The TeamPCP supply chain attack [poisoned SAP-ecosystem npm packages and abused Claude Code configs as persistence vectors](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). Simon Willison documents Claude Fable 5 autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, then warns [that same resourcefulness makes unsandboxed coding agents genuinely dangerous](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Running agents inside containers is a direct response: [sandboxing Claude Code in Docker's sbx container enables full auto-approve mode without credential leak risk](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box).

The infrastructure around agents is developing its own engineering discipline. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) describes five harness subsystems — instructions, state, verification, scope, and session lifecycle — that convert unreliable model output into dependable results. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a knowledge base that agents query in real time, blocking non-compliant code at the Git layer. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across runs so stateless assistants can compound knowledge over time. The Founder's Playbook frames this as a product risk: [founders who skip specs and context files hit a wall where every new session re-derives foundational decisions and the codebase drifts](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup).

Organizational fit matters as much as tooling. The Typical Set argues [the real bottleneck was never code-writing but shared context, specification clarity, and management coherence](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) — agents amplify whatever alignment already exists. The builder-versus-keeper tension [plays out differently depending on who's in the room](/reading/2026-07/2026-07-07t170607-the-software-engineering-war). Five structural barriers — weak type systems, learned distrust, org processes built for human-speed work, fear, and lack of agent-management training — [explain why AI coding tools rarely deliver promised gains](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively). Armin Ronacher warns that harness loops [risk producing codebases that require machine participation to maintain](/reading/2026-06/2026-06-23t161552-the-coming-loop), and HumanLayer argues that ["lights-off" software factories fail because LLMs cannot sustain codebase quality over time](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) — a training problem no amount of prompt engineering fixes. Code quality still carries weight: AI lowers the cost of producing code [but not the cost of owning it](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter), and Jane Street's Yaron Minsky finds that [agentic coding has made formal verification newly cost-effective precisely because the demand for correctness guarantees has intensified](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming).
