---
title: Engineering craft
summary: >-
  Engineering craft is the set of judgment-driven practices — design intuition,
  deliberate simplicity, and domain-specific skill — that separate code that
  merely works from systems that remain maintainable, correct, and honest about
  their own complexity.
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
  - >-
    2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you
compiled_at: '2026-07-15T04:04:04.535Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8743
    output_tokens: 1386
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
  cost_usd: 0.047019
---
Craft in software engineering resists a clean definition, but a cluster of sources points at the same underlying concern: technical decisions carry costs that only become visible over time, and developers who cannot perceive those costs ship work that looks fine today and becomes a liability tomorrow.

The tension between speed and durability shows up explicitly in the debate over AI-generated code. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI lowers the cost of producing code but not the cost of owning it — LLMs can generate polished, well-formatted technical debt faster than any individual engineer ever could, which means taste and judgment matter more now, not less. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) frames the same concern more bluntly: shipping AI-generated code without review is reckless and causes skill atrophy, particularly for safety-critical systems where accumulated craft knowledge is non-negotiable.

That knowledge has a structural problem of its own. [cekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you), drawing on Michael Polanyi's philosophy, argues that the most valuable engineering expertise — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to documentation or AI and can only be transmitted through apprenticeship. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) reaches the same gap from a different angle: senior engineers communicate in terms of complexity management while the rest of the organization thinks in terms of uncertainty reduction, and bridging that translation gap is itself a craft skill.

Design decisions compound across layers of the stack. At the module level, [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that deep modules — small interfaces hiding large implementations — reduce complexity for both human readers and LLMs, because a narrow surface area limits what callers need to understand. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same principle to Angular components: a component bloated with dozens of inputs should be decomposed into directives and sub-components, so each concern stays encapsulated and the API remains legible. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) adds a necessary correction: the Single Responsibility Principle is not "do one thing" but "group behaviors under one accountable concern" — over-granularization violates the cognitive simplicity SRP is meant to provide.

Craft also shows up in how engineers orient to an unfamiliar codebase. [Ally Piechowski](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) begins a Rails audit with stakeholder interviews before touching any tools, reading for fear and knowledge gaps rather than just code paths. The companion piece on [git log commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) argues that churn hotspots, bus factor, and bug clusters visible in version history reveal systemic risks faster than any static scan. Both approaches treat the codebase as a record of past decisions with embedded risk, not just a working artifact.

At the implementation level, craft means knowing which tools match which problems. [Arthur Pastel](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) demonstrates what careful optimization looks like: replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication to achieve a 5.9x speedup, each change motivated by profiling rather than assumption. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) provides the necessary counterweight, showing that even order-of-magnitude gains fail to change outcomes when attention thresholds, capacity increments, or pipeline backpressure absorb the improvement before it reaches the user.

[Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) observes that algorithm interviews test a narrow, trainable skill that weakly correlates with production performance. Real engineering requires reading tradeoffs, shipping incrementally, and building systems that handle messy, unbounded real-world inputs — work that looks nothing like a whiteboard problem. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills the production-side version of that lesson into rules like rolling back before debugging and treating every external dependency as a future outage: heuristics earned through incidents rather than coursework.

Craft is ultimately the accumulation of that earned judgment — knowing when a performance gain matters and when it does not, when to decompose a module and when decomposition multiplies complexity, when to trust a tool and when to read past what it outputs. The sources here collectively resist any shortcut to that accumulation.
