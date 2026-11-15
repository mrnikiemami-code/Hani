"use client";

import dynamic from "next/dynamic";

const CustomerCruiseBookingView = dynamic(() => import("@/views/user-dashboard/my-booking/cruise/userCruiseBooking"), { ssr: false });

export default function CustomerCruiseBookingClient() {
  return <CustomerCruiseBookingView />;
}
