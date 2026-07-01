---
title: Supply chain security
summary: >-
  Attacks on software supply chains exploit the trust developers place in shared
  packages, version control, and tooling; defenses range from cryptographic
  authentication to agentic vulnerability scanning.
sources:
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-23t231556-if-i-could-make-my-own-github
compiled_at: '2026-07-01T04:54:33.979Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2962
    output_tokens: 615
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
  cost_usd: 0.018111
---
Supply chain attacks target the infrastructure developers rely on rather than applications directly. Two recent npm incidents illustrate how this plays out in practice. In one campaign, attackers uploaded 151 malicious packages encoding payloads in invisible Unicode variation-selector characters, bypassing human code review and static analysis entirely while remaining executable at runtime [invisible Unicode attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). In another, the TeamPCP threat actor poisoned four SAP-ecosystem npm packages with a credential-stealing, self-propagating payload that harvested cloud secrets and browser passwords, exfiltrated them over GitHub, and abused Claude Code and VS Code configuration files as persistence vectors [SAP npm compromise](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing).

The persistence vector in the SAP attack is worth noting separately: legitimate developer tooling, including AI coding assistants and editor configs, became a foothold. This reflects a broader trend where the expanded surface area of modern developer environments creates new trust boundaries that attackers probe.

On the defensive side, cryptographic hygiene is a foundational layer. SSH key-based authentication and commit signing reduce reliance on credential tokens that can be harvested, and commit signatures provide a verifiable chain of custody from developer to repository [SSH keys guide](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure). Anthropic's defending-code reference harness demonstrates a complementary approach: an agentic pipeline using Claude for autonomous threat modeling, vulnerability scanning, triage, and patching, sandboxed with gVisor to limit blast radius during analysis [defending-code harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness).

At the forge level, Mat Duggan's wishlist for a reimagined GitHub includes signed and offline-usable Actions as a first-class requirement, addressing the fact that CI workflow definitions are themselves a supply chain attack surface [reimagined GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github). The invisible-Unicode incident reinforces why this matters: payloads that evade review are most dangerous when they live inside trusted automation pipelines.
