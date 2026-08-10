import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  let companyName = "Maple AG Global LTD";
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://maple-ag-backend.vercel.app/api'}/settings/companyName`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data.data) {
        companyName = data.data.companyName || data.data;
      }
    }
  } catch {
    // Fallback to default companyName if backend is offline during build
  }

  return {
    title: `${companyName} — Import, Export & Supply Chain`,
    description: "A premier import–export and supply chain company headquartered in Dhaka, Bangladesh. Facilitating trade across 40+ countries with a commitment to quality, compliance, and reliability.",
    icons: {
      icon: "/images/favicon.png",
      shortcut: "/images/favicon.png",
      apple: "/images/favicon.png",
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
      className={`${fraunces.variable} ${inter.variable} h-full antialiased selection:bg-gold/30 selection:text-navy scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
