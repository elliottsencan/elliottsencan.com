---
title: Engineering craft
summary: >-
  The knowledge, judgment, and discipline that separate functional code from
  durable software — spanning module design, tool fluency, tacit expertise, and
  resistance to shortcuts that look cheap but compound over time.
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
compiled_at: '2026-07-24T05:00:09.380Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9433
    output_tokens: 1497
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
  cost_usd: 0.050754
---
Engineering craft is the accumulated body of skill, judgment, and discipline that determines whether working code becomes maintainable software. It lives in decisions that are rarely visible: how a module is bounded, how a shell script fails safely, how a component API stays comprehensible a year after it was written.

The craft begins at the level of individual decisions. [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) represents one end of that discipline: a book and complete implementation woven together, built by someone who thought carefully enough about language internals to produce two working interpreters in different languages. At the opposite end of the scale, [stopping reflexive JavaScript destructuring](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) is the same instinct applied at micro-scale: optimizing for reading rather than writing, keeping the object reference when it carries context that scattered variable names lose.

Module design is where craft compounds. [Deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) — small interfaces hiding large implementations — reduce cognitive surface for both humans and LLMs. The [Single Responsibility Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle), properly understood, is the same idea: cohesion under a single accountable responsibility, not the over-granularizing that creates more complexity than it removes. [Angular component composition](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) makes the same argument at the framework level — bloated input lists are a sign that concerns haven't been properly separated into directives and sub-components. And [vertical codebase organization](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) extends the principle to directory structure: colocation by domain keeps cohesion visible rather than burying it in horizontal technical layers.

Craft also means knowing your tools at a level below their surface API. [Shell tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) — Readline key bindings, brace expansion, script safety flags — are the kind of fluency that separates someone who fights their environment from someone who extends it. [Jujutsu's review workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows the same pattern at the VCS level: a technique that makes large code review tractable by persisting progress in version control rather than in working memory. [Git log commands run before reading any code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) diagnose risk distribution in a codebase before a single file is opened.

Performance work is a specific test of craft judgment. [The 5.9× image-rs blur optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) shows what real low-level craft looks like: replacing float arithmetic with integer accumulators, swapping division for reciprocal multiplication — measurable, motivated changes. But [performance gains do not automatically matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter): attention thresholds, discrete capacity increments, and pipeline backpressure all explain why even order-of-magnitude improvements sometimes change nothing about outcomes. Craft includes knowing when to optimize and when to stop.

The tacit dimension is perhaps the hardest part to name. [Senior developers fail to communicate their expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) because they think in terms of complexity management while the rest of the business thinks in terms of uncertainty reduction. [Tacit knowledge](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) — the pattern recognition, unwritten conventions, and design intuition accumulated through apprenticeship — is structurally hard to articulate and structurally inaccessible to AI tools.

Craft degrades under certain pressures. [Vibe coding](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) — shipping AI-generated code without review or testing — causes skill atrophy and is incompatible with safety-critical systems. [AI-generated tests introduce systematic smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests): over-mocking, only testing happy paths, writing tests that validate buggy implementations. And despite powerful AI-assisted static analysis, [curl's bug data shows no measurable signal](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) that open-source projects are approaching zero latent defects. The tools are improving; the underlying difficulty is not shrinking proportionally.

[Algorithm interview culture](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) tests a narrow trainable skill that weakly correlates with the real work: reading tradeoffs, shipping incrementally, building systems that handle messy unbounded inputs. [The idiot index for code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) names the same gap: bloated, over-engineered code signals low-value work the same way inflated manufacturing costs do. Craft is the discipline of staying close to the essential.
