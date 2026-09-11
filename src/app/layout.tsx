import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Footer } from "@/components/footer/footer";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { siteMetadata } from "@/lib/seo/metadata";
import { getOrganizationJsonLd } from "@/lib/seo/jsonld";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SillageAmbient } from "@/components/motion/sillage-ambient";
import "@/styles/globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0A09",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = getOrganizationJsonLd();

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="font-sans">
        <MotionProvider>
          <SillageAmbient />
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <SiteNavigation />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
