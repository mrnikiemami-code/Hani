"use client";

import dynamic from "next/dynamic";

const CustomerBusBookingView = dynamic(() => import("@/views/user-dashboard/my-booking/bus/userBusBooking"), { ssr: false });

export default function CustomerBusBookingClient() {
  return <CustomerBusBookingView />;
}
