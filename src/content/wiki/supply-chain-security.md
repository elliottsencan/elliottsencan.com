---
title: Supply-chain security
summary: >-
  Attackers exploit the software supply chain through malicious packages,
  invisible-code payloads, and compromised dependencies; defenses range from SSH
  commit signing and sandboxed agentic scanning to redesigned forge tooling.
sources:
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-23t231556-if-i-could-make-my-own-github
compiled_at: '2026-07-02T12:36:22.330Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2962
    output_tokens: 651
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
  cost_usd: 0.018651
---
Supply-chain attacks target the infrastructure developers trust: package registries, code forges, and the tooling that automates builds and deployments. Two recent npm incidents illustrate how varied the attack surface is.

One campaign uploaded 151 malicious packages to npm and GitHub that encoded payloads in invisible Unicode variation-selector characters [Supply-chain attack using invisible Unicode](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). Because the characters produce no visible glyph, standard code review and static analysis tools missed them entirely; the payload only manifested at runtime. A separate campaign attributed to the TeamPCP threat actor poisoned four SAP-ecosystem npm packages with a credential-harvesting payload that exfiltrated cloud secrets and browser passwords via GitHub and used Claude Code and VS Code configuration files as persistence vectors [SAP-related npm packages compromised](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). Both attacks weaponize the implicit trust developers extend to package ecosystems.

Defensive practice starts with authentication hygiene. SSH key-based authentication and GPG commit signing reduce the risk that credentials or repository writes can be silently hijacked [Using SSH keys](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure). Signed commits create a chain of custody that unsigned tokens cannot provide.

At a more automated level, Anthropic's defending-code-reference-harness demonstrates an agentic pipeline that runs autonomous vulnerability discovery, triage, and patching with Claude, sandboxed inside gVisor to contain any compromise during scanning [defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness). This points toward LLM-assisted security tooling as a scalable complement to manual review.

Forge design also matters. A developer wishlist for a reimagined GitHub specifically calls out signed, offline-usable Actions as a requirement [If I could make my own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github); unsigned CI actions are themselves a supply-chain surface, since a compromised action definition can exfiltrate secrets across every repository that uses it. The same piece advocates for pre-commit remote CI, which would catch problems earlier in the chain before code reaches shared infrastructure.
