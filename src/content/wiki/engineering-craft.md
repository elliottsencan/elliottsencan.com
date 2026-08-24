---
title: Engineering craft
summary: >-
  The habits, judgment, and tacit knowledge that separate workmanlike code from
  software that holds up over time, spanning design principles, tooling
  discipline, and the irreducible human cost of ownership.
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
compiled_at: '2026-08-24T18:46:19.759Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9759
    output_tokens: 1655
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
  cost_usd: 0.054102
---
Engineering craft is the accumulated set of practices, instincts, and judgment calls that determine whether code is merely functional or genuinely maintainable. It resists reduction to any single principle because it operates across every layer of the stack, from CSS layout decisions to compiler internals to the shape of a commit history.

One persistent theme is the gap between what can be measured and what actually matters. [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes the case that algorithm interviews test a narrow, trainable skill that bears little relation to production performance, where real engineering means reading tradeoffs and shipping incrementally against messy real-world inputs. [Vladimir Klepov](/reading/2026-06/2026-06-22t182141-the-systemic-decay-of-tech-hiring) traces the same dysfunction to error asymmetry and Goodhart's Law: because false negatives are invisible and false positives are costly, interview processes drift toward ever-harder filters that candidates overfit to. The hiring ritual ends up selecting for interview performance, not engineering judgment.

That judgment, when it exists, is hard to articulate. [cekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you), drawing on Michael Polanyi, argues that the most valuable engineering expertise, pattern recognition, design intuition, unwritten conventions, is structurally inaccessible to any kind of verbalization or tool-assisted transfer. It only propagates through apprenticeship. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) locates a related problem in communication: senior engineers speak in terms of complexity management while the rest of the business thinks in terms of uncertainty reduction, and the gap makes genuine expertise invisible to the people who need to recognize it.

At the object level, craft shows up in how problems are scoped and how code is structured. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues for deep modules, small interfaces over large implementations, as the design strategy that reduces complexity for both humans and LLMs. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects a widespread misreading of the Single Responsibility Principle: it does not mean "do one thing" but rather cohesive grouping under a single accountable responsibility, and over-granularizing violates the cognitive simplicity SRP is supposed to provide. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies this concretely to Angular: components bloated with dozens of inputs should be refactored into the Composite Components pattern so each concern stays encapsulated.

Craft also lives in the small choices. [Matt Smith](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) argues that reflexive destructuring optimizes for writing over reading, losing the object context that makes code understandable. [Arthur Pastel](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) shows what careful attention to the cost model looks like in practice: replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication in Rust's image-rs blur function yielded a 5.9x speedup. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) documents a different kind of small-choice cost, Nagle's algorithm silently killing latency, and argues TCP_NODELAY should simply be the default on modern hardware.

Tooling discipline is part of craft too. [Christian Hofstede-Kuhn](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) catalogs underused shell features, from Readline key bindings to script safety flags, that reduce friction and prevent silent failures. [Ally Piechowski](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) uses git log commands to diagnose a codebase's risk profile before reading any source, treating version control history as a first-class artifact. [Ben Gesoff](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) applies the same discipline to code review, using Jujutsu to incrementally commit reviewed files and persist progress without stash overhead.

AI has sharpened the stakes. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) puts it plainly: AI lowers the cost of producing code but not the cost of owning it, and LLMs can generate well-formatted technical debt faster than any engineer could. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) goes further, arguing that shipping AI-generated code without review causes skill atrophy and is incompatible with safety-critical systems. [Paolo Galeone](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) frames the response in terms of engineering discipline: strong CI/CD, code ownership, and active comprehension are what keep AI as an amplifier rather than a crutch. [gruhn](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy) names the failure mode precisely: relaying raw AI output without reading or synthesizing it shifts cognitive work onto the recipient and adds no value.

The thread running through all of these is ownership. Craft means being accountable for what you ship, which requires understanding it, which requires the kind of slow attention that cannot be bypassed by faster tooling. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills this into practical rules earned from production incidents: roll back before debugging, treat every external dependency as a future outage. The unwritten laws of engineering are the sediment left by craft practiced under pressure.
