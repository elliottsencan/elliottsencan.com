---
title: Developer tooling
summary: >-
  The tools developers use to write, test, review, deploy, and maintain software
  — spanning shell utilities, version control, CI systems, AI coding agents, and
  the scaffolding that connects them.
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
compiled_at: '2026-08-03T10:05:00.244Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14893
    output_tokens: 1923
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
  cost_usd: 0.073524
---
Developer tooling is not a single category but a layered accumulation of specialized instruments, each built to solve a specific friction that previous layers introduced. [The Descent](/reading/2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent) traces this compounding pattern across the frontend stack, where plain HTML over FTP gave way to 44 layers of frameworks and build tools, each justified by genuine pain but collectively producing a system that requires its own tooling to understand.

At the shell level, the primitives remain underused. [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) covers Readline key bindings, history search, brace expansion, and script safety flags that have existed for decades but rarely make it into working practice. Similarly, [Using SSH Keys to Make Connectivity Simpler and Secure](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) walks through key generation, agent forwarding, and commit signing as the practical floor of secure remote work.

Version control has grown past Git. [Jujutsu](/reading/2026-05/2026-05-31t164554-jj-vcsjj) auto-commits the working copy, treats conflicts as first-class objects, and automatically rebases descendants on history rewrites. A [concrete review workflow using jj](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) demonstrates squashing files into an empty parent commit as you read them, persisting review progress in version control without stashes. Meanwhile, [GitHub's reliability decline](/reading/2026-05/2026-05-10t205349-github-is-sinking) and [a developer wishlist for an improved forge](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) — pre-commit remote CI, stacked PRs as first-class citizens, signed offline-usable Actions — signal that the dominant platform is leaving space for alternatives.

CI integrity is a related concern. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building temp branches off the wrong base commit; Trunk's architecture avoided the incident by never pushing temp branches to main. Test infrastructure faces its own pressure: [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an AI analytics layer over Playwright that auto-categorizes failures, and [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that test fragility comes from coupling to CSS classes and DOM structure rather than semantic roles and accessible names.

Observability tools occupy a growing slice of the toolchain. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) consolidates Kubernetes topology, Helm, GitOps, and image inspection into a single open-source binary. [How to read distributed traces when you didn't write the code](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy and critical-path analysis as a way to diagnose unfamiliar systems. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) offers codebase health scores, dead code detection, and git analytics. And [five git log commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) — churn hotspots, bus factor, bug clusters — can characterize a new codebase's risk profile before opening a single file.

The AI coding assistant wave has added a dense new layer. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) packages an MCP server, markdown skills, and a Python core library to bring Databricks expertise into Claude Code, Cursor, and Gemini CLI. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across AI coding sessions via a `.story/` directory. [Orchestrator-Supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) turns a single natural-language command into a parallel multi-agent pipeline with a virtual Board of Directors for architectural decisions. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let the model write its own orchestration scripts that spin up hundreds of parallel subagents for codebase-wide migrations. [Zerostack](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack) takes a different angle, building a minimal Rust coding agent at ~16MB RAM versus ~300MB for JS-based alternatives.

Running AI agents over developer infrastructure carries real security costs. [SAP-related npm packages were poisoned](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) with a payload that abused Claude Code and VS Code configs as persistence vectors. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) responds to this class of problem by injecting credentials locally so agents never see raw tokens. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside the diff to catch errors — silently skipped tests, swapped-in fake data — that standard review misses. [Running Claude Code inside Docker's sbx sandbox](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) is a practical containment strategy that preserves full auto-approve mode without exposing the host system.

Smaller, focused libraries fill gaps that frameworks leave open. [Seven JavaScript libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) including Knip, Biome, and Orval address dead code, linting, and API client generation. [Zod with a custom RxJS operator in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) blocks non-compliant code at the Git layer by querying a living knowledge base of architectural rules. The pattern across all of these is the same: tooling that surfaces errors as early as possible in the development cycle, before they reach production.
