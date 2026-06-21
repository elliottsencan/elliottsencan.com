---
title: Enterprise software
summary: >-
  Enterprise software sits at the intersection of organizational process, vendor
  lock-in, and integration complexity, with AI now reshaping how it is built,
  secured, governed, and replaced.
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
compiled_at: '2026-06-21T20:17:29.713Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4506
    output_tokens: 741
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
  cost_usd: 0.024633
---
Enterprise software is defined less by scale than by the weight of institutional dependencies it accumulates. Legacy systems like QuickBooks Desktop persist long past their expected replacement date, forcing developers to build abstraction layers just to get clean API access to their own data. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) illustrates this directly: it wraps QBD's qbXML and SOAP protocols in typed Python and Node.js interfaces so that engineers do not have to touch the underlying Web Connector. The existence of a product category built around that problem says something about how slowly enterprises actually migrate.

The integration surface also creates attack vectors. A supply chain attack on four SAP-ecosystem npm packages harvested cloud credentials and browser passwords, using GitHub as an exfiltration channel and abusing VS Code configs as persistence mechanisms [SAP npm attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). The SAP ecosystem's ubiquity in enterprise environments is precisely what made the packages worth poisoning.

Governance pressure is nudging AI tooling in the direction enterprise buyers expect. The argument that MCP's real value is as an auditable, policy-aware proxy between AI agents and internal resources [MCP governance](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) is essentially an argument that AI tooling has to meet enterprise requirements to achieve serious adoption, not the other way around.

Documentation platforms like Mintlify [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) and UX research tools like Optimal Workshop [Optimal vs UserTesting](/reading/2026-04/2026-04-30t231745-optimal-vs-usertesting) compete partly on enterprise compliance and SOC 2 posture, confirming that enterprise buyers treat security and audit capability as baseline requirements, not differentiators.

Internal dysfunction compounds technical debt. Poor onboarding practices described as agile [onboarding hazing](/reading/2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile) cost enterprises the institutional knowledge new engineers would otherwise absorb. And the economic pressure to automate headcount before productivity gains are confirmed [AI layoff trap](/reading/2026-05/2026-05-02t155432-cognitive-offloading-and-ai-how-reliance-on-llms-affects) risks stripping out the human judgment that enterprise processes implicitly depend on. The trust that accumulates through human relationships inside and outside large organizations is not recovered easily once it is automated away [human connection moat](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate).
