---
title: Benchmarks
summary: >-
  Benchmarks measure AI model capabilities, but across multi-agent systems, LLM
  reasoning, and hardware compatibility, the sourced literature consistently
  finds that current benchmarks measure the wrong things or measure them poorly.
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
compiled_at: '2026-06-22T02:33:09.592Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6204
    output_tokens: 922
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
  cost_usd: 0.032442
---
A benchmark is only as useful as its fit to the behavior it claims to measure. Across LLMs, multi-agent systems, and hardware performance, a recurring finding in the literature is that benchmarks are routinely misapplied, repurposed beyond their original scope, or designed around convenient proxies rather than the properties that actually matter in production.

In multi-agent systems research, the mismatch is structural. [Meiklejohn's benchmarks installment](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar tests were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery. The field has adopted them anyway, producing numbers that look comparable but describe different things. The [MAS vocabulary piece](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) reinforces this, noting that gaps like unevolved agents and missing coordination benchmarks are exposed precisely by trying to map existing taxonomic terms onto existing test suites.

Even benchmarks designed for specific capabilities show ceiling and floor effects that mislead. SysMoBench, which tests LLMs on generating TLA+ specifications from real system code, [finds near-perfect syntax scores but only ~46% conformance and ~41% invariant scores](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), revealing that models recite textbook protocols rather than faithfully modeling actual implementations. Syntax fluency is easy to measure and looks good; semantic correctness is harder and tells a different story.

Benchmarks also interact with model behavior in non-linear ways. A hands-on test of Claude Opus 4.7 across five reasoning-effort levels on 29 real coding tasks [found a non-monotonic curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning): medium effort won on pass rate, equivalence, code review, and cost-efficiency, while higher effort settings spent more without improving quality. Assuming that more reasoning always improves benchmark scores is wrong.

Hardware compatibility tools like [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) apply a different kind of benchmark thinking: estimating tokens-per-second from VRAM constraints, model weight sizes, KV cache, and activation overhead. These are engineering estimates rather than quality measures, but they share the same core challenge: the metric (compatible quantization level) is a proxy for the experience a user actually cares about.

Capability benchmarks tied to time horizons face their own issues. [Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) measure how long a task a frontier model can complete at 50% reliability without chain-of-thought, finding GPT-5.5 handles roughly 3-minute human tasks. The doubling rate they identify carries safety implications precisely because capability benchmarks inform monitoring assumptions.

The pattern across sources is consistent: benchmarks tend to crystallize around what is tractable to measure, not what matters most. Coordination overhead, semantic fidelity, failure recovery, and real-world task complexity all resist clean quantification, which is why they remain underrepresented even as the systems being evaluated grow more complex.
