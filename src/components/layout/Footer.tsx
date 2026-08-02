"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { navLinks, companyInfo, certifications } from "@/data/siteData";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      {/* Newsletter Row */}
      <div className="border-b border-white/10">
        <div className="container-wide py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl text-white font-medium mb-1">
              Stay Updated on Global Trade
            </h4>
            <p className="text-sm text-white/50">
              Receive market insights, new product listings, and trade updates.
            </p>
          </div>
          <form
            className="flex w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 px-4 py-3 bg-white/5 border border-white/15 rounded-l-sm text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-terracotta text-white text-sm font-semibold uppercase tracking-wider rounded-r-sm hover:bg-terracotta-dark transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 relative flex items-center justify-center">
                <Image
                  src="/images/maple-logo.png"
                  alt="Maple AG Global LTD Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-lg text-white font-semibold tracking-tight">
                {companyInfo.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/50 mb-6">
              {companyInfo.description}
            </p>
            {/* Get in Touch & Minimalist Brand Icons */}
            <div className="mt-6">
              <h5 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-3">
                Get in Touch
              </h5>
              <div className="flex gap-2.5 items-center">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#1877F2] hover:bg-white/10 hover:border-white/20 transition-colors duration-200"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#FF0000] hover:bg-white/10 hover:border-white/20 transition-colors duration-200"
                >
                  <FaYoutube className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#0A66C2] hover:bg-white/10 hover:border-white/20 transition-colors duration-200"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/880284321100"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#25D366] hover:bg-white/10 hover:border-white/20 transition-colors duration-200"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
              Quick Links
            </h5>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Certifications */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
              Certifications & Compliance
            </h5>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert.name} className="text-sm">
                  <span className="text-white/80 font-medium">{cert.name}</span>
                  <br />
                  <span className="text-white/40 text-xs">{cert.description}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
              Contact Us
            </h5>
            <ul className="space-y-4 text-sm">
              <li>
                <span className="text-white/40 text-xs uppercase tracking-wider">Head Office</span>
                <p className="text-white/70 mt-1">{companyInfo.address}</p>
              </li>
              <li>
                <span className="text-white/40 text-xs uppercase tracking-wider">Phone</span>
                <p className="text-white/70 mt-1">{companyInfo.phone}</p>
              </li>
              <li>
                <span className="text-white/40 text-xs uppercase tracking-wider">General Inquiries</span>
                <p className="text-white/70 mt-1">{companyInfo.email}</p>
              </li>
              <li>
                <span className="text-white/40 text-xs uppercase tracking-wider">Export Inquiries</span>
                <p className="text-white/70 mt-1">{companyInfo.exportEmail}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Dhaka · Chattogram · Global
          </p>
        </div>
      </div>
    </footer>
  );
}
