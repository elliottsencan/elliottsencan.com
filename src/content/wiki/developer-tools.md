---
title: Developer tools
summary: >-
  A broad category of software built to make development, deployment, and
  infrastructure work more tractable, spanning LLM fine-tuning rigs, CI
  orchestrators, documentation platforms, Kubernetes UIs, and security
  harnesses.
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
compiled_at: '2026-07-06T00:13:07.700Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4567
    output_tokens: 853
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
  cost_usd: 0.026496
---
Developer tools in this set span several distinct layers: local machine-learning tooling, cloud infrastructure management, documentation, CI orchestration, and security. What connects them is the shared goal of reducing friction at specific points in a technical workflow.

On the ML side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) offers custom CUDA kernels for fine-tuning and running LLMs locally, claiming up to 30x faster training and 90% less memory than FlashAttention 2. A complementary utility, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm), sits one step earlier in the workflow: it calculates whether a GPU's VRAM can even load a given open-weight model, factoring in quantization level, KV cache, and activation overhead.

Documentation has its own tooling layer. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) positions itself as an AI-native documentation platform that serves knowledge to both human readers and LLMs, with support for llms.txt and MCP. The source repository for [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) takes a different approach, using a build system that weaves prose and code together into a single publishable artifact.

CI and workflow orchestration appear across multiple sources. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) runs a stateful, checkpointed workflow scheduler on AWS Lambda without keeping a persistent process alive, using a two-layer Lambda hierarchy and callback-driven coordination. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) operates at a higher abstraction, persisting workflow state at every step so distributed applications recover from failures automatically.

[Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates Kubernetes visibility into a single binary covering topology, Helm, GitOps, live traffic, and security checks, with an MCP interface for AI agents. Security is also a concern at the package level: an [Ars Technica report](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) documents 151 malicious npm packages that encoded payloads in invisible Unicode variation-selector characters, evading both code review and static analysis tools. Anthropic's [defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) addresses this class of problem with an agentic pipeline for autonomous vulnerability discovery and patching, using gVisor sandboxing.

[David Crawshaw's cloud critique](/reading/2026-07/2026-07-05t170602-building-a-cloud) sits behind all of this: he argues that current cloud abstractions, VMs tied to fixed resources and slow remote block storage, are fundamentally wrong, and that better underlying infrastructure would change what developer tools can do.
