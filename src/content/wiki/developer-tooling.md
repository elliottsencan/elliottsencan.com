---
title: Developer tooling
summary: >-
  The tools developers build, configure, and maintain to write, review, secure,
  and ship software — spanning AI coding assistants, shell workflows, version
  control, testing infrastructure, and the platforms that unify them.
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
compiled_at: '2026-07-16T11:34:43.329Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14357
    output_tokens: 1979
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
  cost_usd: 0.072756
---
Developer tooling is the layer of instruments between a developer and working software. What counts as tooling spans widely: version control workflows, shell shortcuts, test runners, CI pipelines, code forges, security guardrails, and increasingly, AI-powered assistants that write and review code autonomously. The sources here map a field in rapid expansion, with AI integration as the loudest current, but with durable infrastructure concerns running underneath.

The AI coding assistant space has fragmented into a small ecosystem of competing runtimes. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) packages Databricks expertise into an MCP server, Python core library, and markdown skills compatible with Claude Code, Cursor, and Gemini CLI. [Ibrahim-3d/orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) extends Claude Code into a multi-agent pipeline that handles planning, parallel execution, and architectural review from a single natural-language command. [Anthropic's dynamic workflows announcement](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) goes further, letting Claude write its own orchestration scripts that spin up hundreds of parallel subagents for codebase-wide tasks. [Zerostack](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack) takes the opposite size philosophy: a Rust-built coding agent at roughly 16MB RAM, versus the ~300MB typical of JS-based alternatives, with parallel worktrees and local model support via Ollama.

Running AI assistants locally or with local models introduces its own tooling needs. [Zack Reed's guide](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) shows how to redirect Claude Code's API calls to LM Studio, with gotchas around whitespace injection from local models. [Imbue's Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses the credential problem directly: a CLI that injects API tokens locally so agents never see raw secrets. The security concern is not hypothetical. The TeamPCP supply chain attack [documented by The Hacker News](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned SAP-ecosystem npm packages to harvest cloud credentials and used Claude Code configs as a persistence vector. [Running Claude Code inside Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) is one practical mitigation: full auto-approve mode inside a sandbox avoids credential leaks and production data destruction.

Context and knowledge management for AI agents has become its own tooling category. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across Claude Code sessions via a `.story/` directory, turning stateless assistants into compounding collaborators. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a living knowledge base that agents query at runtime, with a Git-layer enforcement tool that blocks non-compliant code before merge. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) offers a zero-dependency bash CLI that generates both human-readable and machine-readable manifests of project context. [Imbue's Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) takes the review angle: a local tool that reads agent conversation history alongside the diff to catch mistakes like silently skipped tests that standard review misses.

Version control tooling is undergoing its own quiet renovation. [Jujutsu (jj)](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is a Git-compatible VCS that auto-commits the working copy and records conflicts as first-class objects. [Ben Gesoff's workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows how jj's model enables a structured approach to reviewing large PRs by squashing files into an empty parent commit as you go. Meanwhile, [GitHub's reliability decline](/reading/2026-05/2026-05-10t205349-github-is-sinking) and a [merge queue bug that silently deleted code from main branches](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) have pushed developers toward alternatives and architectural choices that avoid pushing temp branches to shared history at all. [Mat Duggan's wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) names what's still missing: pre-commit remote CI, nuanced PR approvals, stacked PRs as first-class citizens.

Testing infrastructure has a parallel story. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) applies AI categorization to Playwright runs to auto-sort failures as bugs, flaky tests, or UI changes. But the [Currents team argues](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) that flaky test problems often stem from coupling tests to DOM structure rather than semantic roles, making tooling changes downstream of a design decision. [Zod with RxJS in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend shapes at dev time rather than runtime, shifting validation into the toolchain.

Shell and CLI tooling persists as a high-leverage surface. [Christian Hofstede-Kuhn's shell guide](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) covers Readline bindings, history search, brace expansion, and script safety flags as the kind of low-ceremony tooling that compounds daily. [Git log analytics](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) — churn hotspots, bus factor, bug clusters — treat the repository's own history as a diagnostic tool before reading a line of code. [SSH key management and agent forwarding](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) handles the authentication layer that underlies all of it.

Platform engineering is where individual tools aggregate into systems. [Luca Cavallin's platform engineering overview](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) frames internal developer platforms as the answer to the cognitive overhead of fragmented tooling. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) applies the same logic to Kubernetes: a single open-source UI to replace the patchwork of kubectl and five other tools. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) brings code health scores, architecture tracking, and dead code detection under a single MCP-connected interface.
