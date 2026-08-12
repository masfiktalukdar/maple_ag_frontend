"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { processSteps } from "@/data/services";
import SectionHeader from "@/components/shared/SectionHeader";
import CTABanner from "@/components/shared/CTABanner";
import TestimonialCarousel from "@/components/shared/TestimonialCarousel";
import CategoryNetworkSection, { INetworkCategory } from "./CategoryNetworkSection";
import { IMAGES } from "@/constants/images";

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
  IMAGES.AGRO_PRODUCTS,
  IMAGES.WAREHOUSE_INTERIOR,
  IMAGES.CARGO_SHIP,
  IMAGES.CONTAINER_TRUCKS,
];

export default function GlobalNetworkContent({ networkData = [] }: { networkData?: INetworkCategory[] }) {
  // Sort categories strictly as Export, Import, Supply
  const order = ['Export', 'Import', 'Supply'];
  const sortedCategories = [...networkData].sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image src={IMAGES.HERO_PORT} alt="Shipping port operations" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-brand/85" />
        </div>
        <div className="container-wide relative z-10 text-center">
          <FadeIn>
            <span className="eyebrow text-accent block mb-4">GLOBAL NETWORK</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-semibold mb-6 max-w-4xl mx-auto leading-tight">
              Connecting Markets, Moving Goods
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Our trade network spans six continents, with established logistics partnerships, port relationships, and market expertise in over 40 countries.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Where We Operate - 3 Maps Side by Side */}
      <section className="py-12 md:py-16 bg-ivory">
        <div className="container-wide max-w-7xl">
          <FadeIn>
            <SectionHeader
              eyebrow="GLOBAL NETWORK"
              title="Import, Export & Supply Operations"
              description="Explore our operational footprint across our primary trade sectors worldwide."
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {sortedCategories.map((cat, i) => (
                <div 
                  key={cat._id || i} 
                  className="bg-white rounded-sm border border-stone-200 shadow-sm p-3 hover:shadow-md hover:border-gold/40 transition-all duration-300 flex flex-col"
                >
                  <h3 className="text-brand text-xs sm:text-sm font-bold text-center uppercase tracking-widest py-1.5 mb-2 border-b border-stone-100/80">
                    {cat.name} Network
                  </h3>
                  {cat.mapImage ? (
                    <div className="relative w-full aspect-[4/3] bg-stone-50/60 rounded-xs border border-stone-100 p-1 flex items-center justify-center overflow-hidden">
                      <Image 
                        src={cat.mapImage}
                        alt={`${cat.name} Map`}
                        width={1200}
                        height={750}
                        className="w-full h-full object-contain block"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/3] bg-stone-100 rounded-xs border border-stone-200 flex items-center justify-center">
                      <span className="text-stone-400 text-xs font-bold uppercase tracking-widest">No Map Uploaded</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Network Category Sections with Country Cards */}
      {sortedCategories.some(cat => cat.countries && cat.countries.length > 0) && (
        <section className="section-padding bg-warm-white border-t border-stone-200">
          <div className="container-wide space-y-20">
            {sortedCategories
              .filter((category) => category.countries && category.countries.length > 0)
              .map((category) => (
                <div key={category._id || category.name} className="scroll-mt-24" id={`${category.name.toLowerCase()}-network`}>
                  <SectionHeader
                    eyebrow={`${category.name.toUpperCase()} NETWORK`}
                    title={`${category.name} Operations & Network Footprint`}
                  />
                  <CategoryNetworkSection category={category} showMap={false} />
                </div>
              ))}
          </div>
        </section>
      )}

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
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""
                  }`}>
                  <div className={i % 2 === 1 ? "md:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center font-serif text-xl font-bold">
                        {step.step}
                      </div>
                      <span className="eyebrow">Step {String(step.step).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl font-semibold text-brand mb-3">
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

      {/* Testimonials */}
      <section className="section-padding bg-ivory">
        <div className="container-wide">
          <SectionHeader
            eyebrow="CLIENT TESTIMONIALS"
            title="What Our Partners Say"
          />
          <TestimonialCarousel />
        </div>
      </section>

      <CTABanner
        headline="Ready to Ship?"
        description="Connect with our global network team to streamline your import, export, and supply chain logistics."
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </>
  );
}
