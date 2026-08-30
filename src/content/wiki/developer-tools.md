---
title: Developer tools
summary: >-
  A broad category of software purpose-built to aid programmers and technical
  teams across the full stack — from LLM fine-tuning and CI orchestration to
  documentation platforms, security harnesses, and Kubernetes dashboards.
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
compiled_at: '2026-08-30T05:51:41.204Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4895
    output_tokens: 1083
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
  cost_usd: 0.03093
---
Developer tools span every layer of the modern stack, and the sources here reflect that breadth: local LLM utilities, cloud infrastructure critics, CI orchestrators, documentation platforms, and security research frameworks all fall under the umbrella.

On the LLM-adjacent side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers custom CUDA kernels that reduce fine-tuning memory by 90% and speed it up 30x versus FlashAttention 2, making local model training practical on consumer hardware. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) complements this by letting users check whether their GPU's VRAM can handle a given open-weight model at various quantization levels before they commit to a download. At the desktop layer, [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) wraps real-time transcription and LLM inference into an Electron meeting assistant, supporting both cloud and local backends. [OpenAgentD](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) extends this further with a full cockpit for coordinating local agent teams, including persistent memory and built-in observability.

Infrastructure tooling surfaces in several forms. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) uses AWS Lambda durable functions to run a checkpointed CI scheduler without a persistent process, a design that trades long-lived servers for callback-driven state. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) generalizes this idea into a durable execution platform that persists workflow state at every step. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) bundles topology, GitOps, live traffic, and security checks into a single-binary Kubernetes UI with no cloud account required.

[Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) represents a newer class of tooling: documentation platforms built to serve both human readers and LLMs, with MCP and llms.txt support baked in. [Anthropic's defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) pushes further, offering a reference pipeline for autonomous vulnerability discovery and remediation using Claude inside a gVisor sandbox. The [MCPB packaging guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) shows how local MCP servers can be distributed as single-click bundles for Claude Desktop.

Not all tools are cutting-edge. [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is a book-as-repository: prose and code woven together into a working build system, two complete interpreter implementations, and a freely published site. The [supply-chain attack report](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) is a reminder that the npm and GitHub ecosystems that host most developer tools are themselves attack surfaces; 151 malicious packages embedded payloads in invisible Unicode characters that bypassed static analysis entirely.

[David Crawshaw's cloud critique](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that foundational developer infrastructure — VMs, block devices, networking — is built on wrong abstractions, motivating a ground-up rebuild. At the opposite extreme, [Dan Q's itinerary app teardown](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) shows how unnecessary tooling complexity (a full Android app serving plain HTML) imposes costs on developers and users alike.
