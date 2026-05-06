---
title: LLM tooling
summary: >-
  The ecosystem of tools for running, serving, and organizing knowledge for LLMs
  spans local inference runtimes, documentation platforms, and structured
  knowledge bases, with transparency and context efficiency as recurring
  concerns.
sources:
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama
  - 2026-05/2026-05-05t071908-oobaboogatextgen
compiled_at: '2026-05-06T16:12:27.740Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3065
    output_tokens: 661
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
  cost_usd: 0.01911
---
LLM tooling covers the software layer between raw model weights and useful outputs: runtimes that serve models locally, platforms that structure knowledge for LLM consumption, and utilities that manage the context passed to a model at query time.

On the local inference side, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline desktop app with support for tool-calling, LoRA fine-tuning, vision, and an OpenAI-compatible API, all with no telemetry. [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that Ollama, a popular alternative, obscures its llama.cpp dependency, misleads users with model naming conventions, and has drifted toward cloud monetization, positioning more transparent tools as the better choice for users who want genuine local control.

On the knowledge organization side, two approaches address how to feed structured information to models without burning unnecessary tokens. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) is a zero-dependency bash CLI that organizes project context as tiered markdown files, generating both a human-readable INDEX.md and a machine-readable manifest.json so agents can navigate large knowledge bases efficiently. The Karpathy wiki pattern described in [a Reddit guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) takes a different angle: rather than retrieval-augmented generation, it has the model itself ingest raw documents and maintain structured markdown files, then queries those files directly at scale, with periodic health checks to prevent knowledge drift.

[Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) sits at the documentation end of the stack, serving knowledge to both human users and LLMs through support for llms.txt, MCP, and context-aware agents. That positions it as infrastructure for teams whose documentation needs to be machine-readable as a first-class concern, not an afterthought.

The through-line across these sources is context efficiency and transparency. Whether the question is which runtime to trust, how to structure a knowledge base, or how to serve docs to an agent, the practical pressure is the same: get the right information into the model's context window without waste, and do it with tools whose behavior you can actually inspect.
