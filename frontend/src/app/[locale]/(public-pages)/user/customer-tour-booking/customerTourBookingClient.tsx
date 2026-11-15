"use client";

import dynamic from "next/dynamic";

const CustomerTourBookingView = dynamic(() => import("@/views/user-dashboard/my-booking/tour/userTourBooking"), { ssr: false });

export default function CustomerTourBookingClient() {
  return <CustomerTourBookingView />;
}
