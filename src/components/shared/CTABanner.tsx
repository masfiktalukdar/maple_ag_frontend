"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CTABannerProps {
  headline?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTABanner({
  headline = "Let's Move Your Business Forward",
  description = "Whether you're sourcing products from Bangladesh or importing goods for your business, our team is ready to help.",
  buttonText = "Get in Touch",
  buttonHref = "/contact",
}: CTABannerProps) {
  return (
    <section className="bg-brand">
      <div className="container-wide py-20 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
            {headline}
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/50 max-w-xl mx-auto">
            {description}
          </p>
          <Link
            href={buttonHref}
            className="inline-block mt-8 px-8 py-3.5 bg-gold text-white text-sm font-semibold uppercase tracking-wider rounded-sm cursor-pointer hover:bg-gold-dark transition-colors duration-200"
          >
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
