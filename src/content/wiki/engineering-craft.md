---
title: Engineering craft
summary: >-
  Engineering craft is the body of judgment, discipline, and tacit skill that
  separates code that merely works from code worth owning — covering everything
  from module design and tooling habits to how expertise is built and
  communicated.
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
compiled_at: '2026-07-22T05:54:24.004Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9433
    output_tokens: 1526
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
  cost_usd: 0.051189
---
Engineering craft is not a single practice but an orientation toward the work: the accumulated judgment that governs how you structure a module, choose a tool, read a codebase, and communicate a tradeoff. Several threads run through the sources tagged here.

The first is the gap between what interviews measure and what work requires. [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) argues that algorithm interviews test a narrow, trainable skill that weakly correlates with production performance — real engineering means reading tradeoffs, shipping incrementally, and handling messy, unbounded real-world inputs. [Vladimir Klepov](/reading/2026-06/2026-06-22t182141-the-systemic-decay-of-tech-hiring) traces how error asymmetry and shared interviewer pools have made hiring systematically dysfunctional, with candidates overfitting to process via Goodhart's Law. The hiring ritual and the craft of engineering have drifted far apart.

The second thread is tacit knowledge: the expertise that cannot be written down. [cekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you), drawing on Michael Polanyi, argues that the most valuable engineering skill — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI and can only be transmitted through apprenticeship. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) identifies a complementary failure: senior engineers speak in terms of complexity management while the rest of the business thinks in uncertainty reduction, and closing that gap is harder than any technical problem.

The third thread is structural discipline in design. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that deep modules — small interfaces hiding large implementations — reduce complexity for both humans and LLMs. [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same principle to Angular components, recommending the Composite Components pattern to prevent API bloat. [Henrique F. Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects a widespread misreading of SRP: the principle is about cohesive grouping under one accountable responsibility, not mechanical one-thing granularity — over-splitting violates the cognitive simplicity SRP is meant to provide. [Dominik](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) extends the argument to file organization, showing that domain verticals outperform horizontal technical layers for cohesion and discoverability.

A fourth thread is precision in low-level work. [Arthur Pastel](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) demonstrates what careful optimization looks like: replacing float arithmetic with integer accumulators and integer division with reciprocal multiplication to achieve a 5.9× speedup. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows how a single decades-old default — Nagle's algorithm left enabled — silently kills latency because the Nagle/delayed-ACK interaction is invisible until you know to look. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) adds the necessary counterpoint: attention thresholds, discrete capacity increments, and pipeline backpressure mean even order-of-magnitude gains often fail to change outcomes, so choosing what to optimize is itself a craft judgment.

Code quality under AI pressure is a fifth thread. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues that AI lowers the cost of producing code but not owning it — LLMs can generate polished technical debt faster than any individual engineer. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) frames vibe coding — shipping AI-generated code without review — as reckless skill atrophy incompatible with safety-critical systems. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) catalogs the recurring failure modes: over-mocking, only testing happy paths, and writing tests that match a buggy implementation rather than intended behavior.

Tooling and workflow hygiene complete the picture. Christian Hofstede-Kuhn covers Readline bindings, brace expansion, and script safety flags — the kind of shell fluency that compounds over a career. [Ally Piechowski](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) shows how five git log commands diagnose a codebase's risks before opening a single file, and separately describes a week-one Rails audit that starts with stakeholder interviews to surface fear and knowledge gaps before running any tools. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills hard-won rules from production incidents: roll back before debugging, treat every external dependency as a future outage.

Craft, across all of these, is the discipline that keeps judgment visible even when tools, deadlines, and process pressure would rather it disappear.
