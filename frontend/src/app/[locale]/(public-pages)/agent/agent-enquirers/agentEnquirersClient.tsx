"use client";

import dynamic from "next/dynamic";

const AgentEnquirersView = dynamic(() => import("@/views/agent-dashboard/enquiries/agentEnquiries"), { ssr: false });

export default function AgentEnquirersClient() {
  return <AgentEnquirersView />;
}
