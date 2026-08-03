---
title: Engineering craft
summary: >-
  Engineering craft is the set of judgment-driven practices that separate
  working code from good code — spanning module design, tooling fluency,
  communication, and the tacit knowledge that accumulates only through
  experience.
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
compiled_at: '2026-08-03T19:34:33.009Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9567
    output_tokens: 1585
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
  cost_usd: 0.052476
---
Engineering craft resists a clean definition because it is not a single skill but a density of overlapping judgments. It shows up in decisions about how to structure a module, when to roll back instead of debug, how to read a codebase before touching it, and how to communicate a tradeoff to someone who does not care about implementation details.

At the design level, the craft is about managing complexity. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce the cognitive surface area that both humans and LLMs must hold in mind. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) extends this by showing how SRP is widely misread as "do one thing" when it actually means grouping behaviors under a single coherent responsibility; over-granularizing is its own kind of failure. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same logic to component APIs, arguing that bloated input lists should be broken apart into directives and sub-components so each concern stays encapsulated.

Code organization follows the same logic at a larger scale. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues for organizing by domain rather than technical layer, showing that colocation by functionality improves cohesion and discoverability. The approach also pays dividends for AI agents, which reason better over code that is already grouped by intent.

Craft also means knowing what not to build. [The Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) borrows a manufacturing concept to argue that bloated, over-engineered code signals low-value work in the same way inflated production costs do. [Building Websites With LLMs](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) makes a related point: replacing JavaScript-powered in-page interactions with plain linked HTML pages, unified by CSS view transitions, is often simpler to build and maintain than progressive enhancement stacks.

On the tooling side, craft is knowing your instruments well enough to stop fighting them. [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) catalogs Readline bindings, history search, and script safety flags that most engineers use only partially. [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) shows how churn hotspots, bus factor queries, and firefighting frequency give a faster read on a codebase's risk profile than opening any single file. [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) describes a concrete workflow for reviewing large pull requests without losing state, persisting progress in version control rather than in memory.

Craft also lives in the unglamorous work of understanding what is actually slow. [5x Faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) walks through a step-by-step Rust optimization, replacing float arithmetic with integer accumulators and division with reciprocal multiplication for a 5.9x speedup. But [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) is the necessary counterweight: attention thresholds, discrete capacity increments, and pipeline backpressure mean that even order-of-magnitude improvements often change nothing in practice.

AI tools complicate the picture. [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues that LLMs lower the cost of producing code but not the cost of owning it, and that taste and judgment remain the scarce resource. [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) is more direct: shipping AI-generated code without review causes skill atrophy and is incompatible with safety-critical systems. [Code Smells When You Get AI to Write Your Frontend Tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents the recurring patterns AI tools introduce when generating tests, including over-mocking and testing the buggy implementation rather than intended behavior.

Much of craft is tacit. [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Polanyi to argue that pattern recognition, design intuition, and unwritten conventions are structurally inaccessible to AI and can only be transmitted through apprenticeship. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) adds that even experienced engineers struggle to articulate their knowledge, because they reason in terms of complexity management while the rest of the business thinks in terms of uncertainty reduction.

[Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) frames the gap between credentialing and craft most clearly: algorithm interviews test a narrow, trainable skill that correlates weakly with production performance. Real engineering is reading tradeoffs, shipping incrementally, and building systems that handle messy, unbounded real-world inputs. The craft, in other words, is everything the interview does not test.
