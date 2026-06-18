---
title: Enterprise software
summary: >-
  Enterprise software serves large organizations through compliance, governance,
  integrations, and institutional trust — properties that shape both how it is
  built and where it fails.
sources:
  - 2026-04/2026-04-24t162154-he-came-he-saw-he-cooked
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t231537-startupsrip
  - 2026-04/2026-04-30t231709-conductor
  - 2026-04/2026-04-30t231745-optimal-vs-usertesting
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-02t155432-cognitive-offloading-and-ai-how-reliance-on-llms-affects
  - >-
    2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - 2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate
compiled_at: '2026-06-18T22:59:44.193Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4676
    output_tokens: 711
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
  cost_usd: 0.024693
---
Enterprise software is defined less by feature count than by organizational context: it must satisfy compliance requirements, survive procurement and security review, integrate with legacy systems, and maintain trust across departments that may have conflicting incentives.

The governance angle is sharply illustrated by the case for MCP in enterprise settings. [Derosiaux argues](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) that MCP's real audience was never individual developers but enterprise IT: a policy-aware, auditable proxy between AI agents and organizational resources that command-line tooling cannot replicate at scale. That framing — AI access mediated by institutional controls — is characteristic of how enterprise buyers evaluate any new capability.

Security risk scales with that integration surface. The supply chain attack on SAP-ecosystem npm packages [reported by Lakshmanan](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) shows how attackers target the connective tissue between enterprise platforms and developer tooling: poisoned packages harvested cloud credentials and browser passwords from environments where SAP integrations were present. Enterprise software's deep integration with identity and secrets infrastructure makes it a high-value target.

Legacy integration is its own tax. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) exists entirely because QuickBooks Desktop — still in production at many businesses — speaks qbXML over SOAP via a Web Connector that most developers cannot reasonably work with directly. The existence of a funded API abstraction layer over a decades-old accounting product illustrates how enterprise software's longevity creates both switching costs and third-party opportunity.

The human dimension matters too. [Ghost in the Data argues](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) that organizations automating away human contact destroy trust that metrics do not capture and AI cannot rebuild. Enterprise software deployments that reduce service touchpoints in the name of efficiency may be trading a durable competitive asset for measurable short-term savings.

Documentation and onboarding compound these dynamics internally. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) targets enterprise teams specifically with compliance-aware, AI-native knowledge management, recognizing that large organizations struggle to keep institutional knowledge accessible. [DHg observes](/reading/2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile) that enterprise onboarding dysfunction — packed calendars, immediate sprint inclusion, probation-enforced silence — is often invisible to management while systematically undermining new hires, a failure mode that scales with organizational size.
