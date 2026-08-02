"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { tradeRegions } from "@/data/content";
import { processSteps } from "@/data/services";
import SectionHeader from "@/components/shared/SectionHeader";
import CTABanner from "@/components/shared/CTABanner";

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const processImages = [
  "/images/agro-products.png",
  "/images/warehouse-interior.png",
  "/images/cargo-ship.png",
  "/images/container-trucks.png",
];

const galleryImages = [
  { src: "/images/hero-port.png", alt: "Shipping port operations" },
  { src: "/images/warehouse-interior.png", alt: "Warehouse interior" },
  { src: "/images/container-trucks.png", alt: "Container truck fleet" },
  { src: "/images/cargo-ship.png", alt: "Cargo ship at sea" },
  { src: "/images/import-machinery.png", alt: "Machinery import operations" },
  { src: "/images/agro-products.png", alt: "Agricultural products" },
];

export default function GlobalNetworkPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/hero-port.png" alt="Shipping port operations" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-navy/85" />
        </div>
        <div className="container-wide relative z-10 text-center">
          <FadeIn>
            <span className="eyebrow text-gold block mb-4">GLOBAL NETWORK</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-semibold mb-6 max-w-4xl mx-auto leading-tight">
              Connecting Markets, Moving Goods
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Our trade network spans six continents, with established logistics partnerships, port relationships, and market expertise in over 40 countries.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Full Map Section */}
      <section className="section-padding bg-navy">
        <div className="container-wide">
          <FadeIn>
            <div className="relative mb-12">
              <svg viewBox="0 0 900 500" className="w-full h-auto" fill="none">
                <rect width="900" height="500" rx="8" fill="rgba(255,255,255,0.02)" />
                
                {/* Grid lines */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={55 * (i + 1)} x2="900" y2={55 * (i + 1)} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={`v${i}`} x1={112.5 * (i + 1)} y1="0" x2={112.5 * (i + 1)} y2="500" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                ))}

                {/* Trade routes from Bangladesh */}
                {[
                  "M 510 290 Q 450 200 380 190",  // Europe
                  "M 510 290 Q 470 260 440 260",   // Middle East
                  "M 510 290 Q 560 230 640 220",   // East Asia
                  "M 510 290 Q 350 220 200 200",   // North America
                  "M 510 290 Q 450 330 380 340",   // Africa
                  "M 510 290 Q 530 280 560 290",   // South Asia
                ].map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    stroke="#D9A441"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.3 + i * 0.2 }}
                  />
                ))}

                {/* Bangladesh - pulsing origin */}
                <circle cx="510" cy="290" r="7" fill="#C1502E" />
                <circle cx="510" cy="290" r="14" fill="none" stroke="#C1502E" strokeWidth="1.5" opacity="0.4">
                  <animate attributeName="r" from="10" to="22" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="510" y="315" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">BANGLADESH</text>

                {/* Region markers */}
                {[
                  { x: 380, y: 190, label: "EUROPE", sub: "15 countries" },
                  { x: 440, y: 260, label: "MIDDLE EAST", sub: "8 countries" },
                  { x: 640, y: 220, label: "EAST ASIA", sub: "6 countries" },
                  { x: 200, y: 200, label: "N. AMERICA", sub: "2 countries" },
                  { x: 380, y: 340, label: "AFRICA", sub: "5 countries" },
                  { x: 560, y: 290, label: "SOUTH ASIA", sub: "4 countries" },
                ].map((region, i) => (
                  <g key={i}>
                    <circle cx={region.x} cy={region.y} r="5" fill="#D9A441" />
                    <text x={region.x} y={region.y - 12} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10" fontWeight="600">{region.label}</text>
                    <text x={region.x} y={region.y + 18} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9">{region.sub}</text>
                  </g>
                ))}
              </svg>
            </div>
          </FadeIn>

          {/* Region details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradeRegions.map((region, i) => (
              <FadeIn key={region.name} delay={i * 0.08}>
                <div className="border border-white/10 rounded-sm p-6 hover:border-white/20 transition-colors">
                  <div className="flex items-baseline justify-between mb-3">
                    <h4 className="font-serif text-lg text-white font-medium">
                      {region.name}
                    </h4>
                    <span className="text-xs text-gold font-medium">
                      {region.stats}
                    </span>
                  </div>
                  <p className="text-sm text-white/50 mb-2">{region.countries}</p>
                  <p className="text-xs text-white/30">
                    Key exports: {region.keyProducts}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process Explainer - Expanded */}
      <section className="section-padding bg-ivory">
        <div className="container-wide">
          <SectionHeader
            eyebrow="HOW WE WORK"
            title="From Source to Destination"
            description="Every shipment follows our four-stage process — designed for transparency, compliance, and on-time delivery."
          />

          <div className="space-y-16 md:space-y-24">
            {processSteps.map((step, i) => (
              <FadeIn key={step.step}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                  i % 2 === 1 ? "md:direction-rtl" : ""
                }`}>
                  <div className={i % 2 === 1 ? "md:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-serif text-xl font-bold">
                        {step.step}
                      </div>
                      <span className="eyebrow">Step {String(step.step).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl font-semibold text-navy mb-3">
                      {step.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed text-base">
                      {step.description}
                    </p>
                    <p className="text-text-muted leading-relaxed text-sm mt-3">
                      {i === 0 && "We draw from a vetted network of manufacturers, producers, and suppliers across Bangladesh. Every source is audited for quality, capacity, and compliance before becoming part of our supply chain."}
                      {i === 1 && "Our in-house compliance team handles all documentation — letters of credit, certificates of origin, phytosanitary certificates, HS code classification, and customs declarations. We ensure every shipment meets both origin and destination country regulations."}
                      {i === 2 && "We coordinate FCL and LCL shipments via Chattogram and Mongla ports, with options for air freight when speed is critical. Real-time tracking keeps you informed at every stage of the journey."}
                      {i === 3 && "From port clearance to final delivery — whether it's a warehouse in Hamburg, a distribution center in Dubai, or a facility in Dhaka — we handle the last mile with the same precision as every other stage."}
                    </p>
                  </div>
                  <div className={`${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                      <Image
                        src={processImages[i]}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <SectionHeader
            eyebrow="OUR OPERATIONS"
            title="Infrastructure & Logistics"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className={`relative rounded-sm overflow-hidden ${
                  i === 0 ? "aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto md:h-full" : "aspect-square"
                }`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to Ship?"
        description="Connect with our logistics team to discuss your next shipment."
      />
    </>
  );
}
