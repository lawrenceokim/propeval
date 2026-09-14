import { DashboardContent } from "@/components/dashboard-content";
import { getDashboardData } from "@/lib/services/operations";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return <DashboardContent source={getDashboardData()} />;
}
