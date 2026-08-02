"use client";

import Image from "next/image";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onRequestQuote?: (product: Product) => void;
}

export default function ProductCard({ product, onRequestQuote }: ProductCardProps) {
  const CardContent = (
    <div className="group flex flex-col bg-[#fdfaf6] border border-stone/20 overflow-hidden h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-stone/20 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Container */}
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        {/* Category Pill */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-[#f0ede5] text-stone-dark text-[10px] font-semibold uppercase tracking-widest rounded-sm">
            {product.category}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="font-serif text-xl text-navy font-semibold mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
          {product.description}
        </p>

        {/* CTA */}
        <div className="mt-auto">
          <span className="inline-flex items-center gap-2 text-[14px] font-medium text-terracotta hover:text-terracotta-dark transition-colors">
            Request a Quote
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="block h-full cursor-pointer" 
      onClick={() => onRequestQuote && onRequestQuote(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onRequestQuote && onRequestQuote(product);
        }
      }}
    >
      {CardContent}
    </div>
  );
}
