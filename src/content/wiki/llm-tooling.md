---
title: LLM tooling
summary: >-
  The infrastructure layer around large language models: local runtimes, MCP
  servers, knowledge-base patterns, context compression, and pricing
  considerations that shape how developers build and operate LLM-powered
  systems.
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
  - 2026-08/2026-08-10t220951-gvzdvclaudish-to-english
compiled_at: '2026-08-13T21:16:21.271Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 1007
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
  cost_usd: 0.028221
---
LLM tooling spans the gap between a raw model API and a working product. The sources here cover several distinct layers: local inference runtimes, context delivery mechanisms, knowledge organization patterns, and the economics that determine which approach is practical at scale.

On the runtime side, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline desktop environment with an OpenAI-compatible API, GGUF/llama.cpp support, tool-calling, and built-in MCP server integration. It represents one pole of the local-first approach. [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that Ollama, the more popular local runtime, ships inferior inference performance relative to llama.cpp and is drifting toward a VC-funded cloud model, suggesting that runtime choice carries long-term strategic weight.

Context delivery is where much of the active experimentation lives. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies Ricker wavelet transforms to source code as a 1D signal, generating multi-resolution structural views via MCP without language-specific parsers. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) takes the compression angle, reducing tool outputs and RAG chunks by 60-95% before they reach the model. The [Databricks ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) bundles domain expertise into a composable MCP server plus markdown skill files, targeting coding assistants like Claude Code and Cursor.

Knowledge organization patterns are converging on structured markdown. The [LLM wiki-compiler pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) attributed to Andrej Karpathy has the model itself build and maintain a set of structured markdown files from raw documents, queried at scale without RAG. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) implements a tiered variant using a zero-dependency bash CLI that produces both a human-readable INDEX.md and a machine-readable manifest.json for agent navigation. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) applies a similar principle to documentation, adding llms.txt and MCP support so knowledge is served natively to agents.

Security and distribution concerns sit alongside these technical choices. [Claude Code sandboxing](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues for Docker isolation to prevent credential leaks when running agentic coding tools in auto-approve mode. Anthropic's [MCPB format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) addresses distribution by packaging MCP servers as single-click bundles for Claude Desktop.

Pricing increasingly shapes tooling decisions. A [75x gap](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) between the cheapest and most expensive frontier models makes provider-agnostic architecture a practical necessity rather than an architectural preference, a point that applies equally to tools like [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) that abstract over multiple cloud and local backends.
