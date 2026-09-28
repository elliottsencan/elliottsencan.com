---
title: Engineering craft
summary: >-
  Engineering craft is the set of hard-won judgment, tacit knowledge, and
  deliberate practice that separates code that ships from code that lasts —
  encompassing module design, tooling discipline, communication, and the wisdom
  to know when enough is enough.
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
compiled_at: '2026-09-28T23:04:36.355Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10087
    output_tokens: 1828
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
  cost_usd: 0.057681
---
Engineering craft is not a checklist. It is accumulated judgment about what to build, how to structure it, and when to stop optimizing. The sources tagged here span CSS layout, shell scripting, interpreter design, production incident response, and AI-assisted coding, yet they converge on a common thread: the difference between code that gets written and code that holds up over time.

At the structural level, the strongest recurring argument is that interfaces should hide complexity. [Go Monk's analysis of deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) frames this explicitly: a small public surface backed by a large, well-tested implementation reduces cognitive load for both human maintainers and LLMs navigating a codebase. [Kobi Hari on Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) makes the same argument from a different angle — components bloated with dozens of inputs are a failure of encapsulation, and the fix is decomposition into directives and sub-components that each own a single concern. Henrique Teixeira's corrective on [the Single Responsibility Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) adds nuance: SRP is about cohesive accountability, not about splitting every function into its own file. Over-granularizing violates the cognitive simplicity SRP exists to provide.

Code organization at the directory level follows the same logic. [TkDodo's argument for vertical codebases](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) holds that grouping by domain rather than by technical layer keeps related code co-located and reduces the surface area any one change must touch. Matt Smith's case for [stopping reflexive destructuring](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) is a micro-version of the same point: writing code is not the bottleneck, reading it is, and small style decisions compound into either clarity or noise.

Tooling and process choices carry equal weight. [Christian Hofstede-Kuhn on shell tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) treats Readline bindings, brace expansion, and script safety flags as craft, not trivia — the difference between a script that silently swallows errors and one that fails loudly is the difference between a production incident and a caught mistake. [Ben Gesoff's Jujutsu workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) extends this to code review: inserting an empty parent commit and squashing files into it as you read them turns a cognitive sprint into a checkpointed process. [Ally Piechowski's git archaeology commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) and her [Rails audit methodology](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) show that reading version history before reading code is itself a craft skill — churn hotspots, bus factor, and firefighting frequency are signals that no static analysis tool surfaces.

Craft also means knowing what not to build. [Jim Nielsen's case for multiple small HTML pages](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) over JS-powered in-page transitions, and [Dan Q's reverse-engineering of a travel app](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) that was just serving plain HTML over HTTP, are both arguments that the simplest adequate solution is the right solution. [Paul Buchheit's note on great products](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) is the product-level version: nail two or three attributes exceptionally well and ignore the rest.

The AI era has sharpened every one of these concerns. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) puts it cleanly: AI lowers the cost of producing code, not the cost of owning it. LLMs can generate polished technical debt faster than any engineer. [Paolo Galeone](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) argues that the response is stronger CI/CD and genuine code ownership, not more tooling. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) goes further: shipping AI-generated code without review is reckless in any domain and categorically incompatible with safety-critical systems. Anton Zaides notes that the debate between [builders and keepers](/reading/2026-07/2026-07-07t170607-the-software-engineering-war) often depends on who is in the room — social context shapes stated positions on quality even among engineers who privately agree.

Tacit knowledge is where craft resides most stubbornly. [cekrem's reading of Polanyi](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) argues that the most valuable engineering judgment — pattern recognition, design intuition, unwritten conventions — cannot be made explicit and can only be transmitted through apprenticeship. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) observes that senior engineers already struggle to articulate this knowledge to non-technical stakeholders, framing the communication gap, not AI, as the real challenge of expertise. [Fagner Brack's critique of algorithm interviews](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) connects directly: the skills tested in technical interviews are a narrow, trainable subset of craft, weakly correlated with the judgment that production systems require.

Finally, craft applies at the lowest levels of implementation. [Arthur Pastel's step-by-step optimization of image-rs fast_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) — replacing float arithmetic with integer accumulators, then integer division with reciprocal multiplication for a 5.9x speedup — is a demonstration that understanding what the machine actually does still matters. [Colin Breck's caution about impressive performance gains](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) is the necessary counterweight: knowing when a gain is meaningful requires understanding the system boundary, not just the benchmark.
