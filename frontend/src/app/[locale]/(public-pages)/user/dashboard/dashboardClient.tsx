"use client";

import dynamic from "next/dynamic";

const DashboardView = dynamic(() => import("@/views/user-dashboard/dashboard/dashboard"), { ssr: false });

export default function DashboardClient() {
  return <DashboardView />;
}
