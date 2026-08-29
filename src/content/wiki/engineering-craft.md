---
title: Engineering craft
summary: >-
  Engineering craft is the accumulated judgment, discipline, and deliberate
  practice that separates functional code from code worth owning — spanning
  design, tooling, communication, and the professional habits that hold quality
  under pressure.
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
compiled_at: '2026-08-29T20:15:45.894Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9928
    output_tokens: 1631
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
  cost_usd: 0.054249
---
Engineering craft is not a single skill. It is a cluster of habits, instincts, and commitments that determine whether software stays maintainable after it ships. The sources here converge on several overlapping tensions: between speed and ownership, between interface simplicity and hidden complexity, between what interviews test and what work actually requires.

The most direct statement of the problem comes from [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work): algorithm interviews test a narrow, trainable skill that weakly correlates with production performance. Real engineering involves reading tradeoffs, shipping incrementally, and handling messy, unbounded real-world inputs. The gap between the interview and the job is a symptom of a broader confusion about what craft actually is.

Craft shows up in how you structure a module. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues for deep modules — small interfaces that hide large implementations — as the primary lever against complexity. Shallow modules leak implementation details and force callers to reason about internals; deep modules keep that reasoning local. The same logic drives [Kobi Hari's](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argument against bloated Angular components: when inputs proliferate, encapsulation breaks and every caller pays the cognitive cost. The fix — decomposing into directives and sub-components — is the same principle applied to UI.

Similarly, [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the Single Responsibility Principle is commonly misread as "do only one thing" when it actually means grouping behaviors under a single accountable responsibility. Over-granularizing violates the cognitive simplicity SRP is meant to provide. Domain-level cohesion matters more than line count. [Dominik (TkDodo)](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) extends this to codebase organization: grouping by domain vertical rather than horizontal technical layer (components, hooks, utils) improves cohesion and discoverability.

Craft is also visible in the small decisions. [Matt Smith](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) makes the case against reflexive destructuring: keeping the original object reference often preserves context that scattered variable names lose. [Christian Hofstede-Kuhn](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) covers shell scripting safeguards — Readline bindings, history search, script safety flags — that prevent entire classes of failure in daily tooling. [Arthur Pastel](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) walks through replacing float arithmetic with integer accumulators and reciprocal multiplication in Rust's image-rs, achieving a 5.9x speedup through patient, reasoned optimization rather than guesswork.

Quality ownership becomes the central debate when AI enters the picture. [Paolo Galeone](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) argues that LLMs push engineers toward a custodian mindset — shipping generated code they don't understand — and calls for strong CI/CD and code ownership as the antidote. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) makes the economic version of this point: AI lowers the cost of producing code but not the cost of owning it. Taste and judgment still determine whether what ships is an asset or debt. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) puts the stakes at the extreme end: vibe coding is categorically incompatible with safety-critical systems, and skill atrophy is real when review and testing are skipped. [Anton Zaides](/reading/2026-07/2026-07-07t170607-the-software-engineering-war) frames this as a culture split between builders who prioritize shipping and keepers who insist on quality, noting that where you stand depends as much on social context as on conviction.

Craft also includes tacit knowledge that resists articulation. [cekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you), drawing on Polanyi, argues that the most valuable engineering expertise — pattern recognition, unwritten conventions, design intuition — is structurally inaccessible to AI and can only be transmitted through apprenticeship. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) approaches this from the communication side: senior developers think in terms of complexity management while the rest of the business thinks in terms of uncertainty reduction, and bridging that gap is the real challenge of expertise.

At the system level, [Anton Zaides's unwritten engineering laws](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) — roll back before debugging, treat every external dependency as a future outage — represent distilled production experience that no formal curriculum teaches. [Ally Piechowski's git log audit](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) and [legacy Rails audit process](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) are craft in the archaeological sense: reading a codebase's history to surface risk before touching a line of code.

Finally, [gruhn](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy) captures the disposition that underlies all of the above: relaying raw AI output without reading or synthesizing it shifts cognitive work onto the recipient. The value an engineer adds is understanding — and engineering craft is, at bottom, disciplined understanding applied under pressure.
