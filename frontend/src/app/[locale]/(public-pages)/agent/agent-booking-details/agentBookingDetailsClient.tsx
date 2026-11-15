"use client";

import dynamic from "next/dynamic";

const AgentBookingDetailsView = dynamic(() => import("@/views/agent-dashboard/agent-booking-details/agentBookingDetails"), { ssr: false });

export default function AgentBookingDetailsClient() {
  return <AgentBookingDetailsView />;
}
