"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";
import { importProducts, type Product } from "@/data/products";
import SectionHeader from "@/components/shared/SectionHeader";
import CTABanner from "@/components/shared/CTABanner";
import ProductCard from "@/components/shared/ProductCard";
import Modal from "@/components/shared/Modal";
import SearchableDropdown from "@/components/shared/SearchableDropdown";
import { FaCogs, FaFlask, FaMicrochip, FaFirstAid, FaSeedling, FaBoxOpen, FaCube } from "react-icons/fa";

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

// Icon Mapping
const getIcon = (itemName: string) => {
  const name = itemName.toLowerCase();
  if (name.includes("machinery")) return <FaCogs size={20} />;
  if (name.includes("chemical") || name.includes("raw")) return <FaFlask size={20} />;
  if (name.includes("electronic")) return <FaMicrochip size={20} />;
  if (name.includes("medical")) return <FaFirstAid size={20} />;
  if (name.includes("agri")) return <FaSeedling size={20} />;
  if (name.includes("consumer") || name.includes("fmcg")) return <FaBoxOpen size={20} />;
  return <FaCube size={20} />;
};

export default function ImportServicePage() {
  const service = services.find(s => s.id === "import");
  
  // Category Filtering State
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const categories = useMemo(() => {
    const cats = new Set(importProducts.map(p => p.category));
    return ["All Categories", ...Array.from(cats)].sort();
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All Categories") return importProducts;
    return importProducts.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

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
  const [submitted, setSubmitted] = useState(false);

  const handleRequestQuote = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!service) return null;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image src={service.image} alt={service.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <div className="container-wide relative z-10 text-center">
          <FadeIn>
            <span className="eyebrow text-gold block mb-4">SERVICE: IMPORT</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-semibold mb-6 max-w-4xl mx-auto leading-tight">
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
            title="From Source to Destination"
            description="Our streamlined import process ensures quality, compliance, and timely delivery."
          />

          <div ref={timelineRef} className="relative mt-12">
            <div className="hidden md:grid grid-cols-4 gap-0 relative">
              <div className="absolute top-6 left-[12.5%] right-[12.5%] h-[2px] bg-stone">
                <motion.div
                  initial={{ width: 0 }}
                  animate={timelineInView ? { width: "100%" } : {}}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-terracotta"
                />
              </div>

              {service.process.map((step, i) => (
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

            <div className="md:hidden space-y-8 relative pl-8 mt-8">
              <div className="absolute left-[14px] top-0 bottom-0 w-[2px] bg-stone">
                <motion.div
                  initial={{ height: 0 }}
                  animate={timelineInView ? { height: "100%" } : {}}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="w-full bg-terracotta"
                />
              </div>
              {service.process.map((step, i) => (
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

      {/* What We Handle (Categories) */}
      <section className="section-padding bg-ivory">
        <div className="container-wide">
          <FadeIn>
            <SectionHeader
              eyebrow="WHAT WE HANDLE"
              title="Import Categories"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
              {service.items.map((item, i) => (
                <div key={item} className="flex flex-col items-center justify-center text-center p-6 bg-white border border-stone/30 rounded-sm hover:border-terracotta hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-full bg-warm-white flex items-center justify-center mb-4 text-terracotta group-hover:bg-terracotta group-hover:text-white transition-colors">
                    {getIcon(item)}
                  </div>
                  <span className="text-navy font-medium text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Products Display with Pagination */}
      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="eyebrow block mb-3">IMPORT CATALOG</span>
              <h2 className="font-serif text-3xl md:text-4xl text-navy font-semibold">
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
          
          <div className="min-h-[600px]">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-stone/30 rounded-sm">
                <p className="text-text-muted">No products found for this category.</p>
                <button 
                  onClick={() => setSelectedCategory("All Categories")}
                  className="mt-4 text-terracotta font-medium hover:underline"
                >
                  Clear Filter
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedProducts.map((product) => (
                    <motion.div
                      key={product.id}
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
                className="w-10 h-10 flex items-center justify-center border border-stone/40 rounded-sm text-navy disabled:opacity-30 hover:bg-stone/10 transition-colors"
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
                    className={`w-10 h-10 flex items-center justify-center rounded-sm font-medium transition-colors ${
                      currentPage === i + 1 
                        ? "bg-navy text-white" 
                        : "text-navy hover:bg-stone/10"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center border border-stone/40 rounded-sm text-navy disabled:opacity-30 hover:bg-stone/10 transition-colors"
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Request Quote: ${selectedProduct?.name}`}
      >
        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-navy mb-2">Request Received</h3>
            <p className="text-text-muted">
              Thank you for your interest in {selectedProduct?.name}. Our import specialists will contact you shortly.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 px-6 py-2 bg-navy text-white text-sm font-medium rounded-sm hover:bg-navy-light transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <p className="text-sm text-text-muted mb-6">
              Please provide the details below so we can assist with your import request for {selectedProduct?.name}.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-navy mb-1 uppercase tracking-wider">Company Name</label>
                <input required type="text" className="w-full bg-ivory border border-stone/40 px-4 py-2.5 rounded-sm focus:outline-none focus:border-terracotta" />
              </div>
              <div>
                <label className="block text-xs font-medium text-navy mb-1 uppercase tracking-wider">Contact Person</label>
                <input required type="text" className="w-full bg-ivory border border-stone/40 px-4 py-2.5 rounded-sm focus:outline-none focus:border-terracotta" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-navy mb-1 uppercase tracking-wider">Email Address</label>
                <input required type="email" className="w-full bg-ivory border border-stone/40 px-4 py-2.5 rounded-sm focus:outline-none focus:border-terracotta" />
              </div>
              <div>
                <label className="block text-xs font-medium text-navy mb-1 uppercase tracking-wider">Phone Number</label>
                <input required type="tel" className="w-full bg-ivory border border-stone/40 px-4 py-2.5 rounded-sm focus:outline-none focus:border-terracotta" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-navy mb-1 uppercase tracking-wider">Target Port of Destination</label>
                <input required type="text" placeholder="e.g., Chattogram, Bangladesh" className="w-full bg-ivory border border-stone/40 px-4 py-2.5 rounded-sm focus:outline-none focus:border-terracotta" />
              </div>
              <div>
                <label className="block text-xs font-medium text-navy mb-1 uppercase tracking-wider">Est. Annual Volume (Tons/Containers)</label>
                <input required type="text" className="w-full bg-ivory border border-stone/40 px-4 py-2.5 rounded-sm focus:outline-none focus:border-terracotta" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-navy mb-1 uppercase tracking-wider">Specific Requirements & Certifications</label>
              <textarea rows={3} className="w-full bg-ivory border border-stone/40 px-4 py-2.5 rounded-sm focus:outline-none focus:border-terracotta resize-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold uppercase tracking-wider py-3.5 rounded-sm transition-colors mt-6">
              Submit Request
            </button>
          </form>
        )}
      </Modal>

      <CTABanner
        headline="Source Without Borders"
        description="Let our import experts handle the logistics, compliance, and delivery of your raw materials."
        buttonText="Discuss Your Needs"
      />
    </>
  );
}
