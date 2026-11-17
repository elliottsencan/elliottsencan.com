---
title: Engineering craft
summary: >-
  The practical and intellectual discipline of building software well: reading
  tradeoffs, managing complexity, applying tacit judgment, and owning what you
  ship rather than delegating understanding to tools or process.
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
compiled_at: '2026-11-17T01:42:29.601Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10087
    output_tokens: 1577
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
  cost_usd: 0.053916
---
Engineering craft is the difference between code that works and code that holds. It encompasses the judgment calls that happen before, during, and after writing: choosing the right abstraction, understanding the system you're modifying, reviewing what you ship, and communicating what you know to the people around you.

The clearest statement of what craft is not comes from [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work): algorithm interviews test a narrow, trainable skill that weakly correlates with production performance. Real engineering requires reading tradeoffs, shipping incrementally, and handling messy unbounded real-world inputs. The interview ritual confuses performance on a specific puzzle for the broader capability of building systems that last.

Abstraction is one place where craft shows up most visibly. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues for deep modules: small interfaces that hide large implementations. The payoff is reduced cognitive load for everyone who touches the code, including LLMs. The opposing failure mode is what [Kobi Hari](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) calls component bloat: Angular components with dozens of inputs that conflate concerns and produce APIs nobody can use cleanly. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) makes a parallel point about the Single Responsibility Principle — commonly misread as "do only one thing" when it actually means cohesive grouping under a single accountable responsibility. Over-granularizing is itself a violation of the principle.

Code organization follows the same logic. [Dominik](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues for organizing frontend codebases by domain verticals rather than horizontal technical layers, so that cohesion is structural rather than mental. [Matt Smith](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) makes the micro-scale version of this point: reflexive JavaScript destructuring optimizes for writing code rather than reading it, and scattered variable names lose the context the original object carried.

Quality under pressure is where craft is most contested. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) makes the economic case clearly: AI lowers the cost of producing code but not the cost of owning it. LLMs can generate polished, well-formatted technical debt faster than any individual engineer ever could. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) is more pointed, arguing that shipping AI-generated code without review or testing is reckless and categorically incompatible with safety-critical systems. [Paolo Galeone](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) calls this the custodian mindset and argues for strong CI/CD and code ownership to keep AI as an amplifier rather than a replacement for understanding.

The theme of ownership extends to communication. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) argues that senior developers communicate in terms of complexity management while the rest of the business thinks in terms of uncertainty reduction — bridging that gap is the real challenge of software expertise, not AI. [cekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) goes further, drawing on Michael Polanyi's philosophy of tacit knowledge to argue that the most valuable engineering expertise — pattern recognition, unwritten conventions, design intuition — is structurally inaccessible to AI and can only be transmitted through apprenticeship.

Not shipping garbage also requires discipline about tools. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills seven production-incident rules, including rolling back before debugging and treating every external dependency as a future outage. [Christian Hofstede-Kuhn](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) demonstrates the same instinct at the shell level: knowing your tools deeply enough to use safety flags and history search saves real time under pressure. [Arthur Pastel](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) shows what disciplined optimization looks like — replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication to achieve a 5.9x speedup by understanding the actual bottleneck.

The costs of craft failure are concrete. [Daniel Stenberg](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) uses curl's vulnerability data to show that despite powerful new static analysis tools, there is no measurable sign yet that open-source projects are approaching zero latent bugs. [lab174](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) traces YAML's Norway problem through spec versions showing that a known parsing bug persisted in popular libraries for over a decade despite being fixed in the spec — a case study in the gap between specification and production reality.

Craft is not perfectionism. [Paul Buchheit](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) argues that great products nail two or three core attributes exceptionally well and deliberately ignore everything else. The [idiot index framing](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) makes the same point from the other direction: bloated, over-engineered code signals low-value work. The discipline is knowing which parts matter and spending effort there, not everywhere equally.
