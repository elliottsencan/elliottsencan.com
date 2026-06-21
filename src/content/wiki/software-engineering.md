---
title: Software Engineering
summary: >-
  Software engineering as a craft spans design principles, tooling choices,
  testing discipline, and team practices — and the sources here collectively
  stress that writing code is rarely the binding constraint on quality or
  velocity.
sources:
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - >-
    2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t230919-dmytro-mezhenskyi-udmezhenskyi-on-reddit
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your
  - 2026-04/2026-04-30t231909-the-great-css-expansion
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-05/2026-05-02t094735-approaching-zero-bugs
  - 2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot
  - 2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - >-
    2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like
  - 2026-05/2026-05-05t091632-building-websites-with-llms
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-05t135637-reddit-rdevops
  - 2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code
  - 2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt
  - >-
    2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile
  - 2026-05/2026-05-10t205349-github-is-sinking
  - 2026-05/2026-05-10t213609-raiyanyahyahow-to-train-your-gpt
  - >-
    2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about
  - >-
    2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise
  - 2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs
  - >-
    2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - 2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively
  - 2026-05/2026-05-18t113714-yaml-thats-norway-problem
  - >-
    2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you
  - 2026-05/2026-05-19t193626-slow-mode
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - 2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter
  - >-
    2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a
  - 2026-05/2026-05-28t074225-welcome-robot-overlords-please-dont-fire-us
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-05/2026-05-31t164554-jj-vcsjj
  - 2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle
  - 2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering
  - >-
    2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with
  - >-
    2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code
  - 2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack
  - 2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - 2026-06/2026-06-17t075738-gunnargray-devunicode-animations
  - 2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code
  - >-
    2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week
  - 2026-06/2026-06-21t130526-agentic-engineering
compiled_at: '2026-06-21T20:12:15.226Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14702
    output_tokens: 1760
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
  cost_usd: 0.070506
---
The claim that code is cheap but ownership is expensive runs through several of these sources. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) puts it directly: AI lowers the cost of producing code but not the cost of maintaining it, and LLMs can generate well-formatted technical debt faster than any individual engineer. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) pushes further, arguing that full agentic workflows invert developer priorities toward speed over understanding and create vendor dependency that erodes the judgment needed to evaluate what gets shipped. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) calls "vibe coding" — shipping AI-generated code without review — categorically incompatible with safety-critical systems.

The bottleneck framing matters here. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues the real constraints have always been organizational: shared context, specification clarity, and management coherence. Coding agents amplify whatever alignment or misalignment already exists. [Christoph Spörk](/reading/2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot) adds the dependency angle, warning that LLM reliance erodes institutional knowledge gradually enough that teams don't notice until the cost shock hits.

Design principles surface repeatedly as the foundation that outlasts any particular tool. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues for deep modules — small interfaces hiding large implementations — as the structural property that makes systems legible to both humans and LLMs. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects the common misreading of SRP: the principle means cohesive grouping under a single accountable responsibility, not maximum granularity, and over-splitting classes violates the cognitive simplicity the principle was designed to provide. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same intuition to Angular components, replacing input-bloated monoliths with the Composite Components pattern.

Testing and verification sit at the intersection of craft and operational discipline. [Currents Team](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues Playwright tests break during refactors not from bad selectors alone but from coupling to implementation details rather than semantic roles. [Sam Alba](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) shows what CI looks like at genuine scale: 575K weekly jobs, 33M test executions, and an AI agent that ingests billions of log lines to trace flaky tests to root causes and open fix PRs automatically. [Daniel Stenberg](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) uses curl's vulnerability data to note that despite powerful AI-assisted static analysis, there's no measurable sign yet that open-source projects are approaching zero latent bugs. [Yaron Minsky](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) sees formal methods becoming newly cost-effective as agentic coding both lowers the cost of writing proofs and creates urgent demand for verification tools beyond what tests alone can provide.

Security is a persistent structural concern, not an afterthought. [Dan Goodin](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) reports attackers encoding payloads in invisible Unicode variation-selector characters across 151 malicious npm and GitHub packages — undetectable by reviewers and most static analysis tools, executable at runtime. The attack surface extends to the platforms themselves: [David Bushell](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues GitHub's reliability has declined enough under Microsoft that migration to alternatives like Codeberg or self-hosted Forgejo is warranted.

Knowledge transfer and team practice round out the picture. [cekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Polanyi to argue that the most valuable engineering expertise — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI tools and can only be transmitted through apprenticeship. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) frames the communication gap differently: senior developers speak in complexity management while the rest of the business thinks in uncertainty reduction, and bridging that gap is the real challenge of expertise. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills the operational side into hard-won rules — roll back before debugging, treat every external dependency as a future outage — drawn from real production incidents.

Versioning and code archaeology tools extend engineering judgment across time. [Ben Gesoff](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) describes using Jujutsu's first-class conflict model to review large PRs incrementally, persisting progress in version control without Git stash overhead. [Ally Piechowski](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) shows how git log queries for churn hotspots, bus factor, and bug clusters diagnose a codebase's risks before opening a single file — a complement to the week-one Rails audit approach she also describes ([audit piece](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week)), which starts with stakeholder interviews to surface fear and knowledge gaps before running any tooling.

[Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) ties the hiring-to-practice gap together: algorithm interviews test a narrow, trainable skill that weakly correlates with production performance, while real engineering requires reading tradeoffs, shipping incrementally, and building systems that handle messy unbounded inputs. The discipline is fundamentally about judgment under uncertainty, and no tool — however capable — substitutes for that.
