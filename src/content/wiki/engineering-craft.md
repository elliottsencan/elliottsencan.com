---
title: Engineering craft
summary: >-
  Engineering craft is the set of judgment-intensive practices — design,
  debugging, communication, and tooling discipline — that separate working
  software from software worth owning; a recurring theme across sources on code
  quality, tacit knowledge, and professional standards.
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
compiled_at: '2026-11-03T00:38:09.435Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10087
    output_tokens: 1573
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
  cost_usd: 0.053856
---
Engineering craft resists a clean definition because it is not a skill so much as a disposition: the accumulated judgment that determines whether code is merely functional or genuinely maintainable. Several sources circle this from different angles, and the through-line is the same. Craft shows up in the micro (how you name a variable, whether you keep an object reference or destructure it reflexively) and in the macro (how you organize a codebase, how you decompose responsibility across components).

The most direct argument comes from the tension between production and ownership. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) makes the point plainly: AI lowers the cost of producing code but not the cost of owning it. LLMs generate polished, well-formatted technical debt faster than any individual engineer ever could. The implication is that taste and judgment — knowing when to stop, when to simplify, when to say no — have become more valuable in proportion to how cheap raw generation has become. [Paolo Galeone](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) frames the failure mode as a "custodian" mindset: engineers shipping AI-generated code they do not understand, letting CI/CD become the only line of defense against drift.

Craft at the design level means understanding what principles actually say. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the Single Responsibility Principle is routinely misread as "do only one thing" when it actually means cohesive grouping under a single accountable concern; over-granularizing violates the cognitive simplicity SRP is supposed to provide. The same instinct appears in [Kobi Hari's critique of Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) bloated with dozens of inputs: composition, not proliferating API surface, is the disciplined answer. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) extends this into a general principle — deep modules with small interfaces hiding large implementations reduce complexity for humans and LLMs alike.

Craft at the implementation level is about making non-obvious choices visible. [Matt Smith's case against reflexive destructuring](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) is a small example with a larger point: optimizing for writing code rather than reading it is a craft failure. [Arthur Pastel's image-rs optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) is the other direction of the same coin — replacing float arithmetic with integer accumulators is tedious to get right, but the 5.9x speedup demonstrates why understanding the underlying system still matters even when higher-level abstractions are available.

Craft involves knowing which complexity is real. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) shows that even order-of-magnitude performance gains can fail to change outcomes when attention thresholds, discrete capacity increments, or pipeline backpressure constrain the actual bottleneck. The engineer who cannot model the whole system chases the wrong number. [The Speedrun "idiot index" framing](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) applies the same logic at the codebase level: bloated, over-engineered code signals low-value work regardless of how clever the individual functions are.

Craft also has a tacit dimension that tooling cannot capture. [cekrem's reading of Polanyi](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) argues that the most valuable engineering expertise — pattern recognition, unwritten conventions, design intuition — is structurally inaccessible to AI and can only be transmitted through apprenticeship. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) approaches the same gap from a communication angle: senior engineers think in terms of complexity management while the rest of the organization thinks in terms of uncertainty reduction, and the failure to bridge that gap undermines the value of expertise regardless of its depth.

Finally, craft is visible in how engineers treat the systems they inherit. [Ally Piechowski's git archaeology workflow](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) and [Rails audit process](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) are exercises in reading a codebase as a historical artifact — understanding churn hotspots, bus factor, and stakeholder fear before touching a line of code. [Anton Zaides's production rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) — roll back before debugging, treat every dependency as a future outage — are the accumulated scar tissue of craft practiced under production conditions.

The debate the sources do not fully resolve is whether craft is learnable under AI-assisted conditions or whether the apprenticeship path that transmits it is being quietly dismantled. [Fagner Brack's argument](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) that real engineering requires reading tradeoffs and shipping incrementally implies craft is built through repetition with feedback. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) argues that vibe coding causes skill atrophy. Both are probably right, which makes the organizational question — how to preserve conditions under which craft compounds — as important as any individual technical practice.
