"use client";

import dynamic from "next/dynamic";

const AgentCancellationRequestView = dynamic(() => import("@/views/agent-dashboard/booking/cancellation-request/cancellationRequest"), { ssr: false });

export default function AgentCancellationRequestClient() {
  return <AgentCancellationRequestView />;
}
