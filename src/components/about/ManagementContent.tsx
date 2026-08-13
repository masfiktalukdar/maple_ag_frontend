"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import CTABanner from "@/components/shared/CTABanner";
import RichTextRenderer from "@/components/shared/RichTextRenderer";
import { teamMembers } from "@/data/content";
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



function ManagementCard({ member, index }: { member: any; index: number }) {
  return (
    <FadeIn delay={index * 0.1}>
      <div className="group flex flex-col md:flex-row bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border-3 border-[#06551C] overflow-hidden items-stretch">
        {/* Left: Info */}
        <div className="p-4 md:p-6 flex-1 flex flex-col order-2 md:order-1 justify-between">
          <div>
            <h4 className="font-serif text-3xl font-semibold text-brand group-hover:text-gold transition-colors mb-1">
              {member.name}
            </h4>
            <p className="text-xs uppercase tracking-widest text-gold font-bold mb-5">
              {member.position || member.title}
            </p>

            <div className="mb-3">
              <RichTextRenderer
                content={member.description || member.bio}
                className="text-stone-700 leading-relaxed text-base text-justify"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-stone-100 mt-2">
            {member.email && (
              <a href={`mailto:${member.email}`} className="w-8 h-8 rounded-full bg-stone-100 cursor-pointer hover:bg-gold flex items-center justify-center text-brand hover:text-white transition-colors" aria-label={`Email ${member.name}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#0A66C2] flex items-center justify-center text-brand hover:text-white transition-colors" aria-label={`${member.name} LinkedIn`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            {member.whatsapp && (
              <a href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#25D366] flex items-center justify-center text-brand hover:text-white transition-colors" aria-label={`${member.name} WhatsApp`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            )}
            {member.twitter && (
              <a href={member.twitter.startsWith('http') ? member.twitter : `https://twitter.com/${member.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#1DA1F2] flex items-center justify-center text-brand hover:text-white transition-colors" aria-label={`${member.name} Twitter`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Right: Image */}
        <div className="order-1 md:order-2 w-full md:w-[320px] lg:w-[380px] shrink-0 min-h-[320px] md:min-h-full relative bg-stone-100 overflow-hidden">
          {member.imageUrl ? (
            <Image src={member.imageUrl} alt={member.name} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy/5 to-navy/10 group-hover:scale-105 transition-transform duration-700">
              <span className="font-serif text-8xl text-brand/15 font-bold uppercase">
                {member.name.split(" ").map((n: string) => n[0]).join("")}
              </span>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

export default function ManagementContent({ team = [] }: { team?: any[] }) {
  const displayTeam = team.length > 0 ? team : teamMembers;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image src={IMAGES.WAREHOUSE_INTERIOR} alt="Warehouse interior" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-brand/85" />
        </div>
        <div className="container-wide relative z-10 text-center">
          <FadeIn>
            <span className="eyebrow text-white block mb-4">EXECUTIVE TEAM</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-semibold mb-6 max-w-4xl mx-auto leading-tight">
              Leadership & Management
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Our executive team combines decades of experience in international trade, supply chain logistics, and global finance.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-[#F3F0EA]">
        <div className="container-wide">
          <div className="flex flex-col gap-3 md:gap-5">
            {displayTeam.map((member: any, i: number) => (
              <ManagementCard key={member._id || member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Connect With Our Leadership"
        description="Looking for strategic partnership opportunities? Our executive team is ready to talk."
      />
    </>
  );
}
