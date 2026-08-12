import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { IMAGES } from "@/constants/images";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Admin Panel | Maple AG Global",
  description: "CMS for Maple AG Global",
  icons: {
    icon: IMAGES.FAVICON,
    shortcut: IMAGES.FAVICON,
    apple: IMAGES.FAVICON,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} h-full bg-stone-light font-sans`}>
      {children}
    </div>
  );
}
