import { redirect } from "next/navigation";
import { getPageMetadata } from "@/config/metadata";
import { getMyAgencyDashboard } from "@/features/dashboard/infrastructure/dashboard-api";
import AgentDashboardClient from "./agentDashboardClient";

export const dynamic = "force-dynamic";

export const generateMetadata = () => getPageMetadata("Agent Dashboard");

export default async function AgentDashboardPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dashboard = await getMyAgencyDashboard();

  if (!dashboard) {
    redirect(`/${locale}/login`);
  }

  return <AgentDashboardClient dashboard={dashboard} />;
}
