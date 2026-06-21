---
title: Developer tools
summary: >-
  A broad category of software that supports building, running, debugging, and
  securing other software, spanning local LLM tooling, CI infrastructure,
  documentation platforms, Kubernetes UIs, and security-aware package tooling.
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
compiled_at: '2026-06-21T20:07:57.298Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4430
    output_tokens: 1022
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
  cost_usd: 0.02862
---
The phrase covers any software whose primary user is a developer working on another system. The sources here span several distinct niches, but a few patterns recur: reducing operational friction, making invisible state visible, and hardening pipelines against failure or attack.

On the LLM side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) compresses the cost of fine-tuning dramatically, claiming up to 30x faster training and 90% less memory than FlashAttention 2. A complementary concern is simply knowing whether a model will fit before attempting to run it; [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) addresses this by computing VRAM requirements against a specific GPU and quantization level. For teams running local agent workflows, [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) provides a desktop cockpit with multi-agent coordination, observability, and support for 15 LLM providers.

Documentation and form modeling sit at the integration layer between a tool and its users. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) targets both human readers and LLM consumers, supporting llms.txt and MCP for context-aware agents. Angular's Signal Forms guide [from angular.dev](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) represents a narrower slice: best practices for structuring form models so they map cleanly to domain types.

Infrastructure tooling appears in two forms here. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) provides durable execution for distributed workflows, persisting state at every step so applications recover from failure automatically. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies a similar durable-function pattern to CI scheduling via AWS Lambda, checkpointing workflow state without a persistent process. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) brings this visibility principle to Kubernetes, consolidating topology, Helm, GitOps, and live traffic into a single open-source binary.

Security is increasingly a first-class concern in the tooling layer. [Ars Technica's report on invisible Unicode attacks](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) documents 151 malicious npm and GitHub packages that encoded payloads in variation-selector characters, bypassing code review and static analysis. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) responds to this class of threat with an agentic pipeline for autonomous vulnerability discovery and patching, using gVisor sandboxing.

A few entries fill out the edges: [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is a foundational resource for developers building language tooling, [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) is a desktop meeting assistant bridging cloud and local LLM backends, [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) applies multi-agent orchestration to video editing, and [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) covers packaging local MCP servers for one-click installation in Claude Desktop.
