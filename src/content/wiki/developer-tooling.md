---
title: Developer tooling
summary: >-
  The tools developers use to write, test, deploy, and maintain software span
  from shell utilities and version control to AI coding agents and platform
  engineering — and each layer reflects a specific historical friction point it
  was built to solve.
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
compiled_at: '2026-08-13T21:11:26.424Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 15060
    output_tokens: 2048
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
  cost_usd: 0.0759
---
Developer tooling is rarely neutral infrastructure. Each tool exists because something broke, slowed down, or scaled past what a previous approach could handle. [The Descent](/reading/2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent) makes this structural argument explicitly, tracing the frontend stack's 44-layer complexity back layer by layer to the specific pain each tool was invented to address. The same logic applies across the stack: shell ergonomics, version control, testing frameworks, and AI coding assistants all arise from compounding friction.

At the shell layer, [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) covers underused primitives — Readline key bindings, history search, brace expansion, process substitution, and script safety flags — that reduce the cognitive load of repetitive command-line work. SSH key management builds on this foundation; [Using SSH Keys to Make Connectivity Simpler and Secure](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) covers key generation, agent forwarding, and commit signing as a practical alternative to PAT tokens across multiple remotes.

Version control tooling is in active flux. [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj) offers a Git-compatible alternative that auto-commits the working copy, treats conflicts as first-class objects, and automatically rebases descendants. [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows a concrete workflow built on this: duplicate the change, insert an empty parent commit, squash files into it as you review, persisting progress in version control without git stash complexity. On the Git side, [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) argues that five git log commands — churn hotspots, bus factor, bug clusters, velocity trends, firefighting frequency — diagnose a codebase's risks before a single file is opened. GitHub's reliability issues have prompted some developers to look elsewhere: [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues for migration to Codeberg, Forgejo, or self-hosted forges, while [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) outlines what a better forge would offer — pre-commit remote CI, stacked PRs as a first-class concept, signed offline-usable Actions.

Merge queue reliability is its own concern. [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) documents a GitHub bug that silently deleted thousands of lines from main by building temp branches off wrong base commits, and explains why Trunk's architecture avoided it by never pushing temp branches to main.

Testing tooling spans several dimensions. [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that test breakage during UI refactors comes from coupling to CSS classes and DOM structure rather than semantic roles and accessible names. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an AI reporting layer over Playwright that auto-categorizes failures as bugs, flaky tests, or UI changes. [Agentic AI testing](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test) extends this further, framing a spectrum of AI autonomy levels — fully specified, bounded, fully adaptive — and mapping each to appropriate use cases like regression, debugging, or exploratory testing. Runtime validation sits adjacent: [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows using Zod schema validation with a custom RxJS operator in Angular to catch unexpected backend response shapes at dev time.

AI coding assistants have become a distinct tooling category with their own surface area. The [Databricks ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) shows what a composable AI coding toolkit looks like: an MCP server, markdown skills, a Python core library, and a full-stack builder app supporting Claude Code, Cursor, and Gemini CLI. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses a different problem — stateless AI sessions — by persisting coding context across sessions in a .story/ directory. [Running Claude Code with a Local Model via LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) walks through redirecting Claude Code's API calls to a locally served LLM. Security around these tools matters: [If You're Running Claude Code, PLEASE Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues for Docker sandboxing to prevent credential leaks, and the [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) demonstrates that AI tool configs — Claude Code settings, VS Code configs — are now active persistence vectors for malware. [Stop Using OpenCode](/reading/2026-07/2026-07-20t215754-stop-using-opencode) makes a detailed case that a popular open-source coding agent has security vulnerabilities and reckless defaults that connect remote LLMs to a local shell with minimal configuration.

Credential management for agents is emerging as its own layer. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) injects API credentials into agent curl calls locally, keeping tokens encrypted on-device. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) takes the review angle, reading an agent's conversation history alongside the diff to catch mistakes — silently skipped tests, swapped-in fake data — that standard code review misses.

Observability and codebase intelligence round out the picture. [How to read distributed traces when you didn't write the code](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 staircase patterns for navigating unfamiliar systems. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) offers code health scores, dead code detection, and architectural decision tracking via MCP. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) unifies Kubernetes topology, Helm, GitOps, and audits across clusters in a single open-source binary, replacing the patchwork of kubectl and multiple other tools.

Across all these layers, a consistent pattern emerges: tools accrete to solve problems created by earlier tools, and the sharpest new work tends to reduce that accretion by addressing root causes — semantic test selectors, first-class conflict objects, sandboxed agent execution — rather than adding another wrapper.
