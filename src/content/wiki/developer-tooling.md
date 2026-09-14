---
title: Developer tooling
summary: >-
  The software tools, libraries, and platforms developers use to build, test,
  deploy, and maintain code — currently being reshaped by AI coding assistants,
  agentic workflows, and a renewed focus on security and reliability.
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
compiled_at: '2026-09-14T21:34:51.248Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 15060
    output_tokens: 1996
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
  cost_usd: 0.07512
---
Developer tooling spans everything a working engineer reaches for daily: version control, shells, test runners, linters, build pipelines, API wrappers, and the growing category of AI-assisted coding environments. Taken together, the sources here trace several converging pressures on that landscape.

The most active frontier is AI coding assistants and the infrastructure built around them. Anthropic's Claude Code has become a reference point for the field: it can now [write orchestration scripts that spin up parallel subagents](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) to handle codebase-wide migrations, and it supports redirecting its API calls to [local models served by LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) when privacy or cost demands it. A lightweight Rust alternative, [zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack), achieves similar multi-provider and subagent capabilities at roughly 16 MB RAM versus 300 MB for JS-based tools. The [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) plugin turns a single natural-language command into a multi-agent pipeline with planning, parallel execution, and quality gates. The [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) tool addresses the statelesness problem by persisting session context across Claude Code runs in a .story/ directory of JSON files.

Context and knowledge management has emerged as its own tooling category. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies in a living knowledge base and blocks non-compliant code at the Git layer. The [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) CLI organizes project context as tiered markdown with a machine-readable manifest.json so agents can navigate without burning excess tokens. A Reddit thread on [Karpathy's LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) describes having the model itself build and maintain structured Markdown files, querying at scale without RAG.

The MCP protocol sits at the intersection of these agent tools and traditional developer surfaces. Databricks' [ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) delivers Databricks expertise to AI coding assistants via an MCP server paired with markdown skill files. One author connected Claude Code to a [1.3-billion-row Postgres ledger via a Postgres MCP](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades) and queried it in plain English. Anthropic's own [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) covers packaging local MCP servers as single-click bundles for Claude Desktop. One critical perspective argues that [MCP is a GUI for agents](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis): useful for non-developers but wasteful for agents capable of writing code directly against APIs.

Security has become an acute concern as these tools gain real filesystem and credential access. Four SAP-ecosystem npm packages were [poisoned with a credential-stealing payload](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) that used Claude Code and VS Code configs as persistence vectors. One response is sandboxing: running Claude Code [inside Docker's sbx container](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) to prevent credential leaks even in full auto-approve mode. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) takes a complementary approach, injecting API credentials locally so agents never see raw tokens. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reviews an agent's conversation history alongside its diff to catch errors standard code review misses.

Version control tooling is also in flux. Jujutsu (jj) offers a [Git-compatible VCS that auto-commits the working copy](/reading/2026-05/2026-05-31t164554-jj-vcsjj) and records conflicts as first-class objects; [a concrete workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows how to use it for large PR reviews by squashing files into an empty parent commit as you read them. GitHub's reliability has declined enough that [David Bushell argues developers should migrate to Codeberg or Forgejo](/reading/2026-05/2026-05-10t205349-github-is-sinking), and a merge queue bug that [built temp branches off the wrong base commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) deleted thousands of lines silently from main branches, illustrating why architectural choices in CI infrastructure carry real production risk.

Testing tooling reflects the same tension between automation and reliability. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) layers AI analytics over Playwright runs to auto-categorize failures. A more principled approach argues that [Playwright tests break during refactors because they couple to implementation details](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) rather than semantic roles. [Agentic AI testing](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test) maps autonomy levels to appropriate test workflow goals.

Smaller, focused tools fill gaps across the stack: [Conductor](/reading/2026-04/2026-04-30t231709-conductor) provides a typed API over QuickBooks Desktop; [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) unifies Kubernetes topology and Helm across clusters in a single binary; [repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) surfaces code health scores and dead code via MCP; five git log commands [can diagnose a codebase's risk profile](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) before reading a single file. The broader historical arc of how each frontend tool emerged from a specific pain is traced in [a layer-by-layer walkthrough of frontend evolution](/reading/2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent).

The recurring theme across all of this is composability: small, focused tools that do one thing well and can be assembled into pipelines, with security and observability built into the seams rather than bolted on afterward.
