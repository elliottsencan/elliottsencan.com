---
title: Engineering craft
summary: >-
  Engineering craft is the accumulated discipline of writing, organizing, and
  maintaining software well — spanning code design, tooling fluency,
  communication, and the judgment to know when technical excellence actually
  changes outcomes.
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
compiled_at: '2026-07-09T23:21:56.143Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8403
    output_tokens: 1412
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
  cost_usd: 0.046389
last_source_added: '2026-07-14T06:34:57.884Z'
---
Craft in software engineering is not a single skill but a posture: the habit of caring about how something is built, not just whether it ships. Several threads run through the sources here, and they reinforce each other in ways that are worth naming directly.

The most direct argument for craft is the one about ownership cost. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI has lowered the cost of producing code but not the cost of living with it — taste and judgment remain necessary because LLMs generate polished technical debt faster than any individual ever could. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) pushes this further, arguing that shipping AI-generated code without review is incompatible with safety-critical systems and causes measurable skill atrophy over time. Both pieces frame craft not as aesthetic preference but as risk management.

Good design principles are a recurring vehicle for that risk management. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that Angular components bloated with dozens of inputs should be refactored into composites so each concern stays encapsulated and APIs remain clean. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes a complementary point: deep modules — small interfaces hiding large implementations — reduce complexity for both humans and LLMs. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects a common misreading of the Single Responsibility Principle, showing that over-granularizing classes violates the cognitive simplicity SRP is meant to provide. [Dominik TkDodo](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) extends the organizing-by-cohesion argument to file structure, advocating domain verticals over horizontal technical layers.

Craft at the system level means knowing which improvements actually matter. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) describes how attention thresholds, discrete capacity increments, and pipeline backpressure make even order-of-magnitude speedups irrelevant in practice. [Arthur Pastel](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) shows the flip side: when the bottleneck is real, systematic optimization — replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication — yields a 5.9x speedup. Both pieces together illustrate the judgment call at the center of craft: knowing when to optimize and when not to bother.

Tooling fluency is part of craft too. Christian Hofstede-Kuhn catalogs Readline bindings, history search, and script safety flags that reduce friction at the shell. [Ally Piechowski](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) demonstrates how five git log commands can map codebase risk before reading a single file. [Ben Gesoff](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) offers a Jujutsu workflow for reviewing large changes that trades cognitive overhead for progress persisted in version control.

Craft includes knowing what to trust. [lab174](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) traces YAML's Norway problem — a type-coercion bug where NO parses as false — through spec versions and shows that popular libraries still exhibit the issue a decade after the fix landed, a reminder that specification correctness and implementation reality diverge. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills production-incident lessons into rules like rolling back before debugging and treating every external dependency as a future outage.

Finally, craft extends to how engineers transmit and communicate what they know. [cekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Polanyi's philosophy of tacit knowledge to argue that the most valuable engineering expertise — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI tools and can only be passed on through apprenticeship. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) identifies a parallel gap in communication: senior developers frame problems as complexity management while the rest of the organization thinks in terms of uncertainty reduction, and bridging that gap is itself a craft skill. [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes the point from the hiring side: algorithm interviews test a narrow, trainable skill that weakly correlates with production performance, where real craft means reading tradeoffs and shipping incrementally against messy, unbounded inputs.
