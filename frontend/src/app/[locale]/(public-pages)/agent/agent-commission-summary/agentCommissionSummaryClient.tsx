"use client";

import dynamic from "next/dynamic";

const AgentCommissionSummaryView = dynamic(() => import("@/views/agent-dashboard/payout/commission-summary/commissionSummary"), { ssr: false });

export default function AgentCommissionSummaryClient() {
  return <AgentCommissionSummaryView />;
}
