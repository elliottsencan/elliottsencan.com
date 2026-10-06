---
title: Benchmarks
summary: >-
  Benchmarks measure AI and software performance, but across ML, multi-agent
  systems, and infrastructure, the cited sources collectively show that
  benchmark numbers frequently misrepresent what actually matters in production.
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
compiled_at: '2026-10-05T23:48:17.837Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6938
    output_tokens: 1283
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
  cost_usd: 0.040059
---
A benchmark is only as useful as the thing it measures, and the recurring problem across these sources is that the thing being measured is often the wrong thing.

The clearest indictment comes from multi-agent systems research. [Meiklejohn's Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar tests were designed for single agents and cannot capture coordination quality, communication overhead, or failure recovery — the properties that actually distinguish multi-agent architectures. The result is that published MAS numbers look competitive while obscuring the failure modes that [Wave 2 empirical work](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) found happening 41–87% of the time in production. [The vocabulary post](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) makes the structural point: taxonomic gaps like unevolved agents and missing benchmarks are two sides of the same problem — the field lacks the concepts needed to write tests for what it can't yet name.

The benchmark gap is not unique to agents. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds that frontier LLMs score near-perfect on TLA+ syntax but only around 46% on conformance and 41% on invariants — meaning models recite textbook protocol shapes rather than faithfully modeling the actual system under test. High scores on the surface metric actively conceal the failure on the task that matters.

Quantization and inference tools face an analogous credibility problem. The [RTK token compression critique](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) labels 60–90% compression claims as vanity metrics because the tool strips only Bash output, risks silent data loss, and provides no task-accuracy numbers that would let a practitioner know whether the savings are real. Similarly, [the Opus 4.7 reasoning-effort benchmark](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) finds that the relationship between a model's self-reported reasoning effort and actual output quality is non-monotonic: medium effort beats high, xhigh, and max on pass rate and cost efficiency alike. The implication is that effort-level labels are not a reliable proxy for the metric users care about.

Even when a benchmark is valid, a performance improvement on it can fail to matter. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three structural reasons: attention thresholds (gains below a perceptible level change nothing), discrete capacity increments (a 3x speedup doesn't help if you need exactly 4 servers), and pipeline backpressure (optimizing a non-bottleneck stage leaves end-to-end latency unchanged). The [image-rs blur optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) achieves a genuine 5.9x speedup through integer accumulators and reciprocal multiplication, but the Breck framing is a useful corrective: whether that number translates to any user-visible outcome depends entirely on where blur sits in the rendering pipeline.

The [AI memory systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) and [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) represent the other end of the spectrum: tools designed to surface the specific numbers practitioners need (VRAM headroom, tokens-per-second at a given quantization, benchmark coverage by architecture) rather than headline figures optimized for press releases. The [no-CoT task horizon study](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) takes a similar approach, choosing 50% reliability on tasks of measurable human duration as the unit rather than aggregate accuracy scores, which makes the capability doubling rate interpretable in safety terms.

The through-line is that benchmark design determines what a field can see. When the metric doesn't match the failure mode, high scores mask low reliability — and the [MAS open questions post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) notes that the field is quietly rediscovering distributed systems problems precisely because it lacked the vocabulary, and the benchmarks, to name them earlier.
