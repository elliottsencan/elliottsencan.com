---
title: LLM tooling
summary: >-
  The ecosystem of libraries, servers, runtimes, and packaging formats that
  connect large language models to codebases, knowledge bases, and external
  services, spanning local inference, MCP integration, context compression, and
  provider abstraction.
sources:
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama
  - 2026-05/2026-05-05t071908-oobaboogatextgen
  - 2026-05/2026-05-14t222554-piyush-mishra-00helply
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - 2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb
  - >-
    2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on
  - >-
    2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for
  - 2026-06/2026-06-20t145835-chopratejasheadroom
compiled_at: '2026-06-20T22:09:49.353Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4233
    output_tokens: 885
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
  cost_usd: 0.025974
---
LLM tooling covers the infrastructure layer that sits between a raw model and a useful application: runtimes that serve inference, servers that expose capabilities, libraries that shape context, and packaging conventions that ship everything together.

On the local inference side, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a desktop runtime supporting GGUF/llama.cpp, tool-calling, LoRA fine-tuning, and an OpenAI-compatible API. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) sits at the other end of the stack, routing between cloud providers and local backends like Ollama and LM Studio depending on user preference. The choice of runtime matters: [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues Ollama ships inferior inference performance relative to llama.cpp and has drifted toward a VC-driven cloud model, obscuring its dependencies along the way.

Context management is a recurring theme. [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks by 60-95% before they reach the model. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle, applying Ricker wavelet transforms to source code so an MCP server can deliver multi-resolution structural views without language-specific parsers. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) addresses the same token pressure at the knowledge organization layer, using tiered markdown files and a manifest.json so agents navigate without burning excess tokens.

The Model Context Protocol has become a connective tissue across several of these tools. [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) exposes Databricks expertise to coding assistants via an MCP server. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) serves documentation to both humans and LLMs through MCP and llms.txt. Anthropic's [MCPB format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) packages local MCP servers as single-click bundles for Claude Desktop.

Security and cost cut across all of it. [Running Claude Code in Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) isolates agentic tool use to prevent credential leaks and accidental production writes. [AI Model Pricing](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between cheapest and most expensive frontier APIs, making provider-agnostic abstractions a financial necessity rather than an architectural preference.
