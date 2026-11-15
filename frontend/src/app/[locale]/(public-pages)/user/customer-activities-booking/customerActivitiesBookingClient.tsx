"use client";

import dynamic from "next/dynamic";

const CustomerActivitiesBookingView = dynamic(() => import("@/views/user-dashboard/my-booking/activities/acitivitiesBooking"), { ssr: false });

export default function CustomerActivitiesBookingClient() {
  return <CustomerActivitiesBookingView />;
}
