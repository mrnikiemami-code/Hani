"use client";

import dynamic from "next/dynamic";

const ActivityBookingConfirmationView = dynamic(() => import("@/views/activity/activity-booking-confirmation/activityBookingConfirmation"), { ssr: false });

export default function ActivityBookingConfirmationClient() {
  return <ActivityBookingConfirmationView />;
}
