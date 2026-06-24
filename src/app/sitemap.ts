import type { MetadataRoute } from "next";
import { PLANTS } from "@/lib/content";

const BASE = "https://janesplants.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/hire", "/care", "/visit", "/concepts"].map(
    (path) => ({
      url: `${BASE}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const plants = PLANTS.map((p) => ({
    url: `${BASE}/plant/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...plants];
}
