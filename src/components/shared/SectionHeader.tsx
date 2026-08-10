"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}
    >
      <span className={`eyebrow ${light ? "text-accent" : ""}`}>{eyebrow}</span>
      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mt-3 leading-[1.15] ${
          light ? "text-white" : "text-brand"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base md:text-lg max-w-2xl leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/60" : "text-text-muted"}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
