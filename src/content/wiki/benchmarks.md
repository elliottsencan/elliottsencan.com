---
title: Benchmarks
summary: >-
  Benchmarks measure model or system capability, but their results are only as
  meaningful as their design — a recurring problem across LLM, multi-agent, and
  vision tasks, where tests built for one context are routinely applied to
  contexts they cannot capture.
sources:
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
  - >-
    2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - >-
    2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2
  - 2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6
  - 2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-04t235011-plurai
  - 2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla
  - 2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs
  - >-
    2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning
  - >-
    2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs
  - 2026-05/2026-05-28t074225-welcome-robot-overlords-please-dont-fire-us
  - 2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison
  - >-
    2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - >-
    2026-06/2026-06-20t053342-if-llms-have-human-like-attributes-then-so-does-age-of
  - >-
    2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences
  - >-
    2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk
  - 2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse
  - 2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter
compiled_at: '2026-07-09T23:18:17.812Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6773
    output_tokens: 1100
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
  cost_usd: 0.036819
---
A benchmark is only as useful as the gap it actually measures. Across LLM evaluation, multi-agent systems, and vision-language research, the same structural problem recurs: tests get designed for one purpose, then get applied to broader claims they cannot support.

The sharpest articulation of this comes from Meiklejohn's survey of multi-agent systems [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). HumanEval and SWE-bench were designed for single-agent coding tasks. When applied to multi-agent pipelines, they cannot measure coordination quality, communication overhead, or failure recovery, which are precisely the things that distinguish multi-agent architectures from single-agent ones. Numbers from those tests look legible, but they answer the wrong question. Imbue's pipeline experiment [on SWE-bench Pro](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) illustrates a downstream cost: running an implementer-reviewer-fixer loop against the benchmark revealed that weaker fixer agents broke correct code, a failure mode the benchmark wasn't built to surface.

SysMoBench runs into an analogous mismatch from the other direction [Can LLMs model real-world systems in TLA+?](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). Leading LLMs score near-perfect on TLA+ syntax, but only around 46% on conformance and 41% on invariant checks. The models are generating textbook protocol descriptions rather than faithfully modeling the actual systems in the source code. Syntax scores, the easy-to-measure proxy, look impressive; the meaningful scores do not.

The RTK token-compression controversy is a miniature version of the same issue [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk). Claimed 60-90% token savings are measured only on Bash output stripping, with no task-accuracy benchmarks to show the compression doesn't degrade downstream results. The metric exists; the benchmark that would justify trusting it does not.

Effort-level benchmarking adds a different wrinkle. A hands-on test of Claude Opus 4.7 across five reasoning-effort levels on 29 real tasks [found a non-monotonic curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning): medium effort outperformed high, xhigh, and max on pass rate, equivalence, and cost-efficiency. More compute did not monotonically improve results. This matches Colin Breck's broader argument [that impressive performance gains often don't change outcomes](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) when attention thresholds, discrete capacity increments, or pipeline backpressure absorb the improvement before it reaches the user.

On capability trajectory, a LessWrong analysis [estimating no-CoT task-completion time horizons](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) finds GPT-5.5 handling roughly three-minute human tasks at 50% reliability, with a doubling time of about one year since 2019. The benchmark here is explicitly designed to track a capability trend over time rather than claim absolute performance, which is one of the cleaner uses of benchmark methodology in the surveyed sources.

The AI memory systems comparison table [surveyed 74 systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) across architecture, data model, search modes, and benchmark coverage. Listing whether a system has benchmark data at all is itself a meaningful signal; many do not.

The consistent thread: a benchmark measures what it was designed to measure, and the field repeatedly applies tests outside their design envelope. The remedy isn't more benchmarks but better-scoped ones tied to the failure modes that actually matter in production.
