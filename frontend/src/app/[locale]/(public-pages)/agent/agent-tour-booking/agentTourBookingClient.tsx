"use client";

import dynamic from "next/dynamic";

const AgentTourBookingView = dynamic(() => import("@/views/agent-dashboard/booking/tour-booking/agentTourBooking"), { ssr: false });

export default function AgentTourBookingClient() {
  return <AgentTourBookingView />;
}
