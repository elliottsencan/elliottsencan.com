---
title: Software engineering
summary: >-
  Software engineering spans the practices, principles, and tradeoffs that
  distinguish producing working code from building systems worth owning — a
  distinction that AI tools have sharpened without resolving.
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
compiled_at: '2026-06-21T18:28:04.955Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14556
    output_tokens: 1776
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
  cost_usd: 0.070308
---
The gap between writing code and engineering software has always been the gap between local correctness and systemic consequences. A function that passes tests, ships fast, and accumulates invisible debt is not software engineering done well. The sources collected here keep returning to that gap from different angles.

One axis is skill and its erosion. Lars Faye [argues](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that full agentic coding workflows accelerate skill atrophy by inverting developer priorities toward speed over understanding. Pete Millspaugh proposes a ["Slow Mode"](/reading/2026-05/2026-05-19t193626-slow-mode) that keeps the human in the loop at every step, explicitly trading short-term productivity for long-term code ownership. Abednego Gomes [makes the stronger claim](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) that shipping AI-generated code without review is categorically incompatible with safety-critical systems. Christoph Spörk [extends the argument](/reading/2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot) to organizational memory: dependency on LLMs erodes institutional knowledge the same way a lobster fails to notice gradually heating water.

A second axis is what expertise actually is. Tuhin Nair [observes](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) that senior developers communicate in terms of complexity management while the rest of the business thinks in uncertainty reduction, and that bridging that gap is harder than any technical problem. cekrem [grounds this in Polanyi's tacit knowledge](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you): the most valuable engineering expertise — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI tools and can only be transmitted through apprenticeship.

A third axis is design principles that outlast any particular tool. The Go Monk piece [on deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce complexity for both humans and LLMs. Henrique Teixeira [corrects a widespread misreading of SRP](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle): the principle means cohesive grouping under a single accountable responsibility, not atomizing classes into uselessness. Kobi Hari [applies this concretely to Angular](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) by arguing that components bloated with dozens of inputs should be refactored via the Composite Components pattern. Yusuf Aytas [sharpens the economics](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter): AI lowers the cost of producing code but not the cost of owning it, so taste and judgment still matter because LLMs can generate polished technical debt faster than any engineer ever could.

Fourth: what production systems actually require. Anton Zaides [distills hard-won rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) from real incidents — roll back before debugging, treat every external dependency as a future outage. Sam Alba [shows what CI looks like at scale](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team): 575K weekly jobs and 33M test executions demand automated triage, not manual debugging. The Playwright guides from Currents cover [semantic test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) and [staging-vs-production splits](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) as practical expressions of the same principle: coupling tests to implementation details rather than stable semantics is a form of technical debt. Emphere [extends testing discipline to security tools](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people), building red runs that prove the system fails loudly when it overclaims certainty.

Fifth: tools and craft. Fagner Brack [argues](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) that algorithm interviews test a narrow trainable skill that weakly correlates with production performance — real engineering means reading tradeoffs and shipping incrementally. Arthur Pastel [demonstrates that craft](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) concretely: a step-by-step Rust optimization replacing float arithmetic with integer accumulators achieves a 5.9x speedup. Ben Gesoff [describes a Jujutsu workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) for reviewing large PRs by squashing reviewed files into a persisted parent commit, reducing cognitive overhead without abandoning version control discipline. Ally Piechowski covers [pre-read git commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) for diagnosing codebase risk and [a week-one Rails audit process](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) that starts with stakeholder interviews before running any tools.

Daniel Stenberg [adds a dose of empiricism](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs): despite powerful new AI-assisted static analysis, curl's vulnerability-age and bugfix-rate data show no measurable sign that open-source projects are approaching zero latent bugs. Yaron Minsky [sees a different trajectory](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming): agentic coding has made formal verification newly cost-effective by lowering the cost of writing proofs and by creating demand for correctness guarantees that tests alone cannot provide. The two positions are not incompatible — they agree that tool proliferation does not automatically produce better software.

The through-line is that software engineering is not a set of practices that AI either replaces or leaves intact. It is a discipline of managing complexity over time, which requires judgment that must be cultivated, transmitted, and applied with full understanding of the systems involved.
