---
title: Kubernetes
summary: >-
  Kubernetes is a container orchestration platform whose operational complexity
  has spawned tooling ecosystems, UI consolidation efforts, and a central role
  in modern platform engineering.
sources:
  - 2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui
  - 2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui
  - >-
    2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like
  - 2026-05/2026-05-06t204115-platform-engineering-end-to-end
compiled_at: '2026-06-20T12:50:26.908Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2621
    output_tokens: 502
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
  cost_usd: 0.015393
---
Kubernetes schedules and manages containerized workloads across clusters, but its surface area is large enough that platform teams typically assemble a patchwork of kubectl, Helm, and several other tools just to cover basic visibility and operations. Radar [Radar HQ](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) is a direct response to that fragmentation: a single open-source binary (Apache 2.0) that unifies topology views, events, Helm releases, GitOps state, image inspection, and security audits across multiple clusters. Its Product Hunt listing [also notes](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) MCP support for AI agents, positioning cluster observability as something AI tooling can query directly.

Understanding why Kubernetes manages containers the way it does is easier with a grounding in how containers actually work. Ivan Velichko's tutorial [on container filesystems](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows that a container is ultimately a Linux process running in a mount namespace with an isolated root filesystem, assembled via unshare, mount, and pivot_root. Kubernetes sits above that layer, coordinating many such processes across nodes.

At the organizational level, Kubernetes is frequently the infrastructure substrate for internal developer platforms. Luca Cavallin's platform engineering walkthrough [describes](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) building atop GCP and Kubernetes to give product teams a paved path, with the platform team absorbing operational complexity so developers do not need to reason about cluster mechanics directly. That is the same problem Radar attacks from the tooling side: reducing the cognitive load of operating Kubernetes clusters without requiring a managed cloud product.
