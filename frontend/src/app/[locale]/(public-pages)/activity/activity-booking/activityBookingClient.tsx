"use client";

import dynamic from "next/dynamic";

const ActivityBookingView = dynamic(() => import("@/views/activity/activity-booking/activityBooking"), { ssr: false });

export default function ActivityBookingClient() {
  return <ActivityBookingView />;
}
