"use client";

import dynamic from "next/dynamic";

const AgentCarBookingView = dynamic(() => import("@/views/agent-dashboard/booking/car-booking/agentCarBooking"), { ssr: false });

export default function AgentCarBookingClient() {
  return <AgentCarBookingView />;
}
