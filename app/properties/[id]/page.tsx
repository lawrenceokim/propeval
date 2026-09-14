import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetailContent } from "@/components/property-detail-content";
import { getProperty } from "@/lib/services/operations";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/properties/[id]">): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(id);
  return { title: property?.name ?? "Property not found" };
}

export default async function PropertyDetailPage({ params }: PageProps<"/properties/[id]">) {
  const { id } = await params;
  const source = getProperty(id).then((property) => {
    if (!property) notFound();
    return property;
  });
  return <PropertyDetailContent source={source} />;
}
