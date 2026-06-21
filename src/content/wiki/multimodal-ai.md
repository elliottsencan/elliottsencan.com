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
compiled_at: '2026-06-21T18:38:48.170Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2455
    output_tokens: 405
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
  cost_usd: 0.01344
---
Multimodal AI refers to systems that operate across more than one data modality rather than text alone. The clearest picture of where this field stands comes from [a 2025 Hugging Face survey](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger), which documents rapid progress in vision language models (VLMs): architectures now handle any-to-any modality conversion, mixture-of-experts decoders, video understanding, and multimodal retrieval-augmented generation, all while shrinking to sizes that run on consumer hardware without meaningful capability loss.

That last point connects to local inference tools like [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen), which supports multimodal input alongside standard text generation, letting users run vision-capable models entirely offline through a browser UI. Multimodal capability is no longer a cloud-only feature.

On the production side, [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) illustrates what multimodal pipelines look like when embedded in agentic workflows: the platform orchestrates 100-plus generative models to cut, trim, and synthesize video assets end-to-end. That is a practical example of the agentic VLM applications the Hugging Face survey identifies as an emerging frontier, where models do not just interpret images but act on them within larger automated systems.
