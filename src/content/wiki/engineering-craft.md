---
title: Engineering craft
summary: >-
  Engineering craft is the discipline of building software with deliberate
  judgment — choosing the right abstraction, reading tradeoffs, owning your
  code, and transmitting tacit knowledge that tools alone cannot supply.
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
compiled_at: '2026-08-31T22:34:29.997Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10087
    output_tokens: 1540
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
  cost_usd: 0.053361
---
Engineering craft names the set of practices, habits, and dispositions that separate workmanlike code production from considered construction. It covers everything from how you structure a module to how you read a codebase you have never touched before, and the sources here return repeatedly to a few tensions: depth vs. surface, ownership vs. delegation, and the transmissible vs. the tacit.

The most direct framing comes from [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work), who distinguishes the narrow, trainable skill that interview processes reward from the broader judgment production work actually requires: reading tradeoffs, shipping incrementally, and handling messy real-world inputs. Interview performance and engineering craft are loosely coupled at best.

On the structural side, several sources argue that good craft means hiding complexity behind clean boundaries. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes the case for deep modules: small interfaces concealing large implementations reduce the cognitive surface a reader must hold in mind, and this matters for both human collaborators and LLM tools. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) reaches the same conclusion from Angular: component APIs bloated with dozens of inputs should be decomposed using the Composite Components pattern so each concern stays encapsulated. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) traces a related failure mode in how teams apply the Single Responsibility Principle — interpreting it as "do only one thing" rather than "group behaviors under one accountable concern", which produces over-granularized classes that are harder to understand, not easier.

Code organization extends to file and folder topology. [Dominik (TkDodo)](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues for organizing frontends by domain verticals rather than horizontal technical layers, so related code is colocated and discoverable. [Matt Smith](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) makes a smaller but related point about JavaScript style: reflexive destructuring optimizes for writing, not reading, and keeping the original object reference can preserve context that scattered variable names lose.

Craft also requires understanding what you ship. [Arthur Pastel](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) demonstrates this through a step-by-step optimization of Rust's `fast_blur`, replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication to achieve a 5.9x speedup — the kind of work that requires knowing what the machine is actually doing. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) offers a systems-level parallel: Nagle's algorithm silently degrades latency because engineers accept defaults without knowing why the default exists.

Ownership under AI pressure is a recurring theme. [Paolo Galeone](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) argues that LLMs are pushing engineers into a custodian mindset — shipping generated code they do not understand — and that CI/CD discipline and genuine code ownership are what keep AI as an amplifier rather than a replacement for understanding. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) adds that AI lowers the cost of producing code but not of owning it; taste and judgment still matter because LLMs can generate polished technical debt faster than any individual engineer. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) makes the hardest version of this point: shipping AI-generated code without review is incompatible with safety-critical systems, and the habit atrophies the skills that review requires.

Transmitting craft is its own challenge. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) observes that senior engineers communicate in terms of complexity management while the rest of the business thinks in terms of uncertainty reduction, and the translation gap makes expertise invisible. [cekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) goes further, drawing on Michael Polanyi to argue that pattern recognition, design intuition, and unwritten conventions are structurally inaccessible to AI tools and can only move through apprenticeship.

Practical craft shows up in tooling habits too. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills production-incident experience into rules like rolling back before debugging and treating every external dependency as a future outage. [Ally Piechowski](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) shows how five `git log` commands can diagnose churn hotspots, bus factor, and bug clusters before opening a single file. [Ben Gesoff](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) describes a workflow for reviewing large changes with Jujutsu by squashing reviewed files into an empty parent commit, preserving progress in version control rather than in a reviewer's head.

The picture that emerges is consistent: engineering craft is a discipline of deliberate understanding — of the runtime, the abstraction, the codebase history, and the person who will read your code next. AI tools change the economics of production without changing what understanding means.
