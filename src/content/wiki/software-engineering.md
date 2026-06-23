---
title: Software engineering
summary: >-
  Software engineering spans coding craft, system design, tooling, testing, and
  the organizational dynamics that shape whether any of it produces working,
  maintainable software — a set of tensions AI is currently reshaping without
  resolving.
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
  - 2026-06/2026-06-21t231454-spacex-and-the-sentient-sun
  - 2026-06/2026-06-22t000701-the-idiot-index-for-code
compiled_at: '2026-06-23T00:06:58.869Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14901
    output_tokens: 1687
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
  cost_usd: 0.070008
---
Software engineering is not a single discipline but a cluster of interrelated concerns: how to write code that is correct and readable, how to structure systems that survive change, how to test and verify behavior, how to operate code reliably at scale, and how to work with other people in ways that don't undermine all of the above.

On craft, the sources here keep returning to the same problem: that the obvious, expedient approach tends to produce systems that are expensive to own. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) puts this directly — AI lowers the cost of producing code but not the cost of owning it, and an LLM can generate polished technical debt faster than any individual engineer. The [Go Monk piece on deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes the related argument that small interfaces hiding large implementations reduce complexity for both humans and LLMs, contrasting this with shallow module designs that expose implementation noise. [Henrique Teixeira on SRP](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the Single Responsibility Principle is routinely misread as "do one thing" when it actually means grouping behaviors under a single coherent accountability — over-granularizing classes violates the very cognitive simplicity SRP is meant to provide.

Testing and verification form a second cluster. [Designing Playwright tests](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that test suites break during refactors not because of bad selector choices but because tests couple to implementation details rather than semantic roles. [CI at scale](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) describes AI-assisted triage handling 575K weekly jobs at PostHog, automatically tracing flaky tests to root causes. Yet [Daniel Stenberg's analysis of curl](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable sign that AI-assisted static analysis is actually reducing latent bug counts in open-source projects. [Jane Street's Yaron Minsky](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) adds a different angle: agentic coding has made formal verification newly cost-effective, both by lowering the cost of writing proofs and by creating urgent demand for tools that go beyond what tests alone can guarantee.

On AI's role in day-to-day coding, sources disagree about degree rather than direction. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full agentic workflows accelerate skill atrophy, invert developer priorities toward speed over understanding, and create vendor dependency. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) goes further, calling vibe coding — shipping AI-generated code without review — reckless and categorically incompatible with safety-critical systems. [Pete Millspaugh's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) responds by describing an agent that keeps humans involved at every step, trading short-term productivity for genuine learning. [Jappie Software](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) locates the problem elsewhere — weak type systems, org processes built for human-speed development, and lack of agent-management training explain why AI tools rarely deliver promised gains. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) frames it organizationally: coding agents amplify whatever alignment or misalignment already exists, because the real bottleneck was always shared context and specification clarity, not code production speed.

Knowledge and expertise pose a persistent challenge. [cekrem, drawing on Polanyi](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you), argues that the most valuable engineering expertise — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI tools and can only be transmitted through apprenticeship. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) makes the complementary point that senior engineers communicate in terms of complexity management while the rest of the business thinks in terms of uncertainty reduction, and bridging that gap is the real challenge of engineering expertise. [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) reinforces this: algorithm interviews test a narrow trainable skill that weakly correlates with production performance, where real engineering means reading tradeoffs and shipping incrementally against messy real-world inputs.

Tooling and operations round out the picture. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills seven production-hardened rules — roll back before debugging, treat every external dependency as a future outage — from real incidents. [Ally Piechowski's git audit workflow](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) uses churn hotspots, bus factor, and bug cluster data to diagnose a new codebase's risks before reading a single file. [Ben Gesoff on Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) describes a workflow for reviewing large pull requests that persists progress in version control without cognitive overhead. Supply-chain integrity sits at the edge of all of this: [the invisible Unicode attack on npm](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) encoded malicious payloads in variation-selector characters undetectable by code reviewers and static analysis, which is a reminder that the trust model for third-party code remains fundamentally unresolved.

Across all of this, the consistent thread is that software engineering problems are rarely just technical. Organizational structure, communication gaps, knowledge transmission, testing philosophy, and dependency trust each shape whether the technical work actually lands.
