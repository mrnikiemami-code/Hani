"use client";

import dynamic from "next/dynamic";

const AgentPaymentHistoryView = dynamic(() => import("@/views/agent-dashboard/payout/payment-history/paymentHistory"), { ssr: false });

export default function AgentPaymentHistoryClient() {
  return <AgentPaymentHistoryView />;
}
