"use client";

import dynamic from "next/dynamic";

const AgentDashboardView = dynamic(() => import("@/views/agent-dashboard/dashboard/agentDashboard"), { ssr: false });

export default function AgentDashboardClient() {
  return <AgentDashboardView />;
}
