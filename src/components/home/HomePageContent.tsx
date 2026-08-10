"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { heroStats } from "@/data/siteData";
import { pillars, processSteps } from "@/data/services";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import SectionHeader from "@/components/shared/SectionHeader";
import TestimonialCarousel from "@/components/shared/TestimonialCarousel";
import LogoMarquee from "@/components/shared/LogoMarquee";
import CTABanner from "@/components/shared/CTABanner";
import ProductCard from "@/components/shared/ProductCard";
import QuoteModal from "@/components/shared/QuoteModal";
import SafeImage from "@/components/shared/SafeImage";
import ImageModal from "@/components/shared/ImageModal";
import { useGlobalSettings } from "@/context/GlobalSettingsContext";
import CategoryNetworkSection, { INetworkCategory } from "@/components/network/CategoryNetworkSection";

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

interface HomePageContentProps {
  importItems: any[];
  exportItems: any[];
  supplyItems: any[];
  homeSettings?: any;
  clients?: any[];
  certifications?: any[];
  networkData?: INetworkCategory[];
}

export default function HomePageContent({ importItems, exportItems, supplyItems, homeSettings, clients = [], certifications = [], networkData = [] }: HomePageContentProps) {
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<any | null>(null);
  const [selectedCertForModal, setSelectedCertForModal] = useState<any | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  const exportCategory = networkData.find(cat => cat.name === 'Export');
  const { companyName } = useGlobalSettings();


  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={homeSettings?.heroImage || "/images/hero-port.png"}
            alt="International shipping port at golden hour"
            fill
            sizes="100vw"
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
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[80px] text-white font-semibold leading-[1.08] tracking-tight">
              {companyName}
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-white font-medium tracking-wide">
              {homeSettings?.heroTitle || "Empowering Global Trade, Connecting Continents."}
            </p>
            <p className="mt-4 text-lg md:text-xl text-white/60 max-w-lg leading-relaxed">
              {homeSettings?.heroSubtitle || "Import, export, and supply chain solutions trusted by businesses across 40+ countries."}
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/services"
                className="px-7 py-3.5 bg-brand text-white text-sm font-semibold uppercase tracking-wider rounded-sm cursor-pointer hover:bg-brand-light transition-colors duration-200 border border-gold/40"
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
      <section className="bg-brand">
        <div className="container-wide py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
            {(homeSettings?.stats || heroStats).map((stat: any, index: number) => {
              const isFirst = index === 0;
              const isEvenIndex = index % 2 === 0;
              return (
                <motion.div
                  key={stat.label || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className={`text-center md:text-left ${isFirst
                    ? "pl-0"
                    : isEvenIndex
                      ? "pl-0 md:pl-6 border-l-0 md:border-l-2 md:border-gold/20"
                      : "pl-6 border-l-2 border-gold/20"
                    }`}
                >
                  <div className="text-4xl md:text-5xl font-serif text-white font-semibold mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/60 text-sm font-medium tracking-wide uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}

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
                    <h3 className="font-serif text-2xl font-semibold text-brand group-hover:text-gold transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                      {pillar.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-gold">
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

      {/* Our Sister Concerns / Logo Marquee */}
      <section className="py-16 bg-warm-white border-b border-stone-light group">
        <div className="container-wide mb-10 text-center">
          <FadeIn>
            <span className="eyebrow text-brand">OUR SISTER CONCERNS</span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand font-semibold mt-4 mb-4">
              Our Sister Concerns & Business Entities
            </h2>
          </FadeIn>
        </div>
        <LogoMarquee clients={clients} />
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
                  className="h-full bg-gold"
                />
              </div>

              {processSteps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.2} className="text-center relative z-10">
                  <div className="w-12 h-12 mx-auto rounded-full bg-brand text-white flex items-center justify-center font-serif text-lg font-bold">
                    {step.step}
                  </div>
                  <h4 className="mt-5 font-serif text-lg font-semibold text-brand">
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
                  className="w-full bg-gold"
                />
              </div>
              {processSteps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.15} className="relative">
                  <div className="absolute -left-8 top-0 w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold z-10">
                    {step.step}
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-brand">
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
                <h2 className="font-serif text-3xl md:text-4xl text-brand font-semibold mt-4 mb-4">
                  Sourcing Essential Raw Materials & Machinery
                </h2>
                <p className="text-text-muted leading-relaxed">
                  We empower local industries by importing high-quality raw materials and advanced industrial machinery. From premium raw cotton and prime-grade polymers to state-of-the-art manufacturing equipment, our imports form the backbone of Bangladesh&apos;s booming manufacturing sector.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {importItems.map((product: any, i: number) => (
                <FadeIn key={product._id || product.id || `import-${i}`} delay={i * 0.1}>
                  <ProductCard product={product} onRequestQuote={(p) => setSelectedProductForQuote(p)} />
                </FadeIn>
              ))}
            </div>

            <div className="mt-8 text-center md:text-right">
              <Link href="/services/import" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold cursor-pointer hover:text-brand transition-colors">
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
                <h2 className="font-serif text-3xl md:text-4xl text-brand font-semibold mt-4 mb-4">
                  Delivering Quality Goods to the World
                </h2>
                <p className="text-text-muted leading-relaxed">
                  We export the very best of Bangladesh to international markets. From meticulously crafted ready-made garments and premium aromatic rice to REACH-compliant finished leather, our export portfolio represents quality, compliance, and competitive pricing for global wholesale buyers.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {exportItems.map((product: any, i: number) => (
                <FadeIn key={product._id || product.id || `export-${i}`} delay={i * 0.1}>
                  <ProductCard product={product} onRequestQuote={(p) => setSelectedProductForQuote(p)} />
                </FadeIn>
              ))}
            </div>

            <div className="mt-8 text-center md:text-right">
              <Link href="/services/export" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold cursor-pointer hover:text-brand transition-colors">
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
                <h2 className="font-serif text-3xl md:text-4xl text-brand font-semibold mt-4 mb-4">
                  Seamless Raw Material Supply Chains
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Connecting producers with processors, we supply bulk raw materials with uncompromising quality control. Whether it&apos;s raw jute fibers for eco-packaging, high-curcumin turmeric for food processors, or premium denim rolls, we guarantee reliable and continuous supply to keep local industries running.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {supplyItems.map((product: any, i: number) => (
                <FadeIn key={product._id || product.id || `supply-${i}`} delay={i * 0.1}>
                  <ProductCard product={product} onRequestQuote={(p) => setSelectedProductForQuote(p)} />
                </FadeIn>
              ))}
            </div>


            <div className="mt-8 text-center md:text-right">
              <Link href="/services/supply" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold cursor-pointer hover:text-brand transition-colors">
                View All Supply Products
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach - Export Category Only */}
      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <SectionHeader
            eyebrow="OUR EXPORT NETWORK"
            title="Trading Across Continents"
            description="From Dhaka to Dubai, Hamburg to Hong Kong — explore our established global export network."
          />
          {exportCategory ? (
            <CategoryNetworkSection category={exportCategory} />
          ) : (
            <div className="py-12 text-center text-stone-500 italic">Network data is currently being updated.</div>
          )}
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



      {/* Certifications Strip */}
      <section className="section-padding bg-stone-light">
        <div className="container-wide">
          <SectionHeader
            eyebrow="STANDARDS & COMPLIANCE"
            title="Certifications & Compliance"
            description="We strictly adhere to global quality benchmarks, international trade compliance regulations, and sustainable sourcing practices across all our import and export operations."
          />
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-6xl mx-auto">
            {certifications.map((cert: any, i: number) => (
              <FadeIn
                key={cert._id || cert.id || cert.title || cert.name}
                delay={i * 0.05}
                className="w-[calc(50%-10px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(20%-20px)] min-w-[160px] max-w-[220px]"
              >
                <div 
                  onClick={() => setSelectedCertForModal(cert)}
                  className="group cursor-pointer bg-ivory rounded-sm border border-stone/30 hover:border-gold/50 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between overflow-hidden min-h-[220px]"
                >
                  <div className="h-32 sm:h-36 w-full relative flex items-center justify-center bg-white/60 p-3 overflow-hidden">
                    {cert.imageUrl ? (
                      <SafeImage 
                        src={cert.imageUrl} 
                        alt={cert.title || cert.name || "Certification"} 
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300 ease-out" 
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-xs tracking-wider group-hover:scale-110 transition-transform duration-300">
                        CERT
                      </div>
                    )}
                  </div>
                  <div className="p-4 text-center w-full flex-grow flex flex-col justify-center bg-ivory">
                    <p className="text-sm font-bold text-brand leading-tight mb-1 group-hover:text-gold transition-colors">{cert.title || cert.name}</p>
                    {cert.description && (
                      <p className="text-[11px] text-text-muted leading-tight line-clamp-2">{cert.description}</p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
            {certifications.length === 0 && (
              <div className="w-full text-center text-stone-500 italic text-sm py-4">
                No certifications found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner />

      {selectedProductForQuote && (
        <QuoteModal
          product={selectedProductForQuote}
          onClose={() => setSelectedProductForQuote(null)}
        />
      )}

      <ImageModal
        isOpen={!!selectedCertForModal}
        onClose={() => setSelectedCertForModal(null)}
        src={selectedCertForModal?.imageUrl}
        title={selectedCertForModal?.title || selectedCertForModal?.name}
        description={selectedCertForModal?.description}
      />
    </>
  );
}

