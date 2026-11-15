"use client";

import dynamic from "next/dynamic";

const AgentFlightBookingView = dynamic(() => import("@/views/agent-dashboard/booking/flight-booking/agentFlightBooking"), { ssr: false });

export default function AgentFlightBookingClient() {
  return <AgentFlightBookingView />;
}
