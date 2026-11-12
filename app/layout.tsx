import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { AdRails, FooterAd, MobileAdBanner } from "@/components/ads/SiteAds";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ADSENSE_CLIENT } from "@/lib/ads";
import { JOURNEY_PENDING_SCRIPT } from "@/lib/journey";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "NovatedCalc - Novated Lease Calculator and Provider Comparison",
  description:
    "Work out what a novated lease would cost you and compare Australian providers on fees and service. Free, no sign-up.",
};

/** Umami analytics, only loaded when both are set. See README › Analytics. */
const umamiScriptUrl = process.env.UMAMI_SCRIPT_URL;
const umamiWebsiteId = process.env.UMAMI_WEBSITE_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The journey script may set data-journey-pending on <html> before React hydrates.
    <html lang="en-AU" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JOURNEY_PENDING_SCRIPT }} />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <FooterAd />
        <SiteFooter />
        <AdRails />
        <MobileAdBanner />
        {ADSENSE_CLIENT ? (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        {umamiScriptUrl && umamiWebsiteId ? (
          <Script
            src={umamiScriptUrl}
            data-website-id={umamiWebsiteId}
            data-domains={process.env.UMAMI_DOMAINS || undefined}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
