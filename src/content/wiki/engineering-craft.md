---
title: Engineering craft
summary: >-
  The deliberate, judgment-driven practices that separate functional code from
  maintainable systems — covering module design, code quality, tooling fluency,
  and the tacit knowledge that holds production software together.
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
compiled_at: '2026-07-01T01:59:17.645Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7860
    output_tokens: 1272
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
  cost_usd: 0.04266
---
Engineering craft is the accumulated set of practices, habits, and judgment calls that separate code that ships from code that lasts. It spans everything from how a function is named to how a codebase is audited after years of neglect, and its defining characteristic is that much of it resists explicit documentation.

The craft starts with design principles, though even foundational ones are frequently misunderstood. The Single Responsibility Principle, for instance, is widely treated as a mandate to break everything into the smallest possible pieces; [the actual principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) is about cohesive grouping under a single accountable responsibility, and over-granularizing violates the cognitive simplicity SRP exists to protect. The same tension applies to module boundaries: [deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) — small interfaces hiding large implementations — reduce the complexity surface for both human readers and LLM tools, while shallow modules spread concerns across too many layers and make systems brittle.

On the implementation side, craft shows up in the specifics. The step-by-step [optimization of image-rs fast_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) — replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication for a 5.9x speedup — demonstrates what careful, evidence-driven performance work looks like. [Shell fluency](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) matters too: knowing Readline key bindings, history search, brace expansion, and script safety flags [reduces friction in daily work](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) in ways that compound over time.

Production discipline is a distinct layer. [Hard-won engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) — roll back before you debug, treat every external dependency as a future outage — exist because the costs of not following them have already been paid in real incidents. [Large code reviews](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) benefit from structured workflows like Jujutsu's duplicate-and-squash technique, which lets reviewers persist progress without the cognitive overhead of ad-hoc bookmarking. And [reading a codebase before touching it](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) — using git churn, bus factor, and bug cluster data to map risk before opening a single file — is itself a craft skill, as is [auditing a legacy system](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) by starting with stakeholder interviews rather than static analysis.

AI's effect on craft is contested. [Vibe coding](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) — shipping AI-generated code without review — causes skill atrophy and is categorically incompatible with safety-critical systems. [AI-generated tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) introduce characteristic smells: over-mocking, happy-path bias, and tests that encode buggy behavior rather than intended behavior. At the same time, [lower code-generation costs don't lower ownership costs](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) — taste and judgment still determine whether what gets shipped is an asset or debt. [Formal verification](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) may become more cost-effective as agents lower the cost of writing proofs, but the demand for human judgment in scoping and interpreting those proofs doesn't go away.

The deepest layer of craft is tacit. [Drawing on Polanyi's philosophy](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you), pattern recognition, design intuition, and unwritten conventions are structurally inaccessible to AI tools and can only be transmitted through apprenticeship. This also explains why [senior developers often fail to communicate their expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise): they operate in the vocabulary of complexity management while the rest of the organization thinks in terms of uncertainty reduction. Bridging that gap is itself a craft, and one that rarely appears in any job description.
