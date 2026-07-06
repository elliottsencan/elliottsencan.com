---
title: Engineering craft
summary: >-
  Engineering craft is the disciplined judgment that separates producing code
  from building software that lasts — spanning design intuition, system
  thinking, communication, and the principled handling of tradeoffs under real
  conditions.
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
compiled_at: '2026-07-06T00:14:02.011Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8138
    output_tokens: 1423
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
  cost_usd: 0.045759
---
Engineering craft is not a single practice but a cluster of habits and dispositions that distinguish work built to last from work that merely ships. The sources here approach it from different angles — language implementation, CSS layout, component design, performance tuning, tooling fluency, and professional communication — but a consistent thread runs through all of them: craft is what survives contact with production.

At the technical level, craft means understanding the thing you are building well enough to know when to stop. [Deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) — small interfaces hiding large implementations — reduce the cognitive surface area of a system for both humans and LLMs. That same instinct for encapsulation shows up in component design: [Kobi Hari's case against input-bloated Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that moving features into directives and sub-components keeps APIs honest. And [the Single Responsibility Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle), properly understood, is not "do one thing" but "have one reason to change" — over-granularizing classes is its own kind of violation.

Craft at the CSS layer is similar. [Amit Sheen's case for intrinsic layouts](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) and [Adrian Bece's guide to fluid typography with clamp()](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) both argue that reaching for breakpoints first is a failure of design thinking — the correct tool is one that encodes the constraint directly rather than patching it at specific viewport widths. [Sunkanmi Fafowora's piece on CSS ::checkmark](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) makes the same point about progressive enhancement: the platform-native solution is more durable than the JavaScript workaround, even if browser support lags.

Performance work is a domain where craft is especially visible. [Arthur Pastel's 5x speedup of image-rs fast\_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) shows what disciplined iteration looks like: replace float arithmetic with integer accumulators, replace division with reciprocal multiplication, measure at each step. But [Colin Breck's counterpoint](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) is equally part of the craft — attention thresholds, capacity increments, and pipeline backpressure mean that even order-of-magnitude improvements can fail to change outcomes. Knowing when a gain matters is as important as achieving it.

Tooling fluency is underrated as a craft concern. Christian Hofstede-Kuhn's shell tricks guide and [Ben Gesoff's Jujutsu review workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) both demonstrate that knowing your tools deeply — not just adequately — compounds over time. [Ally Piechowski's git-before-reading-code commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) make the same case: codebase understanding is itself a craft, and the right five commands reveal risk faster than reading files.

Craft also has a social and communicative dimension. [Tuhin Nair's piece on senior developer communication](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) argues that expertise expressed only in complexity terms fails to land with a business that thinks in uncertainty reduction. [The tacit dimension essay](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) goes further: the deepest engineering knowledge — pattern recognition, design intuition, unwritten conventions — cannot be articulated at all and can only be transmitted through apprenticeship. That structurally inaccessible expertise is precisely what AI tools cannot replicate.

Two sources bracket the AI moment directly. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI lowers the cost of producing code but not the cost of owning it — LLMs generate polished technical debt faster than any individual engineer ever could. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) makes the stronger claim that shipping AI-generated code without review is reckless and causes skill atrophy. Craft, on both accounts, is the judgment layer that code generation cannot replace.

[Robert Nystrom's Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) names the disposition directly: the book exists because understanding how a language works, at the implementation level, changes how you use it. That kind of grounded, first-principles knowledge is what craft looks like when taken seriously.
