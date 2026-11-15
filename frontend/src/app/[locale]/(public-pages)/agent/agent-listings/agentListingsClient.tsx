"use client";

import dynamic from "next/dynamic";

const AgentListingsView = dynamic(() => import("@/views/agent-dashboard/listing/agentListings"), { ssr: false });

export default function AgentListingsClient() {
  return <AgentListingsView />;
}
