import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";

import { IMAGES } from "@/constants/images";

export async function generateMetadata(): Promise<Metadata> {
  const { companyName, description } = siteConfig;

  return {
    title: `${companyName} — Import, Export & Supply Chain`,
    description: description,
    icons: {
      icon: IMAGES.FAVICON,
      shortcut: IMAGES.FAVICON,
      apple: IMAGES.FAVICON,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased selection:bg-gold/30 selection:text-navy scroll-smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
