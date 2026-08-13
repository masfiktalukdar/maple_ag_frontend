"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CTABanner from "@/components/shared/CTABanner";
import { IMAGES } from "@/constants/images";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface GalleryPhoto {
  _id: string;
  imageUrl: string;
  caption?: string;
  order: number;
}

interface GallerySettings {
  heading?: string;
  subheading?: string;
}

interface Props {
  photos: GalleryPhoto[];
  settings: GallerySettings | null;
}

const PHOTOS_PER_PAGE = 20;

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function GalleryPageContent({ photos, settings }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const heading = settings?.heading || "Our Company Gallery";
  const subheading = settings?.subheading || "A visual journey through our operations, facilities, and global partnerships.";

  const totalPages = Math.ceil(photos.length / PHOTOS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
  const paginatedPhotos = photos.slice(startIndex, startIndex + PHOTOS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 min-h-[350px] sm:min-h-[400px] md:min-h-[420px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.WAREHOUSE_INTERIOR}
            alt="Company operations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand/90 via-brand/80 to-brand/75" />
        </div>
        <div className="container-wide relative z-10 text-center">
          <FadeIn>
            <span className="eyebrow text-white block mb-4">COMPANY GALLERY</span>
            <h1 className="font-serif text-white font-semibold mb-4 sm:mb-6 max-w-4xl mx-auto leading-tight" style={{ fontSize: 'clamp(2rem, 3vw + 0.75rem, 3.75rem)' }}>
              {heading}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              {subheading}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="bg-[#F8F6F2] min-h-[400px] sm:min-h-[550px] md:min-h-[650px] py-16 md:py-24">
        <div className="container-wide">
          {photos.length === 0 ? (
            <FadeIn>
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-stone-500 text-lg font-medium">Gallery photos coming soon.</p>
                <p className="text-stone-400 text-sm mt-2">Check back later to see our latest operations and facilities.</p>
              </div>
            </FadeIn>
          ) : (
            <>
              {/* Header / Stats count bar */}
              <FadeIn>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-stone-200" />
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-widest px-3">
                    {photos.length} Photo{photos.length !== 1 ? "s" : ""}
                  </span>
                  <div className="h-px flex-1 bg-stone-200" />
                </div>
              </FadeIn>

              {/* Uniform Grid with Cards matching screenshot design */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {paginatedPhotos.map((photo, i) => (
                  <motion.div
                    key={photo._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                    className="group flex flex-col bg-white rounded-md shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/70 overflow-hidden"
                  >
                    {/* Image Container with 4:3 Ratio */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                      <Image
                        src={photo.imageUrl}
                        alt={photo.caption || `Gallery photo ${startIndex + i + 1}`}
                        fill
                        unoptimized
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading={i < 4 ? "eager" : "lazy"}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>

                    {/* Centered Green Bold Serif Label Box Below Image */}
                    {photo.caption ? (
                      <div className="p-2 bg-white text-center flex items-center justify-center min-h-[42px] border-t border-stone-100">
                        <h3 className="font-serif font-bold text-brand text-sm sm:text-base leading-snug tracking-tight">
                          {photo.caption}
                        </h3>
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200/80 pt-8 mt-12">
                  <p className="text-xs font-medium text-stone-500">
                    Showing <span className="font-bold text-brand">{startIndex + 1}</span> to{" "}
                    <span className="font-bold text-brand">
                      {Math.min(startIndex + PHOTOS_PER_PAGE, photos.length)}
                    </span>{" "}
                    of <span className="font-bold text-brand">{photos.length}</span> photos
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 text-xs font-bold rounded bg-white text-stone-700 border border-stone-300 hover:border-brand hover:text-brand disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <FaChevronLeft size={10} /> Prev
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-8 h-8 text-xs font-bold rounded transition-all cursor-pointer ${currentPage === pageNum
                            ? "bg-brand text-white shadow-sm"
                            : "bg-white text-stone-600 border border-stone-200 hover:border-brand hover:text-brand"
                            }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 text-xs font-bold rounded bg-white text-stone-700 border border-stone-300 hover:border-brand hover:text-brand disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
                    >
                      Next <FaChevronRight size={10} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        headline="Ready to scale your supply chain?"
        description="Contact our team to discuss customized import, export, or supply solutions."
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </>
  );
}
