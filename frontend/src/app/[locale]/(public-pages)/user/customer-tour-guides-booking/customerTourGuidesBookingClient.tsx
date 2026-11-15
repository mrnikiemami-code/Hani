"use client";

import dynamic from "next/dynamic";

const CustomerTourGuidesBookingView = dynamic(() => import("@/views/user-dashboard/my-booking/tour-guides/tourGuidesBooking"), { ssr: false });

export default function CustomerTourGuidesBookingClient() {
  return <CustomerTourGuidesBookingView />;
}
