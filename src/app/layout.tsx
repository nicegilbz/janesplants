import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Instrument_Serif } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
// Mono is only used for small eyebrow/label text - let it swap in rather than
// compete with the LCP image for critical-path bandwidth on slow mobile.
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  preload: false,
});

// Variable serif for the display headline (the LCP text). SOFT/WONK were pinned
// to 0 (their defaults), so only opsz is actually used - dropping the unused
// axes shrinks this critical font file.
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  axes: ["opsz"],
});

// High-contrast italic serif for accents (the "presence" word). Decorative, so
// it swaps in rather than blocking the critical path.
const instrument = Instrument_Serif({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  preload: false,
});

export const metadata: Metadata = {
  title: "Jane's Plants / Plants with presence",
  description:
    "A working glasshouse and houseplant shop in Hertford. Hand-picked plants, pots worth showing off, honest care guidance, plus plant hire and styling.",
  metadataBase: new URL("https://janesplants.com"),
  openGraph: {
    title: "Jane's Plants",
    description:
      "A premium houseplant shop and plant-hire studio at a working glasshouse in Hertford. Hand-picked plants, pots worth showing off, and honest care guidance.",
    type: "website",
    locale: "en_GB",
    siteName: "Jane's Plants",
    url: "https://janesplants.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jane's Plants",
    description:
      "A premium houseplant shop and plant-hire studio at a working glasshouse in Hertford.",
  },
};

const ORGANISATION_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://janesplants.com/#organisation",
      name: "Jane's Plants",
      url: "https://janesplants.com",
      email: "hello@janesplants.com",
      description:
        "A premium houseplant shop and plant-hire studio at a working glasshouse in Hertford.",
      sameAs: [],
    },
    {
      "@type": ["LocalBusiness", "Store", "HomeAndGarden"],
      "@id": "https://janesplants.com/#localbusiness",
      name: "Jane's Plants",
      url: "https://janesplants.com",
      email: "hello@janesplants.com",
      description:
        "A premium houseplant shop and plant-hire studio at a working glasshouse in Hertford. Hand-picked houseplants for sale plus plant hire and styling.",
      areaServed: {
        "@type": "Place",
        name: "Hertford, England",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hertford",
          addressRegion: "England",
          addressCountry: "GB",
        },
      },
      parentOrganization: { "@id": "https://janesplants.com/#organisation" },
      sameAs: [],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${instrument.variable} antialiased`}
    >
      <body>
        {/* Arm the scroll-reveal hide BEFORE first paint, so reveal text is
            never shown-then-hidden (the flash). If JS is off the class is never
            added, so content stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('cine-js')",
          }}
        />
        <JsonLd data={ORGANISATION_JSONLD} />
        {children}
      </body>
    </html>
  );
}
