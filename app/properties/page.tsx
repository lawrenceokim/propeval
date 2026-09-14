import type { Metadata } from "next";
import { PropertiesContent } from "@/components/properties-content";
import { getProperties } from "@/lib/services/operations";
import { PROPERTY_STATUSES, type PropertyStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Properties" };
export const dynamic = "force-dynamic";

export default async function PropertiesPage({ searchParams }: PageProps<"/properties">) {
  const query = await searchParams;
  const city = typeof query.city === "string" ? query.city : undefined;
  const requestedStatus = typeof query.status === "string" ? query.status : undefined;
  const status = PROPERTY_STATUSES.includes(requestedStatus as PropertyStatus) ? requestedStatus as PropertyStatus : undefined;
  return <PropertiesContent source={getProperties({ city, status })} city={city} status={status} />;
}
