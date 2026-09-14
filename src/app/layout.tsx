import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Footer } from "@/components/footer/footer";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { siteMetadata } from "@/lib/seo/metadata";
import { getOrganizationJsonLd } from "@/lib/seo/jsonld";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SillageAmbient } from "@/components/motion/sillage-ambient";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { CustomCursor } from "@/components/motion/custom-cursor";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { Analytics } from "@vercel/analytics/next";
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
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof window!=='undefined'){var filter=function(m,f){return(m&&(m.indexOf('MetaMask')!==-1||m.indexOf('chrome-extension://')!==-1))||(f&&f.indexOf('chrome-extension://')!==-1);};window.addEventListener('unhandledrejection',function(e){var r=e.reason;var m=(r&&(r.message||r.stack))||String(r||'');if(filter(m)){e.stopImmediatePropagation();e.preventDefault();}},true);window.addEventListener('error',function(e){var m=(e.error&&(e.error.message||e.error.stack))||e.message||'';if(filter(m,e.filename)){e.stopImmediatePropagation();e.preventDefault();}},true);}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <AnalyticsScripts />
      </head>
      <body className="font-sans">
        <MotionProvider>
          <LenisProvider>
            <CustomCursor />
            <SillageAmbient />
            <a className="skip-link" href="#main-content">
              Skip to content
            </a>
            <SiteNavigation />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </LenisProvider>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
