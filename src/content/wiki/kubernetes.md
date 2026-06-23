---
title: Kubernetes
summary: >-
  Kubernetes is the dominant container orchestration platform, providing the
  runtime foundation for modern cloud-native infrastructure, developer
  platforms, and AI inference workloads.
sources:
  - 2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui
  - 2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui
  - >-
    2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like
  - 2026-05/2026-05-06t204115-platform-engineering-end-to-end
  - 2026-06/2026-06-21t130559-what-is-inference-engineering
compiled_at: '2026-06-22T07:26:37.501Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2792
    output_tokens: 549
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
  cost_usd: 0.016611
---
Kubernetes schedules and manages containerized workloads across clusters of machines, abstracting away the underlying compute so teams can declaratively define what should run and trust the system to keep it running. Understanding what Kubernetes actually manages requires understanding containers themselves: as [Ivan Velichko's walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows, a container is fundamentally a process with an isolated root filesystem, assembled via Linux mount namespaces and `pivot_root`. Kubernetes orchestrates thousands of such processes across nodes.

In practice, operating Kubernetes at scale means juggling kubectl, Helm, GitOps tooling, observability dashboards, and security scanners as separate tools. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) positions itself as a response to that fragmentation: a single open-source binary (Apache 2.0) that unifies topology views, events, Helm releases, GitOps state, image inspection, and audits across multiple clusters. The [Product Hunt listing](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) adds that Radar also exposes an MCP interface for AI agents, reflecting how Kubernetes tooling is beginning to accommodate agentic workflows alongside human operators.

Kubernetes is also the substrate for internal developer platforms. [Luca Cavallin's platform engineering overview](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) treats Kubernetes as the assumed runtime layer over which platform teams build self-service abstractions, with the goal of reducing cognitive load on application developers. Similarly, in AI infrastructure contexts, [Gergely Orosz's piece on inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) notes that Kubernetes clusters are the typical deployment target for LLM serving systems, where techniques like disaggregated prefill and KV cache management operate at the pod and node level.
