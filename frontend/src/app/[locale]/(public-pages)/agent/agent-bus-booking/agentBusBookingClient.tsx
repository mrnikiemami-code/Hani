"use client";

import dynamic from "next/dynamic";

const AgentBusBookingView = dynamic(() => import("@/views/agent-dashboard/booking/bus-booking/agentBusBooking"), { ssr: false });

export default function AgentBusBookingClient() {
  return <AgentBusBookingView />;
}
