---
title: Engineering craft
summary: >-
  Engineering craft spans the judgment, tacit skill, and deliberate practice
  that separate producing code from building systems worth maintaining — a
  thread connecting module design, workflow discipline, and honest tradeoff
  reasoning.
sources:
  - 2026-04/2026-04-24t085352-building-a-ui-without-breakpoints
  - 2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp
  - >-
    2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - >-
    2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-05/2026-05-02t094735-approaching-zero-bugs
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
  - 2026-05/2026-05-05t091632-building-websites-with-llms
  - >-
    2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile
  - >-
    2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise
  - 2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs
  - >-
    2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession
  - 2026-05/2026-05-18t113714-yaml-thats-norway-problem
  - >-
    2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you
  - 2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter
  - 2026-05/2026-05-30t210309-90percent-of-the-t-distribution
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle
  - 2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering
  - >-
    2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with
  - 2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams
  - 2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - 2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code
  - >-
    2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week
  - 2026-06/2026-06-21t231758-nasa-technical-report-20070005136
  - 2026-06/2026-06-22t000701-the-idiot-index-for-code
  - 2026-06/2026-06-22t001042-how-to-leave
  - 2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good
  - 2026-06/2026-06-22t182141-the-systemic-decay-of-tech-hiring
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
  - 2026-06/2026-06-30t173037-a-return-to-two-pizza-culture
  - 2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter
  - 2026-07/2026-07-03t044356-project-gutenberg-document-33283
  - 2026-07/2026-07-04t141323-the-vertical-codebase
  - 2026-07/2026-07-07t170607-the-software-engineering-war
  - 2026-07/2026-07-09t070315-the-submarine
  - >-
    2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs
compiled_at: '2026-07-14T06:37:41.713Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8558
    output_tokens: 1410
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
  cost_usd: 0.046824
---
Engineering craft is not about any single technique. It is the accumulation of judgment that keeps systems from collapsing under their own weight. Several distinct threads run through the sources here: how to structure code so it stays manageable, how to build workflows that match the actual shape of problems, and how to think clearly about tradeoffs rather than defaulting to whatever is fashionable.

Structure is a recurring concern. [Go Monk's piece on deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce the cognitive surface area that anyone, human or LLM, must hold in mind. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) makes a related point about the Single Responsibility Principle: the common reading of "do one thing" misses the actual intent, which is cohesive grouping under a single accountable concern. Over-granularizing in pursuit of that misreading produces the very fragmentation SRP was meant to prevent. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) extends this into component design, showing how Angular components bloated with dozens of inputs can be refactored through composition so each concern stays encapsulated. [Dominik's case for the vertical codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) applies the same logic at the directory level: organizing by domain instead of technical layer keeps related code together and improves discoverability.

Workflow and tooling discipline matter as much as design decisions. [Ally Piechowski's git log commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) show how churn hotspots and bus-factor data surface risk before reading a single line. The [same author's Rails audit process](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) demonstrates that starting with stakeholder fear and knowledge gaps beats running automated tools first. [Ben Gesoff's Jujutsu review workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) turns large pull request review from a memory problem into a version-controlled incremental task. [Christian Hofstede-Kuhn's shell tricks](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) catalog underused primitives that reduce friction without adding complexity.

Truthful reckoning with tradeoffs is where craft diverges most sharply from cargo-culting. [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) argues that algorithm interviews test a narrow, trainable skill with weak correlation to production work, where reading tradeoffs and shipping incrementally matter more than any memorized solution. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) shows why even order-of-magnitude speed improvements often change nothing: attention thresholds, discrete capacity increments, and pipeline backpressure absorb gains before they reach users. [Arthur Pastel's image-rs optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) shows the reverse case, where targeted arithmetic changes produce a 5.9x speedup — but the method is deliberate profiling and mathematical reasoning, not guessing.

The question of what expertise even is runs underneath all of this. [Cekrem's essay on tacit knowledge](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Polanyi to argue that pattern recognition, design intuition, and unwritten conventions are structurally hard to articulate, which is why apprenticeship transmits them and documentation often cannot. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) identifies a related gap: senior engineers frame their value in terms of complexity management, while the rest of the organization thinks in terms of uncertainty reduction, and the inability to bridge that gap limits influence.

AI tools pressure all of this. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) observes that LLMs lower the cost of producing code but not the cost of owning it, meaning taste and judgment matter more, not less. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) argues that shipping AI-generated code without review is categorically incompatible with safety-critical systems and causes skill atrophy over time. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills production experience into concrete rules, among them rolling back before debugging and treating every external dependency as a future outage. These rules cannot be generated; they are earned.

Craft is the difference between writing code and building something that can be understood, changed, and trusted.
