"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface IMarker {
  _id?: string;
  name: string;
  type: string;
  description: string;
  topProducts: string;
}

export interface ICountry {
  _id?: string;
  name: string;
  keyProducts?: string;
  region?: string;
  markers: IMarker[];
}

export interface INetworkCategory {
  _id?: string;
  name: string;
  mapImage: string;
  countries: ICountry[];
}

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

export default function CategoryNetworkSection({
  category,
  showMap = false,
}: {
  category: INetworkCategory;
  showMap?: boolean;
}) {
  if (!category) return null;

  const keyProductsLabel = category.name === "Import" ? "Key Imports" : category.name === "Export" ? "Key Exports" : "Key Products";

  return (
    <div className="mb-16 last:mb-0">
      {showMap && (
        <FadeIn>
          <div className="mb-10 flex justify-center">
            {category.mapImage ? (
              <div className="relative w-full rounded-md overflow-hidden bg-stone-50 border border-stone-200/60 p-2 flex justify-center">
                <Image 
                  src={category.mapImage} 
                  alt={`${category.name} Map`} 
                  width={1200}
                  height={675}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  quality={85}
                  className="w-full h-auto object-contain block max-h-[550px]"
                />
              </div>
            ) : (
              <div className="w-full aspect-[21/9] bg-stone-100 flex items-center justify-center rounded-md border border-stone-200">
                <span className="text-stone-400 uppercase tracking-widest text-sm font-bold">No Map Uploaded</span>
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {category.countries && category.countries.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {category.countries.map((country, i) => (
            <FadeIn key={country._id || i} delay={i * 0.08}>
              <div className="bg-white border border-stone-200 rounded-sm p-5 hover:border-gold/50 hover:shadow-md transition-all duration-300 h-full flex flex-col shadow-sm">
                <div className="flex items-baseline justify-between mb-3 border-b border-stone-100 pb-2.5">
                  <h4 className="font-serif text-lg text-brand font-semibold">
                    {country.name}
                  </h4>
                  {country.region && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-accent ml-2 shrink-0 bg-stone-100 px-2 py-0.5 rounded">
                      {country.region}
                    </span>
                  )}
                </div>
                
                {country.keyProducts && (
                  <div className="mb-4 flex-grow">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-1">
                      {keyProductsLabel}
                    </span>
                    <p className="text-sm text-stone-600 leading-relaxed font-medium">
                      {country.keyProducts}
                    </p>
                  </div>
                )}

                {country.markers && country.markers.length > 0 && (
                  <div className="mt-auto space-y-2 pt-3 border-t border-stone-100">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-2">Locations & Hubs</span>
                    {country.markers.map((marker, idx) => (
                      <div key={marker._id || idx} className="bg-stone-50 p-2.5 rounded text-sm border border-stone-100">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-brand text-xs">{marker.name}</span>
                          <span className="text-[9px] bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{marker.type}</span>
                        </div>
                        {marker.description && <p className="text-xs text-stone-500 mb-1">{marker.description}</p>}
                        {marker.topProducts && (
                          <p className="text-[10px] text-stone-400"><span className="font-semibold text-stone-500">Key Products:</span> {marker.topProducts}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
