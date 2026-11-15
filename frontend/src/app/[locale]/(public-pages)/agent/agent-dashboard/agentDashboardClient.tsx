"use client";

import dynamic from "next/dynamic";
import type { AgencyDashboard } from "@/features/dashboard/infrastructure/dashboard-api";

const AgentDashboardView = dynamic(
  () => import("@/views/agent-dashboard/dashboard/agentDashboard"),
  { ssr: false }
);

export default function AgentDashboardClient({
  dashboard
}: {
  dashboard: AgencyDashboard;
}) {
  return <AgentDashboardView dashboard={dashboard} />;
}
