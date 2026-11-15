"use client";

import dynamic from "next/dynamic";

const AgentPayoutRequestView = dynamic(() => import("@/views/agent-dashboard/agent-payout-request/agentPayoutRequest"), { ssr: false });

export default function AgentPayoutRequestClient() {
  return <AgentPayoutRequestView />;
}
