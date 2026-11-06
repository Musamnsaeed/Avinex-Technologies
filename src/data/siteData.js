// ─── Company Info (Official Company Profile / Portfolio) ─────────
export const COMPANY = {
  name: 'AVINEX TECHNOLOGIES',
  legalName: 'AVINEX TECHNOLOGIES (PRIVATE) LIMITED',
  tagline: 'Connecting Skies, Enabling Tomorrow.',
  subtitle: 'Integrated Aviation, Communication, Electrical & Security Solutions',
  headline: 'Engineering and technology for critical infrastructure',
  description:
    'AVINEX Technologies (Private) Limited is an engineering and technology company providing integrated solutions for aviation, airports, air traffic control facilities, government organizations, commercial establishments and critical infrastructure. We deliver reliable, efficient and cost-effective solutions through the supply, installation, integration, testing, commissioning, maintenance and technical support of advanced communication, navigation, surveillance, electrical, power protection, fire detection and security systems.',
  overviewSecond:
    'With a strong focus on aviation communication and electronic engineering, we offer solutions designed to support operational reliability, system availability, safety and long-term performance. We seek to establish professional relationships with international manufacturers, technology providers, system integrators and authorized distributors to deliver quality equipment and engineering services in accordance with applicable technical specifications and project requirements.',
  commitment:
    'Professional engineering support, reliable equipment solutions, technically sound system integration and responsive after-sales services. We emphasize quality, safety, transparency, customer satisfaction and long-term operational reliability in every project we undertake.',
  objective:
    'Our objective is to develop lasting partnerships and contribute to the modernization of aviation communication, electrical infrastructure, power protection, fire safety and electronic security systems through practical, dependable and professionally delivered technology solutions.',
  phone: '+92-3222192480',
  email: 'info@avinextechnologies.com',
  address: {
    line1: 'Plot 187 31-C2, Korangi Industrial Area',
    city: 'Karachi',
    country: 'Pakistan',
  },
};

// ─── Navigation Links ─────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  { label: 'Products', path: '/products' },
  { label: 'Services', path: '/services' },
];

// ─── Hero Slides (Reflecting Portfolio Pillars) ────────────────
export const HERO_SLIDES = [
  {
    heading: 'Integrated Aviation, Communication, Electrical & Security Solutions',
    subtext:
      'Engineering and technology for critical infrastructure — airports, air traffic control facilities, government organizations, and commercial establishments.',
    cta: { label: 'Explore Solutions', link: '/services' },
    image: '/images/hero/hero-cinematic-beacon.jpg',
    tag: 'Connecting Skies, Enabling Tomorrow.',
  },
  {
    heading: 'CNS & Aviation Communication Systems',
    subtext:
      'VHF AM & HF SSB radio systems, Voice Communication Control Systems (VCCS), Digital Voice Logging (DVLS), and ground-to-air stations for ATC towers and area control centres.',
    cta: { label: 'Our Products', link: '/products' },
    image: '/images/hero/hero-radio-dispatch.jpg',
    tag: 'Aviation & ATC Communication',
  },
  {
    heading: 'Power Protection, Fire Safety & Electronic Security',
    subtext:
      'Online double-conversion UPS, servo-controlled AVRs, addressable fire alarm systems, and IP-based CCTV surveillance designed for operational reliability and safety.',
    cta: { label: 'Our Services', link: '/services' },
    image: '/images/hero/hero-command-center.jpg',
    tag: 'Critical Infrastructure Engineering',
  },
];

// ─── Project Lifecycle (Portfolio Page 2) ──────────────────────
export const PROJECT_LIFECYCLE = [
  { step: '01', title: 'Supply', desc: 'Direct sourcing of certified equipment, spares, and accessories' },
  { step: '02', title: 'Installation', desc: 'On-site technical deployment, cabling, earthing, and mounting' },
  { step: '03', title: 'Integration', desc: 'Multi-vendor system coordination, protocol bridging, and interoperability' },
  { step: '04', title: 'Testing', desc: 'Factory acceptance (FAT) & site acceptance testing (SAT) verification' },
  { step: '05', title: 'Commissioning', desc: 'System configuration, operational calibration, and handover' },
  { step: '06', title: 'Maintenance', desc: 'Preventive schedules, fault diagnosis, and routine health checks' },
  { step: '07', title: 'Support', desc: 'After-sales engineering assistance throughout the system lifecycle' },
];

// ─── Who We Serve (Portfolio Page 2) ──────────────────────────
export const WHO_WE_SERVE = [
  { title: 'Airports', desc: 'Passenger terminals, runways, flight-line operations, and airfield infrastructure' },
  { title: 'Air Traffic Control Facilities', desc: 'Control towers, area control centres (ACC), and aeronautical ground stations' },
  { title: 'Government Organizations', desc: 'Public-sector tenders, defense institutions, and civil aviation departments' },
  { title: 'Commercial Establishments', desc: 'Enterprise facilities, corporate headquarters, and commercial complexes' },
  { title: 'Critical Infrastructure', desc: 'Power substations, industrial plants, data centres, and secure facilities' },
];

// ─── Designed to Support (Portfolio Page 2) ────────────────────
export const DESIGNED_TO_SUPPORT = [
  { title: 'Operational Reliability', desc: 'High-availability architecture built for non-stop mission-critical duty.' },
  { title: 'System Availability', desc: 'Redundant power protection, automatic failovers, and backup communication.' },
  { title: 'Safety & Compliance', desc: 'Strict adherence to aviation safety, fire standards, and electrical codes.' },
  { title: 'Long-term Performance', desc: 'Lifecycle engineering, spare parts availability, and proactive maintenance.' },
];

// ─── Core Areas of Expertise (Portfolio Pages 2–6) ─────────────
export const SERVICES = [
  {
    id: 'cns-aviation',
    num: '01',
    icon: 'RadioTower',
    image: '/images/services/service-01-cns.jpg',
    title: 'CNS & Aviation Communication Systems',
    subtitle: 'Airports · Air traffic control towers · Area control centres · Aviation facilities',
    short: 'Communication, Navigation and Surveillance (CNS) systems for airports, ATC towers, and area control centres.',
    description:
      'Communication, Navigation and Surveillance (CNS) systems for airports, air traffic control towers, area control centres and other aviation facilities. Our scope covers the supply, installation, integration, testing, commissioning, maintenance and technical support of aviation communication equipment and associated infrastructure.',
    features: [
      'VHF AM and HF SSB radio communication systems',
      'Ground-to-air communication equipment',
      'Fixed and remote radio stations',
      'VoIP-based aviation communication systems',
      'Voice Communication Control Systems (VCCS)',
      'Remote Radio Control Units (RRCU) and radio remote control',
      'Voice Logging and Digital Voice Logging Systems (DVLS)',
      'Antenna systems, RF transmission lines and coaxial cables',
      'Antenna masts, communication interfaces and accessories',
    ],
    support:
      'System integration · Equipment configuration · Radio coverage surveys · Fault diagnosis · Preventive maintenance · Troubleshooting, to help maintain dependable communication between air traffic controllers, pilots and ground operations.',
  },
  {
    id: 'electrical-engineering',
    num: '02',
    icon: 'Zap',
    image: '/images/services/service-02-electrical.jpg',
    title: 'Electrical Engineering & Airport Electrical Systems',
    subtitle: 'Aviation facilities · Commercial buildings · Industrial installations · Critical infrastructure',
    short: 'Supply and installation of electrical equipment, low/medium voltage panels, and power distribution.',
    description:
      'Electrical engineering solutions for aviation facilities, commercial buildings, industrial installations and critical infrastructure, covering supply and installation of electrical equipment and power distribution.',
    features: [
      'Power distribution systems',
      'Low-voltage and medium-voltage panels',
      'Switchgear and circuit protection',
      'Cabling and earthing systems',
      'Lightning protection infrastructure',
      'Electrical control systems',
    ],
    support:
      'Electrical inspection · Testing · Troubleshooting · Preventive maintenance · Commissioning of electrical installations in accordance with applicable standards and project specifications.',
  },
  {
    id: 'ups-power-protection',
    num: '03',
    icon: 'BatteryCharging',
    image: '/images/services/service-03-ups.jpg',
    title: 'UPS & Power Protection Solutions',
    subtitle: 'Communication equipment · Data centres · Control rooms · Airport facilities',
    short: 'Online double-conversion UPS, industrial backup systems, and battery management solutions.',
    description:
      'Power backup and conditioning solutions for communication equipment, data centres, control rooms, airport facilities and other mission-critical applications.',
    features: [
      'Online double-conversion UPS systems',
      'Line-interactive UPS systems',
      'Industrial UPS solutions',
      'Battery banks and battery management systems',
      'Power backup arrangements',
      'Monitoring and protection equipment',
    ],
    support:
      'Installation · Load assessment · Battery autonomy evaluation · System testing · Commissioning · Preventive maintenance · Troubleshooting.',
    concept: {
      title: 'Typical Power Protection Chain',
      chain: ['Mains Supply (Utility power)', 'AVR (Voltage regulation)', 'UPS (Backup & conditioning)', 'Critical Load (Comms & control equipment)'],
      why: 'Reliable power is the foundation of every critical system. Our UPS and voltage-regulation solutions help ensure the continuity of critical operations during power interruptions and protect equipment from unstable supply.',
    },
  },
  {
    id: 'avr-power-conditioning',
    num: '04',
    icon: 'Activity',
    image: '/images/services/service-04-avr.jpg',
    title: 'AVR & Power Conditioning',
    subtitle: 'Protection of sensitive electronic and electrical equipment',
    short: 'Automatic voltage regulation protecting sensitive gear against fluctuations and unstable supplies.',
    description:
      'Automatic voltage regulation and power conditioning that protects sensitive equipment against voltage fluctuations and unstable power supplies.',
    features: [
      'Servo-motor-controlled AVRs',
      'Static voltage regulators',
      'Single-phase and three-phase voltage regulation',
      'Power conditioning equipment',
      'Associated electrical protection solutions',
    ],
    support:
      'Equipment selection · Technical evaluation · Installation · Testing · Commissioning · Maintenance according to load requirements and specified input/output voltage conditions.',
  },
  {
    id: 'fire-detection-alarm',
    num: '05',
    icon: 'Flame',
    image: '/images/services/service-05-fire.jpg',
    title: 'Fire Detection & Fire Alarm Systems',
    subtitle: 'Airports · Offices · Commercial buildings · Control centres · Industrial facilities',
    short: 'Addressable and conventional fire alarm panels, detectors, and integrated notification systems.',
    description:
      'Fire detection and alarm solutions for airports, offices, commercial buildings, control centres, industrial facilities and other safety-critical environments.',
    features: [
      'Addressable and conventional fire alarm systems',
      'Fire alarm control panels',
      'Smoke, heat and flame detectors',
      'Manual call points',
      'Sounders and visual alarm devices',
      'Associated alarm accessories',
    ],
    support:
      'Design coordination · Supply · Installation · Testing · Commissioning · Integration with building management systems where required · Inspection · Preventive maintenance, in accordance with applicable fire safety requirements.',
  },
  {
    id: 'cctv-electronic-security',
    num: '06',
    icon: 'Shield',
    image: '/images/services/service-06-cctv.jpg',
    title: 'CCTV Surveillance & Electronic Security',
    subtitle: 'Airports · Terminals · Offices · Industrial premises · Restricted areas',
    short: 'IP-based CCTV cameras, NVRs/VMS, perimeter security, and integrated access control.',
    description:
      'Electronic security and surveillance for airports, terminals, offices, industrial premises, restricted areas and critical infrastructure, built to enhance site visibility, monitoring capability and security operations.',
    features: [
      'IP-based CCTV cameras',
      'Network video recorders (NVRs) and DVRs',
      'Video management systems (VMS)',
      'Surveillance monitoring stations',
      'Storage solutions',
      'Access control integration',
      'Perimeter surveillance',
      'Associated networking infrastructure',
    ],
    support:
      'Camera placement planning · Installation · Configuration · System integration · Testing · Commissioning · Troubleshooting · Maintenance.',
    concept: {
      title: 'Layered Site Protection',
      chain: ['Detect (Smoke, heat & flame detectors)', 'Alert (Control panels & sounders)', 'Monitor (CCTV, NVRs & VMS)', 'Control (Access control integration)'],
      why: 'Integrated fire detection and electronic security help protect people, assets and operations at airports, control centres and critical infrastructure.',
    },
  },
  {
    id: 'system-provider-integration',
    num: '07',
    icon: 'Settings',
    image: '/images/services/service-07-integration.jpg',
    title: 'System Provider, Integration & Services',
    subtitle: 'Communication · Electrical · Power · Fire safety · Security',
    short: 'Interoperability, dependable operation, and coordinated implementation across all technical systems.',
    description:
      'Provision and integration of compatible technologies from established manufacturers and suppliers. Our approach focuses on interoperability, dependable operation, efficient configuration and coordinated implementation across communication, electrical, power, fire safety and security systems.',
    features: [
      'Technical coordination & site surveys',
      'Equipment evaluation & project planning',
      'Installation supervision',
      'System testing and commissioning',
      'Operational handover & user training',
    ],
    support:
      'After-sales support · Maintenance services · Technical support throughout the system lifecycle.',
  },
  {
    id: 'procurement-technical-support',
    num: '08',
    icon: 'PackageCheck',
    image: '/images/services/service-08-procurement.jpg',
    title: 'Procurement, Supply & Technical Support',
    subtitle: 'Public-sector and private-sector projects',
    short: 'Technical compliance, OEM credentials, lifecycle support, and tender adherence.',
    description:
      'Supply of equipment, accessories, spare parts and engineering solutions for public-sector and private-sector projects. Our procurement focuses on technical compliance, manufacturer credentials, product suitability, lifecycle support and adherence to applicable tender requirements.',
    features: [
      'Technical compliance',
      'Manufacturer credentials',
      'Product suitability',
      'Lifecycle support',
      'Adherence to tender requirements',
      'Spare parts and accessories',
    ],
    support:
      'We seek to work with reputable OEMs, authorized distributors and technology partners to facilitate the delivery of suitable equipment and dependable technical services.',
  },
];

// ─── Product Categories (Aligned with Portfolio) ───────────────
export const PRODUCT_CATEGORIES = [
  {
    id: 'aviation',
    slug: 'aviation-electronics',
    name: 'CNS & Aviation Communication',
    short: 'VHF-AM air-band transceivers, ground base stations, and aeronautical dispatch equipment.',
    icon: 'Plane',
  },
  {
    id: 'radios',
    slug: 'two-way-radios',
    name: 'Two-Way Radio Systems',
    short: 'Professional DMR mobile radios, repeaters, and fleet dispatch consoles.',
    icon: 'Radio',
  },
  {
    id: 'electrical',
    slug: 'electrical-systems',
    name: 'Electrical Engineering & Panels',
    short: 'Low/medium-voltage panels, switchgear, cabling, and earthing solutions.',
    icon: 'Zap',
  },
  {
    id: 'power',
    slug: 'power-ups',
    name: 'UPS & Power Protection',
    short: 'Online double-conversion UPS, industrial power conditioning, and battery banks.',
    icon: 'BatteryCharging',
  },
  {
    id: 'avr',
    slug: 'avr-power-conditioning',
    name: 'AVR & Power Conditioning',
    short: 'Servo-controlled and static voltage regulators for sensitive electronics.',
    icon: 'Activity',
  },
  {
    id: 'security',
    slug: 'cctv-security',
    name: 'CCTV Surveillance & Security',
    short: 'IP cameras, NVRs/VMS, and access control for restricted areas.',
    icon: 'Shield',
  },
  {
    id: 'fire_alarm',
    slug: 'fire-detection',
    name: 'Fire Detection & Alarm Systems',
    short: 'Addressable smoke/heat detectors, control panels, and sounders.',
    icon: 'Flame',
  },
  {
    id: 'systems_integration',
    slug: 'system-integration',
    name: 'Turnkey System Integration',
    short: 'End-to-end multi-vendor engineering, commissioning, and operational handover.',
    icon: 'Settings',
  },
];

// ─── Partners & Brands (Mock Data Removed — Loaded dynamically from Sanity) ───
export const PARTNERS = [];
export const BRAND_NAMES = [];
