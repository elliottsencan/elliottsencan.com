---
title: Developer tooling
summary: >-
  The tools developers use to write, test, review, deploy, and understand code —
  spanning shells, version control, CI, AI coding assistants, package
  ecosystems, and the emerging infrastructure built around agentic workflows.
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
compiled_at: '2026-07-06T00:12:48.304Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14190
    output_tokens: 2178
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
  cost_usd: 0.07524
---
Developer tooling covers every layer where a developer interacts with code outside the code itself: the shell they type in, the version control system tracking changes, the CI pipeline validating them, the libraries scaffolding runtime behavior, and increasingly the AI agents writing code on their behalf. The sources here span all of these layers, and a few recurring tensions run across them.

At the shell and command-line level, small habits compound. [Shell tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) like Readline key bindings, brace expansion, and `set -euo pipefail` safeguards are low-investment changes that eliminate entire classes of accidental errors. SSH key management and agent forwarding, covered in [a practical DevOps guide](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure), sit in the same category: foundational hygiene that prevents authentication failures across machines.

Version control tooling is in flux. [Jujutsu (jj)](/reading/2026-05/2026-05-31t164554-jj-vcsjj) offers a Git-compatible alternative that auto-commits the working copy, treats conflicts as first-class objects, and rebases descendants automatically. A companion piece shows a [concrete review workflow with jj](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) for large pull requests: duplicate the change, insert an empty parent, and squash files in as you read them. Meanwhile, [five git log commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) — churn hotspots, bus factor, bug clusters, velocity, and firefighting frequency — extract codebase risk signals before reading a single file. On the forge side, [GitHub's reliability decline](/reading/2026-05/2026-05-10t205349-github-is-sinking) and a [developer wishlist for a reimagined forge](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) — pre-commit remote CI, stacked PRs, signed offline Actions — reflect dissatisfaction with the current platform.

CI and merge infrastructure carry their own risks. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building temp branches off the wrong base commit; Trunk's architecture of never pushing temp branches to main avoided the incident. TestDino's [AI-powered Playwright analytics](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes failures as bugs, flaky tests, or UI changes. The [Currents guide to Playwright](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that test suites break during refactors not from bad selectors alone but from coupling to CSS classes and DOM structure rather than semantic roles and accessible names.

Library and language tooling continues to shrink what developers need to build themselves. [Modern CSS](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) now natively handles anchor positioning, popovers, scroll-driven animations, and view transitions, replacing over 300 kB of JS libraries. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) let components react to parent CSS variables as stateful design tokens, removing many Sass and PostCSS build steps. On the JS side, [seven focused libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) — Knip, Nuqs, ts-pattern, Orval, Zod, Biome, and Ofetch — cover dead code detection, URL state, pattern matching, API client generation, and linting. Zod's role in [Angular API validation](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time before they reach runtime.

AI coding assistants now occupy a significant portion of the tooling surface. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) composes an MCP server, markdown skills, and a Python core library to bring domain expertise to Claude Code, Cursor, and Gemini CLI. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across AI coding sessions via a `.story/` directory. [Orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) turns a single natural-language command into a multi-agent pipeline. [Anthropic's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let Claude Code write orchestration scripts that spin up hundreds of parallel subagents for codebase-wide migrations. [Zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack) approaches the same space from a performance angle: a Rust-built coding agent using \~16 MB RAM versus \~300 MB for JS-based alternatives.

The security implications of this tooling layer are real. SAP-ecosystem npm packages were [poisoned with a credential-stealing payload](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) that abused Claude Code and VS Code configs as persistence vectors. Running Claude Code [inside Docker's sbx sandbox](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) limits the blast radius. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeps API credentials encrypted on-device so agents can authenticate against services without ever seeing raw tokens. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reviews AI-generated diffs alongside the agent's conversation history to catch mistakes standard review misses.

Knowledge and context management for agents is becoming its own tooling category. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a knowledge base that blocks non-compliant code at the Git layer. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) organizes project context as tiered markdown with both human-readable and machine-readable outputs. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) adds code health scores, git analytics, and dead code detection via MCP. The [Karpathy LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) extends this further: having the model build and maintain structured markdown files it can query at scale without RAG.

Platform engineering formalizes the organizational version of this work. A [comprehensive guide](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) frames internal developer platforms as products built for engineering teams, with staffing, success metrics, and the same product discipline applied to external-facing software. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui), an open-source Kubernetes UI, replaces the patchwork of kubectl and five other tools with a unified topology-and-audit interface. Observability tools like [distributed trace reading](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) fill the gap between what a tool does and what a developer can diagnose when it goes wrong.
