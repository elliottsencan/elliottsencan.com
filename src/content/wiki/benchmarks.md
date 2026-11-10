---
title: Benchmarks
summary: >-
  Benchmarks measure AI and software system performance, but sources across MAS
  research, LLM evaluation, and optimization work consistently show that
  benchmark numbers mislead when the test design does not match what the system
  actually needs to do.
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
compiled_at: '2026-11-10T01:14:52.179Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6938
    output_tokens: 997
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
  cost_usd: 0.035769
---
A benchmark is only as useful as its alignment with the real task. This gap between measurement and meaning runs through nearly every domain covered by the contributing sources.

The clearest statement of the problem comes from multi-agent systems research. [Meiklejohn's Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar tests were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery. Using them to evaluate multi-agent systems produces numbers that look meaningful but describe the wrong thing. The [Part 2 vocabulary piece](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) reinforces this by noting that the taxonomic vocabulary of MAS research itself exposes gaps including missing benchmarks for unevolved agents.

SysMoBench illustrates what happens when a benchmark is purpose-built rather than borrowed. [Cheng et al.](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) designed it specifically to test LLM-generated TLA+ specs against real system code, and the results are more informative than generic coding scores: near-perfect syntax but only around 46% conformance and 41% invariant accuracy. The models are reciting textbook protocols rather than modeling actual implementations. A borrowed benchmark would not have surfaced that distinction.

The same logic applies to reasoning-effort evaluation. [The Opus 4.7 study](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) benchmarked five effort levels across 29 real GraphQL tasks and found a non-monotonic curve: medium effort won on pass rate and cost-efficiency, while higher settings spent more without improving quality. That finding is only possible because the benchmark used actual production tasks rather than synthetic ones.

Token compression claims face the same scrutiny. [Mroczek](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) points out that RTK's reported 60-90% token savings are vanity metrics because they measure compression of Bash output only and lack task-accuracy benchmarks that would justify the reliability trade-off. Compression ratios without downstream accuracy measurement are not benchmarks; they are marketing.

Capability benchmarks for frontier models face a different challenge: tracking progress over time. [Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) measure task-completion time horizons without chain-of-thought, finding that GPT-5.5 handles roughly 3-minute human tasks at 50% reliability, with capability doubling roughly every year since 2019. This longitudinal framing turns a point-in-time score into a trendline with safety implications.

[The AI memory systems comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) takes a different approach, tabulating benchmarks as one column among many in a feature matrix across 74 systems. The inclusion of benchmarks alongside architecture and platform support treats them as one signal among several rather than the primary verdict.

Across these sources, two failure modes recur. The first is test-task mismatch: benchmarks designed for one setting get applied to another where the measured properties are not the ones that matter. The second is metric substitution: a number that is easy to measure stands in for one that is hard to measure, and the substitution goes unmarked. Both failures produce numbers that look like evidence but function as noise.
