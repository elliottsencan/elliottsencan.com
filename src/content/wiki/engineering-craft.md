---
title: Engineering craft
summary: >-
  Engineering craft encompasses the practical judgment, tacit knowledge, and
  disciplined decisions that separate maintainable systems from technically
  functional ones — spanning code structure, tooling fluency, testing, and
  communication of expertise.
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
compiled_at: '2026-07-02T12:28:09.844Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7860
    output_tokens: 1471
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
  cost_usd: 0.045645
---
Engineering craft is the gap between code that works and code worth owning. Multiple sources converge on the same diagnosis from different angles: producing output is easy; making sound decisions about structure, tradeoffs, and maintenance cost is the hard part.

The most direct statement comes from [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter), who argues that AI lowers the cost of generating code but not the cost of owning it. LLMs can produce polished, well-formatted technical debt faster than any individual engineer. Taste and judgment still determine whether the output is worth shipping. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) pushes further: "vibe coding" — shipping AI-generated code without review or testing — is reckless and incompatible with safety-critical systems, and habitual reliance on generated code causes skill atrophy that is difficult to reverse.

Tacit knowledge is central to what makes craft hard to transfer. [cekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you), drawing on Polanyi, argues that pattern recognition, design intuition, and unwritten conventions are structurally inaccessible to AI tools and can only be transmitted through apprenticeship. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) identifies a related failure: senior engineers speak in terms of complexity management while the rest of the business thinks in uncertainty reduction, and the gap between those framings erodes influence.

Good structure is a recurring theme. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues for deep modules — small interfaces hiding large implementations — because they reduce complexity for both human readers and LLMs. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) makes the same case at the component level: Angular components bloated with dozens of inputs should be decomposed using composition so each concern stays encapsulated. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects the common misreading of SRP — the principle is about cohesion under a single accountable responsibility, not granularity for its own sake. Over-splitting violates the very cognitive simplicity SRP is meant to provide.

Craft extends into tooling fluency. Christian Hofstede-Kuhn catalogs underused shell shortcuts and scripting safeguards — Readline bindings, history search, brace expansion, script safety flags — that reduce friction and prevent silent failures. [Ben Gesoff](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) demonstrates a Jujutsu workflow for reviewing large pull requests that preserves review progress in version control rather than mental state. Ally Piechowski surfaces git log patterns — churn hotspots, bus factor, bug clusters — that diagnose codebase risk before reading a single file.

Testing and verification are part of the craft conversation too. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents more than twenty recurring patterns AI tools introduce in generated tests, including over-mocking, happy-path bias, and writing tests to match a buggy implementation. [Yaron Minsky](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that agentic coding has made formal methods newly cost-effective by lowering proof-writing costs while simultaneously raising the stakes for verification.

Performance optimization is craft under constraints. [Arthur Pastel](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) traces a 5.9x speedup in Rust's image-rs blur function through a sequence of targeted substitutions — float to integer arithmetic, division to reciprocal multiplication — each change motivated by profiling rather than intuition. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) offers the counterpoint: attention thresholds, discrete capacity increments, and pipeline backpressure mean even order-of-magnitude gains often fail to change outcomes. The craft judgment is knowing which situation you are in.

[Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills the kind of heuristics that accumulate through production experience — roll back before debugging, treat every external dependency as a future outage — that rarely appear in formal training. [Robert Nystrom's Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) sits at the far end of the craft spectrum: a complete, rigorously constructed dual implementation of an interpreter in two languages, where the build system itself weaves code and prose into the finished artifact. It is an example of craft as sustained, deliberate practice over years.
