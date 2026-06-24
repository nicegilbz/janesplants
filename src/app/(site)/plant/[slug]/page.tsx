import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PLANTS, getPlant, relatedPlants, plantImage } from "@/lib/content";
import PlantView from "@/components/cinematic/plant/PlantView";
import JsonLd from "@/components/JsonLd";

/** Pre-render every plant page at build time. */
export function generateStaticParams() {
  return PLANTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plant = getPlant(slug);
  if (!plant) return { title: "Plant not found / Jane's Plants" };
  return {
    title: `${plant.name} / Jane's Plants`,
    description: plant.blurb,
  };
}

export default async function PlantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plant = getPlant(slug);
  if (!plant) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: plant.name,
    image: `https://janesplants.com${plantImage(plant.slug)}`,
    description: plant.blurb,
    category: plant.category,
    brand: { "@type": "Brand", name: "Jane's Plants" },
    offers: {
      "@type": "Offer",
      price: plant.price,
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      url: `https://janesplants.com/plant/${plant.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <PlantView plant={plant} related={relatedPlants(slug, 3)} />
    </>
  );
}
