---
title: Developer tools
summary: >-
  Software tools that support the construction, testing, deployment,
  documentation, and maintenance of other software, spanning LLM fine-tuning, CI
  orchestration, Kubernetes management, documentation platforms, security
  scanning, and UX research.
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
compiled_at: '2026-06-20T12:35:19.433Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4430
    output_tokens: 1079
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
  cost_usd: 0.029475
---
Developer tools cover a wide surface area, and the sources here illustrate that breadth without sharing a single unifying theme beyond making software work easier to build or operate.

On the local AI development side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) provides custom CUDA kernels for fine-tuning and running LLMs with dramatically reduced memory and training time, while [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) helps practitioners figure out whether their GPU can actually load a given model before they try. These tools address the practical friction of working with large models on consumer or prosumer hardware.

For teams building agent-based systems, [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) offers an open-source desktop cockpit for coordinating local AI agents with persistent memory and observability built in. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) takes a narrower angle, packaging real-time transcription and LLM-backed answers into an Electron meeting assistant. Anthropic's [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) and [defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) show tooling moving toward agentic security workflows, with the latter providing a reference pipeline for autonomous vulnerability scanning and patching.

Infrastructure tooling appears in [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui), a single-binary Kubernetes UI that consolidates topology, GitOps, live traffic, and MCP support without requiring a cloud account. CI gets a novel treatment in [Depot's Lambda durable functions post](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions), which describes a stateful, checkpointed workflow scheduler built on AWS Lambda instead of a persistent process, reducing idle cost while maintaining reliable job coordination.

Documentation is itself a developer tool concern. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) positions its platform as AI-native, serving knowledge to both humans and LLMs via llms.txt and MCP integration. Angular's [Signal Forms documentation](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) is a more conventional example: reference material that guides developers through model design decisions with specificity about types and structure.

Security intersects developer tooling in a sharp way. [The invisible Unicode supply-chain attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) describes 151 malicious npm packages that evaded code review and static analysis by encoding payloads in invisible variation-selector characters, a reminder that the package ecosystem itself is part of the developer tool surface and carries its own risk.

Rounding out the set, [Optimal Workshop](/reading/2026-04/2026-04-30t231745-optimal-vs-usertesting) and [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) represent opposite ends of the spectrum: one a UX research platform comparing itself to UserTesting on feature breadth, the other a book and build system for learning how interpreters work from scratch. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) sits in the infrastructure layer, offering durable execution so distributed workflows survive failures without manual reconciliation. [Poolday](/reading/2026-04/2026-04-30t231206-poolday) applies multi-agent orchestration to video editing, illustrating how developer-tool patterns, agent pipelines and composable model calls, are reaching creative production workflows.
