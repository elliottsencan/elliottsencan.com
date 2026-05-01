---
title: Local AI
summary: >-
  Running LLMs on local hardware rather than cloud APIs, covering both the
  tooling to fit models into consumer VRAM and the training optimizations that
  make fine-tuning practical without datacenter resources.
sources:
  - 2026-04/2026-04-24t093356-unsloth
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
compiled_at: '2026-05-01T05:03:30.988Z'
compiled_with: claude-sonnet-4-6
---
Running large language models locally means trading API convenience for privacy, cost control, and offline capability. The main practical constraints are VRAM and throughput, and a small cluster of tools has emerged to address both.

The first question is whether a given model fits on your hardware at all. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) answers this directly: pick a GPU, and the tool shows which open-weight models fit in its VRAM, at which quantization level, and what token-per-second throughput to expect. Quantization is the main lever here. A model that won't fit at full precision often runs comfortably at 4-bit or 8-bit, with acceptable quality loss depending on the task.

Once you know a model fits, fine-tuning it locally is the next barrier. Standard full-parameter training is memory-prohibitive on consumer hardware. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) addresses this with hand-written CUDA kernels that cut memory use by up to 90% compared to FlashAttention 2 and speed up training by up to 30x. It supports LoRA adapters, which update only a small fraction of parameters, and covers over 500 models including vision and audio variants. A no-code studio lowers the barrier further for users who don't want to write training scripts.

Together these tools reflect the current shape of local AI work: quantization to fit inference into consumer VRAM, and LoRA plus optimized kernels to make fine-tuning tractable on the same hardware.
