---
title: LLM tooling
summary: >-
  The ecosystem of libraries, servers, runners, and packaging formats that
  connect large language models to code, knowledge, and external systems,
  spanning local inference runtimes to MCP servers to context-compression
  proxies.
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
compiled_at: '2026-08-29T20:19:11.118Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 1111
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
  cost_usd: 0.029781
---
LLM tooling covers the full stack between a model and the work it does: how context reaches the model, how outputs are structured and delivered, how models run locally or through APIs, and how those capabilities get packaged for distribution.

On the local inference side, the field is contested. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a desktop web UI with an OpenAI-compatible API, supporting GGUF backends, tool-calling, LoRA fine-tuning, and MCP servers. A critical piece on Ollama [argues](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) that the popular runner obscures its llama.cpp dependency, ships worse inference performance, and is pivoting toward closed-source and cloud offerings. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) shows the other side of that tradeoff: an Electron meeting assistant that lets users choose between cloud (OpenAI, Anthropic, Groq) and local (Ollama, LM Studio) backends at runtime.

Context delivery and compression are an active design problem. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) proxies tool outputs, logs, and RAG chunks through compression before they reach the model, claiming 60-95% token reduction without quality loss. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle, applying Ricker wavelet transforms to source code to produce multi-resolution structural views that give LLMs code context without language-specific parsers. Knowledge organization is equally important: [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) is a zero-dependency bash CLI that generates both a human-readable INDEX.md and a machine-readable manifest.json from tiered markdown files, and a [Reddit thread on Karpathy's LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) describes having the model build and maintain structured Markdown directly, querying at scale without RAG.

Distribution and integration tooling is consolidating around MCP. [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) describes packaging a local MCP server as a single-click .mcpb bundle for Claude Desktop. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) exposes platform expertise through an MCP server combined with markdown skill files and a Python core library, targeting Claude Code, Cursor, and Gemini CLI. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) extends documentation platforms into LLM tooling via llms.txt support and MCP-based context-aware agents.

Security and economics cut across everything. [A post on Claude Code sandboxing](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues that agentic tools with file-system access should always run inside Docker containers to prevent credential leaks and accidental data destruction. On the cost side, [a pricing analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x gap between the cheapest and most expensive frontier models, making provider-agnostic architecture essential for any tooling layer that routes to models. A Claude Code plugin called [claudish-to-english](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) illustrates how thin the extension layer can be: it rewrites assistant output through a local Ollama model, display-only by default, touching no application logic.
