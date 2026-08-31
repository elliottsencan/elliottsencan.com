---
title: Developer tools
summary: >-
  Software utilities that support the act of building, debugging, deploying, or
  maintaining other software, spanning local LLM runtimes, CI infrastructure,
  documentation platforms, security harnesses, and UI dashboards.
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
compiled_at: '2026-08-31T22:33:28.854Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4895
    output_tokens: 1113
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
  cost_usd: 0.03138
---
The category covers any tool whose primary user is a developer and whose purpose is to reduce friction somewhere in the software lifecycle. The sources here span a wide range: local model tooling, cloud infrastructure, documentation, security analysis, and UI research platforms.

On the LLM-local end, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers custom CUDA kernels for fine-tuning and inference with up to 30x training speed gains and 90% less memory than FlashAttention 2. Paired with it is [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm), a simpler but practical tool that calculates whether a given GPU can load a specific open-weight model, showing compatible quantization levels and estimated tokens per second. Both address the same friction: understanding and optimizing local hardware for LLM workloads.

For developers building on top of agents and LLMs, [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) provides a desktop cockpit for running multi-agent teams locally with persistent memory and observability. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) is narrower, offering real-time meeting transcription and AI-generated answers. Anthropic's [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) documents how to package a local MCP server into a single-click desktop extension, and [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) integrates MCP into a Kubernetes UI alongside topology views, Helm, and GitOps.

Infrastructure-layer tooling appears in [Temporal](/reading/2026-04/2026-04-30t231511-temporal), which persists workflow state to survive failures automatically, and in [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions), which uses AWS Lambda durable functions to run a stateful CI scheduler without a long-lived process. Both treat durability as a first-class property of the tool rather than something the developer must bolt on.

Documentation is represented by [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify), an AI-native platform that serves knowledge to both humans and LLMs, and by the [Crafting Interpreters repository](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters), which shows a build system weaving prose and code into a single publishable artifact.

Security tooling surfaces in two forms. [Anthropic's defending-code harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) is a reference pipeline for autonomous vulnerability discovery and patching via Claude with gVisor sandboxing. The [supply-chain attack report](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) describes a case where 151 malicious npm packages hid payloads in invisible Unicode characters, defeating static analysis and code review, which illustrates a gap that security tooling must close.

On the design-research side, [Optimal Workshop](/reading/2026-04/2026-04-30t231745-optimal-vs-usertesting) positions its platform as end-to-end UX research, covering card sorting, tree testing, and AI synthesis. The [Angular Signal Forms docs](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) represent framework-level developer tooling, providing structured guidance on form model design. And [Dan Q's itinerary app teardown](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) offers a counterpoint: that unnecessary tooling choices, like shipping a native app around plain HTML, impose real costs on both builders and users.
