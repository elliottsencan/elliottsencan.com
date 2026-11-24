---
title: Developer tools
summary: >-
  Software tools that help developers build, test, debug, run, and understand
  systems — spanning LLM fine-tuning rigs, CI orchestrators, documentation
  platforms, security scanners, and more.
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
  - 2026-08/2026-08-10t220951-gvzdvclaudish-to-english
compiled_at: '2026-11-24T03:55:22.628Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4895
    output_tokens: 915
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
  cost_usd: 0.02841
---
The category spans everything a developer reaches for outside the core language runtime: build tools, debuggers, documentation generators, platform dashboards, and increasingly AI-augmented utilities. What unites the sources here is less a single paradigm than a snapshot of where tooling attention is concentrated right now.

On the LLM side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) addresses the gap between hardware limits and model training, delivering custom kernels that cut memory usage by up to 90% compared to FlashAttention 2. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) handles the complementary problem of inference: given a specific GPU's VRAM, it calculates which open-weight models fit and at what quantization level. Together they illustrate a pattern where tooling absorbs complexity that used to require deep hardware knowledge.

Documentation and form design represent the more established end of the spectrum. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) positions itself as AI-native, serving knowledge to both humans and LLMs via llms.txt and MCP. [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) takes a narrower slice, specifying how form models should be typed and structured to avoid impedance mismatch with domain models.

Infrastructure tooling shows up in several forms. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state so distributed applications recover from failures without manual reconciliation. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies a similar durability approach to CI orchestration, using AWS Lambda durable functions in a two-layer scheduler hierarchy. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates Kubernetes topology, Helm, GitOps, and live traffic into a single binary dashboard.

Security is a cross-cutting concern. The [Ars Technica report on Unicode supply-chain attacks](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) shows that 151 malicious npm packages encoded payloads in invisible variation-selector characters, bypassing static analysis and human review. [Anthropic's defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) responds to exactly this kind of threat with an agentic pipeline for autonomous vulnerability discovery and patching inside a gVisor sandbox.

At the edges, tools question their own category. [Robert Nystrom's Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is itself a build system that weaves prose and code into a final site, making the toolchain part of the artifact. [Dan Q's piece on app culture](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) argues that wrapping plain HTML in an Android app imposes unnecessary cost on developers and users alike, a reminder that tooling choices carry real tradeoffs beyond capability checklists.
