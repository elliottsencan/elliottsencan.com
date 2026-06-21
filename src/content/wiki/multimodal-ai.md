---
title: Multimodal AI
summary: >-
  AI systems that process and generate across multiple modalities, including
  text, images, video, and audio, with vision language models leading practical
  deployment in 2025.
sources:
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - 2026-04/2026-04-30t231206-poolday
  - 2026-05/2026-05-05t071908-oobaboogatextgen
compiled_at: '2026-06-21T20:22:20.879Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2455
    output_tokens: 409
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
  cost_usd: 0.0135
---
Multimodal AI refers to systems that handle more than one data type, typically combining text with images, video, or audio. The dominant practical form today is the vision language model (VLM), a class of model that has advanced substantially in 2025 across architecture, size, and capability [Vision Language Models](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger).

Recent VLM progress spans several fronts: any-to-any architectures that accept and emit arbitrary modality mixes, mixture-of-experts decoder designs, smaller models that perform competitively with earlier large ones, video understanding, multimodal retrieval-augmented generation, and agentic applications where VLMs drive tool use and multi-step tasks. Safety-specific multimodal models have also emerged as a distinct category.

Beyond research, multimodal capability is appearing in production tooling. Poolday's Creator-1 platform orchestrates over 100 generative models to execute video edits end-to-end [Poolday](/reading/2026-04/2026-04-30t231206-poolday), treating multimodal generation as an automated pipeline output rather than a manual creative step. On the local inference side, oobabooga's text generation UI supports multimodal input alongside standard LLM features [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen), making vision-capable models accessible without cloud dependencies.
