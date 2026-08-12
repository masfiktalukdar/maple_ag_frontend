"use client";

import { useState } from "react";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import QuoteModal from "@/components/shared/QuoteModal";
import RichTextRenderer from "@/components/shared/RichTextRenderer";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface ProductDetailsContentProps {
  product: any;
}

export default function ProductDetailsContent({ product }: ProductDetailsContentProps) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-24 text-center">
        <h1 className="text-3xl text-brand font-serif font-bold">Product Not Found</h1>
        <Link href="/services" className="mt-4 inline-block text-gold hover:underline">
          Return to Services
        </Link>
      </div>
    );
  }

  const getInquiryType = (type: string) => {
    switch (type) {
      case "import": return "Import Inquiry";
      case "export": return "Export Inquiry";
      case "supply": return "Supply Inquiry";
      default: return "General Inquiry";
    }
  };

  const specificDetails = product.type === "import"
    ? product.importDetails
    : product.type === "export"
      ? product.exportDetails
      : product.type === "supply"
        ? product.supplyDetails
        : null;

  // Filter out empty values from details for display
  const displayDetails = specificDetails
    ? Object.entries(specificDetails).filter(([key, val]) => {
      if (!val || key === '_id') return false;
      if (key === "specifications" || key === "monthlySupplyCapacity") return false;
      return true;
    })
    : [];

  return (
    <>
      <div className="bg-warm-white min-h-screen pt-24 pb-8">
        <div className="container-wide">
          {/* Breadcrumb */}
          <Link
            href={product?.type ? `/services/${product.type}` : "/services"}
            className="inline-flex items-center gap-2 text-stone-500 hover:text-brand mb-3 transition-colors text-xs font-semibold"
          >
            <FaArrowLeft /> Back to {product?.type ? product.type.charAt(0).toUpperCase() + product.type.slice(1) + " Products" : "Products"}
          </Link>

          <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            {/* Product Image Gallery */}
            <div className="w-full md:w-1/2 lg:w-1/2 p-3 md:p-4 flex flex-col justify-start bg-stone-50/40 border-b md:border-b-0 md:border-r border-stone-200/60">
              <ProductImageGallery
                mainImageUrl={product.imageUrl}
                images={product.images}
                productName={product.name}
                productType={product.type}
                isFeatured={product.featured}
              />
            </div>

            {/* Product Info */}
            <div className="w-full md:w-1/2 lg:w-1/2 p-4 md:p-6 flex flex-col">
              <span className="text-xs font-bold text-gold-dark uppercase tracking-wider mb-0.5 block">
                {product.category}
              </span>
              <h1 className="font-serif text-xl md:text-2xl text-brand font-semibold mb-2">
                {product.name}
              </h1>
              <div className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-2 flex-1">
                <RichTextRenderer content={product.description} />
                
                {product.type === "import" && product.importDetails?.specifications && (
                  <div className="mt-4">
                    <strong className="font-bold text-brand block mb-1">Specifications:</strong> 
                    <RichTextRenderer content={product.importDetails.specifications} />
                  </div>
                )}
                {product.type === "export" && product.exportDetails?.specifications && (
                  <div className="mt-4">
                    <strong className="font-bold text-brand block mb-1">Specifications:</strong> 
                    <RichTextRenderer content={product.exportDetails.specifications} />
                  </div>
                )}
                {product.type === "supply" && product.supplyDetails?.specifications && (
                  <div className="mt-4">
                    <strong className="font-bold text-brand block mb-1">Specifications:</strong> 
                    <RichTextRenderer content={product.supplyDetails.specifications} />
                  </div>
                )}
              </div>

              {/* Dynamic Specifications Table */}
              {displayDetails.length > 0 && (
                <div className="mb-4 mt-1">
                  <h3 className="font-serif text-base text-brand font-semibold mb-2 border-b border-stone-200 pb-1">
                    {product.type === "import" ? "What We Source" : (product.type === "export" || product.type === "supply") ? "What We Provide" : "Specifications"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                    {displayDetails.map(([key, val]) => {
                      let formattedKey = key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase());
                        
                      if ((product.type === "export" || product.type === "supply") && key === "minOrderQuantity") {
                        formattedKey = "MOQ";
                      }

                      return (
                        <div key={key} className="flex flex-col">
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                            {formattedKey}
                          </span>
                          <span className="text-xs font-medium text-stone-800 mt-0.5">
                            {String(val)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Origin / Destination */}
              {product.origin && (
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    {product.type === "import" ? "Destination:" : "Origin:"}
                  </span>
                  <span className="text-xs font-semibold text-brand">
                    {product.origin}
                  </span>
                </div>
              )}

              {/* Product CTA */}
              <div className="mt-auto pt-4 border-t border-stone-100">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="bg-brand hover:bg-gold text-white px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
                >
                  {product.type === "import" ? "Submit an Enquiry" : "Get a Quote"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={product}
        defaultInquiryType={getInquiryType(product.type)}
      />
    </>
  );
}
