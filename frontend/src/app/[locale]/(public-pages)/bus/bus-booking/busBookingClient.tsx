"use client";

import dynamic from "next/dynamic";

const BusBookingView = dynamic(() => import("@/views/bus/bus-booking/busBooking"), { ssr: false });

export default function BusBookingClient() {
  return <BusBookingView />;
}
