"use client";

import { clientLogos } from "@/data/content";

export default function LogoMarquee({ clients = [] }: { clients?: any[] }) {
  // Use dynamic clients if provided and not empty, otherwise fallback to static data
  const dataToUse = clients.length > 0 ? clients : clientLogos;

  // We repeat the logos to ensure the container is wider than any screen,
  // allowing a seamless, infinite loop.
  const repeatedLogos = Array(10).fill(dataToUse).flat();
  
  return (
    <div className="overflow-hidden w-full relative py-4 group flex">
      <div className="flex w-max animate-marquee items-center">
        <style jsx>{`
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          .group:hover .animate-marquee,
          .animate-marquee:hover {
            animation-play-state: paused !important;
          }
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        {repeatedLogos.map((logo, i) => (
          <div
            key={`${logo._id || logo.id}-${i}`}
            className="flex-shrink-0 px-5 sm:px-8 md:px-12 flex items-center justify-center w-[180px] sm:w-[240px] md:w-[340px]"
          >
            {logo.imageUrl ? (
              <img 
                src={logo.imageUrl} 
                alt={logo.name} 
                className="h-16 sm:h-24 md:h-32 max-h-36 w-auto object-contain transition-transform duration-300 hover:scale-110 drop-shadow-sm"
              />
            ) : (
              <div className="flex items-center justify-center h-16 px-8 border border-stone-200 rounded-md w-full bg-white shadow-sm">
                <span className="text-base font-bold tracking-wide text-brand whitespace-nowrap">
                  {logo.name}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
