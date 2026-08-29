---
title: Developer tooling
summary: >-
  The tools developers use to write, test, deploy, and reason about code have
  multiplied across every layer of the stack, with AI coding assistants, version
  control alternatives, security concerns, and platform engineering each
  reshaping what "tooling" means in practice.
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
compiled_at: '2026-08-29T20:14:21.796Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 15060
    output_tokens: 1964
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
  cost_usd: 0.07464
---
Developer tooling spans a wide surface: version control workflows, shell utilities, test infrastructure, observability, code forges, AI coding agents, and the scaffolding that holds all of it together. What connects these categories is the same underlying pressure — reducing friction between intent and working software, while keeping the system legible and safe.

The version control layer is seeing genuine architectural alternatives emerge. Jujutsu takes a different approach from Git by auto-committing the working copy, recording conflicts as first-class objects, and rebasing descendants automatically on history rewrites [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj). A practical review workflow built on top of it — duplicating a change, inserting an empty parent commit, and squashing files in as you review — lets engineers persist review progress in version control without stashes [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu). At the same time, GitHub's reliability has declined enough that some developers are seriously evaluating Codeberg, Forgejo, or self-hosted forges as migration targets GitHub is Sinking. A related wishlist piece calls for pre-commit remote CI, nuanced PR approvals, stacked PRs as first-class citizens, and a self-hostable unit smaller than GitHub Enterprise [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github).

Before reading any code at all, git log archaeology can surface codebase risks — churn hotspots, bus factor, bug clusters, and velocity trends — without opening a single file [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code). That same orientation toward diagnosis before action shows up in distributed tracing: reading spans you didn't write, identifying critical paths, and tracing N+1 staircases back to the responsible code [How to read distributed traces when you didn't write the code](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code).

Test infrastructure is another site of active work. TestDino layers AI-powered analytics over Playwright, auto-categorizing failures as bugs, flaky tests, or UI changes, and claims to recoup 6–8 hours per engineer per week [TestDino](/reading/2026-04/2026-04-30t231348-testdino). A more architectural take argues that Playwright suites break during UI refactors not because of bad selectors, but because tests couple to CSS classes and DOM structure rather than semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). AI-driven testing is also entering the picture, with frameworks emerging for matching autonomy levels — fully specified, bounded, or fully adaptive — to workflow goals like regression or exploration [Agentic AI testing](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test).

Shell tooling remains foundational even as the stack grows. Readline key bindings, history search, brace expansion, process substitution, and script safety flags are the kind of underused primitives that compound into hours saved [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your). SSH key generation, agent forwarding, and commit signing are the DevOps equivalent — securing connectivity across multiple remotes without PAT tokens [Using SSH Keys to Make Connectivity Simpler and Secure](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure).

AI coding assistants have become a tooling category of their own, with significant surface area around safety and correctness. Running Claude Code inside Docker's sbx sandbox prevents credential leaks and accidental production data destruction while still allowing full auto-approve mode [If You're Running Claude Code, PLEASE Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box). Vet, an open-source local code review tool, reads an agent's conversation history alongside the diff to catch mistakes that standard review misses — silently skipped tests, swapped-in fake data [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes). Latchkey takes a complementary approach, injecting API credentials locally so agents can authenticate against services without ever seeing raw tokens [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents). Supply chain risk has also materialized concretely: the TeamPCP actor poisoned four SAP-ecosystem npm packages with a credential-stealing payload that abused Claude Code and VS Code configs as persistence vectors [SAP-Related npm Packages Compromised](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing).

The Databricks AI Dev Kit composes an MCP server, markdown skills, a Python core library, and a full-stack builder app to bring platform-specific expertise into Claude Code, Cursor, Gemini CLI, and others [databricks-solutions/ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit). Storybloq persists AI coding session context across sessions via a .story/ directory of JSON files, making stateless assistants compound across time [Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). Zerostack, built in Rust, achieves \~16MB RAM versus \~300MB for JS-based agents by pairing multi-provider LLM support with a terminal UI and a permission system [gi-dellav/zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack).

Platform engineering sits above all of this, providing the internal developer platforms that abstract infrastructure so product teams can move without becoming ops experts [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end). Tools like Radar unify Kubernetes topology, Helm, GitOps, image inspection, and cluster audits into a single binary, replacing five separate tools [Radar | The Missing Kubernetes UI](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui). The frontend's own tooling history traces the same pattern: each layer of the current 44-layer stack was built to solve a specific pain from the layer below [The Descent](/reading/2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent), and merge queue correctness failures show that even mature CI infrastructure harbors subtle architectural bugs with production consequences [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).
