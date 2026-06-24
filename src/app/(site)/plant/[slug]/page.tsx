import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PLANTS, getPlant, relatedPlants } from "@/lib/content";
import PlantView from "@/components/cinematic/plant/PlantView";

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

  return <PlantView plant={plant} related={relatedPlants(slug, 3)} />;
}
