"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { navLinks, companyInfo as fallbackCompanyInfo } from "@/data/siteData";
import { fetchApi, formatExternalUrl } from "@/lib/api";
import { useGlobalSettings } from "@/context/GlobalSettingsContext";

export default function Footer() {
  const [contactData, setContactData] = useState<any>(null);
  const { companyName } = useGlobalSettings();

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
    loadContactData();
  }, []);

  const address = contactData?.offices?.headOffice?.address || fallbackCompanyInfo.address;
  const phone = contactData?.contactDetails?.phones?.[0] || fallbackCompanyInfo.phone;
  const email = contactData?.contactDetails?.emails?.[0] || fallbackCompanyInfo.email;
  const facebookUrl = formatExternalUrl(contactData?.socialMedia?.facebook || "https://facebook.com");
  const youtubeUrl = formatExternalUrl(contactData?.socialMedia?.youtube || "https://youtube.com");
  const linkedinUrl = formatExternalUrl(contactData?.socialMedia?.linkedin || "https://linkedin.com");
  const whatsappUrl = formatExternalUrl(contactData?.socialMedia?.whatsapp || "https://wa.me/");

  return (
    <footer className="bg-ivory border-t border-stone-200 text-charcoal">
      {/* Main Footer Grid */}
      <div className="container-wide py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">

          {/* Column 1: Company Info */}
          <div className="lg:col-span-4 pr-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-12 h-12 relative flex items-center justify-center">
                <Image
                  src="/images/maple-logo.png"
                  alt={`${companyName} Logo`}
                  fill
                  sizes="160px"
                  quality={100}
                  unoptimized
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-lg text-brand font-semibold tracking-tight">
                {companyName}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-text-muted mb-6 pr-4">
              {fallbackCompanyInfo.description}
            </p>
            {/* Get in Touch & Minimalist Brand Icons */}
            <div className="mt-6">
              <h5 className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-3">
                Get in Touch
              </h5>
              <div className="flex gap-2 items-center">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-6 h-6 rounded-full aspect-square shrink-0 bg-white border border-stone-200/80 shadow-xs flex items-center justify-center text-stone-600 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                >
                  <FaFacebookF className="w-4.5 h-4.5" />
                </a>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-6 h-6 rounded-full aspect-square shrink-0 bg-white border border-stone-200/80 shadow-xs flex items-center justify-center text-stone-600 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                >
                  <FaYoutube className="w-4.5 h-4.5" />
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-6 h-6 rounded-full aspect-square shrink-0 bg-white border border-stone-200/80 shadow-xs flex items-center justify-center text-stone-600 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                >
                  <FaLinkedinIn className="w-4.5 h-4.5" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-6 h-6 rounded-full aspect-square shrink-0 bg-white border border-stone-200/80 shadow-xs flex items-center justify-center text-stone-600 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                >
                  <FaWhatsapp className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h5 className="text-xs font-semibold uppercase tracking-widest text-brand mb-5">
              Quick Links
            </h5>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-gold transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="lg:col-span-3">
            <h5 className="text-xs font-semibold uppercase tracking-widest text-brand mb-5">
              Contact Us
            </h5>
            <ul className="space-y-5 text-sm">
              <li>
                <span className="text-stone-500 text-xs uppercase tracking-wider font-semibold">Head Office</span>
                <p className="text-charcoal font-medium mt-1 leading-relaxed">{address}</p>
              </li>
              <li>
                <span className="text-stone-500 text-xs uppercase tracking-wider font-semibold">Phone</span>
                <p className="text-brand font-medium mt-1">{phone}</p>
              </li>
              <li>
                <span className="text-stone-500 text-xs uppercase tracking-wider font-semibold">General Inquiries</span>
                <p className="text-brand font-medium mt-1">{email}</p>
              </li>
            </ul>
          </div>

          {/* Column 4: Location Map */}
          <div className="lg:col-span-3">
            <h5 className="text-xs font-semibold uppercase tracking-widest text-brand mb-5">
              Location
            </h5>
            <div className="w-full bg-white rounded-md overflow-hidden border border-stone-200 shadow-sm p-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.8123287310574!2d90.41014167605963!3d23.789693988636737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70deb73%3A0x30c36498f90fe23!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1707038166548!5m2!1sen!2sbd"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[150px] rounded"
              ></iframe>
              <div className="pt-2 pb-1 text-center">
                <a
                  href="https://maps.app.goo.gl/4PRsxmMm9vAGVodQ6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand hover:text-gold font-semibold tracking-wide inline-flex items-center gap-1 transition-colors"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-stone-200 bg-stone-50">
        <div className="container-wide py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500 font-medium">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="text-xs text-stone-500 font-medium tracking-wide">
            Dhaka · Chattogram · Global
          </p>
        </div>
      </div>
    </footer>
  );
}
