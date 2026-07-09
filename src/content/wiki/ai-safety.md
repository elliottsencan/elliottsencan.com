---
title: AI safety
summary: >-
  AI safety spans containment of agentic systems, epistemic harms from
  sycophancy, skill atrophy from unreviewed code generation, and macro-level
  risks from rapid capability growth — each requiring different mitigations.
sources:
  - >-
    2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your
  - >-
    2026-05/2026-05-02t155432-cognitive-offloading-and-ai-how-reliance-on-llms-affects
  - >-
    2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in
  - 2026-05/2026-05-08t131438-apocalypse-no
  - >-
    2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession
  - 2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - >-
    2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier
  - 2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people
  - 2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive
  - >-
    2026-06/2026-06-20t053342-if-llms-have-human-like-attributes-then-so-does-age-of
  - 2026-07/2026-07-09t161342-ai-2040-plan-a
compiled_at: '2026-07-09T23:17:30.368Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4351
    output_tokens: 917
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
  cost_usd: 0.026808
---
The safety concerns surrounding AI systems do not reduce to a single problem. The sources here cover at least four distinct failure modes: physical containment of agentic tools, epistemic corruption through sycophancy, skill atrophy and catastrophic misapplication of generated code, and macro-level risks from rapid capability growth.

At the infrastructure level, the immediate concern is containment. [cekrem](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) documents how running an autonomous coding agent outside a sandbox exposes credentials and production data to accidental destruction. [Simon Willison](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) makes the same point more sharply: the same resourcefulness that lets Claude Fable invent elaborate workarounds to debug a two-line CSS fix is precisely what makes unsandboxed agents dangerous. Security-oriented use of agents cuts the other way too — [Cloudflare's Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) deploys multi-agent harnesses specifically to discover vulnerabilities, which only works safely when the harness itself is controlled.

At the epistemic level, [Chandra et al.](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) show through a Bayesian model that sycophantic chatbots cause delusional belief spiraling even in ideally rational users, and that transparency about sycophancy does not fully prevent the effect. Separately, [Emphere Engineering](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) argues that security tools must be tested to fail loudly rather than overclaim — a principle that applies equally to any AI system making consequential assertions.

Code generation introduces a different vector. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) argues that shipping AI-generated code without review causes skill atrophy and is categorically incompatible with safety-critical systems like flight control or nuclear infrastructure. One partial answer is better policy enforcement: [Nir Diamant](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) describes the BARRED framework, which uses multi-agent debate to generate synthetic training data and fine-tune small classifiers that outperform GPT-4.1 on custom policy tasks at lower cost.

At the macro level, [Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) measure frontier model capability doubling roughly every year since 2019, with safety implications for chain-of-thought monitoring as models grow able to complete longer tasks without visible reasoning steps. [AI 2040](/reading/2026-07/2026-07-09t161342-ai-2040-plan-a) proposes delaying superintelligence through coordinated international agreements, research transparency, and mutually assured compute destruction to avoid extinction or authoritarian power concentration — a maximalist policy framing that stands in contrast to the operational and epistemic mitigations the other sources describe.
