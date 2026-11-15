"use client";

import dynamic from "next/dynamic";
import type { TravelerDashboard } from "@/features/dashboard/infrastructure/dashboard-api";

const DashboardView = dynamic(() => import("@/views/user-dashboard/dashboard/dashboard"), {
  ssr: false
});

export default function DashboardClient({
  dashboard
}: {
  dashboard: TravelerDashboard;
}) {
  return <DashboardView dashboard={dashboard} />;
}
