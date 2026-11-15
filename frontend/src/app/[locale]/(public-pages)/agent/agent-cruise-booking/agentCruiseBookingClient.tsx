"use client";

import dynamic from "next/dynamic";

const AgentCruiseBookingView = dynamic(() => import("@/views/agent-dashboard/booking/cruise-booking/agentCruiseBooking"), { ssr: false });

export default function AgentCruiseBookingClient() {
  return <AgentCruiseBookingView />;
}
