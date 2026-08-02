export interface Service {
  id: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  items: string[];
  process: { step: number; title: string; description: string }[];
  stats: { value: string; label: string }[];
}

export const services: Service[] = [
  {
    id: "import",
    title: "Import Services",
    headline: "Sourcing the World for Bangladesh",
    description:
      "We streamline the import of industrial machinery, raw materials, chemicals, and consumer goods from global suppliers into Bangladesh. Our established relationships with manufacturers across Asia, Europe, and the Middle East ensure competitive pricing, quality assurance, and reliable logistics from origin to destination.",
    image: "/images/import-machinery.png",
    items: [
      "Industrial Machinery & Equipment",
      "Raw Materials & Chemicals",
      "Electronic Components",
      "Medical Equipment & Supplies",
      "Agricultural Inputs & Fertilizers",
      "Consumer Goods & FMCG",
    ],
    process: [
      { step: 1, title: "Supplier Identification", description: "We identify and vet international suppliers against quality, pricing, and compliance standards." },
      { step: 2, title: "Negotiation & Procurement", description: "Our procurement team negotiates optimal terms, pricing, and delivery schedules." },
      { step: 3, title: "Customs & Documentation", description: "Complete LC handling, customs clearance, and regulatory documentation through Chattogram port." },
      { step: 4, title: "Inland Delivery", description: "Last-mile logistics from port to your warehouse anywhere in Bangladesh." },
    ],
    stats: [
      { value: "12+", label: "Source Countries" },
      { value: "5,000+", label: "TEUs Imported Annually" },
      { value: "98%", label: "On-Time Clearance Rate" },
    ],
  },
  {
    id: "export",
    title: "Export Services",
    headline: "Bangladesh's Finest, Delivered Worldwide",
    description:
      "We connect Bangladeshi manufacturers and producers with international buyers across Europe, the Middle East, East Asia, and North America. From textiles and garments to agricultural products and frozen foods, we handle every stage of the export process — from sourcing and quality inspection to documentation, logistics, and port-to-port delivery.",
    image: "/images/cargo-ship.png",
    items: [
      "Textiles & Ready-Made Garments",
      "Agricultural & Food Products",
      "Leather & Leather Goods",
      "Jute & Jute Products",
      "Frozen Fish & Seafood",
      "Handicrafts & Home Textiles",
    ],
    process: [
      { step: 1, title: "Product Sourcing", description: "We source from a vetted network of Bangladeshi manufacturers and producers." },
      { step: 2, title: "Quality Inspection", description: "Pre-shipment inspection, lab testing, and compliance verification per buyer requirements." },
      { step: 3, title: "Export Documentation", description: "Full documentation including HS codes, certificates of origin, phytosanitary certificates, and LC handling." },
      { step: 4, title: "Global Shipping", description: "FCL/LCL shipment via Chattogram and Mongla ports with real-time tracking." },
    ],
    stats: [
      { value: "40+", label: "Destination Countries" },
      { value: "10,000+", label: "Tons Exported Annually" },
      { value: "15+", label: "Product Categories" },
    ],
  },
  {
    id: "supply",
    title: "Supply & Distribution",
    headline: "End-to-End Supply Chain Solutions",
    description:
      "Beyond import and export, we provide comprehensive supply chain management — warehousing, inventory management, cold chain logistics, and inland distribution. Our infrastructure and partnerships ensure seamless product flow from manufacturer to market, whether domestically or internationally.",
    image: "/images/container-trucks.png",
    items: [
      "Warehousing & Storage",
      "Cold Chain Management",
      "Inventory & Stock Management",
      "Inland Transportation & Trucking",
      "Distribution Network Management",
      "Last-Mile Delivery Coordination",
    ],
    process: [
      { step: 1, title: "Needs Assessment", description: "We analyze your supply chain requirements and design an optimized logistics solution." },
      { step: 2, title: "Warehousing Setup", description: "Temperature-controlled and general warehousing across key locations in Bangladesh." },
      { step: 3, title: "Distribution Planning", description: "Route optimization, fleet coordination, and delivery scheduling." },
      { step: 4, title: "Ongoing Management", description: "Continuous monitoring, reporting, and optimization of the supply chain." },
    ],
    stats: [
      { value: "50,000+", label: "Sq. Ft. Warehouse Space" },
      { value: "24/7", label: "Cold Chain Monitoring" },
      { value: "99.5%", label: "Delivery Accuracy" },
    ],
  },
];

export const pillars = [
  {
    title: "Import",
    description: "Sourcing machinery, raw materials, and goods from global markets to fuel Bangladesh's industries.",
    image: "/images/import-machinery.png",
    link: "/services#import",
  },
  {
    title: "Export",
    description: "Delivering Bangladesh's finest textiles, agro products, and goods to buyers across 40+ countries.",
    image: "/images/cargo-ship.png",
    link: "/services#export",
  },
  {
    title: "Supply",
    description: "End-to-end supply chain management — warehousing, cold chain, and distribution across the region.",
    image: "/images/container-trucks.png",
    link: "/services#supply",
  },
];

export const processSteps = [
  { step: 1, title: "Sourcing", description: "We identify and vet suppliers from our global network." },
  { step: 2, title: "Customs & Compliance", description: "Full documentation, HS codes, and regulatory clearance." },
  { step: 3, title: "Logistics", description: "Sea, air, and land freight with real-time tracking." },
  { step: 4, title: "Delivery", description: "Port-to-door or warehouse-to-warehouse, on time." },
];
