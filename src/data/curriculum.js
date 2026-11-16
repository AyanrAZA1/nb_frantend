// Course details shown in the "View curriculum" dialog, keyed by course `id`
// from ./courses.js. Outlines follow each vendor's public exam blueprint —
// review them with your trainers before launch and edit freely.
//
// Shape: { overview, outcomes: string[], modules: { title, topics: string[] }[], exam, includes: string[] }

const STANDARD_INCLUDES = ["Live instructor-led sessions", "Hands-on lab access", "Session recordings", "Practice tests", "Course completion certificate"];

export const CURRICULA = {
  ccna: {
    overview:
      "Build a solid networking foundation — from IP addressing and switching to routing, wireless, security basics and automation — and prepare for the Cisco CCNA 200-301 exam.",
    outcomes: [
      "Design and troubleshoot IPv4/IPv6 addressing and subnets",
      "Configure VLANs, trunking, STP and EtherChannel",
      "Configure static routing and single-area OSPFv2",
      "Secure devices with ACLs, port security and AAA basics",
    ],
    modules: [
      { title: "Network fundamentals", topics: ["OSI and TCP/IP models", "Cabling, interfaces and topologies", "IPv4 subnetting and IPv6 addressing", "TCP vs UDP"] },
      { title: "Network access", topics: ["VLANs and inter-VLAN routing", "802.1Q trunking and DTP", "Rapid PVST+ and EtherChannel", "Wireless LAN architecture"] },
      { title: "IP connectivity", topics: ["Routing table and route selection", "Static and default routes", "OSPFv2 single-area", "First-hop redundancy (HSRP)"] },
      { title: "IP services", topics: ["DHCP, DNS and NAT/PAT", "NTP, SNMP and Syslog", "QoS concepts", "SSH and TFTP/FTP"] },
      { title: "Security fundamentals", topics: ["Threats and mitigation", "Standard and extended ACLs", "Port security and DHCP snooping", "Wireless security (WPA2/WPA3)"] },
      { title: "Automation & programmability", topics: ["Controller-based networking and SDN", "REST APIs and JSON", "Ansible, Puppet and Chef overview"] },
    ],
    exam: "Cisco CCNA 200-301 · 120 minutes",
    includes: STANDARD_INCLUDES,
  },

  ccnp: {
    overview:
      "Master enterprise network architecture, virtualization, infrastructure, assurance, security and automation, aligned to the Cisco ENCOR 350-401 core exam.",
    outcomes: [
      "Design campus and WAN architectures, including SD-Access and SD-WAN",
      "Implement advanced OSPF, EIGRP and BGP",
      "Configure network virtualization (VRF, GRE, IPsec)",
      "Automate configuration with Python, NETCONF and RESTCONF",
    ],
    modules: [
      { title: "Architecture", topics: ["Enterprise design principles", "High availability and redundancy", "SD-WAN and SD-Access", "QoS models"] },
      { title: "Virtualization", topics: ["Hypervisors and virtual switching", "VRF-lite", "GRE and IPsec tunnels", "LISP and VXLAN"] },
      { title: "Infrastructure", topics: ["Layer 2: STP, MST and EtherChannel", "EIGRP and OSPF in depth", "eBGP fundamentals", "Wireless roaming and AP modes"] },
      { title: "Network assurance", topics: ["Debugs, SPAN and IP SLA", "NetFlow and Flexible NetFlow", "Cisco DNA Center assurance"] },
      { title: "Security", topics: ["Device access control and AAA", "Infrastructure security and CoPP", "Wireless security features", "Cisco security solutions overview"] },
      { title: "Automation", topics: ["Python basics", "JSON, YANG and data models", "NETCONF/RESTCONF", "EEM and config management tools"] },
    ],
    exam: "Cisco 350-401 ENCOR · 120 minutes",
    includes: STANDARD_INCLUDES,
  },

  secplus: {
    overview:
      "Learn the core skills every security role needs — threats, architecture, operations and governance — and prepare for CompTIA Security+ SY0-701.",
    outcomes: [
      "Identify threats, vulnerabilities and attack vectors",
      "Apply security controls across hybrid environments",
      "Monitor, respond to and investigate incidents",
      "Understand risk, compliance and governance",
    ],
    modules: [
      { title: "General security concepts", topics: ["Security controls", "CIA, AAA and Zero Trust", "Change management", "Cryptography and PKI"] },
      { title: "Threats, vulnerabilities & mitigations", topics: ["Threat actors and motivations", "Social engineering", "Application and network attacks", "Mitigation techniques"] },
      { title: "Security architecture", topics: ["Cloud, IoT and on-prem models", "Secure infrastructure design", "Data protection", "Resilience and recovery"] },
      { title: "Security operations", topics: ["Hardening and asset management", "Vulnerability management", "Identity and access management", "Incident response and forensics"] },
      { title: "Program management & oversight", topics: ["Governance and policies", "Risk management", "Third-party risk", "Audits and compliance"] },
    ],
    exam: "CompTIA SY0-701 · up to 90 questions · 90 minutes",
    includes: STANDARD_INCLUDES,
  },

  ceh: {
    overview:
      "Think like an attacker. Learn the phases of ethical hacking with hands-on labs across networks, web apps, wireless, cloud and IoT — aligned to EC-Council CEH v13.",
    outcomes: [
      "Perform reconnaissance, scanning and enumeration",
      "Exploit and report system and web vulnerabilities",
      "Assess wireless, mobile, IoT and cloud targets",
      "Write clear, actionable penetration-test reports",
    ],
    modules: [
      { title: "Introduction & footprinting", topics: ["Ethical hacking concepts and laws", "Footprinting and reconnaissance", "OSINT techniques"] },
      { title: "Scanning & enumeration", topics: ["Network scanning with Nmap", "Enumeration (SMB, SNMP, LDAP)", "Vulnerability analysis"] },
      { title: "System hacking", topics: ["Password attacks", "Privilege escalation", "Malware threats", "Covering tracks"] },
      { title: "Network attacks", topics: ["Sniffing and spoofing", "Social engineering", "Denial of service", "Session hijacking", "Evading IDS, firewalls and honeypots"] },
      { title: "Web application hacking", topics: ["Web server attacks", "OWASP Top 10", "SQL injection"] },
      { title: "Wireless, mobile, IoT & cloud", topics: ["Wireless attacks", "Mobile platform attacks", "IoT and OT hacking", "Cloud computing threats", "Cryptography"] },
    ],
    exam: "EC-Council CEH (312-50) · 125 questions · 4 hours",
    includes: STANDARD_INCLUDES,
  },

  az104: {
    overview:
      "Implement, manage and monitor Microsoft Azure identity, governance, storage, compute and networking, and prepare for the AZ-104 exam.",
    outcomes: [
      "Manage Microsoft Entra ID users, groups and RBAC",
      "Deploy and manage VMs, containers and App Service",
      "Configure virtual networks, peering and load balancing",
      "Monitor and back up Azure resources",
    ],
    modules: [
      { title: "Identities & governance", topics: ["Microsoft Entra users and groups", "Role-based access control", "Azure Policy and resource locks", "Subscriptions and cost management"] },
      { title: "Storage", topics: ["Storage accounts and redundancy", "Blob and Azure Files", "Access keys and SAS", "Lifecycle management"] },
      { title: "Compute", topics: ["ARM and Bicep templates", "Virtual machines and scale sets", "App Service", "Azure Container Instances and Apps"] },
      { title: "Networking", topics: ["Virtual networks and subnets", "Peering and VPN gateway", "NSGs and Azure Firewall basics", "Load Balancer and Application Gateway", "Azure DNS"] },
      { title: "Monitor & maintain", topics: ["Azure Monitor and Log Analytics", "Alerts and action groups", "Azure Backup", "Site Recovery"] },
    ],
    exam: "Microsoft AZ-104 · 100 minutes",
    includes: STANDARD_INCLUDES,
  },

  "aws-saa": {
    overview:
      "Design secure, resilient, high-performing and cost-optimized architectures on AWS, aligned to the Solutions Architect – Associate (SAA-C03) exam.",
    outcomes: [
      "Design secure access with IAM, KMS and VPC controls",
      "Build highly available, fault-tolerant architectures",
      "Pick the right compute, storage and database services",
      "Optimize workloads for cost and performance",
    ],
    modules: [
      { title: "AWS foundations", topics: ["Global infrastructure", "IAM users, roles and policies", "AWS Organizations and SCPs", "Well-Architected Framework"] },
      { title: "Secure architectures", topics: ["VPC design, subnets and routing", "Security groups and NACLs", "Encryption with KMS", "AWS WAF, Shield and GuardDuty"] },
      { title: "Resilient architectures", topics: ["EC2, Auto Scaling and ELB", "Multi-AZ and multi-Region design", "SQS, SNS and EventBridge", "Backup and disaster recovery"] },
      { title: "High-performing architectures", topics: ["S3, EBS and EFS", "RDS, Aurora and DynamoDB", "CloudFront and Global Accelerator", "Lambda and containers"] },
      { title: "Cost-optimized architectures", topics: ["Pricing models and Savings Plans", "Storage tiers and lifecycle", "Cost Explorer and Budgets"] },
    ],
    exam: "AWS SAA-C03 · 65 questions · 130 minutes",
    includes: STANDARD_INCLUDES,
  },

  stp: {
    overview:
      "Understand straight-through processing in banking — end-to-end payment and trade flows, messaging standards and automation — for operations, QA and IT professionals.",
    outcomes: [
      "Map end-to-end payment and trade life cycles",
      "Work with SWIFT MT and ISO 20022 MX messages",
      "Identify STP breaks and exception-handling paths",
      "Test and validate STP workflows",
    ],
    modules: [
      { title: "Banking operations basics", topics: ["Front, middle and back office", "Payments, cards and trade finance", "Clearing and settlement"] },
      { title: "STP concepts", topics: ["What STP is and why it matters", "STP rate and KPIs", "Manual touchpoints and repair queues"] },
      { title: "Messaging standards", topics: ["SWIFT MT categories", "ISO 20022 (MX) migration", "Message validation and enrichment"] },
      { title: "Payment & securities flows", topics: ["RTGS and ACH", "Cross-border payments", "Trade capture to settlement"] },
      { title: "Testing STP systems", topics: ["Test scenarios and data", "Exception and reconciliation testing", "Regression and automation approaches"] },
    ],
    exam: "Network Binary course assessment",
    includes: STANDARD_INCLUDES,
  },

  csqa: {
    overview:
      "Build strong software quality foundations — QA principles, test planning, measurement and process improvement — aligned to the CSQA body of knowledge.",
    outcomes: [
      "Apply quality principles and QA vs QC concepts",
      "Plan, design and execute effective tests",
      "Measure quality with meaningful metrics",
      "Drive process improvement and audits",
    ],
    modules: [
      { title: "Quality principles", topics: ["Quality concepts and cost of quality", "QA vs QC", "Quality frameworks (ISO, CMMI)"] },
      { title: "Quality leadership & culture", topics: ["Management commitment", "Quality policies and standards", "Team roles"] },
      { title: "Software life cycle & QA", topics: ["SDLC models and Agile", "Requirements quality", "Reviews and inspections"] },
      { title: "Testing", topics: ["Test planning and strategy", "Test design techniques", "Defect management", "Test automation overview"] },
      { title: "Measurement & improvement", topics: ["Metrics and dashboards", "Root-cause analysis", "Internal audits", "Continuous improvement (PDCA)"] },
    ],
    exam: "CSQA certification exam",
    includes: STANDARD_INCLUDES,
  },
};
