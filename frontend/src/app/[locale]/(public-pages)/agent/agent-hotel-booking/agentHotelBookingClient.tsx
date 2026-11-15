"use client";

import dynamic from "next/dynamic";

const AgentHotelBookingView = dynamic(() => import("@/views/agent-dashboard/booking/hotel-booking/agentHotelBooking"), { ssr: false });

export default function AgentHotelBookingClient() {
  return <AgentHotelBookingView />;
}
