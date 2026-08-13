// ─── Navigation ───────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Company Overview", href: "/about" },
      { label: "Mission & Vision", href: "/about/mission-vision" },
      { label: "Management", href: "/about/management" }
    ]
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Overview", href: "/services" },
      { label: "Import", href: "/services/import" },
      { label: "Export", href: "/services/export" },
      { label: "Supply", href: "/services/supply" }
    ]
  },
  { label: "Global Network", href: "/global-network" },
  { label: "Gallery", href: "/gallery" }
];

// ─── Stats ────────────────────────────────────────────────────
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const heroStats: Stat[] = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 40, suffix: "+", label: "Countries Served" },
  { value: 10000, suffix: "+", label: "Tons Shipped Annually" },
  { value: 200, suffix: "+", label: "Global Clients" },
];

// ─── Certifications ───────────────────────────────────────────
export interface Certification {
  name: string;
  description: string;
}

export const certifications: Certification[] = [
  { name: "ISO 9001:2015", description: "Quality Management System" },
  { name: "ISO 22000", description: "Food Safety Management" },
  { name: "BSTI Certified", description: "Bangladesh Standards & Testing" },
  { name: "HACCP", description: "Hazard Analysis Critical Control" },
  { name: "GSP Certified", description: "Generalized System of Preferences" },
  { name: "Oeko-Tex Standard", description: "Textile Safety Certification" },
];

// ─── Company Info ─────────────────────────────────────────────
export const companyInfo = {
  name: "Maple AG Global LTD",
  tagline: "Empowering Global Trade, Connecting Continents.",
  description:
    "A premier import–export and supply chain company headquartered in Dhaka, Bangladesh, facilitating trade across 40+ countries with a commitment to quality, compliance, and reliability.",
  foundedYear: 2009,
  address: "Gulshan-2, Dhaka 1212, Bangladesh",
  phone: "+880 2 8432 1100",
  email: "info@banglatrade-intl.com",
  exportEmail: "exports@banglatrade-intl.com",
  socialLinks: {
    linkedin: "https://linkedin.com/company/banglatrade",
    twitter: "https://twitter.com/banglatrade",
    facebook: "https://facebook.com/banglatrade",
  },
};
