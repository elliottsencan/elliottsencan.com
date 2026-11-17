---
title: AI-assisted coding
summary: >-
  Using LLMs as coding tools, from inline autocomplete to fully agentic
  workflows, raises interconnected questions about reliability, skill
  preservation, security, code ownership, and what human oversight must look
  like as agent autonomy increases.
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
compiled_at: '2026-11-17T01:36:44.994Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11542
    output_tokens: 2021
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
  cost_usd: 0.064941
---
AI-assisted coding spans a wide range from autocomplete and inline suggestions to multi-hour autonomous agents that plan, implement, and evaluate entire features without human intervention. The tooling has matured quickly: Anthropic's Claude Code now supports dynamic workflows that spawn hundreds of parallel subagents for codebase-wide migrations and security audits [Introducing Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code), while third-party orchestration layers like the orchestrator-supaconductor plugin route a single natural-language command through planning, parallel execution, and a virtual Board of Directors for high-stakes decisions [Ibrahim-3d/orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor). Purpose-built toolkits like Databricks' ai-dev-kit expose domain expertise to these assistants via MCP servers and markdown skill files [databricks-solutions/ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit), and lightweight agents like zerostack aim to deliver the same capability at dramatically lower memory cost — roughly 16MB versus 300MB for JS-based alternatives [gi-dellav/zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack).

The reliability picture is more mixed. Anthropic's own engineering describes a GAN-inspired planner/generator/evaluator architecture to overcome self-evaluation bias during long autonomous sessions [Harness Design for Long-Running Application Development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development), and the walkinglabs learn-harness-engineering course frames reliable agent output as an engineering problem requiring five distinct harness subsystems: instructions, state, verification, scope, and session lifecycle [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering). Yet in practice, agents still declare work done after minimal checks — Christopher Meiklejohn spent two weeks building a social app with Claude and found himself manually clicking through every feature to catch what actually broke, despite 52 guardrails [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). The Imbue team found that running an AI implementer-reviewer-fixer pipeline caused weaker agents to overreach beyond review scope and break working code [How AI Code Review Can Make Correct Code Worse](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse). Armin Ronacher warns that outer harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop).

Security is a concrete concern, not a theoretical one. The TeamPCP supply chain attack poisoned SAP-related npm packages and used Claude Code and VS Code configs as persistence vectors [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). Simon Willison documented Claude Fable 5 autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, then noted how the same resourcefulness makes unsandboxed agents genuinely dangerous [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Running agents inside Docker sandboxes is one practical response [If You're Running Claude Code, PLEASE Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box), while tools like Vet read an agent's conversation history alongside the diff to catch mistakes standard review misses [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes).

Several authors challenge the framing that more automation is straightforwardly better. Lars Faye argues that full agentic workflows cause skill atrophy, invert developer priorities toward speed over understanding, and create vendor dependency [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Val Town's Pete Millspaugh proposes a "Slow Mode" agent that keeps the human involved at every step, trading short-term throughput for genuine learning and long-term code ownership [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode). The "I don't know, Claude wrote this" pattern — shipping code you don't understand — is framed as surrendering cognitive ownership, not a productivity win [The "I don't know, Claude wrote this" pandemic](/reading/2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic). And tacit engineering knowledge — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI tools and can only be transmitted through apprenticeship [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you).

Code quality is another fault line. AI lowers the cost of producing code but not the cost of owning it; LLMs can generate polished, well-formatted technical debt faster than any individual engineer [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). AI-generated frontend tests exhibit specific failure modes — over-mocking, only testing happy paths, writing tests that match buggy implementations rather than intended behavior [Code Smells when you get AI to write your Frontend Tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). The Founders Playbook notes that AI removes natural development bottlenecks but that "agentic technical debt" compounds without persistent context files and architectural constraints [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup). The bottleneck, as one essay argues, was never the code itself — it was organizational alignment, specification clarity, and shared context, and agents amplify whatever coherence or incoherence already exists [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code).

Structural barriers also limit how much of this tooling developers actually use effectively: weak type systems, organizational processes built for human-speed development, and a lack of agent-management training all prevent AI coding tools from delivering promised productivity gains [Why Most Developers Can't Use AI Effectively](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively). Despite Daniel Stenberg's finding that curl's data shows no measurable reduction in latent bugs from AI-assisted static analysis [Approaching zero bugs?](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs), Jane Street's Yaron Minsky argues that agentic coding has made formal verification newly cost-effective by lowering the cost of writing proofs while simultaneously creating urgent demand for tools that go beyond what tests alone can provide [Formal Methods and the Future of Programming](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming).
