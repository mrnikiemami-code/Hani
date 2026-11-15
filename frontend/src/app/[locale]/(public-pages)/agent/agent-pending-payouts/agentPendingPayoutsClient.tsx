"use client";

import dynamic from "next/dynamic";

const AgentPendingPayoutsView = dynamic(() => import("@/views/agent-dashboard/payout/pending-payouts/pendingPayouts"), { ssr: false });

export default function AgentPendingPayoutsClient() {
  return <AgentPendingPayoutsView />;
}
