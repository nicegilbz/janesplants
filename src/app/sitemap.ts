import type { MetadataRoute } from "next";
import { PLANTS, JOURNAL } from "@/lib/content";

const BASE = "https://janesplants.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/shop",
    "/build",
    "/hire",
    "/care",
    "/visit",
    "/concepts",
    "/journal",
    "/about",
    "/privacy",
    "/terms",
  ].map(
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

  const journal = JOURNAL.map((post) => ({
    url: `${BASE}/journal/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...pages, ...plants, ...journal];
}
