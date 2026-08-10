---
title: Developer tools
summary: >-
  Developer tools span the full stack of software creation — from LLM
  fine-tuning rigs and GPU calculators to CI orchestrators, documentation
  platforms, and security harnesses — collectively reflecting a moment when the
  toolchain itself is being rebuilt around AI and durability.
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
compiled_at: '2026-08-10T18:59:37.180Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4748
    output_tokens: 882
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
  cost_usd: 0.027474
---
The category is broad by definition: anything that helps a developer write, run, test, deploy, or understand software. What the current crop of tools shares is a tendency to absorb complexity that used to be the developer's manual burden.

On the local-AI end, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) offers fine-tuning with custom CUDA kernels that cut training time by up to 30x and memory by 90% compared to FlashAttention 2. Before you commit to fine-tuning at all, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) lets you check whether your GPU's VRAM can actually run a given open-weight model, showing compatible quantization levels and estimated tokens-per-second.

Durability and reliability are a recurring theme on the infrastructure side. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without custom reconciliation logic. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) takes a related approach, using AWS Lambda durable functions to run a stateful, checkpointed CI scheduler without any long-lived process. Both are responses to the same problem: distributed systems fail, and the orchestration layer should absorb that cost rather than push it onto application code.

Documentation and UI tooling are also evolving. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) positions itself as an AI-native documentation platform that serves knowledge to both humans and LLMs via llms.txt and MCP. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates Kubernetes topology, Helm, GitOps, live traffic, and security checks into a single open-source binary with MCP support for AI agents.

Security tooling is under pressure from novel attack surfaces. A [supply-chain attack reported by Ars Technica](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) embedded malicious payloads in invisible Unicode variation-selector characters across 151 npm and GitHub packages, bypassing code review and static analysis. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) approaches the other side of that problem, using an agentic Claude pipeline with gVisor sandboxing to autonomously discover and patch vulnerabilities.

At a more foundational level, [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) represents the educational end of developer tooling — a complete book and two working interpreter implementations showing how language runtimes are built from scratch. And [David Crawshaw's critique of cloud abstractions](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that even the infrastructure underneath all these tools is built on the wrong primitives, with VMs tied to fixed resources and slow remote block storage creating unnecessary overhead.
