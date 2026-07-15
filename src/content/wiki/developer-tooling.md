---
title: Developer tooling
summary: >-
  The tools developers use to write, test, review, and ship code are expanding
  to include AI coding agents, smarter version control, typed API layers, and
  tighter security constraints at every layer of the workflow.
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
compiled_at: '2026-07-15T10:05:04.523Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14357
    output_tokens: 1857
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
  cost_usd: 0.070926
---
Developer tooling has always been about reducing friction between intent and working software. Across recent sources, that reduction is happening along several simultaneous fronts: AI agents embedded in coding workflows, more principled version control, typed and validated API boundaries, security hardening at the package and credential layer, and small focused libraries that do one thing without dependencies.

The AI coding agent surface is the most active area. [Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) now supports dynamic workflows that spin up hundreds of parallel subagents for codebase-wide migrations and security audits. The [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) plugin turns a natural-language command into a full multi-agent pipeline covering planning, parallel execution, and architectural review. [zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack) takes the opposite design bet: a Rust-built coding agent that uses about 16MB of RAM versus 300MB for JS-based alternatives, with multi-provider LLM support and an ACP/MCP integration layer. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses a different gap by persisting session context across Claude Code sessions in a `.story/` directory, so AI assistants accumulate rather than reset project knowledge.

The question of how agents should access tooling is contested. [Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues MCP is effectively a GUI for non-developers, and that capable agents should call APIs and compose scripts directly to avoid token waste. Anthropic's own [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) treats MCP as a first-class distribution channel, packaging local servers as single-click bundles. Databricks' [ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) threads both positions by combining an MCP server with markdown skill files and a Python core library, targeting Claude Code, Cursor, Gemini CLI, and others simultaneously.

Knowledge management for AI agents is emerging as its own tooling category. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies in a knowledge base that agents query in real time, with a Git-layer linter that blocks non-compliant code before merge. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) provides a zero-dependency bash CLI that structures project context as tiered markdown files with both human-readable and machine-readable outputs. The Reddit thread on [Karpathy's LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) describes using LLMs to build and maintain structured markdown knowledge bases at scale, querying them without RAG.

Security concerns are now embedded in the tooling itself. SAP-ecosystem npm packages were [poisoned](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) with a self-propagating payload that specifically abused Claude Code and VS Code configuration paths as persistence vectors. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) responds to this class of threat by injecting credentials locally so agents never see raw tokens. [Claude Code sandboxing](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) via Docker is advocated as mandatory for anyone running auto-approve mode.

Version control tooling is being reconsidered. [Jujutsu](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is a Git-compatible VCS that auto-commits the working copy and records conflicts as first-class objects; a companion post shows [using jj to review large PRs](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) by inserting empty parent commits and squashing files in as you read them. A wishlist post on [reimagining GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) identifies stacked PRs, pre-commit remote CI, and signed Actions as gaps the current forge doesn't fill. A separate [Trunk post](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) documents a GitHub merge queue bug that silently deleted lines from main branches, and explains how their architectural decision to avoid pushing temp branches to main avoided the incident.

Smaller, focused libraries and primitives recur throughout. [Seven JS libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) including Knip, Biome, and ts-pattern each solve narrow problems without framework lock-in. [unicode-animations](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations) provides 18 Unicode braille spinners as raw frame data with zero dependencies. [Shell tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) covering Readline bindings, history search, and script safety flags address the layer below all frameworks. On the testing side, [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an AI analytics layer over Playwright, while [Currents](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that test fragility is a design problem, not a selector problem, cured by coupling to semantic roles rather than DOM structure.

Code review tooling is also getting specialized. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads the agent's full conversation history alongside the diff to catch mistakes that standard review misses, like silently skipped tests. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) offers code health scores, dead code detection, and architectural decision tracking via MCP. Five [git log commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) covering churn hotspots, bus factor, and bug clusters let a developer diagnose a codebase's risks before reading a single file.
