---
title: Engineering craft
summary: >-
  Engineering craft is the judgment, discipline, and accumulated tacit knowledge
  that separates working code from good code — covering everything from module
  design and performance optimization to communication, tooling habits, and
  resisting shortcuts.
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
  - >-
    2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters
  - 2026-07/2026-07-16t043206-i-stopped-destructuring-everything
  - >-
    2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent
  - 2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time
  - 2026-08/2026-08-03t025839-dont-be-a-meat-proxy
  - >-
    2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms
  - >-
    2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude
  - 2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic
compiled_at: '2026-11-10T01:18:43.246Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10087
    output_tokens: 1663
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
  cost_usd: 0.055206
---
Engineering craft is the difference between code that runs and code that holds up. It shows up in the small decisions — how a function is named, whether a dependency is trusted, how much complexity a module interface hides — and in the larger habits of mind that experienced engineers carry without being able to fully articulate them.

That last point is central. [cekrem's reading of Polanyi](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) argues that the most valuable engineering knowledge — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to documentation or AI tools and can only be transmitted through apprenticeship. This is not a complaint about documentation quality; it is a claim about the nature of expertise. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) makes an adjacent point: senior engineers think in terms of complexity management while the rest of the business thinks in terms of uncertainty reduction, and failing to bridge that gap is one of the most common ways technical expertise goes to waste.

Module design is one place where craft becomes legible. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues for deep modules — small interfaces hiding large implementations — as a primary tool for controlling complexity, and notes that this property also makes systems easier for LLMs to reason about. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies a parallel principle to Angular: components bloated with dozens of inputs should be refactored using the Composite Components pattern so each concern stays encapsulated and APIs remain clean. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) adds that SRP is widely misread as "do one thing" when it actually means cohesive grouping under a single accountable responsibility — and that over-granularizing violates the cognitive simplicity SRP exists to provide.

Craft also shows up in tooling habits that most engineers treat as background noise. [Christian Hofstede-Kuhn](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) documents Readline bindings, history search, and script safety flags that reduce friction and prevent silent failures. [Ben Gesoff](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) describes a Jujutsu workflow for reviewing large PRs that persists progress in version control rather than relying on memory or stash management. [Ally Piechowski](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) outlines five git log commands that diagnose churn hotspots, bus factor, and bug clusters before reading a single file — a habit that front-loads understanding rather than accumulating it through painful surprises.

Performance work is another expression of craft: not chasing numbers for their own sake, but understanding why a number matters. [Arthur Pastel's optimization of image-rs fast_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) shows the value of understanding arithmetic at the integer level — replacing float ops and costly division with reciprocal multiplication to achieve a 5.9x speedup. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) provides the necessary counterweight: attention thresholds, discrete capacity increments, and pipeline backpressure mean that even order-of-magnitude improvements often fail to change outcomes. Knowing when performance matters is as much craft as achieving it.

Production discipline is where craft becomes risk management. [Anton Zaides' unwritten laws](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) — roll back before debugging, treat every external dependency as a future outage — are the kind of rules learned through incidents rather than textbooks. [Marc Brooker's argument about TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) is a case study in the same mode: a default that made sense on 1980s hardware silently kills latency in modern datacenters, and knowing to question it is a mark of experience.

The AI coding moment has made craft newly contentious. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues that AI lowers the cost of producing code but not the cost of owning it — taste and judgment matter more, not less, because LLMs can generate well-formatted technical debt faster than any engineer could. [Paolo Galeone](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) calls for strong CI/CD and code ownership to use AI as an amplifier rather than a crutch. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) makes the sharper claim that shipping AI-generated code without review is reckless and incompatible with safety-critical systems. [Anton Zaides' later piece](/reading/2026-07/2026-07-07t170607-the-software-engineering-war) frames the tension as "builders" versus "keepers" — with where you land depending partly on who is in the room.

Craft is also social. [Robert Nystrom's Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is itself an artifact of craft: a book that weaves prose and working code into a single coherent artifact, demonstrating that writing clearly about implementation is part of the work. [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) argues that algorithm interviews test a narrow trainable skill that weakly correlates with production performance — real engineering is reading tradeoffs, shipping incrementally, and handling messy unbounded real-world inputs.
