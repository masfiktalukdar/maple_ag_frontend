"use client";

import Link from "next/link";
import SafeImage from "@/components/shared/SafeImage";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onRequestQuote?: (product: Product) => void;
}

export default function ProductCard({ product, onRequestQuote }: ProductCardProps) {
  const imgSrc = product?.imageUrl || product?.image || "/images/placeholder.svg";

  const productType = (product.type || product.category || "").toLowerCase();
  let typeQuery = "";
  if (productType.includes("import")) typeQuery = "?type=import";
  else if (productType.includes("export")) typeQuery = "?type=export";
  else if (productType.includes("supply")) typeQuery = "?type=supply";

  const productUrl = product._id ? `/products/${product._id}${typeQuery}` : "#";

  const CardContent = (
    <div className="group flex flex-col bg-[#fdfaf6] border border-stone/20 overflow-hidden h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-stone/20 overflow-hidden">
        {imgSrc && (
          <SafeImage
            src={imgSrc}
            alt={product.name || "Product Image"}
            useNextImage={true}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
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
        <h3 className="font-serif text-xl text-brand font-semibold mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
          {product.description}
        </p>

        {/* CTA */}
        <div className="mt-auto">
          <span className="inline-flex items-center gap-2 text-[14px] font-medium text-gold hover:text-gold-dark transition-colors">
            View Details
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
    <Link href={productUrl} className="block h-full cursor-pointer outline-none focus:ring-2 focus:ring-gold/50 rounded-sm">
      {CardContent}
    </Link>
  );
}
