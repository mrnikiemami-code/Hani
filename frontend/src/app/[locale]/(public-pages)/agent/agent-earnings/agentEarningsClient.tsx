"use client";

import dynamic from "next/dynamic";

const AgentEarningsView = dynamic(() => import("@/views/agent-dashboard/earnings/agentEarning"), { ssr: false });

export default function AgentEarningsClient() {
  return <AgentEarningsView />;
}
