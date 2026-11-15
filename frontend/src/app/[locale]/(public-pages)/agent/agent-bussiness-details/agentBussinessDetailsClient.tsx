"use client";

import dynamic from "next/dynamic";

const AgentBussinessDetailsView = dynamic(() => import("@/views/agent-dashboard/settings/agent-bussiness-details/agentBussinessDetails"), { ssr: false });

export default function AgentBussinessDetailsClient() {
  return <AgentBussinessDetailsView />;
}
