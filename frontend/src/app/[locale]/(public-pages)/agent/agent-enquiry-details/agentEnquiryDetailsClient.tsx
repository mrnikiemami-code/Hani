"use client";

import dynamic from "next/dynamic";

const AgentEnquiryDetailsView = dynamic(() => import("@/views/agent-dashboard/enquiries/agentEnquiriesDetails"), { ssr: false });

export default function AgentEnquiryDetailsClient() {
  return <AgentEnquiryDetailsView />;
}
