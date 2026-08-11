---
title: LLM tooling
summary: >-
  The infrastructure layer built around large language models: local runtimes,
  knowledge management systems, MCP servers, token efficiency tools, and the
  operational concerns that emerge when connecting LLMs to real environments.
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
compiled_at: '2026-08-11T05:20:39.990Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 1106
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
  cost_usd: 0.029706
---
LLM tooling covers the practical layer between a model and useful work: how models are served locally, how context is structured and delivered, how outputs are constrained or compressed, and how the whole stack stays safe to operate.

On the local inference side, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a web UI and OpenAI-compatible API supporting GGUF, multiple backends, tool-calling, and MCP servers without any cloud dependency. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) takes a similar backend-agnostic stance for meeting transcription, supporting both cloud providers and local runtimes like Ollama and LM Studio. The Ollama ecosystem itself carries caveats: [a critical history by Zetaphor](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) documents how Ollama obscures its llama.cpp dependency, ships inferior inference performance, and has pivoted toward a closed-source cloud product.

Context engineering is a recurring concern. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) addresses it with a zero-dependency bash CLI that organizes project context as tiered markdown files, producing both a human-readable INDEX.md and a machine-readable manifest.json to let agents navigate without burning excess tokens. A complementary approach comes from [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for), an MCP server that applies Ricker wavelet transforms to source code, generating multi-resolution structural views that are token-efficient and parser-free. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) attacks the same problem from the output side, compressing tool outputs, logs, and RAG chunks before they reach the model for reported reductions of 60-95%.

Knowledge management at scale follows the pattern described in [Karpathy's LLM wiki approach](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base): the model ingests raw documents and maintains structured markdown files that can be queried without RAG, with periodic health checks to prevent drift. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) operationalizes a similar idea for documentation teams, supporting llms.txt and MCP so that docs serve both human readers and agents.

The MCP layer itself is becoming a standard integration surface. [Databricks' AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships platform expertise as an MCP server consumable by Claude Code, Cursor, and Gemini CLI. Anthropic's [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) formalizes local MCP servers as distributable .mcpb bundles for Claude Desktop. A small tool like [claudish-to-english](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) sits at the other end of that spectrum, using a local model via Ollama to post-process Claude's output into plain language.

Operational safety is not peripheral. [cekrem's argument for sandboxing Claude Code](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) makes the case that running agentic tools inside Docker's sbx container prevents credential leaks and production data loss without restricting capability. Provider economics shape tooling decisions too: [the collapse of AI pricing floors](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) argues for building provider-agnostic from day one, given a 75x spread between cheapest and most expensive frontier models.
