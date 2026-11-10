---
title: Developer tooling
summary: >-
  The tools developers use to write, test, ship, and understand code — spanning
  version control, shell utilities, AI coding assistants, test infrastructure,
  and platform layers — and how those layers compound in complexity and security
  risk.
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
compiled_at: '2026-11-10T01:17:13.722Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 15060
    output_tokens: 1989
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
  cost_usd: 0.075015
---
Developer tooling is the accumulated infrastructure between a programmer's intent and working software in production. The sources here span a wide range of that infrastructure: shell primitives, version control workflows, test suites, platform engineering, AI coding agents, and the security vulnerabilities that ride along in the ecosystem.

At the foundational layer, shell knowledge still matters. [Shell tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) covers Readline key bindings, history search, brace expansion, process substitution, and safety flags like `set -euo pipefail` that prevent silent failures — primitives that have shipped in Bash and Zsh for decades but remain underused. Similarly, [SSH key management](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) covers key generation, agent forwarding, and commit signing as replacements for PAT tokens across multiple remotes.

Version control has accumulated its own tooling layer. [Jujutsu](/reading/2026-05/2026-05-31t164554-jj-vcsjj) auto-commits the working copy, records conflicts as first-class objects, and rebases descendants automatically — and [a companion workflow piece](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows how to use `jj` to review large PRs by squashing files into an empty parent commit as you go, persisting review progress in version control. Meanwhile, [git log forensics](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) demonstrates that five churn and blame commands can diagnose a codebase's bus factor and bug clusters before reading a line of code. On the platform side, [a wishlist for a better GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) argues for pre-commit remote CI, stacked PRs as first-class citizens, and signed offline-usable Actions, while [David Bushell's critique](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues GitHub's reliability under Microsoft has degraded enough to warrant migration to Codeberg, Forgejo, or self-hosted forges. The [Trunk merge queue post-mortem](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) adds a concrete data point: a GitHub merge queue bug silently deleted thousands of lines by building temp branches from the wrong base commit.

Test infrastructure spans both determinism and observability. [Playwright resilience](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break during refactors not primarily from bad selectors but from coupling to CSS classes and DOM structure rather than semantic roles and accessible names. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an AI-powered reporting layer over Playwright that auto-categorizes failures as bugs, flaky tests, or UI changes. [Agentic AI testing](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test) proposes a framework for where autonomous AI fits — fully specified, bounded, or fully adaptive — matching autonomy level to workflow goals like regression, debugging, or exploration.

Runtime validation sits adjacent to testing. [Zod with Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how a custom RxJS operator can catch unexpected backend response shapes at dev time, turning silent runtime failures into caught schema violations. The [YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) illustrates what happens when tooling relies on a spec that library implementors haven't caught up with: `NO` parsing as `false` persists in PyYAML and libyaml years after the fix landed in the YAML 1.2 spec.

Platform engineering formalizes tooling at an organizational scale. [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) covers why internal developer platforms exist, how to staff and build them, and what success looks like in terms of reduced cognitive load for product teams. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) is a concrete example: a single open-source binary that unifies Kubernetes topology, Helm, GitOps, and audits across multiple clusters, replacing the patchwork of `kubectl` and several independent tools.

AI coding assistants have become a tooling category of their own. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) packages MCP servers, markdown skills, and a Python core library to bring domain expertise into Claude Code, Cursor, and Gemini CLI. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across AI coding sessions via a `.story/` directory, addressing the statelessness problem. [Running Claude Code against a local LM Studio model](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) shows the environment setup required, including a quirk where local models inject whitespace into long URL strings. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) addresses the other side: an open-source local code review tool that reads an agent's conversation history alongside the diff to catch mistakes that standard review misses, like silently skipped tests.

Security in the tooling ecosystem is not an afterthought. [Claude Code sandboxing](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues every Claude Code session should run inside Docker's `sbx` sandbox to prevent credential leaks and production data destruction. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) encrypts API tokens on-device and injects them at call time so agents never see raw credentials. These precautions look prescient next to the [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing), where the TeamPCP threat actor poisoned four packages with a payload that harvested cloud secrets and used Claude Code and VS Code configs as persistence vectors.

The historical arc of frontend tooling specifically is traced in [The Descent](/reading/2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent), which walks layer by layer from plain HTML over FTP to a 44-layer build stack, tracing each tool back to the specific pain it was built to solve. Modern CSS is now absorbing some of that complexity back: [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents native anchor positioning, popovers, scroll-driven animations, and view transitions replacing over 300 kB of JavaScript libraries.
