"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";
import type { Product } from "@/data/products";
import SectionHeader from "@/components/shared/SectionHeader";
import CTABanner from "@/components/shared/CTABanner";
import ProductCard from "@/components/shared/ProductCard";
import QuoteModal from "@/components/shared/QuoteModal";
import SearchableDropdown from "@/components/shared/SearchableDropdown";
import LogoMarquee from "@/components/shared/LogoMarquee";
import { FaBoxOpen, FaTruck, FaWarehouse, FaCubes, FaIndustry, FaClipboardList, FaGlobe } from "react-icons/fa";
import CategoryNetworkSection, { INetworkCategory } from "@/components/network/CategoryNetworkSection";

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

// Icon Mapping for Supply Categories
const getIcon = (itemName: string) => {
  const name = itemName.toLowerCase();
  if (name.includes("packaging")) return <FaBoxOpen size={20} />;
  if (name.includes("logistics") || name.includes("transport")) return <FaTruck size={20} />;
  if (name.includes("warehouse") || name.includes("storage")) return <FaWarehouse size={20} />;
  if (name.includes("material")) return <FaCubes size={20} />;
  if (name.includes("equipment")) return <FaIndustry size={20} />;
  if (name.includes("management")) return <FaClipboardList size={20} />;
  return <FaGlobe size={20} />;
};

import SafeImage from "@/components/shared/SafeImage";

interface SupplyPageContentProps {
  products: any[];
  networkCategory?: INetworkCategory;
  partners?: any[];
  categoryItems?: any[];
}

export default function SupplyPageContent({ products: supplyProducts, networkCategory, partners = [], categoryItems = [] }: SupplyPageContentProps) {
  const service = services.find(s => s.id === "supply");

  // Category Filtering State
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const categories = useMemo(() => {
    if (categoryItems && categoryItems.length > 0) {
      const cats = new Set(categoryItems.map((c: any) => c.name || c.title));
      return ["All Categories", ...Array.from(cats)].sort() as string[];
    }
    const cats = new Set(supplyProducts.map(p => p.category));
    return ["All Categories", ...Array.from(cats)].sort() as string[];
  }, [supplyProducts, categoryItems]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All Categories") return supplyProducts;
    return supplyProducts.filter(p => p.category === selectedCategory);
  }, [selectedCategory, supplyProducts]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Timeline animation
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleRequestQuote = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (!service) return null;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 min-h-[350px] sm:min-h-[400px] md:min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image src={service.image} alt={service.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-brand/80" />
        </div>
        <div className="container-wide relative z-10 text-center">
          <FadeIn>
            <span className="eyebrow text-white block mb-4">SERVICE: SUPPLY & DISTRIBUTION</span>
            <h1 className="font-serif text-white font-semibold mb-4 sm:mb-6 max-w-4xl mx-auto leading-tight" style={{ fontSize: 'clamp(2rem, 3vw + 0.75rem, 3.75rem)' }}>
              {service.headline}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              {service.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <SectionHeader
            eyebrow="HOW WE WORK"
            title="End-to-End Solutions"
            description="Our integrated supply chain management optimizes the flow of goods from start to finish."
          />

          <div ref={timelineRef} className="relative mt-12">
            <div className="hidden md:grid grid-cols-4 gap-0 relative">
              <div className="absolute top-6 left-[12.5%] right-[12.5%] h-[2px] bg-stone">
                <motion.div
                  initial={{ width: 0 }}
                  animate={timelineInView ? { width: "100%" } : {}}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gold"
                />
              </div>

              {service.process.map((step, i) => (
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

            <div className="md:hidden space-y-8 relative pl-8 mt-8">
              <div className="absolute left-[14px] top-0 bottom-0 w-[2px] bg-stone">
                <motion.div
                  initial={{ height: 0 }}
                  animate={timelineInView ? { height: "100%" } : {}}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="w-full bg-gold"
                />
              </div>
              {service.process.map((step, i) => (
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

      {/* Network Category Section */}
      {networkCategory && (
        <section className="section-padding bg-ivory pb-0">
          <div className="container-wide">
            <SectionHeader
              eyebrow="GLOBAL REACH"
              title="Supply Network & Logistics"
            />
            <CategoryNetworkSection category={networkCategory} />
          </div>
        </section>
      )}

      {/* What We Handle (Categories) */}
      {categoryItems.length > 0 && (
      <section className="section-padding bg-ivory">
        <div className="container-wide">
          <FadeIn>
            <SectionHeader
              eyebrow="WHAT WE HANDLE"
              title="Supply Chain Services"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 max-w-5xl mx-auto">
              {categoryItems.map((item: any, i: number) => (
                <div
                  key={item._id || i}
                  onClick={() => {
                    setSelectedCategory(item.name || item.title);
                    setCurrentPage(1);
                    document.getElementById('product-catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#fdfaf6] border border-stone-300/80 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-gold transition-all duration-300 group flex flex-col cursor-pointer"
                >
                  <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                    <SafeImage
                      src={item.imageUrl}
                      alt={item.name || item.title || "Category"}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="py-3 px-3 text-center bg-white border-t border-stone-200/60 flex-1 flex items-center justify-center">
                    <h4 className="font-serif text-sm sm:text-base font-semibold text-brand group-hover:text-gold transition-colors duration-200 leading-snug">
                      {item.name || item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
      )}

      {/* Partners / Where we supply */}
      {partners && partners.length > 0 && (
        <section className="section-padding bg-warm-white border-t border-b border-stone-light group">
          <div className="container-wide">
            <SectionHeader
              eyebrow="DISTRIBUTION & LOGISTICS"
              title="Where We Supply"
            />
          </div>
          <LogoMarquee clients={partners} />
        </section>
      )}

      {/* Products Display with Pagination */}
      <section id="product-catalog" className="section-padding bg-warm-white">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="eyebrow block mb-3">SUPPLY CATALOG</span>
              <h2 className="font-serif text-brand font-semibold" style={{ fontSize: 'clamp(1.625rem, 2vw + 0.75rem, 2.25rem)' }}>
                All Commodities
              </h2>
            </div>

            <div className="w-full md:w-72">
              <SearchableDropdown
                options={categories}
                value={selectedCategory}
                onChange={(val) => {
                  setSelectedCategory(val);
                  setCurrentPage(1); // Reset to first page on category change
                }}
                placeholder="Filter by Category"
              />
            </div>
          </div>

          <div className="min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-stone/30 rounded-sm">
                <p className="text-text-muted">No products found for this category.</p>
                <button
                  onClick={() => setSelectedCategory("All Categories")}
                  className="mt-4 text-gold font-medium hover:underline"
                >
                  Clear Filter
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedProducts.map((product: any, i: number) => (
                    <motion.div
                      key={product._id || product.id || i}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard
                        product={product}
                        onRequestQuote={handleRequestQuote}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center border border-stone/40 rounded-sm text-brand disabled:opacity-30 hover:bg-stone/10 transition-colors"
                aria-label="Previous Page"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-sm font-medium transition-colors ${currentPage === i + 1
                      ? "bg-brand text-white"
                      : "text-brand hover:bg-stone/10"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center border border-stone/40 rounded-sm text-brand disabled:opacity-30 hover:bg-stone/10 transition-colors"
                aria-label="Next Page"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quote Modal */}
      {isModalOpen && selectedProduct && (
        <QuoteModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <CTABanner
        headline="Reliable Supply Network"
        description="We ensure your raw materials and goods arrive safely, consistently, and exactly when you need them."
        buttonText="Discuss Your Needs"
      />
    </>
  );
}
