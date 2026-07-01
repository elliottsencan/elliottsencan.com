---
title: Developer tooling
summary: >-
  Developer tooling spans the editors, CLIs, version control workflows, testing
  infrastructure, and AI coding assistants that shape how software gets built,
  reviewed, and shipped safely.
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
compiled_at: '2026-07-01T04:45:55.693Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14190
    output_tokens: 1732
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
  cost_usd: 0.06855
---
The range of tools covered here cuts across every layer of the development lifecycle: version control, shell environments, test infrastructure, AI coding agents, package ecosystems, and the platforms that host and run code. What ties these sources together is a common pressure: as codebases and AI-assisted workflows grow more complex, the tools that mediate them either reduce friction or multiply it.

At the version control layer, [Jujutsu](/reading/2026-05/2026-05-31t164554-jj-vcsjj) offers a Git-compatible alternative that auto-commits the working copy and treats conflicts as first-class objects. A practical workflow built on top of it lets reviewers [tackle large pull requests incrementally](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) by squashing reviewed files into a parent commit, persisting progress without stash gymnastics. The gap between what Git currently offers and what developers actually want is articulated as a [wishlist for a better code forge](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github): pre-commit remote CI, stacked PRs as first-class citizens, nuanced approval flows, and a self-hostable footprint smaller than GitHub Enterprise. Meanwhile, [GitHub's reliability is described as deteriorating](/reading/2026-05/2026-05-10t205349-github-is-sinking), with the case that developers should migrate to alternatives like Codeberg or Forgejo before conditions worsen further. A concrete consequence of trusting platform internals appeared when a [GitHub merge queue bug silently deleted thousands of lines](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) by building on the wrong base commit; Trunk's architectural choice to never push temp branches to main avoided the incident.

Before reading any code in an unfamiliar repo, [five git log commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) diagnosing churn hotspots, bus factor, bug clusters, and firefighting frequency give a fast structural risk picture without opening a single file. SSH keys remain foundational for secure multi-machine authentication; a [practical DevOps guide](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) covers key generation, agent forwarding, and commit signing as alternatives to PAT tokens.

Shell ergonomics still matter. [Underused Readline bindings, history search, brace expansion, process substitution, and script safety flags](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) across POSIX, Bash, and Zsh remain sources of compounding time savings that developers skip.

On the testing side, [Playwright test suites break during UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) not primarily because of bad selector choices but because tests couple to implementation details like CSS classes and DOM structure rather than accessible roles and labels that survive redesigns. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) layers AI-powered reporting over Playwright runs, auto-categorizing failures as bugs, flaky tests, or UI changes. Type safety at the API boundary is another failure surface: [Zod schema validation paired with a custom RxJS operator in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time before they surface as runtime errors.

Package ecosystems introduce their own risk. [Four SAP-ecosystem npm packages were poisoned](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) with a credential-stealing, self-propagating payload that harvested cloud secrets and browser passwords, exfiltrating them via GitHub and abusing Claude Code and VS Code configs as persistence vectors. The supply chain is now an active attack surface, not a theoretical one.

AI coding assistants have become a tooling category of their own. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) brings Databricks expertise to Claude Code, Cursor, and Gemini CLI via an MCP server, markdown skills, and a Python core library. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across stateless AI coding sessions through a .story/ directory of JSON files. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's full conversation history alongside the diff to catch mistakes like silently skipped tests that standard code review misses. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeps API credentials encrypted on-device, injecting them into agent curl calls so agents can authenticate against 25+ services without seeing raw tokens. Security argues for running Claude Code inside Docker's sbx sandbox; [one guide](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) makes the case that full auto-approve mode is safe only inside such a container.

At the infrastructure layer, [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) is an open-source Kubernetes UI that unifies topology, Helm, GitOps, and audits across clusters in a single binary. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) offers codebase health scores, auto-generated docs, git analytics, and dead code detection via MCP. For observability in unfamiliar systems, [a guide to reading distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and tracing N+1 staircase patterns back to responsible code.

A recurring theme across these sources is that tooling choices have compounding effects. A wrong selector strategy accumulates brittle tests. A poisoned package propagates credentials silently. A misconfigured merge queue deletes code. Conversely, the right shell habits, the right git log queries, and the right sandbox discipline each reduce the surface area of failure before it reaches production.
