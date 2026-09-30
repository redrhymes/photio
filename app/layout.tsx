import type { Metadata, Viewport } from "next";
import { Caveat, Cormorant_Garamond, Inter } from "next/font/google";
import { Shell } from "@/components/Shell";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});
const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-handwriting",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://photio.in"),
  title: { default: "Photio — Wedding & Pre-wedding Photography in Noida", template: "%s — Photio" },
  description: "Photio creates warm, cinematic wedding and pre-wedding photography in Noida, Delhi NCR, and across India. That click, wow!",
  keywords: ["pre-wedding photographer Noida", "wedding photography Delhi NCR", "cinematic wedding videography", "wedding photographer India"],
  openGraph: { type: "website", siteName: "Photio", title: "Photio — That click, wow!", description: "Wedding stories, honestly told.", images: ["https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80"] },
  twitter: { card: "summary_large_image", title: "Photio — That click, wow!", description: "Wedding stories, honestly told." },
};

export const viewport: Viewport = { themeColor: "#0A0A0A", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Photographer"],
    name: "Photio",
    slogan: "That click, wow!",
    url: "https://photio.in",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80",
    address: { "@type": "PostalAddress", streetAddress: "LL3 E-2, Sector 63", addressLocality: "Noida", addressRegion: "Uttar Pradesh", postalCode: "201301", addressCountry: "IN" },
    areaServed: ["Noida", "Delhi NCR", "India"],
    telephone: "[PHONE]",
    email: "[EMAIL]",
    priceRange: "$$",
  };
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable} ${handwriting.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
