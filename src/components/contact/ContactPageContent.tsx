"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { companyInfo as fallbackCompanyInfo } from "@/data/siteData";
import SectionHeader from "@/components/shared/SectionHeader";
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { fetchApi, formatExternalUrl } from "@/lib/api";
import { z } from "zod";

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

const contactSchema = z.object({
  name: z.string().min(2, "Name is required (min 2 chars)"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  product: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const [contactData, setContactData] = useState<any>(null);

  const loadContactData = async () => {
    try {
      const res = await fetchApi("/contact");
      if (res.data) {
        setContactData(res.data);
      }
    } catch (error) {
      console.error("Failed to load contact data:", error);
    }
  };

  useEffect(() => {
    const product = searchParams.get("product");
    if (product) {
      setFormData((prev) => ({ ...prev, product }));
    }
    loadContactData();
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError("");

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: formData.product ? 'quote' : 'general'
        }),
      });

      if (!response.ok) throw new Error("Failed to submit inquiry");
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setApiError("There was a problem submitting your inquiry. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const headOffice = contactData?.offices?.headOffice?.address || fallbackCompanyInfo.address;
  const corpOffice = contactData?.offices?.corporateOffice?.address;
  const portOffice = contactData?.offices?.portOffice?.address;
  const phones = contactData?.contactDetails?.phones?.length ? contactData.contactDetails.phones : [fallbackCompanyInfo.phone];
  const emails = contactData?.contactDetails?.emails?.length ? contactData.contactDetails.emails : [fallbackCompanyInfo.email];
  const facebookUrl = formatExternalUrl(contactData?.socialMedia?.facebook);
  const youtubeUrl = formatExternalUrl(contactData?.socialMedia?.youtube);
  const linkedinUrl = formatExternalUrl(contactData?.socialMedia?.linkedin);
  const whatsappUrl = formatExternalUrl(contactData?.socialMedia?.whatsapp);

  return (
    <>
      <section className="relative pt-32 pb-24 min-h-[400px] flex items-center bg-brand text-white">
        <div className="absolute inset-0">
          <Image src="/images/hero-port.png" alt="Contact Us" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-brand/80" />
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
                  <h3 className="font-serif text-2xl font-semibold text-brand mb-8">Send an Inquiry</h3>
                  {apiError && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 text-sm rounded-sm">
                      {apiError}
                    </div>
                  )}
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-6">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06551C" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h4 className="font-serif text-xl font-semibold text-brand mb-3">
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
                        className="text-gold text-sm font-semibold uppercase tracking-wider cursor-pointer hover:text-brand transition-colors"
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
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full bg-transparent border-b py-2 text-brand focus:border-gold focus:outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-stone/40'}`}
                            placeholder="John Doe"
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">Company</label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-stone/40 py-2 text-brand focus:border-gold focus:outline-none transition-colors"
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
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full bg-transparent border-b py-2 text-brand focus:border-gold focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-stone/40'}`}
                            placeholder="john@example.com"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-stone/40 py-2 text-brand focus:border-gold focus:outline-none transition-colors"
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
                          className="w-full bg-transparent border-b border-stone/40 py-2 text-brand focus:border-gold focus:outline-none transition-colors"
                          placeholder="e.g. Raw Jute, Men's T-Shirts"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className={`w-full bg-transparent border-b py-2 text-brand focus:border-gold focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-stone/40'}`}
                          placeholder="How can we help you?"
                        />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-10 py-4 bg-brand text-white text-sm font-semibold uppercase tracking-wider rounded-sm cursor-pointer hover:bg-gold transition-colors shadow-sm disabled:opacity-50"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
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
                  <h4 className="font-serif text-xl font-semibold text-brand mb-6">Contact Information</h4>
                  <div className="space-y-6">
                    {headOffice && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-1">{contactData?.offices?.headOffice?.name || "Head Office"}</p>
                        <p className="text-brand leading-relaxed whitespace-pre-line">{headOffice}</p>
                      </div>
                    )}
                    {corpOffice && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-1">{contactData?.offices?.corporateOffice?.name || "Corporate Office"}</p>
                        <p className="text-brand leading-relaxed whitespace-pre-line">{corpOffice}</p>
                      </div>
                    )}
                    {portOffice && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-1">{contactData?.offices?.portOffice?.name || "Port Office"}</p>
                        <p className="text-brand leading-relaxed whitespace-pre-line">{portOffice}</p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-stone/30">
                      <p className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-1">{contactData?.contactDetails?.directLinesTitle || "Direct Lines"}</p>
                      {phones.map((p: string, i: number) => (
                        <p key={`phone-${i}`} className="text-brand">{p}</p>
                      ))}
                      <div className="mt-2">
                        {emails.map((em: string, i: number) => (
                          <p key={`email-${i}`} className="text-brand">{em}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Get in Touch Socials */}
                <div className="bg-brand p-8 rounded-sm shadow-md text-white">
                  <h4 className="font-serif text-xl font-semibold mb-6">Connect With Us</h4>
                  <p className="text-white/70 mb-6 text-sm leading-relaxed">
                    Stay updated with our latest shipments, market insights, and corporate news through our social channels.
                  </p>
                  <div className="flex gap-3">
                    <a href={facebookUrl} className="w-8 h-8 rounded-full aspect-square shrink-0 bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 group shadow-sm hover:scale-105" aria-label="Facebook">
                      <FaFacebookF className="text-lg text-white group-hover:text-white" />
                    </a>
                    <a href={youtubeUrl} className="w-8 h-8 rounded-full aspect-square shrink-0 bg-white/10 hover:bg-[#FF0000] flex items-center justify-center transition-all duration-300 group shadow-sm hover:scale-105" aria-label="YouTube">
                      <FaYoutube className="text-lg text-white group-hover:text-white" />
                    </a>
                    <a href={linkedinUrl} className="w-8 h-8 rounded-full aspect-square shrink-0 bg-white/10 hover:bg-[#0A66C2] flex items-center justify-center transition-all duration-300 group shadow-sm hover:scale-105" aria-label="LinkedIn">
                      <FaLinkedinIn className="text-lg text-white group-hover:text-white" />
                    </a>
                    <a href={whatsappUrl} className="w-8 h-8 rounded-full aspect-square shrink-0 bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-all duration-300 group shadow-sm hover:scale-105" aria-label="WhatsApp">
                      <FaWhatsapp className="text-lg text-white group-hover:text-white" />
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

export default function ContactPageContent() {
  return (
    <Suspense fallback={<div className="pt-32 container-wide flex justify-center py-20"><div className="w-8 h-8 border-4 border-stone-200 border-t-brand rounded-full animate-spin"></div></div>}>
      <ContactContent />
    </Suspense>
  );
}
