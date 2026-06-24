---
title: Developer tooling
summary: >-
  The tools developers use to write, test, review, and ship code — spanning CLI
  utilities, version control, AI coding assistants, testing infrastructure, and
  the platforms that host and run it all.
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
compiled_at: '2026-06-24T06:30:49.733Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 13862
    output_tokens: 1549
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
  cost_usd: 0.064821
---
Developer tooling covers the full range of instruments engineers reach for across the software lifecycle: shells, version control systems, testing frameworks, CI pipelines, package registries, and the AI coding assistants increasingly woven into all of these.

At the foundation, basic tools remain underappreciated. [Shell shortcuts and scripting safeguards](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) — Readline bindings, brace expansion, process substitution, and script safety flags — save accumulated hours without requiring any new installations. Similarly, [git log commands oriented around churn hotspots, bus factor, and bug clusters](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) give a new contributor a risk map of an unfamiliar codebase before a single file is opened.

Version control itself is being reconsidered. [Jujutsu](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is a Git-compatible VCS that auto-commits the working copy, treats conflicts as first-class objects, and rebases descendants automatically. A concrete workflow using it for [reviewing large pull requests](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) — inserting an empty parent commit and squashing reviewed files into it — shows how its model can reduce the cognitive overhead of code review. Meanwhile, [GitHub's reliability decline under Microsoft](/reading/2026-05/2026-05-10t205349-github-is-sinking) has renewed interest in Codeberg, Forgejo, and self-hosted forges. A complementary developer wishlist describes [stacked PRs as first-class citizens, pre-commit remote CI, and nuanced approval models](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) that current platforms do not natively support.

Testing tooling has two recurring failure modes: flakiness and brittleness. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the first by auto-categorizing Playwright failures as bugs, flaky tests, or UI changes across centralized runs. [Playwright test design that survives UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) addresses the second, arguing that test suites couple to DOM structure and CSS classes rather than semantic roles and accessible names, which is what actually stays stable across refactors.

Merge infrastructure carries its own risks. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building temp branches off the wrong base commit; Trunk's architectural choice to never push temp branches to main avoided the incident.

AI coding assistants have become a distinct category of tooling with their own infrastructure concerns. [The Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) provides an MCP server, markdown skills, and a Python core library to bring domain expertise into tools like Claude Code and Cursor. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across AI coding sessions via a `.story/` directory, and [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) turns natural-language commands into multi-agent pipelines with parallel execution and architectural review. Anthropic's own [dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let Claude write orchestration scripts that spin up hundreds of parallel subagents for tasks like codebase-wide migrations.

Security concerns now attach directly to these AI tools. [SAP-ecosystem npm packages were compromised](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) with a credential-stealing payload that used Claude Code and VS Code configs as persistence vectors. [Running Claude Code inside Docker's sbx sandbox](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) is one mitigation. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) takes a complementary approach: injecting API credentials locally so agents authenticate without ever seeing raw tokens. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside diffs to catch mistakes — silently skipped tests, swapped-in fake data — that standard code review misses.

Knowledge management for agent-assisted development is its own emerging discipline. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies that agents query in real time, with a Git-layer tool that blocks non-compliant code before it merges. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) organizes project context as tiered markdown files with both a human-readable index and a machine-readable manifest.

Platform engineering formalizes this kind of tooling investment at the organizational level. A [comprehensive walkthrough of internal developer platforms](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) covers why they exist, how to staff and build them, and what success looks like — the throughline being that developer tooling at scale is a product, not a side project.
