"use client";

import { clientLogos } from "@/data/content";

export default function LogoMarquee() {
  // Double the logos for seamless infinite scroll
  const doubled = [...clientLogos, ...clientLogos];

  return (
    <div className="overflow-hidden">
      <div className="flex animate-marquee">
        {doubled.map((logo, i) => (
          <div
            key={`${logo.id}-${i}`}
            className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
          >
            <div className="logo-grayscale flex items-center justify-center h-12 px-6 border border-stone/40 rounded-sm">
              <span className="text-sm font-semibold tracking-wide text-navy/60 whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
