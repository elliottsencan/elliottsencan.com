---
title: Developer tools
summary: >-
  Developer tools span the full spectrum of software creation: local LLM
  fine-tuning rigs, CI orchestrators, Kubernetes dashboards, documentation
  platforms, and security harnesses, each addressing a distinct friction point
  in the build-run-maintain loop.
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
compiled_at: '2026-08-24T18:45:13.937Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4895
    output_tokens: 955
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
  cost_usd: 0.02901
---
The category is broad by necessity. A developer tool is anything that reduces the distance between intent and working software, whether that means calculating VRAM headroom before pulling a model, orchestrating a CI pipeline without a long-lived process, or stripping invisible Unicode from a supply chain before it executes.

On the local AI side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers up to 30x faster LLM fine-tuning with 90% less memory than FlashAttention 2, while [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) answers the prior question: whether a given GPU can run a target model at all, down to compatible quantization levels and estimated token throughput. These tools address the same problem from opposite ends, one about running what you have, the other about training on top of it.

Runtime reliability gets attention from multiple angles. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures automatically. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies a similar durability idea to CI orchestration, using AWS Lambda durable functions in a two-layer hierarchy to run checkpointed pipelines without keeping a long-lived process alive.

Kubernetes operations have their own surface area. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates topology, Helm, GitOps, live traffic, and security checks into a single open-source binary, adding MCP support so AI agents can query cluster state directly.

Documentation and form design occupy the maintenance end of the stack. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) targets AI-native documentation, serving knowledge to both humans and LLMs via llms.txt and MCP. [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) addresses a narrower but persistent pain point: keeping form models and domain models cleanly separated.

Security tooling is inseparable from the ecosystem. A supply-chain attack documented by [Ars Technica](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) embedded payloads in invisible Unicode variation-selector characters across 151 npm and GitHub packages, defeating both code review and static analysis. Anthropic's [defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) responds to that class of threat with an agentic pipeline for autonomous vulnerability discovery, triage, and patching under gVisor sandboxing.

At the edges, developer tools question their own substrate. [David Crawshaw](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that VMs, slow block devices, and expensive networking are wrong abstractions for cloud infrastructure and announces a rebuild from scratch. [Dan Q](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) makes the inverse argument at the application layer: that wrapping plain HTML in an Android app imposes unnecessary costs on developers and users alike, and a webpage would have been the right tool.
