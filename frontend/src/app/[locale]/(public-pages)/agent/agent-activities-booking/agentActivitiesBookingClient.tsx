"use client";

import dynamic from "next/dynamic";

const AgentActivitiesBookingView = dynamic(() => import("@/views/agent-dashboard/booking/activities-booking/activitiesBooking"), { ssr: false });

export default function AgentActivitiesBookingClient() {
  return <AgentActivitiesBookingView />;
}
