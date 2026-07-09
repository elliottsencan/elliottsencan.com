---
title: Developer tools
summary: >-
  A broad category of software that helps engineers build, test, run, and
  understand other software, spanning fine-tuning runtimes, CI orchestrators,
  documentation platforms, Kubernetes UIs, and security harnesses.
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
compiled_at: '2026-07-09T14:11:34.335Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4567
    output_tokens: 832
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
  cost_usd: 0.026181
---
The term covers a wide spectrum: tools that reduce friction in a specific workflow, platforms that unify multiple workflows, and infrastructure that makes other tools possible. What connects them is that the end user is a developer, and the output is working software rather than a consumer product.

On the AI-adjacent end, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) optimizes LLM fine-tuning with custom CUDA kernels, cutting memory use by up to 90% and training time dramatically compared to FlashAttention 2. Alongside it, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) answers the prerequisite question of whether a given GPU can run a target model at all, calculating VRAM requirements across quantization levels before a developer commits to a workflow.

Documentation is its own tool category. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) positions itself as an AI-native docs platform that serves knowledge to both human readers and LLMs via llms.txt and MCP integration, recognizing that documentation is now consumed by agents as much as by people.

Orchestration and reliability tooling occupies another layer. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies a similar durability principle to CI pipelines, using AWS Lambda durable functions and a two-layer scheduler to run stateful builds without a long-lived process.

Observability and cluster management get their own surface in [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui), an open-source Kubernetes UI that consolidates topology, Helm, GitOps, live traffic, and security checks into a single binary. The inclusion of an MCP interface reflects a recurring pattern: tools are increasingly built to be consumed by AI agents, not just human operators.

Security tooling is part of the same ecosystem and carries its own risks. A [supply-chain attack on npm and GitHub](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) embedded malicious payloads in invisible Unicode characters, bypassing code review and static analysis. On the defensive side, Anthropic's [defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) provides a reference pipeline for autonomous vulnerability discovery and patching using Claude inside a gVisor sandbox.

At the infrastructure level, [crawshaw.io's critique of cloud platforms](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that VMs, remote block storage, and networking abstractions are the wrong foundation for modern developer tools, and that fixing developer experience requires rebuilding from lower in the stack.
