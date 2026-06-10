/**
 * U.S. Edge AI Market — Customer Intelligence demo data
 * Column structure matches Customer Database Excel (Propositions 1–3)
 */

export const CUSTOMER_DATABASE_TITLE =
  'U.S. Edge AI Market — Customer Database'

export const CUSTOMER_DATABASE_SUBTITLE =
  'Verified directory and insight on customers (Manufacturing, energy, utilities, aerospace, defense, agriculture, logistics, transportation, retail, healthcare, and Public sector)'

export interface EdgeCustomerBase {
  sNo: number
  customerName: string
  businessOverview: string
  edgeAiExactCustomerType: string
  edgeAiUseCase: string
  annualRevenueUsdMillion2025: string
  sizeAndScale: string
  relevantKeyContactPerson: string
  roleOrDesignation: string
  emailAddress: string
  phoneNumberOrWhatsApp: string
  linkedInProfile: string
  companyWebsite: string
}

export interface EdgeCustomerProposition2 extends EdgeCustomerBase {
  edgeAiBuyingCriteria: string
  edgeAiPainPoints: string
  buyingTriggerDigitalMaturity: string
  budgetOwner: string
}

export interface EdgeCustomerProposition3 extends EdgeCustomerProposition2 {
  procurementModel: string
  vendorSelectionCriteria: string
  preferredEngagementModel: string
  preferredDeploymentAndServiceModel: string
  preferredSolutionType: string
  integrationTechnicalServiceRequirements: string
  performanceExpectations: string
  benchmarkSummary: string
  customerBenchmarkingSummary: string
}

export const proposition1DemoData: EdgeCustomerBase[] = [
  {
    sNo: 1,
    customerName: 'General Electric — Greenville Smart Factory',
    businessOverview: 'Industrial conglomerate operating advanced manufacturing with IoT-enabled production lines across aerospace and energy divisions.',
    edgeAiExactCustomerType: 'Enterprise Manufacturer — Tier 1',
    edgeAiUseCase: 'Predictive maintenance, visual defect detection, real-time quality control at edge',
    annualRevenueUsdMillion2025: '42,800',
    sizeAndScale: '12 U.S. plants / 8,500 edge nodes / 240 AI-enabled cameras',
    relevantKeyContactPerson: 'Michelle Carter',
    roleOrDesignation: 'VP, Digital Manufacturing & Edge AI',
    emailAddress: 'm.carter@ge.com',
    phoneNumberOrWhatsApp: '+1 617 555 0142',
    linkedInProfile: 'linkedin.com/in/michelle-carter-ge',
    companyWebsite: 'www.ge.com',
  },
  {
    sNo: 2,
    customerName: 'Duke Energy — Grid Edge Operations',
    businessOverview: 'Major U.S. utility deploying edge AI for grid monitoring, outage prediction, and distributed energy resource management.',
    edgeAiExactCustomerType: 'Energy & Utilities — IOU',
    edgeAiUseCase: 'Substation anomaly detection, edge inference for grid sensors, storm response automation',
    annualRevenueUsdMillion2025: '30,400',
    sizeAndScale: '6 regional hubs / 3,200 edge gateways / 1.2M smart meters integrated',
    relevantKeyContactPerson: 'James Whitfield',
    roleOrDesignation: 'Director, Grid Modernization & AI',
    emailAddress: 'j.whitfield@duke-energy.com',
    phoneNumberOrWhatsApp: '+1 704 555 0198',
    linkedInProfile: 'linkedin.com/in/james-whitfield-duke',
    companyWebsite: 'www.duke-energy.com',
  },
  {
    sNo: 3,
    customerName: 'Lockheed Martin — Aeronautics Division',
    businessOverview: 'Defense contractor using edge AI for autonomous systems, mission computing, and secure tactical edge deployments.',
    edgeAiExactCustomerType: 'Aerospace & Defense — Prime Contractor',
    edgeAiUseCase: 'On-device inference for ISR platforms, edge sensor fusion, secure edge AI runtime',
    annualRevenueUsdMillion2025: '71,000',
    sizeAndScale: '4 U.S. sites / 1,800 rugged edge devices / classified & unclassified zones',
    relevantKeyContactPerson: 'Col. (Ret.) Anita Reyes',
    roleOrDesignation: 'Chief Technology Officer — Edge Systems',
    emailAddress: 'a.reyes@lmco.com',
    phoneNumberOrWhatsApp: '+1 301 555 0176',
    linkedInProfile: 'linkedin.com/in/anita-reyes-lm',
    companyWebsite: 'www.lockheedmartin.com',
  },
  {
    sNo: 4,
    customerName: 'John Deere — Precision Ag Center',
    businessOverview: 'Agriculture equipment leader deploying edge AI on tractors, sprayers, and field sensors for precision farming.',
    edgeAiExactCustomerType: 'Agriculture — OEM & Fleet Operator',
    edgeAiUseCase: 'Computer vision for crop health, autonomous guidance, edge analytics on harvesters',
    annualRevenueUsdMillion2025: '61,200',
    sizeAndScale: 'Nationwide dealer network / 15,000 connected machines / 500K acres monitored',
    relevantKeyContactPerson: 'Ryan Hoffmann',
    roleOrDesignation: 'Head of Intelligent Solutions Group',
    emailAddress: 'r.hoffmann@johndeere.com',
    phoneNumberOrWhatsApp: '+1 309 555 0133',
    linkedInProfile: 'linkedin.com/in/ryan-hoffmann-deere',
    companyWebsite: 'www.deere.com',
  },
  {
    sNo: 5,
    customerName: 'FedEx — Memphis Hub Operations',
    businessOverview: 'Global logistics operator implementing edge AI for package sorting, fleet telematics, and warehouse automation.',
    edgeAiExactCustomerType: 'Logistics & Transportation — 3PL / Carrier',
    edgeAiUseCase: 'Smart camera sorting, route optimization at edge, predictive fleet maintenance',
    annualRevenueUsdMillion2025: '87,700',
    sizeAndScale: '45 U.S. hubs / 6,400 edge servers / 90K vehicle telematics units',
    relevantKeyContactPerson: 'Sarah Lin',
    roleOrDesignation: 'SVP, Operations Technology & Edge AI',
    emailAddress: 's.lin@fedex.com',
    phoneNumberOrWhatsApp: '+1 901 555 0165',
    linkedInProfile: 'linkedin.com/in/sarah-lin-fedex',
    companyWebsite: 'www.fedex.com',
  },
]

export const proposition2DemoData: EdgeCustomerProposition2[] = proposition1DemoData.map((c, i) => ({
  ...c,
  edgeAiBuyingCriteria: [
    'Low-latency inference (<10ms), MIL-SPEC ruggedization, vendor security certification',
    '99.99% uptime SLA, OT/IT integration, NERC CIP compliance, scalable edge gateways',
    'ITAR/EAR compliance, zero-trust edge architecture, on-device model encryption',
    'Offline-capable inference, dust/water IP rating, dealer service network support',
    'High-throughput parcel vision AI, multi-site orchestration, TCO under 3-year payback',
  ][i],
  edgeAiPainPoints: [
    'Legacy PLC integration, model drift on factory floor, fragmented edge hardware vendors',
    'Siloed SCADA data, latency to cloud analytics, cybersecurity audit gaps at substations',
    'Air-gapped deployment complexity, long procurement cycles, limited edge AI talent pool',
    'Connectivity gaps in rural fields, seasonal data volume spikes, hardware cost at scale',
    'Peak-season compute bottlenecks, inconsistent edge software stacks across hubs',
  ][i],
  buyingTriggerDigitalMaturity: [
    'Factory 4.0 initiative — High digital maturity, moderate edge complexity',
    'Grid resilience mandate — Medium digital maturity, high risk exposure',
    'DoD edge AI modernization — High digital maturity, high edge complexity',
    'Autonomy roadmap 2026 — Medium digital maturity, moderate risk exposure',
    'Hub automation Phase 2 — High digital maturity, moderate edge complexity',
  ][i],
  budgetOwner: [
    'CIO & Plant Operations VP (shared)',
    'Chief Grid Officer & CTO',
    'Program Executive Officer — Digital',
    'CTO & VP Agricultural Solutions',
    'CIO & COO Logistics Technology',
  ][i],
}))

export const proposition3DemoData: EdgeCustomerProposition3[] = proposition2DemoData.map((c, i) => ({
  ...c,
  procurementModel: [
    'Multi-year enterprise license + hardware bundle via approved integrator',
    'RFP-driven with preferred vendor list; pilot-to-production phased rollout',
    'Government contract vehicle (IDIQ); sole-source for classified edge stack',
    'OEM bundled with equipment; annual subscription for edge software updates',
    'Competitive bid across 3 vendors; global frame agreement with regional SOWs',
  ][i],
  vendorSelectionCriteria: [
    'Proven manufacturing references, ONNX runtime support, 24/7 support in U.S.',
    'NERC-aligned security, edge-to-cloud orchestration, local field engineering',
    'FedRAMP High / IL5 path, ruggedized hardware, U.S.-made components preferred',
    'Field-proven ag deployments, dealer install capability, offline model updates',
    'Sort accuracy >99.5%, hub-scale deployment track record, API-first platform',
  ][i],
  preferredEngagementModel: [
    'Co-innovation lab + managed edge services',
    'Managed service provider with utility co-delivery',
    'Prime contractor-led integration with sub-contracted AI runtime',
    'Dealer-delivered install + OEM remote monitoring',
    'Turnkey hub deployment with multi-year managed ops',
  ][i],
  preferredDeploymentAndServiceModel: [
    'On-prem edge cluster + hybrid cloud training pipeline',
    'Distributed edge gateways + centralized model registry',
    'Tactical edge appliances + secure enclave deployment',
    'On-vehicle edge modules + seasonal OTA updates',
    'Hub edge servers + redundant failover per sort zone',
  ][i],
  preferredSolutionType: [
    'Integrated edge AI platform (hardware + software + MLOps)',
    'Edge analytics suite with utility-specific AI models',
    'Hardened edge AI appliance with custom defense models',
    'Embedded vision AI kit for agricultural machinery',
    'Vision AI + orchestration platform for logistics hubs',
  ][i],
  integrationTechnicalServiceRequirements: [
    'MES/ERP integration, OPC-UA support, quarterly model retraining service',
    'SCADA/DMS integration, IEC 61850, 24/7 NOC for edge fleet health',
    'Link 16 data feeds, STIG-compliant configs, on-site cleared engineers',
    'ISOBUS compatibility, RTK GPS fusion, remote diagnostics via dealer portal',
    'WMS/TMS API integration, sub-50ms inference, annual penetration testing',
  ][i],
  performanceExpectations: [
    '≥95% defect detection accuracy, <5ms inference, 99.9% edge uptime',
    'Sub-100ms anomaly alert, false positive rate <2%, 99.99% gateway availability',
    'Mission-critical latency <20ms, encrypted inference, zero data exfiltration',
    '≥90% weed/crop classification in variable lighting, offline for 72+ hours',
    '≥99.5% barcode/OCR accuracy at 40 mph belt speed, 99.95% hub uptime',
  ][i],
  benchmarkSummary: [
    'Top quartile vs. peer manufacturers on edge AI adoption maturity',
    'Above industry average on grid-edge AI deployment scale',
    'Leader among defense primes in tactical edge AI programs',
    'Fastest-growing ag OEM edge AI fleet in North America',
    'Industry benchmark for hub-scale computer vision automation',
  ][i],
  customerBenchmarkingSummary: [
    'High potential — Strategic enterprise account; expand from 2 to 12 plants',
    'High potential — Reference utility account for grid-edge AI',
    'High potential — Long-cycle defense program with multi-year revenue',
    'Medium-High potential — Scale with connected fleet growth',
    'High potential — Largest logistics edge AI opportunity in portfolio',
  ][i],
}))
