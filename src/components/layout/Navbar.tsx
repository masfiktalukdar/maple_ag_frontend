"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/siteData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  const showSolid = true;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-ivory shadow-[0_1px_0_0_rgba(218,211,196,0.6)]"
      >
        <div className="container-wide flex justify-between items-center h-[90px]">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className="w-12 h-12 relative flex items-center justify-center transition-all duration-300"
              >
                <Image
                  src="/images/maple-logo.png"
                  alt="Maple AG Global LTD Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden lg:flex justify-center items-center gap-6 xl:gap-8 flex-grow">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group h-[80px] flex items-center">
                <Link
                  href={link.href}
                  className={`text-[13px] font-medium tracking-wide uppercase whitespace-nowrap transition-colors duration-200 flex items-center gap-1 ${pathname.startsWith(link.href) && link.href !== "/" || (link.href === "/" && pathname === "/")
                    ? "text-terracotta"
                    : "text-navy/80 hover:text-navy"
                    }`}
                >
                  {link.label}
                  {link.children && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 opacity-70 group-hover:rotate-180 transition-transform duration-300"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </Link>

                {/* Desktop Dropdown */}
                {link.children && (
                  <div className="absolute top-[80px] left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:-translate-y-2">
                    <div className="bg-ivory border border-stone/30 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-sm py-2 min-w-[200px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-5 py-2.5 text-sm transition-colors ${pathname === child.href
                            ? "text-terracotta bg-stone/20"
                            : "text-navy hover:bg-stone/30 hover:text-terracotta"
                            }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: CTA + Mobile Toggle */}
          <div className="flex-shrink-0 flex justify-end items-center gap-4">
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 bg-terracotta text-white text-[12px] font-semibold uppercase tracking-wider rounded-sm hover:bg-terracotta-dark shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group whitespace-nowrap"
            >
              <span>Get in Touch</span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            {/* Mobile hamburger */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex flex-col gap-1.5 p-2"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-6 h-[2px] transition-all duration-300 ${mobileOpen
                    ? `rotate-45 translate-y-[5px] bg-navy`
                    : "bg-navy"
                    }`}
                />
                <span
                  className={`block w-6 h-[2px] transition-all duration-300 ${mobileOpen
                    ? "opacity-0"
                    : "bg-navy"
                    }`}
                />
                <span
                  className={`block w-6 h-[2px] transition-all duration-300 ${mobileOpen
                    ? `-rotate-45 -translate-y-[5px] bg-navy`
                    : "bg-navy"
                    }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[80px] z-40 bg-ivory lg:hidden overflow-y-auto"
          >
            <div className="container-wide py-8 flex flex-col gap-1 pb-24">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-stone/30"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      className={`block py-4 text-lg font-serif font-medium flex-grow ${pathname === link.href ? "text-terracotta" : "text-navy"
                        }`}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <button
                        onClick={() =>
                          setOpenSubmenu(openSubmenu === link.label ? null : link.label)
                        }
                        className="p-4 text-navy"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-transform duration-300 ${openSubmenu === link.label ? "rotate-180 text-terracotta" : ""
                            }`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Mobile Submenu */}
                  <AnimatePresence>
                    {link.children && openSubmenu === link.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 pl-4 flex flex-col gap-3">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`text-sm ${pathname === child.href ? "text-terracotta font-medium" : "text-navy/80"
                                }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              <Link
                href="/contact"
                className="mt-8 inline-flex justify-center px-6 py-3.5 bg-terracotta text-white text-sm font-semibold uppercase tracking-wider rounded-sm shadow-md"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
