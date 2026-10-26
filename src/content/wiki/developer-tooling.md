---
title: Developer tooling
summary: >-
  Developer tooling spans the libraries, CLIs, version control systems, testing
  frameworks, and AI coding assistants that shape how software is built,
  reviewed, and maintained — with a growing tension between tool proliferation
  and coherent, composable workflows.
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
  - >-
    2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test
compiled_at: '2026-10-26T22:25:05.825Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 15060
    output_tokens: 1974
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
  cost_usd: 0.07479
---
The history of developer tooling is one of accretion. Each layer was built to solve a specific pain, then became infrastructure for the next layer. [The Descent](/reading/2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent) traces this directly in frontend development, showing how plain HTML over FTP evolved into a 44-layer stack of frameworks, build tools, and AI codegen — each addition rational in isolation, collectively bewildering.

Version control is the bedrock. Git remains standard, but alternatives are gaining serious traction. [Jujutsu](/reading/2026-05/2026-05-31t164554-jj-vcsjj) auto-commits the working copy, treats conflicts as first-class objects, and automatically rebases descendants on history rewrites — properties that make complex workflows like large-PR review tractable. One concrete workflow: [duplicate a change, insert an empty parent commit, then squash files into it as you review them](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu), persisting progress in version control without the cognitive overhead of Git stashes. On the infrastructure side, a [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building temp branches off the wrong base commit — a reminder that even foundational tooling has sharp edges. The broader dissatisfaction with GitHub under Microsoft has prompted calls to [migrate to Codeberg, Forgejo, or self-hosted forges](/reading/2026-05/2026-05-10t205349-github-is-sinking), and a developer wishlist for [pre-commit remote CI, stacked PRs as first-class citizens, and signed offline-usable Actions](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github).

Before reading any code in an unfamiliar repository, [five git log commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) — churn hotspots, bus factor, bug clusters, velocity trends, firefighting frequency — can diagnose structural risk without opening a single file. On the shell itself, [underused Readline bindings, history search, brace expansion, process substitution, and script safety flags](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) remain high-leverage, unglamorous basics that compound across years of use.

Testing has its own tooling ecosystem. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) layers AI-powered analytics over Playwright, auto-categorizing failures as bugs, flaky tests, or UI changes, and claiming 6–8 hours of weekly savings. But analytics won't fix tests that are structurally fragile. [Playwright tests break during UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) not primarily from bad selector choices but from coupling to CSS classes and DOM structure rather than semantic roles and accessible names. [Agentic AI testing](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test) introduces a further dimension: matching autonomy levels — fully specified, bounded, or fully adaptive — to workflow goals like regression, debugging, or exploration.

Language-level tooling keeps tightening. [Zod schema validation with a custom RxJS operator in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time before they cause runtime errors. The [seven small JS/TS libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) worth knowing — Knip, Nuqs, ts-pattern, Orval, Zod, Biome, Ofetch — each address a precise gap. [AST-based linters and flake8 plugins](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) can enforce DB layer ownership of commits and transactions at CI time. And [modern CSS](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) now natively handles anchor positioning, popovers, scroll-driven animations, and custom selects — replacing over 300 kB of JavaScript libraries with zero-dependency platform primitives, extended further by [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) reaching Baseline support.

AI coding assistants have added a new stratum. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) is a composable toolkit of an MCP server, markdown skills, and a Python core library supporting Claude Code, Cursor, Gemini CLI, and others. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists coding session context across sessions via a .story/ directory of JSON files, making stateless AI assistants compound over time. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an AI agent's conversation history alongside the diff to catch mistakes standard code review misses, like silently skipped tests or swapped-in fake data. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) injects API credentials into agent curl calls locally, keeping tokens encrypted on-device. Security is not hypothetical: [four SAP-ecosystem npm packages were poisoned](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) with a credential-stealing payload that abused Claude Code and VS Code configs as persistence vectors, and [OpenCode's default posture](/reading/2026-07/2026-07-20t215754-stop-using-opencode) of connecting remote LLMs to a local shell with minimal configuration drew sharp technical critique. Running Claude Code inside [Docker's sbx sandbox](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) is the straightforward mitigation.

[Platform engineering](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) frames tooling at the organizational level: internal developer platforms exist to reduce cognitive load and standardize the path from code to production, with success measured by how much friction they remove from developers who never think about the platform at all. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) addresses one chronic friction point — the patchwork of kubectl and five other tools platform teams juggle — with a single-binary open-source Kubernetes UI. The throughline across all of these tools is the same: specificity compounds. Tools that do one thing precisely, compose cleanly, and stay out of the way accumulate into workflows that actually hold.
