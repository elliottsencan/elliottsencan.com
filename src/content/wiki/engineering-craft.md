---
title: Engineering craft
summary: >-
  Engineering craft is the discipline of writing software with deliberate
  judgment — knowing when to simplify, when to verify, when to resist
  convenience, and why those choices matter more than any single tool or
  technique.
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
compiled_at: '2026-10-13T00:16:02.155Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10087
    output_tokens: 1791
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
  cost_usd: 0.057126
---
Craft in software engineering is not about ceremony or perfectionism. It is the accumulated set of judgments that separate code that works today from systems that stay workable over time. The sources tagged here converge on a few recurring tensions: the temptation to equate output volume with quality, the difficulty of transmitting what experienced engineers actually know, and the specific forms of decay that follow when craft is abandoned.

One of the most direct arguments for craft as judgment comes from [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work), who argues that algorithm interviews measure a narrow trainable skill that correlates poorly with production performance. Real engineering requires reading tradeoffs and shipping incrementally against messy, unbounded real-world inputs — exactly the kind of tacit competence that cannot be rehearsed from flashcards. [cekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) deepens this point via Michael Polanyi: the most valuable engineering expertise, pattern recognition and design intuition, is structurally inaccessible because it resists explicit articulation and can only be transmitted through apprenticeship.

That transmission problem is compounded by communication failures. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) observes that senior developers speak in terms of complexity management while the rest of the business thinks in uncertainty reduction, and bridging that gap is itself a core engineering skill. Good judgment held silently is only half as useful.

Several sources examine craft at the level of code structure. The Single Responsibility Principle is routinely misread as "do one thing," but [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues the principle is actually about cohesive grouping under a single accountable responsibility — over-granularizing classes violates the cognitive simplicity SRP is meant to provide. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes an adjacent point: deep modules with small interfaces hiding large implementations reduce complexity for both humans and the LLMs now reading and extending code. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same principle to Angular specifically, arguing that components bloated with dozens of inputs should be decomposed using the Composite Components pattern so each concern stays encapsulated.

Code organization at larger scales is addressed by [Dominik](/reading/2026-07/2026-07-04t141323-the-vertical-codebase), who argues that domain-vertical colocating of files outperforms horizontal technical layers because cohesion by functionality improves discoverability and even AI-agent navigation of a codebase. [Matt Smith](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) makes a micro-level version of the same argument: reflexive JavaScript destructuring optimizes for writing rather than reading, and keeping the original object reference can preserve context that scattered variable names discard.

Craft also means knowing what not to build. [Jim Nielsen](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) argues that replacing JS-powered interactions with separate linked HTML pages is simpler to build and maintain than progressive enhancement. [Dan Q](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) made this concrete by reverse-engineering a travel app that delivered plain HTML and replacing it with a lightweight webpage. [Paul Buchheit](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) provides the product-level analogue: great products nail two or three attributes exceptionally and deliberately ignore everything else.

The AI-era pressures on craft receive pointed treatment. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI lowers the cost of producing code but not the cost of owning it, and LLMs can generate polished technical debt faster than any individual engineer. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) argues that shipping AI-generated code without review causes skill atrophy and is categorically incompatible with safety-critical systems. [Paolo Galeone](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) calls for strong CI/CD and code ownership as the structural enforcement mechanism — using AI as an amplifier rather than a replacement for understanding. [Anton Zaides](/reading/2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic) puts it starkly: engineers who accept AI output without understanding it are surrendering cognitive ownership. [gruhn](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy) frames the same failure mode as becoming a "meat proxy" — relaying raw AI output shifts cognitive work onto the recipient rather than adding value.

Performance work is a domain where craft is especially visible. [Arthur Pastel](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) demonstrates it step by step: replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication to achieve a 5.9x speedup in Rust's image-rs blur. The insight is not the trick itself but the discipline of measuring, understanding the bottleneck, and changing the minimum necessary. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) supplies the counterbalance: attention thresholds, discrete capacity increments, and pipeline backpressure mean even order-of-magnitude improvements sometimes change nothing in practice. Knowing when optimization matters is itself a craft judgment.

Finally, craft extends to the artifacts engineers produce beyond code. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills production-incident lessons into concrete rules — roll back before debugging, treat every external dependency as a future outage. [Billy Pilger](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) applies the same sensibility to architecture diagrams: unlabeled resources, overloaded master diagrams, and over-reliance on AI-generated visuals each represent a failure to communicate clearly. The common thread is intentionality — knowing what a given artifact is for and shaping it accordingly.
