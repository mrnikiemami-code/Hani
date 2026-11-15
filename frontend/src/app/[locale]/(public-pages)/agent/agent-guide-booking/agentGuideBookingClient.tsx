"use client";

import dynamic from "next/dynamic";

const AgentGuideBookingView = dynamic(() => import("@/views/agent-dashboard/booking/guide-booking/guideBooking"), { ssr: false });

export default function AgentGuideBookingClient() {
  return <AgentGuideBookingView />;
}
