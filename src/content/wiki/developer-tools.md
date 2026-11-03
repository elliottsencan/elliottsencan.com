---
title: Developer tools
summary: >-
  A broad category of software that accelerates, automates, or otherwise
  improves the process of building and running other software, spanning local
  LLM infrastructure, CI systems, documentation platforms, security harnesses,
  and UI toolkits.
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
compiled_at: '2026-11-03T00:37:08.853Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4895
    output_tokens: 1160
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
  cost_usd: 0.032085
---
Developer tools is a sprawling category defined less by any single design pattern than by a shared intent: reduce the friction between an idea and working software. The sources here illustrate several distinct clusters where that friction is currently being attacked.

Local LLM infrastructure has become a tooling category of its own. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers custom CUDA kernels for fine-tuning and running models locally, claiming up to 30x faster training and 90% less memory than FlashAttention 2. Before reaching that stage, developers need to know whether their hardware is even capable; [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) answers that question interactively, calculating compatible quantization levels and estimated tokens-per-second from VRAM constraints.

Documentation and knowledge surfaces are also being rebuilt for the LLM era. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) positions itself as an AI-native documentation platform serving content to both human readers and LLM agents via llms.txt and MCP. On the opposite end of the complexity spectrum, [gvzdv/claudish-to-english](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) is a single Claude Code plugin that pipes assistant output through a local model to produce plainer prose.

Infrastructure and orchestration tooling represents a third cluster. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures automatically. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies a similar durability principle to continuous integration, using AWS Lambda durable functions as a stateful scheduler. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates Kubernetes topology, Helm, GitOps, live traffic, and security checks into a single open-source binary.

Security tooling is both a use case and a trust problem for the category. [Anthropic's defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) provides a reference pipeline for autonomous vulnerability discovery and patching using Claude with gVisor sandboxing. Against that, [the npm supply-chain attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) illustrates that the tooling ecosystem itself is an attack surface: 151 malicious packages hid payloads in invisible Unicode variation-selector characters, bypassing static analysis and code review entirely.

Ecosystem packaging is an ongoing design challenge. [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) documents how to bundle a local MCP server as a single-click installable for Claude Desktop, addressing distribution friction directly. The companion piece on [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) reflects a different kind of packaging concern: how framework APIs should model domain data cleanly at the boundary between form state and application logic.

Some entries argue from first principles about the costs of existing tooling. [David Crawshaw's Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) contends that VMs, remote block devices, and cloud networking are the wrong abstractions for most workloads. [Dan Q's webpage essay](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) makes the same point at the other end of the stack: an Android app delivering plain HTML over HTTP is a tooling choice that imposes unnecessary cost on both developer and user.

[Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) sits at the foundation of the category, providing complete implementations of two interpreters for a teaching language, demonstrating that understanding how tools work at the language runtime level is part of what it means to use them well.
