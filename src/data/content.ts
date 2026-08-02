export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Maple AG Global LTD has been our primary sourcing partner for garments for over six years. Their quality control, documentation accuracy, and on-time shipment rate are consistently above industry standards. A true partner, not just a supplier.",
    author: "Hans Müller",
    title: "Head of Procurement",
    company: "Rheinland Textilgruppe, Germany",
  },
  {
    id: "t2",
    quote:
      "We import frozen seafood from Bangladesh through Maple AG Global LTD, and the cold chain management is impeccable. Every shipment arrives in perfect condition with full traceability documentation. They understand what European importers need.",
    author: "Elena Vasquez",
    title: "Supply Chain Director",
    company: "Mariscos del Atlántico, Spain",
  },
  {
    id: "t3",
    quote:
      "Finding a reliable jute supplier was challenging until we partnered with Maple AG Global LTD. Their grading consistency and willingness to accommodate our custom specifications make them indispensable to our packaging division.",
    author: "Ahmed Al-Rashid",
    title: "Managing Director",
    company: "Gulf Packaging Industries, UAE",
  },
  {
    id: "t4",
    quote:
      "The team at Maple AG Global LTD handled our industrial machinery import with exceptional professionalism. From LC negotiation to customs clearance in Chattogram — seamless from start to finish.",
    author: "Rafiqul Islam",
    title: "Operations Manager",
    company: "Apex Industrial Group, Bangladesh",
  },
  {
    id: "t5",
    quote:
      "Their leather goods meet the strictest EU REACH compliance standards. We have been sourcing finished leather products through Maple AG Global LTD for three years with zero quality complaints from our retail partners.",
    author: "Maria Conti",
    title: "Buying Manager",
    company: "Pelletteria Toscana, Italy",
  },
  {
    id: "t6",
    quote:
      "Maple AG Global LTD's agricultural export division helped us secure a consistent supply of premium aromatic rice for the Middle Eastern market. Their phytosanitary documentation is always flawless.",
    author: "Khalid bin Saeed",
    title: "Import Director",
    company: "Al-Khaleej Foods Trading, Saudi Arabia",
  },
];

// ─── Team Members ─────────────────────────────────────────────
export interface TeamMember {
  name: string;
  title: string;
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Farhan Rahman",
    title: "Chief Executive Officer",
    bio: "25+ years in international trade. Built Maple AG Global LTD from a single-product export operation into a diversified global trading house.",
  },
  {
    name: "Nusrat Jahan",
    title: "Managing Director",
    bio: "Former logistics head at a major shipping line. Steers strategic partnerships and international joint ventures across 40+ countries.",
  },
  {
    name: "Kamal Hossain",
    title: "Director of Imports",
    bio: "Specializes in sourcing industrial chemicals and machinery. Manages a vast network of suppliers from China, Germany, and the Middle East.",
  },
  {
    name: "Ayesha Siddiqua",
    title: "Director of Exports",
    bio: "Expert in European textile compliance. Oversees our flagship RMG and leather export divisions, ensuring strict EU REACH and BSCI adherence.",
  },
  {
    name: "Tariq Mahmud",
    title: "Supply Chain Manager",
    bio: "Master orchestrator of domestic and international logistics. Ensures just-in-time delivery for critical raw materials to local factories.",
  },
  {
    name: "Dr. Sarah Ahmed",
    title: "Operations Manager",
    bio: "Ph.D. in Industrial Engineering. Optimizes warehouse throughput, cold-chain integrity, and port-to-plant distribution mechanics.",
  },
  {
    name: "Zayed Khan",
    title: "Finance Manager",
    bio: "Chartered Accountant with 15 years in trade finance. Manages letters of credit, currency hedging, and cross-border transactions.",
  },
  {
    name: "Elena Rostova",
    title: "Sales Manager (Europe)",
    bio: "Based in our Frankfurt liaison office. Bridges the gap between Bangladeshi manufacturers and European wholesale buyers.",
  },
  {
    name: "Rafiqul Islam",
    title: "Procurement Manager",
    bio: "On-the-ground sourcing expert. Audits domestic factories and farms to ensure they meet our rigorous export quality standards.",
  },
  {
    name: "Hasan Chowdhury",
    title: "Warehouse Manager",
    bio: "Oversees our 50,000 sq. ft. Chattogram logistics hub. Maintains 99.9% inventory accuracy and manages strict cold-chain protocols.",
  },
];

// ─── Company Values ───────────────────────────────────────────
export interface CompanyValue {
  title: string;
  description: string;
  icon: string;
}

export const companyValues: CompanyValue[] = [
  { title: "Integrity", description: "We conduct business with absolute transparency, honoring our commitments to partners and clients worldwide.", icon: "shield" },
  { title: "Quality", description: "From raw materials to finished goods, we enforce uncompromising quality control at every stage of the supply chain.", icon: "star" },
  { title: "Commitment", description: "We are dedicated to the long-term success of our clients, ensuring reliable and continuous supply.", icon: "handshake" },
  { title: "Innovation", description: "Embracing digital transformation and modern logistics to optimize trade routes and operational efficiency.", icon: "lightbulb" },
  { title: "Sustainability", description: "Promoting eco-friendly products like jute and ensuring our partners adhere to environmental compliance.", icon: "leaf" },
  { title: "Customer Focus", description: "Tailoring our import and export solutions to meet the unique demands and specifications of each buyer.", icon: "users" },
];

// ─── Timeline / Milestones ────────────────────────────────────
export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export const milestones: Milestone[] = [
  { year: "2009", title: "Founded in Dhaka", description: "Started as a textile export agency serving European buyers from a small office in Motijheel." },
  { year: "2012", title: "Expanded to Agro Exports", description: "Added agricultural products and frozen foods to our export portfolio, opening Gulf markets." },
  { year: "2014", title: "Import Division Launched", description: "Began importing industrial machinery and raw materials to serve Bangladesh's growing manufacturing sector." },
  { year: "2016", title: "ISO 9001 Certified", description: "Achieved ISO 9001:2015 certification, establishing quality management standards across all operations." },
  { year: "2018", title: "Warehousing & Cold Chain", description: "Opened 50,000 sq. ft. of warehousing including temperature-controlled facilities in Chattogram." },
  { year: "2020", title: "40+ Countries Reached", description: "Expanded trade network to over 40 countries across Europe, Middle East, East Asia, and North America." },
  { year: "2023", title: "Supply Chain Division", description: "Launched end-to-end supply chain management services for domestic and international clients." },
  { year: "2024", title: "Digital Transformation", description: "Implemented real-time shipment tracking and digital documentation for all clients." },
];

// ─── Client Logos ─────────────────────────────────────────────
export interface ClientLogo {
  name: string;
  id: string;
}

export const clientLogos: ClientLogo[] = [
  { name: "Rheinland Textilgruppe", id: "rheinland" },
  { name: "Gulf Packaging Industries", id: "gulf-pack" },
  { name: "Mariscos del Atlántico", id: "mariscos" },
  { name: "Pelletteria Toscana", id: "pelletteria" },
  { name: "Al-Khaleej Foods", id: "alkhaleej" },
  { name: "Nordic Home Textiles", id: "nordic" },
  { name: "Apex Industrial Group", id: "apex" },
  { name: "Istanbul Deri Ltd", id: "istanbul-deri" },
  { name: "Pacific Rim Trading", id: "pacific-rim" },
  { name: "Sahara Distribution", id: "sahara" },
  { name: "EuroAgri Partners", id: "euroagri" },
  { name: "Bengal Bay Logistics", id: "bengal-bay" },
];

// ─── Case Studies ─────────────────────────────────────────────
export interface CaseStudy {
  id: string;
  client: string;
  region: string;
  challenge: string;
  solution: string;
  result: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cs1",
    client: "Rheinland Textilgruppe",
    region: "Germany",
    challenge:
      "Needed a reliable Bangladeshi sourcing partner who could consistently meet strict Oeko-Tex and BSCI compliance requirements for a 500,000-piece annual order across 12 styles.",
    solution:
      "We onboarded three BSCI-audited factories, established a dedicated quality inspection team, and implemented a digital tracking system for order progress and shipping milestones.",
    result:
      "Zero compliance rejections over three years, 98.5% on-time delivery rate, and a 15% cost reduction compared to their previous sourcing arrangement.",
  },
  {
    id: "cs2",
    client: "Al-Khaleej Foods Trading",
    region: "Saudi Arabia",
    challenge:
      "Required a year-round supply of premium aromatic rice with consistent quality, proper halal certification, and Arabic-labeled packaging for retail distribution.",
    solution:
      "We established relationships with premium rice mills in Dinajpur, implemented batch-level quality testing, arranged halal certification, and set up a custom packaging line with Arabic labeling.",
    result:
      "Grew from an initial 200-ton trial order to a 2,000-ton annual contract within two years. Now their primary rice supplier for the Saudi market.",
  },
  {
    id: "cs3",
    client: "Pelletteria Toscana",
    region: "Italy",
    challenge:
      "Sourcing EU REACH-compliant finished leather from South Asia was proving unreliable, with frequent quality inconsistencies and documentation gaps from previous suppliers.",
    solution:
      "We connected them with LWG Silver-rated tanneries in Savar, implemented pre-shipment REACH testing at SGS labs, and standardized all documentation per EU import requirements.",
    result:
      "Established a consistent supply chain delivering 20,000+ sq. ft. of finished leather quarterly, with full REACH compliance and zero rejected shipments.",
  },
];

// ─── Global Network Regions ───────────────────────────────────
export interface TradeRegion {
  name: string;
  countries: string;
  keyProducts: string;
  stats: string;
}

export const tradeRegions: TradeRegion[] = [
  { name: "Europe", countries: "Germany, Italy, Spain, UK, Netherlands, France", keyProducts: "Textiles, Leather, Jute", stats: "15 countries served" },
  { name: "Middle East", countries: "UAE, Saudi Arabia, Qatar, Kuwait, Oman", keyProducts: "Agro Products, Frozen Foods, Textiles", stats: "8 countries served" },
  { name: "East Asia", countries: "Japan, South Korea, China, Vietnam", keyProducts: "Raw Materials, Jute, Agricultural", stats: "6 countries served" },
  { name: "North America", countries: "USA, Canada", keyProducts: "Garments, Handicrafts, Jute Bags", stats: "2 countries served" },
  { name: "South Asia", countries: "India, Sri Lanka, Nepal", keyProducts: "Machinery, Chemicals, Consumer Goods", stats: "4 countries served" },
  { name: "Africa", countries: "Egypt, Kenya, South Africa, Nigeria", keyProducts: "Textiles, Agricultural, Jute", stats: "5 countries served" },
];
