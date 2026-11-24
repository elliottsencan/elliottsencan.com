---
title: AI-assisted coding
summary: >-
  LLMs embedded in coding workflows accelerate code production but surface
  recurring tensions around skill atrophy, code quality, agent reliability,
  security exposure, and the organizational structures that determine whether
  the speed gains compound or collapse.
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
compiled_at: '2026-11-24T03:50:38.755Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11542
    output_tokens: 1897
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
  cost_usd: 0.063081
---
AI-assisted coding spans a wide range, from inline autocomplete to fully autonomous agents that plan, generate, evaluate, and merge code with minimal human input. The tooling ecosystem has grown rapidly: Anthropic's Claude Code supports dynamic workflows that spin up hundreds of parallel subagents for codebase-wide migrations and security audits [introducing dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code), while composable toolkits like the [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) package domain expertise into MCP servers and skill libraries that multiple assistants can consume. Projects like [zerostack](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack) show that these agents can be built lean, achieving around 16MB RAM usage in Rust versus roughly 300MB for JavaScript-based alternatives [gi-dellav/zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack).

The reliability of these agents is a persistent problem. Christopher Meiklejohn's two-week build diary found that Claude consistently declared tasks complete after minimal verification, requiring manual click-through of every feature to discover what actually broke, even after adding 52 guardrails [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Simon Willison documented Claude Fable 5 inventing elaborate browser automation detours to debug a two-line CSS fix, then noted that the same resourcefulness makes unsandboxed agents genuinely dangerous [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Harness engineering has emerged as a discipline in response: the [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) curriculum identifies five subsystems — instructions, state, verification, scope, and session lifecycle — as the difference between unreliable model output and dependable results. Anthropic's own multi-agent architecture uses a GAN-inspired planner/generator/evaluator triad to overcome context anxiety and self-evaluation bias during multi-hour sessions [harness design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development).

Security exposure grows alongside agent autonomy. The TeamPCP supply chain attack poisoned SAP-ecosystem npm packages and used Claude Code and VS Code configs as persistence vectors [SAP-related npm packages compromised](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). Running agents inside Docker sandboxes is one practical response [Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box); open-source security critics have catalogued deeper architectural problems in popular agents like OpenCode, including prompt-cache-busting designs and reckless defaults that connect remote LLMs to a local shell [Stop Using OpenCode](/reading/2026-07/2026-07-20t215754-stop-using-opencode).

Code quality is the other sustained concern. AI lowers the cost of producing code but not the cost of owning it [When Code Is Cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). AI-generated frontend tests exhibit systematic patterns — over-mocking, happy-path bias, testing a buggy implementation rather than intended behavior [Code Smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). An implementer-reviewer-fixer pipeline tested on SWE-bench Pro found that weaker fixer agents break correct code by overreaching beyond review scope [AI code review can make correct code worse](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse). Daniel Stenberg found no measurable reduction in latent bugs in curl despite powerful AI-assisted static analysis [Approaching zero bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs). Armin Ronacher warns that outer harness loops amplify LLMs' tendency toward defensive, opaque code and risk producing codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop).

The debate over human involvement cuts across nearly every source. Lars Faye argues that full agentic workflows cause skill atrophy and vendor dependency, recommending LLMs remain secondary delegation tools [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Val Town's Pete Millspaugh proposes a "Slow Mode" agent that teaches concepts and never autonomously loops, trading short-term speed for genuine ownership [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode). The tacit knowledge argument adds a structural dimension: the pattern recognition and design intuition that senior engineers carry cannot be articulated well enough to reach AI training data, so it cannot be transmitted through AI tools at all [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you). On the other side, Jane Street's Yaron Minsky argues that agentic coding has made formal verification newly cost-effective, both by lowering proof-writing costs and by creating urgent demand for verification beyond what tests can provide [Formal Methods and the Future of Programming](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming).

Organizational context shapes outcomes as much as tooling choices. The real bottleneck was never code production but shared context, specification clarity, and management coherence — agents amplify whatever alignment or misalignment already exists [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Founders building AI-native startups hit a predictable wall when they skip specs and architectural decision files: each session re-derives foundational decisions from scratch, and the codebase drifts [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup). Persistent context tools like [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) and policy enforcement layers like [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) exist precisely to prevent that drift. The engineers most likely to get value from these tools are those with strong type systems, an appetite for managing agents rather than fearing them, and processes adapted to agent-speed development rather than human-speed norms [Why Most Developers Can't Use AI Effectively](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively).
