"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import CTABanner from "@/components/shared/CTABanner";
import { certifications } from "@/data/siteData";
import { milestones, companyValues } from "@/data/content";

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

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Page Header (Hero) */}
      <section className="relative pt-32 pb-24 min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/warehouse-interior.png" alt="Company Warehouse Operations" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <div className="container-wide relative z-10 text-center">
          <FadeIn>
            <span className="eyebrow text-gold block mb-4">ABOUT US</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-semibold mb-6 max-w-4xl mx-auto leading-tight">
              Built on Trust, Trading Across Borders
            </h1>
            <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
              For over 15 years, Maple AG Global LTD has connected Bangladeshi producers with global markets — with integrity, compliance, and a relentless commitment to quality.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <span className="eyebrow">Our Story</span>
                <h3 className="font-serif text-3xl md:text-4xl font-semibold text-navy mt-3 mb-6 leading-tight">
                  From a Small Office in Motijheel to 40+ Countries
                </h3>
                <div className="space-y-4 text-text-muted leading-relaxed">
                  <p>
                    Maple AG Global LTD was founded in 2009 by Farhan Rahman, a veteran of
                    Bangladesh&rsquo;s export industry, with a simple conviction: that Bangladeshi
                    products — textiles, agricultural goods, leather, jute — deserved a reliable,
                    professional pathway to international markets.
                  </p>
                  <p>
                    What began as a textile export agency serving a handful of European buyers has
                    grown into a diversified import–export and supply chain company facilitating
                    trade across six continents. Today, we handle over 10,000 tons of goods
                    annually, maintain ISO-certified operations, and serve 200+ clients from our
                    headquarters in Dhaka and logistics hub in Chattogram.
                  </p>
                  <p>
                    Our growth has been deliberate, not reckless. Every new product category, every
                    new market, every new warehouse has been added because our clients needed it —
                    and because we could deliver it to the standards they expect. That philosophy
                    of earned expansion, rooted in trust, defines who we are.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative rounded-sm overflow-hidden aspect-[3/4]">
                <Image
                  src="/images/warehouse-interior.png"
                  alt="Maple AG Global LTD warehouse operations"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="section-padding bg-ivory">
        <div className="container-wide">
          <SectionHeader
            eyebrow="OUR VALUES"
            title="The Principles That Guide Us"
            description="Our core values dictate every business decision, partnership, and operational process we undertake."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {companyValues.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.1}>
                <div className="bg-white p-8 rounded-sm shadow-sm border border-stone/30 hover:border-terracotta/40 hover:shadow-md transition-all duration-300 h-full group">
                  <div className="w-12 h-12 bg-stone/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-terracotta/10 transition-colors">
                    {/* Render basic icon placeholders based on value.icon */}
                    {value.icon === "shield" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-navy group-hover:text-terracotta"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                    {value.icon === "star" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-navy group-hover:text-terracotta"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
                    {value.icon === "handshake" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-navy group-hover:text-terracotta"><path d="M12 22v-7l-2-2a4 4 0 0 1 0-5.66l2-2a4 4 0 0 1 5.66 0l2 2a4 4 0 0 1 0 5.66l-2 2v7"/></svg>}
                    {value.icon === "lightbulb" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-navy group-hover:text-terracotta"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>}
                    {value.icon === "leaf" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-navy group-hover:text-terracotta"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>}
                    {value.icon === "users" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-navy group-hover:text-terracotta"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                  </div>
                  <h4 className="font-serif text-xl font-semibold text-navy mb-3">{value.title}</h4>
                  <p className="text-sm text-text-muted leading-relaxed">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Milestone Timeline */}
      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <SectionHeader
            eyebrow="OUR JOURNEY"
            title="Milestones That Define Us"
          />

          <div ref={timelineRef} className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px] bg-stone">
              <motion.div
                initial={{ height: 0 }}
                animate={timelineInView ? { height: "100%" } : {}}
                transition={{ duration: 2, ease: "easeOut" }}
                className="w-full bg-terracotta"
              />
            </div>

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <FadeIn
                  key={milestone.year}
                  delay={i * 0.1}
                  className={`relative pl-12 md:pl-0 md:w-[calc(50%-24px)] ${i % 2 === 0 ? "md:mr-auto md:pr-8 md:text-right" : "md:ml-auto md:pl-8"
                    }`}
                >
                  {/* Dot */}
                  <div
                    className={`absolute top-1 w-3 h-3 rounded-full bg-navy border-2 border-ivory z-10 ${i % 2 === 0
                        ? "left-[10px] md:left-auto md:-right-[30px]"
                        : "left-[10px] md:-left-[30px]"
                      }`}
                  />
                  <span className="text-sm font-bold text-terracotta">{milestone.year}</span>
                  <h4 className="font-serif text-lg font-semibold text-navy mt-1">
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-text-muted mt-1">{milestone.description}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership moved to /about/management */}

      {/* Certifications Strip */}
      <section className="py-12 bg-stone-light">
        <div className="container-wide">
          <FadeIn>
            <p className="eyebrow text-center mb-8">Certifications & Compliance</p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, i) => (
              <FadeIn key={cert.name} delay={i * 0.05}>
                <div className="bg-ivory rounded-sm px-4 py-5 text-center border border-stone/30">
                  <p className="text-sm font-bold text-navy">{cert.name}</p>
                  <p className="text-[11px] text-text-muted mt-1">{cert.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Partner With Us"
        description="Join 200+ businesses that trust Maple AG Global LTD for their import-export needs."
      />
    </>
  );
}
