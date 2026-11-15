"use client";

import dynamic from "next/dynamic";

const CustomerCarBookingView = dynamic(() => import("@/views/user-dashboard/my-booking/car/userCarBooking"), { ssr: false });

export default function CustomerCarBookingClient() {
  return <CustomerCarBookingView />;
}
