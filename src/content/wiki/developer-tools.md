---
title: Developer tools
summary: >-
  Software tools that directly support the work of building, running, debugging,
  and maintaining software — spanning local utilities, cloud platforms,
  documentation systems, and AI-augmented pipelines.
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
compiled_at: '2026-07-19T14:36:03.591Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4748
    output_tokens: 957
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
  cost_usd: 0.028599
---
The category spans a wide range of concerns: tooling for LLM fine-tuning, GPU compatibility checking, CI orchestration, documentation, workflow durability, security scanning, Kubernetes management, and more. What connects them is that each tool targets a discrete pain point in the software development lifecycle rather than claiming to address everything at once.

On the local-first end, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers custom CUDA kernels for fine-tuning and running LLMs with significantly lower memory overhead than standard approaches, and [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) gives practitioners a quick check on whether their GPU can actually load a given model at a given quantization level before committing to a download. Both address the friction of working with large models outside of cloud APIs.

Documentation has its own tooling category. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) positions itself as an AI-native docs platform that serves knowledge to both humans and LLMs, with MCP integration and llms.txt support. [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) takes a different angle: its build system weaves code and prose into a single publishable artifact, treating the toolchain as part of the pedagogical artifact itself.

CI and workflow durability intersect in [Depot's use of AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions), which runs a stateful CI scheduler without a persistent process, and [Temporal](/reading/2026-04/2026-04-30t231511-temporal), a durable execution platform that persists workflow state across failures. Both address the same underlying problem — distributed state is hard to manage reliably — from different layers of the stack.

[Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates Kubernetes management, GitOps, live traffic, and security checks into a single binary with MCP support for AI agents. [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) takes a similar consolidation approach for local AI agent teams, providing a desktop cockpit with built-in observability and persistent memory.

Security is a recurring concern at the tooling layer. The [supply-chain attack using invisible Unicode](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) in npm packages illustrates that standard code review and static analysis tools were insufficient to detect the payloads, a gap that [Anthropic's defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) begins to address through agentic vulnerability scanning and patching pipelines.

At the infrastructure level, [exe.dev's critique of cloud abstractions](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that VMs, remote block devices, and networking overhead represent foundational design mistakes that downstream tooling cannot fully compensate for. And [the case for webpages over apps](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) cuts in the opposite direction: sometimes the right tool is the simplest one, and the ecosystem of app distribution imposes unnecessary complexity on both builders and users.
