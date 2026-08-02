"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { companyInfo } from "@/data/siteData";
import SectionHeader from "@/components/shared/SectionHeader";
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

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

function ContactContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const product = searchParams.get("product");
    if (product) {
      setFormData((prev) => ({ ...prev, product }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative pt-32 pb-24 min-h-[400px] flex items-center bg-navy text-white">
        <div className="absolute inset-0">
          <Image src="/images/global-trade-3.jpg" alt="Contact Us" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <div className="container-wide relative z-10">
          <SectionHeader
            eyebrow="CONTACT US"
            title="Let's Start a Conversation"
            description="Whether you're looking to source products from Bangladesh, import goods, or explore a supply chain partnership — we are ready to assist you."
            light
            centered={false}
          />
        </div>
      </section>

      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Form Column */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="bg-white p-8 md:p-12 border border-stone/30 shadow-sm rounded-sm h-full">
                  <h3 className="font-serif text-2xl font-semibold text-navy mb-8">Send an Inquiry</h3>
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto rounded-full bg-terracotta/10 flex items-center justify-center mb-6">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C1502E" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h4 className="font-serif text-xl font-semibold text-navy mb-3">
                        Message Received
                      </h4>
                      <p className="text-text-muted mb-6">
                        Thank you for reaching out. A representative will contact you within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: "", company: "", email: "", phone: "", product: "", message: "" });
                        }}
                        className="text-terracotta text-sm font-semibold uppercase tracking-wider hover:text-navy transition-colors"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">Full Name *</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-stone/40 py-2 text-navy focus:border-terracotta focus:outline-none transition-colors"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">Company</label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-stone/40 py-2 text-navy focus:border-terracotta focus:outline-none transition-colors"
                            placeholder="Your Company Ltd."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">Email Address *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-stone/40 py-2 text-navy focus:border-terracotta focus:outline-none transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-stone/40 py-2 text-navy focus:border-terracotta focus:outline-none transition-colors"
                            placeholder="+1 234 567 890"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="product" className="block text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">Product of Interest</label>
                        <input
                          type="text"
                          id="product"
                          name="product"
                          value={formData.product}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-stone/40 py-2 text-navy focus:border-terracotta focus:outline-none transition-colors"
                          placeholder="e.g. Raw Jute, Men's T-Shirts"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-stone/40 py-2 text-navy focus:border-terracotta focus:outline-none transition-colors resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full md:w-auto px-10 py-4 bg-navy text-white text-sm font-semibold uppercase tracking-wider rounded-sm hover:bg-terracotta transition-colors shadow-sm"
                      >
                        Submit Inquiry
                      </button>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* Contact Info Column */}
            <div className="lg:col-span-5">
              <FadeIn delay={0.2} className="h-full flex flex-col justify-between space-y-8">

                {/* Contact Details */}
                <div className="bg-ivory p-8 border border-stone/30 shadow-sm rounded-sm">
                  <h4 className="font-serif text-xl font-semibold text-navy mb-6">Contact Information</h4>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-1">Corporate Office</p>
                      <p className="text-navy leading-relaxed">{companyInfo.address}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-1">Port Office</p>
                      <p className="text-navy leading-relaxed">Agrabad Commercial Area<br />Chattogram 4100, Bangladesh</p>
                    </div>
                    <div className="pt-4 border-t border-stone/30">
                      <p className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-1">Direct Lines</p>
                      <p className="text-navy">{companyInfo.phone}</p>
                      <p className="text-navy">{companyInfo.email}</p>
                    </div>
                  </div>
                </div>

                {/* Get in Touch Socials */}
                <div className="bg-navy p-8 rounded-sm shadow-md text-white">
                  <h4 className="font-serif text-xl font-semibold mb-6">Connect With Us</h4>
                  <p className="text-white/70 mb-6 text-sm leading-relaxed">
                    Stay updated with our latest shipments, market insights, and corporate news through our social channels.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="w-8 h-8 bg-white/10 hover:bg-[#1877F2] rounded-full flex items-center justify-center transition-colors duration-300 group" aria-label="Facebook">
                      <FaFacebookF className="text-xl text-white group-hover:text-white" />
                    </a>
                    <a href="#" className="w-8 h-8 bg-white/10 hover:bg-[#FF0000] rounded-full flex items-center justify-center transition-colors duration-300 group" aria-label="YouTube">
                      <FaYoutube className="text-xl text-white group-hover:text-white" />
                    </a>
                    <a href="#" className="w-8 h-8 bg-white/10 hover:bg-[#0A66C2] rounded-full flex items-center justify-center transition-colors duration-300 group" aria-label="LinkedIn">
                      <FaLinkedinIn className="text-xl text-white group-hover:text-white" />
                    </a>
                    <a href="#" className="w-8 h-8 bg-white/10 hover:bg-[#25D366] rounded-full flex items-center justify-center transition-colors duration-300 group" aria-label="WhatsApp">
                      <FaWhatsapp className="text-xl text-white group-hover:text-white" />
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="pt-32 container-wide">Loading...</div>}>
      <ContactContent />
    </Suspense>
  );
}
