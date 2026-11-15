"use client";

import dynamic from "next/dynamic";

const AgentVisaBookingView = dynamic(() => import("@/views/agent-dashboard/booking/visa-booking/visaBooking"), { ssr: false });

export default function AgentVisaBookingClient() {
  return <AgentVisaBookingView />;
}
