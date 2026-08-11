---
title: Developer tooling
summary: >-
  The tools developers use to write, test, version, secure, and deploy code —
  spanning CLI utilities, AI coding agents, version control systems, testing
  frameworks, and platform infrastructure.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - >-
    2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter
  - >-
    2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with
  - 2026-04/2026-04-30t230919-dmytro-mezhenskyi-udmezhenskyi-on-reddit
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - 2026-04/2026-04-30t231319-markdownlm
  - 2026-04/2026-04-30t231348-testdino
  - 2026-04/2026-04-30t231709-conductor
  - >-
    2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your
  - 2026-04/2026-04-30t231909-the-great-css-expansion
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - 2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-06t204115-platform-engineering-end-to-end
  - 2026-05/2026-05-10t205349-github-is-sinking
  - 2026-05/2026-05-11t155625-storybloqstorybloq
  - >-
    2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about
  - >-
    2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio
  - >-
    2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - 2026-05/2026-05-18t113714-yaml-thats-norway-problem
  - 2026-05/2026-05-18t222802-raellioctowiz
  - 2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb
  - >-
    2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-05/2026-05-31t164554-jj-vcsjj
  - >-
    2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code
  - 2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack
  - 2026-06/2026-06-11t023723-gi-dellavzerostack
  - 2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams
  - 2026-06/2026-06-17t075738-gunnargray-devunicode-animations
  - 2026-06/2026-06-17t075816-matt-palmer
  - 2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code
  - 2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-23t231556-if-i-could-make-my-own-github
  - 2026-06/2026-06-23t232444-repowise-devrepowise
  - 2026-06/2026-06-25t195020-strands-agents
  - >-
    2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think
  - >-
    2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters
  - >-
    2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent
  - 2026-07/2026-07-20t215754-stop-using-opencode
  - 2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades
compiled_at: '2026-08-11T05:16:08.201Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14893
    output_tokens: 2027
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
  cost_usd: 0.075084
---
Developer tooling is the substrate on which software gets built. The sources here span a wide range of that substrate: shell ergonomics, version control, testing, AI coding agents, API abstraction layers, knowledge management, and the platforms that tie these together.

At the CLI layer, underused shell features remain a persistent source of unlocked productivity. Readline key bindings, brace expansion, history search, and script safety flags like `set -euo pipefail` are all standard-spec features that most developers never adopt [Shell Tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your). SSH key pairs and agent forwarding similarly replace fragile PAT tokens for authenticating across remote machines [SSH Keys](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure). These are not exotic capabilities; the gap is awareness and habit.

Version control has seen real architectural innovation. Jujutsu (jj) auto-commits the working copy, treats conflicts as first-class objects, and rebases descendants automatically on history rewrites [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj). A practical workflow built on top of it uses empty parent commits to persist code-review progress across sessions without stash gymnastics [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu). Meanwhile, GitHub's reliability has declined enough that some developers are actively evaluating Codeberg, Forgejo, or self-hosted forges [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking), and a developer wishlist for a reimagined forge surfaces features like pre-commit remote CI, stacked PRs as a first-class concept, and signed offline-usable actions [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github). A real GitHub merge queue bug that silently deleted thousands of lines illustrates what architectural choices around temp branches can prevent [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).

Testing is a tooling layer where coupling to implementation is the central failure mode. Playwright suites that target CSS classes and DOM positions break during refactors; suites anchored to semantic roles and accessible names stay stable [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). TestDino adds an analytics layer on top of Playwright, auto-categorizing failures as bugs, flaky tests, or UI changes and claiming 6-8 hours of saved engineering time weekly [TestDino](/reading/2026-04/2026-04-30t231348-testdino). Schema validation at the API boundary catches a related class of breakage: a custom RxJS operator backed by Zod surfacing unexpected backend response shapes at development time rather than in production [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with).

AI coding agents are now a distinct tooling category with their own infrastructure concerns. Claude Code is the common substrate across several sources: it can be redirected to a local LLM via LM Studio [Running Claude Code with a Local Model](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio), extended with plugins like orchestrator-supaconductor to run multi-agent pipelines from a single command [Ibrahim-3d/orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor), given persistent session context via Storybloq's .story/ directory [Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq), and extended with Anthropic's own dynamic workflows that spawn hundreds of parallel subagents for codebase-wide tasks [Introducing Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Security around these agents matters: Claude Code should run inside Docker's sbx sandbox to prevent credential leaks [If You're Running Claude Code, PLEASE Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box), and SAP-ecosystem npm packages were poisoned precisely because they could abuse Claude Code and VS Code configs as persistence vectors [SAP-Related npm Packages Compromised](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). Vet, an open-source local code review tool, reads an agent's conversation history alongside the diff to catch mistakes standard review misses [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes), while Latchkey keeps API credentials encrypted on-device so agents can authenticate against external services without ever seeing raw tokens [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

Knowledge management tooling for agents is its own emerging area. MarkdownLM centralizes architectural rules and security policies into a living knowledge base with a Git-layer enforcement tool [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm). LostWarrior/knowledge-base is a zero-dependency bash CLI that organizes project context as tiered markdown files, generating both human-readable and machine-readable outputs so agents can navigate without excess token burn [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base). The Databricks ai-dev-kit brings domain expertise to AI coding assistants via an MCP server and markdown skills [databricks-solutions/ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit).

Platform-level tooling rounds out the picture. Radar is an open-source Kubernetes UI that replaces the patchwork of kubectl and five other tools with a single binary [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui). Conductor wraps QuickBooks Desktop's qbXML and SOAP interfaces in a typed Python, Node.js, and REST API so developers can read and write 130+ QBD object types without touching the underlying protocol [Conductor](/reading/2026-04/2026-04-30t231709-conductor). Git log commands that surface churn hotspots, bus factor, and bug clusters give developers a diagnostic layer over any unfamiliar codebase before a single file is opened [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code). And AST-based linters and flake8 plugins that ban manual DB commits enforce architectural constraints at the tooling layer rather than through code review [Ban commits/transactions using AST analysis and linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters).

The through-line across all of these: good tooling externalizes constraints and knowledge that would otherwise live in developer heads, reducing the cognitive cost of doing the right thing by default.
