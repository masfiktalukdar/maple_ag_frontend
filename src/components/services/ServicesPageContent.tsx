"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import SectionHeader from "@/components/shared/SectionHeader";
import CTABanner from "@/components/shared/CTABanner";
import SafeImage from "@/components/shared/SafeImage";
import { API_BASE, fetchApi } from "@/lib/api";
import { FaExpand, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IMAGES } from "@/constants/images";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

interface StatItem {
  _id?: string;
  category?: string;
  value: string;
  label: string;
}

interface ServiceHeaderData {
  _id?: string;
  category: string;
  headline: string;
  description: string;
}

interface InfrastructureItem {
  _id: string;
  imageUrl: string;
  caption?: string;
  order: number;
}

const fallbackGalleryImages = [
  { src: IMAGES.HERO_PORT, alt: "Shipping port operations" },
  { src: IMAGES.WAREHOUSE_INTERIOR, alt: "Warehouse interior" },
  { src: IMAGES.CONTAINER_TRUCKS, alt: "Container truck fleet" },
  { src: IMAGES.CARGO_SHIP, alt: "Cargo ship at sea" },
  { src: IMAGES.IMPORT_MACHINERY, alt: "Machinery import operations" },
  { src: IMAGES.AGRO_PRODUCTS, alt: "Agricultural products" },
];

export default function ServicesPageContent() {
  const [dynamicStats, setDynamicStats] = useState<StatItem[]>([]);
  const [dynamicHeaders, setDynamicHeaders] = useState<ServiceHeaderData[]>([]);
  const [infraItems, setInfraItems] = useState<InfrastructureItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/services`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setDynamicStats(data.data);
        }
      })
      .catch((err) => console.error("Failed to fetch service stats:", err));

    fetch(`${API_BASE}/services/headers`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setDynamicHeaders(data.data);
        }
      })
      .catch((err) => console.error("Failed to fetch service headers:", err));

    fetchApi("/network/infrastructure")
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setInfraItems(res.data);
        }
      })
      .catch((err) => console.error("Failed to fetch infrastructure items:", err));
  }, []);

  const getStatsForService = (serviceId: string, fallbackStats: StatItem[]) => {
    const statsForCategory = dynamicStats.filter((s) => s.category === serviceId);
    if (statsForCategory.length > 0) {
      return statsForCategory.slice(0, 4);
    }
    return fallbackStats;
  };

  const getHeaderForService = (serviceId: string, fallbackHeadline: string, fallbackDesc: string) => {
    const header = dynamicHeaders.find((h) => h.category === serviceId);
    if (header) {
      return {
        headline: header.headline || fallbackHeadline,
        description: header.description || fallbackDesc,
      };
    }
    return { headline: fallbackHeadline, description: fallbackDesc };
  };

  const galleryImages = infraItems.length > 0
    ? infraItems.map((item) => ({
        src: item.imageUrl,
        alt: item.caption || "Infrastructure & Logistics operation photo",
      }))
    : fallbackGalleryImages;

  return (
    <>
      {/* Page Header (Hero) */}
      <section className="relative pt-32 pb-24 min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image src={IMAGES.CARGO_SHIP} alt="Global Trade Services" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-brand/80" />
        </div>
        <div className="container-wide relative z-10 text-center">
          <FadeIn>
            <span className="eyebrow text-white block mb-4">OUR SERVICES</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-semibold mb-6 max-w-4xl mx-auto leading-tight">
              Comprehensive Trade Solutions
            </h1>
            <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
              We bridge the gap between local producers and global markets with end-to-end import, export, and supply chain solutions.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-warm-white">
        <div className="container-wide space-y-24">
          {services.map((service, i) => {
            const currentStats = getStatsForService(service.id, service.stats);
            const { headline, description } = getHeaderForService(service.id, service.headline, service.description);

            return (
              <div key={service.id} className={`flex flex-col ${i % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
                <FadeIn className="w-full lg:w-1/2" delay={0.1}>
                  <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden shadow-md">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-brand/10" />
                  </div>
                </FadeIn>
                
                <FadeIn className="w-full lg:w-1/2" delay={0.2}>
                  <span className="eyebrow block mb-3 text-accent">0{i + 1} {"//"} {service.title}</span>
                  <h3 className="font-serif text-3xl md:text-4xl text-brand font-semibold mb-6">
                    {headline}
                  </h3>
                  <p className="text-text-muted leading-relaxed mb-8 text-lg">
                    {description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    {currentStats.map((stat, idx) => (
                      <div key={stat._id || `${stat.label}-${idx}`} className="bg-white p-4 border border-stone/30 rounded-sm">
                        <p className="font-serif text-2xl font-bold text-brand">{stat.value}</p>
                        <p className="text-xs uppercase tracking-wider text-text-muted mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-white text-sm font-semibold uppercase tracking-wider rounded-sm cursor-pointer hover:bg-gold transition-colors shadow-sm"
                  >
                    Explore {service.title}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </section>

      {/* Infrastructure & Logistics Gallery Section */}
      <section className="section-padding bg-ivory border-t border-stone-200">
        <div className="container-wide">
          <SectionHeader
            eyebrow="OUR OPERATIONS"
            title="Infrastructure & Logistics"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div
                  onClick={() => setLightboxIndex(i)}
                  className={`relative rounded-lg overflow-hidden bg-stone-900/5 group cursor-zoom-in shadow-xs hover:shadow-md transition-all ${
                    i === 0 ? "aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto md:h-full min-h-[280px]" : "aspect-square"
                  }`}
                >
                  <SafeImage
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/30 transition-colors flex items-center justify-center pointer-events-none">
                    <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xl drop-shadow-md" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 text-2xl transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : (prev || 0) - 1));
            }}
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3 rounded-full bg-stone-900/60 hover:bg-stone-900 text-xl transition-colors cursor-pointer"
          >
            <FaChevronLeft />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <SafeImage
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : (prev || 0) + 1));
            }}
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3 rounded-full bg-stone-900/60 hover:bg-stone-900 text-xl transition-colors cursor-pointer"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      <CTABanner
        headline="Ready to scale your supply chain?"
        description="Contact our team to discuss customized import, export, or supply solutions."
      />
    </>
  );
}
