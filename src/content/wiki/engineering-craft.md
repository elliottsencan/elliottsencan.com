---
title: Engineering craft
summary: >-
  Engineering craft covers the practical habits, mental models, and design
  principles that separate functional code from code worth owning long-term,
  from module boundaries to shell fluency to knowing what algorithms actually
  matter.
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
compiled_at: '2026-06-21T20:15:03.967Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6511
    output_tokens: 1233
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
  cost_usd: 0.038028
---
Engineering craft is the set of skills, habits, and judgment calls that determine whether working code remains maintainable, comprehensible, and trustworthy over time. It shows up at every scale: the shape of a single module, the idioms in a shell script, the architecture diagram hanging in the team wiki.

At the design level, several sources converge on the same underlying principle: hide complexity behind clean interfaces. The deep modules argument [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) holds that a small surface area over a large implementation is the correct trade-off because it limits the cognitive load on callers. The Single Responsibility Principle, when read correctly, points the same direction: cohesive grouping of behaviors under one accountable owner, not atomization into micro-classes that scatter logic across a codebase [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). Angular components bloated with dozens of inputs are a direct symptom of ignoring this: refactoring toward composition and directives restores encapsulation [A Better way to build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to).

At the implementation level, craft means caring about what runs, not just what compiles. A 5.9x speedup in a Rust blur function came from replacing float arithmetic with integer accumulators and swapping division for reciprocal multiplication — changes that required understanding the actual cost model of the target hardware [5× faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs). Shell fluency sits at the same intersection of knowing your tools deeply: Readline bindings, process substitution, and script safety flags are not trivia but daily leverage points [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters).

Good engineers also know what expertise matters beyond code. Algorithm interview performance is trainable and weakly correlated with production judgment [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work). Real work involves reading tradeoffs, handling unbounded inputs, and shipping incrementally. Much of the most valuable expertise is tacit — pattern recognition and design intuition that can only be transmitted through mentorship and practice, not extracted by AI tools [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you).

The AI question runs through multiple sources without consensus on the answer. AI lowers the cost of producing code while leaving the cost of owning it unchanged, which means taste and judgment matter more, not less [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). Shipping AI-generated code without review is categorically incompatible with safety-critical systems and accelerates skill atrophy in the process [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession). Stenberg's curl data shows no measurable improvement in latent bug rates despite powerful new analysis tools [Approaching zero bugs?](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs). At the same time, agentic coding has made formal verification newly cost-effective by lowering the effort required to write proofs [Formal Methods and the Future of Programming](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming).

Craft also includes the habits around code that aren't writing it: reviewing large changes without losing track of progress [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu), reading a new codebase through git history before touching a file [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code), and auditing legacy systems by starting with stakeholder fear rather than tooling output [How I Audit a Legacy Rails Codebase in the First Week](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week). These are the habits that distinguish engineers who ship durable work from those who just ship.
