---
title: Engineering craft
summary: >-
  Engineering craft covers the judgment, tacit knowledge, and deliberate
  practice that separate functional code from software that holds up —
  encompassing design intuition, tooling fluency, code clarity, and honest
  tradeoff reasoning.
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
compiled_at: '2026-06-23T01:25:15.927Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7362
    output_tokens: 1274
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
  cost_usd: 0.041196
---
Engineering craft is not a single technique but a disposition that runs through every decision a working engineer makes: how to structure a component, when to reach for a shell shortcut, how to read a codebase's history before touching it, and whether the thing being built will survive contact with real conditions.

The tacit dimension of that judgment is hard to transfer. [cekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Michael Polanyi's philosophy to argue that pattern recognition and design intuition are structurally inaccessible to AI tools precisely because they are never fully articulated. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) points at a related gap: senior engineers think in complexity management, while the rest of the organization thinks in uncertainty reduction, and that translation failure is a craft problem as much as a communication one.

Craft shows up in small decisions as much as architectural ones. Christian Hofstede-Kuhn catalogs shell shortcuts and script safety flags that accumulate into real fluency over time. [Ally Piechowski](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) applies the same sensibility to git log commands that diagnose a codebase's risks before a single file is opened, and extends it to [week-one Rails audits](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) that start with stakeholder interviews rather than grep. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills production-incident experience into rules like rolling back before debugging and treating every external dependency as a future outage.

Design clarity is part of craft too. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that deep modules, small interfaces hiding large implementations, reduce complexity for both humans and tools. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects the common misreading of SRP, showing that over-granularizing classes destroys the cognitive simplicity the principle was meant to create. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same logic to Angular: components bloated with dozens of inputs should be decomposed into directives and sub-components that keep each concern contained.

Front-end craft has its own texture. [Amit Sheen](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that modern UIs should replace viewport breakpoints with intrinsic layouts and container queries. [Adrian Bece](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) works through the math and accessibility implications of fluid typography with CSS clamp. The point in both cases is the same: reaching for the idiomatic tool, not the habitual one.

Performance work is craft made visible in numbers. [Arthur Pastel](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) achieves a 5.9x speedup in Rust by replacing float arithmetic with integer accumulators and division with reciprocal multiplication, a sequence of targeted micro-decisions rather than a single insight.

Quality and judgment converge in the AI era. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) observes that LLMs can generate polished technical debt faster than any individual engineer, which raises the cost of bad taste rather than eliminating it. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) argues that shipping AI-generated code without review is categorically reckless in safety-critical systems. And [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) notes that algorithm interview prep trains a narrow skill that weakly correlates with what production engineering actually requires: reading tradeoffs, shipping incrementally, handling messy real-world inputs.

Craft, across all of these, is the accumulated capacity to make the right call in conditions that no checklist fully anticipates.
