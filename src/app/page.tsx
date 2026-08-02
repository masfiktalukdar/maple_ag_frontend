"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { heroStats } from "@/data/siteData";
import { pillars, processSteps } from "@/data/services";
import { importProducts, exportProducts, supplyProducts } from "@/data/products";
import { tradeRegions } from "@/data/content";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import SectionHeader from "@/components/shared/SectionHeader";
import TestimonialCarousel from "@/components/shared/TestimonialCarousel";
import LogoMarquee from "@/components/shared/LogoMarquee";
import CTABanner from "@/components/shared/CTABanner";
import ProductCard from "@/components/shared/ProductCard";

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

export default function HomePage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  const importItems = importProducts.slice(0, 3);
  const exportItems = exportProducts.slice(0, 3);
  const supplyItems = supplyProducts.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-port.png"
            alt="International shipping port at golden hour"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/30" />
        </div>

        <div className="relative z-10 container-wide">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl"
          >
            <span className="eyebrow text-gold mb-4 block">
              Established 2009 · Dhaka, Bangladesh
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[80px] text-white font-semibold leading-[1.08] tracking-tight">
              Maple AG Global LTD
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-gold font-medium tracking-wide">
              Empowering Global Trade, Connecting Continents.
            </p>
            <p className="mt-4 text-lg md:text-xl text-white/60 max-w-lg leading-relaxed">
              Import, export, and supply chain solutions trusted by businesses across 40+ countries.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/services"
                className="px-7 py-3.5 bg-terracotta text-white text-sm font-semibold uppercase tracking-wider rounded-sm hover:bg-terracotta-dark transition-colors duration-200"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 border border-white/30 text-white text-sm font-semibold uppercase tracking-wider rounded-sm hover:bg-white/10 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Numbers / Stats Bar */}
      <section className="bg-navy">
        <div className="container-wide py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {heroStats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-xs md:text-sm uppercase tracking-[0.12em] text-white/40 font-medium">
                  {stat.label}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="section-padding bg-ivory">
        <div className="container-wide">
          <SectionHeader
            eyebrow="WHAT WE DO"
            title="Import. Export. Supply."
            description="End-to-end trade and logistics solutions connecting Bangladeshi producers with global markets."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.12}>
                <Link href={pillar.link} className="group block">
                  <div className="img-zoom rounded-sm overflow-hidden">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <h3 className="font-serif text-2xl font-semibold text-navy group-hover:text-terracotta transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                      {pillar.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-terracotta">
                      Learn more
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="group-hover:translate-x-1 transition-transform"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <SectionHeader
            eyebrow="HOW WE WORK"
            title="From Source to Destination"
            description="A streamlined four-step process that ensures quality, compliance, and timely delivery."
          />

          <div ref={timelineRef} className="relative">
            <div className="hidden md:grid grid-cols-4 gap-0 relative">
              <div className="absolute top-6 left-[12.5%] right-[12.5%] h-[2px] bg-stone">
                <motion.div
                  initial={{ width: 0 }}
                  animate={timelineInView ? { width: "100%" } : {}}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-terracotta"
                />
              </div>

              {processSteps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.2} className="text-center relative z-10">
                  <div className="w-12 h-12 mx-auto rounded-full bg-navy text-white flex items-center justify-center font-serif text-lg font-bold">
                    {step.step}
                  </div>
                  <h4 className="mt-5 font-serif text-lg font-semibold text-navy">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed px-4">
                    {step.description}
                  </p>
                </FadeIn>
              ))}
            </div>

            <div className="md:hidden space-y-8 relative pl-8">
              <div className="absolute left-[14px] top-0 bottom-0 w-[2px] bg-stone">
                <motion.div
                  initial={{ height: 0 }}
                  animate={timelineInView ? { height: "100%" } : {}}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="w-full bg-terracotta"
                />
              </div>
              {processSteps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.15} className="relative">
                  <div className="absolute -left-8 top-0 w-7 h-7 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold z-10">
                    {step.step}
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-navy">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-sm text-text-muted">
                    {step.description}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Import, Export, Supply Products Grids */}
      <section className="py-24 bg-ivory">
        <div className="container-wide space-y-24">

          {/* WHAT WE IMPORT */}
          <div>
            <div className="max-w-3xl mb-12">
              <FadeIn>
                <span className="eyebrow">WHAT WE IMPORT</span>
                <h2 className="font-serif text-3xl md:text-4xl text-navy font-semibold mt-4 mb-4">
                  Sourcing Essential Raw Materials & Machinery
                </h2>
                <p className="text-text-muted leading-relaxed">
                  We empower local industries by importing high-quality raw materials and advanced industrial machinery. From premium raw cotton and prime-grade polymers to state-of-the-art manufacturing equipment, our imports form the backbone of Bangladesh's booming manufacturing sector.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {importItems.map((product, i) => (
                <FadeIn key={product.id} delay={i * 0.1}>
                  <ProductCard product={product} />
                </FadeIn>
              ))}
            </div>

            <div className="mt-8 text-center md:text-right">
              <Link href="/services/import" className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-navy transition-colors">
                View All Import Products
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>
          </div>

          {/* WHAT WE EXPORT */}
          <div>
            <div className="max-w-3xl mb-12">
              <FadeIn>
                <span className="eyebrow">WHAT WE EXPORT</span>
                <h2 className="font-serif text-3xl md:text-4xl text-navy font-semibold mt-4 mb-4">
                  Delivering Quality Goods to the World
                </h2>
                <p className="text-text-muted leading-relaxed">
                  We export the very best of Bangladesh to international markets. From meticulously crafted ready-made garments and premium aromatic rice to REACH-compliant finished leather, our export portfolio represents quality, compliance, and competitive pricing for global wholesale buyers.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {exportItems.map((product, i) => (
                <FadeIn key={product.id} delay={i * 0.1}>
                  <ProductCard product={product} />
                </FadeIn>
              ))}
            </div>

            <div className="mt-8 text-center md:text-right">
              <Link href="/services/export" className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-navy transition-colors">
                View All Export Products
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>
          </div>

          {/* WHAT WE SUPPLY */}
          <div>
            <div className="max-w-3xl mb-12">
              <FadeIn>
                <span className="eyebrow">WHAT WE SUPPLY</span>
                <h2 className="font-serif text-3xl md:text-4xl text-navy font-semibold mt-4 mb-4">
                  Seamless Raw Material Supply Chains
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Connecting producers with processors, we supply bulk raw materials with uncompromising quality control. Whether it's raw jute fibers for eco-packaging, high-curcumin turmeric for food processors, or premium denim rolls, we guarantee reliable and continuous supply to keep local industries running.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {supplyItems.map((product, i) => (
                <FadeIn key={product.id} delay={i * 0.1}>
                  <ProductCard product={product} />
                </FadeIn>
              ))}
            </div>

            <div className="mt-8 text-center md:text-right">
              <Link href="/services/supply" className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-navy transition-colors">
                View All Supply Products
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>
          </div>

          <FadeIn className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white text-sm font-semibold uppercase tracking-wider rounded-sm hover:bg-terracotta transition-colors shadow-sm"
            >
              Explore Full Product Catalog
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Global Reach */}
      <section className="section-padding bg-navy">
        <div className="container-wide">
          <SectionHeader
            eyebrow="OUR REACH"
            title="Trading Across Continents"
            description="From Dhaka to Dubai, Hamburg to Hong Kong — our trade network spans six continents."
            light
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="relative p-4 md:p-8 bg-white/5 rounded-sm border border-white/10 overflow-hidden">
                <svg viewBox="0 0 800 450" className="w-full h-auto transform scale-110 md:scale-125 lg:scale-135 origin-center" fill="none">
                  <rect width="800" height="450" rx="8" fill="rgba(255,255,255,0.03)" />

                  {[0, 1, 2, 3, 4].map((i) => (
                    <line key={`h${i}`} x1="0" y1={90 * (i + 1) - 45} x2="800" y2={90 * (i + 1) - 45} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  ))}
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <line key={`v${i}`} x1={100 * (i + 1)} y1="0" x2={100 * (i + 1)} y2="450" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  ))}

                  <motion.path
                    d="M 450 260 Q 500 200 580 200"
                    stroke="#D9A441"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <motion.path
                    d="M 450 260 Q 400 180 350 170"
                    stroke="#D9A441"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.7 }}
                  />
                  <motion.path
                    d="M 450 260 Q 300 240 220 220"
                    stroke="#D9A441"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.9 }}
                  />

                  {[
                    { cx: 450, cy: 260, label: "Dhaka (HQ)" },
                    { cx: 580, cy: 200, label: "Hong Kong" },
                    { cx: 350, cy: 170, label: "Hamburg" },
                    { cx: 220, cy: 220, label: "New York" },
                    { cx: 410, cy: 240, label: "Dubai" },
                  ].map((hub) => (
                    <g key={hub.label}>
                      <circle cx={hub.cx} cy={hub.cy} r="6" fill="#C1502E" />
                      <circle cx={hub.cx} cy={hub.cy} r="12" fill="#C1502E" opacity="0.3">
                        <animate attributeName="r" values="6;16;6" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <text x={hub.cx + 10} y={hub.cy + 4} fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="sans-serif">
                        {hub.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-6">
                {tradeRegions.map((region) => (
                  <div key={region.name} className="border-b border-white/10 pb-5">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="font-serif text-lg text-white font-medium">
                        {region.name}
                      </h4>
                      <span className="text-xs text-gold font-mono">
                        {region.stats}
                      </span>
                    </div>
                    <p className="text-xs uppercase tracking-wider text-white/40 mb-2">
                      {region.countries}
                    </p>
                    <p className="text-sm text-white/60">
                      Key Goods: {region.keyProducts}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
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

      {/* Logo Marquee */}
      <section className="py-16 bg-warm-white">
        <div className="container-wide mb-10">
          <FadeIn>
            <p className="eyebrow text-center">Trusted By</p>
          </FadeIn>
        </div>
        <LogoMarquee />
      </section>

      {/* CTA Banner */}
      <CTABanner />
    </>
  );
}
