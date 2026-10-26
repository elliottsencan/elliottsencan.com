---
title: Engineering craft
summary: >-
  The discipline of writing, organizing, and maintaining software with intention
  — spanning low-level optimization, system design, code ownership, and the
  judgment to know when simplicity beats sophistication.
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
compiled_at: '2026-10-26T22:26:29.745Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10087
    output_tokens: 1613
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
  cost_usd: 0.054456
---
Engineering craft is the accumulation of small, deliberate decisions that separate code that merely works from code that holds up. It spans choices as fine-grained as whether to destructure a variable and as structural as how to divide a system's responsibilities.

At the level of individual code, craft often means resisting the reflexive move. [Matt Smith's case against automatic destructuring](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) is a minor example of a large principle: optimizing for the reader, not the writer. The same instinct drives [Arthur Pastel's step-by-step optimization of image-rs fast\_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs), which replaces float arithmetic with integer accumulators not for cleverness but for measurable, reasoned gain. The inverse failure — over-engineering — is described by [the idiot index metaphor](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code): code whose complexity far exceeds what the problem warrants is evidence of low-value work, the same signal as a manufactured part that costs ten times its raw materials.

At the module and component level, craft is largely about encapsulation and coherence. [The argument for deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) holds that a small public surface hiding large implementation reduces the cognitive load on every caller. [Angular's composite component pattern](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) makes the same point in a framework context: components bloated with dozens of inputs should be decomposed into directives and sub-components so each concern stays local. The [Single Responsibility Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) is widely distorted into "do only one thing" when it actually means grouping behaviors under a single accountable responsibility; over-granularizing classes violates the cognitive simplicity SRP is meant to provide.

At the system and codebase level, craft shows up in how structure is communicated and navigated. [Vertical codebase organization](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) — colocating files by domain rather than by technical layer — makes the relationships between features visible to both humans and automated tools. [Architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) fail when they obscure rather than clarify: unlabeled nodes, fan traps, and master diagrams trying to say everything at once are all failures of communication craft. [Git history as diagnostic tool](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) treats commit patterns as a map of where a codebase is fragile before a single line is read.

Process discipline is also craft. [The unwritten laws of software engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) — roll back before debugging, treat every external dependency as a future outage — encode lessons that only emerge from production incidents. Enforcing those constraints structurally, as [AST-based linting to ban manual DB commits](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) does, is the difference between a guideline and a guardrail. The Playwright CI optimization is craft applied to feedback loops: a test suite that takes too long stops being used.

The AI era has sharpened the question of what craft even means. [Yusuf Aytas observes](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) that AI lowers the cost of producing code but not the cost of owning it; LLMs can generate polished technical debt faster than any individual engineer. [Paolo Galeone's argument](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) is that strong CI/CD, code ownership, and engineering discipline are what keep AI as an amplifier rather than a replacement for judgment. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) is blunter: shipping AI-generated code without review is reckless and categorically incompatible with safety-critical systems. All three converge on the same point: the scarce resource is not code volume but judgment about what to keep.

That judgment includes knowing when a performance gain does not matter. [Colin Breck's analysis](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) shows that attention thresholds, discrete capacity increments, and pipeline backpressure can make even order-of-magnitude improvements invisible in practice. Craft means asking whether the improvement is felt before spending the effort, just as [Marc Brooker on TCP\_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows that the wrong default — Nagle's algorithm — can silently kill latency because nobody questioned an assumption baked in decades ago.

Finally, craft includes the ability to transmit what you know. [The tacit dimension argument](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) holds that the most valuable engineering expertise — pattern recognition, design intuition, unwritten conventions — is structurally difficult to articulate and can only be transmitted through apprenticeship. [Senior developers who fail to communicate their expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) often do so because they speak in terms of complexity management while their organizations think in terms of uncertainty reduction. Craft without communication is invisible; communication without craft is noise.
