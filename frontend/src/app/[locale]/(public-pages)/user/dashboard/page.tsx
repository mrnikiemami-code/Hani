import { redirect } from "next/navigation";
import { getPageMetadata } from "@/config/metadata";
import { getMyDashboard } from "@/features/dashboard/infrastructure/dashboard-api";
import DashboardClient from "./dashboardClient";

export const dynamic = "force-dynamic";

export const generateMetadata = () => getPageMetadata("Dashboard");

export default async function DashboardPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dashboard = await getMyDashboard();

  if (!dashboard) {
    redirect(`/${locale}/login`);
  }

  return <DashboardClient dashboard={dashboard} />;
}
