---
title: Developer tools
summary: >-
  Developer tools span a wide range across the stack, from local LLM fine-tuning
  rigs and CI orchestrators to documentation platforms and security harnesses,
  united by the goal of reducing friction at each stage of building software.
sources:
  - 2026-04/2026-04-24t093356-unsloth
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t231206-poolday
  - 2026-04/2026-04-30t231412-form-model-design-angular-signal-forms
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t231511-temporal
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - 2026-04/2026-04-30t231745-optimal-vs-usertesting
  - 2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
  - 2026-05/2026-05-14t222554-piyush-mishra-00helply
  - 2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions
  - 2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-07/2026-07-05t170602-building-a-cloud
  - >-
    2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you
compiled_at: '2026-07-22T05:53:20.487Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4748
    output_tokens: 924
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
  cost_usd: 0.028104
---
The category spans anything a developer reaches for to build, run, debug, or ship software. The sources here cut across that range: low-level execution infrastructure, LLM-specific utilities, documentation, testing, and security tooling.

On the LLM side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers custom CUDA kernels that make local fine-tuning and inference practical on consumer hardware, claiming up to 30x faster training and 90% less memory than FlashAttention 2. Alongside it, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) offers a simpler calculation tool: given a GPU's VRAM, it tells you which open-weight models fit and at what quantization level. These two tools address adjacent problems, one helping you run models faster, the other helping you know whether running them is feasible at all.

[Temporal](/reading/2026-04/2026-04-30t231511-temporal) sits further down the stack, providing durable execution for distributed workflows by persisting state at every step so applications recover from failures automatically. Depot CI extends a similar idea into continuous integration, using [AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) to run a stateful, checkpointed scheduler without a long-lived process.

Documentation has its own tooling surface. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) targets AI-native documentation, serving content to both human users and LLMs via llms.txt and MCP integrations. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) takes a similar kitchen-sink approach for Kubernetes, bundling topology, Helm, GitOps, traffic monitoring, and security checks into a single binary.

Security surfaces within developer tooling as well. The [invisible Unicode supply-chain attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) targeting npm and GitHub packages illustrates how the tooling layer itself can be compromised in ways that defeat code review and static analysis. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) points the other direction, using an agentic pipeline with sandboxed execution to find and patch vulnerabilities autonomously.

[Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is a different kind of developer tool artifact: the source repository doubles as a build system that weaves prose and code into a published book, a small example of tooling built to serve a specific publishing workflow. [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) sits at the framework layer, providing form model design guidance as a developer-facing API surface. And [Dan Q's itinerary page teardown](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) argues against tooling overhead itself, replacing an Android app with a static webpage once the underlying delivery mechanism turned out to be plain HTTP.
