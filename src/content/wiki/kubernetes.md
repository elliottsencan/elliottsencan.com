---
title: Kubernetes
summary: >-
  Kubernetes is the dominant container orchestration platform; recent sources
  cover its operational complexity, the tooling built to manage it, and its role
  as infrastructure for platform engineering and AI inference workloads.
sources:
  - 2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui
  - 2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui
  - >-
    2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like
  - 2026-05/2026-05-06t204115-platform-engineering-end-to-end
  - 2026-06/2026-06-21t130559-what-is-inference-engineering
compiled_at: '2026-06-22T02:41:15.182Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2792
    output_tokens: 570
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
  cost_usd: 0.016926
---
Kubernetes orchestrates containerized workloads across clusters, handling scheduling, networking, storage, and lifecycle management at scale. Its power comes with operational weight: platform teams routinely juggle kubectl alongside multiple specialized tools to get a coherent picture of what is running and why.

That fragmentation is the direct motivation behind Radar, an open-source single-binary UI described by both [its Product Hunt listing](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) and [its own site](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) as a replacement for that patchwork. Radar surfaces real-time topology, Helm releases, GitOps state, live traffic, image inspection, and security audits across multiple clusters in one interface, licensed under Apache 2.0 with no cloud account required.

Understanding what Kubernetes actually manages requires knowing how containers work at the Linux level. A tutorial by Ivan Velichko at iximiuz Labs [builds a container from scratch](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) using unshare, mount, and pivot_root, making concrete how mount namespaces and root filesystem isolation underpin every pod Kubernetes schedules.

Kubernetes also appears as a foundational layer in platform engineering. Luca Cavallin's end-to-end platform engineering walkthrough [treats Kubernetes-backed infrastructure](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) as the substrate on which internal developer platforms are built, connecting cluster management to broader questions of developer experience and organizational capability.

At the inference layer, Gergely Orosz's piece on inference engineering [notes Kubernetes as part of the infrastructure stack](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) that teams use to deploy and scale LLM serving, alongside techniques like quantization and disaggregation. This positions Kubernetes not just as a general compute platform but as active AI infrastructure.
