---
title: Engineering craft
summary: >-
  Engineering craft is the discipline of judgment, intentionality, and
  accumulated skill that separates code that merely works from code that can be
  owned, maintained, and reasoned about over time.
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
compiled_at: '2026-10-19T22:08:16.446Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10087
    output_tokens: 1675
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
  cost_usd: 0.055386
---
Engineering craft is not about any single technique. It is the cumulative discipline of choosing well at each decision point: what to build, how to structure it, what to leave out, and whether you understand the thing you just shipped.

The most direct challenge to craft today is the ease of generating code without understanding it. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) calls "vibe coding" — shipping AI-generated code without review or testing — categorically incompatible with safety-critical systems and a path to skill atrophy. [Paolo Galeone](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) frames the same risk as a drift toward a "custodian" mindset, where engineers stop understanding what they merge. [Anton Zaides](/reading/2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic) names it cognitive ownership: delegating to AI is fine; blindly accepting its output is not. [gruhn](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy) extends this to communication — relaying raw AI output without synthesizing it shifts cognitive burden onto the recipient and subtracts rather than adds value.

What craft looks like in practice varies by domain, but some patterns recur. At the level of code organization, [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues for deep modules — small interfaces hiding large implementations — as the structural form that reduces complexity for humans and LLMs alike. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same logic to Angular components: components bloated with dozens of inputs should be decomposed using the Composite Components pattern so each concern stays encapsulated. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) recovers what Single Responsibility actually means — not "do one thing" but cohesive grouping under a single accountable responsibility — arguing that over-granularizing classes violates the cognitive simplicity SRP is meant to provide. [Dominik](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) applies this to directory structure: organizing by domain verticals rather than technical layers improves cohesion and discoverability.

At the implementation level, craft means caring about the details that compound. [Arthur Pastel](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) demonstrates this through step-by-step optimization of Rust's image-rs blur function — replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication to reach a 5.9x speedup. [Colin McDonnell](/reading/2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude) achieves a 10x reduction in Zod's per-schema heap usage by replacing eagerly bound methods with lazily memoizing prototype getters. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues that Nagle's algorithm is obsolete in modern datacenter environments and TCP_NODELAY should be the default — a concrete example of a low-level default that silently kills latency when no one has examined it. [Matt Smith](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) makes the smaller but resonant point that reflexive JavaScript destructuring optimizes for writing code rather than reading it — craft includes resisting patterns that feel clever but reduce comprehension.

Craft also means knowing when not to build. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) observes that AI lowers the cost of producing code but not the cost of owning it — LLMs can generate polished technical debt faster than any individual engineer. [Dan Q](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) illustrates this with an Android travel app that was delivering plain HTML over HTTP: the entire app was unnecessary. [Jim Nielsen](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) argues similarly that replacing JavaScript-powered interactions with separate linked HTML pages is simpler to build and maintain. The idiot index framing from [Speedrun](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) makes this economic: bloated, over-engineered code signals low-value work the same way inflated manufacturing costs do.

Craft is transmitted, not just read. [cekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Michael Polanyi's philosophy of tacit knowledge to argue that the most valuable engineering expertise — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI and can only be transmitted through apprenticeship. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) adds that senior engineers often fail to communicate their expertise not because it is unclear to them but because they speak in terms of complexity management while the rest of the business thinks in terms of uncertainty reduction.

Finally, craft includes knowing how to read what you inherit. [Ally Piechowski](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) uses git log patterns — churn hotspots, bus factor, bug clusters — to diagnose a codebase's risks before opening a file. Her [Rails audit process](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) starts with stakeholder interviews to surface fear and knowledge gaps before running any tools, delivering a single-page triage rather than an exhaustive findings document. These are crafted approaches: purposeful, bounded, and focused on the decision that actually needs to be made.
