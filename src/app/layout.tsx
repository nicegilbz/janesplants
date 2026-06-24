import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Instrument_Serif } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

// Variable serif for editorial + cinematic display type.
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

// High-contrast serif for editorial accents and pull quotes.
const instrument = Instrument_Serif({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: "400",
  style: "italic", // only ever used italic (cine-accent); avoids an unused preload
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
        <JsonLd data={ORGANISATION_JSONLD} />
        {children}
      </body>
    </html>
  );
}
