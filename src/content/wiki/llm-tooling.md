---
title: LLM tooling
summary: >-
  The infrastructure, utilities, and integration layers built around LLMs —
  spanning local inference runtimes, MCP servers, knowledge-base compilers,
  context optimizers, and pricing-aware deployment patterns.
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
compiled_at: '2026-09-28T23:08:05.852Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 1027
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
  cost_usd: 0.028521
---
LLM tooling covers the layer between raw model APIs and working software: the runtimes that serve models, the servers that feed them context, the utilities that shape and compress their inputs, and the deployment patterns that make them safe and affordable to run.

Local inference is one axis. Tools like [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provide an offline desktop environment with an OpenAI-compatible API, multiple backends including llama.cpp, and MCP support. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) takes a similar multi-backend stance, letting users switch between cloud providers and local runtimes like Ollama and LM Studio. Ollama itself has attracted criticism: [Zetaphor's critique](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues it obscures its llama.cpp dependency, delivers inferior inference performance, and is drifting toward a VC-driven cloud model that undermines its local-first premise.

Context management is another front. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies Ricker wavelet transforms to source code as a signal, producing multi-resolution structural views through an MCP server without language-specific parsers. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) approaches the problem from the compression side, reducing token usage 60-95% on tool outputs, logs, and RAG chunks before they reach the model. The [LostWarrior knowledge-base CLI](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) structures project context as tiered markdown with a machine-readable manifest so agents navigate knowledge without burning excess tokens.

Knowledge compilation is a related pattern. [Karpathy's LLM wiki approach](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) has the model itself ingest raw documents and maintain structured Markdown files queryable at scale without RAG. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) formalizes a similar idea at the documentation layer, serving content to both humans and LLMs via llms.txt and MCP.

Integration and distribution are also maturing. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) delivers platform expertise to coding assistants through a composable MCP server, markdown skills, and a Python library. Anthropic's [MCPB format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) packages MCP servers as single-click bundles for Claude Desktop. A [claudish-to-english plugin](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) shows tooling operating at the output layer, rewriting assistant prose via a local model.

Cost shapes everything. A [pricing analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) noting a 75x spread between the cheapest and most expensive frontier models argues for provider-agnostic architecture from day one. Safety at the execution layer matters equally: running Claude Code inside a Docker sandbox, as [cekrem recommends](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box), prevents credential leaks without sacrificing automation.
