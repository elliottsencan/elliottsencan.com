---
title: LLM tooling
summary: >-
  The ecosystem of libraries, servers, wrappers, and utilities built around LLMs
  to control inference, manage context, secure execution, and connect models to
  external systems.
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
compiled_at: '2026-10-13T00:19:32.214Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 941
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
  cost_usd: 0.027231
---
LLM tooling spans a wide surface area: local inference runtimes, context-management utilities, MCP servers for capability extension, documentation platforms, and sandboxing layers. The sources here collectively map that surface without converging on a single architecture.

At the inference layer, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline desktop runtime with an OpenAI-compatible API, GGUF/llama.cpp support, tool-calling, and MCP server integration. The [Ollama critique](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that Ollama's abstraction over llama.cpp introduced misleading model naming and inferior performance, and that its VC-backed cloud pivot now conflicts with the local-first promise. These two sources sit in tension: textgen doubles down on local-first transparency, while Ollama is criticized for moving away from it.

Context and token efficiency are a recurring concern. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different approach, applying wavelet transforms to source code to produce multi-resolution structural context without language-specific parsers. Both treat token efficiency as a first-class engineering constraint.

Knowledge management tooling addresses how LLMs access structured information. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) organizes project context as tiered markdown files with a machine-readable manifest so agents can navigate without excess token burn. The [Karpathy LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) uses the model itself to ingest and maintain a structured knowledge base, querying at scale without RAG. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) operates at the documentation layer, serving knowledge to both humans and LLMs via llms.txt and MCP.

MCP as a connectivity standard appears across multiple sources. [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) wraps Databricks expertise as an MCP server for coding assistants. Anthropic's [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) formalizes local MCP server packaging as distributable .mcpb bundles for Claude Desktop.

Security and sandboxing round out the picture. [cekrem's post](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues Claude Code should always run inside Docker's sbx sandbox to prevent credential leaks. Provider-agnosticism matters economically: the [AI pricing war analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x token-price gap across providers, making backend flexibility a business-model concern as much as a technical one.
