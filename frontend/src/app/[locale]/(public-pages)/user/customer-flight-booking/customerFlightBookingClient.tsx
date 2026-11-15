"use client";

import dynamic from "next/dynamic";

const CustomerFlightBookingView = dynamic(() => import("@/views/user-dashboard/my-booking/flight/userFlightBooking"), { ssr: false });

export default function CustomerFlightBookingClient() {
  return <CustomerFlightBookingView />;
}
