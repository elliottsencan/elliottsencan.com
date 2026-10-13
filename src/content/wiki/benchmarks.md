---
title: Benchmarks
summary: >-
  Benchmarks measure AI and software system performance, but recurring evidence
  across model evaluation, multi-agent research, and tooling shows that most
  benchmark numbers are designed for different conditions than the ones that
  matter in production.
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
  - >-
    2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude
compiled_at: '2026-10-13T00:12:19.452Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6938
    output_tokens: 1138
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
  cost_usd: 0.037884
---
A benchmark is only useful when it measures the thing you actually care about. That gap between metric and reality runs through nearly every source here.

The clearest statement of the problem comes from multi-agent systems research. [Meiklejohn's Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar coding benchmarks were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery. When the same scores get cited as evidence that multi-agent systems work, the numbers are technically accurate and substantively misleading. The [Part 4 wave survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this: empirical studies like MAST, MAS-FIRE, and Silo-Bench find 41-87% failure rates in production, a range that existing benchmark suites did not predict.

The same mismatch appears in formal verification. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) tests LLMs on generating TLA+ specs from real system code. Syntax scores are near-perfect; conformance sits around 46% and invariant scores around 41%. The benchmark reveals that models recite textbook protocol patterns rather than faithfully modeling the actual implementation. High scores on one metric obscure failure on the one that matters.

Benchmark design also shapes what gets built. [Meiklejohn's Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) notes that taxonomic frameworks in MAS research explicitly flag missing benchmarks as a gap, and that without measurement infrastructure, certain failure modes — unevolved agents, absent escalation paths — go unnoticed. [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) extends this, arguing the field is rediscovering distributed systems problems without the vocabulary or benchmarks to name them.

On the tooling side, the RTK token-compression critique makes the same structural point. [Mroczek](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that 60-90% token savings are a vanity metric because they measure output size, not task accuracy. Without benchmarks that track whether the pipeline produces correct results, the compression number is evidence of nothing useful.

Even well-designed benchmarks require careful interpretation. A [hands-on benchmark of Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five reasoning-effort levels on 29 real tasks finds a non-monotonic curve: medium effort outperforms high, xhigh, and max on pass rate and cost-efficiency. More compute does not monotonically improve results, which means benchmark scores collected at one effort level cannot be extrapolated. Similarly, [Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) find that no-chain-of-thought task completion doubles in capability roughly every year — a trend that only becomes visible when the benchmark is designed around real-task time horizons rather than token-level accuracy.

The [AI memory systems comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) includes benchmarks as one filterable axis across 74 systems, treating benchmark coverage itself as a feature worth tracking. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) approaches the problem from the other direction: auto-generating evaluation models tailored to specific agent behaviors rather than relying on generic benchmark suites.

The through-line is that benchmarks serve as a proxy for something harder to measure. When the proxy diverges from the target — because the benchmark was built for a different system, measures an easy signal instead of the hard one, or is read at the wrong level of aggregation — high scores become noise.
