import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Fraunces,
  Space_Grotesk,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

// Variable serif for editorial + cinematic display type.
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

// Technical grotesk for the futuristic / data art direction.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

// High-contrast serif for editorial accents and pull quotes.
const instrument = Instrument_Serif({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Jane's Plants / Plants with presence",
  description:
    "A stylish houseplant shop. Hand-picked plants, pots worth showing off, and honest care guidance. Four ways to experience the brand.",
  metadataBase: new URL("https://janesplants.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${spaceGrotesk.variable} ${instrument.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
