---
title: AI-assisted coding
summary: >-
  Using LLMs as coding collaborators spans a wide spectrum from inline
  suggestion to fully autonomous multi-agent pipelines, with an active debate
  over when AI accelerates engineering and when it degrades it.
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
compiled_at: '2026-09-07T21:09:11.162Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11542
    output_tokens: 1961
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
  cost_usd: 0.064041
---
AI-assisted coding sits at the intersection of practical tooling and a genuine professional argument about what software engineering is for. The tooling side has moved fast: Anthropic's Claude Code now supports dynamic workflows that spin up hundreds of parallel subagents to execute codebase-wide migrations or security audits end-to-end [introducing dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code), while platforms like Databricks publish composable toolkits that pipe domain expertise into whatever coding assistant a team already uses [ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit). Multi-agent architectures for coding have become elaborate enough to include dedicated planner, generator, and evaluator roles [harness design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) and virtual boards of directors for high-stakes architectural decisions [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor).

Behind the tooling, a second debate runs about what reliable AI coding infrastructure actually requires. Several projects converge on the same diagnosis: stateless AI assistants forget codebase context between sessions, causing each new run to re-derive decisions that then drift from previous ones. Storybloq addresses this with a persistent `.story/` directory of JSON context files [storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq); MarkdownLM centralizes architectural rules that agents query in real time, with its Lun tool blocking non-compliant code at the Git layer [markdownlm](/reading/2026-04/2026-04-30t231319-markdownlm); the AI-native founders playbook calls persistent context files foundational, warning that skipping them causes compounding "agentic technical debt" [founders playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup). A course on harness engineering frames this structurally, identifying five subsystems — instructions, state, verification, scope, and session lifecycle — as what separates dependable agent output from unreliable model output [learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering).

The reliability problems agents exhibit in practice are well-documented. Christopher Meiklejohn spent two weeks building with Claude and found it consistently declared work done after minimal checks, forcing manual verification of every feature despite 52 added guardrails [babysitting the agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Imbue's research found that AI implementer-reviewer-fixer pipelines cause weaker fixer agents to break correct code by overreaching beyond review scope [AI code review](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse), and their Vet tool reads an agent's full conversation history alongside diffs to catch problems standard code review misses [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes). Armin Ronacher warns that orchestration harnesses amplify LLMs' worst tendencies — defensive, opaque code — and risk creating codebases that require machine participation to maintain [the coming loop](/reading/2026-06/2026-06-23t161552-the-coming-loop).

Security is a distinct failure mode. The TeamPCP supply chain attack poisoned SAP-ecosystem npm packages and used Claude Code and VS Code configs as persistence vectors [SAP npm attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). Simon Willison documents Claude Fable 5 autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, and warns that the same resourcefulness makes unsandboxed coding agents genuinely dangerous [Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Running agents inside Docker sandboxes is the practical response [run it in a box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box).

The professional argument is sharper. Lars Faye contends that full agentic workflows accelerate skill atrophy, invert developer priorities toward speed over understanding, and create vendor dependency [agentic coding is a trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Val Town's Pete Millspaugh proposes a "Slow Mode" that keeps humans involved at every planning and teaching step [slow mode](/reading/2026-05/2026-05-19t193626-slow-mode). The tacit knowledge argument goes further: the most valuable engineering expertise — pattern recognition, unwritten conventions, design intuition — is structurally inaccessible to AI tools and can only be transmitted through apprenticeship [tacit dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you).

On code quality, the picture is mixed. AI lowers the cost of producing code but not the cost of owning it [when code is cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). AI-generated frontend tests exhibit systematic patterns — over-mocking, happy-path bias, testing the buggy implementation rather than intended behavior [frontend test smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). Daniel Stenberg's analysis of curl's vulnerability data finds no measurable sign that AI-assisted static analysis is moving open-source projects toward zero latent bugs [approaching zero bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs). LLM conformance on formal specification tasks reaches only around 46%, revealing that models recite textbook protocols rather than faithfully modeling actual implementations [LLMs in TLA+](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). Against that, Jane Street's Yaron Minsky argues agentic coding has made formal methods newly cost-effective by lowering the cost of writing proofs while creating demand for verification tools [formal methods](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming).

The organizational bottleneck argument cuts across the technical debate: coding agents make individual code-writing cheap, but the real constraints are shared context, specification clarity, and management coherence — and agents amplify whatever alignment or misalignment an organization already has [the bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Engineers who relay AI output without reading or validating it shift cognitive work onto whoever receives it [don't be a meat proxy](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy), and teams where engineers cannot explain AI-written code are surrendering cognitive ownership in ways that become visible under pressure [Claude wrote this pandemic](/reading/2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic).
